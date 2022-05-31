<!--
 * @Author: ZHENG
 * @Date: 2022-05-30 11:48:24
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-31 10:45:36
 * @FilePath: \work\src\views\test\addQuest\components\showDataBase.vue
 * @Description:
-->
<template>
  <n-modal
    ref="showDataBaseModalRef"
    v-model:show="showModal"
    :mask-closable="false"
    style="width: 1050px"
    :show-icon="false"
    preset="dialog"
    :title="`选择题库`"
  >
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
    <TablePro ref="actionRef" :columns="columns" :request="loadDataTable" :row-key="row => row.id" :scroll-x="800" />
    <template #action>
      <n-space>
        <n-button @click="() => (showModal = false)">取消</n-button>
        <n-button type="info" :loading="formBtnLoading" @click="confirmForm">确定</n-button>
      </n-space>
    </template>
  </n-modal>
</template>
<script lang="ts" setup>
import { h, ref } from 'vue';
import { CascaderOption, NRadio } from 'naive-ui';
import { getQuestionBankList } from '@/service';
import { FormPro, useForm } from '@/components/FormPro';
import { schemas } from './showDataBase/schemas';
import { getCategoryName, getChildren } from './showDataBase/getOptions';

const [register] = useForm({
  gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
  labelWidth: 80,
  showAdvancedButton: false,
  schemas
});
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

const formData = ref({});
const actionRef = ref();
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
  actionRef.value.reload();
};
const showModal = ref(false);
const showModalFn = () => {
  showModal.value = true;
};
const handleSubmit = (values: Recordable) => {
  formData.value = values;
  reloadTable();
};

// 选中的行
const checkedValueRef = ref('');
const checkedValueNameRef = ref('');
const handleChange = (e: Event, row) => {
  checkedValueRef.value = (e.target as HTMLInputElement).value;
  checkedValueNameRef.value = row.bankName;
};
const columns = [
  {
    title: '选择',
    width: 20,
    render(row, index) {
      return h(NRadio, {
        checked: checkedValueRef.value === row.id,
        value: row.id,
        onChange: e => {
          handleChange(e, row);
        }
      });
    }
  },
  {
    title: '题库名称',
    key: 'bankName',
    width: 80
  },
  {
    title: '所属分类',
    key: 'categoryName',
    width: 80
  },
  {
    title: '题库状态',
    key: 'statusName',
    width: 50
  }
];
const formBtnLoading = ref(false);
const emits = defineEmits(['reloadTable']);
const confirmForm = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  formBtnLoading.value = true;
  emits('reloadTable', checkedValueRef.value, checkedValueNameRef.value);
  showModal.value = false;
  formBtnLoading.value = false;
};
defineExpose({ showModalFn });
</script>
