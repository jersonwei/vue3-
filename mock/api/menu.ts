/*
 * @Author: ZHENG
 * @Date: 2022-05-04 18:01:57
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-06 08:50:50
 * @FilePath: \e-class-admin\mock\api\menu.ts
 * @Description:
 */
import type { MockMethod } from 'vite-plugin-mock';

//  admin
// super
// teacher
// student // userRole  // findUserInfo

const menuList = () => {
  const result: any[] = [
    {
      label: 'Dashboard',
      key: 'dashboard',
      type: 1,
      subtitle: 'dashboard',
      openType: 1,
      auth: 'dashboard',
      editAuth: 'teacher',
      path: '/dashboard'
    },
    {
      label: '表单管理',
      key: 'form',
      type: 1,
      subtitle: 'form',
      openType: 1,
      auth: 'form',
      path: '/form'
    }
  ];

  return result;
};

const apis: MockMethod[] = [
  // 表格数据列表
  {
    url: '/mock/menu/list',
    timeout: 1000,
    method: 'get',
    response: () => {
      const list = menuList();
      return {
        code: 200,
        message: 'ok',
        data: {
          list
        }
      };
    }
  }
];
export default apis;
