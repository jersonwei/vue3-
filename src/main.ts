/*
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-06 11:56:23
 * @FilePath: \work\src\main.ts
 * @Description: 主文件
 */

import { createApp, toRaw } from 'vue';
import { setupAssets } from './plugins';
import { setupStore } from './store';
import { setupDirectives } from './directives';
import { setupRouter } from './router';
import App from './App.vue';
import VMdPreviewHtml from '@kangc/v-md-editor/lib/preview-html';
import '@kangc/v-md-editor/lib/style/preview-html.css';

// theme style
// import '@kangc/v-md-editor/lib/theme/style/vuepress';


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
	app.use(VMdPreviewHtml);
  // mount app
  app.mount('#app');
}

setupApp();
