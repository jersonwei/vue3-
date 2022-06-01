<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 14:33:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-31 22:51:28
 * @FilePath: \work\src\views\test\addExam\index.vue
 * @Description:
-->
<template>
  <n-card>
    <n-grid class="mt-4" cols="12" responsive="screen" :x-gap="12">
      <n-gi span="2">
        <n-card size="small">
          <n-space vertical>
            <n-button style="width: 100%">基本信息</n-button>
            <template v-for="(item, index) in paperList.detail" :key="index">
              <n-button style="width: 100%">第{{ index + 1 }}部分</n-button>
            </template>
            <n-button style="width: 100%" type="info" ghost>添加部分</n-button>
            <p>总题数: 道</p>
            <p>总分值： 分</p>
            <n-button style="width: 100%" type="info">保存</n-button>
          </n-space>
        </n-card>
      </n-gi>
      <n-gi span="10">
        <n-space>
          <n-card title="📖 基本信息">
            <n-form
              ref="formRef"
              :model="paperList.BaseInfo"
              :rules="baseInfoRule"
              label-placement="left"
              :label-width="160"
            >
              <n-form-item label="试卷名称" path="paperName">
                <n-input v-model:value="paperList.BaseInfo.paperName" placeholder="请输入试卷名称" />
              </n-form-item>
              <n-form-item label="试卷名称" path="note">
                <n-input v-model:value="paperList.BaseInfo.note" type="textarea" placeholder="请输入试卷简介" />
              </n-form-item>
              <n-grid :cols="24" :x-gap="24">
                <n-form-item-gi :span="12" label="试卷分类" path="type">
                  <n-select v-model:value="paperList.BaseInfo.type" :options="examTypeOptions" />
                </n-form-item-gi>
                <n-form-item-gi :span="12" label="考试时间" path="type">
                  <n-date-picker v-model:value="paperList.BaseInfo.time" type="datetimerange" clearable />
                </n-form-item-gi>
              </n-grid>
            </n-form>
          </n-card>
          <template v-for="(item, index) in paperList.detail" :key="index">
            <n-card style="width: 100%" :title="`📖 第${index + 1}部分`">
              <n-form
                ref="formRef"
                style="width: 100%"
                :model="paperList.detail"
                :rules="detailRule"
                label-placement="left"
                :label-width="160"
              >
                <n-form-item label="名称" path="paperName">
                  <n-input v-model:value="paperList.detail[index].name" placeholder="请输入名称" />
                </n-form-item>
                <n-form-item label="答题说明" path="note">
                  <n-input v-model:value="paperList.detail[index].note" type="textarea" placeholder="请输入答题说明" />
                </n-form-item>
                <n-collapse>
                  <n-collapse-item title="试题详情" name="1">
                    <template #header-extra> 共有{{ paperList.detail[index].data.length }}条数据 </template>
                    <n-data-table
                      :columns="columns"
                      :data="paperList.detail[index].data"
                      :bordered="false"
                    /> </n-collapse-item
                ></n-collapse>
              </n-form>
            </n-card>
          </template>
        </n-space>
      </n-gi>
    </n-grid>
  </n-card>
</template>

<script lang="ts" setup>
// import { h, reactive, ref } from 'vue';
// import { CascaderOption, useMessage } from 'naive-ui';
// import { PlusOutlined } from '@vicons/antd';
// import { useCourseStore } from '@/store';
// import { useRouterPush } from '@/composables';
// import { searchCouserInfo } from '@/service';
// import { getUserInfo } from '@/utils';
// import { TablePro, TableAction } from '@/components/TablePro';
// import { FormPro, useForm } from '@/components/FormPro';
import { ref } from 'vue';
import { columns } from './columns';
// import { schemas } from './schemas';
// import delModal from './components/delModal.vue';
// import addOrEditModalVue from './components/addOrEditModal.vue';

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
const detailRule = {};
const paperList = ref({
  BaseInfo: {
    paperName: '',
    note: '',
    type: '',
    time: ref<[number, number]>([1183135260000, Date.now()])
  },
  detail: [
    {
      name: '',
      note: '',
      data: [
        { questionName: '112', majorName: '' },
        { questionName: '222', majorName: '' },
        { questionName: '333', majorName: '' }
      ]
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

// // 获取用户信息
// const { userRole } = getUserInfo();

// console.log(userRole);

// const courseStore = useCourseStore();
// const message = useMessage();
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
