<!--
 * @Author: ZHENG
 * @Date: 2022-06-01 16:21:58
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-10 16:11:52
 * @FilePath: \work\src\views\test\examManager\components\showExamModal.vue
 * @Description:
-->
<template>
  <n-modal
    v-model:show="showExamModal"
    style="width: 80%"
    :mask-closable="false"
    preset="dialog"
    title="试卷详情"
  >
    <n-scrollbar style="max-height: 80%">
      <!-- <p>{{ paper }}</p> -->
      <!-- 标题 -->
      <p
        style="
          display: flex;
          justify-content: center;
          font-size: 20px;
          line-height: 20px;
          font-weight: 700;
          margin-bottom: 19px;
        "
      >
        {{ paper.paperName }}
      </p>
      <p style="font-weight: bold">考试说明:</p>
      <p>
        {{ paper.paperDescribe }}
      </p>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr)">
        <div>考试时长: {{ examTimeRef }}分钟</div>
        <div>考试时间为: {{ paper.paperBeginTime }}至{{ paper.paperEndTime }}</div>
        <div>试卷满分: {{ paper.paperScores }}分</div>
      </div>

      <div v-for="(item, index) in paperList">
        <p style="font-weight: bold">
          第{{ index + 1 }}部分：{{ item[0].partName }}
          {{ item[0].partDescribe }}
        </p>
        <div v-for="(question, questionIndex) in item">
          <div style="margin: 20px">
            <template v-if="question.questionType === 0 || question.questionType === 1">
              <p>{{ questionIndex + 1 }}、{{ question.questionVo.questionName }}</p>
              <p v-for="item in JSON.parse(question.questionVo.questionOption)">
                {{ item }}
              </p>
            </template>
            <template v-else>
              <p>{{ questionIndex + 1 }}、{{ question.questionVo.questionName }}</p>
              <p>{{ question.questionVo.questionOption }}</p>
            </template>
          </div>
        </div>
      </div>
    </n-scrollbar>
  </n-modal>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useMessage } from "naive-ui";
import { delPaper, getListInfoByPaperId, getPaperDetail } from "@/service";
import { differenceInMinutes, format } from "date-fns";

const showExamModal = ref(false);
const paper = ref();
const examTimeRef = ref(0);
const paperList = ref();
// const emits = defineEmits(['reloadTable']);
const showModal = async (record) => {
  const param = {
    id: record.id,
  };
  const { data: result } = await getPaperDetail(param);
  paper.value = result.paper;
  showExamModal.value = true;
  const paperBeginTime = new Date(paper.value.paperBeginTime);
  const paperEndTime = new Date(paper.value.paperEndTime);
  const examTime = differenceInMinutes(paperEndTime, paperBeginTime);
  examTimeRef.value = examTime;
  const paperParam = {
    id: result.paper.id,
  };
  const { data: paperResult } = await getListInfoByPaperId(paperParam);
  paperList.value = paperListFn(paperResult);
  console.log("paperList", paperList.value);
};
const paperListFn = (paperList) => {
  const map = new Map();
  paperList.forEach((eachCase) => {
    const { partSort } = eachCase;
    if (map.has(partSort)) {
      map.get(partSort).push(eachCase);
    } else {
      map.set(partSort, [eachCase]);
    }
  });
  const sameIdCaseArrays = [];
  for (const [, value] of map) {
    sameIdCaseArrays.push(value);
  }
  return sameIdCaseArrays;
};

defineExpose({ showModal });

// 删除表格值
// eslint-disable-next-line consistent-return
// const onPositiveClick = async () => {
//   if (!props.delData) {
//     return message.error('删除数据异常');
//   }
//   const param = {
//     id: props.delData
//   };
//   const result = await delPaper(param);
//   if (result.data === '200') {
//     message.success('删除数据成功');
//   }
//   emits('reloadTable');
// };
</script>
