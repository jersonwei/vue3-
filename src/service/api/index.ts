/*
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-25 08:35:11
 * @FilePath: \work\src\service\api\index.ts
 * @Description:
 */
export * from './auth';
export * from './demo';
// 登录模块-登录分类
export * from './login/login';

// 课程模块，从这里一起导出
export * from './course/index';

export * from './system/menu';
export * from './system/dictionary';
// 课程和小节
export * from './paper/paper';

export * from './testReport/testReport';

export * from './unitPracticeAnswers/unitPracticeAnswers';

export * from './courseMark/courseMark';

export * from './question/index';
