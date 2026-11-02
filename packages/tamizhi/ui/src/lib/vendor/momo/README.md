# Momo avatar engine

Vendored from https://github.com/mortspace/momo (local reference checkout).
Copyright (c) 2026 mortspace, MIT. See momo-LICENSE.md.

The renderer, character shaders, rig, and baked meshes are preserved from the
reference. The meshoptimizer decoder keeps its own MIT notice in vendor/.
Tamizhi's React adapter and interface live in the parent tamizhi/ui directory; no upstream chat,
API integration, or page scripts run here.

Package integration: engine fetches accept resolveAsset so Vite can bundle mesh URLs for static hosts. Engine and decoder licenses remain alongside the source.
