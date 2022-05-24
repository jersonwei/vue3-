/*
 * @Author: ZHENG
 * @Date: 2022-05-16 15:06:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-17 08:31:55
 * @FilePath: \work\src\store\index.ts
 * @Description:
 */
import type { App } from 'vue';
import { createPinia } from 'pinia';

/** setup vue store plugin: pinia. - [安装vue状态管理插件：pinia] */
const store = createPinia();
export function setupStore(app: App) {
  app.use(store);
}

export * from './modules';
export * from './subscribe';
export { store };
