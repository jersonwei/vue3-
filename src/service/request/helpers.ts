/*
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-06 18:21:37
 * @FilePath: \e-class-admin\src\service\request\helpers.ts
 * @Description:
 */
import type { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store';
import { getRefreshToken, setToken, setRefreshToken } from '@/utils';
import { UpdateToken } from '../api';

// 拦截器，刷新token
/**
 * 刷新token
 * @param axiosConfig - token失效时的请求配置
 */
export async function handleRefreshToken(axiosConfig: AxiosRequestConfig) {
  const { resetAuthStore } = useAuthStore();
  const refreshToken = getRefreshToken();
  const { data } = await UpdateToken(refreshToken);
  if (data) {
    setToken(data.token);
    setRefreshToken(data.refreshToken);
    const config = { ...axiosConfig };
    if (config.headers) {
      config.headers.Authorization = data.token;
    }
    return config;
  }

  resetAuthStore();
  return null;
}
