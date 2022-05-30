/*
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-30 10:50:16
 * @FilePath: \work\mock\api\index.ts
 * @Description:
 */
import auth from './auth';
import route from './route';
import course from './course';

export default [...auth, ...route, ...course];
