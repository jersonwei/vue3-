## 简介

基于 Vue3、Vite、TS、Naive UI、Pinia 的项目，使用了最新的技术栈，代码规范已设置 Eslint+Prettier、动态权限路由

## 特性

- :使用 Vue3/Vite2 等前端前沿技术开发，使用 pnpm 作为包管理器
- :使用 Ts 开发
- : 基于 windicss
- : 代码规范基于 Eslint+Prettier
- : 封装请求
- ：UI 使用 Naive UI
- : Sass 使用

## 方便开发

引入 unplugin-auto-import
引入 unplugin-vue-components
引入 unplugin-icons
引入 dayjs
引入 crypto-js 加密
引入 colord
引入 vite-plugin-purge-icons @iconify/json -D iconfont 组件库
引入 qs 解析
安装 @vueuse/core 方法库
引入 ua-parser-js
pnpm i clipboard 复制文字
print-js 页面打印
vditor MARKDOWN 编写需求
wangEditer 富文本编辑器
@antv/g2plot 图表
xgplayer 视频播放插件/ 后期有直播需求

## 接口封装

基于 axios 以及 nprogress 配置

# 浏览器支持

支持现代浏览器，不支持 IE [vue3后台项目](http://192.168.3.204:10101/r/e-class-admin.git)
支持火狐，支持 360 之类的就行，经理说是我们指定别人用

  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{vue,js,jsx,ts,tsx}": "eslint --fix"
  },
