export const routeModel: Record<Auth.RoleType, AuthRoute.Route[]> = {
  super: [
    {
      name: 'dashboard',
      path: '/dashboard',
      component: 'basic',
      children: [
        {
          name: 'dashboard_analysis',
          path: '/dashboard/analysis',
          component: 'self',
          meta: {
            title: '分析页',
            requiresAuth: true,
            icon: 'icon-park-outline:analysis'
          }
        },
        {
          name: 'dashboard_workbench',
          path: '/dashboard/workbench',
          component: 'self',
          meta: {
            title: '工作台',
            requiresAuth: true,
            icon: 'icon-park-outline:workbench'
          }
        }
      ],
      meta: {
        title: '仪表盘',
        icon: 'carbon:dashboard',
        order: 1
      }
    },
    {
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
          name: 'course_courseType',
          path: '/course/courseType',
          component: 'self',
          meta: {
            title: '课程分类',
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
            icon: 'ic:baseline-web-asset-off',
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
            title: '课程配置',
            requiresAuth: true,
            hide: true,
            keepAlive: true,
						activeMenu: 'course_courseMgt',
          }
        },
        {
          name: 'course_courseDetail',
          path: '/course/courseDetail',
          component: 'blank',
          meta: {
            title: '课程预览',
            requiresAuth: true,
            hide: true,
            keepAlive: true
          }
        },
        {
          name: 'course_coursePreview',
          path: '/course/coursePreview',
          component: 'self',
          meta: {
            title: '课时预览',
            requiresAuth: true,
            hide: true,
            keepAlive: true
          }
        }
      ],
      meta: {
        title: '在线课程',
        icon: 'fluent:book-information-24-regular',
        order: 8
      }
    },
    {
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
            icon: 'ic:baseline-block'
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
        icon: 'fluent:book-information-24-regular',
        order: 8
      }
    }
		,
    {
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
        },
        {
          name: 'user_teacher',
          path: '/user/teacher',
          component: 'self',
          meta: {
            title: '教师管理',
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
            hide: true,
            keepAlive: true,
            icon: 'ic:baseline-block'
          }
        }
      ],
      meta: {
        title: '用户管理',
        icon: 'fluent:book-information-24-regular',
        order: 8
      }
    },
    {
      name: 'about',
      path: '/about',
      component: 'self',
      meta: {
        title: '关于',
        requiresAuth: true,
        singleLayout: 'basic',
        icon: 'fluent:book-information-24-regular',
        order: 8
      }
    }
  ],
  admin: [
    {
      name: 'dashboard',
      path: '/dashboard',
      component: 'basic',
      children: [
        {
          name: 'dashboard_analysis',
          path: '/dashboard/analysis',
          component: 'self',
          meta: {
            title: '分析页',
            requiresAuth: true,
            icon: 'icon-park-outline:analysis'
          }
        },
        {
          name: 'dashboard_workbench',
          path: '/dashboard/workbench',
          component: 'self',
          meta: {
            title: '工作台',
            requiresAuth: true,
            icon: 'icon-park-outline:workbench'
          }
        }
      ],
      meta: {
        title: '仪表盘',
        icon: 'carbon:dashboard',
        order: 1
      }
    },
    {
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
            icon: 'ic:baseline-block'
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
        icon: 'fluent:book-information-24-regular',
        order: 8
      }
    },
    {
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
            title: '课程配置',
            hide: true
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
        },
        {
          name: 'course_coursePreview',
          path: '/course/coursePreview',
          component: 'self',
          meta: {
            title: '课时预览',
            requiresAuth: true,
            hide: true,
            keepAlive: true
          }
        }
      ],
      meta: {
        title: '在线课程',
        icon: 'fluent:book-information-24-regular',
        order: 8
      }
    },
    {
      name: 'test',
      path: '/test',
      component: 'basic',
      children: [
        {
          name: 'test_baseType',
          path: '/test/baseType',
          component: 'self',
          meta: {
            title: '题库分类',
            requiresAuth: true,
            icon: 'gg:calendar-today',
            keepAlive: true
          }
        },
        {
          name: 'test_baseManager',
          path: '/test/baseManager',
          component: 'self',
          meta: {
            title: '题库管理',
            requiresAuth: true,
            icon: 'gg:calendar-today',
            keepAlive: true
          }
        },
        {
          name: 'test_pointManager',
          path: '/test/pointManager',
          component: 'self',
          meta: {
            title: '知识点管理',
            requiresAuth: true,
            icon: 'gg:calendar-today'
          }
        },
        {
          name: 'test_questManager',
          path: '/test/questManager',
          component: 'self',
          meta: {
            title: '题目管理',
            requiresAuth: true,
            icon: 'gg:calendar-today',
            keepAlive: true
          }
        },
        {
          name: 'test_addQuest',
          path: '/test/addQuest',
          component: 'self',
          meta: {
            title: '添加题目',
            requiresAuth: true,
            hide: true,
            icon: 'gg:calendar-today'
          }
        },
				{
          name: 'test_examType',
          path: '/test/examType',
          component: 'self',
          meta: {
            title: '试卷分类',
            requiresAuth: true,
            icon: 'gg:calendar-today'
          }
        },
        {
          name: 'test_examManager',
          path: '/test/examManager',
          component: 'self',
          meta: {
            title: '试卷管理',
            requiresAuth: true,
            icon: 'gg:calendar-today'
          }
        },
        {
          name: 'test_addExam',
          path: '/test/addExam',
          component: 'self',
          meta: {
            title: '试卷创编',
            requiresAuth: true,
            hide: true,
            icon: 'gg:calendar-today'
          }
        }
      ],
      meta: {
        title: '测评管理',
        icon: 'gg:calendar-today',
        order: 8
      }
    },
    {
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
        },
        {
          name: 'user_teacher',
          path: '/user/teacher',
          component: 'self',
          meta: {
            title: '教师管理',
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
            hide: true,
            keepAlive: true,
            icon: 'ic:baseline-block'
          }
        }
      ],
      meta: {
        title: '用户管理',
        icon: 'fluent:book-information-24-regular',
        order: 8
      }
    },
    {
      name: 'about',
      path: '/about',
      component: 'self',
      meta: {
        title: '关于',
        requiresAuth: true,
        singleLayout: 'basic',
        icon: 'fluent:book-information-24-regular',
        order: 8
      }
    }
  ],
  teacher: [
    {
      name: 'dashboard',
      path: '/dashboard',
      component: 'basic',
      children: [
        {
          name: 'dashboard_analysis',
          path: '/dashboard/analysis',
          component: 'self',
          meta: {
            title: '分析页',
            requiresAuth: true,
            icon: 'icon-park-outline:analysis'
          }
        }
      ],
      meta: {
        title: '仪表盘',
        icon: 'carbon:dashboard',
        order: 1
      }
    },
    {
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
            icon: 'ri:menu-3-fill'
          }
        },
        {
          name: 'system_dictionary',
          path: '/system/dictionary',
          component: 'self',
          meta: {
            title: '字典',
            requiresAuth: true,
            icon: 'arcticons:dictionary-cs-fr'
          }
        }
      ],
      meta: {
        title: '系统管理',
        icon: 'bi:gear-wide',
        order: 8
      }
    },
    {
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
            icon: 'gg:calendar-today',
            keepAlive: true
          }
        },
				{
          name: 'course_courseType',
          path: '/course/courseType',
          component: 'self',
          meta: {
            title: '课程分类',
            requiresAuth: true,
            icon: 'ic:baseline-block'
          }
        },
        {
          name: 'course_courseMark',
          path: '/course/courseMark',
          component: 'self',
          meta: {
            title: '课程成绩',
            requiresAuth: true,
            keepAlive: true,
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
            keepAlive: true,
            icon: 'ic:baseline-wifi-off'
          }
        },
        {
          name: 'course_courseInfo',
          path: '/course/courseInfo',
          component: 'self',
          meta: {
            title: '课程配置',
            keepAlive: true,
            hide: true,
						activeMenu: 'course_courseMgt',
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
            keepAlive: true,
						activeMenu: 'course_courseMgt',
          }
        },
        {
          name: 'course_coursePreview',
          path: '/course/coursePreview',
          component: 'self',
          meta: {
            title: '课时预览',
            requiresAuth: true,
            hide: true,
            keepAlive: true,
						activeMenu: 'course_courseMgt',
          }
        },
        {
          name: 'course_courseReport',
          path: '/course/courseReport',
          component: 'self',
          meta: {
            title: '课程报告成绩管理',
            requiresAuth: true,
            hide: true,
            keepAlive: true,
						activeMenu: 'course_courseMark',
          }
        },
        {
          name: 'course_coursePractice',
          path: '/course/coursePractice',
          component: 'self',
          meta: {
            title: '课程测评成绩管理',
            requiresAuth: true,
            hide: true,
            keepAlive: true
          }
        }
      ],
      meta: {
        title: '在线课程',
        icon: 'carbon:course',
        order: 8
      }
    },
    {
      name: 'test',
      path: '/test',
      component: 'basic',
      children: [
        {
          name: 'test_baseType',
          path: '/test/baseType',
          component: 'self',
          meta: {
            title: '题库分类',
            requiresAuth: true,
            icon: 'gg:calendar-today',
            keepAlive: true
          }
        },
        {
          name: 'test_baseManager',
          path: '/test/baseManager',
          component: 'self',
          meta: {
            title: '题库管理',
            requiresAuth: true,
            icon: 'gg:calendar-today',
            keepAlive: true
          }
        },
        {
          name: 'test_pointManager',
          path: '/test/pointManager',
          component: 'self',
          meta: {
            title: '知识点管理',
            requiresAuth: true,
            icon: 'gg:calendar-today',
            keepAlive: true
          }
        },
        {
          name: 'test_questManager',
          path: '/test/questManager',
          component: 'self',
          meta: {
            title: '题目管理',
            requiresAuth: true,
            icon: 'gg:calendar-today',
            keepAlive: true
          }
        },
        {
          name: 'test_addQuest',
          path: '/test/addQuest',
          component: 'self',
          meta: {
            title: '添加题目',
            requiresAuth: true,
            hide: true,
            icon: 'gg:calendar-today'
          }
        },
				{
          name: 'test_examType',
          path: '/test/examType',
          component: 'self',
          meta: {
            title: '试卷分类',
            requiresAuth: true,
            icon: 'gg:calendar-today'
          }
        },
        {
          name: 'test_examManager',
          path: '/test/examManager',
          component: 'self',
          meta: {
            title: '试卷管理',
            requiresAuth: true,
            icon: 'gg:calendar-today'
          }
        },
        {
          name: 'test_addExam',
          path: '/test/addExam',
          component: 'self',
          meta: {
            title: '试卷创编',
            requiresAuth: true,
            hide: true,
            icon: 'gg:calendar-today'
          }
        }
      ],
      meta: {
        title: '测评管理',
        icon: 'gg:calendar-today',
        order: 8
      }
    },
    {
      name: 'learnAnalysis',
      path: '/learnAnalysis',
      component: 'basic',
      children: [
        {
          name: 'learnAnalysis_testAnalysis',
          path: '/learnAnalysis/testAnalysis',
          component: 'self',
          meta: {
            title: '实验分析',
            requiresAuth: true,
            icon: 'icon-park-outline:analysis'
          }
        },
				{
          name: 'learnAnalysis_testAnalysis_personalTest',
              path: '/learnAnalysis/testAnalysis/personalTest',
              component: 'self',
              meta: {
                title: '个人实验分析',
                requiresAuth: true,
                icon: 'ic:outline-menu',
								activeMenu: 'learnAnalysis_testAnalysis',
              }
        },
        {
          name: 'learnAnalysis_questAnalysis',
          path: '/learnAnalysis/questAnalysis',
          component: 'multi',
          children: [
            {
              name: 'learnAnalysis_questAnalysis_personalTest',
              path: '/learnAnalysis/questAnalysis/personalTest',
              component: 'self',
              meta: {
                title: '个人习题分析',
                requiresAuth: true,
                icon: 'ic:outline-menu'
              }
            }
          ],
          meta: {
            title: '习题分析',
            requiresAuth: true,
            icon: 'icon-park-outline:analysis'
          }
        },
        {
          name: 'learnAnalysis_examAnalysis',
          path: '/learnAnalysis/examAnalysis',
          component: 'multi',
          children: [
            {
              name: 'learnAnalysis_examAnalysis_personalTest',
              path: '/learnAnalysis/examAnalysis/personalTest',
              component: 'self',
              meta: {
                title: '个人考试分析',
                requiresAuth: true,
                icon: 'ic:outline-menu'
              }
            }
          ],
          meta: {
            title: '考试分析',
            requiresAuth: true,
            icon: 'icon-park-outline:analysis'
          }
        }
      ],
      meta: {
        title: '学情分析',
        icon: 'carbon:dashboard',
        order: 1
      }
    },
		{
      name: 'experiment',
      path: '/experiment',
      component: 'basic',
      children: [
        {
          name: 'experiment_experimentManager',
          path: '/experiment/experimentManager',
          component: 'self',
          meta: {
            title: '实验课程列表',
            requiresAuth: true,
            icon: 'icon-park-outline:analysis'
          }
        },
      ],
      meta: {
        title: '我的实验',
        icon: 'carbon:dashboard',
        order: 1
      }
    },
		{
      name: 'virtualizer',
      path: '/virtualizer',
      component: 'basic',
      children: [
        {
          name: 'virtualizer_VMTemplateManage',
          path: '/virtualizer/VMTemplateManage',
          component: 'self',
          meta: {
            title: '虚拟机列表',
            requiresAuth: true,
            icon: 'icon-park-outline:analysis'
          }
        },
      ],
      meta: {
        title: '我的虚拟机',
        icon: 'carbon:dashboard',
        order: 1
      }
    },
		{
      name: 'setting',
      path: '/setting',
      component: 'basic',
      children: [
        {
          name: 'setting_baseSetting',
          path: '/setting/baseSetting',
          component: 'self',
          meta: {
            title: '个人信息',
            requiresAuth: true,
            icon: 'icon-park-outline:analysis'
          }
        },
      ],
      meta: {
        title: '个人设置',
        icon: 'carbon:dashboard',
        order: 1
      }
    },
    {
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
        },
        {
          name: 'user_teacher',
          path: '/user/teacher',
          component: 'self',
          meta: {
            title: '教师管理',
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
            hide: true,
            keepAlive: true,
            icon: 'ic:baseline-block'
          }
        }
      ],
      meta: {
        title: '用户管理',
        icon: 'fluent:book-information-24-regular',
        order: 8
      }
    },
    {
      name: 'about',
      path: '/about',
      component: 'self',
      meta: {
        title: '关于',
        requiresAuth: true,
        singleLayout: 'basic',
        icon: 'fluent:book-information-24-regular',
        order: 8
      }
    }
  ]
};
