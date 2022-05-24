/*
 * @Author: ZHENG
 * @Date: 2022-05-16 15:06:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-16 16:11:16
 * @FilePath: \work\src\utils\router\cache.ts
 * @Description:
 */
import type { RouteRecordRaw } from 'vue-router';

/**
 * 获取缓存的路由对应组件的名称
 * @param routes - 转换后的vue路由
 */
export function getCacheRoutes(routes: RouteRecordRaw[]) {
  const cacheNames: string[] = [];
  routes.forEach(route => {
    // 只需要获取二级路由的缓存的组件名
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    if (hasChildren(route)) {
      (route.children as RouteRecordRaw[]).forEach(item => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        if (isKeepAlive(item)) {
          cacheNames.push(item.name as string);
        }
      });
    }
  });
  return cacheNames;
}

/**
 * 路由是否缓存
 * @param route
 */
function isKeepAlive(route: RouteRecordRaw) {
  return Boolean(route?.meta?.keepAlive);
}
/**
 * 是否有二级路由
 * @param route
 */
function hasChildren(route: RouteRecordRaw) {
  return Boolean(route.children && route.children.length);
}
