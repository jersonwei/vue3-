const user: AuthRoute.Route = {
  name: 'user',
  path: '/user',
  component: 'basic',
  children: [
    {
      name: 'user_student',
      path: '/user/student',
      component: 'self',
      meta: {
        title: '学生管理',
        requiresAuth: true,
        icon: 'ic:baseline-block'
      }
    }
		,
    {
      name: 'user_teacher',
      path: '/user/teacher',
      component: 'self',
      meta: {
        title: '教师管理',
        requiresAuth: true,
        icon: 'ic:baseline-web-asset-off'
      }
    },
		{
			name: 'user_recordSee',
			path: '/user/recordSee',
			component: 'self',
			meta: {
				title: '学生档案',
				requiresAuth: true,
				icon: 'ic:baseline-block'
			}
		},
		{
			name: 'user_toLead',
			path: '/user/toLead',
			component: 'self',
			meta: {
				title: '学生导入',
				requiresAuth: true,
				icon: 'ic:baseline-block'
			}
		}
  ],
  meta: {
    title: '用户管理',
    requiresAuth: true,
    singleLayout: 'basic',
    icon: 'fluent:book-information-24-regular',
    order: 8
  }
}

export default user;
