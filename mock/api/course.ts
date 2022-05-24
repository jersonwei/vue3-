/*
 * @Author: ZHENG
 * @Date: 2022-05-04 18:01:57
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-09 15:23:13
 * @FilePath: \e-class-admin\mock\api\course.ts
 * @Description:
 */
import { TreeOption } from 'naive-ui';
import type { MockMethod } from 'vite-plugin-mock';

//  admin
// super
// teacher
// student // userRole  // findUserInfo

const courseList = (): TreeOption[] => {
  const result: any[] = [
    {
      label: 'C语言',
      key: 'C语言',
      type: 0,
      children: [
        {
          label: '章节1建设',
          key: '章节1建设',
          type: 1,
          children: [
            {
              label: '安装软件',
              key: '安装软件',
              type: 2
            },
            {
              label: '配置环境',
              key: '配置环境',
              type: 2
            }
          ]
        },
        {
          label: '章节2部署',
          key: '章节2部署',
          type: 1,
          children: [
            {
              label: '配置系统',
              key: '配置系统',
              type: 2
            }
          ]
        }
      ]
    }
  ];

  return result;
};

const apis: MockMethod[] = [
  // 表格数据列表
  {
    url: '/mock/course/list',
    timeout: 1000,
    method: 'get',
    response: () => {
      const list = courseList();
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
