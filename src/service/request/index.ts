/*
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-04 09:51:35
 * @FilePath: \e-class-admin\src\service\request\index.ts
 * @Description:
 */
import { createRequest } from './request';
import { getEnvConfig } from '~/.env-config';

const envConfig = getEnvConfig(import.meta.env);
const isHttpProxy = import.meta.env.VITE_HTTP_PROXY === 'true';
export const request = createRequest({ baseURL: isHttpProxy ? envConfig.proxy : envConfig.url });

export const mockRequest = createRequest({ baseURL: '/mock' });
