/*
 * @Author: ZHENG
 * @Date: 2022-05-03 21:31:07
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-18 08:41:05
 * @FilePath: \work\src\hooks\event\useWindowSizeFn.ts
 * @Description:
 *
 */
import { tryOnMounted, tryOnUnmounted, useDebounceFn } from '@vueuse/core';

interface WindowSizeOptions {
  once?: boolean;
  immediate?: boolean;
  listenerOptions?: AddEventListenerOptions | boolean;
}

// eslint-disable-next-line default-param-last
export function useWindowSizeFn<T>(fn: Fn<T>, wait = 150, options?: WindowSizeOptions) {
  let handler = () => {
    fn();
  };

  const handleSize = useDebounceFn(handler, wait);
  handler = handleSize;

  const start = () => {
    if (options && options.immediate) {
      handler();
    }
    window.addEventListener('resize', handler);
  };

  const stop = () => {
    window.removeEventListener('resize', handler);
  };

  tryOnMounted(() => {
    start();
  });

  tryOnUnmounted(() => {
    stop();
  });
  return [start, stop];
}
