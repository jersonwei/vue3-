<!--
 * @Author: ZHENG
 * @Date: 2022-06-08 08:55:15
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-08 08:55:16
 * @FilePath: \work\src\views\system-view\login\components\PwdLogin\components\OtherAccount.vue
 * @Description:
-->
<template>
  <n-space :vertical="true">
    <n-divider class="!mb-0 text-14px text-[#666]">其他账户登录</n-divider>
    <n-space justify="center">
      <n-button
        v-for="item in accounts"
        :key="item.userName"
        type="primary"
        @click="login(item.userName, item.password)"
      >
        {{ item.label }}
      </n-button>
    </n-space>
  </n-space>
</template>

<script lang="ts" setup>
interface Emits {
  (e: "login", param: { userName: string; password: string }): void;
}

const emit = defineEmits<Emits>();

const accounts = [
  // {
  //   label: "超级管理员",
  //   userName: "",
  //   password: "",
  // },
  {
    label: "管理员",
    userName: "ruizhibottom@169.com",
    password: "huang00aaA",
  },
  {
    label: "老师",
    userName: "ruizhibottom@163.com",
    password: "huang00aaA",
  },
];
// const quickLogin = (role: string) => {
//   if (role === "admin") {
//     login("ruizhibottom@169.com", "huang00aaA");
//   } else {
//     // 教师权限
//     login("ruizhibottom@163.com", "huang00aaA");
//   }
// };

function login(userName: string, password: string) {
  emit("login", { userName, password });
}
</script>

<style scoped></style>
