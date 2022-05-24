<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-05 17:33:10
 * @FilePath: \e-class-admin\src\views\system-view\login\components\loginAgree\LoginAgreement.vue
 * @Description:
-->
<template>
  <div class="w-full text-14px">
    <text>登录即同意</text>
    <n-button :text="true" type="primary" @click="handleClickProtocol">《用户协议》</n-button>
    <n-button :text="true" type="primary" @click="handleClickPolicy">《隐私权政策》</n-button>
  </div>
</template>

<script setup lang="ts">
// interface Props {
//   /** 是否勾选 */
//   value?: boolean;
// }

interface Emits {
  (e: 'update:value', value: boolean): void;
  /** 点击协议 */
  (e: 'click-protocol'): void;
  /** 点击隐私政策 */
  (e: 'click-policy'): void;
}

const emit = defineEmits<Emits>();

// const checked = computed({
//   get() {
//     return props.value;
//   },
//   set(newValue: boolean) {
//     emit('update:value', newValue);
//   }
// });

function handleClickProtocol() {
  emit('click-protocol');
}
function handleClickPolicy() {
  emit('click-policy');
}
</script>
<style scoped></style>
