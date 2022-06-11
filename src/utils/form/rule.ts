/*
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-20 14:00:37
 * @FilePath: \work\src\utils\form\rule.ts
 * @Description:
 */
import type { Ref } from 'vue';
import type { FormItemRule } from 'naive-ui';
import {
  REGEXP_PHONE,
  REGEXP_PWD,
  REGEXP_CODE_FIV,
  REGEXP_EMAIL,
  REGEXP_NAME,
  REGEXP_NUMBER,
  REGEXP_IDCARD
} from '@/config';

/** 表单规则 */
interface CustomFormRules {
  /** 账号 */
  account: FormItemRule[];
  /** 手机号码 */
  phone: FormItemRule[];
  /** 密码 */
  pwd: FormItemRule[];
  /** 验证码 */
  code: FormItemRule[];
  /** 邮箱 */
  email: FormItemRule[];
  /** 用户名 */
  userName: FormItemRule[];
  /** 学号 */
  number: FormItemRule[];
  /** 身份证号 */
  idCard: FormItemRule[];
}

/** 表单规则 */
export const formRules: CustomFormRules = {
  account: [{ required: true, message: '请输入账号' }],
  phone: [
    { required: true, message: '请输入手机号码' },
    { pattern: REGEXP_PHONE, message: '手机号码格式错误', trigger: 'input' }
  ],
  pwd: [
    { required: true, message: '请输入密码' },
    { pattern: REGEXP_PWD, message: '密码为6-18位数字/字符/符号，至少2种组合', trigger: 'input' }
  ],
  code: [
    { required: true, message: '请输入验证码' },
    { pattern: REGEXP_CODE_FIV, message: '验证码格式错误', trigger: 'input' }
  ],
  email: [{ pattern: REGEXP_EMAIL, message: '邮箱格式错误', trigger: 'blur' }],
  userName: [{ pattern: REGEXP_NAME, message: '用户名格式有误', trigger: 'blur' }],
  number: [{ pattern: REGEXP_NUMBER, message: '学号格式错误', trigger: 'blur' }],
  idCard: [{ pattern: REGEXP_IDCARD, message: '身份证号格式错误', trigger: 'blur' }]
};

/** 获取确认密码的表单规则 */
export function getConfirmPwdRule(pwd: Ref<string>) {
  const confirmPwdRule: FormItemRule[] = [
    { required: true, message: '请输入确认密码' },
    {
      validator: (rule, value) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        if (!isBlankString(value) && value !== pwd.value) {
          return Promise.reject(rule.message);
        }
        return Promise.resolve();
      },
      message: '输入的值与密码不一致',
      trigger: 'input'
    }
  ];
  return confirmPwdRule;
}

/** 获取图片验证码的表单规则 */
export function getImgCodeRule(imgCode: Ref<string>) {
  const imgCodeRule: FormItemRule[] = [
    { required: true, message: '请输入验证码' },
    {
      validator: (rule, value) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        if (!isBlankString(value) && value !== imgCode.value) {
          return Promise.reject(rule.message);
        }
        return Promise.resolve();
      },
      message: '验证码不正确',
      trigger: 'blur'
    }
  ];
  return imgCodeRule;
}

/** 是否为空字符串 */
function isBlankString(str: string) {
  return str.trim() === '';
}

export function deafultFormParams(formParams) {
  Object.keys(formParams).forEach((val, index, arr) => {
    if (typeof formParams[val] === 'string') {
      formParams[val] = '';
    } else if (typeof formParams[val] === 'object') {
      formParams[val] = [];
    } else if (typeof formParams[val] === 'number') {
      formParams[val] = '';
    }
    console.log(formParams[val], typeof formParams[val]);
  });
  return formParams;
}
