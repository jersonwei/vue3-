<!--
 * @Author: ZHENG
 * @Date: 2022-06-06 08:53:26
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-06 17:56:18
 * @FilePath: \work\src\views\learnAnalysis\testAnalysis\index.vue
 * @Description:
-->
<template>
  <div class="h-full">
    <div class="h-full">
      <n-card class="h-full shadow-sm rounded-16px">
        <n-grid class="mt-4" cols="12" responsive="screen" :x-gap="12">
          <n-gi span="4">
            <n-card
              title="实验分析-课程列表"
              :bordered="false"
              class="wh-full border"
              size="small"
            >
              <div class="wh-full">
                <n-space vertical>
                  <n-cascader
                    v-model:value="Form.majorId"
                    clearable
                    placeholder="课程院系/专业"
                    :options="majorOptions"
                    :check-strategy="'child'"
                    :show-path="true"
                    remote
                    :on-load="handleLoad"
                  />
                  <n-input-group>
                    <n-input v-model:value="Form.courseName" placeholder="课程名称" />
                  </n-input-group>
                  <n-button-group style="width: 100%">
                    <n-button style="width: 50%" type="info" @click="loadDataTable"
                      >搜索</n-button
                    >
                    <n-button style="width: 50%" @click="refresh">重置</n-button>
                  </n-button-group>
                  <div class="py-3 menu-list">
                    <template v-if="loading">
                      <div class="flex items-center justify-center py-4">
                        <n-spin size="medium" style="height: 520px; overflow: hidden" />
                      </div>
                    </template>
                    <template v-else>
                      <n-scrollbar style="max-height: 520px">
                        <div v-for="(item, index) in courseList">
                          <n-thing>
                            <template #avatar>
                              <n-avatar
                                size="large"
                                src="https://img02.mockplus.cn/image/2022-06-02/f94421b0-e247-11ec-8ddc-a1881342a2a2.jpg"
                              >
                              </n-avatar>
                            </template>
                            <template #header-extra>
                              <n-button size="small" text> 学生列表 </n-button>
                            </template>
                            <template #header>
                              <p>{{ item.courseName }}</p>
                              <!-- style="color: rgb(0, 35, 255)" -->
                            </template>
                            <template #description>
                              {{ item.collegeName }} {{ item.className }}
                            </template>
                          </n-thing>
                        </div>
                      </n-scrollbar>
                      <n-pagination
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
          <n-gi span="8">
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
              <div ref="pieRef" class="w-full h-360px"></div>
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
import {getCollegeLegistOptions,getChildren} from './getOptions'
import {getCourseGradeVo} from '@/service'

const Form = reactive({
  courseName: "",
	majorId: ref(null)
});
const courseList = ref()
const majorOptions = ref()
const getOprions = async() => {
	majorOptions.value =await getCollegeLegistOptions();
}
const handleLoad = (option: CascaderOption) => {
  return new Promise<void>(resolve => {
    window.setTimeout(() => {
      majorOptions.value.children = getChildren(option);
      resolve();
    }, 1000);
  });
};
getOprions()
const pagination = ref({
	current:1,
	pages:1
})
const loading = ref(false);
const loadDataTable = async() => {
	loading.value = true
	const i = Form.majorId?.indexOf('-');
  const majorId = Form.majorId?.substring(i + 1);
	const Param = {
    pageSize: 10,
    current: pagination.value.current,
		courseName: Form.courseName,
		majorId
  };
  const { data: result } = await getCourseGradeVo({ ...Param });
	courseList.value =result.records;
	console.log(result.records)
	pagination.value.pages = result.pages;
	loading.value = false
}
const refresh = () => {
	Form.courseName = ''
	Form.majorId = null
	loadDataTable()
}
const updatePage = (page: number) => {
	loadDataTable()
}
loadDataTable();

const [register] = useForm({
  gridProps: { cols: '1' },
  labelWidth: 120,
	showAdvancedButton:false,
	showResetButton:false,
  schemas
});
const { domRef: pieRef } = useEcharts(
  ref<ECOption>({
   xAxis: {
    type: 'category',
    data: ['<60', '60-70', '70-80', '80-90', '90-100']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [10, 15, 13, 35, 15],
      type: 'bar',
      showBackground: true,
			color:'rgb(24, 144, 255)',
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
  })
);
</script>

<style scoped>
.border {
  border-width: 1px;
  border-color: rgb(232, 232, 232);
  border-style: solid;
  border-radius: 8.5px;
}
</style>
