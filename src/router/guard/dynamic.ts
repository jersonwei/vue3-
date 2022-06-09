/*
 * @Author: ZHENG
 * @Date: 2022-05-16 15:06:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-09 09:44:00
 * @FilePath: \work\src\router\guard\dynamic.ts
 * @Description:
 */
import type { Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import { routeName } from '@/router';
import { useRouteStore } from '@/store';
import { getToken } from '@/utils';

/**
 * 动态路由
 */
export async function createDynamicRouteGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext,
  router: Router
) {
  const route = useRouteStore();
  const isLogin = Boolean(getToken());

  // 初始化权限路由
  if (!route.isInitAuthRoute) {
    // 未登录情况下直接回到登录页，登录成功后再加载权限路由
    if (!isLogin) {
      if (to.name === routeName('login')) {
        next();
      } else {
        const redirect = to.fullPath;
        next({ name: routeName('login'), query: { redirect } });
      }
      return false;
    }

    await route.initAuthRoute(router);

    if (to.name === routeName('not-found-page')) {
      // 动态路由没有加载导致被not-found-page路由捕获，等待权限路由加载好了，回到之前的路由
      // next({ path: to.fullPath, replace: true, query: to.query });
			const ROOT_ROUTE_NAME: AuthRoute.RouteKey = 'root';
			const path = to.redirectedFrom?.name === ROOT_ROUTE_NAME ? '/' : to.fullPath;
      next({ path, replace: true, query: to.query, hash: to.hash });
      return false;
    }
  }

  // 权限路由已经加载，仍然未找到，重定向到not-found
  if (to.name === routeName('not-found-page')) {
    next({ name: routeName('not-found'), replace: true });
    return false;
  }

  return true;
}
