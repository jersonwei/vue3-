<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-08 15:50:52
 * @FilePath: \work\src\layouts\common\GlobalHeader\components\UserAvatar.vue
 * @Description:
-->
<template>
  <n-dropdown :options="options" @select="handleDropdown">
    <hover-container class="px-12px" content-class="hover:text-primary">
      <icon-custom-avatar class="text-32px" />
      <span class="pl-8px text-16px font-medium">{{ auth.userInfo.userName }}</span>
    </hover-container>
  </n-dropdown>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/store";
import { iconifyRender } from "@/utils";

type DropdownKey = "user-center" | "logout";

const auth = useAuthStore();

const options = [
  {
    label: "用户中心",
    key: "user-center",
    icon: iconifyRender("carbon:user-avatar"),
  },
  {
    type: "divider",
    key: "divider",
  },
  // {
  //   label: '修改密码',
  //   key: 'changePwd',
  //   icon: iconifyRender('carbon:user-avatar')
  // },
  {
    type: "divider",
    key: "divider",
  },
  {
    label: "退出登录",
    key: "logout",
    icon: iconifyRender("carbon:logout"),
  },
];

function handleDropdown(optionKey: string) {
  const key = optionKey as DropdownKey;
  if (key === "user-center") {
    window.$dialog?.info({
      title: "提示",
      content: "您确定要用户中心吗？",
      positiveText: "确定",
      negativeText: "取消",
      onPositiveClick: () => {
        auth.resetAuthStore();
      },
    });
  } else if (key === "changePwd") {
    window.$dialog?.info({
      title: "提示",
      content: "您确定要改变密码吗？",
      positiveText: "确定",
      negativeText: "取消",
      onPositiveClick: () => {
        auth.resetAuthStore();
      },
    });
  } else if (key === "logout") {
    window.$dialog?.info({
      title: "提示",
      content: "您确定要退出登录吗？",
      positiveText: "确定",
      negativeText: "取消",
      onPositiveClick: () => {
        auth.resetAuthStore();
      },
    });
  }
}
</script>
<style scoped></style>
