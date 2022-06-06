<!--
 * @Author: ZHENG
 * @Date: 2022-06-06 08:53:26
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-06 09:25:55
 * @FilePath: \work\src\views\learnAnalysis\testAnalysis\personalTest\index.vue
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
                      placeholder="输入题库名称搜索"
                    />
                    <n-button type="primary" ghost @click="searchStudent">
                      搜索
                    </n-button>
                  </n-input-group>
                </n-space>

                <div class="py-3 menu-list">
                  <template v-if="loading">
                    <div class="flex items-center justify-center py-4">
                      <n-spin size="medium" style="height: 600px; overflow: hidden" />
                    </div>
                  </template>
                  <template v-else>
                    <n-scrollbar style="max-height: 600px">
                      <div v-for="i in 100">
                        <n-thing>
                          <template #avatar>
                            <n-avatar
                              size="large"
                              src="https://img02.mockplus.cn/image/2022-06-02/f94421b0-e247-11ec-8ddc-a1881342a2a2.jpg"
                            >
                            </n-avatar>
                          </template>
                          <template #header>
                            <p style="color: rgb(0, 35, 255)">张三</p>
                          </template>
                          <template #description>
                            计算机学院 网络工程专业（一班）
                          </template>
                        </n-thing>
                      </div>
                    </n-scrollbar>
                  </template>
                </div>
              </div>
            </n-card>
          </n-gi>
          <n-gi span="9">
            <n-grid x-gap="12" :cols="2" :x-gap="20">
              <n-gi
                ><n-card title="实验报告成绩分析" embedded>
                  <div class="w-full h-160px">
                    <n-space vertical class="flex">
                      <p class="flex-center" style="font-size: 20px">实验报告平均分</p>
                      <p class="flex-center font-600" style="font-size: 20px">60 分</p>
                      <p class="flex-center" style="font-size: 20px">
                        最高分：80分
                        <n-icon color="green">
                          <CaretUpOutlined />
                        </n-icon>
                        | 最低分：40分<n-icon color="red">
                          <CaretDownFilled />
                        </n-icon>
                      </p>
                    </n-space>
                  </div> </n-card
              ></n-gi>
              <n-gi
                ><n-card title="学生课程实验报告完成进度" embedded>
                  <n-progress type="circle" :percentage="80" :offset-degree="90" />
                  <!-- <div ref="pieRef" class="w-full h-160px"></div> -->
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
import { useEcharts, type ECOption } from '@/hooks';
import { FormPro, FormSchema, useForm } from '@/components/FormPro';
import { CaretUpOutlined,CaretDownFilled } from '@vicons/antd';
import {schemas} from './schemas'
import {columns} from './columns'
const Form = reactive({
  stuName: "",
});
const [register] = useForm({
  gridProps: { cols: '1' },
  labelWidth: 120,
	showAdvancedButton:false,
	showResetButton:false,
  schemas
});
const loading = ref(false);
const searchStudent = () => {
  loading.value = true;
  console.log("cx1");
  loading.value = false;
};
const { domRef: pieRef } = useEcharts(
  ref<ECOption>({
    tooltip: {
      trigger: "item",
    },
    legend: {
      bottom: "1%",
      left: "center",
      itemStyle: {
        borderWidth: 0,
      },
    },
    series: [
      {
        color: ["#5da8ff", "#8e9dff", "#fedc69", "#26deca"],
        name: "完成进度",
        type: "pie",
        radius: ["45%", "75%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 1,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: "12",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 80, name: "完成" },
					{ value: 20, name: "未完成" }
        ],
      },
    ],
  }),

);
</script>

<style scoped></style>
