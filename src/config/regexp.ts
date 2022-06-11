/*
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-10 14:48:11
 * @FilePath: \work\src\config\regexp.ts
 * @Description:
 */
/** 手机号码正则 */
export const REGEXP_PHONE =
  /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/;

/** 邮箱正则 */
// export const REGEXP_EMAIL = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
// [- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-z]{2,}$
export const REGEXP_EMAIL = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+$/;


/** 密码正则(密码为8-16位,至少为大写字母、小写字母、特殊符号、数字的组合) */
export const REGEXP_PWD =
  /^(?![A-Za-z]+$)(?![A-Z0-9]+$)(?![a-z0-9]+$)(?![a-z\W]+$)(?![A-Z\W]+$)(?![0-9\W]+$)[a-zA-Z0-9\W]{8,16}$/;

/** 5位数字验证码正则 */
export const REGEXP_CODE_FIV = /[A-za-z0-9]{5}/;

/** 4位数字验证码正则 */
export const REGEXP_CODE_FOUR = /^\d{4}$/;

/** url链接正则 */
export const REGEXP_URL =
  /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

	// 数字正则
export const REGEXP_NUMBER=/^\d+$/;
	// 文字正则
export const REGEXP_NAME=/[\u4e00-\u9fa5]/gm;
	// 身份证号正则
export const REGEXP_IDCARD=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
