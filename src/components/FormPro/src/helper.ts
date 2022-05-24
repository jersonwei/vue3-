/*
 * @Author: ZHENG
 * @Date: 2022-05-16 15:06:20
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-16 15:32:30
 * @FilePath: \work\src\components\FormPro\src\helper.ts
 * @Description:
 */
import { ComponentType } from './types/index';

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component: ComponentType) {
  if (component === 'NInput') return '请输入';
  if (['NPicker', 'NSelect', 'NCheckbox', 'NRadio', 'NSwitch', 'NDatePicker', 'NTimePicker'].includes(component))
    return '请选择';
  return '';
}

const DATE_TYPE = ['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'];

function genType() {
  return [...DATE_TYPE, 'RangePicker'];
}

/**
 * 时间字段
 */
export const dateItemType = genType();

export function defaultType(component) {
  if (component === 'NInput') return '';
  if (component === 'NInputNumber') return null;
  return ['NPicker', 'NSelect', 'NCheckbox', 'NRadio', 'NSwitch', 'NDatePicker', 'NTimePicker'].includes(component)
    ? ''
    : undefined;
}
