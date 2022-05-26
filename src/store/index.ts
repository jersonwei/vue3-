/*
 * @Author: ZHENG
 * @Date: 2022-05-16 15:06:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-26 10:39:15
 * @FilePath: \work\src\store\index.ts
 * @Description:
 */
import type { App } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersist from 'pinia-plugin-persist';

/** setup vue store plugin: pinia. - [安装vue状态管理插件：pinia] */
const store = createPinia();
// 持久化pinia数据
store.use(piniaPluginPersist);
export function setupStore(app: App) {
  app.use(store);
}

export * from './modules';
export * from './subscribe';
export { store };
