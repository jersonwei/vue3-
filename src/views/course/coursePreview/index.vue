/* eslint-disable @typescript-eslint/no-use-before-define */
<!--
 * @Author: ZHENG
 * @Date: 2022-05-14 11:44:12
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-25 15:52:10
 * @FilePath: \work\src\views\course\coursePreview\index.vue
 * @Description:
-->
<template>
  <n-card style="height: 700px">
    <n-layout has-sider>
      <n-layout-sider style="width: 1000px" collapse-mode="width" :collapsed-width="1200" :width="1200">
        <n-card content-style="padding: 0;" :title="courseData.unitName">
          <n-tabs
            v-if="showPaperData || courseData?.files?.length"
            type="line"
            size="large"
            :tabs-padding="20"
            pane-style="padding: 20px;"
          >
            <template v-for="(item, index) in courseData?.files">
              <n-tab-pane v-if="item.type === 0" :key="index" name="教学文档">
                <embed :src="item.url" width="100%" type="application/pdf" height="100%" style="height: 600px" />
                <!-- This browser does not support PDFs. Please download the PDF to view it:
                  <a href="/test.pdf">Download PDF</a>

                </embed> -->
              </n-tab-pane>
              <n-tab-pane v-if="item.type === 1" :key="index" name="教学视频">
                <playerVideo :src="item.url"></playerVideo>
                <!-- <iframe :src="item.url" width="100%" height="100%" style="height: 600px">
                  This browser does not support PDFs. Please download the PDF to view it:
                  <a href="/test.pdf">Download PDF</a>
                </iframe> -->
              </n-tab-pane>
              <n-tab-pane v-if="item.type === 2" :key="index" name="PPT">
                <iframe :src="item.url" width="100%" height="100%" style="height: 600px">
                  This browser does not support PDFs. Please download the PDF to view it:
                  <a href="/test.pdf">Download PDF</a>
                </iframe>
              </n-tab-pane>
              <n-tab-pane v-if="item.type === 3" :key="index" name="实验手册">
                <!-- <iframe :src="item.url" width="100%" height="100%" style="height: 600px">
                  This browser does not support PDFs. Please download the PDF to view it:
                  <a href="/test.pdf">Download PDF</a>
                </iframe> -->
                <wordPer :src="item.url"></wordPer>
              </n-tab-pane>
            </template>
            <!-- v-if="courseData.haveQuestion" -->
            <n-tab-pane v-if="showPaperData" name="课题预览">
              <TablePro
                ref="actionPaperRef"
                :columns="columns"
                :request="loadPaperDataTable"
                :action-column="actionColumn"
                :row-key="row => row.id"
                :scroll-x="1200"
              >
              </TablePro
            ></n-tab-pane>
          </n-tabs>
          <n-tabs>
            <n-tab-pane v-if="!showPaperData && !courseData?.files?.length" :bar-width="0">
              <div style="display: flex; justify-content: center; align-items: center; height: 600px">
                <n-icon size="36" class="cursor-pointer text-gray-400">
                  <n-space style="width: 200px">
                    <ExclamationCircleTwotone></ExclamationCircleTwotone>
                    <div>暂无数据</div>
                  </n-space>
                </n-icon>
              </div>
            </n-tab-pane>
          </n-tabs>
        </n-card>
      </n-layout-sider>
      <n-layout>
        <n-layout-content content-style="padding: 24px;">
          <div>
            <n-space
              vertical
              style="width: 100%; height: 600px; display: flex; justify-content: center; align-items: center"
            >
              <n-image width="100" src="http://124.70.85.180:8086/img/docker-empty.43357460.svg" />
              <n-button type="info"> 开启云端实验 </n-button>
            </n-space>
          </div>
        </n-layout-content>
      </n-layout>
    </n-layout>
    <n-modal
      v-model:show="showModal"
      preset="dialog"
      style="width: 1050px"
      title="确认"
      positive-text="确认"
      negative-text="算了"
    >
      <n-scrollbar ref="scrollRef" style="max-height: 750px">
        <!--  :rules="rules" -->
        <n-form ref="formRef" :model="showFormParams" label-placement="left" :label-width="120" class="m-2 py-4">
          <n-form-item label="试题题干" path="questionName">
            <n-input v-model:value="showFormParams.questionName" disabled />
          </n-form-item>
          <n-form-item label="试题类型" path="type">
            <n-input v-model:value="showFormParams.type" disabled />
          </n-form-item>
          <n-form-item label="难易度" path="type">
            <n-input v-model:value="showFormParams.paperQuestionVo.difficultLevelName" disabled />
          </n-form-item>

          <template v-if="showFormParams.paperQuestionVo.questionTypeName === '单选题'">
            <n-form-item label="试题选项" path="type">
              <n-radio-group :value="showFormParams.paperQuestionVo.questionAnswer" disabled name="radiogroup">
                <n-space vertical>
                  <n-radio
                    v-for="song in showFormParams.paperQuestionVo.questionOption"
                    :key="song.value"
                    :value="song.value"
                  >
                    {{ song.label }}
                  </n-radio>
                </n-space>
              </n-radio-group>
            </n-form-item>
          </template>
          <n-form-item label="知识点" path="type">
            <n-input v-model:value="showFormParams.paperQuestionVo.listPointRelatedName" disabled />
          </n-form-item>
          <n-form-item label="解析" path="questionAnalyse">
            <n-input v-model:value="showFormParams.questionAnalyse" disabled />
          </n-form-item>
        </n-form>
      </n-scrollbar>
    </n-modal>
  </n-card>
</template>
<script setup lang="ts">
import { ref, reactive, h, watchEffect } from 'vue';
import { c, useMessage } from 'naive-ui';
import { ExclamationCircleTwotone } from '@vicons/antd';
import { useCourseStore } from '@/store';
import { getUnitPracticeList } from '@/service';
import { TablePro, TableAction } from '@/components/TablePro';
import playerVideo from './compontent/index.vue';
import wordPer from './compontent/wordPre.vue';
import showPdf from './compontent/showPdf.vue';
import { columns } from './columns';

const { getFiles } = useCourseStore();

const message = useMessage();
const courseData = ref();
watchEffect(async () => {
  courseData.value = getFiles();
  console.log(courseData.value);
  const Param = {
    unitId: courseData.value.unitId,
    size: 15,
    current: 1
  };
  const result = await getUnitPracticeList({ ...Param });
  if (result?.data?.total === 0) {
    showPaperData.value = false;
  }
});
const showPaperData = ref(false);
const loadPaperDataTable = async (res: any) => {
  if (!courseData.value.unitId) {
    showPaperData.value = false;
    return;
  }
  const Param = {
    unitId: courseData.value.unitId,
    pageSize: res.size,
    current: res.current
  };
  const result = await getUnitPracticeList({ ...Param });
  console.log('getUnitPracticeList', result);

  return result.data;
};

const actionColumn = reactive({
  // Table操作列
  width: 20,
  title: '操作',
  key: 'action',
  fixed: 'right',
  render(record: Recordable<any>) {
    return h(TableAction as any, {
      style: 'button',
      actions: [
        {
          label: '详情',
          icon: 'ic:outline-delete-outline',
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onClick: handleShow.bind(null, record)
        }
      ]
    });
  }
});
const showModal = ref(false);
const showFormParams = reactive({
  questionName: '',
  type: '',
  questionAnalyse: '',
  paperQuestionVo: {}
});
const getKey = value => {
  const index = value.indexOf(':'); // 取到：的索引
  const Astr = value.substr(0, index);
  return Astr;
};
const handleShow = (record: Recordable) => {
  console.log('123', record);
  if (!record.paperQuestionVo) {
    message.error('未配置题目详情数据');
  }
  showFormParams.questionName = record.paperQuestionVo.questionName;
  showFormParams.type = record.questionTypeName;
  showFormParams.questionAnalyse = record.paperQuestionVo.questionAnalyse;
  if (record.paperQuestionVo.questionTypeName === '单选题') {
    if (typeof record.paperQuestionVo.questionOption === 'string') {
      const questionOption = JSON.parse(record.paperQuestionVo.questionOption).map(e => ({
        value: getKey(e),
        label: e
      }));
      record.paperQuestionVo.questionOption = questionOption;
    }
  }
  // let listPointRelatedName = '';
  const { listPointRelatedName } = record.paperQuestionVo;
  // console.log(listPointRelatedName);
  // console.log(listPointRelatedName.join(','));
  // console.log(typeof showFormParams.paperQuestionVo.listPointRelatedName);
  // for (let i = 0; i < showFormParams.paperQuestionVo.listPointRelatedName.length; i++) {
  //   console.log(showFormParams.paperQuestionVo.listPointRelatedName[i]);
  //   listPointRelatedName += showFormParams.paperQuestionVo.listPointRelatedName[i];
  // }
  showFormParams.paperQuestionVo = record.paperQuestionVo;
  showFormParams.paperQuestionVo.listPointRelatedName = listPointRelatedName.join(',');
  // if(listPointRelatedName)
  showModal.value = true;
};
</script>
<style scoped>
:deep(.n-layout--static-positioned) {
  height: 100% !important;
}
</style>
