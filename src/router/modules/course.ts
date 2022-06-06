/*
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-06 08:43:06
 * @FilePath: \work\src\router\modules\course.ts
 * @Description:
 */
const course: AuthRoute.Route = {
  name: 'course',
  path: '/course',
  component: 'basic',
  children: [
    {
      name: 'course_courseMgt',
      path: '/course/courseMgt',
      component: 'self',
      meta: {
        title: '课程管理',
        requiresAuth: true,
        icon: 'ic:baseline-block'
      }
    },
    {
      name: 'course_courseMark',
      path: '/course/courseMark',
      component: 'self',
      meta: {
        title: '课程成绩管理',
        requiresAuth: true,
        icon: 'ic:baseline-web-asset-off'
      }
    },
    {
      name: 'course_courseLabel',
      path: '/course/courseLabel',
      component: 'self',
      meta: {
        title: '课程标签管理',
        requiresAuth: true,
        icon: 'ic:baseline-wifi-off'
      }
    },
    {
      name: 'course_courseInfo',
      path: '/course/courseInfo',
      component: 'self',
      meta: {
        keepAlive: true,
        title: '课程信息管理',
        requiresAuth: true,
        icon: 'ic:baseline-wifi-off'
      }
    },
    {
      name: 'course_courseDetail',
      path: '/course/courseDetail',
      component: 'self',
      meta: {
        title: '课程预览',
        requiresAuth: true,
        hide: true,
        keepAlive: true
      }
    }
  ],
  meta: {
    title: '课程',
    requiresAuth: true,
    singleLayout: 'basic',
    icon: 'fluent:book-information-24-regular',
    order: 8
  }
};

export default course;
