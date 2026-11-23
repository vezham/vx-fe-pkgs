'use client'

import { AcceptInvitation } from './accept-invitation'
import { ChangeOrganizationLogo } from './change-organization-logo'
import { CreateOrganizationDialog } from './create-organization-dialog'
import { DeleteOrganization } from './delete-organization'
import { DeleteOrganizationDialog } from './delete-organization-dialog'
import { DeleteOrganizationSkeleton } from './delete-organization-skeleton'
import { EditMemberRolesDialog } from './edit-member-roles-dialog'
import { InviteMemberDialog } from './invite-member-dialog'
import { LeaveOrganization } from './leave-organization'
import { LeaveOrganizationDialog } from './leave-organization-dialog'
import { Organization as OrganizationRoot } from './organization'
import { OrganizationDangerZone } from './organization-danger-zone'
import { OrganizationInvitations } from './organization-invitations'
import { OrganizationInvitationsEmpty } from './organization-invitations-empty'
import { OrganizationLogo } from './organization-logo'
import { OrganizationMemberRow } from './organization-member-row'
import { OrganizationMembers } from './organization-members'
import { OrganizationPeople } from './organization-people'
import { OrganizationProfile } from './organization-profile'
import { OrganizationRoles } from './organization-roles'
import { OrganizationRow } from './organization-row'
import { OrganizationSettings } from './organization-settings'
import { OrganizationSwitcher } from './organization-switcher'
import { OrganizationTeams } from './organization-teams'
import { OrganizationView } from './organization-view'
import { OrganizationViewSkeleton } from './organization-view-skeleton'
import { Organizations } from './organizations'
import { OrganizationsSettings } from './organizations-settings'
import { organizationPlugin } from './plugin'
import { RemoveMemberDialog } from './remove-member-dialog'
import { TeamSwitcher } from './team-switcher'
import { UserInvitations } from './user-invitations'

export type * from './organization'
export type * from './plugin'
export type * from './organizations'
export type * from './organizations-settings'
export type * from './organization-settings'
export type * from './organization-profile'
export type * from './organization-members'
export type * from './organization-member-row'
export type * from './organization-invitations'
export type * from './organization-invitations-empty'
export type * from './organization-people'
export type * from './organization-roles'
export type * from './organization-teams'
export type * from './organization-switcher'
export type * from './team-switcher'
export type * from './organization-logo'
export type * from './organization-view'
export type * from './organization-view-skeleton'
export type * from './organization-row'
export type * from './organization-danger-zone'
export type * from './delete-organization'
export type * from './delete-organization-skeleton'
export type * from './leave-organization'
export type * from './change-organization-logo'
export type * from './create-organization-dialog'
export type * from './delete-organization-dialog'
export type * from './leave-organization-dialog'
export type * from './invite-member-dialog'
export type * from './remove-member-dialog'
export type * from './edit-member-roles-dialog'
export type * from './accept-invitation'
export type * from './user-invitations'

export const Organization = Object.assign(OrganizationRoot, {
  plugin: organizationPlugin,
  List: Organizations,
  ListSettings: OrganizationsSettings,
  Settings: OrganizationSettings,
  Profile: OrganizationProfile,
  Members: OrganizationMembers,
  Member: OrganizationMemberRow,
  Invitations: OrganizationInvitations,
  InvitationsEmpty: OrganizationInvitationsEmpty,
  People: OrganizationPeople,
  Roles: OrganizationRoles,
  Teams: OrganizationTeams,
  Switcher: OrganizationSwitcher,
  TeamSwitcher: TeamSwitcher,
  Logo: OrganizationLogo,
  View: OrganizationView,
  ViewSkeleton: OrganizationViewSkeleton,
  Row: OrganizationRow,
  DangerZone: OrganizationDangerZone,
  Delete: DeleteOrganization,
  DeleteSkeleton: DeleteOrganizationSkeleton,
  Leave: LeaveOrganization,
  ChangeLogo: ChangeOrganizationLogo,
  CreateDialog: CreateOrganizationDialog,
  DeleteDialog: DeleteOrganizationDialog,
  LeaveDialog: LeaveOrganizationDialog,
  InviteDialog: InviteMemberDialog,
  RemoveMemberDialog: RemoveMemberDialog,
  EditMemberRolesDialog: EditMemberRolesDialog,
  AcceptInvitation: AcceptInvitation,
  UserInvitations: UserInvitations
})
