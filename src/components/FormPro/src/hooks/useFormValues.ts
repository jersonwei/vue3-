/*
 * @Author: ZHENG
 * @Date: 2022-05-04 14:20:01
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-16 15:39:22
 * @FilePath: \work\src\components\FormPro\src\hooks\useFormValues.ts
 * @Description:
 */
import { unref } from 'vue';
import type { Ref, ComputedRef } from 'vue';
import { set } from 'lodash-es';
import { isArray, isFunction, isObject, isString, isNullOrUnDef } from '@/utils';
import type { FormSchema } from '../types/form';

interface UseFormValuesContext {
  defaultFormModel: Ref<any>;
  getSchema: ComputedRef<FormSchema[]>;
  formModel: Recordable;
}
export function useFormValues({ defaultFormModel, getSchema, formModel }: UseFormValuesContext) {
  // 加工 form values
  function handleFormValues(values: Recordable) {
    if (!isObject(values)) {
      return {};
    }
    const res: Recordable = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const item of Object.entries(values)) {
      let [, value] = item;
      const [key] = item;
      if (!key || (isArray(value) && value.length === 0) || isFunction(value) || isNullOrUnDef(value)) {
        // eslint-disable-next-line no-continue
        continue;
      }
      // 删除空格
      if (isString(value)) {
        value = value.trim();
      }
      set(res, key, value);
    }
    return res;
  }

  // 初始化默认值
  function initDefault() {
    const schemas = unref(getSchema);
    const obj: Recordable = {};
    schemas.forEach(item => {
      const { defaultValue } = item;
      if (!isNullOrUnDef(defaultValue)) {
        obj[item.field] = defaultValue;
        // eslint-disable-next-line no-param-reassign
        formModel[item.field] = defaultValue;
      }
    });
    // eslint-disable-next-line no-param-reassign
    defaultFormModel.value = obj;
  }

  return { handleFormValues, initDefault };
}
