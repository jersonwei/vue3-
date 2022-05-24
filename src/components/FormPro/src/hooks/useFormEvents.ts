import type { ComputedRef, Ref } from 'vue';
import { unref, toRaw } from 'vue';
import { isFunction } from '@/utils';
import type { FormProps, FormSchema, FormActionType } from '../types/form';

declare type EmitType = (event: string, ...args: any[]) => void;

interface UseFormActionContext {
  emit: EmitType;
  getProps: ComputedRef<FormProps>;
  getSchema: ComputedRef<FormSchema[]>;
  formModel: Recordable;
  formElRef: Ref<FormActionType>;
  defaultFormModel: Recordable;
  loadingSub: Ref<boolean>;
  handleFormValues: Function;
}

export function useFormEvents({
  emit,
  getProps,
  formModel,
  getSchema,
  formElRef,
  defaultFormModel,
  loadingSub,
  handleFormValues
}: UseFormActionContext) {
  // 验证
  async function validate() {
    return unref(formElRef)?.validate();
  }

  // 提交
  async function handleSubmit(e?: Event): Promise<void> {
    // eslint-disable-next-line no-unused-expressions
    e && e.preventDefault();
    // eslint-disable-next-line no-param-reassign
    loadingSub.value = true;
    const { submitFunc } = unref(getProps);
    if (submitFunc && isFunction(submitFunc)) {
      await submitFunc();
      return;
    }
    const formEl = unref(formElRef);
    if (!formEl) return;
    try {
      await validate();
      // eslint-disable-next-line no-param-reassign
      loadingSub.value = false;
      emit('submit', formModel);
      // eslint-disable-next-line consistent-return
      return true;
    } catch (error) {
      // eslint-disable-next-line no-param-reassign
      loadingSub.value = false;
      // eslint-disable-next-line consistent-return
      return false;
    }
  }

  // 清空校验
  async function clearValidate() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await unref(formElRef)?.restoreValidation();
  }

  // 重置
  async function resetFields(): Promise<void> {
    const { resetFunc, submitOnReset } = unref(getProps);
    // eslint-disable-next-line no-unused-expressions
    resetFunc && isFunction(resetFunc) && (await resetFunc());

    const formEl = unref(formElRef);
    if (!formEl) return;
    Object.keys(formModel).forEach(key => {
      // eslint-disable-next-line no-param-reassign
      formModel[key] = unref(defaultFormModel)[key] || null;
    });
    await clearValidate();
    const fromValues = handleFormValues(toRaw(unref(formModel)));
    emit('reset', fromValues);
    // eslint-disable-next-line no-unused-expressions
    submitOnReset && (await handleSubmit());
  }

  // 获取表单值
  function getFieldsValue(): Recordable {
    const formEl = unref(formElRef);
    if (!formEl) return {};
    return handleFormValues(toRaw(unref(formModel)));
  }

  // 设置表单字段值
  async function setFieldsValue(values: Recordable): Promise<void> {
    console.log('setFieldsValue', values);
    const fields = unref(getSchema)
      .map(item => item.field)
      .filter(Boolean);

    Object.keys(values).forEach(key => {
      const value = values[key];
      if (fields.includes(key)) {
        // eslint-disable-next-line no-param-reassign
        formModel[key] = value;
      }
    });
  }

  return {
    handleSubmit,
    validate,
    resetFields,
    getFieldsValue,
    clearValidate,
    setFieldsValue
  };
}
