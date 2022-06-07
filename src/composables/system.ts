/*
 * @Author: ZHENG
 * @Date: 2022-05-16 15:06:20
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-07 10:56:52
 * @FilePath: \work\src\composables\system.ts
 * @Description:
 */
import UAParser from 'ua-parser-js';
import { useAuthStore } from '@/store';
import { isArray, isString } from '@/utils';

interface AppInfo {
  /** 项目名称 */
  name: string;
  /** 项目标题 */
  title: string;
  /** 项目描述 */
  desc: string;
}

/** 项目信息 */
export function useAppInfo(): AppInfo {
  const { VITE_APP_NAME: name, VITE_APP_TITLE: title, VITE_APP_DESC: desc } = import.meta.env;

  return {
    name,
    title,
    desc
  };
}

/** 获取设备信息 */
export function useDeviceInfo() {
  const parser = new UAParser();
  const result = parser.getResult();
  return result;
}

/** 权限判断 */
export function usePermission() {
  const auth = useAuthStore();
	const { userRole } = auth.userInfo;

  function hasPermission(permission: Auth.RoleType | Auth.RoleType[]) {
    let has = userRole === 'teacher';
    if (!has) {
      if (isArray(permission)) {
        has = (permission as Auth.RoleType[]).includes(userRole);
      }
      if (isString(permission)) {
        has = (permission as Auth.RoleType) === userRole;
      }
    }
    return has;
  }

	/**
   * 检查权限
   * @param accesses
   */
	 function _somePermissions(accesses: string[]) {
    return accesses.some((item) => {
      return accesses.includes(userRole);
    });
  }
	 /**
   * 判断是否存在权限
   * 可用于 v-if 显示逻辑
   * */
		function hasBtnPermission(accesses: string[]): boolean {
			if (!accesses || !accesses.length) return true;
			return _somePermissions(accesses);
		}

  return {
    hasPermission,
		hasBtnPermission
  };
}
