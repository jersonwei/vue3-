/*
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-01 13:56:04
 * @FilePath: \work\src\utils\index.ts
 * @Description:
 */
import { unref } from 'vue';
import { UploadFileInfo } from 'naive-ui';
import { getEnvConfig } from '../../.env-config';

export * from './common';
export * from './storage';
export * from './service';
export * from './auth';
export * from './router';
export * from './form';
export * from './props';
export * from './deepMerge';
export * from './date/date';

// dynamic use hook props
export function getDynamicProps<T, U>(props: T): Partial<U> {
  const ret: Recordable = {};

  // eslint-disable-next-line array-callback-return
  Object.keys(props).map(key => {
    ret[key] = unref((props as Recordable)[key]);
  });

  return ret as Partial<U>;
}

/**
 *  找到对应的节点
 * */
export function getTreeItem(data: any[], key?: string | number): any {
  let result;
  // eslint-disable-next-line array-callback-return
  data.map(item => {
    if (item.id === key) {
      result = item;
    } else if (item.children && item.children.length) {
      getTreeItem(item.children, key);
    }
  });
  return result;
}
// 声明索引类型
export function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
  return key in object;
}

// 因为get请求需要拼接query
export function paramsToQuery(params: object) {
  let query = '?';
  // eslint-disable-next-line no-restricted-syntax
  for (const key in params) {
    // eslint-disable-next-line no-continue
    if (params[key] === undefined || params[key] === null || params[key] === '') continue;
    query = `${query}&${key}=${params[key]}`;
  }
  return query;
}

// 上传图片直接判断是否为图片
export function fileTypeOfImage(data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) {
  if (data.file.file?.type === 'image/png' || data.file.file?.type === 'image/jpeg') {
    return true;
  }
  return false;
}

// 上传文件pdf或者md或者pptx
export function fileTypeOfOutLine(data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) {
  // name
  const verifyPptx = /.(docx|pptx|md)$/i;
  if (data.file.file?.type === 'application/pdf' || verifyPptx.test(data.file.file?.name)) {
    return true;
  }
  return false;
}

export function fileTypeOfVideo(data: { file: UploadFileInfo; fileList: UploadFileInfo[] }) {
  const verifyPptx = /.(mp4)$/i;
  if (verifyPptx.test(data.file.file?.name)) {
    return true;
  }
  return false;
}

export function getServiceEnv() {
  const http = getEnvConfig(import.meta.env);
  return http.url;
}

export function resetForm(from: { [x: string]: string }, obj: string | string[]) {
  // eslint-disable-next-line consistent-return
  Object.keys(from).forEach(key => {
    if (obj.includes(key)) {
      return false;
    }
    console.log(obj.includes(key));
    // eslint-disable-next-line no-param-reassign
    from[key] = '';
  });
}

export function numberfilter(num) {
  const changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; // changeNum[0] = "零"
  const unit = ['', '十', '百'];
  num = parseInt(num);
  const getWan = temp => {
    const strArr = temp.toString().split('').reverse();
    let newNum = '';
    for (let i = 0; i < strArr.length; i++) {
      newNum =
        (i == 0 && strArr[i] == 0
          ? ''
          : i > 0 && strArr[i] == 0 && strArr[i - 1] == 0
          ? ''
          : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i])) + newNum;
    }
    return newNum;
  };
  const overWan = Math.floor(num / 100);
  let noWan = num % 100;
  if (noWan.toString().length < 2) noWan = `0${noWan}`;
  const strr = overWan ? `${getWan(overWan)}百${getWan(noWan)}` : getWan(num);
  if (strr.split('')[0] == '一') {
    let showNum = '';
    if (strr == '一') {
      showNum = strr.substring(0);
    } else {
      showNum = strr.substring(1);
    }
    return `${showNum}`;
  }
  const showNum = overWan ? `${getWan(overWan)}百${getWan(noWan)}` : getWan(num);
  return `${showNum}`;
}
