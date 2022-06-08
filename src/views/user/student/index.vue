<template>
  <n-card class="relative" h-full :bordered="false">
    <!-- 上方搜索栏 -->
    <FormPro @register="register" @submit="handleSubmit" @reset="reloadTable">
      <template #genderSlot="{ model, field }">
        <n-select
          v-model:value="model[field]"
          style="100px"
          placeholder="请选择性别"
          clearable
          :options="stuGenderOptions"
        />
      </template>
      <template #departmentIdSlot="{ model, field }">
        <n-select
          v-model:value="model[field]"
          clearable
          placeholder="请选择学院"
          remote
          :options="stuDepartmentIdOptions"
        />
      </template>
      <template #majorIdSlot="{ model, field }">
        <n-select
          v-model:value="model[field]"
          placeholder="请选择专业"
          remote
          clearable
          :options="stuMajorIdOptions"
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
      id="exporttable"
      ref="actionRef"
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      :action-column="actionColumn"
      :scroll-x="2200"
    >
      <template v-if="userRole === 'teacher'" #tableTitle>
        <n-button type="primary" @click="addStudent">
          <template #icon>
            <n-icon>
              <PlusOutlined />
            </n-icon>
          </template>
          学生新增
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
          导出查看
        </n-button>
      </template>
    </TablePro>
    <addOrEditModalVue
      ref="addOrEditModalRef"
      @reload-table="reloadTable"
    ></addOrEditModalVue>
    <delModal
      ref="delModalRef"
      :del-data="delData"
      :del-text="delText"
      @reload-table="reloadTable"
    ></delModal>
  </n-card>
</template>

<script setup lang="ts">
import { h, reactive, ref } from "vue";
// import { useRouter } from 'vue-router';
import { PlusOutlined } from "@vicons/antd";
import { useRouterPush } from "@/composables";
import { getStudentTableInfo } from "@/service";
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
  getClassListOptions,
  getMajorListOptions,
} from "./getOptions";
// 获取用户信息
const { userRole } = getUserInfo();
const formData = ref({});
const actionRef = ref(); // 表格
// 操作
const actionColumn = reactive({
  // Table操作列
  width: 130,
  title: "操作",
  key: "action",
  fixed: "right",
  render(record: Recordable<any>) {
    if (record.status === 1) {
      return h(TableAction as any, {
        style: "button",
        actions: [
          {
            label: "档案",
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            onClick: recordSee.bind(null, record),
          },
          {
            label: "编辑",
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            onClick: handleEdit.bind(null, record),
          },
          {
            label: "删除",
            icon: "ic:outline-delete-outline",
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            // onClick: handleDelete.bind(null, record)
          },
          {
            label: "密码重置",
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            // onClick: handleConfig.bind(null, record)
          },
        ],
      });
    }
    return h(TableAction as any, {
      style: "button",
      actions: [
        {
          label: "档案",
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onClick: recordSee.bind(null, record),
        },
        {
          label: "编辑",
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          // onClick: handleEdit.bind(null, record)
        },
        {
          label: "删除",
          icon: "ic:outline-delete-outline",
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onClick: handleDelete.bind(null, record),
        },
        {
          label: "密码重置",
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          // onClick: handleConfig.bind(null, record)
        },
      ],
    });
  },
});
// 性别  学院  专业 班级   下拉查询逻辑
const stuGenderOptions = ref([
  { value: 1, label: "男" },
  { value: 0, label: "女" },
]);
const stuDepartmentIdOptions = ref([]);
const stuMajorIdOptions = ref([]);
const stuClassIdOptions = ref([]);

const getOption = async () => {
  stuDepartmentIdOptions.value = await getCollegeLegistOptions();
  stuClassIdOptions.value = await getClassListOptions();
  stuMajorIdOptions.value = await getMajorListOptions();
  // console.log(stuMajorIdOptions.value);
};
getOption();
// formpro的内容
const [register] = useForm({
  // 查询FORM
  gridProps: { cols: "1 s:1 m:2 l:3 xl:4 " },
  labelWidth: 60,
  // showAdvancedButton: false,
  schemas,
});
// 新建和编辑弹窗
const addOrEditModalRef = ref();
// 新建
const addStudent = () => {
  addOrEditModalRef.value.showModalFn();
  // addStudentModalRef.value.showModalFn();
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
// 刷新表格数据
const reloadTable = () => {
  actionRef.value.reload();
};
// 查询
const handleSubmit = (values: Recordable) => {
  formData.value = values;
  reloadTable();
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
// table查询
const loadDataTable = async (res: any) => {
  const Param = {
    pageSize: res.size,
    pageNo: res.current,
  };
  const { data: result } = await getStudentTableInfo({ ...formData.value, ...Param });
  console.log(result);
  return result;
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
</script>

<style scoped>
::v-deep(.table-toolbar-left[data-v-173596a2]) {
  justify-content: space-around !important;
  flex: 0.5;
}
</style>
