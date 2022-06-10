<template>
  <n-card class="relative" h-full :bordered="false">
    <!-- 上方搜索栏 -->
    <FormPro @register="register" @submit="handleSubmit" @reset="reloadTable">
      <template #sexSlot="{ model, field }">
        <n-select
          v-model:value="model[field]"
          placeholder="请选择性别"
          clearable
          :options="sexOptions"
        />
      </template>
      <template #majorIdSlot="{ model, field }">
        <n-cascader
          v-model:value="model[field]"
          clearable
          placeholder="请选择所属专业"
          :options="cascaderOptions"
          :check-strategy="'all'"
          :show-path="true"
          remote
          :on-load="handleLoad"
        />
      </template>
      <template #classIdSlot="{ model, field }">
        <n-select
          v-model:value="model[field]"
          clearable
          placeholder="请选择班级"
          :options="stuClassIdOptions"
        />
      </template>
    </FormPro>
    <!-- 表格数据栏 -->
    <TablePro
      ref="actionRef"
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      :action-column="actionColumn"
      :scroll-x="1200"
    >
      <!-- v-if="userRole === 'teacher'" -->
      <template #tableTitle>
        <n-button type="primary" @click="addStudent">
          <template #icon>
            <n-icon>
              <PlusOutlined />
            </n-icon>
          </template>
          教师新增
        </n-button>
        <n-button type="primary" @click="importStudent">
          <template #icon>
            <n-icon>
              <PlusOutlined />
            </n-icon>
          </template>
          批量导入
        </n-button>
        <n-button type="primary" @click="exportStudent">
          <template #icon>
            <n-icon>
              <PlusOutlined />
            </n-icon>
          </template>
          批量导出
        </n-button>
        <n-button type="primary" @click="seeExport">
          <template #icon>
            <n-icon>
              <PlusOutlined />
              <EyeOutlined />
            </n-icon>
          </template>
          查看导出
        </n-button>
      </template>
    </TablePro>
  </n-card>
  <addOrEditModalVue
    ref="addOrEditModalRef"
    @reload-table="reloadTable"
  ></addOrEditModalVue>
  <!--
    <delModal
      ref="delModalRef"
      :del-data="delData"
      :del-text="delText"
      @reload-table="reloadTable"
    ></delModal> -->
</template>

<script setup lang="ts">
import { h, reactive, ref } from "vue";
// import { useRouter } from 'vue-router';
import { PlusOutlined } from "@vicons/antd";
import { useRouterPush } from "@/composables";
import { getTeacherTable, resetPassword } from "@/service";
import { getUserInfo } from "@/utils";
import { TablePro, TableAction } from "@/components/TablePro";
import { FormPro, useForm } from "@/components/FormPro";
import { columns } from "./columns";
import { schemas } from "./schemas";
import addOrEditModalVue from "./components/addOrEditModal.vue";
// 删除学生
import delModal from "./components/delModal.vue";
// 导入获取头部下拉框接口
import {
  getCollegeLegistOptions,
  getSexOptions,
  getChildren,
  getClassListOptions,
} from "./getOptions";
import { CascaderOption } from "naive-ui";

// 性别  学院 专业  班级   下拉查询逻辑
const sexOptions = ref();
const cascaderOptions = ref([]);
const stuClassIdOptions = ref([]);

const getOption = async () => {
  sexOptions.value = await getSexOptions();
  cascaderOptions.value = await getCollegeLegistOptions();
  stuClassIdOptions.value = await getClassListOptions();
};
getOption();
const handleLoad = (option: CascaderOption) => {
  return new Promise<void>((resolve) => {
    cascaderOptions.value.children = getChildren(option);
    resolve();
  });
};
// formpro的内容
const [register] = useForm({
  // 查询FORM
  gridProps: { cols: "1 s:1 m:2 l:3 xl:4 " },
  labelWidth: 60,
  // showAdvancedButton: false,
  schemas,
});
//表格逻辑
const actionRef = ref(); // 表格
const formData = ref({});
// table查询
const loadDataTable = async (res: any) => {
  const Param = {
    pageSize: res.size,
    current: res.current,
  };
  const { data: result } = await getTeacherTable({ ...formData.value, ...Param });
  return result;
};
// 刷新表格数据
const reloadTable = () => {
  formData.value = {};
  actionRef.value.reload();
};
// 查询
const handleSubmit = (values: Recordable) => {
  let searchForm = { ...values };
  const i = searchForm?.collegeId?.indexOf("-");
  if (i === 1) {
    // 选了专业);
    // console.log("学院", values?.collegeId.substring(0, i));
    // console.log("专业", values?.collegeId.substring(i + 1));
    searchForm.collegeId = searchForm?.collegeId.substring(0, i);
    searchForm.majorId = searchForm?.collegeId.substring(i + 1);
  }
  formData.value = searchForm;
  reloadTable();
};
// 操作  // Table操作列
const actionColumn = reactive({
  width: 250,
  title: "操作",
  key: "action",
  fixed: "right",
  render(record: Recordable<any>) {
    return h(TableAction as any, {
      style: "button",
      actions: [
        {
          label: "档案",
          onClick: recordSee.bind(null, record),
        },
        {
          label: "编辑",
          onClick: handleEdit.bind(null, record),
        },
        {
          label: "删除",
          icon: "ic:outline-delete-outline",
          onClick: handleDelete.bind(null, record),
        },
        {
          label: "密码重置",
          onClick: handleConfig.bind(null, record),
        },
      ],
    });
  },
});

// 获取用户信息
const { userRole } = getUserInfo();

// 新建和编辑弹窗
const addOrEditModalRef = ref();
// 新建
const addStudent = () => {
  addOrEditModalRef.value.showModalFn();
};
// 编辑
const handleEdit = (record: Recordable) => {
  addOrEditModalRef.value.editModalFn(record);
};
// 导入
const importStudent = () => {
  routerPush({ name: "user_toLead" });
  // console.log("daoru");
};
// 导出
const exportStudent = () => {
  console.log("daochu");
};
// 导出查看
const seeExport = () => {
  console.log("see");
};
// 删除学生
const delModalRef = ref();
const delData = ref<number>(0); // 删除数据的ID
const delText = ref(""); // 删除的文字
// eslint-disable-next-line consistent-return
const handleDelete = (record: Recordable) => {
  delText.value = record.userName;
  delData.value = record.id;
  delModalRef.value.showDelModal = true;
};
const { routerPush } = useRouterPush();
// 批量导入
// const toLead = () => {
//   routerPush({ name: "user_toLead" });
// };

// 档案跳转
const recordSee = () => {
  routerPush({ name: "user_recordSee" });
  // courseStore.setCourseInfo(record.id);
  // routerPush({ name: 'course_courseInfo' });
};
// 重置密码
const handleConfig = (record: Recordable) => {
  console.log(record);

  console.log(formData);

  const retpass = resetPassword(record.id);
  retpass;
};
</script>

<style scoped>
::v-deep(.table-toolbar-left[data-v-173596a2]) {
  justify-content: space-around !important;
  flex: 0.5;
}
</style>
