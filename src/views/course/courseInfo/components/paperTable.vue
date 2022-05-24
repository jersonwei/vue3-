<!--
 * @Author: ZHENG
 * @Date: 2022-05-21 16:00:56
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-23 20:31:16
 * @FilePath: \work\src\views\course\courseInfo\components\paperTable.vue
 * @Description:
-->
<template>
  <n-card class="drag-box">
    <n-space>
      <n-button @click="showpaper">新增</n-button>
      <n-button v-if="id != 0" @click="editPaper">提交</n-button>
    </n-space>
    <n-scrollbar style="max-height: 400px">
      <n-card v-if="radioList.length" title="单选题">
        <Draggable
          :list="radioList"
          :animation="100"
          item-key="id"
          class="list-group"
          :force-fallback="true"
          ghost-class="ghost"
          @change="onMoveCallback"
        >
          <template #item="{ element, index }">
            <div class="items">
              <div class="title">
                {{ element.id }}、{{ element.questionName }}
                <n-input v-model:value="element.questionScore" :style="{ width: '33%' }" placeholder="基本的 Input" />
                <n-button @click="delQu(radioList, index)">删除</n-button>
              </div>
            </div>
          </template>
        </Draggable>
      </n-card>
      <n-card v-if="multiList.length" title="多选题">
        <Draggable
          :list="multiList"
          :animation="100"
          item-key="id"
          class="list-group"
          :force-fallback="true"
          ghost-class="ghost"
          @change="onMoveCallback"
        >
          <template #item="{ element }">
            <div class="items">
              <div class="title">{{ element.id }}{{ element.questionName }}</div>
            </div>
          </template>
        </Draggable>
      </n-card>
      <n-card v-if="exerciseList.length" title="填空题">
        <Draggable
          :list="exerciseList"
          :animation="100"
          item-key="id"
          class="list-group"
          :force-fallback="true"
          ghost-class="ghost"
          @change="onMoveCallback"
        >
          <template #item="{ element }">
            <div class="items">
              <div class="title">{{ element.id }}{{ element.questionName }}</div>
            </div>
          </template>
        </Draggable>
      </n-card>
      <n-card v-if="answerList.length" title="简答题">
        <Draggable
          :list="answerList"
          :animation="100"
          item-key="id"
          class="list-group"
          :force-fallback="true"
          ghost-class="ghost"
          @change="onMoveCallback"
        >
          <template #item="{ element }">
            <div class="items">
              <div class="title">{{ element.id }}{{ element.questionName }}</div>
            </div>
          </template>
        </Draggable>
      </n-card>
      <n-card v-if="operateList.length" title="实操题">
        <Draggable
          :list="operateList"
          :animation="100"
          item-key="id"
          class="list-group"
          :force-fallback="true"
          ghost-class="ghost"
          @change="onMoveCallback"
        >
          <template #item="{ element }">
            <div class="items">
              <div class="title">{{ element.id }}{{ element.questionName }}</div>
            </div>
          </template>
        </Draggable>
      </n-card>
    </n-scrollbar>
    <n-modal
      v-model:show="showModal"
      preset="dialog"
      style="width: 1050px"
      title="确认"
      positive-text="确认"
      negative-text="算了"
      @positive-click="onPositiveClick"
    >
      <n-scrollbar ref="scrollRef" style="max-height: 750px">
        <!--  :rules="rules" -->
        <n-form ref="formRef" inline :model="showFormParams" label-placement="left" :label-width="120" class="m-2 py-4">
          <n-form-item label="试题题干" path="questionName">
            <n-input v-model:value="showFormParams.questionName" placeholder="请输入题目ID" />
          </n-form-item>
          <n-form-item label="试题类型" style="width: 300px" path="label">
            <n-select v-model:value="showFormParams.questionType" :options="quesform.questionType" />
          </n-form-item>
          <n-form-item path="courseName">
            <n-button type="primary" @click="reloadDataTable">查询</n-button>
          </n-form-item>
        </n-form>
        <TablePro
          ref="actionRef"
          :columns="paperColumns"
          :request="loadDataTable"
          :row-key="row => row.id"
          :scroll-x="1200"
          :default-checked-row-keys="defaultRow"
          @update:checked-row-keys="handleCheck"
        ></TablePro>
      </n-scrollbar>
    </n-modal>
  </n-card>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useMessage } from 'naive-ui';
import Draggable from 'vuedraggable';
import { addUnitPractice, editUnitPractice, getPaperList, getUnitPracticeList } from '@/service';
import { paperColumns } from './columns';

const message = useMessage();
interface Props {
  id: string | number;
}
const props = withDefaults(defineProps<Props>(), {
  id: 1
});
const quesform = reactive({
  questionType: [
    {
      label: '单选题',
      value: '0'
    },
    {
      label: '多选题',
      value: '1'
    },
    {
      label: '不定项选择题',
      value: '2'
    },
    {
      label: '填空题',
      value: '3'
    },
    {
      label: '实操题',
      value: '5'
    },
    {
      label: '其他',
      value: '6'
    }
  ]
});
const showFormParams = reactive({
  questionName: '',
  type: ''
});

const showpaper = () => {
  defaultRow.value = [];
  for (let i = 0; i < radioList.value.length; i++) {
    console.log(radioList.value[i]);
    defaultRow.value.push(radioList.value[i].id);
  }
  console.log(defaultRow.value);
  showModal.value = true;
};

const paperList = ref([]); // 所有的试题
const radioList = ref([]); // 单选题
const multiList = ref([]); // 多选题
const answerList = ref([]); // 简答题
const exerciseList = ref([]); // 填空题
const operateList = ref([]); // 实操题

// const tempradioList = ref([]); // 单选题
// const tempmultiList = ref([]); // 多选题
// const tempanswerList = ref([]); // 简答题
// const tempexerciseList = ref([]); // 填空题
// const operateList = ref([]); // 实操题

const loadPaperDataTable = async () => {
  const Param = {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    unitId: props.id,
    pageSize: 999999,
    current: 1
  };
  const { data: result } = await getUnitPracticeList({ ...Param });
  paperList.value = result.records;
  for (let i = 0; i < paperList.value.length; i++) {
    // checkedRowKeysRef.value.push(parseInt(paperList.value[i].questionId, 10));
    // defaultRow.value.push(paperList.value[i].questionId);
    if (paperList.value[i].questionTypeName === '单选题') {
      radioList.value.push(paperList.value[i]);
    }
  }
};
loadPaperDataTable();

const onMoveCallback = val => {
  console.log(val, 'move==================');
  console.log(paperList.value);
};

const fold = val => {
  val.isflod = !val.isflod;
};
const showModal = ref(false);
const actionRef = ref();
const reloadDataTable = () => {
  actionRef.value.reload();
};

// 获取习题列表
const loadDataTable = async (res: any) => {
  const Param = {
    pageSize: res.size,
    current: res.current
  };
  const result = await getPaperList({ ...showFormParams, ...Param });
  return result.data;
};
const defaultRow = ref([]);
const checkedRowKeysRef = ref([]);

const handleCheck = (rowKeys: never[]) => {
  const pageData = actionRef.value.tableElRef.data;
  // if (props.id === 0) {
  // 新增的选中
  pageData.forEach((element: { id: any; questionScore: any }) => {
    if (rowKeys[rowKeys.length - 1] === element.id) {
      console.log(element);
      // paperList.value.push(element);
      if (element.questionTypeName === '单选题') {
        radioList.value.push(element);
      } else if (element.questionTypeName === '多选题') {
        multiList.value.push(element);
      } else if (element.questionTypeName === '简答题') {
        answerList.value.push(element);
      } else if (element.questionTypeName === '实操题') {
        operateList.value.push(element);
      }
    }
  });
  // }
};

const delQu = (List, index) => {
  List.splice(index, 1);
};
const unitPractice = ref([]);
// const onPositiveClick = async () => {
//   // const pageData = actionRef.value.tableElRef.data;
//   // console.log(checkedRowKeysRef.value);
//   for (let i = 0; i < radioList.value.length; i++) {
//     console.log(radioList.value[i]);
//   }
//   console.log(unitPractice);
//   // const params = {
//   //   unitPractice
//   // };
//   // const { data: result } = await addUnitPractice(params);
//   // console.log(result);
// };
const emit = defineEmits(['resetTable']);
const editPaper = async () => {
  unitPractice.value = {
    unitPractice: []
  };
  for (let i = 0; i < radioList.value.length; i++) {
    const params = {
      id: parseInt(radioList.value[i].id, 10),
      unitId: parseInt(props.id, 10),
      questionId: radioList.value[i].questionId,
      questionScore: radioList.value[i].questionScore,
      sort: i + 1,
      questionType: radioList.value[i].questionType
    };
    unitPractice.value.unitPractice.push(params);
  }
  const result = await editUnitPractice(unitPractice.value);
  emit('resetTable');
  if (!result.error) {
    message.success('提交成功');
  }
  // id
  // integer
  // unitId
  // integer
  // questionId
  // integer
  // questionScore
  // integer
  // 老师设置的习题分数
  // sort
  // integer
  // questionType
};
defineExpose({ radioList, multiList, answerList, operateList });
</script>

<style lang="scss" scoped>
.drag-box {
  .items {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20px;
    margin-bottom: 20px;
    background: #e3e3e3;
    border-radius: 8px;
  }
}
</style>
