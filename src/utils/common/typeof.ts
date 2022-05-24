import { EnumDataType } from '@/enum';

const { toString } = Object.prototype;

/**
 * @description:  是否为函数
 */
export function isFunction<T = Function>(data: unknown): data is T {
  return toString.call(data) === EnumDataType.function;
}
/**
 * @description: 是否已定义
 */
export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== 'undefined';
};

export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val);
};
/**
 * @description:  是否为AsyncFunction
 */
export function isAsyncFunction<T = Function>(data: unknown): data is T {
  return toString.call(data) === EnumDataType.function;
}
/**
 * @description:  是否为promise
 */
export function isPromise<T = any>(data: unknown): data is Promise<T> {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  return toString.call(data) === 'Promise' && isObject(data) && isFunction(data.then) && isFunction(data.catch);
}
/**
 * @description:  是否为数值
 */
export function isNumber(data: unknown) {
  return toString.call(data) === EnumDataType.number;
}
/**
 * @description:  是否为字符串
 */
export function isString(data: unknown) {
  return toString.call(data) === EnumDataType.string;
}
/**
 * @description:  是否为boolean类型
 */
export function isBoolean(data: unknown) {
  return toString.call(data) === EnumDataType.boolean;
}
/**
 * @description:  是否为null类型
 */
export function isNull(data: unknown) {
  return toString.call(data) === EnumDataType.null;
}
/**
 * @description: 是否已定义
 */
export function isUndefined(data: unknown) {
  return toString.call(data) === EnumDataType.undefined;
}
/**
 * @description: 是否为对象
 */
export function isObject(data: unknown) {
  return toString.call(data) === EnumDataType.object;
}
/**
 * @description:  是否为数组
 */
export function isArray(data: unknown) {
  return toString.call(data) === EnumDataType.array;
}
/**
 * @description: 是否客户端
 */
export const isClient = () => {
  return typeof window !== 'undefined';
};
/**
 * @description: 是否为浏览器
 */
export const isWindow = (data: any): data is Window => {
  return typeof window !== 'undefined' && toString.call(data) === EnumDataType.window;
};
/**
 * @description:  是否为时间
 */
export function isDate(data: unknown) {
  return toString.call(data) === EnumDataType.date;
}
export const isElement = (data: unknown): data is Element => {
  return isObject(data) && !!data.tagName;
};
export const isServer = typeof window === 'undefined';
// 是否为图片节点
export function isImageDom(o: Element) {
  return o && ['IMAGE', 'IMG'].includes(o.tagName);
}
export function isRegExp(data: unknown) {
  return toString.call(data) === EnumDataType.regexp;
}
export function isSet(data: unknown) {
  return toString.call(data) === EnumDataType.set;
}
export function isMap(data: unknown) {
  return toString.call(data) === EnumDataType.map;
}

export function isNullAndUnDef(data: unknown) {
  return isUnDef(data) && isNull(data);
}
export function isNullOrUnDef(data: unknown) {
  return isUnDef(data) || isNull(data);
}
