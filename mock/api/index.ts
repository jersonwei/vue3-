/*
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-05 11:54:30
 * @FilePath: \e-class-admin\mock\api\index.ts
 * @Description:
 */
import auth from './auth';
import route from './route';
import list from './list';
import course from './course';

export default [...auth, ...route, ...list, ...course];
