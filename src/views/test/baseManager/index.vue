<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 14:33:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-31 17:35:28
 * @FilePath: \work\src\views\test\baseManager\index.vue
 * @Description:
-->
<template>
  <n-card :bordered="false">
    <FormPro @register="register" @submit="handleSubmit" @reset="reloadTable">
      <template #categoryNameSlot="{ model, field }">
        <n-cascader
          v-model:value="model[field]"
          clearable
          placeholder="请选择题库分类"
          :options="categoryNameOptions"
          :check-strategy="'child'"
          :show-path="true"
          remote
          :on-load="handleLoad"
        />
      </template>
    </FormPro>
    <TablePro
      ref="actionRef"
      :columns="columns"
      :request="loadDataTable"
      :row-key="row => row.id"
      :action-column="actionColumn"
      :scroll-x="1200"
    >
      <template #tableTitle>
        <n-button type="primary" @click="addTable">
          <template #icon>
            <n-icon>
              <PlusOutlined />
            </n-icon>
          </template>
          新建题库
        </n-button>
      </template>
    </TablePro>
    <addOrEditModalVue ref="addOrEditModalRef" @reload-table="reloadTable"></addOrEditModalVue>
    <delModal ref="delModalRef" :del-data="delData" :del-text="delText" @reload-table="reloadTable"></delModal>
  </n-card>
</template>

<script lang="ts" setup>
import { h, reactive, ref } from 'vue';
import { CascaderOption, useMessage } from 'naive-ui';
import { PlusOutlined } from '@vicons/antd';
import { useCourseStore } from '@/store';
import { useRouterPush } from '@/composables';
import { getQuestionBankList } from '@/service';
import { TablePro, TableAction } from '@/components/TablePro';
import { FormPro, useForm } from '@/components/FormPro';
import { columns } from './columns';
import { schemas } from './schemas';
import { getCategoryName, getChildren } from './getOptions';
import delModal from './components/delModal.vue';
import addOrEditModalVue from './components/addOrEditModal.vue';

const message = useMessage();
const formData = ref({});
const actionColumn = reactive({
  // Table操作列
  width: 230,
  title: '操作',
  key: 'action',
  fixed: 'right',
  render(record: Recordable<any>) {
    console.log(record);
    if (record.status === 0) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '题目管理',

            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            onClick: handleManager.bind(null, record)
          },
          {
            label: '编辑',

            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            onClick: handleEdit.bind(null, record)
          },
          {
            label: '删除',
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            onClick: handleDelete.bind(null, record)
          }
        ]
      });
    }
    return h(TableAction as any, {
      style: 'button',
      actions: [
        {
          label: '题目管理',

          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onClick: handleManager.bind(null, record)
        },
        {
          label: '编辑',

          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onClick: handleEdit.bind(null, record)
        }
      ]
    });
  }
});

// , {}
const [register] = useForm({
  // 查询FORM
  gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
  labelWidth: 80,
  showAdvancedButton: false,
  schemas
});
/**
 * @author: ZHENG
 * @description: 表格
 */
// table查询
const loadDataTable = async (res: any) => {
  const Param = {
    pageSize: res.size,
    current: res.current
  };
  const result = await getQuestionBankList({ ...formData.value, ...Param });
  return result.data;
};
/**
 * @author: ZHENG
 * @description: 刷新， 重置
 */
const reloadTable = () => {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  actionRef.value.reload();
};
// 查询
const handleSubmit = (values: Recordable) => {
  formData.value = values;
  reloadTable();
};

const categoryNameOptions = ref();
const getOption = async () => {
  categoryNameOptions.value = await getCategoryName();
};
getOption();
const handleLoad = (option: CascaderOption) => {
  return new Promise<void>(resolve => {
    window.setTimeout(() => {
      categoryNameOptions.value.children = getChildren(option);
      resolve();
    }, 1000);
  });
};

// 删除逻辑
const delModalRef = ref();
const delData = ref<number>(0); // 删除数据的ID
const delText = ref(''); // 删除的文字
// eslint-disable-next-line consistent-return
const handleDelete = (record: Recordable) => {
  if (record.questionCount !== '0') {
    return message.warning('已有绑定题目,不允许删除');
  }
  delText.value = record.bankName;
  delData.value = record.id;
  delModalRef.value.showDelModal = true;
};

// 新建和编辑弹窗
const addOrEditModalRef = ref();

// 新建
const addTable = () => {
  addOrEditModalRef.value.showAddModalFn();
};
/**
 * @author: ZHENG
 * @description: 编辑
 * @param {*} record
 * @return {*}
 */
const handleEdit = (record: Recordable) => {
  addOrEditModalRef.value.showEditModalFn(record);
};

// 跳转题目管理功能
const actionRef = ref(); // 表格
const { routerPush } = useRouterPush();
/**
 * @author: ZHENG
 * @description: 跳转课程预览
 * @param {*} record
 * @return {*}
 */
const handleManager = (record: Recordable) => {
  // courseStore.setCourseInfo(record.id);
  routerPush({ name: 'test_questManager', query: { id: record.id } });
};
</script>
<style scoped></style>
