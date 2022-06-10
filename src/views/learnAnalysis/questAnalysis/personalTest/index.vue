<!--
 * @Author: ZHENG
 * @Date: 2022-06-06 08:53:26
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-10 18:26:26
 * @FilePath: \work\src\views\learnAnalysis\questAnalysis\personalTest\index.vue
 * @Description:
-->
<template>
  <div class="h-full">
    <div class="h-full">
      <n-card class="h-full shadow-sm rounded-16px">
        <n-grid
          class="mt-4"
          cols="12"
          responsive="screen"
          :x-gap="12"
          style="min-width: 1342px"
        >
          <n-gi span="3">
            <n-card
              title="实验分析-学生列表"
              :bordered="false"
              class="wh-full b-1"
              size="small"
              :segmented="{
                content: true,
              }"
            >
              <div class="wh-full">
                <n-space vertical>
                  <n-input-group>
                    <n-input v-model:value="Form.name" placeholder="输入学生姓名搜索" />
                    <n-button type="primary" ghost @click="searchStudent">
                      搜索
                    </n-button>
                  </n-input-group>
                </n-space>

                <div class="py-3 menu-list">
                  <template v-if="loading">
                    <div class="flex items-center justify-center py-4">
                      <n-spin size="medium" style="height: 520px; overflow: hidden" />
                    </div>
                  </template>
                  <template v-else>
                    <n-scrollbar style="min-height: 520px; max-height: 520px">
                      <div v-for="(item, index) in studentList">
                        <n-thing style="padding: 5px">
                          <template #avatar>
                            <n-avatar size="large" :src="`${http}${item.avatar}`">
                            </n-avatar>
                          </template>
                          <template #header>
                            <n-button
                              size="large"
                              text
                              @click="clickStuName(item, index)"
                              :style="{
                                color: stuIndex === index ? 'rgb(0, 83, 255)' : '',
                              }"
                            >
                              {{ item.userName }}</n-button
                            >
                          </template>
                          <template #description>
                            <p style="color: rgb(124, 124, 124)">
                              {{ item.collegeName }} {{ item.className }}
                            </p>
                          </template>
                        </n-thing>
                      </div>
                    </n-scrollbar>
                    <n-pagination
                      style="
                        padding-top: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                      "
                      v-model:page="pagination.current"
                      :page-count="pagination.pages"
                      :page-slot="5"
                      @update:page="updatePage"
                    />
                  </template>
                </div>
              </div>
            </n-card>
          </n-gi>
          <n-gi span="9">
            <n-grid x-gap="12" :cols="2" :x-gap="20">
              <n-gi
                ><n-card
                  title="实验报告成绩分析"
                  style="min-width: 367px"
                  size="small"
                  :segmented="{
                    content: true,
                  }"
                >
                  <template v-if="gradeData.avg != null">
                    <div class="w-full h-160px">
                      <n-space vertical class="flex">
                        <p class="flex-center" style="font-size: 20px">实验报告平均分</p>
                        <p class="flex-center font-600" style="font-size: 20px">
                          {{ gradeData.avg }} 分
                        </p>
                        <p class="flex-center" style="font-size: 20px">
                          最高分：{{ gradeData.max }} 分
                          <n-icon color="green">
                            <CaretUpOutlined />
                          </n-icon>
                          | 最低分：{{ gradeData.min }} 分<n-icon color="red">
                            <CaretDownFilled />
                          </n-icon>
                        </p>
                      </n-space>
                    </div>
                  </template>
                  <template v-else>
                    <n-empty style="height: 160px" description="暂无数据"></n-empty
                  ></template> </n-card
              ></n-gi>
              <n-gi style="min-width: 554px"
                ><n-card
                  title="学生课程实验报告完成进度"
                  size="small"
                  :segmented="{
                    content: true,
                  }"
                >
                  <template v-if="gradeData.avg != null">
                    <div style="height: 160px; display: flex; justify-content: center">
                      <n-progress
                        type="circle"
                        stroke-width="10"
                        :percentage="gradeData.proportion"
                      />
                    </div>
                  </template>
                  <template v-else>
                    <n-empty style="height: 160px" description="暂无数据"></n-empty
                  ></template>
                </n-card>
              </n-gi>
            </n-grid>

            <n-card
              title="学生章节分析"
              :bordered="false"
              style="margin-top: 10px; max-height: 200px"
              size="small"
              :segmented="{
                content: true,
              }"
            >
              <FormPro
                @register="register"
                @submit="handleSubmit"
                @reset="reloadDataTable"
              >
              </FormPro>
              <TablePro
                ref="actionRef"
                :columns="columns"
                :request="loadPersonalInfoTable"
                :row-key="(row) => row.id"
                key-field="id"
                label-field="label"
                :scroll-x="1200"
              >
              </TablePro>
            </n-card>
          </n-gi>
        </n-grid>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { FormPro, FormSchema, useForm } from "@/components/FormPro";
import { CaretUpOutlined, CaretDownFilled } from "@vicons/antd";
import { useMessage } from "naive-ui";
import { schemas } from "./schemas";
import { columns } from "./columns";
import { useRoute } from "vue-router";
import {
  getPersonalInfo,
  getPersonalInfoDetailed,
  getStudentList,
  getTestStudentReportGrade,
} from "@/service";
import { getServiceEnv } from "@/utils";
const http = getServiceEnv();
const route = useRoute();
const message = useMessage();
const Form = reactive({
  name: "",
});
const gradeData = reactive({
  avg: 0,
  max: 0,
  min: 0,
  proportion: 0,
});
const pagination = ref({
  current: 1,
  pages: 1,
});
const handleSubmit = (values: Recordable) => {
  Form.name = values.name;
  // formData.value = {
  //   courseName: values.courseName,
  // };
  // // console.log(formData);
  reloadDataTable();
};
const stuIndex = ref(0);
const studentList = ref();
const loadPersonalInfoTable = async (res) => {
  console.log(studentList.value);
  if (!studentList.value) {
    return {
      current: 1,
      optimizeCountSql: true,
      orders: [],
      pages: 0,
      records: [],
      searchCount: true,
      size: 20,
      total: 0,
    };
  }
  const { courseId } = route.query;
  const stuId = studentList.value[stuIndex.value].id;
  const param = {
    pageSize: res.size,
    current: res.current,
    courseId,
    studentId: stuId,
  };
  console.log(Form);
  const { data: result } = await getPersonalInfo({ ...Form, ...param });
  return result;
};
const loadDataTable = async () => {
  const { classId, className, collegeName } = route.query;
  const param = {
    pageSize: 10,
    current: pagination.value.current,
    id: classId,
    className,
    collegeName,
  };
  const { data: result } = await getStudentList(param);
  console.log(result);
  studentList.value = result.records;
  pagination.value.pages = result.pages;
  if (result.records[0]?.id) {
    const stuId = result.records[0].id;
    loadReportData(stuId);
  }
};
const actionRef = ref();
const reloadDataTable = () => {
  actionRef.value.reload();
};
loadDataTable();
/**
 * @author: ZHENG
 * @description: 学生名称查询
 * @return {*}
 */
const searchStudent = () => {
  loading.value = true;
  stuIndex.value = 0;
  pagination.value.current = 1;
  loadDataTable();
  loading.value = false;
};
const updatePage = (page: number) => {
  loadDataTable();
};
const loadReportData = async (stuId) => {
  const { courseId } = route.query;
  const param = {
    studentId: stuId,
    courseId,
  };
  const { data: result } = await getPersonalInfoDetailed(param);
  Object.assign(gradeData, result);
  if (result) {
    gradeData.proportion = parseInt(gradeData.proportion * 100, 10);
  } else {
    gradeData.avg = null;
  }

  reloadDataTable();
  // const PeronInfo = await getPersonalInfo();
};
const clickStuName = (item, index) => {
  console.log(item);
  loadReportData(item.id);
  stuIndex.value = index;
};

const [register] = useForm({
  gridProps: { cols: "1" },
  labelWidth: 120,
  showAdvancedButton: false,
  showResetButton: false,
  schemas,
});
const loading = ref(false);
</script>

<style scoped>
:deep(.table-toolbar) {
  display: none !important;
}
:deep(.n-empty) {
  display: flex;
  justify-content: center;
}
</style>
