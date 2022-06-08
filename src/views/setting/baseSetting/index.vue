<!--
 * @Author: ZHENG
 * @Date: 2022-06-08 15:15:54
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-08 15:46:26
 * @FilePath: \work\src\views\setting\baseSetting\index.vue
 * @Description:
-->
<template>
  <n-card class="h-full shadow-sm rounded-16px" :bordered="false">
    <n-tabs type="line" animated tab-style="background-color: #fafafa;">
      <n-tab-pane name="资料设置" tab="资料设置">
        <n-card title="基本信息">
          <n-form ref="formElRef" label-placement="left">
            <n-form-item label="昵称">
              <n-input
                :style="{ width: `33%` }"
                v-model:value="form.userName"
                placeholder="请输入昵称"
              />
            </n-form-item>
            <n-form-item label="头像">
              {{ 123 }}
              <!-- <n-upload
                action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                :default-file-list="previewFileList"
                list-type="image-card"
                @preview="handlePreview"
              /> -->
            </n-form-item>
            <n-form-item label="性别">
              <n-radio-group v-model:value="form.gender" name="radiogroup">
                <n-space>
                  <n-radio v-for="song in songs" :key="song.value" :value="song.value">
                    {{ song.label }}
                  </n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item>
            <n-form-item label="个人介绍">
              <n-input
                :style="{ width: `33%` }"
                type="textarea"
                v-model:value="form.userName"
                placeholder="请输入昵称"
              />
            </n-form-item>
          </n-form>
        </n-card>
        <n-card title="联系信息">
          <n-form ref="formElRef" label-placement="left">
            <n-form-item label="真实姓名">
              <n-input
                :style="{ width: `33%` }"
                v-model:value="form.userName"
                placeholder="请输入昵称"
              />
            </n-form-item>
            <n-form-item label="常用邮箱">
              {{ 123 }}
            </n-form-item>
            <n-form-item label="手机号">
              <n-input
                :style="{ width: `33%` }"
                v-model:value="form.userName"
                placeholder="请输入昵称"
              />
            </n-form-item>
            <n-form-item label="QQ邮箱">
              <n-input
                :style="{ width: `33%` }"
                v-model:value="form.userName"
                placeholder="请输入昵称"
              />
            </n-form-item>
          </n-form>
        </n-card>
      </n-tab-pane>
      <n-tab-pane name="账号设置" tab="账号设置">
        <n-card title="联系信息">
          <n-form ref="formElRef" label-placement="left">
            <n-form-item label="新密码">
              <n-input
                :style="{ width: `33%` }"
                v-model:value="form.userName"
                placeholder="请输入昵称"
              />
            </n-form-item>
            <n-form-item label="确认密码">
              <n-input
                :style="{ width: `33%` }"
                v-model:value="form.userName"
                placeholder="请输入昵称"
              />
            </n-form-item>
          </n-form>
        </n-card>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>
<script lang="ts" setup>
import { useAuthStore } from "@/store";
import { storeToRefs } from "pinia";
import { reactive } from "vue";
const auth = useAuthStore();
const { userName, userRole } = auth.userInfo;

console.log(userRole);
const form = reactive({
  userName,
  gender: 0,
});
const songs = [
  {
    value: 0,
    label: "男",
  },
  {
    value: 1,
    label: "女",
  },
];
</script>
