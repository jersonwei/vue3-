/*
 * @Author: ZHENG
 * @Date: 2022-05-16 15:06:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-09 09:45:09
 * @FilePath: \work\src\router\helpers\scroll.ts
 * @Description:
 */
import type { RouterScrollBehavior } from 'vue-router';
import { useTabStore } from '@/store';

export const scrollBehavior: RouterScrollBehavior = (to, from) => {
  return new Promise(resolve => {
    const tab = useTabStore();

    if (to.hash) {
			const el = document.querySelector(to.hash);
      if (el) {
        resolve({
          el,
          behavior: 'smooth'
        });
      }
    }
    const { left, top } = tab.getTabScrollPosition(to.path);
    const scrollPosition = {
      left,
      top
    };
    const { scrollLeft, scrollTop } = document.documentElement;

    const isFromCached = Boolean(from.meta.keepAlive);
    if (isFromCached) {
      tab.recordTabScrollPosition(from.path, { left: scrollLeft, top: scrollTop });
    }

    const duration = !scrollPosition.left && !scrollPosition.top ? 0 : 350;

    setTimeout(() => {
      resolve(scrollPosition);
    }, duration);
  });
};
