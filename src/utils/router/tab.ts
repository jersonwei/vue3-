/*
 * @Author: ZHENG
 * @Date: 2022-05-16 15:06:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-09 09:56:55
 * @FilePath: \work\src\utils\router\tab.ts
 * @Description:
 */
import { EnumStorageKey } from '@/enum';
import { setLocal, getLocal } from '../storage';

/** 缓存多页签数据 */
export function setTabRoutes(data: GlobalTabRoute[]) {
  // setLocal(EnumStorageKey['tab-routes'], data);
	setLocal(EnumStorageKey['multi-tab-routes'], data);
}

/** 获取缓存的多页签数据 */
export function getTabRoutes() {
  const routes: GlobalTabRoute[] = [];
  // const data = getLocal<GlobalTabRoute[]>(EnumStorageKey['tab-routes']);
	const data = getLocal<GlobalTabRoute[]>(EnumStorageKey['multi-tab-routes']);
  if (data) {
    const defaultTabRoutes = data.map(item => ({
      ...item,
      scrollPosition: {
        left: 0,
        top: 0
      }
    }));
    routes.push(...defaultTabRoutes);
  }
  return routes;
}

/** 清空多页签数据 */
export function clearTabRoutes() {
  setTabRoutes([]);
}
