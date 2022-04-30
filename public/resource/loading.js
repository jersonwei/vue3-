/*
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-04-30 09:43:13
 * @FilePath: \soybean-admin-main\public\resource\loading.js
 * @Description:
 */


function addThemeColorCssVars() {
  const key = '__THEME_COLOR__';
  const defaultColor = '#1890ff';
  const themeColor = window.localStorage.getItem(key) || defaultColor;
  const cssVars = `--primary-color: ${themeColor}`;
  document.documentElement.style.cssText = cssVars;
}

addThemeColorCssVars();
