/*
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-24 15:20:40
 * @FilePath: \work\build\config\define.ts
 * @Description:
 */
import { format } from 'date-fns';

const date = new Date();
/** 项目构建时间 */
const PROJECT_BUILD_TIME = JSON.stringify(format(date, 'yyyy-MM-dd HH:mm:ss'));

export const viteDefine = {
  PROJECT_BUILD_TIME
};
