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
      <template #statusSlot="{ model, field }">
        <n-select
          v-model:value="model[field]"
          placeholder="请选择课程状态"
          clearable
          :options="courseStatusOptions"
        />
      </template>
    </FormPro>
    <TablePro
      ref="actionRef"
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      :action-column="actionColumn"
      :scroll-x="2200"
    >
      <template v-if="userRole === 'teacher'" #tableTitle>
        <n-button type="primary" @click="addTable">
          <template #icon>
            <n-icon>
              <PlusOutlined />
            </n-icon>
          </template>
          新建课程
        </n-button>
      </template>
    </TablePro>
    <addOrEditModalVue
      ref="addOrEditModalRef"
      @reload-table="reloadTable"
    ></addOrEditModalVue>
    <!-- <editModalVue ref="editModalRef" @reload-table="reloadTable"></editModalVue> -->
    <delModal
      ref="delModalRef"
      :del-data="delData"
      :del-text="delText"
      @reload-table="reloadTable"
    ></delModal>
    <updateCourse
      ref="updateModalRef"
      :update-data="updateData"
      @reload-table="reloadTable"
    ></updateCourse>
  </n-card>
</template>

<script lang="ts" setup>
import { h, reactive, ref } from "vue";
import { CascaderOption, useMessage } from "naive-ui";
import { PlusOutlined } from "@vicons/antd";
import { useCourseStore } from "@/store";
import { useRouterPush } from "@/composables";
import { searchCouserInfo } from "@/service";
import { getUserInfo } from "@/utils";
import { TablePro, TableAction } from "@/components/TablePro";
import { FormPro, useForm } from "@/components/FormPro";
import { columns } from "./columns";
import { schemas } from "./schemas";
import delModal from "./components/delModal.vue";
import addOrEditModalVue from "./components/addOrEditModal.vue";
// import editModalVue from './components/editModal.vue';
import updateCourse from "./components/updateCourse.vue";
import {
  getCourseCategoryOptions,
  getCollegeLegistOptions,
  getStatusOptions,
  getChildren,
} from "./getOptions";

// 获取用户信息
const { userRole } = getUserInfo();
const courseStore = useCourseStore();
const message = useMessage();
const actionRef = ref(); // 表格
const formData = ref({});
const actionColumn = reactive({
  // Table操作列
  width: 350,
  title: "操作",
  key: "action",
  fixed: "right",
  render(record: Recordable<any>) {
    if (record.status === 1) {
      return h(TableAction as any, {
        style: "button",
        actions: [
          {
            label: "编辑",
            onClick: handleEdit.bind(null, record),
            // 根据业务控制是否显示 isShow 和 auth 是并且关系
            ifShow: () => {
              return true;
            },
            // 根据权限控制是否显示: 有权限，会显示，支持多个
            auth: ["teacher"],
          },
          {
            label: "配置",
            onClick: handleConfig.bind(null, record),
            // 根据业务控制是否显示 isShow 和 auth 是并且关系
            ifShow: () => {
              return true;
            },
            // 根据权限控制是否显示: 有权限，会显示，支持多个
            auth: ["teacher"],
          },
          {
            label: "预览",
            onClick: handleDetail.bind(null, record),
          },
        ],
      });
    }
    return h(TableAction as any, {
      style: "button",
      actions: [
        {
          label: "删除",
          icon: "ic:outline-delete-outline",
          onClick: handleDelete.bind(null, record),
          // 根据业务控制是否显示 isShow 和 auth 是并且关系
          ifShow: () => {
            return true;
          },
          // 根据权限控制是否显示: 有权限，会显示，支持多个
          auth: ["teacher"],
        },
        {
          label: "编辑",

          onClick: handleEdit.bind(null, record),
          // 根据业务控制是否显示 isShow 和 auth 是并且关系
          ifShow: () => {
            return true;
          },
          // 根据权限控制是否显示: 有权限，会显示，支持多个
          auth: ["teacher"],
        },
        {
          label: "配置",
          onClick: handleConfig.bind(null, record),
          // 根据业务控制是否显示 isShow 和 auth 是并且关系
          ifShow: () => {
            return true;
          },
          // 根据权限控制是否显示: 有权限，会显示，支持多个
          auth: ["teacher"],
        },
        {
          label: "预览",
          onClick: handleDetail.bind(null, record),
        },
        {
          label: "定时上架",
          onClick: handUpdateStatus.bind(null, record),
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
const handleLoad = (option: CascaderOption) => {
  return new Promise<void>((resolve) => {
    cascaderOptions.value.children = getChildren(option);
    resolve();
  });
};

const [register] = useForm({
  // 查询FORM
  gridProps: { cols: "1 s:1 m:2 l:3 xl:4 2xl:4" },
  labelWidth: 80,
  showAdvancedButton: false,
  schemas,
});
/**
 * @author: ZHENG
 * @description: 表格
 */
// table查询
const loadDataTable = async (res: any) => {
  const Param = {
    pageSize: res.size,
    current: res.current,
  };
  const { data: result } = await searchCouserInfo({ ...formData.value, ...Param });
  return result;
};
/**
 * @author: ZHENG
 * @description: 刷新， 重置
 */
const reloadTable = () => {
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
const delText = ref(""); // 删除的文字
// eslint-disable-next-line consistent-return
const handleDelete = (record: Recordable) => {
  if (record.status === "0") {
    return message.warning("只有下架状态课程才能删除");
  }
  delText.value = record.courseName;
  delData.value = record.id;
  delModalRef.value.showDelModal = true;
};

// 新建和编辑弹窗
const addOrEditModalRef = ref();
// 新建
const addTable = () => {
  addOrEditModalRef.value.showModalFn();
};

/**
 * @author: ZHENG
 * @description: 编辑
 * @param {*} record
 * @return {*}
 */
const handleEdit = (record: Recordable) => {
  addOrEditModalRef.value.editModalFn(record);
};

const updateData = ref();
// 定时上架功能
const updateModalRef = ref();
const handUpdateStatus = (record: Recordable) => {
  updateData.value = record;
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
  routerPush({ name: "course_courseDetail", query: { id: record.id } });
};

/**
 * @author: ZHENG
 * @description: 跳转课程信息\配置
 * @param {*} record
 * @return {*}
 */
const handleConfig = (record: Recordable) => {
  courseStore.setCourseInfo(record.id);
  routerPush({ name: "course_courseInfo" });
};
</script>
<style scoped></style>
