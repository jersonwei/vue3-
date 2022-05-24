/*
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-18 08:37:39
 * @FilePath: \work\src\utils\router\component.ts
 * @Description:
 */
import type { Component } from 'vue';
import { EnumLayoutComponentName } from '@/enum';
import { BasicLayout, BlankLayout } from '@/layouts';
import { views } from '@/views';
import { consoleError } from '../common';

type LayoutComponent = Record<EnumType.LayoutComponentName, () => Promise<Component>>;

/**
 * 获取页面导入的vue文件(懒加载的方式)
 * @param layoutType - 布局类型
 */
export function getLayoutComponent(layoutType: EnumType.LayoutComponentName) {
  const layoutComponent: LayoutComponent = {
    basic: BasicLayout,
    blank: BlankLayout
  };
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return () => setViewComponentName(layoutComponent[layoutType], EnumLayoutComponentName[layoutType]);
}

/**
 * 获取页面导入的vue文件(懒加载的方式)
 * @param routeKey - 路由key
 */
export function getViewComponent(routeKey: AuthRoute.RouteKey) {
  if (!views[routeKey]) {
    consoleError(`路由“${routeKey}”没有对应的组件文件！`);
  }
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return () => setViewComponentName(views[routeKey], routeKey) as Promise<Component>;
}

/** 给页面组件设置名称 */
async function setViewComponentName(asyncComponent: () => Promise<Component>, name: string) {
  const component = (await asyncComponent()) as { default: Component };
  Object.assign(component.default, { name });
  return component;
}
