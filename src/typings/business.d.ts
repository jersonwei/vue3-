/*
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-04 14:08:39
 * @FilePath: \e-class-admin\src\typings\business.d.ts
 * @Description:
 */
/** 用户相关模块 */
declare namespace Auth {
  /**
   * 用户角色类型(前端静态路由用角色类型进行路由权限的控制)
   * - super: 超级管理员(有学校管理)
   * - admin: 学校管理员
   * - teacher: 教师
   * - student: 学生(无权限路由)
   */
  // | 'student'| 'admin'
  type RoleType = 'super' | 'teacher';

  /** 用户信息 */
  interface UserInfo {
    /** 用户id */
    userId: string;
    /** 用户名 */
    userName: string;
    /** 用户角色类型 */
    userRole: RoleType;
  }
}

declare namespace Demo {
  interface DataWithAdapter {
    id: string;
    name: string;
  }
}
