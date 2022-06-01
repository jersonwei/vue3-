<!--
 * @Author: ZHENG
 * @Date: 2022-06-01 09:22:27
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-01 10:48:04
 * @FilePath: \work\src\views\test\addExam\components\showQuestModal.vue
 * @Description:
-->
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
    :title="`选择题目`"
  >
    <FormPro @register="register" @submit="handleSubmit" @reset="reloadTable">
      <template #difficultySlot="{ model, field }">
        <n-select v-model:value="model[field]" placeholder="请选择难易度" :options="difficultyoptions" />
      </template>
    </FormPro>
    <TablePro
      ref="actionRef"
      :columns="questColumns"
      :request="loadDataTable"
      :row-key="row => row.id"
      :scroll-x="800"
      :default-checked-row-keys="defaultCheckedRowKeys"
      @update:checked-row-keys="handleCheck"
    />
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
// import { CascaderOption, NRadio } from 'naive-ui';
import { getPaperList } from '@/service';
import { FormPro, useForm } from '@/components/FormPro';
import { schemas } from './questModal/schemas';
// import { getCategoryName, getChildren } from './showDataBase/getOptions';

const [register] = useForm({
  gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
  labelWidth: 80,
  showAdvancedButton: false,
  schemas
});
// const categoryNameOptions = ref();
// const getOption = async () => {
//   categoryNameOptions.value = await getCategoryName();
// };
// getOption();
// const handleLoad = (option: CascaderOption) => {
//   return new Promise<void>(resolve => {
//     window.setTimeout(() => {
//       categoryNameOptions.value.children = getChildren(option);
//       resolve();
//     }, 1000);
//   });
// };

const formData = ref({
  questionType: ''
});
const actionRef = ref();
const loadDataTable = async (res: any) => {
  const Param = {
    pageSize: res.size,
    current: res.current
  };
  // ...formData.value,
  const result = await getPaperList({ ...formData.value, ...Param });
  return result.data;
};
// /**
//  * @author: ZHENG
//  * @description: 刷新， 重置
//  */
// const reloadTable = () => {
//   actionRef.value.reload();
// };
const cardIndex = ref();
const showModal = ref(false);
const defaultCheckedRowKeys = ref();
const showModalFn = (index, questType, checkRowKeys) => {
  showModal.value = true;
  cardIndex.value = index;
  formData.value.questionType = questType;
  checkRow.value = [];
  defaultCheckedRowKeys.value = checkRowKeys;
};
const checkRowKeys = ref([]); // 当前选中的keys
const checkRow = ref([]); // 当前选中的数据
const compare = (beforeArr, afterArr) => {
  const resObj = {
    add: [],
    del: []
  };
  const cenObj = {};
  // 把beforeArr数组去重放入cenObj
  for (let i = 0; i < beforeArr.length; i++) {
    cenObj[beforeArr[i]] = beforeArr[i];
  }
  // 遍历afterArr，查看其元素是否在cenObj中
  for (let j = 0; j < afterArr.length; j++) {
    if (!cenObj[afterArr[j]]) {
      resObj.add.push(afterArr[j]);
    } else {
      delete cenObj[afterArr[j]];
    }
  }
  for (const k in cenObj) {
    resObj.del.push(k);
  }
  return resObj;
};
const handleCheck = (keys: Array<string | number>) => {
  const difference = compare(checkRowKeys.value, keys); // 对比数组哪个是新增
  if (difference.add.length > 0) {
    // 新增
    const tableData = actionRef.value.tableElRef.data;
    for (let y = 0; y < difference.add.length; y++) {
      // 循环选中的数据
      for (let i = 0; i < tableData.length; i++) {
        // 循环表格
        if (tableData[i].id === difference.add[y]) {
          checkRow.value.push(tableData[i]);
          break;
        }
      }
    }
  }
  if (difference.del.length > 0) {
    // 删除
    for (let i = 0; i < difference.del.length; i++) {
      for (let y = 0; y < checkRow.value.length; y++) {
        console.log(checkRow.value[y], difference.del[i]);
        if (checkRow.value[y].id === parseInt(difference.del[i], 10)) {
          console.log(y);
          checkRow.value.splice(y, 1);
          break;
        }
      }
    }
  }
  checkRowKeys.value = keys;
};
const questColumns = [
  {
    type: 'selection',
    width: 10,
    disabled(row, index) {
      if (defaultCheckedRowKeys.value.includes(row.id)) {
        return true;
      }
    }
  },
  {
    title: 'id',
    key: 'id',
    width: 30
  },
  {
    title: '试题类型',
    key: 'questionTypeName',
    width: 40
  },
  {
    title: '试题题干',
    key: 'questionName',
    width: 50
  },
  {
    title: '难易程度',
    key: 'difficultLevelName',
    width: 50
  }
];
// // 选中的行
const formBtnLoading = ref(false);
const emits = defineEmits(['chooseQuest']);
const confirmForm = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  formBtnLoading.value = true;
  console.log(cardIndex.value, checkRowKeys.value, checkRow.value);
  emits('chooseQuest', cardIndex.value, checkRow.value, checkRowKeys.value);
  showModal.value = false;
  formBtnLoading.value = false;
};
defineExpose({ showModalFn });
</script>
