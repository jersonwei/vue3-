<!--
 * @Author: ZHENG
 * @Date: 2022-06-03 21:30:39
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-03 23:28:35
 * @FilePath: \work\src\views\test\addExam\components\showQuestionInfo.vue
 * @Description:
-->
<template>
  <n-modal v-model:show="showModal" preset="dialog" style="width: 1050px" title="题目详情">
    <n-scrollbar ref="scrollRef" style="max-height: 750px">
      <n-form ref="formRef" :model="showFormParams" label-placement="left" :label-width="120" class="m-2 py-4">
        <n-form-item label="试题题干" path="questionName">
          <n-input v-model:value="showFormParams.questionName" disabled />
        </n-form-item>
        <n-form-item label="试题类型" path="questionTypeName">
          <n-input v-model:value="showFormParams.questionTypeName" disabled />
        </n-form-item>
        <n-form-item label="难易度" path="type">
          <n-input v-model:value="showFormParams.difficultLevelName" disabled />
        </n-form-item>

        <template v-if="showFormParams.questionTypeName === '单选题'">
          <n-form-item label="试题选项" path="type">
            <n-radio-group :value="showFormParams.questionAnswer" disabled name="radiogroup">
              <n-space vertical>
                <n-radio v-for="song in showFormParams.questionOption" :key="song.value" :value="song.value">
                  {{ song.label }}
                </n-radio>
              </n-space>
            </n-radio-group>
          </n-form-item>
        </template>
        <template
          v-else-if="showFormParams.questionTypeName === '多选题' || showFormParams.questionTypeName === '不定项选择题'"
        >
          <n-form-item label="试题选项" path="type">
            <n-checkbox-group v-model:value="showFormParams.questionAnswer" name="radiogroup">
              <n-space vertical>
                <n-checkbox
                  v-for="(item, index) in showFormParams.questionOption"
                  :key="index"
                  disabled
                  :value="item.value"
                  :label="item.label"
                />
              </n-space>
            </n-checkbox-group>
          </n-form-item>
        </template>
        <template v-else-if="showFormParams.questionTypeName === '填空题'">
          <n-form-item title="回答" size="small">
            <n-space v-for="(item, index) in showFormParams.questionAnswer" :key="index">
              <p class="borderBtm">{{ item }}</p>
            </n-space>
          </n-form-item>
        </template>
        <template
          v-else-if="
            showFormParams.questionTypeName === '简答题' ||
            showFormParams.questionTypeName === '编程题' ||
            showFormParams.questionTypeName === '实操题'
          "
        >
          <n-form-item title="答案" size="small">
            <n-input v-model:value="showFormParams.questionAnswer" style="width: 500px" type="textarea"></n-input>
          </n-form-item>
        </template>
        <n-form-item label="知识点" path="type">
          <n-input v-model:value="showFormParams.listPointRelatedName" disabled />
        </n-form-item>
        <n-form-item label="解析" path="questionAnalyse">
          <n-input v-model:value="showFormParams.questionAnalyse" disabled />
        </n-form-item>
      </n-form>
    </n-scrollbar>
  </n-modal>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';

const showModal = ref(false);
const showFormParams = reactive({
  questionName: '',
  questionTypeName: '',
  difficultLevelName: '',
  questionOption: '',
  questionAnswer: '',
  answerContent: '',
  listPointRelatedName: '',
  questionAnalyse: ''
});
const getKey = value => {
  const index = value.indexOf(':'); // 取到：的索引
  const Astr = value.substr(0, index);
  return Astr;
};
const showModalFn = record => {
  showModal.value = true;
  console.log(record);
  Object.assign(showFormParams, record);
  if (showFormParams.questionTypeName === '单选题') {
    const questionOption = JSON.parse(showFormParams.questionOption).map(e => ({ value: getKey(e), label: e }));
    showFormParams.questionOption = questionOption;
  } else if (showFormParams.questionTypeName === '多选题') {
    const questionOption = JSON.parse(showFormParams.questionOption).map(e => ({ value: getKey(e), label: e }));
    showFormParams.questionOption = questionOption;
    showFormParams.questionAnswer = showFormParams.questionAnswer.split(',');
  } else if (showFormParams.questionTypeName === '填空题') {
    showFormParams.questionAnswer = JSON.parse(showFormParams.questionAnswer);
    showFormParams.answerContent = JSON.parse(showFormParams.answerContent);
  }
};
defineExpose({ showModalFn });
</script>
