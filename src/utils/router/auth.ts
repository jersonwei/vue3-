/*
 * @Author: ZHENG
 * @Date: 2022-05-16 15:06:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-16 16:11:40
 * @FilePath: \work\src\utils\router\auth.ts
 * @Description:
 */
/**
 * 根据用户权限过滤路由
 * @param routes - 权限路由
 * @param permission - 权限
 */
export function filterAuthRoutesByUserPermission(routes: AuthRoute.Route[], permission: Auth.RoleType) {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return routes.map(route => filterAuthRouteByUserPermission(route, permission)).flat(1);
}

/**
 * 根据用户权限过滤单个路由
 * @param route - 单个权限路由
 * @param permission - 权限
 */
function filterAuthRouteByUserPermission(route: AuthRoute.Route, permission: Auth.RoleType): AuthRoute.Route[] {
  const hasPermission =
    !route.meta.permissions || permission === 'super' || route.meta.permissions.includes(permission);

  if (route.children) {
    const filterChildren = route.children.map(item => filterAuthRouteByUserPermission(item, permission)).flat(1);
    Object.assign(route, { children: filterChildren });
  }
  return hasPermission ? [route] : [];
}
