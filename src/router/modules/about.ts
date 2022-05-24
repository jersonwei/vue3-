/*
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-04 11:20:24
 * @FilePath: \e-class-admin\src\router\modules\about.ts
 * @Description:
 */
const about: AuthRoute.Route = {
  name: 'about',
  path: '/about',
  component: 'self',
  meta: {
    title: '关于',
    requiresAuth: true,
    singleLayout: 'basic',
    permissions: ['super', 'admin', 'teacher'],
    icon: 'fluent:book-information-24-regular',
    order: 8
  }
};

export default about;
