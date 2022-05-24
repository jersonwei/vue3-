/*
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-16 15:07:02
 * @FilePath: \work\mock\api\route.ts
 * @Description:
 */
import type { MockMethod } from 'vite-plugin-mock';
import { userModel, routeModel } from '../model';

const apis: MockMethod[] = [
  {
    url: '/mock/getUserRoutes',
    method: 'post',
    response: (options: Service.MockOption): Service.MockServiceResult => {
      const { userId = undefined } = options.body;

      const routeHomeName: AuthRoute.RouteKey = 'dashboard_analysis';

      const role = userModel.find(item => item.userId === userId)?.userRole || 'teacher';

      const filterRoutes = routeModel[role];
      return {
        code: 200,
        message: 'ok',
        data: {
          routes: filterRoutes,
          home: routeHomeName
        }
      };
    }
  }
];

export default apis;
