<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 14:33:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-26 18:08:06
 * @FilePath: \work\src\views\question\dataBaseProblems\index.vue
 * @Description:
-->
<template>
  <n-card title="基本信息" :bordered="false">
    <n-form
      ref="formRef"
      :model="fromModel"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
      :style="{
        maxWidth: '640px'
      }"
    >
      <n-form-item label="所属题库" path="problems">
        <n-input v-model:value="fromModel.problems" :style="{ width: '50%' }" disabled placeholder="请选择题库" />
        <n-button>选择题库</n-button>
        <!-- <n-select v-model:value="model.selectValue" placeholder="Select" :options="generalOptions" /> -->
      </n-form-item>
      <n-form-item label="题目类型" path="problemsType">
        <n-button-group size="small">
          <n-button size="large" @click="changeQuestionType(1)">单选题</n-button>
          <n-button size="large" @click="changeQuestionType(2)">判断题</n-button>
          <n-button size="large" @click="changeQuestionType(3)">多选题</n-button>
          <n-button size="large" @click="changeQuestionType(4)">填空题</n-button>
          <n-button size="large" @click="changeQuestionType(5)">简答题</n-button>
          <n-button size="large" @click="changeQuestionType(6)">材料题</n-button>
        </n-button-group>
      </n-form-item>
      <n-form-item label="题干" path="problems">
        <wangEditor></wangEditor>
        <!-- <n-select v-model:value="model.selectValue" placeholder="Select" :options="generalOptions" /> -->
      </n-form-item>
      <template v-if="questionType === 1">
        <n-form-item label="选项" path="problems">
          <n-space vertical>
            <view v-for="(item, index) in radioList" :key="index">
              <n-form-item :label="`选项${Object.keys(item)}`" path="problems">
                <wangEditor></wangEditor>
              </n-form-item>
            </view>
          </n-space>
          <!-- <wangEditor></wangEditor> -->
          <!-- <n-select v-model:value="model.selectValue" placeholder="Select" :options="generalOptions" /> -->
        </n-form-item>
      </template>
      <template v-if="questionType === 2">{{ 2 }} </template>
      <template v-if="questionType === 3">{{ 3 }} </template>
      <template v-if="questionType === 4">{{ 4 }} </template>
      <template v-if="questionType === 5">{{ 5 }} </template>
      <template v-if="questionType === 6">{{ 6 }} </template>
    </n-form>
  </n-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import wangEditor from '@/components/wangEditor.vue';

const fromModel = ref({
  problems: ''
});
const rules = {
  problems: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入名称'
  }
};
const questionType = ref(1);
/**
 * @author: ZHENG
 * @description: 切换题目类型
 * @param {*} type
 * @return {*}
 */
const changeQuestionType = (type: number) => {
  questionType.value = type;
  console.log(questionType.value, type);
};
const radioList = ref([{ A: '' }, { B: '' }, { C: '' }, { D: '' }]);
</script>
<style scoped></style>
