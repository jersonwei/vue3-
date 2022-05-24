/*
 * @Author: ZHENG
 * @Date: 2022-05-02 23:01:35
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-05 08:58:16
 * @FilePath: \e-class-admin\mock\api\list.ts
 * @Description:
 */
import type { MockMethod } from 'vite-plugin-mock';

const apis: MockMethod[] = [
  // 表格数据列表
  {
    url: '/mock/searchCouserInfo',
    timeout: 1000,
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: {
          pageCount: 3, // 总页数字段名
          pageSize: 5, // 每页数量字段名
          listTotal: 200, // 总行数
          page: 1, // 当前页
          list: [
            {
              id: 1,

              courseName: 'python语言',

              courseCategory: 1,

              majorId: 1,

              coverPic: '封面信息',

              courseDecribe: '4',

              status: 0,

              creater: 10086,

              createTime: '2022-02-14 14:32:12',

              lecturer: 10086,

              secLecturer: 1,

              labelId: '4',

              launchTime: '2022-03-22 11:30:16',

              courseOutline: 'D:/IdeaProjects/huang/upload/outline/python语言_aaa.docx'
            },
            {
              id: 2,

              courseName: 'C程序设计',

              courseCategory: 1,

              majorId: 5,

              coverPic: 'D:\\develop\\J2EE\\RUIZHI\\e-class\\education/upload/cover/20220318094248_013-02.jpg',

              courseDecribe: '课程描述',

              status: 0,

              creater: 12,

              createTime: '2022-03-18 09:42:49',

              lecturer: 1,

              secLecturer: 1,

              labelId: '1',

              launchTime: '2022-03-18 11:07:38',

              courseOutline:
                'D:/develop/J2EE/RUIZHI/e-class/education/upload/outline/C程序设计_ECharts数据可视化入门.docx'
            },
            {
              id: 3,

              courseName: 'java程序设计',

              courseCategory: 1,

              majorId: 1,

              coverPic: 'D:\\develop\\J2EE\\RUIZHI\\e-class\\education/upload/cover/20220318093206_013-02.jpg',

              courseDecribe: '课程描述',

              status: 0,

              creater: 12,

              createTime: '2022-03-18 09:32:06',

              lecturer: 1,

              secLecturer: 1,

              labelId: '1',

              launchTime: '2022-03-18 11:07:40',

              courseOutline:
                'D:/develop/J2EE/RUIZHI/e-class/education/upload/outline/C程序设计_ECharts数据可视化入门.docx'
            },
            {
              id: 4,

              courseName: '123',

              courseCategory: 1,

              majorId: 9223372036854776000,

              coverPic: '1',

              courseDecribe: '1',

              status: 11,

              creater: 1,

              createTime: '2022-03-07 15:07:39',

              lecturer: 1,

              secLecturer: 1,

              labelId: '1',

              launchTime: '2022-03-22 11:30:19',

              courseOutline: '1'
            },
            {
              id: 5,

              courseName: '123',

              courseCategory: 1,

              majorId: 9223372036854776000,

              coverPic: '1',

              courseDecribe: '1',

              status: 11,

              creater: 1,

              createTime: '2022-03-07 15:07:39',

              lecturer: 1,

              secLecturer: 1,

              labelId: '1',

              launchTime: '2022-03-22 11:30:19',

              courseOutline: '1'
            },
            {
              id: 6,

              courseName: '123',

              courseCategory: 1,

              majorId: 9223372036854776000,

              coverPic: '1',

              courseDecribe: '1',

              status: 11,

              creater: 1,

              createTime: '2022-03-07 15:07:39',

              lecturer: 1,

              secLecturer: 1,

              labelId: '1',

              launchTime: '2022-03-22 11:30:19',

              courseOutline: '1'
            },
            {
              id: 7,

              courseName: '123',

              courseCategory: 1,

              majorId: 9223372036854776000,

              coverPic: '1',

              courseDecribe: '1',

              status: 11,

              creater: 1,

              createTime: '2022-03-07 15:07:39',

              lecturer: 1,

              secLecturer: 1,

              labelId: '1',

              launchTime: '2022-03-22 11:30:19',

              courseOutline: '1'
            },
            {
              id: 8,

              courseName: '123',

              courseCategory: 1,

              majorId: 9223372036854776000,

              coverPic: '1',

              courseDecribe: '1',

              status: 11,

              creater: 1,

              createTime: '2022-03-07 15:07:39',

              lecturer: 1,

              secLecturer: 1,

              labelId: '1',

              launchTime: '2022-03-22 11:30:19',

              courseOutline: '1'
            },
            {
              id: 9,

              courseName: '123',

              courseCategory: 1,

              majorId: 9223372036854776000,

              coverPic: '1',

              courseDecribe: '1',

              status: 11,

              creater: 1,

              createTime: '2022-03-07 15:07:39',

              lecturer: 1,

              secLecturer: 1,

              labelId: '1',

              launchTime: '2022-03-22 11:30:19',

              courseOutline: '1'
            },
            {
              id: 10,

              courseName: '123',

              courseCategory: 1,

              majorId: 9223372036854776000,

              coverPic: '1',

              courseDecribe: '1',

              status: 11,

              creater: 1,

              createTime: '2022-03-07 15:07:39',

              lecturer: 1,

              secLecturer: 1,

              labelId: '1',

              launchTime: '2022-03-22 11:30:19',

              courseOutline: '1'
            },
            {
              id: 11,

              courseName: '123',

              courseCategory: 1,

              majorId: 9223372036854776000,

              coverPic: '1',

              courseDecribe: '1',

              status: 11,

              creater: 1,

              createTime: '2022-03-07 15:07:39',

              lecturer: 1,

              secLecturer: 1,

              labelId: '1',

              launchTime: '2022-03-22 11:30:19',

              courseOutline: '1'
            },
            {
              id: 12,

              courseName: '123',

              courseCategory: 1,

              majorId: 9223372036854776000,

              coverPic: '1',

              courseDecribe: '1',

              status: 11,

              creater: 1,

              createTime: '2022-03-07 15:07:39',

              lecturer: 1,

              secLecturer: 1,

              labelId: '1',

              launchTime: '2022-03-22 11:30:19',

              courseOutline: '1'
            },
            {
              id: 13,

              courseName: '123',

              courseCategory: 1,

              majorId: 9223372036854776000,

              coverPic: '1',

              courseDecribe: '1',

              status: 11,

              creater: 1,

              createTime: '2022-03-07 15:07:39',

              lecturer: 1,

              secLecturer: 1,

              labelId: '1',

              launchTime: '2022-03-22 11:30:19',

              courseOutline: '1'
            },
            {
              id: 14,

              courseName: '123',

              courseCategory: 1,

              majorId: 9223372036854776000,

              coverPic: '1',

              courseDecribe: '1',

              status: 11,

              creater: 1,

              createTime: '2022-03-07 15:07:39',

              lecturer: 1,

              secLecturer: 1,

              labelId: '1',

              launchTime: '2022-03-22 11:30:19',

              courseOutline: '1'
            }
          ]
        }
      };
    }
  }
];
export default apis;
