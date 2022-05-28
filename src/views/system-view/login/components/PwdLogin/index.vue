<!--
 * @Author: ZHENG
 * @Date: 2022-04-25 20:43:55
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-28 16:06:01
 * @FilePath: \work\src\views\system-view\login\components\PwdLogin\index.vue
 * @Description:
-->
<template>
  <n-form ref="formRef" :model="model" :rules="rules" size="large" :show-label="false">
    <n-form-item label="账号" path="account">
      <n-input v-model:value="model.account" placeholder="请输入账号（工号）">
        <template #prefix>
          <n-icon><UserOutlined /></n-icon>
        </template>
      </n-input>
    </n-form-item>
    <n-form-item path="pwd">
      <n-input v-model:value="model.pwd" type="password" show-password-on="click" placeholder="请输入密码">
        <template #prefix>
          <n-icon><LockTwotone /></n-icon>
        </template>
      </n-input>
    </n-form-item>
    <n-form-item path="code">
      <div class="flex-y-center w-full">
        <n-input v-model:value="model.code" placeholder="验证码" />
        <div class="pl-8px">
          <n-button text style="font-size: 24px" @click="changeImgCode">
            <n-image v-if="showCaptcha" width="120" :src="imgCode" preview-disabled />
            <n-spin v-else size="small" />
          </n-button>
        </div>
      </div>
    </n-form-item>
    <!-- <n-form-item>
      <n-space>
        <n-button @click="quickLogin('admin')">管理员登录</n-button>
        <n-button @click="quickLogin('teacher')">教师登录</n-button>
      </n-space>
    </n-form-item> -->
    <LoginAgreement></LoginAgreement>
    <n-space :vertical="true" :size="24">
      <div class="flex-y-center justify-between">
        <n-checkbox v-model:checked="rememberMe">记住我</n-checkbox>
        <n-button :text="true" @click="toLoginModule('reset-pwd')">忘记密码？</n-button>
      </div>
      <n-button
        type="primary"
        size="large"
        :block="true"
        :round="true"
        :loading="auth.loginLoading"
        @click="handleSubmit"
      >
        确定
      </n-button>
      <!-- <div class="flex-y-center justify-between">
        <n-button class="flex-1" :block="true" @click="toLoginModule('code-login')">
          {{ EnumLoginModule['code-login'] }}
        </n-button>
      </div> -->
    </n-space>
    <!-- <other-login /> -->
  </n-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { FormInst, FormRules } from 'naive-ui';
import { UserOutlined, LockTwotone } from '@vicons/antd';
import { EnumLoginModule } from '@/enum';
import { useAuthStore } from '@/store';
import { useRouterPush } from '@/composables';
import { useImageReady } from '@/hooks';
import { formRules, getImgCodeRule, getServiceEnv } from '@/utils';
import { OtherLogin, LoginAgreement } from './components';

const auth = useAuthStore();
const { login } = useAuthStore();
const { toLoginModule } = useRouterPush();
// // 鉴权，账号，密码，验证码
const formRef = ref<(HTMLElement & FormInst) | null>(null);
const model = reactive({
  account: 'ruizhibottom@163.com',
  pwd: 'huang00aaA',
  code: '123456',
  imgCode: ''
});
const imgCode = ref<string>('');
const showCaptcha = ref<boolean>(false);
// 获取验证码,进入页面就会获取验证码
const changeImgCode = async () => {
  showCaptcha.value = false;
  const http = getServiceEnv();
  const pics = [`${http}/captcha.jpg?t=${Math.random()}`];
  const data = await useImageReady(pics);
  if (data) {
    // eslint-disable-next-line prefer-destructuring
    imgCode.value = pics[0];
    showCaptcha.value = true;
  }
};
changeImgCode();

const rules: FormRules = {
  account: formRules.account,
  pwd: formRules.pwd,
  code: formRules.code,
  imgCode: getImgCodeRule(imgCode)
};
const rememberMe = ref(true);

// 发起登录请求
function handleSubmit(e: MouseEvent) {
  if (!formRef.value) return;
  e.preventDefault();
  formRef.value.validate(errors => {
    if (!errors) {
      const { account, pwd, code } = model;
      login(account, pwd, code);
    }
  });
}

const quickLogin = (role: string) => {
  if (role === 'admin') {
    login('ruizhibottom@169.com', 'huang00aaA');
  } else {
    // 教师权限
    login('ruizhibottom@163.com', 'huang00aaA');
  }
};
</script>
<style scoped></style>
