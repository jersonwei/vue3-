/*
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-05 18:21:14
 * @FilePath: \e-class-admin\src\utils\service\transform.ts
 * @Description:
 */
// import qs from 'qs';
import FormData from 'form-data';
// import { EnumContentType } from '@/enum';
import { isArray } from '../common';

/**
 * 请求数据的转换
 * @param requestData - 请求数据
 * @param contentType - 请求头的Content-Type
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function transformRequestData(requestData: any, contentType?: string) {
  // application/json类型不处理
  const data = requestData;
  // form类型转换
  // if (contentType === EnumContentType.formUrlencoded) {
  //   data = qs.stringify(requestData);
  // }
  // // form-data类型转换
  // if (contentType === EnumContentType.formData) {
  //   const key = Object.keys(requestData)[0];
  //   const file = requestData.data[key];
  //   data = await transformFile(file, key);
  // }
  return data;
}

/**
 * 接口为上传文件的类型时数据转换
 * @param file - 单文件或多文件
 * @param key - 文件的属性名
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function transformFile(file: File[] | File, key: string) {
  const formData = new FormData();
  if (isArray(file)) {
    // 多文件
    await Promise.all(
      (file as File[]).map(item => {
        formData.append(key, item);
        return true;
      })
    );
  } else {
    // 单文件
    await formData.append(key, file);
  }
  return formData;
}
