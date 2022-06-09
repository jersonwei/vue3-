<!--
 * @Author: ZHENG
 * @Date: 2022-06-01 16:21:58
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-09 17:09:48
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
            {{ question }}
            <template v-if="question.questionType === 1">
              <p>
                {{
                  questionIndex + 1
                }}、甲公司2018年度发生的有关交易和事项如下：持有的交易性金融资产公允价值上升100万元。正常处置固定资产产生净收益20万元，因存货市价持续下跌计提存货跌价准备30万元，管理部门使用的机器设备发生日常维护支出40万元。假设不考虑其他因素，上述交易或事项对甲公司2018年营业利润的影响额是（
                ）万元。
              </p>
              <p>
                A. 销售材料取得的收入 B. 销售材料取得的收入 C. 接受捐赠收到的现金 C.
                接受捐赠收到的现金
              </p>
            </template>
            <template v-if="question.questionType === 2">
              <p>
                {{ questionIndex + 1 }}、甲公司2018年度发生的有关交易和事项如下：
                资产公允价值上升100万元。正常处置固定资产产生净收益20万元，因存货市价持续下跌计提存货跌价准备30万元，管理部门使用的机器设备发生日常维护支出40万元。
              </p>
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
import { delPaper, getPaperDetail } from "@/service";
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
  console.log(result);
  showExamModal.value = true;
  const paperBeginTime = new Date(paper.value.paperBeginTime);
  const paperEndTime = new Date(paper.value.paperEndTime);
  const examTime = differenceInMinutes(paperEndTime, paperBeginTime);
  examTimeRef.value = examTime;
  paperList.value = paperListFn(result.listPaperDetaile);
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
