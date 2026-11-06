-- Baseline server design for Neon PostgreSQL. Not applied by the static client.
-- Execute as an application migration owner; use a restricted role for requests.
CREATE SCHEMA IF NOT EXISTS vezham_workspace;
SET search_path = vezham_workspace, public;

CREATE TABLE workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), -- client stores this as remote_id
  app_id text NOT NULL,
  name text NOT NULL CHECK (length(btrim(name)) BETWEEN 1 AND 240),
  schema_version integer NOT NULL DEFAULT 1 CHECK (schema_version = 1),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);
CREATE TABLE principals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  issuer text NOT NULL,
  subject text NOT NULL,
  display_name text NOT NULL,
  UNIQUE (issuer, subject)
);
CREATE TABLE members (
  workspace_id uuid NOT NULL REFERENCES workspaces(id),
  principal_id uuid NOT NULL REFERENCES principals(id),
  role text NOT NULL CHECK (role IN ('owner','admin','editor','commenter','reader')),
  joined_at timestamptz NOT NULL DEFAULT now(),
  revoked_at timestamptz,
  PRIMARY KEY (workspace_id, principal_id)
);
CREATE TABLE devices (
  workspace_id uuid NOT NULL REFERENCES workspaces(id),
  client_id uuid NOT NULL,
  principal_id uuid NOT NULL REFERENCES principals(id),
  local_workspace_id text NOT NULL,
  last_sequence bigint NOT NULL DEFAULT 0 CHECK (last_sequence >= 0),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (workspace_id, client_id)
);
-- Content-free identities outlive node payloads. A purged entity can never be
-- recreated by a late device upload; this is separate from soft deletion.
CREATE TABLE entities (
  workspace_id uuid NOT NULL REFERENCES workspaces(id),
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  revision bigint NOT NULL DEFAULT 1 CHECK (revision > 0),
  purged_at timestamptz,
  PRIMARY KEY (workspace_id, id)
);
CREATE TABLE entity_mappings (
  workspace_id uuid NOT NULL,
  client_id uuid NOT NULL,
  local_id uuid NOT NULL,
  remote_id uuid NOT NULL,
  PRIMARY KEY (workspace_id, client_id, local_id),
  UNIQUE (workspace_id, client_id, remote_id),
  UNIQUE (workspace_id, client_id, local_id, remote_id),
  FOREIGN KEY (workspace_id, client_id) REFERENCES devices(workspace_id, client_id),
  FOREIGN KEY (workspace_id, remote_id) REFERENCES entities(workspace_id, id)
);
CREATE INDEX entity_mappings_remote ON entity_mappings(workspace_id, remote_id);
CREATE TABLE nodes (
  workspace_id uuid NOT NULL REFERENCES workspaces(id),
  id uuid NOT NULL, -- remote_id from entities, never overwritten by a local UUID
  origin_client_id uuid NOT NULL,
  local_id uuid NOT NULL,
  parent_id uuid,
  kind text NOT NULL CHECK (kind IN ('space','folder','page','database','record','channel','message','file')),
  title text NOT NULL CHECK (length(btrim(title)) BETWEEN 1 AND 240),
  icon text NOT NULL DEFAULT '',
  position double precision NOT NULL DEFAULT 0,
  data jsonb NOT NULL CHECK (jsonb_typeof(data) = 'object'),
  document jsonb,
  search_text text NOT NULL DEFAULT '',
  locked boolean NOT NULL DEFAULT false,
  pinned boolean NOT NULL DEFAULT false,
  created_by uuid NOT NULL REFERENCES principals(id),
  updated_by uuid NOT NULL REFERENCES principals(id),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz,
  trash_group_id uuid,
  PRIMARY KEY (workspace_id, id),
  UNIQUE (workspace_id, origin_client_id, local_id),
  FOREIGN KEY (workspace_id, id) REFERENCES entities(workspace_id, id),
  FOREIGN KEY (workspace_id, origin_client_id, local_id, id) REFERENCES entity_mappings(workspace_id, client_id, local_id, remote_id),
  FOREIGN KEY (workspace_id, origin_client_id) REFERENCES devices(workspace_id, client_id),
  FOREIGN KEY (workspace_id, parent_id) REFERENCES nodes(workspace_id, id) DEFERRABLE INITIALLY DEFERRED,
  CHECK (parent_id IS NULL OR parent_id <> id)
);
CREATE INDEX nodes_tree ON nodes(workspace_id, parent_id, position) WHERE deleted_at IS NULL;
CREATE INDEX nodes_kind_updated ON nodes(workspace_id, kind, updated_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX nodes_search ON nodes USING gin (to_tsvector('simple', title || ' ' || search_text));

-- Fields/views and record cells have relational projections for server querying.
-- The wire node JSON is reconstructed by the API serializer. Store rich text
-- in document, fields/views/cells in their relational tables, and only remaining
-- kind metadata in data. search_text is derived. Update all in one transaction.
-- Validate field types, hierarchy, and relation targets before committing.
CREATE TABLE database_fields (
  workspace_id uuid NOT NULL,
  database_id uuid NOT NULL,
  id uuid NOT NULL,
  position integer NOT NULL,
  definition jsonb NOT NULL,
  PRIMARY KEY (workspace_id, database_id, id),
  FOREIGN KEY (workspace_id, database_id) REFERENCES nodes(workspace_id, id) ON DELETE CASCADE
);
CREATE TABLE database_views (
  workspace_id uuid NOT NULL,
  database_id uuid NOT NULL,
  id uuid NOT NULL,
  position integer NOT NULL,
  definition jsonb NOT NULL,
  PRIMARY KEY (workspace_id, database_id, id),
  FOREIGN KEY (workspace_id, database_id) REFERENCES nodes(workspace_id, id) ON DELETE CASCADE
);
CREATE TABLE record_values (
  workspace_id uuid NOT NULL,
  database_id uuid NOT NULL,
  record_id uuid NOT NULL,
  field_id uuid NOT NULL,
  value jsonb NOT NULL,
  PRIMARY KEY (workspace_id, record_id, field_id),
  FOREIGN KEY (workspace_id, record_id) REFERENCES nodes(workspace_id, id) ON DELETE CASCADE,
  FOREIGN KEY (workspace_id, database_id, field_id) REFERENCES database_fields(workspace_id, database_id, id) ON DELETE CASCADE
);
CREATE INDEX record_values_lookup ON record_values(workspace_id, database_id, field_id);
CREATE TABLE record_links (
  workspace_id uuid NOT NULL,
  source_id uuid NOT NULL,
  field_id uuid NOT NULL,
  target_id uuid NOT NULL,
  PRIMARY KEY (workspace_id, source_id, field_id, target_id),
  FOREIGN KEY (workspace_id, source_id) REFERENCES nodes(workspace_id, id) ON DELETE CASCADE,
  FOREIGN KEY (workspace_id, target_id) REFERENCES nodes(workspace_id, id) ON DELETE CASCADE
);
CREATE TABLE file_objects (
  workspace_id uuid NOT NULL,
  node_id uuid NOT NULL,
  object_key text NOT NULL UNIQUE,
  mime_type text NOT NULL,
  byte_size bigint NOT NULL CHECK (byte_size BETWEEN 0 AND 50000000),
  sha256 text NOT NULL CHECK (sha256 ~ '^[0-9a-f]{64}$'),
  status text NOT NULL CHECK (status IN ('pending','verified','deleted')),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (workspace_id, node_id),
  FOREIGN KEY (workspace_id, node_id) REFERENCES nodes(workspace_id, id) ON DELETE CASCADE
);
CREATE TABLE node_revisions (
  workspace_id uuid NOT NULL,
  node_id uuid NOT NULL,
  revision bigint NOT NULL,
  snapshot jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (workspace_id, node_id, revision),
  FOREIGN KEY (workspace_id, node_id) REFERENCES nodes(workspace_id, id) ON DELETE CASCADE
);
CREATE TABLE node_grants (
  workspace_id uuid NOT NULL,
  node_id uuid NOT NULL,
  principal_id uuid NOT NULL REFERENCES principals(id),
  role text NOT NULL CHECK (role IN ('admin','editor','commenter','reader')),
  PRIMARY KEY (workspace_id, node_id, principal_id),
  FOREIGN KEY (workspace_id, node_id) REFERENCES nodes(workspace_id, id) ON DELETE CASCADE
);
CREATE TABLE user_state (
  workspace_id uuid NOT NULL,
  principal_id uuid NOT NULL REFERENCES principals(id),
  node_id uuid NOT NULL,
  favorite boolean NOT NULL DEFAULT false,
  read_at timestamptz,
  PRIMARY KEY (workspace_id, principal_id, node_id),
  FOREIGN KEY (workspace_id, node_id) REFERENCES nodes(workspace_id, id) ON DELETE CASCADE
);
CREATE TABLE mutation_receipts (
  workspace_id uuid NOT NULL,
  client_id uuid NOT NULL,
  operation_id uuid NOT NULL,
  sequence bigint NOT NULL CHECK (sequence > 0),
  request_hash text NOT NULL CHECK (request_hash ~ '^[0-9a-f]{64}$'),
  acknowledgement jsonb NOT NULL, -- retained for idempotent retries; no document body
  received_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (workspace_id, client_id, operation_id),
  UNIQUE (workspace_id, client_id, sequence),
  FOREIGN KEY (workspace_id, client_id) REFERENCES devices(workspace_id, client_id)
);
CREATE TABLE change_feed (
  cursor bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  workspace_id uuid NOT NULL REFERENCES workspaces(id),
  node_id uuid NOT NULL, -- intentionally no FK: permanent deletion leaves a tombstone
  revision bigint NOT NULL CHECK (revision > 0),
  operation text NOT NULL CHECK (operation IN ('upsert','tombstone','purge')),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (workspace_id, node_id, revision)
);
CREATE INDEX change_feed_workspace_cursor ON change_feed(workspace_id, cursor);

-- RLS is deny-by-default until the future authenticated API supplies policies.
-- Never expose a database owner or migration credential in browser environment.
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE entity_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE database_fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE database_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE record_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE record_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_objects ENABLE ROW LEVEL SECURITY;
ALTER TABLE node_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE node_grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE mutation_receipts ENABLE ROW LEVEL SECURITY;
ALTER TABLE change_feed ENABLE ROW LEVEL SECURITY;
ALTER TABLE principals ENABLE ROW LEVEL SECURITY;
