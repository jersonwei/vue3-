<!--
 * @Author: ZHENG
 * @Date: 2022-05-17 10:52:29
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-26 14:47:45
 * @FilePath: \work\src\views\course\courseReport\index.vue
 * @Description:
-->
<template>
  <n-card :title="courseName" :bordered="false">
    <FormPro @register="register" @submit="handleSubmit" @reset="reloadTable">
      <template #unitIdSlot="{ model, field }">
        <n-cascader
          v-model:value="model[field]"
          placeholder="请选择课时"
          :options="options"
          :check-strategy="'all'"
          :show-path="true"
          remote
          :on-load="handleLoad"
        /> </template
    ></FormPro>
    <TablePro
      v-if="unitId"
      ref="actionRef"
      :columns="columns"
      :request="loadDataTable"
      :row-key="row => row.id"
      :scroll-x="1090"
    >
      <!-- <template #tableTitle>
        <n-button type="primary" @click="downloadReport">
          <template #icon>
            <n-icon>
              <VerticalAlignBottomOutlined />
            </n-icon>
          </template>
          导出成绩
        </n-button>
      </template> -->
    </TablePro>
    <n-data-table v-else :columns="columns" />
    <ReportModal ref="ReportRef" :report-data="reportData" @reset="reloadTable"></ReportModal>
  </n-card>
</template>

<script lang="ts" setup>
import { ref, h, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { CascaderOption, NButton, useMessage } from 'naive-ui';
import { VerticalAlignBottomOutlined } from '@vicons/antd';
import { getChapterList, getUnitList, getTestReportList } from '@/service';
import { FormPro, useForm } from '@/components/FormPro';
import { TablePro } from '@/components/TablePro';
import { schemas } from './schemas';
import ReportModal from './components/ReportModal.vue';

const message = useMessage();
const actionRef = ref(); // 表格, {}
const route = useRoute(); // 前一个页面会带过来，课程ID和课程名
const courseName = ref('');

const [register, { setFieldsValue, getFieldsValue }] = useForm({
  // 查询FORM
  gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
  labelWidth: 80,
  showAdvancedButton: false,
  schemas
});

// 级联效果查询逻辑
const options = ref([]);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getOptions(depth = 3, iterator = 1, prefix = '') {
  if (iterator === 1) {
    const params = {
      courseId: route.query.id
    };
    const { data: result } = await getChapterList(params);
    console.log(result);
    const newList = result.map((item: { id: number; chapterName: string }) => {
      return { value: item.id, label: item.chapterName, depth: 1, isLeaf: false };
    });
    options.value = newList;
  }
}

async function getChildren(option: CascaderOption) {
  const params = {
    chapterId: option?.value
  };
  const { data: result } = await getUnitList(params);
  console.log(result);
  const newList = result.map((item: { unitId: any; unitName: any }) => {
    return { value: `${option.label}-${item.unitId}`, label: item.unitName, isLeaf: 1 };
  });
  for (let i = 0; i <= (option as { depth: number }).depth; ++i) {
    option.children = newList;
  }
}
/**
 * @author: ZHENG
 * @description: 需求默认选中第一个来获取课时ID，好麻烦。。。
 */
const unitId = ref();
const getdefaultValue = async () => {
  await getOptions();

  if (!options?.value[0]) {
    return; // message.error('当前课程没有课时');
  }
  await getChildren(options.value[0]);
  unitId.value = options.value[0].children[0].value;
  const params = {
    unitId: unitId.value
  };
  setFieldsValue(params);
  reloadTable();
};
watchEffect(() => {
  courseName.value = route.query.courseName;
  unitId.value == '';
  const params = {
    unitId: ''
  };
  setFieldsValue(params);
  setTimeout(() => {
    getdefaultValue();
  }, 500);
});
const handleLoad = (option: CascaderOption) => {
  return new Promise<void>(resolve => {
    window.setTimeout(() => {
      getChildren(option);
      resolve();
    }, 1000);
  });
};

// 刷新table
const reloadTable = () => {
  actionRef.value.reload();
};
// eslint-disable-next-line @typescript-eslint/no-shadow
const getUnitId = (unitId: string) => {
  const i = unitId.indexOf('-');
  const subUnitId = unitId.substring(i + 1);
  return parseInt(subUnitId, 10);
};
const formData = ref({});
// 表格查询数据
const handleSubmit = (values: Recordable) => {
  formData.value = {
    unitId: getUnitId(values.unitId),
    stuName: values.stuName
  };
  if (!formData.value.unitId) {
    return;
  }
  console.log(formData);
  reloadTable();
};
const loadDataTable = async (res: any) => {
  const courseId = parseInt(route.query.id, 10);
  let Param = {};
  if (!formData.value?.unitId) {
    Param = {
      unitId: getUnitId(unitId.value),
      courseId,
      pageSize: res.size,
      current: res.current
    };
  } else {
    Param = {
      courseId,
      pageSize: res.size,
      current: res.current
    };
  }
  if (!Param.courseId) {
    return;
  }

  const result = await getTestReportList({ ...formData.value, ...Param });
  return result.data;
};
const downloadReport = () => {
  console.log('下载');
};

const ReportRef = ref();
const reportData = ref();
const showReport = row => {
  reportData.value = row;
  ReportRef.value.showModal = true;
};
const columns = [
  // {
  //   title: 'id',
  //   key: 'stuId',
  //   width: 100
  // },
  {
    title: '学号',
    key: 'stuId',
    width: 100
  },
  {
    title: '姓名',
    key: 'stuName',
    width: 100
  },
  {
    title: '实验报告',
    key: 'testReport',
    width: 100,
    render(row: Recordable<any>) {
      if (row.testReport) {
        return h(
          NButton,
          {
            props: {
              type: 'primary',
              size: 'small'
            },
            style: { marginRight: '5px' },
            onclick: () => {
              showReport(row);
              // window.event.stopPropagation();
            }
          },
          {
            default: () => '实验报告'
          }
        );
      }

      return h(
        NButton,
        {
          props: {
            type: 'primary',
            size: 'small'
          },
          disabled: true,
          style: { marginRight: '5px' }
        },
        {
          default: () => '实验报告(未提交)'
        }
      );
    }
  },
  {
    title: '报告评分',
    key: 'testScore',
    width: 100
  }
];
</script>

<style scoped lang="scss"></style>
