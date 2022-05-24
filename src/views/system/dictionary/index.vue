<!--
 * @Author: ZHENG
 * @Date: 2022-05-05 15:20:22
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-17 19:09:50
 * @FilePath: \work\src\views\system\dictionary\index.vue
 * @Description:
-->

<template>
  <div>
    <!-- 主页面 -->
    <n-grid cols="1 s:1 m:1 l:3 xl:3 2xl:3" responsive="screen" :x-gap="12">
      <n-gi span="1">
        <n-card :bordered="false" size="small">
          <template #header>
            <n-space>
              <n-button type="info" @click="addType(0)"> 新增 </n-button>
              <n-button type="info" :disabled="isEdit" @click="addType(1)"> 编辑 </n-button>
              <n-button type="error" :disabled="isEdit" @click="delDic(0)"> 删除 </n-button>
              <n-input v-model:value="pattern" placeholder="输入字典名称搜索">
                <template #suffix>
                  <n-icon size="18" class="cursor-pointer">
                    <SearchOutlined />
                  </n-icon>
                </template>
              </n-input>
            </n-space>
          </template>
          <div class="w-full menu">
            <div class="py-3 menu-list">
              <template v-if="loading">
                <div class="flex items-center justify-center py-4">
                  <n-spin size="medium" />
                </div>
              </template>
              <template v-else>
                <n-tree
                  block-line
                  cascade
                  :virtual-scroll="true"
                  :pattern="pattern"
                  :data="treeData"
                  key-field="id"
                  label-field="value"
                  style="max-height: 650px; overflow: hidden"
                  @update:selected-keys="selectedTree"
                />
              </template>
            </div>
          </div>
        </n-card>
      </n-gi>
      <n-gi span="2">
        <n-card :bordered="false" size="small">
          <template #header>
            <n-space>
              <n-button :disabled="isEdit" type="info" @click="editTableDict(null, 0)"> 新增 </n-button>
            </n-space>
          </template>
          <TablePro
            ref="actionRef"
            :columns="columns"
            :request="loadDataTable"
            :row-key="row => row.id"
            :action-column="actionColumn"
            :scroll-x="1090"
          >
          </TablePro>
        </n-card>
      </n-gi>
    </n-grid>
    <!-- 编辑字典类型的弹窗 -->
    <n-modal
      v-model:show="showModal"
      :show-icon="false"
      preset="dialog"
      :title="`${changType === 0 ? '新建' : '编辑'}字典配置`"
    >
      <n-form ref="formRef" :model="formParams" :rules="rules" label-placement="left" :label-width="80" class="py-4">
        <n-form-item label="字典名称" path="value">
          <n-input v-model:value="formParams.value" placeholder="请输入字典名称" />
        </n-form-item>
        <n-form-item label="字典备注" path="note">
          <n-input v-model:value="formParams.note" placeholder="请输入字典备注" />
        </n-form-item>
      </n-form>
      <template #action>
        <n-space>
          <n-button @click="() => (showModal = false)">取消</n-button>
          <n-button type="info" :loading="formBtnLoading" @click="confirmForm">确定</n-button>
        </n-space>
      </template>
    </n-modal>
    <!-- 删除数据的弹窗 -->
    <n-modal
      v-model:show="showDelModal"
      :mask-closable="false"
      preset="dialog"
      type="error"
      title="确认"
      :content="`确认删除${delType === 0 ? '字典配置' : '字典'}${delText}`"
      positive-text="确认"
      negative-text="算了"
      @positive-click="onPositiveClick"
    />
    <!-- 新建Table弹窗 -->
    <n-modal
      v-model:show="showTableModal"
      :show-icon="false"
      preset="dialog"
      :title="`${changTableType === 0 ? '新建' : '编辑'}字典`"
    >
      <n-form
        ref="formRef"
        :model="TableFormParams"
        :rules="tableRules"
        label-placement="left"
        :label-width="80"
        class="py-4"
      >
        <n-form-item label="字典配置名称" path="type">
          <n-input-number
            v-model:value="TableFormParams.type"
            disabled
            :style="{ width: '500%' }"
            :show-button="false"
          />
          <n-input
            v-model:value="TableFormParams.typeName"
            disabled
            :style="{ width: '500%' }"
            placeholder="请输入字典配置中文"
          />
        </n-form-item>
        <n-form-item label="字典名称" path="label">
          <n-input v-model:value="TableFormParams.label" placeholder="请输入字典名称" />
        </n-form-item>
        <n-form-item label="字典值" path="value">
          <n-input-number
            v-model:value="TableFormParams.value"
            placeholder="请输入字典值"
            :style="{ width: '100%' }"
            :show-button="false"
          />
        </n-form-item>
        <n-form-item label="字典备注" path="note">
          <n-input v-model:value="TableFormParams.note" placeholder="请输入字典备注" />
        </n-form-item>
      </n-form>
      <template #action>
        <n-space>
          <n-button @click="() => (showTableModal = false)">取消</n-button>
          <n-button type="info" :loading="TableFormBtnLoading" @click="confirmTableForm">确定</n-button>
        </n-space>
      </template>
    </n-modal>
  </div>
</template>
<script lang="ts" setup>
import { ref, unref, reactive, onMounted, h, computed } from 'vue';
import { useMessage } from 'naive-ui';
import { SearchOutlined } from '@vicons/antd';
import { addDict, addDictType, editDict, editDictType, getDictList, getDictType } from '@/service';
import { getTreeItem, isValidKey } from '@/utils';
import { TablePro, TableAction } from '@/components/TablePro';
import { columns } from './column';

// table
const actionRef = ref();
// message
const message = useMessage();
// tree
const treeData = ref([]);
const loading = ref(true);
const pattern = ref('');
// modal
const showModal = ref(false);
const showDelModal = ref(false);
const delText = ref('');
const delType = ref(0);
const changType = ref(0);
const formBtnLoading = ref(false);
const formRef = ref();
const selectKeys = ref(1);
// Table的弹窗操作

// 操作列
const actionColumn = reactive({
  width: 120,
  title: '操作',
  key: 'action',
  fixed: 'right',
  render(record: any) {
    return h(TableAction as any, {
      style: 'button',
      actions: [
        {
          label: '删除',
          icon: 'ic:outline-delete-outline',
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onClick: deleteTableDict.bind(null, record),
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
          onClick: editTableDict.bind(null, record, 1),
          ifShow: () => {
            return true;
          },
          auth: ['basic_list']
        }
      ],
      select: (key: any) => {
        message.info(`您点击了，${key} 按钮`);
      }
    });
  }
});
// 是否有点击值，用来判断是否显示数据
const isEdit = computed(() => {
  return !selectKeys.value;
});

// Table的逻辑
// 刷新Table的数据
const reloadTable = () => {
  actionRef.value.reload();
};
const loadDataTable = async res => {
  const Param = {
    type: selectKeys.value || 1,
    pageSize: res.size,
    current: res.current
  };
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const result = await getDictList(Param);
  return result.data;
};

// 以下是树形菜单的逻辑
// 获取树形菜单数据
const getDictTypeList = async () => {
  const { data: treeMenuList } = await getDictType();
  treeData.value = treeMenuList;
  loading.value = false;
};
// 表单限制
const rules = {
  value: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入字典配置名称'
  }
};
// 表单格式
interface formParamsType {
  value: string;
  note: string;
}
const formParams: formParamsType = reactive({
  value: '',
  note: ''
});
// 点击Tree更新Table数据
const selectedTree = (keys: number) => {
  // eslint-disable-next-line prefer-destructuring
  selectKeys.value = keys[0];
  reloadTable();
};
// 新增|编辑 显示树形弹窗
const addType = (type: number) => {
  changType.value = type;
  const treeItem = getTreeItem(unref(treeData), selectKeys.value);
  if (type === 1) {
    Object.assign(formParams, treeItem);
  } else {
    Object.keys(formParams).forEach((key: string) => {
      if (isValidKey(key, formParams)) {
        formParams[key] = '' as string;
      }
    });
  }
  showModal.value = true;
};
// 修改树形
const confirmForm = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  formBtnLoading.value = true;
  formRef.value.validate(async (errors: any) => {
    if (!errors) {
      if (changType.value === 0) {
        const res = await addDictType(formParams);
        if (!res.data) {
          formBtnLoading.value = false;
          return;
        }
      } else {
        const res = await editDictType(formParams);

        if (!res.data) {
          formBtnLoading.value = false;
          return;
        }
      }

      getDictTypeList();
      message.success(`${changType.value === 0 ? '新建' : '编辑'}成功'`);
      setTimeout(() => {
        showModal.value = false;
        reloadTable();
      });
    } else {
      message.error('请填写完整信息');
    }
    formBtnLoading.value = false;
  });
};
// 弹出删除树形弹窗
const delDic = (type: number) => {
  const treeItem = getTreeItem(unref(treeData), selectKeys.value);
  delText.value = treeItem.value;
  delType.value = type;
  showDelModal.value = true;
};
// 删除树形
const onPositiveClick = async () => {
  if (delType.value === 0) {
    const treeItem = getTreeItem(unref(treeData), selectKeys.value);
    const Param = {
      id: treeItem.id,
      deleted: 1
    };
    await editDictType(Param);
  } else {
    const Param = {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      id: delTableKeys.value,
      deleted: 1
    };
    await editDict(Param);
  }

  message.success(`${delType.value === 0 ? '字典配置' : '字典'}成功'`);
  setTimeout(() => {
    getDictTypeList();
    reloadTable();
  });
};

// Table
interface TableFormParamsType {
  type?: number;
  typeName: string;
  label: string;
  value?: number;
  note: string;
}
const TableFormParams: TableFormParamsType = reactive({
  type: undefined,
  typeName: '',
  label: '',
  value: undefined,
  note: ''
});
const tableRules = {
  label: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入字典名称'
  }
};
const showTableModal = ref(false);
const changTableType = ref(0);
const TableFormBtnLoading = ref(false);
const delTableKeys = ref();

const editTableDict = (record: Recordable, type: number) => {
  if (type === 0) {
    changTableType.value = 0;
    // 新增
    Object.keys(TableFormParams).forEach((key: string) => {
      if (isValidKey(key, TableFormParams)) {
        TableFormParams[key] = '' as string;
      }
    });
  } else {
    changTableType.value = 1;
    // 编辑
    Object.assign(TableFormParams, record);
  }
  const treeItem = getTreeItem(unref(treeData), selectKeys.value);
  TableFormParams.type = treeItem.id;
  TableFormParams.typeName = treeItem.value;
  showTableModal.value = true;
};

const confirmTableForm = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  TableFormBtnLoading.value = true;
  formRef.value.validate(async (errors: any) => {
    if (!errors) {
      if (changTableType.value === 0) {
        const Params = {
          type: TableFormParams.type,
          label: TableFormParams.label,
          value: TableFormParams.value,
          note: TableFormParams.note
        };
        await addDict(Params);
      } else {
        const Params = {
          id: TableFormParams.id,
          type: TableFormParams.type,
          label: TableFormParams.label,
          value: TableFormParams.value,
          note: TableFormParams.note
        };
        await editDict(Params);
      }
      message.success(`${changTableType.value === 0 ? '新建' : '编辑'}成功'`);
      setTimeout(() => {
        showTableModal.value = false;
        reloadTable();
      });
    } else {
      message.error('请填写完整信息');
    }
    TableFormBtnLoading.value = false;
  });
};

const deleteTableDict = (record: Recordable) => {
  delTableKeys.value = record.id;
  delText.value = record.value;
  delType.value = 1;
  showDelModal.value = true;
};

onMounted(async () => {
  await getDictTypeList();
});
</script>
