/*
 * @Author: ZHENG
 * @Date: 2022-06-07 10:15:50
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-07 10:36:31
 * @FilePath: \work\src\hooks\web\usePermission.ts
 * @Description:
 */
import { getUserInfo } from "@/utils";

export function usePermission() {
  const userStore = getUserInfo();

  /**
   * 检查权限
   * @param accesses
   */
  function _somePermissions(accesses: string[]) {
    return userStore.userRole.some((item) => {
      const { value }: any = item;
      return accesses.includes(value);
    });
  }

  /**
   * 判断是否存在权限
   * 可用于 v-if 显示逻辑
   * */
  function hasPermission(accesses: string[]): boolean {
    if (!accesses || !accesses.length) return true;
    return _somePermissions(accesses);
  }

  /**
   * 是否包含指定的所有权限
   * @param accesses
   */
  function hasEveryPermission(accesses: string[]): boolean {
    const permissionsList = userStore.getPermissions;
    if (Array.isArray(accesses)) {
      return permissionsList.every((access: any) => accesses.includes(access.value));
    }
    throw new Error(`[hasEveryPermission]: ${accesses} should be a array !`);
  }

  /**
   * 是否包含其中某个权限
   * @param accesses
   * @param accessMap
   */
  function hasSomePermission(accesses: string[]): boolean {
    const permissionsList = userStore.getPermissions;
    if (Array.isArray(accesses)) {
      return permissionsList.some((access: any) => accesses.includes(access.value));
    }
    throw new Error(`[hasSomePermission]: ${accesses} should be a array !`);
  }

  return { hasPermission, hasEveryPermission, hasSomePermission };
}
