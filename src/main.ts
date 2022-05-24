/*
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-23 14:44:34
 * @FilePath: \work\src\main.ts
 * @Description: 主文件
 */

import { createApp, toRaw } from 'vue';
import { createPinia, PiniaPluginContext } from 'pinia';
import { setupAssets } from './plugins';
import { setupStore } from './store';
import { setupDirectives } from './directives';
import { setupRouter } from './router';
import App from './App.vue';

async function setupApp() {
  // import assets: js、css
  setupAssets();

  const app = createApp(App);

  // store plugin: pinia
  setupStore(app);

  // vue custom directives
  setupDirectives(app);

  // vue router
  await setupRouter(app);

  // mount app
  app.mount('#app');
}

setupApp();

type Options = {
  key?: string;
};
const __piniaKey__ = 'zheng';

const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};
const getStorage = (key: string) => {
  const storageVal: any = localStorage.getItem(key);
  return storageVal ? JSON.parse(storageVal) : {};
};

// pinia 持久化
const PiniaPlugin = (options: Options) => {
  return (context: PiniaPluginContext) => {
    const { store } = context;
    const data = getStorage(`${options?.key ?? __piniaKey__}-${store.$id}`);
    store.$subscribe(() => {
      // 一有值的变化就会走
      setStorage(`${options?.key ?? __piniaKey__}-${store.$id}`, toRaw(store.$state));
    });
    return { ...data };
  };
};
const store = createPinia();
store.use(
  PiniaPlugin({
    key: 'pinia'
  })
);
