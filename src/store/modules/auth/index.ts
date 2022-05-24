import { unref, nextTick } from 'vue';
import { defineStore } from 'pinia';
import { router as globalRouter } from '@/router';
import { useRouterPush } from '@/composables';
import { findUserInfo, loginApi } from '@/service'; // , findUserInfo, loginApi
import { getUserInfo, getToken, setUserInfo, setToken, setRefreshToken, clearAuthStorage } from '@/utils';
import { useTabStore } from '../tab';
import { useRouteStore } from '../route';

interface AuthState {
  /** 用户信息 */
  userInfo: Auth.UserInfo;
  /** 用户token */
  token: string;
  /** 登录的加载状态 */
  loginLoading: boolean;
}

export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    userInfo: getUserInfo(),
    token: getToken(),
    loginLoading: false
  }),
  getters: {
    /** 是否登录 */
    isLogin(state) {
      return Boolean(state.token);
    }
  },
  actions: {
    /** 重置auth状态 */
    resetAuthStore() {
      const { toLogin } = useRouterPush(false);
      const { resetTabStore } = useTabStore();
      const { resetRouteStore } = useRouteStore();
      const route = unref(globalRouter.currentRoute);

      clearAuthStorage();
      this.$reset();

      if (route.meta.requiresAuth) {
        toLogin();
      }

      nextTick(() => {
        resetTabStore();
        resetRouteStore();
      });
    },
    /**
     * 根据token进行登录
     * @param backendToken - 返回的token
     */
    async loginByToken(backendToken: ApiAuth.Token) {
      const { toLoginRedirect } = useRouterPush(false);
      // 先把token存储到缓存中(后面接口的请求头需要token)
      const { authorization: token, refreshToken } = backendToken;
      console.log('refreshToken', refreshToken);
      setToken(token);
      setRefreshToken(refreshToken);

      // 获取用户信息
      const { data: UserData } = await findUserInfo();
      console.log(UserData);
      const data = {
        userId: UserData.id,
        userName: UserData.userName,
        userRole: UserData.role === 1 ? 'teacher' : 'admin',
        sex: UserData.sex,
        classId: UserData.classId
      };
      if (data) {
        // 成功后把用户信息存储到缓存中
        setUserInfo(data);

        // 更新状态
        Object.assign(this, { userInfo: data, token });

        // 跳转登录后的地址
        toLoginRedirect();

        // 登录成功弹出欢迎提示
        window.$notification?.success({
          title: '登录成功!',
          content: `欢迎回来，${data.userRole}${data.userName}!`,
          duration: 3000
        });
      } else {
        // 不成功则重置状态
        this.resetAuthStore();
      }
    },
    /**
     * 登录
     * @param userName - 用户名
     * @param password - 密码
     */
    // , validateCode: string, type?: 'pwd' | 'sms'
    async login(username: string, password: string) {
      this.loginLoading = true;
      const Params = {
        // : loginApi.loginParams
        username,
        password
        // validateCode
      };
      const { data } = await loginApi(Params);
      if (data) {
        await this.loginByToken(data);
      }
      this.loginLoading = false;
    },
    updateUserRole(userRole: Auth.RoleType) {
      this.userInfo.userRole = userRole;
    }
  }
});
