/*
 * @Author: ZHENG
 * @Date: 2022-05-06 16:41:42
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-17 09:41:38
 * @FilePath: \work\src\components\FormPro\src\hooks\useForm.ts
 * @Description:
 */
import { ref, onUnmounted, unref, nextTick, watch } from 'vue';
import { getDynamicProps } from '@/utils';
import type { FormProps, FormActionType, UseFormReturnType } from '../types/form';
import type { DynamicProps } from './.useFormEvents/utils';

type Props = Partial<DynamicProps<FormProps>>;

export function useForm(props?: Props): UseFormReturnType {
  const formRef = ref<Nullable<FormActionType>>(null);
  const loadedRef = ref<Nullable<boolean>>(false);

  async function getForm() {
    const form = unref(formRef);
    if (!form) {
      console.error(
        'The form instance has not been obtained, please make sure that the form has been rendered when performing the form operation!'
      );
    }
    await nextTick();
    return form as FormActionType;
  }

  function register(instance: FormActionType) {
    onUnmounted(() => {
      formRef.value = null;
      loadedRef.value = null;
    });
    if (unref(loadedRef) && instance === unref(formRef)) return;

    formRef.value = instance;
    loadedRef.value = true;

    watch(
      () => props,
      () => {
        // eslint-disable-next-line no-unused-expressions
        props && instance.setProps(getDynamicProps(props));
      },
      {
        immediate: true,
        deep: true
      }
    );
  }

  const methods: FormActionType = {
    setProps: async (formProps: Partial<FormProps>) => {
      const form = await getForm();
      await form.setProps(formProps);
    },

    resetFields: async () => {
      getForm().then(async form => {
        await form.resetFields();
      });
    },

    clearValidate: async (name?: string | string[]) => {
      const form = await getForm();
      await form.clearValidate(name);
    },

    getFieldsValue: <T>() => {
      return unref(formRef)?.getFieldsValue() as T;
    },

    setFieldsValue: async <T>(values: T) => {
      const form = await getForm();
      await form.setFieldsValue<T>(values);
    },

    submit: async (): Promise<any> => {
      const form = await getForm();
      return form.submit();
    },

    validate: async (nameList?: any[]): Promise<Recordable> => {
      const form = await getForm();
      return form.validate(nameList);
    }
  };

  return [register, methods];
}
