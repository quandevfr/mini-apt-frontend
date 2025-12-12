import type { RouteObject } from 'react-router'

export type IPrivateRouteObject = RouteObject & {
  allowedRoles?: ('admin' | 'manage')[]
  children?: IPrivateRouteObject[]
}
