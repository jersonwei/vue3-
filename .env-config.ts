/*
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-09 17:12:40
 * @FilePath: \work\.env-config.ts
 * @Description:
 */
/** 请求环境配置 */
type ServiceEnv = Record<EnvType, EnvConfig>;

// url: 'http://192.168.3.78:8081',
/** 环境配置 */
const serviceEnvConfig: ServiceEnv = {
	dev: {
		url: 'http://120.79.129.174:8081',
    proxy: '/api'
  },
  test: {
    url: 'http://192.168.3.233:8081',
    proxy: '/api'
  },
  prod: {
    url: 'http://192.168.3.7:8081',
    proxy: '/api'
  }
};

/**
 * 获取环境配置
 * @param env 环境描述
 */
export function getEnvConfig(env: ImportMetaEnv) {
  const { VITE_ENV_TYPE = 'dev' } = env;

  const envConfig = serviceEnvConfig[VITE_ENV_TYPE];

  return envConfig;
}
