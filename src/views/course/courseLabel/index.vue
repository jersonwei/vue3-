<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 14:33:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-04 07:58:12
 * @FilePath: \work\src\views\course\courseLabel\index.vue
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
      :scroll-x="1090"
    >
      <template #tableTitle>
        <n-button type="primary" @click="addTable">
          <template #icon>
            <n-icon>
              <PlusOutlined />
            </n-icon>
          </template>
          新建
        </n-button>
      </template>
    </TablePro>
    <n-modal
      ref="modalRef"
      v-model:show="showModal"
      :mask-closable="false"
      preset="dialog"
      :title="`${!editID ? '新增' : '修改'}`"
      positive-text="确认"
      negative-text="取消"
    >
      <FormPro @register="fromRegister"> </FormPro>
      <template #action>
        <n-space>
          <n-button @click="() => (showModal = false)">取消</n-button>
          <n-button type="info" :loading="formBtnLoading" @click="onPositiveClick">确定</n-button>
        </n-space>
      </template>
    </n-modal>
    <delModal ref="delModalRef" :del-data="delData" :del-text="delText" @reload-table="reloadTable"></delModal>
  </n-card>
</template>

<script lang="ts" setup>
import { h, reactive, ref } from 'vue';
import { useMessage } from 'naive-ui';
import { PlusOutlined } from '@vicons/antd';
import { saveOrUpdateLabel, searchLabelList } from '@/service';
import { TablePro, TableAction } from '@/components/TablePro';
import { FormPro, FormSchema, useForm } from '@/components/FormPro';
import delModal from './components/delModal.vue';
import { columns } from './columns';

const message = useMessage();
const actionRef = ref(); // 表格
const formBtnLoading = ref(false);
const editID = ref('');

const actionColumn = reactive({
  width: 50,
  title: '操作',
  key: 'action',
  fixed: 'right',
  render(record: Recordable<any>) {
    return h(TableAction as any, {
      style: 'button',
      actions: [
        {
          label: '删除',
          icon: 'ic:outline-delete-outline',
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onClick: handleDelete.bind(null, record),
          // 根据业务控制是否显示 isShow 和 auth 是并且关系
          ifShow: () => {
            return true;
          },
          // 根据权限控制是否显示: 有权限，会显示，支持多个
          auth: ['basic_list']
        },
        {
          label: '编辑',
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onClick: handleEdit.bind(null, record),
          ifShow: () => {
            return true;
          },
          auth: ['basic_list']
        }
      ]
    });
  }
});

/**
 * @author: ZHENG
 * @description: 刷新
 */
const reloadTable = () => {
  actionRef.value.reload();
};
const showModal = ref(false);
const schemas: FormSchema[] = [
  {
    field: 'labelName',
    component: 'NInput',
    label: '标签名称',
    labelMessage: '请输入标签名称',
    giProps: {
      span: 1
    },
    componentProps: {
      placeholder: '请输入标签名称'
    },
    rules: [{ required: true, message: '请输入标签名称', trigger: ['blur'] }]
  },
  {
    field: 'note',
    component: 'NInput',
    label: '备注',
    componentProps: {
      type: 'textarea',
      placeholder: '请输入标签备注',
      showButton: false
    }
  }
];
const [fromRegister, { submit, getFieldsValue, setFieldsValue }] = useForm({
  gridProps: { cols: 1 },
  collapsedRows: 3,
  labelWidth: 120,
  layout: 'horizontal',
  showActionButtonGroup: false,
  schemas
});

const searchschemas: FormSchema[] = [
  {
    field: 'labelName',
    component: 'NInput',
    label: '标签名称',
    componentProps: {
      placeholder: '请输入标签名称'
    }
  }
];

const [register, { getFieldsValue: getSearchFieldsValue }] = useForm({
  gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
  labelWidth: 80,
  schemas: searchschemas
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loadDataTable = async (res: any) => {
  console.log(getSearchFieldsValue());
  const params = {
    ...getSearchFieldsValue(),
    pageSize: res.size,
    current: res.current
  };
  const result = await searchLabelList({ ...params });
  return result.data;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleSubmit(values: Recordable) {
  reloadTable();
  // message.success(JSON.stringify(values));
}

const addTable = async () => {
  showModal.value = true;
  editID.value = ''; // 新增
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleEdit = (record: Recordable) => {
  showModal.value = true;
  console.log(record);
  editID.value = record.id;
  // addOrEdit.value = record.; // 修改
  setTimeout(async () => {
    await setFieldsValue(record);
  }, 100);
};

const delModalRef = ref();
const delData = ref<number>(0); // 删除数据的ID
const delText = ref(''); // 删除的文字
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleDelete = (record: Recordable) => {
  // console.log('点击了删除', record);
  delText.value = record.labelName;
  delData.value = record.id;
  delModalRef.value.showDelModal = true;
};

// eslint-disable-next-line consistent-return
// 确认
// eslint-disable-next-line consistent-return
const onPositiveClick = async () => {
  formBtnLoading.value = true;
  const formRes = await submit();
  if (formRes) {
    showModal.value = false;
    const fromValue = getFieldsValue();
    const params = ref({});
    if (editID.value) {
      // 修改
      params.value = {
        id: editID.value,
        labelName: fromValue.labelName,
        note: fromValue.note || ''
      };
    } else {
      params.value = {
        // 新增
        labelName: fromValue.labelName,
        note: fromValue.note || ''
      };
    }
    const result = await saveOrUpdateLabel(params.value);
    if (result.error) {
      // eslint-disable-next-line no-return-assign
      return (formBtnLoading.value = false);
    }
    message.success('提交成功');
  } else {
    message.error('验证失败，请填写完整信息');
  }
  reloadTable();
  formBtnLoading.value = false;
};
</script>
<style scoped></style>
