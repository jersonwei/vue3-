<!--
 * @Author: ZHENG
 * @Date: 2022-06-06 08:53:26
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-08 18:42:08
 * @FilePath: \work\src\views\learnAnalysis\testAnalysis\index.vue
 * @Description:
-->
<template>
  <div class="h-full">
    <n-card class="h-full shadow-sm rounded-16px">
      <n-grid class="mt-4" cols="12" responsive="screen" :x-gap="12">
        <n-gi span="3">
          <n-card
            title="实验分析-课程列表"
            :bordered="false"
            class="wh-full border"
            size="small"
          >
            <div class="wh-full">
              <n-space vertical>
                <n-cascader
                  v-model:value="searchForm.majorId"
                  clearable
                  placeholder="课程院系/专业"
                  :options="majorOptions"
                  :check-strategy="'child'"
                  :show-path="true"
                  remote
                  :on-load="handleLoad"
                />
                <n-input-group>
                  <n-input v-model:value="searchForm.courseName" placeholder="课程名称" />
                </n-input-group>

                <div style="display: flex">
                  <n-button style="width: 40%" type="info" @click="search">搜索</n-button>
                  <n-button style="width: 40%; margin-left: auto" @click="refresh"
                    >重置</n-button
                  >
                </div>

                <div class="py-3 menu-list">
                  <template v-if="loading">
                    <div class="flex items-center justify-center py-4">
                      <n-spin size="medium" style="height: 450px; overflow: hidden" />
                    </div>
                  </template>
                  <template v-else>
                    <n-scrollbar style="max-height: 440px">
                      <div v-for="(item, index) in courseList">
                        <n-thing style="padding: 5px">
                          <template #avatar>
                            <n-avatar
                              size="large"
                              src="https://img02.mockplus.cn/image/2022-06-02/f94421b0-e247-11ec-8ddc-a1881342a2a2.jpg"
                            >
                            </n-avatar>
                          </template>
                          <template #header-extra>
                            <n-button
                              size="small"
                              text
                              style="color: rgb(0, 83, 255)"
                              @click="clickStudent"
                            >
                              学生列表
                            </n-button>
                          </template>
                          <template #header>
                            <n-button
                              size="large"
                              text
                              @click="clickCourseName(item, index)"
                              :style="{
                                color: courseIndex === index ? 'rgb(0, 83, 255)' : '',
                              }"
                            >
                              {{ item.courseName }}</n-button
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
              </n-space>
            </div>
          </n-card>
        </n-gi>
        <n-gi span="9">
          <n-form-item
            class="border"
            style="padding: 10px"
            label-placement="left"
            label="选择课时"
            :show-feedback="false"
          >
            <n-cascader
              v-model:value="form.classId"
              placeholder="请选择课时"
              :options="classOptions"
              :check-strategy="'child'"
              :show-path="false"
              remote
              :on-load="handleUnitLoad"
              @update:value="updateClassId"
            />
          </n-form-item>
          <n-grid style="margin-top: 10px" x-gap="12" :cols="2" :x-gap="20">
            <n-gi>
              <n-card title="实验报告成绩分析">
                <div class="w-full h-180px">
                  <n-space vertical class="flex" style="padding-top: 30px">
                    <p class="flex-center" style="font-size: 20px">实验报告平均分</p>
                    <p class="flex-center font-600" style="font-size: 20px">
                      {{ analysis.avg }} 分
                    </p>
                    <p class="flex-center" style="font-size: 20px">
                      最高分：{{ analysis.max }}分
                      <n-icon color="green">
                        <CaretUpOutlined />
                      </n-icon>
                      | 最低分：{{ analysis.min }}分<n-icon color="red">
                        <CaretDownFilled />
                      </n-icon>
                    </p>
                  </n-space>
                </div> </n-card
            ></n-gi>
            <n-gi
              ><n-card title="实验报告时长分析">
                <template v-if="analysis.durationAnalysis.length">
                  <n-scrollbar style="max-height: 180px" class="w-full h-180px">
                    <div v-for="(item, index) in analysis.durationAnalysis">
                      <n-space style="width: 100%">
                        <n-avatar
                          round
                          size="small"
                          :style="{
                            color: 'white',
                            backgroundColor: getBackGroundColor(index),
                          }"
                        >
                          {{ item.shortId }}
                        </n-avatar>
                        <div style="width: 80px">{{ item.studentName }}</div>
                        <div style="width: 220px">提交时间：{{ item.testDate }}</div>
                        <div style="width: 80px">
                          周{{ numberfilter(getDay(new Date(item.testDate))) }}
                        </div>
                      </n-space>
                    </div>
                  </n-scrollbar>
                </template>
                <template v-else>
                  <n-empty style="height: 180px" description="暂无数据"></n-empty
                ></template>
              </n-card>
            </n-gi>
          </n-grid>

          <n-card
            class="border"
            style="margin-top: 10px"
            title="报告成绩分布（班级）"
            :bordered="false"
          >
            <template v-if="analysis.durationAnalysis.length">
              <div ref="pieRef" class="w-full h-260px" id="pieEcharts"></div>
            </template>
            <template v-else>
              <n-empty style="height: 260px" description="暂无数据"></n-empty
            ></template>
          </n-card>
        </n-gi>
      </n-grid>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { CaretUpOutlined, CaretDownFilled } from "@vicons/antd";
import { getCollegeLegistOptions, getChildren, getChapter } from "./getOptions";
import { getCourseGradeVo, getTestReportGrade, getUnitList } from "@/service";
import { numberfilter } from "@/utils";
import { CascaderOption, useMessage } from "naive-ui";
import { getDay } from "date-fns";
import * as echarts from "echarts/core";

// 重写一下，咋感觉逻辑东一块西一块
const message = useMessage();
const getBackGroundColor = (index) => {
  const page = [
    "rgb(255, 77, 79)",
    "rgb(255, 102, 0)",
    "rgb(250, 169, 14)",
    "rgb(99, 99, 99)",
    "rgb(99, 99, 99)",
  ];
  return page[index];
};
// -------------左侧逻辑
const searchForm = reactive({
  courseName: "",
  majorId: ref(null),
});
// 课程院系/专业下拉框
const majorOptions = ref();
const getOprions = async () => {
  majorOptions.value = await getCollegeLegistOptions();
};
const handleLoad = (option: CascaderOption) => {
  return new Promise<void>((resolve) => {
    window.setTimeout(() => {
      majorOptions.value.children = getChildren(option);
      resolve();
    }, 1000);
  });
};
getOprions();

// 查询table数据
const loading = ref(false);
const courseList = ref();
const pagination = ref({
  current: 1,
  pages: 1,
});
const analysis = reactive({
  avg: 0,
  max: 0,
  min: 0,
  durationAnalysis: [],
});
const loadDataTable = async () => {
  loading.value = true;
  const i = searchForm.majorId?.indexOf("-");
  const majorId = searchForm.majorId?.substring(i + 1);
  const Param = {
    pageSize: 10,
    current: pagination.value.current,
    courseName: searchForm.courseName,
    majorId,
  };
  const { data: result } = await getCourseGradeVo({ ...Param });
  courseList.value = result.records;
  console.log(result.records);
  pagination.value.pages = result.pages;
  form.classId = null;
  analysis.avg = 0;
  analysis.max = 0;
  analysis.min = 0;
  analysis.durationAnalysis = [];
  loading.value = false;
  if (result?.records) {
    getChapterFn(result?.records[0]?.courseId);
    // getTestReportGradeData(result?.records[0]?.courseId);
  }
};
const search = async () => {
  courseIndex.value = 0;
  pagination.value.current = 1;
  loadDataTable();
};
const refresh = () => {
  searchForm.courseName = "";
  searchForm.majorId = null;
  courseIndex.value = 0;
  pagination.value.current = 1;
  loadDataTable();
};
// 左侧的数据右侧查询章节课时
const form = reactive({
  classId: null,
});
const classOptions = ref();

const updateClassId = (
  value: string | number | Array<string | number> | null,
  option: CascaderOption | Array<CascaderOption | null> | null,
  pathValues: Array<CascaderOption | null> | Array<CascaderOption[] | null> | null
) => {
  getTestReportGradeData(value);
};

const getChapterFn = async (courseId: number) => {
  const params = {
    courseId,
  };
  form.classId = null;
  analysis.avg = 0;
  analysis.max = 0;
  analysis.min = 0;
  analysis.durationAnalysis = [];
  classOptions.value = await getChapter(params);
  if (!classOptions.value.length) {
    return message.warning("无章节数据");
  }
  handleUnitLoad(classOptions.value[0]);
};
const handleUnitLoad = async (option) => {
  const params = {
    chapterId: option.value,
  };
  const { data: result } = await getUnitList(params);
  const newList = result.map((item: { unitId: any; unitName: any }) => {
    return { value: `${option.value}-${item.unitId}`, label: item.unitName, isLeaf: 1 };
  });
  getTestReportGradeData(newList[0].value);
  form.classId = newList[0].value;
  for (let i = 0; i <= (option as { depth: number }).depth; ++i) {
    option.children = newList;
  }
};
const getTestReportGradeData = async (id: string) => {
  const i = id.indexOf("-");
  const subUnitId = id.substring(i + 1);
  // const { data: result } = await getTestReportGrade(subUnitId);
  const { data: result } = await getTestReportGrade(11);
  if (!result) {
    const param = {
      avg: 0,
      max: 0,
      min: 0,
      durationAnalysis: [],
    };
    Object.assign(analysis, param);
  } else {
    const {
      avg,
      max,
      min,
      durationAnalysis,
      lessSix,
      sixToSeven,
      sevenToEight,
      eightToNine,
      nineToTen,
    } = result;
    const param = {
      avg,
      max,
      min,
      durationAnalysis,
    };
    Object.assign(analysis, param);
    setTimeout(() => {
      const myChart = echarts.init(document.getElementById("pieEcharts"));
      const options = {
        xAxis: {
          type: "category",
          data: ["<60", "60-69", "70-79", "80-89", "90-100"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [lessSix, sixToSeven, sevenToEight, eightToNine, nineToTen],
            type: "bar",
            showBackground: true,
            color: "rgb(24, 144, 255)",
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      };
      myChart.setOption(options);
    }, 500);
  }
};
const updatePage = (page: number) => {
  courseIndex.value = 0;
  loadDataTable();
};
loadDataTable();

const courseIndex = ref(0);
const clickCourseName = (item, index) => {
  getChapterFn(item.courseId);
  courseIndex.value = index;
};
const clickStudent = () => {
  message.info("学生列表");
};
</script>

<style lang="scss" scoped>
.border {
  border-width: 1px;
  border-color: rgb(232, 232, 232);
  border-style: solid;
  border-radius: 8.5px;
}
</style>
