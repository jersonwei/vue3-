<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 14:33:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-04 09:19:13
 * @FilePath: \work\src\views\test\questManager\index.vue
 * @Description:
-->
<template>
  <n-card>
    <n-grid class="mt-4" cols="12" responsive="screen" :x-gap="12">
      <n-gi span="2">
        <n-card :bordered="false" class="b-1" size="small">
          <div class="w-full menu">
            <n-space vertical>
              <n-cascader
                v-model:value="propsFrom.bankType"
                clearable
                placeholder="请选择题库分类"
                :options="bankTypeOptions"
                :check-strategy="'child'"
                :show-path="true"
                remote
                :on-load="handleLoad"
              />
              <n-input v-model:value="propsFrom.bankName" placeholder="输入题库名称搜索">
                <template #suffix>
                  <n-icon size="18" class="cursor-pointer">
                    <SearchOutlined />
                  </n-icon>
                </template>
              </n-input>
              <n-button-group style="width: 100%"
                ><n-button style="width: 50%" @click="refresh">重置</n-button>
                <n-button style="width: 50%" @click="searchBank">搜索</n-button>
              </n-button-group>
            </n-space>

            <div class="py-3 menu-list">
              <template v-if="loading">
                <div class="flex items-center justify-center py-4">
                  <n-spin size="medium" style="height: 600px; overflow: hidden" />
                </div>
              </template>
              <template v-else>
                <n-tree
                  :show-irrelevant-nodes="false"
                  :default-selected-keys="defaultSelectKeys"
                  block-line
                  :virtual-scroll="true"
                  key-field="id"
                  label-field="label"
                  :data="treeData"
                  :node-props="nodeProps"
                  style="height: 600px; overflow: hidden; font-size: 18px; line-height: 35px"
                />
              </template>
            </div>
          </div>
          <template #action>
            <n-button style="width: 100%" ghost icon-placement="right" @click="addDataBaseModal">
              <template #icon>
                <div class="flex items-center">
                  <n-icon size="14">
                    <PlusOutlined />
                  </n-icon>
                </div>
              </template>
              添加题库
            </n-button>
          </template>
        </n-card>
      </n-gi>
      <n-gi span="10">
        <n-card :bordered="false">
          <FormPro @register="register" @submit="handleSubmit" @reset="reloadTable">
            <template #courseCategorySlot="{ model, field }">
              <n-select v-model:value="model[field]" placeholder="请选择类别" :options="questionTypeoptions" />
            </template>
            <template #difficultySlot="{ model, field }">
              <n-select v-model:value="model[field]" placeholder="请选择难易度" :options="difficultyoptions" />
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
            key-field="id"
            label-field="label"
            :scroll-x="2200"
          >
            <template #tableTitle>
              <n-space>
                <n-button type="primary" @click="addTable">
                  <template #icon>
                    <n-icon>
                      <PlusOutlined />
                    </n-icon>
                  </template>
                  新建题目
                </n-button>
              </n-space>
            </template>
          </TablePro>
          <delModal ref="delModalRef" :del-data="delData" :del-text="delText" @reload-table="reloadTable"></delModal>
        </n-card>
      </n-gi>
    </n-grid>
    <addDataBase ref="addDataBaseModalRef" @reload-table="searchBank"></addDataBase>
    <questInfo ref="questInfoRef"></questInfo>
  </n-card>
</template>

<script lang="ts" setup>
import { h, onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { CascaderOption, TreeOption, useMessage } from 'naive-ui';
import { PlusOutlined } from '@vicons/antd';
import { useCourseStore, useExamStore } from '@/store';
import { useRouterPush } from '@/composables';
import { getQuestionBank, getPaperList } from '@/service';
import { resetForm } from '@/utils';
import { TablePro, TableAction } from '@/components/TablePro';
import { FormPro, useForm } from '@/components/FormPro';
import addDataBase from '../baseManager/components/addOrEditModal.vue';
import { columns } from './columns';
import { schemas } from './schemas';
import delModal from './components/delModal.vue';
import { getCategoryName, getChildren, getDictionary } from './getOptions';
import { questionBankType } from './Type';
import questInfo from './components/questInfo.vue';

const examStore = useExamStore();
// defaultSelectKeys.value[0] = route.query.id;
const message = useMessage();
const formData = ref({});
/**
 * @author: ZHENG
 * @description: 树形的逻辑
 */
const treeData = ref([]);
const loading = ref(true);
const propsFrom = reactive({
  bankType: '',
  bankName: ''
});
const bankTypeOptions = ref();
const questionTypeoptions = ref();
const difficultyoptions = ref();
const defaultSelectKeys = ref([0]);
const actionRef = ref(); // 表格
const getOption = async () => {
  bankTypeOptions.value = await getCategoryName();
  questionTypeoptions.value = await getDictionary(2);
  difficultyoptions.value = await getDictionary(23);
};
getOption();
const handleLoad = (option: CascaderOption) => {
  return new Promise<void>(resolve => {
    window.setTimeout(() => {
      bankTypeOptions.value.children = getChildren(option);
      resolve();
    }, 1000);
  });
};
const route = useRoute();
if (route.query.id) {
  defaultSelectKeys.value[0] = route.query.id;
}

/**
 * @author: ZHENG
 * @description:重置刷新
 * @return {*}
 */
const getQuestionBankData = async (from: { bankType: string; bankName: string }) => {
  const { data: result } = await getQuestionBank(from);
  const questionBank: questionBankType = result;
  if (questionBank?.count) {
    if (!from.bankName && !from.bankType) {
      questionBank.listQuestionBank.unshift({ id: 0, bankName: '全部题库', questionCount: questionBank.count });
    }
    treeData.value = questionBank.listQuestionBank.map((item: { id: any; bankName: any; questionCount: any }) => {
      return { id: item.id, label: `${item.bankName} (${item.questionCount}道)` };
    });
  } else {
    treeData.value = [];
  }
  loading.value = false;
};
const refresh = () => {
  resetForm(propsFrom, []);
  loading.value = true;
  getQuestionBankData(propsFrom);
};
const searchBank = () => {
  loading.value = true;
  getQuestionBankData(propsFrom);
};
onMounted(async () => {
  await getQuestionBankData(propsFrom);
});

const actionColumn = reactive({
  // Table操作列
  width: 160,
  title: '操作',
  key: 'action',
  fixed: 'right',
  render(record: Recordable<any>) {
    return h(TableAction as any, {
      style: 'button',
      actions: [
        {
          label: '详情',

          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onClick: handleInfo.bind(null, record)
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
});

const nodeProps = ({ option }: { option: TreeOption }) => {
  return {
    onClick() {
      // console.log(option);
      // message.info(option.id);
      defaultSelectKeys.value[0] = option.id;
      reloadTable();
    }
  };
};

// 新建题库
const addDataBaseModalRef = ref();
const addDataBaseModal = () => {
  addDataBaseModalRef.value.showAddModalFn();
};
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
  let param = {};
  console.log(defaultSelectKeys.value[0]);
  if (defaultSelectKeys.value[0] != 0) {
    param = {
      bankRelated: defaultSelectKeys.value[0],
      pageSize: res.size,
      current: res.current
    };
  } else {
    param = {
      pageSize: res.size,
      current: res.current
    };
  }

  const result = await getPaperList({ ...formData.value, ...param });
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

// 详情
const questInfoRef = ref();
const handleInfo = (record: Recordable) => {
  questInfoRef.value.showModalFn(record);
};

// 新建和编辑弹窗

const { routerPush } = useRouterPush();
// 新建
const addTable = () => {
  examStore.setQuestionList('');
  routerPush({ name: 'test_addQuest' });
};

/**
 * @author: ZHENG
 * @description: 编辑
 * @param {*} record
 * @return {*}
 */
const handleEdit = (record: Recordable) => {
  if (record.quoteCount > 0) {
    return message.warning('题目已被引用，不可编辑');
  }
  examStore.setQuestionList(record);
  routerPush({ name: 'test_addQuest' });
  // editModalRef.value.editModalFn(record);
};
// 删除逻辑
const delModalRef = ref();
const delData = ref<number>(0); // 删除数据的ID
const delText = ref(''); // 删除的文字
// eslint-disable-next-line consistent-return
const handleDelete = (record: Recordable) => {
  if (record.quoteCount > 0) {
    return message.warning('题目已被引用，不可删除');
  }
  delText.value = record.questionName;
  delData.value = record.id;
  delModalRef.value.showDelModal = true;
};
</script>
<style scoped>
:deep(.n-tree.n-tree--block-line .n-tree-node:not(.n-tree-node--disabled).n-tree-node--selected) {
  background-color: white !important;
}
:deep(.n-tree-node--selected .n-tree-node-content) {
  color: #048bff !important;
}
</style>
