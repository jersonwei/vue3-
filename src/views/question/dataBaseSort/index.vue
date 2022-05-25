<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 14:33:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-25 09:58:45
 * @FilePath: \work\src\views\question\dataBaseSort\index.vue
 * @Description:
-->
<template>
  <n-card :bordered="false">
    <FormPro @register="register" @submit="handleSubmit" @reset="reloadTable">
      <template #courseCategorySlot="{ model, field }">
        <n-select v-model:value="model[field]" placeholder="请选择类别" :options="options" />
      </template>
      <template #majorIdSlot="{ model, field }">
        <n-cascader
          v-model:value="model[field]"
          placeholder="请选择专业"
          :options="cascaderOptions"
          :check-strategy="'all'"
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
          新建分类
        </n-button>
      </template>
    </TablePro>
    <addOrEditOrEditModal ref="addOrEditModalRef" @reload-table="reloadTable"></addOrEditOrEditModal>
    <delModal ref="delModalRef" :del-data="delData" :del-text="delText" @reload-table="reloadTable"></delModal>
  </n-card>
</template>

<script lang="ts" setup>
import { h, reactive, ref } from 'vue';
import { useMessage } from 'naive-ui';
import { PlusOutlined } from '@vicons/antd';
import { getQuestionBankCategoryList } from '@/service';
import { TablePro, TableAction } from '@/components/TablePro';
import { FormPro, useForm } from '@/components/FormPro';
import { columns } from './columns';
import { schemas } from './schemas';
import delModal from './components/delModal.vue';
import addOrEditOrEditModal from './components/addOrEditModal.vue';

const message = useMessage();
const actionColumn = reactive({
  // Table操作列
  width: 230,
  title: '操作',
  key: 'action',
  fixed: 'right',
  render(record: Recordable<any>) {
    if (record.categoryParent > 0) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '编辑',

            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            onClick: handleEdit.bind(null, record)
          },
          {
            label: '删除',
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            onClick: handleConfig.bind(null, record)
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
          label: '新增',

          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onClick: handleAdd.bind(null, record)
        },
        {
          label: '删除',
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onClick: handleConfig.bind(null, record)
        }
      ]
    });
  }
});
// , {}
const [register] = useForm({
  gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
  labelWidth: 80,
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
  const result = await getQuestionBankCategoryList({ ...formData.value, ...Param });
  return result.data;
};

// 新建和编辑弹窗
const addOrEditModalRef = ref();
// 新建
const addTable = () => {
  addOrEditModalRef.value.showAddModalFn();
};
const handleAdd = (record: Recordable) => {
  addOrEditModalRef.value.showAddModalFn(record);
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
const handleConfig = () => {};
// 删除逻辑
const delModalRef = ref();
const delData = ref<number>(0); // 删除数据的ID
const delText = ref(''); // 删除的文字
// eslint-disable-next-line consistent-return
const handleDelete = (record: Recordable) => {
  if (record.statusName === '上架') {
    return message.error('只有下架状态课程才能删除');
  }
  delText.value = record.courseName;
  delData.value = record.id;
  delModalRef.value.showDelModal = true;
};
</script>
<style scoped></style>
