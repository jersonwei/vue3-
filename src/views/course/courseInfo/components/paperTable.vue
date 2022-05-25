<!--
 * @Author: ZHENG
 * @Date: 2022-05-21 16:00:56
 * @LastEditors: ZHENG
<<<<<<< HEAD
 * @LastEditTime: 2022-05-25 11:27:59
 * @FilePath: \work\src\views\course\courseInfo\components\paperTable.vue
=======
 * @LastEditTime: 2022-05-24 19:20:57
 * @FilePath: \20220524\src\views\course\courseInfo\components\paperTable.vue
>>>>>>> e981e2ee3b9dbcb357b24617bf3767eec74c2d5e
 * @Description:
-->
<template>
  <n-card class="drag-box">
    <n-space>
      <n-button @click="showpaper">新增</n-button>
    </n-space>
    <n-scrollbar style="max-height: 400px">
      <n-card v-if="radioList.length" style="width: 500px" title="单选题">
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
              <div class="title">{{ element.id }}、{{ element.questionName }}</div>
              <n-input v-model:value="element.questionScore" :style="{ width: '33%' }" placeholder="分数" />
              <n-button @click="delQu(radioList, index)">删除</n-button>
            </div>
          </template>
        </Draggable>
      </n-card>
      <n-card v-if="multiList.length" style="width: 500px" title="多选题">
        <Draggable
          :list="multiList"
          :animation="100"
          item-key="id"
          class="list-group"
          :force-fallback="true"
          ghost-class="ghost"
          @change="onMoveCallback"
        >
          <template #item="{ element, index }">
            <div class="items">
              <div class="title">{{ element.id }}、{{ element.questionName }}</div>
              <n-input v-model:value="element.questionScore" :style="{ width: '33%' }" placeholder="分数" />
              <n-button @click="delQu(multiList, index)">删除</n-button>
            </div>
          </template>
        </Draggable>
      </n-card>
      <n-card v-if="exerciseList.length" style="width: 500px" title="填空题">
        <Draggable
          :list="exerciseList"
          :animation="100"
          item-key="id"
          class="list-group"
          :force-fallback="true"
          ghost-class="ghost"
          @change="onMoveCallback"
        >
          <template #item="{ element, index }">
            <div class="items">
              <div class="title">{{ (element.id, index) }}、{{ element.questionName }}</div>
              <n-input v-model:value="element.questionScore" :style="{ width: '33%' }" placeholder="分数" />
              <n-button @click="delQu(exerciseList, index)">删除</n-button>
            </div>
          </template>
        </Draggable>
      </n-card>
      <n-card v-if="answerList.length" style="width: 500px" title="简答题">
        <Draggable
          :list="answerList"
          :animation="100"
          item-key="id"
          class="list-group"
          :force-fallback="true"
          ghost-class="ghost"
          @change="onMoveCallback"
        >
          <template #item="{ element, index }">
            <div class="items">
              <div class="title">{{ element.id }}、{{ element.questionName }}</div>
              <n-input v-model:value="element.questionScore" :style="{ width: '33%' }" placeholder="分数" />
              <n-button @click="delQu(answerList, index)">删除</n-button>
            </div>
          </template>
        </Draggable>
      </n-card>
      <n-card v-if="operateList.length" style="width: 500px" title="实操题">
        <Draggable
          :list="operateList"
          :animation="100"
          item-key="id"
          class="list-group"
          :force-fallback="true"
          ghost-class="ghost"
          @change="onMoveCallback"
        >
          <template #item="{ element, index }">
            <div class="items">
              <div class="title">{{ element.id }}{{ element.questionName }}</div>
              <n-input v-model:value="element.questionScore" :style="{ width: '33%' }" placeholder="分数" />
              <n-button @click="delQu(operateList, index)">删除</n-button>
            </div>
          </template>
        </Draggable>
      </n-card>
    </n-scrollbar>
    <!-- <n-space>
      <n-button v-if="id != 0" @click="editPaper">提交</n-button>
    </n-space> -->
    <div style="display: flex; justify-content: flex-end">
      <n-button v-if="id != 0" type="primary" @click="editPaper">提交</n-button>
    </div>
    <n-modal
      v-model:show="showModal"
      preset="dialog"
      :mask-closable="false"
      style="width: 750px"
      title="确认"
      positive-text="确认"
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
          :scroll-x="300"
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
  for (let i = 0; i < radioList?.value?.length; i++) {
    defaultRow.value.push(radioList.value[i].questionId);
  }
  for (let i = 0; i < multiList?.value?.length; i++) {
    defaultRow.value.push(multiList.value[i].questionId);
  }
  for (let i = 0; i < answerList?.value?.length; i++) {
    defaultRow.value.push(answerList.value[i].questionId);
  }
  for (let i = 0; i < exerciseList?.value?.length; i++) {
    defaultRow.value.push(exerciseList.value[i].questionId);
  }
  for (let i = 0; i < operateList?.value?.length; i++) {
    defaultRow.value.push(operateList.value[i].questionId);
  }
  showModal.value = true;
};

const paperList = ref([]); // 所有的试题
const radioList = ref([]); // 单选题
const multiList = ref([]); // 多选题
const answerList = ref([]); // 简答题
const exerciseList = ref([]); // 填空题
const operateList = ref([]); // 实操题

const loadPaperDataTable = async () => {
  const Param = {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    unitId: props.id,
    pageSize: 999999,
    current: 1
  };
  const { data: result } = await getUnitPracticeList({ ...Param });
  paperList.value = result.records;
  if (paperList?.value?.length) {
    for (let i = 0; i < paperList.value.length; i++) {
      // checkedRowKeysRef.value.push(parseInt(paperList.value[i].questionId, 10));
      // defaultRow.value.push(paperList.value[i].questionId);
      console.log(paperList);
      if (paperList.value[i].questionTypeName === '单选题') {
        radioList.value.push(paperList.value[i]);
      } else if (paperList.value[i].questionTypeName === '多选题') {
        multiList.value.push(paperList.value[i]);
      } else if (paperList.value[i].questionTypeName === '简答题') {
        answerList.value.push(paperList.value[i]);
      } else if (paperList.value[i].questionTypeName === '实操题') {
        operateList.value.push(paperList.value[i]);
      } else if (paperList.value[i].questionTypeName === '填空题') {
        exerciseList.value.push(paperList.value[i]);
      }
    }
  }
  console.log(paperList.value);
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

const handleCheck = (rowKeys: never[]) => {
  const pageData = actionRef.value.tableElRef.data;
  // 新增的选中
  pageData.forEach((element: { id: any; questionScore: any }) => {
    if (rowKeys[rowKeys.length - 1] === element.id) {
      console.log(element);
      if (element.questionTypeName === '单选题') {
        radioList.value.push(element);
      } else if (element.questionTypeName === '多选题') {
        multiList.value.push(element);
      } else if (element.questionTypeName === '简答题') {
        answerList.value.push(element);
      } else if (element.questionTypeName === '实操题') {
        operateList.value.push(element);
      } else if (element.questionTypeName === '填空题') {
        exerciseList.value.push(element);
      }
    }
  });
};

const delQu = (List, index) => {
  List.splice(index, 1);
};
const unitPractice = ref([]);
const emit = defineEmits(['resetTable']);
const editPaper = async () => {
  unitPractice.value = {
    unitPractice: []
  };
  for (let i = 0; i < radioList.value.length; i++) {
    if (!radioList.value[i].questionScore) {
      return message.error('请先输入分数');
    }
    console.log('radioList', radioList.value);
    if (radioList.value[i].unitId) {
      const params = {
        id: parseInt(radioList.value[i].id, 10),
        unitId: parseInt(props.id, 10),
        questionId: radioList.value[i].questionId,
        questionScore: radioList.value[i].questionScore,
        sort: i + 1,
        questionType: radioList.value[i].questionType
      };
      unitPractice.value.unitPractice.push(params);
    } else {
      const params = {
        unitId: parseInt(props.id, 10),
        questionId: radioList.value[i].id,
        questionScore: radioList.value[i].questionScore,
        sort: i + 1,
        questionType: radioList.value[i].questionType
      };
      unitPractice.value.unitPractice.push(params);
    }
  }
  for (let i = 0; i < multiList.value.length; i++) {
    if (!multiList.value[i].questionScore) {
      return message.error('请先输入分数');
    }
    console.log('multiList', multiList.value);
    if (multiList.value[i].unitId) {
      const params = {
        id: parseInt(multiList.value[i].id, 10),
        unitId: parseInt(props.id, 10),
        questionId: multiList.value[i].questionId,
        questionScore: multiList.value[i].questionScore,
        sort: i + 1,
        questionType: multiList.value[i].questionType
      };
      unitPractice.value.unitPractice.push(params);
    } else {
      const params = {
        unitId: parseInt(props.id, 10),
        questionId: multiList.value[i].id,
        questionScore: multiList.value[i].questionScore,
        sort: i + 1,
        questionType: multiList.value[i].questionType
      };
      unitPractice.value.unitPractice.push(params);
    }
  }
  for (let i = 0; i < answerList.value.length; i++) {
    if (!answerList.value[i].questionScore) {
      return message.error('请先输入分数');
    }
    console.log('answerList', answerList.value);
    if (answerList.value[i].unitId) {
      const params = {
        id: parseInt(answerList.value[i].id, 10),
        unitId: parseInt(props.id, 10),
        questionId: answerList.value[i].questionId,
        questionScore: answerList.value[i].questionScore,
        sort: i + 1,
        questionType: answerList.value[i].questionType
      };
      unitPractice.value.unitPractice.push(params);
    } else {
      const params = {
        unitId: parseInt(props.id, 10),
        questionId: answerList.value[i].id,
        questionScore: answerList.value[i].questionScore,
        sort: i + 1,
        questionType: answerList.value[i].questionType
      };
      unitPractice.value.unitPractice.push(params);
    }
  }
  for (let i = 0; i < operateList.value.length; i++) {
    if (!operateList.value[i].questionScore) {
      return message.error('请先输入分数');
    }
    console.log('operateList', operateList.value);
    if (operateList.value[i].unitId) {
      const params = {
        id: parseInt(operateList.value[i].id, 10),
        unitId: parseInt(props.id, 10),
        questionId: operateList.value[i].questionId,
        questionScore: operateList.value[i].questionScore,
        sort: i + 1,
        questionType: operateList.value[i].questionType
      };
      unitPractice.value.unitPractice.push(params);
    } else {
      const params = {
        unitId: parseInt(props.id, 10),
        questionId: operateList.value[i].id,
        questionScore: operateList.value[i].questionScore,
        sort: i + 1,
        questionType: operateList.value[i].questionType
      };
      unitPractice.value.unitPractice.push(params);
    }
  }
  for (let i = 0; i < exerciseList.value.length; i++) {
    if (!exerciseList.value[i].questionScore) {
      return message.error('请先输入分数');
    }
    console.log('exerciseList', exerciseList.value);
    if (exerciseList.value[i].unitId) {
      const params = {
        id: parseInt(exerciseList.value[i].id, 10),
        unitId: parseInt(props.id, 10),
        questionId: exerciseList.value[i].questionId,
        questionScore: exerciseList.value[i].questionScore,
        sort: i + 1,
        questionType: exerciseList.value[i].questionType
      };
      unitPractice.value.unitPractice.push(params);
    } else {
      const params = {
        unitId: parseInt(props.id, 10),
        questionId: exerciseList.value[i].id,
        questionScore: exerciseList.value[i].questionScore,
        sort: i + 1,
        questionType: exerciseList.value[i].questionType
      };
      unitPractice.value.unitPractice.push(params);
    }
  }

  const result = await editUnitPractice(unitPractice.value);
  emit('resetTable');
  if (!result.error) {
    message.success('提交成功');
  }
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
