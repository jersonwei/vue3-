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
            requiresAuth: true,
            hide: true,
            keepAlive: true
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
            icon: 'gg:calendar-today'
          }
        },
        {
          name: 'test_addQuest',
          path: '/test/addQuest',
          component: 'self',
          meta: {
            title: '添加题目',
            requiresAuth: true,
            icon: 'gg:calendar-today'
          }
        },
        {
          name: 'exam_examManager',
          path: '/exam/examManager',
          component: 'self',
          meta: {
            title: '试卷管理',
            requiresAuth: true,
            icon: 'gg:calendar-today'
          }
        },
        {
          name: 'exam_examType',
          path: '/exam/examType',
          component: 'self',
          meta: {
            title: '试卷分类',
            requiresAuth: true,
            icon: 'gg:calendar-today'
          }
        },
        {
          name: 'exam_addExam',
          path: '/exam/addExam',
          component: 'self',
          meta: {
            title: '试卷创编',
            requiresAuth: true,
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
            icon: 'ic:baseline-block'
          }
        },
        {
          name: 'system_dictionary',
          path: '/system/dictionary',
          component: 'self',
          meta: {
            title: '字典',
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
            icon: 'gg:calendar-today',
            keepAlive: true
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
        },
        {
          name: 'course_courseReport',
          path: '/course/courseReport',
          component: 'self',
          meta: {
            title: '课程报告成绩管理',
            requiresAuth: true,
            hide: true,
            keepAlive: true
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
        icon: 'gg:calendar-today',
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
            icon: 'gg:calendar-today',
            keepAlive: true
          }
        },
        {
          name: 'exam_examManager',
          path: '/exam/examManager',
          component: 'self',
          meta: {
            title: '试卷管理',
            requiresAuth: true,
            icon: 'gg:calendar-today',
            keepAlive: true
          }
        },
        {
          name: 'exam_examType',
          path: '/exam/examType',
          component: 'self',
          meta: {
            title: '试卷分类',
            requiresAuth: true,
            icon: 'gg:calendar-today',
            keepAlive: true
          }
        },
        {
          name: 'exam_addExam',
          path: '/exam/addExam',
          component: 'self',
          meta: {
            title: '试卷创编',
            requiresAuth: true,
            icon: 'gg:calendar-today',
            keepAlive: true
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
