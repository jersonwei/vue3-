<!--
 * @Author: ZHENG
 * @Date: 2022-06-06 08:53:26
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-09 15:13:17
 * @FilePath: \work\src\views\learnAnalysis\questAnalysis\personalTest\index.vue
 * @Description:
-->
<template>
  <div class="h-full">
    <div class="h-full">
      <n-card class="h-full shadow-sm rounded-16px">
        <n-grid class="mt-4" cols="12" responsive="screen" :x-gap="12">
          <n-gi span="3">
            <n-card
              title="实验分析-学生列表"
              :bordered="false"
              class="wh-full b-1"
              size="small"
            >
              <div class="wh-full">
                <n-space vertical>
                  <n-input-group>
                    <n-input
                      v-model:value="Form.stuName"
                      placeholder="输入学生姓名搜索"
                    />
                    <n-button type="primary" ghost @click="searchStudent">
                      搜索
                    </n-button>
                  </n-input-group>
                </n-space>

                <div class="py-3 menu-list">
                  <template v-if="loading">
                    <div class="flex items-center justify-center py-4">
                      <n-spin size="medium" style="height: 440px; overflow: hidden" />
                    </div>
                  </template>
                  <template v-else>
                    <n-scrollbar style="max-height: 440px">
                      <div v-for="(item, index) in studentList">
                        <n-thing>
                          <template #avatar>
                            <n-avatar
                              size="large"
                              src="https://img02.mockplus.cn/image/2022-06-02/f94421b0-e247-11ec-8ddc-a1881342a2a2.jpg"
                            >
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
                            {{ item.collegeName }}
                            {{ item.className }}
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
                ><n-card title="实验报告成绩分析">
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
              <n-gi
                ><n-card title="学生课程实验报告完成进度">
                  <template v-if="gradeData.avg != null">
                    <div style="display: flex; justify-content: center">
                      <n-progress
                        type="circle"
                        stroke-width="10"
                        :percentage="gradeData.schedule"
                      />
                    </div>
                  </template>
                  <template v-else>
                    <n-empty style="height: 160px" description="暂无数据"></n-empty
                  ></template>
                </n-card>
              </n-gi>
            </n-grid>

            <n-card title="学生章节分析" :bordered="false">
              <FormPro @register="register" @submit="handleSubmit" @reset="reloadTable">
              </FormPro>
              <TablePro
                ref="actionRef"
                :columns="columns"
                :request="loadDataTable"
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
import { getStudentList, getTestStudentReportGrade } from "@/service";
const route = useRoute();
const message = useMessage();
const Form = reactive({
  stuName: "",
});
const gradeData = reactive({
  avg: 0,
  max: 0,
  min: 0,
  schedule: 0,
});
const pagination = ref({
  current: 1,
  pages: 1,
});
const stuIndex = ref(0);
const studentList = ref();
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
  const { data: result } = await getTestStudentReportGrade(courseId, stuId);
  Object.assign(gradeData, result);
};
const clickStuName = (item, index) => {
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
</style>
