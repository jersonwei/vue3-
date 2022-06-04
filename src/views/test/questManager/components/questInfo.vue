<!--
 * @Author: ZHENG
 * @Date: 2022-05-31 08:35:01
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-04 10:52:30
 * @FilePath: \work\src\views\test\questManager\components\questInfo.vue
 * @Description:
-->
<template>
  <n-modal
    ref="newModalRef"
    v-model:show="showModal"
    :mask-closable="false"
    style="width: 950px"
    :show-icon="false"
    preset="dialog"
    :title="`题目详情`"
  >
    <n-card :title="`📖 题目信息  ${questInfo.questionTypeName}`" :bordered="false">
      <n-space vertical>
        <div v-html="questInfo.questionName"></div>
        <!-- <p style="text-indent: 2em; padding: 50px"> -->
        <!-- {{ questInfo.questionName }} -->
        <!-- </p> -->
        <template v-if="questInfo.questionTypeName === '单选题'">
          <n-radio-group :value="checkTagData.answerContent" disabled name="radiogroup">
            <n-space vertical>
              <n-radio
                v-for="song in checkTagData.questionOption"
                :key="song.value"
                :value="song.value"
              >
                {{ song.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </template>
        <n-form ref="formRef" :model="model" label-placement="left">
          <n-grid :cols="24" :x-gap="24">
            <n-form-item-gi
              :span="7"
              :label-style="{ fontSize: '20px', fontWeight: 'bold' }"
              label="所属题库:"
              path="inputValue"
            >
              <p style="font-size: 18px">{{ questInfo.bankName }}</p>
            </n-form-item-gi>
            <n-form-item-gi
              :span="7"
              label="题库类型:"
              :label-style="{ fontSize: '20px', fontWeight: 'bold' }"
              path="textareaValue"
            >
              <p>{{ questInfo.questionTypeName }}</p>
            </n-form-item-gi>
            <n-form-item-gi
              :span="7"
              label="难易度:"
              :label-style="{ fontSize: '20px', fontWeight: 'bold' }"
              path="selectValue"
            >
              <p>{{ questInfo.difficultLevelName }}</p>
            </n-form-item-gi>
            <n-form-item-gi
              :span="7"
              label="被引用次数:"
              :label-style="{ fontSize: '20px', fontWeight: 'bold' }"
              path="multipleSelectValue"
            >
              <p>20次</p>
            </n-form-item-gi>
            <n-form-item-gi
              :span="7"
              label="作答次数:"
              :label-style="{ fontSize: '20px', fontWeight: 'bold' }"
              path="datetimeValue"
            >
              <p>200次</p>
            </n-form-item-gi>
            <n-form-item-gi
              :span="7"
              label="设计知识点:"
              :label-style="{ fontSize: '20px', fontWeight: 'bold' }"
              path="switchValue"
            >
              <p>{{ questInfo.listPointRelatedName?.join(",") }}</p>
            </n-form-item-gi>
            <n-form-item-gi
              :span="24"
              label="参考答案:"
              :label-style="{ fontSize: '20px', fontWeight: 'bold' }"
              path="checkboxGroupValue"
            >
              <p>
                {{ questInfo.questionAnswer }}
              </p>
            </n-form-item-gi>
            <n-form-item-gi
              :span="24"
              label="答案解析:"
              :label-style="{ fontSize: '20px', fontWeight: 'bold' }"
              path="checkboxGroupValue"
            >
              <div v-html="questInfo.questionAnalyse"></div>
              <!-- <p>
                {{ questInfo.questionAnalyse }}
              </p> -->
            </n-form-item-gi>
          </n-grid>
        </n-form>
      </n-space>
    </n-card>
  </n-modal>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";

const questInfo = ref({
  questionTypeName: "",
  questionName: "",
  questionAnswer: "",
  questionAnalyse: "",
  difficultLevelName: "",
  bankName: "",
  listPointRelatedName: [],
});
const showModal = ref(false);
const showModalFn = (record) => {
  console.log(record);
  Object.assign(questInfo.value, record);
  showModal.value = true;
};

const model = reactive({
  inputValue: null,
  textareaValue: null,
  selectValue: null,
  multipleSelectValue: null,
  datetimeValue: null,
  nestedValue: {
    path1: null,
    path2: null,
  },
  switchValue: false,
  checkboxGroupValue: null,
  radioGroupValue: null,
  radioButtonGroupValue: null,
  inputNumberValue: null,
  timePickerValue: null,
  sliderValue: 0,
  transferValue: null,
});
defineExpose({ showModalFn });
</script>
