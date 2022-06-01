<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 14:33:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-01 17:51:57
 * @FilePath: \work\src\views\test\pointManager\index.vue
 * @Description:
-->
<template>
  <n-card :bordered="false">
    <FormPro @register="register" @submit="handleSubmit" @reset="reloadTable"> </FormPro>
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
          新建分类
        </n-button>
      </template>
    </TablePro>
    <addOrEditOrEditModal ref="addOrEditModalRef" @reload-table="reloadTable"></addOrEditOrEditModal>
    <delModal ref="delModalRef" @reload-table="reloadTable"></delModal>
    <addOrEditPointModal ref="addOrEditPointModalRef" @reload-table="reloadTable"></addOrEditPointModal>
  </n-card>
</template>

<script lang="ts" setup>
import { h, reactive, ref } from 'vue';
import { useMessage } from 'naive-ui';
import { PlusOutlined } from '@vicons/antd';
import { getPointCategoryVoList } from '@/service';
import { TablePro, TableAction } from '@/components/TablePro';
import { FormPro, useForm } from '@/components/FormPro';
import { columns } from './columns';
import { schemas } from './schemas';
import delModal from './components/delModal.vue';
import addOrEditOrEditModal from './components/addOrEditModal.vue';
import addOrEditPointModal from './components/addOrEditPointModal.vue';

const actionColumn = reactive({
  // Table操作列
  width: 230,
  title: '操作',
  key: 'action',
  fixed: 'right',
  render(record: Recordable<any>) {
    console.log(record);
    if (record.levelType === 2) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '编辑',

            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            onClick: handleEditKnowledge.bind(null, record)
          },
          {
            label: '删除',
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            onClick: handleDelete.bind(null, record, '2')
          }
        ]
      });
    }
    return h(TableAction as any, {
      style: 'button',
      actions: [
        {
          label: '编辑',

          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onClick: handleEdit.bind(null, record)
        },
        {
          label: '新增知识点',

          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onClick: handleAddKnowledge.bind(null, record)
        },
        {
          label: '删除',
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onClick: handleDelete.bind(null, record, '1')
        }
      ]
    });
  }
});
// , {}
const [register] = useForm({
  gridProps: { cols: '3' },
  labelWidth: 180,
  showAdvancedButton: false,
  schemas
});

// 声明表格
const actionRef = ref(); // 表格
/**
 * @author: ZHENG
 * @description: 刷新， 重置
 */
const reloadTable = () => {
  actionRef.value.reload();
};
// 查询
const formData = ref({});
const handleSubmit = (values: Recordable) => {
  formData.value = values;
  reloadTable();
};
// table查询
const loadDataTable = async (res: any) => {
  const Param = {
    pageSize: res.size,
    current: res.current
  };
  const result = await getPointCategoryVoList({ ...formData.value, ...Param });
  return result.data;
};

// 新建和编辑弹窗
const addOrEditModalRef = ref();
// 新建分类弹窗
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

// 新增知识点
const addOrEditPointModalRef = ref();
// 新增知识点弹窗
const handleAddKnowledge = (record: Recordable) => {
  addOrEditPointModalRef.value.showAddModalFn(record);
};
const handleEditKnowledge = (record: Recordable) => {
  addOrEditPointModalRef.value.showEditModalFn(record);
};
// 删除逻辑
const delModalRef = ref();
// eslint-disable-next-line consistent-return
const handleDelete = (record: Recordable, type: string) => {
  console.log(record, type);
  delModalRef.value.showDelModalFn(record, type);
};
</script>
<style scoped></style>
