<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 14:33:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-30 11:02:08
 * @FilePath: \work\src\views\course\courseMgt\index.vue
 * @Description:
-->
<template>
  <n-card class="h-full shadow-sm rounded-16px" :bordered="false">
    <FormPro @register="register" @submit="handleSubmit" @reset="reloadTable">
      <template #courseCategorySlot="{ model, field }">
        <n-select
          v-model:value="model[field]"
          placeholder="请选择课程类别"
          clearable
          :options="courseCategoryOptions"
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
import { useRouterPush } from "@/composables";
import { searchCouserInfo } from "@/service";
// import { getUserInfo } from "@/utils";
import { TablePro, TableAction } from "@/components/TablePro";
import { FormPro, useForm } from "@/components/FormPro";
import { columns } from "./columns";
import { schemas } from "./schemas";
import {
  getCourseCategoryOptions,
  getCollegeLegistOptions,
  getStatusOptions,
} from "./getOptions";
const actionRef = ref(); // 表格
const formData = ref({});
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
            onClick: handleConfig.bind(null, record),
            // 根据业务控制是否显示 isShow 和 auth 是并且关系
            ifShow: () => {
              return true;
            },
            // 根据权限控制是否显示: 有权限，会显示，支持多个
            auth: ["teacher"],
          },
        ],
      });
    }
    return h(TableAction as any, {
      style: "button",
      actions: [
        {
          label: "查看成绩",
          onClick: handleConfig.bind(null, record),
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
// 院系和所属类别的下拉查询逻辑
const courseCategoryOptions = ref([]);
const cascaderOptions = ref([]);
const courseStatusOptions = ref([]);

const getOption = async () => {
  courseCategoryOptions.value = await getCourseCategoryOptions();
  cascaderOptions.value = await getCollegeLegistOptions();
  courseStatusOptions.value = await getStatusOptions();
};
getOption();
const [register] = useForm({
  // 查询FORM
  gridProps: { cols: "1 s:1 m:2 l:3 xl:4 2xl:4" },
  labelWidth: 80,
  showAdvancedButton: false,
  schemas,
});
// table查询
const loadDataTable = async (res: any) => {
  const Param = {
    pageSize: res.size,
    current: res.current,
  };
  const { data: result } = await searchCouserInfo({ ...formData.value, ...Param });
  return result;
};
const reloadTable = () => {
  actionRef.value.reload();
};
// 查询
const handleSubmit = (values: Recordable) => {
  formData.value = values;
  reloadTable();
};
const { routerPush } = useRouterPush();

const handleConfig = (record: Recordable) => {
  // courseStore.setCourseInfo(record.id);
  routerPush({ name: "course_courseMark" });
};
</script>
<style scoped></style>
