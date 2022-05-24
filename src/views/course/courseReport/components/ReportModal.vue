<!--
 * @Author: ZHENG
 * @Date: 2022-05-17 14:44:33
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-21 18:38:58
 * @FilePath: \work\src\views\course\courseReport\components\ReportModal.vue
 * @Description:
-->
<!--
 * @Author: ZHENG
 * @Date: 2022-05-12 17:34:13
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-14 15:04:48
 * @FilePath: \e-class-admin\src\views\course\courseMgt\components\delModal.vue
 * @Description:
-->
<template>
  <!-- <n-modal v-model:show="showDelModal" :mask-closable="false" preset="dialog" type="success" title="确认">
    123
  </n-modal> -->
  <n-modal
    v-if="showModal"
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    :style="bodyStyle"
    :header-style="headerSyle"
    :title="`实验报告${reportData.testReport.testName}`"
    size="huge"
    :bordered="false"
    :segmented="segmented"
  >
    <n-space justify="end">
      <n-gradient-text v-if="reportData.testScore" :size="24" type="success">
        {{ reportData.testScore }}分</n-gradient-text
      >
    </n-space>
    <n-space justify="space-between">
      <text> 学生学号：{{ reportData.stuId }} </text>
      <text> 学生姓名：{{ reportData.stuName }} </text>
      <text> 性别：男 </text>
      <text> 指导老师：{{ reportData.createrName }} </text>
      <text> 实验日期：{{ reportData.testReport.testDate }} </text>
    </n-space>
    <n-space vertical>
      <n-card title="一、实验目的" size="small">
        {{ reportData.testReport.testGoal }}
      </n-card>
      <n-card title="二、实验内容" size="small">
        {{ reportData.testReport.testContent }}
      </n-card>
      <n-card title="三、实验步骤" size="small">
        {{ reportData.testReport.testStep }}
      </n-card>
      <n-card title="四、实验名称" size="small"> {{ reportData.testReport.testQuestion }} </n-card>
      <n-card title="五、思考题" size="small"> {{ reportData.testReport.testThink }} </n-card>
      <n-card title="六、实验心得" size="small"> {{ reportData.testReport.testExperience }} </n-card>
    </n-space>
    <template #footer>
      <template v-if="reportData.testScore">
        <n-space justify="center">
          <n-button @click="printOut('.custom-card')">导出报告</n-button>
        </n-space>
      </template>
      <template v-else>
        <n-space justify="center">
          <text>教师打分：</text>
          <n-input-number v-model:value="mark" clearable></n-input-number>
          <n-button type="primary" @click="marking">提交评分</n-button>
          <n-button type="error" @click="returnReport">退回报告!</n-button>
        </n-space>
      </template>
    </template>
  </n-modal>
</template>
<script lang="ts" setup>
import { ref, toRefs } from 'vue';
import { useMessage } from 'naive-ui';
import html2canvas from 'html2canvas';
import { editTestReport } from '@/service';

const message = useMessage();
const showModal = ref(false);
const headerSyle = {
  height: '50px'
};
const bodyStyle = {
  width: '1000px'
};
const segmented = {
  content: 'soft',
  footer: 'soft'
} as const;

interface ReportDataType {
  creater: number;
  id: number;
  returned: number;
  stuId: string;
  testContent: string;
  testDate: string;
  testExperience: string;
  testGoal: string;
  testName: string;
  testQuestion: string;
  testScore: number;
  testStep: string;
  testThink: string;
  unitId: number;
}
interface ReportData {
  createrName: string;
  stuId: string;
  stuName: string;
  testReport: ReportDataType;
  testScore: number;
}
interface Props {
  reportData: ReportData;
}
const props = defineProps<Props>();

const { reportData } = toRefs(props);
const emit = defineEmits(['reset']); // 定义一个变量来接收父组件传来的方法
const mark = ref(0);
/**
 * @author: ZHENG
 * @description: 评分
 */
const marking = async () => {
  const params = {
    id: reportData.value.testReport.id,
    // returned: 0,
    testScore: mark.value
  };
  const result = await editTestReport(params);
  if (result.error) {
    message.success('评分完成');
  }
  showModal.value = false;
  emit('reset');
};

/**
 * @author: ZHENG
 * @description: 退回报告
 */
const returnReport = async () => {
  const params = {
    id: reportData.value.testReport.id,
    returned: 1,
    testScore: 0
  };
  const result = await editTestReport(params);
  if (result.error) {
    message.success('退回完成完成');
  }
  showModal.value = false;
  emit('reset');
};

const dataURLToBlob = dataurl => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
};

const downloadResult = name => {
  const canvasID = document.querySelector('.custom-card');
  // .body;

  // n-card__content
  console.log(canvasID);
  const a = document.createElement('a');

  html2canvas(canvasID, {
    scale: 2
  }).then(canvas => {
    const dom = document.body.appendChild(canvas);

    dom.style.display = 'flex';
    a.style.display = 'none';

    document.body.removeChild(dom);

    const blob = dataURLToBlob(dom.toDataURL('image/png'));

    a.setAttribute('href', URL.createObjectURL(blob));

    a.setAttribute('download', `${name}.png`);

    document.body.appendChild(a);

    a.click();

    URL.revokeObjectURL(blob);

    document.body.removeChild(a);
  });
};

const printOut = name => {
  // 个人观察只是截取可见范围以及以下的区域，所以先将滚动条置顶
  // $(window).scrollTop(0); // jQuery 的方法
  document.body.scrollTop = 0; // IE的
  document.documentElement.scrollTop = 0; // 其他
  downloadResult(name);
};

defineExpose({ showModal });
</script>
