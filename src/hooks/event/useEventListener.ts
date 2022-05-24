/*
 * @Author: ZHENG
 * @Date: 2022-05-16 15:06:20
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-18 08:40:12
 * @FilePath: \work\src\hooks\event\useEventListener.ts
 * @Description:
 */
import type { Ref } from 'vue';
import { ref, watch, unref } from 'vue';
import { useThrottleFn, useDebounceFn } from '@vueuse/core';

export type RemoveEventFn = () => void;

export interface UseEventParams {
  el?: Element | Ref<Element | undefined> | Window | any;
  name: string;
  listener: EventListener;
  options?: boolean | AddEventListenerOptions;
  autoRemove?: boolean;
  isDebounce?: boolean;
  wait?: number;
}

export function useEventListener({
  el = window,
  name,
  listener,
  options,
  autoRemove = true,
  isDebounce = true,
  wait = 80
}: UseEventParams): { removeEvent: RemoveEventFn } {
  /* eslint-disable-next-line */
    let remove: RemoveEventFn = () => {
    };
  const isAddRef = ref(false);

  if (el) {
    const element: Ref<Element> = ref(el as Element);

    const handler = isDebounce ? useDebounceFn(listener, wait) : useThrottleFn(listener, wait);
    const realHandler = wait ? handler : listener;
    const removeEventListener = (e: Element) => {
      isAddRef.value = true;
      e.removeEventListener(name, realHandler, options);
    };
    const addEventListener = (e: Element) => e.addEventListener(name, realHandler, options);

    const removeWatch = watch(
      element,
      (v, _ov, cleanUp) => {
        if (v) {
          // eslint-disable-next-line no-unused-expressions
          !unref(isAddRef) && addEventListener(v);
          cleanUp(() => {
            // eslint-disable-next-line no-unused-expressions
            autoRemove && removeEventListener(v);
          });
        }
      },
      { immediate: true }
    );

    remove = () => {
      removeEventListener(element.value);
      removeWatch();
    };
  }
  return { removeEvent: remove };
}
