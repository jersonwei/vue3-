<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 14:33:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-04 19:57:58
 * @FilePath: \work\src\views\test\addExam\index.vue
 * @Description:
-->
<template>
  <n-card>
    <n-grid class="mt-4" cols="12" responsive="screen" :x-gap="12">
      <n-gi span="2">
        <n-card embedded size="small">
          <n-space vertical>
            <n-button style="width: 100%" @click="scrollBar('')">基本信息</n-button>
            <template v-for="(item, index) in paperList.detail" :key="index">
              <n-button style="width: 100%" @click="scrollBar(index)"
                >第{{ numberfilter(index + 1) }}部分</n-button
              >
            </template>
            <n-button style="width: 100%" :disabled="addOrEdit === true && addStep === 1" type="info" ghost @click="addDetail">
              <template #icon>
                <n-icon>
                  <PlusOutlined />
                </n-icon> </template
              >添加部分</n-button
            >
            <p>总题数： {{ sumQuestNum }} 道</p>
            <p>总分值：{{ sumQuestMark }} 分</p>
          </n-space>
        </n-card>
      </n-gi>
      <n-gi span="10">
        <n-scrollbar
          ref="scrollbarRef"
          style="width: 100%; max-height: calc(100vh - 240px)"
        >
          <n-card v-if="addStep === 1" embedded title="📖 基本信息">
            <n-form
              ref="BaseFormRef"
              :model="paperList.BaseInfo"
              :rules="baseInfoRule"
              label-placement="left"
              :label-width="120"
            >
			
              <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi :span="24" label="试卷名称" path="paperName">
                  <n-input
                    v-model:value="paperList.BaseInfo.paperName"
                    placeholder="请输入试卷名称"
                  />
                </n-form-item-gi>
                <n-form-item-gi :span="24" label="试卷简介" path="note">
                  <n-input
                    v-model:value="paperList.BaseInfo.note"
                    type="textarea"
                    placeholder="请输入试卷简介"
                  />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="试卷分类" path="type">
                  <n-select
                    v-model:value="paperList.BaseInfo.type"
                    :options="examTypeOptions"
                    placeholder="请选择试卷分类"
                  />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="考试时间" path="time">
                  <n-date-picker
                    v-model:value="paperList.BaseInfo.time"
                    type="datetimerange"
                    clearable
                    :is-date-disabled="disablePreviousDate"
                  />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="试卷难易度" path="difficultLevel">
                  <n-select
                    v-model:value="paperList.BaseInfo.difficultLevel"
                    placeholder="请选择难易度"
                    :options="difficultyOptions"
                  />
                </n-form-item-gi>
              </n-grid>
            </n-form>
          </n-card>
          <n-card v-else embedded title="📖 基本信息">
            <n-form
              label-placement="left"
              :label-width="120"
            >
              <n-form-item label="试卷名称" path="paperName">
                <p style="font-size: 18px">{{ paperList.BaseInfo.paperName }}</p>
              </n-form-item>
              <n-form-item label="试卷简介" path="note">
                <p style="font-size: 18px">{{ paperList.BaseInfo.note }}</p>
              </n-form-item>
              <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi :span="12" label="试卷分类" path="type">
                  <p style="font-size: 18px">
                    {{ paperList.BaseInfo.categoryName }}
                  </p>
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="考试时间" path="time">
                  <n-date-picker
                    v-model:value="paperList.BaseInfo.time"
                    disabled
                    type="datetimerange"
                    clearable
                    :is-date-disabled="disablePreviousDate"
                  />
                </n-form-item-gi>
              </n-grid>
              <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi :span="12" label="试卷难易度" path="difficultLevel">
                  <p style="font-size: 18px">
                    {{ paperList.BaseInfo.difficultyLevelName }}
                  </p>
                </n-form-item-gi>
              </n-grid>
            </n-form>
          </n-card>
          <n-space vertical>
            <template v-for="(item, index) in paperList.detail" :key="index">
              <n-card
                :id="`li${index}`"
                embedded
                style="width: 100%"
                :title="`📖 第${numberfilter(index + 1)}部分`"
              >
                <template #header-extra>
                  <n-space>
                    <n-button @click="topMove(index)">上移</n-button>
                    <n-button @click="downMove(index)">下移</n-button>
                    <n-button @click="remove(index)">移除该部分</n-button>
                  </n-space>
                </template>
                <n-form
                  ref="detailFormRef"
                  :model="paperList.detail[index]"
                  :rules="detailRule"
                  label-placement="left"
                  :label-width="120"
                >
                  <n-form-item-gi :span="12" label="名称" path="name">
                    <n-input
                      v-model:value="paperList.detail[index].name"
                      placeholder="请输入名称"
                    />
                  </n-form-item-gi>
                  <n-form-item-gi :span="12" label="题目类型" path="questType">
                    <n-select
                      v-model:value="paperList.detail[index].questType"
                      :options="questTypeOptions"
                      placeholder="请选择"
                      @update:show="(show) => handleShowValue(show, index)"
                      @update:value="
                        (value, option) => handleUpdateValue(value, option, index)
                      "
                    />
                  </n-form-item-gi>

                  <n-grid :cols="24" :x-gap="24">
                    <n-form-item-gi :span="24" label="答题说明" path="type">
                      <n-input
                        v-model:value="paperList.detail[index].note"
                        type="textarea"
                        placeholder="请输入答题说明"
                      />
                    </n-form-item-gi>
                  </n-grid>

                  <n-collapse>
                    <n-collapse-item title="试题详情" name="1">
                      <template #header-extra>
                        共有{{ paperList.detail[index].data?.length }}条数据
                      </template>
                      <n-button
                        @click="addQuest(index, paperList.detail[index].questType)"
                        >添加题目</n-button
                      >
                      <n-data-table
                        ref="tableRef"
                        :columns="columns"
                        :data="paperList.detail[index].data"
                        :bordered="false"
                      /> </n-collapse-item
                  ></n-collapse>
                </n-form>
              </n-card>
            </template>
          </n-space>
        </n-scrollbar>
        <div style="display: flex; justify-content: center; margin-top: 50px">
          <n-button style="width: 10%" type="info" @click="saveDetail">保存</n-button>
        </div>
      </n-gi>
    </n-grid>
    <showQuest ref="showQuestRef" @choose-quest="chooseQuest"></showQuest>
    <n-modal
      v-model:show="showChangeQuestionTypeModal"
      :mask-closable="false"
      preset="dialog"
      title="确认"
      content="确认切换题目类型?会清空当前已选题目！"
      positive-text="确认"
      negative-text="算了"
      @positive-click="submitCallback"
      @negative-click="cancelCallback"
    />
    <showQuestionInfo ref="showQuestionInfoRef"></showQuestionInfo>
    <n-modal
      v-model:show="showSortModal"
      :mask-closable="false"
      preset="dialog"
      title="确认"
      content="确认切换题目类型?会清空当前已选题目！"
      positive-text="确认"
      negative-text="算了"
      @positive-click="submitQuestionSort"
    >
      <p>
        移动道第
        <n-input-number
          v-model:value="questionSort"
          :max="maxQuestionSort"
          :min="1"
          style="width: 30%"
        />位
      </p>
    </n-modal>
    <n-modal
      v-model:show="showRemoveModal"
      :mask-closable="false"
      preset="dialog"
      title="提示"
      content="确认要移除该题目吗？"
      positive-text="确认"
      negative-text="取消"
      @positive-click="submitRemoveQuestion"
    />
  </n-card>
</template>

<script lang="ts" setup>
import { computed, h, ref } from "vue";
import { SelectOption, useMessage, NInputNumber, NButton } from "naive-ui";
import { PlusOutlined } from "@vicons/antd";
import { format } from "date-fns";
import { useExamStore } from "@/store";
import { addPaper, editPaper, getPaperDetail, getPaperList } from "@/service";
import { disablePreviousDate, numberfilter } from "@/utils";
// import { columns } from './columns';
import showQuest from "./components/showQuestModal.vue";
import { getPaperClassInfo, getDictionary } from "./geOptions";
import showQuestionInfo from "./components/showQuestionInfo.vue";

const examStore = useExamStore();
const paperData = examStore.getPaper();
const addOrEdit = ref(false); // true 新增
const addStep = ref(1); // 新增哪一个阶段
const tableRef = ref();

const showQuestionInfoRef = ref();
const showSortModal = ref(false);
const questionSort = ref();
const changeQuesionSort = ref();
const changeQuesionIndexSort = ref();
const showQuestionInfoModal = (row, index) => {
  questionSort.value = index + 1;
  showSortModal.value = true;
  changeQuesionSort.value = row;
  changeQuesionIndexSort.value = index;
};
const maxQuestionSort = computed(() => {
  const tableDataIndex = changeQuesionSort.value.partSort;
  const changeRowLength = paperList.value.detail[tableDataIndex]?.data?.length;
  return changeRowLength || 0;
});
const submitQuestionSort = () => {
  const tableDataIndex = changeQuesionSort.value.partSort;
  const changeOldIndex = changeQuesionIndexSort.value;
  const changeNewIndex = questionSort.value;
  if (changeOldIndex === changeNewIndex) {
    return;
  }
  // console.log(changeOldIndex, changeNewIndex);
  // console.log(paperList.value.detail[tableDataIndex]);
  const changeRowData = paperList.value.detail[tableDataIndex].data[changeOldIndex]; // 需要变更顺序的行
  // console.log(paperList.value.detail[tableDataIndex].data);
  paperList.value.detail[tableDataIndex].data.splice(changeNewIndex, 0, changeRowData);
  paperList.value.detail[tableDataIndex].data.splice(changeOldIndex, 1);
  // console.log(changeRowData);
};
const showRemoveModal = ref(false);
const removeRowData = ref();
const removeRowIndex = ref();
const showRemoveModalFn = (row, index) => {
  showRemoveModal.value = true;
  removeRowData.value = row;
  removeRowIndex.value = index;
};
const submitRemoveQuestion = () => {
  const tableDataIndex = removeRowData.value.partSort; // 需要删除数据的table
  const tableData = paperList.value.detail[tableDataIndex].data;
  tableData.splice(removeRowIndex.value, 1);
  // console.log(tableData, removeRowIndex.value);
};
const columns = [
  {
    title: "题目",
    key: "questionName",
    width: 120,
  },
  {
    title: "分值",
    key: "questionScore",
    width: 120,
    render(row: { questionScore: string & [string, string] }) {
      return h(NInputNumber, {
        value: row.questionScore,
        onUpdateValue(v) {
          // console.log(row, index);
          // eslint-disable-next-line no-param-reassign
          row.questionScore = v;
          console.log(row.questionScore);
          // data.value[index].name = v;
        },
      });
    },
  },
  {
    title: "操作",
    key: "courseName",
    width: 100,
    render(row, index) {
      return h("div", [
        h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => {
              showQuestionInfoRef.value.showModalFn(row);
              // console.log(123);
            },
          },
          { default: () => "详情" }
        ),
        h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => {
              showQuestionInfoModal(row, index);
            },
          },
          { default: () => "排序" }
        ),
        h(
          NButton,
          {
            strong: true,
            tertiary: true,
            size: "small",
            onClick: () => {
              showRemoveModalFn(row, index);
            },
          },
          { default: () => "移除" }
        ),
      ]);
    },
  },
];

const getAddOrEdit = async () => {
  if (!paperData) {
    addOrEdit.value = true;
  } else {
    const param = {
      id: paperData.id,
    };
    const { data: result } = await getPaperDetail(param);
    // console.log(result);
    addOrEdit.value = false;
    const { paper, listPaperDetaile } = result;
    getPaperData(paper);
    getPaperDetailData(listPaperDetaile);
  }
  // console.log(addOrEdit.value);
};
const getPaperData = (paper) => {
  const {
    paperName,
    paperDescribe,
    categoryId,
    paperBeginTime,
    paperEndTime,
    difficultLevel,
    id,
  } = paper;
  const beginTime = new Date(paperBeginTime).getTime();
  const endTime = new Date(paperEndTime).getTime();
  const object = {
    id,
    paperName,
    note: paperDescribe,
    type: categoryId,
    time: ref<[number, number]>([beginTime, endTime]),
    difficultLevel,
  };
  const paperListValue = paperList.value.BaseInfo;
  Object.assign(paperListValue, object);
};
const getPaperDetailData = (listPaperDetaile) => {
  console.log(listPaperDetaile);
  const { detail } = paperList.value;
  detail.length = 0; // 保证不要有异常数据影响，清空掉
  listPaperDetaile.forEach(async (item) => {
    console.log(item);
    const {
      partSort,
      partName,
      questionType,
      partDescribe,
      id,
      questionScore,
      questionId,
    } = item;
    const { records: questionData } = await loadQuestionData(questionId);
    const rowData = {
      rowID: id,
      questionScore,
      partSort,
      ...questionData[0],
    };
    if (detail[partSort]) {
      // 如果已存在不分
      detail[partSort].data.push(rowData);
    } else {
      // 不存在部分
      detail[partSort] = {
        name: partName,
        note: partDescribe,
        questType: questionType,
        data: [],
        checkRowKeys: [],
      };
      detail[partSort].data.push(rowData);
    }
    console.log(detail);
  });
};
const loadQuestionData = async (id) => {
  const Param = {
    id,
    pageSize: 1,
    current: 1,
  };
  const { data: result } = await getPaperList({ ...Param });
  return result;
};
getAddOrEdit();

const message = useMessage();
const baseInfoRule = {
  paperName: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入试卷名称",
  },
  note: {
    required: true,
    trigger: ["blur"],
    message: "请输入试卷简介",
  },
  type: {
		type: 'number',
    required: true,
    trigger: ["blur", "change"],
    message: "请选择试卷分类",
  },
  difficultLevel: {
		type: 'number',
    required: true,
    trigger: ["blur", "change"],
    message: "请选择难易度",
  },
};
const detailRule = {
  name: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入名称",
  },
  questType: {
    required: true,
    message: "请选择题目类型",
  },
};
const paperList = ref({
  BaseInfo: {
    id: "",
    paperName: "",
    note: "",
    type: null,
    time: ref<[number, number]>(),
    timestamp: ref(),
    difficultLevel: null,
    difficultyLevelName: "",
    categoryName: "",
  },
  detail: [
    // {
    //   name: "",
    //   note: "",
    //   questType: "",
    //   data: [],
    //   checkRowKeys: [],
    // },
  ],
});
const examTypeOptions = ref([]);
const questTypeOptions = ref([]);
const difficultyOptions = ref([]);
const sumQuestNum = computed(() => {
  let sum = 0;
  const paper = paperList.value.detail;
  for (let i = 0; i < paper.length; i++) {
    sum += paper[i].data.length;
  }
  return sum;
});
const sumQuestMark = computed(() => {
  let sumMark = 0;
  const paper = paperList.value.detail;
  for (let i = 0; i < paper.length; i++) {
    for (let y = 0; y < paper[i].data?.length; y++) {
      sumMark += paper[i].data[y]?.questionScore || 0;
    }
  }
  return sumMark;
});

const getOptios = async () => {
  examTypeOptions.value = await getPaperClassInfo();
  questTypeOptions.value = await getDictionary(2);
  difficultyOptions.value = await getDictionary(23);
};
getOptios();
/**
 * @author: ZHENG
 * @description: 新增部分
 * @return {*}
 */
const addDetail = () => {
  paperList.value.detail.push({
    name: "",
    note: "",
    questType: "",
    data: [],
    checkRowKeys: [],
  });
};
const BaseFormRef = ref();
const detailFormRef = ref();
const saveDetail = async () => {
  console.log(paperList.value);
  const ruleError = false;
  await BaseFormRef.value.validate((errors: any) => {
    console.log(errors);
    if (!errors) {
    } else {
      return message.error("请填写完整信息");
    }
  });
  BaseFormRef.value.restoreValidation();
  for (let i = 0; i < detailFormRef?.value?.length; i++) {
    detailFormRef.value[i].validate((detailErrors: any) => {
      if (!detailErrors && ruleError) {
      } else {
        return message.error("请填写完整信息");
      }
    });
  }
  const { type, paperName, note, time, difficultLevel, id } = paperList.value.BaseInfo;
  const paperBeginTime = format(new Date(time[0]), "yyyy-MM-dd HH:mm:ss");
  const paperEndTime = format(new Date(time[1]), "yyyy-MM-dd HH:mm:ss");

  if (addOrEdit.value === true && addStep.value === 1) {
    const params = {
      paper: {
        categoryId: type,
        paperName,
        paperDescribe: note,
        paperScores: sumQuestMark.value,
        status: 0,
        delayedSubmit: 0,
        paperBeginTime,
        paperEndTime,
        difficultLevel,
      },
      listPaperDetaile: [],
    };
    for (let i = 0; i < paperList.value.detail?.length; i++) {
      for (let y = 0; y < paperList.value.detail[i]?.data.length; y++) {
        const { questType, detailNote, name } = paperList.value.detail[i];
        const { id: questionId, questionScore } = paperList.value.detail[i]?.data[y];
        const param = {
          questionType: questType,
          questionId,
          questionSort: y,
          partSort: i,
          questionScore,
          extraScore: 0,
          partDescribe: detailNote,
          partName: name,
        };
        params.listPaperDetaile.push(param);
      }
    }
    const result = await addPaper(params);
    if (!result.error) {
      message.success("保存成功");
      addStep.value = 2;
      console.log(result.data);
      paperList.value.BaseInfo.id = result.data.paper.id;
      paperList.value.BaseInfo.categoryName = result.data.categoryName;
      paperList.value.BaseInfo.difficultyLevelName = result.data.difficultyLevelName;
    }
  } else if (addOrEdit.value === true && addStep.value === 2) {
    const params = {
      paper: {
        id,
        categoryId: type,
        paperName,
        paperDescribe: note,
        paperScores: sumQuestMark.value,
        status: 0,
        delayedSubmit: 0,
        paperBeginTime,
        paperEndTime,
        difficultLevel,
      },
      listPaperDetaile: [],
    };
    for (let i = 0; i < paperList.value.detail.length; i++) {
      for (let y = 0; y < paperList.value.detail[i]?.data.length; y++) {
        const { questType, detailNote, name } = paperList.value.detail[i];
        const { rowID, id: questionId, questionScore } = paperList.value.detail[i]?.data[
          y
        ];
        const param = {
          id: rowID,
          questionType: questType,
          questionId,
          questionSort: y,
          partSort: i,
          questionScore,
          extraScore: 0,
          partDescribe: detailNote,
          partName: name,
        };
        params.listPaperDetaile.push(param);
      }
    }
    const result = await editPaper(params);
    if (!result.error) {
      message.success("保存成功");
    }
  } else {
    // 编辑
    // console.log(paperList.value);
    const params = {
      paper: {
        id,
        categoryId: type,
        paperName,
        paperDescribe: note,
        paperScores: sumQuestMark.value,
        status: 0,
        delayedSubmit: 0,
        paperBeginTime,
        paperEndTime,
        difficultLevel,
      },
      listPaperDetaile: [],
    };
    for (let i = 0; i < paperList.value.detail.length; i++) {
      for (let y = 0; y < paperList.value.detail[i]?.data.length; y++) {
        const { questType, detailNote, name } = paperList.value.detail[i];
        const { rowID, id: questionId, questionScore } = paperList.value.detail[i]?.data[
          y
        ];
        if (!questionScore) {
          return message.error(`第${i}部分未填写分数`);
        }
        const param = {
          id: rowID,
          questionType: questType,
          questionId,
          questionSort: y,
          partSort: i,
          questionScore,
          extraScore: 0,
          partDescribe: detailNote,
          partName: name,
        };
        params.listPaperDetaile.push(param);
      }
    }
    const result = await editPaper(params);
    if (!result.error) {
      message.success("保存成功");
    }
  }
};
/**
 * @author: ZHENG
 * @description: 切换类型
 * @return {*}
 */
/**
 * @author: ZHENG
 * @description: 上移数据
 * @param {*} index
 * @return {*}
 */
const topMove = (index) => {
  if (index != 0) {
    const list = paperList.value.detail;
    // eslint-disable-next-line prefer-destructuring
    list[index] = list.splice(index - 1, 1, list[index])[0];
  }
};
/**
 * @author: ZHENG
 * @description: 下移
 * @param {*} index
 * @return {*}
 */
const downMove = (index) => {
  if (index != paperList.value.detail.length - 1) {
    const list = paperList.value.detail;
    // eslint-disable-next-line prefer-destructuring
    list[index] = list.splice(index + 1, 1, list[index])[0];
  }
};
const remove = (index) => {
  if (paperList.value.detail.length != 1) {
    const list = paperList.value.detail;
    // eslint-disable-next-line prefer-destructuring
    list.splice(index, 1);
  } else {
    message.warning("至少要保留一个");
  }
};

const showQuestRef = ref();
const addQuest = (index, questType) => {
  if (questType === "") {
    return message.warning("请先选择题目类型");
  }
  showQuestRef.value.showModalFn(
    index,
    questType,
    paperList.value.detail[index].checkRowKeys
  );
};
const chooseQuest = (index, checkRow, checkRowKeys) => {
  paperList.value.detail[index].checkRowKeys = checkRowKeys;
  paperList.value.detail[index].data.push(...checkRow);
  console.log(index, checkRow, checkRowKeys);
};
const scrollbarRef = ref();
const scrollBar = (index) => {
  // 有index就是试题明细
  if (index) {
    const to = document.getElementById(`li${index}`)?.offsetTop;
    const option = {
      top: to,
      behavior: "smooth",
    };
    scrollbarRef.value.scrollTo(option);
  } else {
    const option = {
      top: 0,
      behavior: "smooth",
    };
    scrollbarRef.value.scrollTo(option);
  }

  // li 1
};

/**
 * @author: ZHENG
 * @description: 展开的时候记录当前的questionType,检查更新后与旧值不同弹出提示，更新的话把表格数据清空
 * @return {*}
 */
const oldQuestType = ref();
const handleShowValue = (show: boolean, index: number) => {
  console.log(show, index);
  if (show) {
    oldQuestType.value = paperList.value.detail[index].questType;
  }
};
const showChangeQuestionTypeModal = ref(false);
const changeQuestionIndex = ref();
const handleUpdateValue = (value: string, option: SelectOption, index: number) => {
  if (oldQuestType.value && oldQuestType.value !== value) {
    showChangeQuestionTypeModal.value = true;
    changeQuestionIndex.value = index;
  }
};
/**
 * @author: ZHENG
 * @description: 清空当前的选项值
 */
const submitCallback = () => {
  paperList.value.detail[changeQuestionIndex.value].data = [];
};
// 不清空并会把值重置回去
const cancelCallback = () => {
  paperList.value.detail[changeQuestionIndex.value].questType = oldQuestType.value;
};
</script>
<style scoped></style>
