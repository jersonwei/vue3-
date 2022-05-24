/*
 * @Author: ZHENG
 * @Date: 2022-05-04 17:27:11
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-05 15:22:09
 * @FilePath: \e-class-admin\src\router\modules\system.ts
 * @Description:
 */
const system: AuthRoute.Route = {
  name: 'system',
  path: '/system',
  component: 'basic',
  children: [
    {
      name: 'system_menu',
      path: '/system/menu',
      component: 'self',
      meta: {
        title: '菜单',
        requiresAuth: true,
        icon: 'mdi:map'
      }
    },
    {
      name: 'system_dictionary',
      path: '/system/dictionary',
      component: 'self',
      meta: {
        title: '菜单',
        requiresAuth: true,
        icon: 'ic:baseline-block'
      }
    }
  ],
  meta: {
    title: '系统管理',
    icon: 'clarity:plugin-line',
    order: 4
  }
};

export default system;
