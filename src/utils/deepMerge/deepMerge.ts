/*
 * @Author: ZHENG
 * @Date: 2022-05-04 14:28:16
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-10 13:56:09
 * @FilePath: \e-class-admin\src\utils\deepMerge\deepMerge.ts
 * @Description:
 */
import { isObject } from '../common/typeof';

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  // eslint-disable-next-line no-restricted-syntax
  for (key in target) {
    // eslint-disable-next-line no-prototype-builtins
    if (target.hasOwnProperty(key)) {
      // eslint-disable-next-line no-param-reassign
      src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
    }
  }
  return src;
}
