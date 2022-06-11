<template>
  <n-card class="relative" :bordered="false">
    <FormPro @register="register" @submit="handleSubmit" @reset="reloadTable">
      <template #courseCategorySlot="{ model, field }">
        <n-select
          v-model:value="model[field]"
          placeholder="试卷分类"
          clearable
          :options="examTypeOptions"
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
    </FormPro>
    <TablePro
      ref="actionRef"
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      :action-column="actionColumn"
      :scroll-x="1000"
    >
    </TablePro>
  </n-card>
</template>

<script lang="ts" setup>
import { h, reactive, ref } from "vue";
// import { CascaderOption, useMessage } from "naive-ui";
import { CascaderOption } from "naive-ui";
// import { PlusOutlined } from "@vicons/antd";
// import { differenceInDays, format } from "date-fns";
// import { useExamStore } from "@/store";
import { useRouterPush } from "@/composables";
import { getPaperManagerList } from "@/service";
// import { getUserInfo } from "@/utils";
import { TablePro, TableAction } from "@/components/TablePro";
import { FormPro, useForm } from "@/components/FormPro";
import { columns } from "./columns";
import { schemas } from "./schemas";
import {
  getPaperClassOptions,
  getCollegeLegistOptions,
  getStatusOptions,
  getChildren,
} from "./getOptions";
// import delModal from "./components/delModal.vue";
// import showExamModal from "./components/showExamModal.vue";
const actionRef = ref(); // 表格
const actionColumn = reactive({
  // Table操作列
  width: 100,
  title: "操作",
  key: "action",
  fixed: "right",
  render(record: Recordable<any>) {
    if (record.status === 1) {
      return h(TableAction as any, {
        style: "button",
        actions: [
          {
            label: "查看成绩",
            onClick: handleDetail.bind(null, record),
            // 根据业务控制是否显示 isShow 和 auth 是并且关系
            ifShow: () => {
              return true;
            },
            // 根据权限控制是否显示: 有权限，会显示，支持多个
            auth: ["admin"],
          },
        ],
      });
    }
    return h(TableAction as any, {
      style: "button",
      actions: [
        {
          label: "查看成绩",
          onClick: handleDetail.bind(null, record),
          // 根据业务控制是否显示 isShow 和 auth 是并且关系
          ifShow: () => {
            return true;
          },
          // 根据权限控制是否显示: 有权限，会显示，支持多个
          auth: ["teacher"],
        },
      ],
    });
  },
});
// 获取用户信息
// const examStore = useExamStore();
// const message = useMessage();
const formData = ref({});

// 院系和所属类别的下拉查询逻辑
const examTypeOptions = ref([]);
const cascaderOptions = ref([]);
const courseStatusOptions = ref([]);

const getOption = async () => {
  examTypeOptions.value = await getPaperClassOptions();
  cascaderOptions.value = await getCollegeLegistOptions();
  courseStatusOptions.value = await getStatusOptions();
};
getOption();
const handleLoad = (option: CascaderOption) => {
  return new Promise<void>((resolve) => {
    window.setTimeout(() => {
      cascaderOptions.value.children = getChildren(option);
      resolve();
    }, 1000);
  });
};

// , {}
const [register] = useForm({
  // 查询FORM
  gridProps: { cols: "1 s:1 m:2 l:3 xl:4 2xl:4" },
  labelWidth: 80,
  schemas,
});
// table查询
const loadDataTable = async (res: any) => {
  const Param = {
    pageSize: res.size,
    current: res.current,
  };
  const result = await getPaperManagerList({ ...formData.value, ...Param });
  console.log(result);
  return result.data;
};

const reloadTable = () => {
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  actionRef.value.reload();
};
// 查询
const handleSubmit = (values: Recordable) => {
  formData.value = values;
  reloadTable();
};
const { routerPush } = useRouterPush();
const handleDetail = (record: Recordable) => {
  routerPush({ name: "user_paper" });
};
</script>
<style scoped></style>
