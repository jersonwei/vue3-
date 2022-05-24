/*
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-05 17:22:52
 * @FilePath: \e-class-admin\src\typings\global.d.ts
 * @Description:
 */
interface Window {
  $loadingBar?: import('naive-ui').LoadingBarProviderInst;
  $dialog?: import('naive-ui').DialogProviderInst;
  $message?: import('naive-ui').MessageProviderInst;
  $notification?: import('naive-ui').NotificationProviderInst;
}

/** 通用类型 */
declare namespace Common {
  /**
   * 策略模式
   * [状态, 为true时执行的回调函数]
   */
  type StrategyAction = [boolean, () => void];
}
// 声明一些类型
declare type Recordable<T = any> = Record<string, T>;
declare type Nullable<T> = T | null;
/** 构建时间 */
declare const PROJECT_BUILD_TIME: string;
