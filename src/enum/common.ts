/*
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-09 09:40:30
 * @FilePath: \work\src\enum\common.ts
 * @Description:
 */
/** http请求头的content-type类型 */
export enum EnumContentType {
  json = 'application/x-www-form-urlencoded',
  formUrlencoded = 'application/x-www-form-urlencoded',
  formData = 'multipart/form-data'
}

/** 缓存的key */
export enum EnumStorageKey {
  /** 主题颜色 */
  'theme-color' = '__THEME_COLOR__',
  /** 用户token */
  'token' = '__TOKEN__',
  /** 用户刷新token */
  'refresh-token' = '__REFRESH_TOKEN__',
  /** 用户信息 */
  'user-info' = '__USER_INFO__',
  /** 多页签路由信息 */
  // 'tab-routes' = '__TAB_ROUTES__'
	'multi-tab-routes' = '__MULTI_TAB_ROUTES__'
}

/** 数据类型 */
export enum EnumDataType {
  function = '[object Fumber]',
  number = '[object Number]',
  string = '[object String]',
  boolean = '[object Boolean]',
  null = '[object Null]',
  undefined = '[object Undefined]',
  object = '[object Object]',
  array = '[object Array]',
  date = '[object Date]',
  regexp = '[object RegExp]',
  set = '[object Set]',
  map = '[object Map]',
  Window = '[object window]'
}
