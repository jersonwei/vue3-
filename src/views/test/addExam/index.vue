<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 14:33:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-01 11:52:43
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
              <n-button style="width: 100%" @click="scrollBar(index)">第{{ index + 1 }}部分</n-button>
            </template>
            <n-button style="width: 100%" type="info" ghost @click="addDetail">
              <template #icon>
                <n-icon>
                  <PlusOutlined />
                </n-icon> </template
              >添加部分</n-button
            >
            <p>总题数: {{ sumQuestNum }} 道</p>
            <p>总分值：{{ sumQuestMark }} 分</p>
            <n-button style="width: 100%" type="info" @click="saveDetail">保存</n-button>
          </n-space>
        </n-card>
      </n-gi>
      <n-gi span="10">
        <n-scrollbar ref="scrollbarRef" style="width: 100%; max-height: calc(100vh - 240px)">
          <n-card embedded title="📖 基本信息">
            <n-form
              ref="formRef"
              :model="paperList.BaseInfo"
              :rules="baseInfoRule"
              label-placement="left"
              :label-width="120"
            >
              <n-form-item label="试卷名称" path="paperName">
                <n-input v-model:value="paperList.BaseInfo.paperName" placeholder="请输入试卷名称" />
              </n-form-item>
              <n-form-item label="试卷简介" path="note">
                <n-input v-model:value="paperList.BaseInfo.note" type="textarea" placeholder="请输入试卷简介" />
              </n-form-item>
              <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi :span="12" label="试卷分类" path="type">
                  <n-select v-model:value="paperList.BaseInfo.type" :options="examTypeOptions" placeholder="请选择" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="考试时间" path="type">
                  <n-date-picker v-model:value="paperList.BaseInfo.time" type="datetimerange" clearable />
                </n-form-item-gi>
              </n-grid>
              <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi :span="12" label="上架时间" path="type">
                  <n-date-picker v-model:value="paperList.BaseInfo.timestamp" type="datetime" clearable />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="试卷难易度" path="type">
                  <n-date-picker v-model:value="paperList.BaseInfo.timestamp" type="datetime" clearable />
                </n-form-item-gi>
              </n-grid>
            </n-form>
          </n-card>
          <n-space vertical>
            <template v-for="(item, index) in paperList.detail" :key="index">
              <n-card :id="`li${index}`" embedded style="width: 100%" :title="`📖 第${index + 1}部分`">
                <template #header-extra>
                  <n-space>
                    <n-button @click="topMove(index)">上移</n-button>
                    <n-button @click="downMove(index)">下移</n-button>
                    <n-button @click="remove(index)">移除该部分</n-button>
                  </n-space>
                </template>
                <n-form
                  ref="formRef"
                  :model="paperList.detail[index]"
                  :rules="detailRule"
                  label-placement="left"
                  :label-width="120"
                >
                  <n-grid :cols="24" :x-gap="24">
                    <n-form-item-gi :span="12" label="名称" path="name">
                      <n-input v-model:value="paperList.detail[index].name" placeholder="请输入名称" />
                    </n-form-item-gi>
                    <n-form-item-gi :span="12" label="题目类型" path="questType">
                      <n-select
                        v-model:value="paperList.detail[index].questType"
                        :options="questTypeOptions"
                        placeholder="请选择"
                      />
                    </n-form-item-gi>
                  </n-grid>
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
                      <template #header-extra> 共有{{ paperList.detail[index].data?.length }}条数据 </template>
                      <n-button @click="addQuest(index, paperList.detail[index].questType)">添加题目</n-button>
                      <n-data-table
                        :columns="columns"
                        :row-key="id"
                        :data="paperList.detail[index].data"
                        :bordered="false"
                      /> </n-collapse-item
                  ></n-collapse>
                </n-form>
              </n-card>
            </template>
          </n-space>
        </n-scrollbar>
      </n-gi>
    </n-grid>
    <showQuest ref="showQuestRef" @choose-quest="chooseQuest"></showQuest>
  </n-card>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useMessage } from 'naive-ui';
import { PlusOutlined } from '@vicons/antd';
import { columns } from './columns';
import showQuest from './components/showQuestModal.vue';

const message = useMessage();
const baseInfoRule = {
  paperName: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入试卷名称'
  },
  note: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入试卷简介'
  }
};
const detailRule = {
  name: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入名称'
  },
  questType: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请选择题目类型'
  }
};
const paperList = ref({
  BaseInfo: {
    paperName: '',
    note: '',
    type: '',
    time: ref<[number, number]>([1183135260000, Date.now()]),
    timestamp: ref(1183135260000),
    difficultLevel: ''
  },
  detail: [
    {
      name: '',
      note: '',
      questType: '',
      data: [],
      checkRowKeys: []
    }
    // {
    //   name: '',
    //   note: ''
    // }
  ]
});
const examTypeOptions = ref([
  {
    label: '模拟试题',
    value: '0'
  },
  {
    label: '仿真试题',
    value: '1'
  },
  {
    label: '历年真题',
    value: '2'
  },
  {
    label: '阶段冲刺',
    value: '3'
  }
]);
const questTypeOptions = ref([
  {
    label: '单选',
    value: '0'
  },
  {
    label: '多选',
    value: '1'
  },
  {
    label: '填空题',
    value: '3'
  },
  {
    label: '简答题',
    value: '4'
  },
  {
    label: '编辑题',
    value: '5'
  },
  {
    label: '其他',
    value: '6'
  },
  {
    label: '判断',
    value: '7'
  }
]);
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
/**
 * @author: ZHENG
 * @description: 新增部分
 * @return {*}
 */
const addDetail = () => {
  message.info('添加');
  paperList.value.detail.push({
    name: '',
    note: '',
    data: []
  });
};
const saveDetail = () => {
  message.info('保存');
};
/**
 * @author: ZHENG
 * @description: 上移数据
 * @param {*} index
 * @return {*}
 */
const topMove = index => {
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
const downMove = index => {
  if (index != paperList.value.detail.length - 1) {
    const list = paperList.value.detail;
    // eslint-disable-next-line prefer-destructuring
    list[index] = list.splice(index + 1, 1, list[index])[0];
  }
};
const remove = index => {
  if (paperList.value.detail.length != 1) {
    const list = paperList.value.detail;
    // eslint-disable-next-line prefer-destructuring
    list.splice(index, 1);
  } else {
    message.warning('至少要保留一个');
  }
};

const showQuestRef = ref();
const addQuest = (index, questType) => {
  if (!questType) {
    return message.warning('请先选择题目类型');
  }
  showQuestRef.value.showModalFn(index, questType, paperList.value.detail[index].checkRowKeys);
};
const chooseQuest = (index, checkRow, checkRowKeys) => {
  paperList.value.detail[index].checkRowKeys = checkRowKeys;
  paperList.value.detail[index].data.push(...checkRow);
  console.log(index, checkRow, checkRowKeys);
};
const scrollbarRef = ref();
const scrollBar = index => {
  // 有index就是试题明细
  if (index) {
    const to = document.getElementById(`li${index}`)?.offsetTop;
    const option = {
      top: to,
      behavior: 'smooth'
    };
    scrollbarRef.value.scrollTo(option);
  } else {
    const option = {
      top: 0,
      behavior: 'smooth'
    };
    scrollbarRef.value.scrollTo(option);
  }

  // li 1
};

// // 获取用户信息
// const { userRole } = getUserInfo();

// console.log(userRole);

// const courseStore = useCourseStore();
// const formData = ref({});
// const actionColumn = reactive({
//   width: 100,
//   title: '操作',
//   key: 'action',
//   fixed: 'right',
//   render(record: Recordable<any>) {
//     return h(TableAction as any, {
//       style: 'button',
//       actions: [
//         {
//           label: '删除',
//           icon: 'ic:outline-delete-outline',
//           // eslint-disable-next-line @typescript-eslint/no-use-before-define
//           onClick: handleDelete.bind(null, record)
//         },
//         {
//           label: '编辑',
//           // eslint-disable-next-line @typescript-eslint/no-use-before-define
//           onClick: handleEdit.bind(null, record)
//         }
//       ]
//     });
//   }
// });

// const [register] = useForm({
//   // 查询FORM
//   gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
//   labelWidth: 80,
//   schemas
// });
// /**
//  * @author: ZHENG
//  * @description: 表格
//  */
// // table查询
// const loadDataTable = async (res: any) => {
//   const Param = {
//     pageSize: res.size,
//     current: res.current
//   };
//   const result = await searchCouserInfo({ ...formData.value, ...Param });
//   return result.data;
// };
// /**
//  * @author: ZHENG
//  * @description: 刷新， 重置
//  */
// const reloadTable = () => {
//   // eslint-disable-next-line @typescript-eslint/no-use-before-define
//   actionRef.value.reload();
// };
// // 查询
// const handleSubmit = (values: Recordable) => {
//   formData.value = values;
//   reloadTable();
// };

// // 删除逻辑
// const delModalRef = ref();
// const delData = ref<number>(0); // 删除数据的ID
// const delText = ref(''); // 删除的文字
// // eslint-disable-next-line consistent-return
// const handleDelete = (record: Recordable) => {
//   if (record.status === '0') {
//     return message.error('只有下架状态课程才能删除');
//   }
//   delText.value = record.courseName;
//   delData.value = record.id;
//   delModalRef.value.showDelModal = true;
// };

// // 新建和编辑弹窗
// const addOrEditModalRef = ref();
// // 新建
// const addTable = () => {
//   addOrEditModalRef.value.showModalFn();
// };

// /**
//  * @author: ZHENG
//  * @description: 编辑
//  * @param {*} record
//  * @return {*}
//  */
// const handleEdit = (record: Recordable) => {
//   addOrEditModalRef.value.editModalFn(record);
// };

// // 跳转详情页功能
// const actionRef = ref(); // 表格
// const updateData = ref();
// // 定时上架功能
// const updateModalRef = ref();
// const handUpdateStatus = (record: Recordable) => {
//   updateData.value = record;
//   console.log(updateData.value);
//   updateModalRef.value.showUpdateModal = true;
// };

// const { routerPush } = useRouterPush();

// /**
//  * @author: ZHENG
//  * @description: 跳转课程预览
//  * @param {*} record
//  * @return {*}
//  */
// const handleDetail = (record: Recordable) => {
//   courseStore.setCourseInfo(record.id);
//   routerPush({ name: 'course_courseDetail', query: { id: record.id } });
// };

// /**
//  * @author: ZHENG
//  * @description: 跳转课程信息\配置
//  * @param {*} record
//  * @return {*}
//  */
// const handleConfig = (record: Recordable) => {
//   courseStore.setCourseInfo(record.id);
//   console.log(record.id);
//   routerPush({ name: 'course_courseInfo' });
// };
</script>
<style scoped></style>
