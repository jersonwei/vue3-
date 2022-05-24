/*
 * @Author: ZHENG
 * @Date: 2022-05-07 14:46:55
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-07 14:49:20
 * @FilePath: \e-class-admin\src\utils\date\date.ts
 * @Description:
 */

//
export function disablePreviousDate(ts: number) {
  return ts <= Date.now();
}
