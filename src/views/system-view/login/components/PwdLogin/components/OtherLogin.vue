<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-04-30 11:28:08
 * @FilePath: \admin\src\views\system-view\login\components\PwdLogin\components\OtherLogin.vue
 * @Description:
-->
<template>
  <n-space :vertical="true">
    <n-divider class="!mb-0 text-14px text-[#666]">其他登录方式</n-divider>
    <div class="flex-center">
      <n-button :text="true">
        <icon-mdi-wechat class="text-22px text-[#888] hover:text-[#52BF5E]" @click="handleUpdateShow(true)" />
        <icon-mdi-qqchat class="text-22px text-[#888] hover:text-[#52BF5E]" @click="handleUpdateShow(false)" />
      </n-button>
    </div>
  </n-space>
</template>

<script lang="ts" setup>
const handleUpdateShow = (show: boolean) => {
  window.$notification?.success({
    title: '其他登录!',
    content: `${show ? '微信' : 'QQ'}登录`,
    duration: 3000
  });
};
</script>
<style scoped></style>
