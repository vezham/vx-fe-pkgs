export type RQRoutes = Record<string, never>

export type RouteItem = {
  id: string
  createdAt: string
  displayId: string
  routeName: string
  status: 'Active' | 'Inactive'
  addedOn: string
}

export type RoutesResponse = RouteItem[]
