<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 14:33:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-27 13:44:39
 * @FilePath: \work\src\views\question\dataBaseProblemsList\index.vue
 * @Description:
-->
<template>
  <n-card>
    <n-grid class="mt-4" cols="12" responsive="screen" :x-gap="12">
      <n-gi span="2">
        <n-card :bordered="false" size="small">
          <template #header>
            <n-space>
              <n-button type="info" ghost icon-placement="right">
                <template #icon>
                  <div class="flex items-center">
                    <n-icon size="14">
                      <PlusOutlined />
                    </n-icon>
                  </div>
                </template>
                添加题库
              </n-button>
            </n-space>
          </template>
          <div class="w-full menu">
            <n-input v-model:value="pattern" placeholder="输入菜单名称搜索">
              <template #suffix>
                <n-icon size="18" class="cursor-pointer">
                  <SearchOutlined />
                </n-icon>
              </template>
            </n-input>
            <div class="py-3 menu-list">
              <template v-if="loading">
                <div class="flex items-center justify-center py-4">
                  <n-spin size="medium" />
                </div>
              </template>
              <template v-else>
                <n-tree
                  :show-irrelevant-nodes="false"
                  block-line
                  :virtual-scroll="true"
                  key-field="id"
                  label-field="label"
                  :pattern="pattern"
                  :data="treeData"
                  style="height: 600px; overflow: hidden"
                />
              </template>
            </div>
          </div>
        </n-card>
      </n-gi>
      <n-gi span="10">
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
                <n-button type="primary" @click="addTable">
                  <template #icon>
                    <n-icon>
                      <PlusOutlined />
                    </n-icon>
                  </template>
                  导入
                </n-button>
              </n-space>
            </template>
          </TablePro>
          <addModalVue ref="addModalRef" @reload-table="reloadTable"></addModalVue>
          <editModalVue ref="editModalRef" @reload-table="reloadTable"></editModalVue>
          <delModal ref="delModalRef" :del-data="delData" :del-text="delText" @reload-table="reloadTable"></delModal>
          <updateCourse ref="updateModalRef" :update-data="updateData" @reload-table="reloadTable"></updateCourse>
        </n-card>
      </n-gi>
    </n-grid>
  </n-card>
</template>

<script lang="ts" setup>
import { h, onMounted, reactive, ref } from 'vue';
import { CascaderOption, useMessage } from 'naive-ui';
import { PlusOutlined } from '@vicons/antd';
import { repeat } from 'seemly';
import { useCourseStore } from '@/store';
import { useRouterPush } from '@/composables';
import {
  searchCouserInfo,
  getcourseCategoryList,
  getClassList,
  getCollegeLegistt,
  getQuestionBankCategoryList,
  getPaperList
} from '@/service';
import { TablePro, TableAction } from '@/components/TablePro';
import { FormPro, useForm } from '@/components/FormPro';
import { columns } from './columns';
import { schemas } from './schemas';
import delModal from './components/delModal.vue';
import addModalVue from './components/addModal.vue';
import editModalVue from './components/editModal.vue';
import updateCourse from './components/updateCourse.vue';

const courseStore = useCourseStore();
const message = useMessage();
const formData = ref({});

const treeData = ref([]);
const expandedKeys = ref([]);
const pattern = ref('');
const loading = ref(true);
onMounted(async () => {
  const params = {
    pageSize: 100,
    current: 1
  };
  const { data: treeMenuList } = await getQuestionBankCategoryList(params);
  treeData.value = treeMenuList.records;
  loading.value = false;
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
          onClick: handleEdit.bind(null, record)
        },
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
});

// 院系和所属类别的下拉查询逻辑
const options = ref([]);
const cascaderOptions = ref([]);
const getOptions = async () => {
  const { data: result } = await getcourseCategoryList();
  const newList = result.map((item: { id: any; categoryName: any }) => {
    return { value: item.id, label: item.categoryName };
  });
  options.value = newList;
  // 院系
  const { data: collegeList } = await getCollegeLegistt();
  const newcollegeList = collegeList.map((item: { id: any; collegeName: any }) => {
    return { value: item.id, label: item.collegeName, depth: 1, isLeaf: false };
  });
  cascaderOptions.value = newcollegeList;
};
getOptions();

async function getChildren(option: CascaderOption) {
  const { data: result } = await getClassList();
  const newList = result.map(item => {
    return { value: item.id, label: item.className, isLeaf: 1 };
  });
  for (let i = 0; i <= (option as { depth: number }).depth; ++i) {
    option.children = newList;
  }
  return children;
}

const handleLoad = (option: CascaderOption) => {
  return new Promise<void>(resolve => {
    window.setTimeout(() => {
      cascaderOptions.value.children = getChildren(option);
      resolve();
    }, 1000);
  });
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
  const Param = {
    pageSize: res.size,
    current: res.current
  };

  const result = await getPaperList({ ...formData.value, ...Param });
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

// 新建和编辑弹窗
const addModalRef = ref();
const editModalRef = ref();
// 新建
const addTable = () => {
  addModalRef.value.showModalFn();
};

const updateData = ref();
/**
 * @author: ZHENG
 * @description: 编辑
 * @param {*} record
 * @return {*}
 */
const handleEdit = (record: Recordable) => {
  editModalRef.value.editModalFn(record);
};

// 跳转详情页功能
const actionRef = ref(); // 表格

// 定时上架功能
const updateModalRef = ref();
const handUpdateStatus = (record: Recordable) => {
  updateData.value = record;
  console.log(updateData.value);
  updateModalRef.value.showUpdateModal = true;
};

const { routerPush } = useRouterPush();

/**
 * @author: ZHENG
 * @description: 跳转课程预览
 * @param {*} record
 * @return {*}
 */
const handleDetail = (record: Recordable) => {
  courseStore.setCourseInfo(record.id);
  routerPush({ name: 'course_courseDetail', query: { id: record.id } });
};

/**
 * @author: ZHENG
 * @description: 跳转课程信息
 * @param {*} record
 * @return {*}
 */
const handleConfig = (record: Recordable) => {
  courseStore.setCourseInfo(record.id);
  console.log(record.id);
  routerPush({ name: 'course_courseInfo', query: { id: record.id } });
};
</script>
<style scoped></style>
