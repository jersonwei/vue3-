<!--
 * @Author: ZHENG
 * @Date: 2022-06-08 18:31:50
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-09 15:53:30
 * @FilePath: \work\src\views\user\recordSee\index.vue
 * @Description:
-->
<template>
  <n-card>
    <div class="content">
      <n-form
        label-placement="left"
        :label-width="80"
        class="record"
        style="display: flex; flex-wrap: wrap; width: 900px"
      >
        <n-avatar
          round
          style="width: 100px; height: 100px"
          size="large"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
        <n-form-item label="姓名:">
          <!-- <n-input>张三</n-input> -->
          <span>张三</span>
          <!-- <n-button text>张三</n-button> -->
        </n-form-item>
        <n-form-item label="姓名:">
          <!-- <n-input>张三</n-input> -->
          <span>张三</span>
          <!-- <n-button text>张三</n-button> -->
        </n-form-item>
        <n-form-item label="姓名:">
          <!-- <n-input>张三</n-input> -->
          <span>张三</span>
          <!-- <n-button text>张三</n-button> -->
        </n-form-item>
        <n-form-item label="姓名:">
          <!-- <n-input>张三</n-input> -->
          <span>张三</span>
          <!-- <n-button text>张三</n-button> -->
        </n-form-item>
        <n-form-item label="姓名:">
          <!-- <n-input>张三</n-input> -->
          <span>张三</span>
          <!-- <n-button text>张三</n-button> -->
        </n-form-item>
        <n-form-item label="姓名:">
          <!-- <n-input>张三</n-input> -->
          <span>张三</span>
          <!-- <n-button text>张三</n-button> -->
        </n-form-item>
        <n-form-item label="姓名:">
          <!-- <n-input>张三</n-input> -->
          <span>张三</span>
          <!-- <n-button text>张三</n-button> -->
        </n-form-item>
        <n-form-item label="姓名:">
          <!-- <n-input>张三</n-input> -->
          <span>张三</span>
          <!-- <n-button text>张三</n-button> -->
        </n-form-item>
        <n-form-item label="姓名:">
          <!-- <n-input>张三</n-input> -->
          <span>张三</span>
          <!-- <n-button text>张三</n-button> -->
        </n-form-item>
        <n-form-item label="姓名:">
          <!-- <n-input>张三</n-input> -->
          <span>张三</span>
          <!-- <n-button text>张三</n-button> -->
        </n-form-item>
        <n-form-item label="姓名:">
          <!-- <n-input>张三</n-input> -->
          <span>张三</span>
          <!-- <n-button text>张三</n-button> -->
        </n-form-item>
        <n-form-item label="姓名:">
          <!-- <n-input>张三</n-input> -->
          <span>张三</span>
          <!-- <n-button text>张三</n-button> -->
        </n-form-item>
        <n-form-item label="姓名:">
          <!-- <n-input>张三</n-input> -->
          <span>张三</span>
          <!-- <n-button text>张三</n-button> -->
        </n-form-item>
        <!-- <n-form-item label="性别:">
        <n-button text>张三</n-button>
      </n-form-item>
      <n-form-item label="学号:">
        <n-button text>张三</n-button>
      </n-form-item>
      <n-form-item label="院系:">
        <n-button text>张三</n-button>
      </n-form-item>
      <n-form-item label="专业:">
        <n-button text>张三</n-button>
      </n-form-item>
      <n-form-item label="班级:">
        <n-button text>张三</n-button>
      </n-form-item>
      <n-form-item label="手机号:">
        <n-button text>张三</n-button>
      </n-form-item>
      <n-form-item label="邮箱:">
        <n-button text>张三</n-button>
      </n-form-item>
      <n-form-item label="身份证号:">
        <n-button text>张三</n-button>
      </n-form-item>
      <n-form-item label="地址:">
        <n-button text>张三</n-button>
      </n-form-item> -->
      </n-form>
      <div class="tab" style="width: 900px">
        <n-tabs type="segment">
          <n-tab-pane name="chap1" tab="参加课程">
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
              :scroll-x="1000"
              :action-column="actionColumn"
            >
            </TablePro>
          </n-tab-pane>
          <n-tab-pane name="chap2" tab="考试成绩">
            <examManager></examManager>
          </n-tab-pane>
          <n-tab-pane name="chap3" tab="课程笔记">3</n-tab-pane>
          <n-tab-pane name="chap4" tab="课程互动">4</n-tab-pane>
        </n-tabs>
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
import { useRouterPush } from "@/composables";
import { searchCouserInfo } from "@/service";
import { h, reactive, ref } from "vue";
import { FormPro, useForm } from "@/components/FormPro";
import { schemas } from "./schemas";
import { TablePro, TableAction } from "@/components/TablePro";
import { getCourseCategoryOptions } from "./getOptions";
import { columns } from "./columns";
import examManager from "./component/examManager/exam.vue";
const actionRef = ref(); // 表格
const formData = ref({});
const [register] = useForm({
  // 查询FORM
  gridProps: { cols: "1 s:1 m:2 l:3 xl:4 2xl:4" },
  labelWidth: 80,
  showAdvancedButton: false,
  schemas,
});
const actionColumn = reactive({
  // Table操作列
  width: 30,
  title: "操作",
  key: "action",
  // fixed: "right",
  render(record: Recordable<any>) {
    if (record.status === 1) {
      return h(TableAction as any, {
        style: "button",
        actions: [
          {
            label: "查看成绩",
            onClick: reportSee.bind(null, record),
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
          icon: "ic:outline-delete-outline",
          onClick: reportSee.bind(null, record),
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
const getOption = async () => {
  courseCategoryOptions.value = await getCourseCategoryOptions();
};
getOption();
const loadDataTable = async (res: any) => {
  const Param = {
    pageSize: res.size,
    current: res.current,
  };
  const { data: result } = await searchCouserInfo({ ...formData.value, ...Param });
  return result;
};
// 刷新重置
const reloadTable = () => {
  actionRef.value.reload();
};
// 查询
const handleSubmit = (values: Recordable) => {
  formData.value = values;
  reloadTable();
};
const { routerPush } = useRouterPush();

// 查看成绩
const reportSee = () => {
  routerPush({ name: "course_courseMark" });
};
// import course from "./component/course/index.vue"
// export default {
//   components: {
//     course
//   }
</script>

<style lang="scss" scoped>
.img {
  ::v-deep(.n-form-item) {
    width: 280px;
    height: 30px;
    ::v-deep(.n-form-item-label) {
      width: 80px;
      height: 67px;
      line-height: 67px;
    }
  }
}

// .record {
//   display: flex;
// }
// .info {
//   display: flex;
// }
.img {
  border-radius: 50%;
}
</style>
