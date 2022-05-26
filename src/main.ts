/*
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-26 10:51:14
 * @FilePath: \work\src\main.ts
 * @Description: 主文件
 */

import { createApp, toRaw } from 'vue';
import { createPinia, PiniaPluginContext } from 'pinia';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import hljs from 'highlight.js';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import { setupAssets } from './plugins';
import { setupStore } from './store';
import { setupDirectives } from './directives';
import { setupRouter } from './router';
import App from './App.vue';
import '@kangc/v-md-editor/lib/style/preview.css';
import '@kangc/v-md-editor/lib/theme/style/github.css';

async function setupApp() {
  // import assets: js、css
  setupAssets();

  const app = createApp(App);
  VMdPreview.use(githubTheme, {
    Hljs: hljs
  });
  // store plugin: pinia
  setupStore(app);

  // vue custom directives
  setupDirectives(app);
  app.use(VMdPreview);
  // vue router
  await setupRouter(app);

  // mount app
  app.mount('#app');
}

setupApp();
