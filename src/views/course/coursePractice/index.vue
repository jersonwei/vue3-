<!--
 * @Author: ZHENG
 * @Date: 2022-05-17 10:52:29
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-24 17:05:21
 * @FilePath: \work\src\views\course\coursePractice\index.vue
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
          :check-strategy="'child'"
          :show-path="true"
          remote
          :on-load="handleLoad"
        />
      </template>
    </FormPro>
    <TablePro
      v-if="unitId"
      ref="actionRef"
      :columns="columns"
      :request="loadDataTable"
      :row-key="row => row.id"
      :scroll-x="1090"
    >
      <template #tableTitle>
        <n-dropdown trigger="hover" :options="downloadOptions" @select="handleSelect">
          <n-button
            ><template #icon>
              <n-icon>
                <VerticalAlignBottomOutlined />
              </n-icon>
            </template>
            导出成绩</n-button
          >
        </n-dropdown>
      </template>
    </TablePro>
    <practiceModal ref="PracticeRef" :unit-id="unitId" :practice-data="PracticeData"></practiceModal>
  </n-card>
</template>

<script lang="ts" setup>
import { ref, h, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { CascaderOption, NAvatar, NButton } from 'naive-ui';
import { VerticalAlignBottomOutlined } from '@vicons/antd';
import { getChapterList, getUnitList, getStuList, unitpracticeanswersExport, download } from '@/service';
import { getServiceEnv } from '@/utils';
import { FormPro, useForm } from '@/components/FormPro';
import { TablePro } from '@/components/TablePro';
import { schemas } from './schemas';
import practiceModal from './components/practiceModal.vue';

const actionRef = ref(); // 表格, {}
const route = useRoute(); // 前一个页面会带过来，课程ID和课程名
const courseName = ref('');

const [register, { setFieldsValue, getFieldsValue }] = useForm({
  // 查询FORM
  gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
  labelWidth: 80,
  schemas
});
const options = ref([]);

// 级联效果查询逻辑
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getOptions(depth = 3, iterator = 1, prefix = '') {
  if (iterator === 1) {
    const params = {
      courseId: route.query.id,
      classId: route.query.classId
    };
    const { data: result } = await getChapterList(params);
    console.log(result);
    const newList = result.map((item: { id: number; chapterName: string }) => {
      return { value: item.id, label: item.chapterName, depth: 1, isLeaf: false };
    });
    options.value = newList;
    console.log(newList);
  }
}

async function getChildren(option: CascaderOption) {
  const params = {
    chapterId: option.value
  };
  const { data: result } = await getUnitList(params);
  const newList = result.map((item: { unitId: any; unitName: any }) => {
    return { value: `${option.value}-${item.unitId}`, label: item.unitName, isLeaf: 1 };
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
  options.value = [];
  unitId.value = '';
  await getOptions();
  await getChildren(options.value[0]);
  unitId.value = options.value[0].children[0].value;
  const params = {
    unitId: unitId.value
  };
  setFieldsValue(params);
};
watchEffect(() => {
  if (route.query.courseName && route.query.classId) {
    courseName.value = route.query.courseName;
    setTimeout(() => {
      getdefaultValue();
    }, 500);
  }
});
const handleLoad = (option: CascaderOption) => {
  return new Promise<void>(resolve => {
    window.setTimeout(() => {
      getChildren(option);
      resolve();
    }, 1000);
  });
};

const reloadTable = () => {
  actionRef.value.reload();
};
const getUnitId = (Id: string) => {
  const i = Id.indexOf('-');
  const subUnitId = Id.substring(i + 1);
  return parseInt(subUnitId, 10);
};
const formData = ref({});
const handleSubmit = (values: Recordable) => {
  formData.value = {
    unitId: getUnitId(values.unitId),
    stuName: values.stuName
  };
  reloadTable();
};

const loadDataTable = async (res: any) => {
  let Param = {};
  // if (!formData.value?.unitId) {
  Param = {
    unitId: getUnitId(unitId.value),
    classId: route.query.classId,
    pageSize: res.size,
    current: res.current
  };
  // } else {
  //   Param = {
  //     pageSize: res.size,
  //     current: res.current
  //   };
  // }
  console.log(formData.value);
  const result = await getStuList({ ...formData.value, ...Param });
  return result.data;
};
const downloadOptions = [
  {
    label: '导出当前章节成绩',
    key: 'chapter'
  },
  {
    label: '导出当前课时成绩',
    key: 'unit'
  }
];
const handleSelect = async (key: string | number) => {
  if (key === 'chapter') {
    console.log(getFieldsValue(), key);
    const AndId = getFieldsValue().unitId;
    const idIndex = AndId.indexOf('-');
    const chapterId = AndId.substring(0, idIndex); // 当前章节ID
    const params = {
      classId: route.query.classId,
      features: 'all'
    };
    const result = await unitpracticeanswersExport(chapterId, params);
    console.log(result);
    download(result, '章节成绩.xls');
  } else {
    const params = {
      classId: route.query.classId,
      features: 'one'
    };
    const result = await unitpracticeanswersExport(unitId.value, params);
    download(result, '课时成绩.xls');
  }
};

const result = getServiceEnv();
const columns = [
  {
    title: '序号',
    key: 'tableId',
    width: 80,
    render(row, index) {
      return h('h1', index + 1);
    }
  },
  {
    title: '学号',
    key: 'idCard',
    width: 120
  },
  {
    title: '头像',
    key: 'avatar',
    width: 80,
    render(row: { avatar: any }) {
      return h(NAvatar, {
        size: 48,
        src: result + row.avatar
      });
    }
  },
  {
    title: '姓名',
    key: 'userName',
    width: 100
  },
  {
    title: '实验测评',
    key: 'unitPracticeAnswers',
    width: 100,
    render(row: Recordable<any>) {
      if (row.unitPracticeAnswers) {
        return h(
          NButton,
          {
            props: {
              type: 'primary',
              size: 'small'
            },
            style: { marginRight: '5px' },
            onclick: () => {
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              showPractice(row);
            }
          },
          {
            default: () => '测评报告'
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
          style: { marginRight: '5px' },
          onclick: () => {
            console.log('123');
            // window.event.stopPropagation();
            // // eslint-disable-next-line @typescript-eslint/no-use-before-define
            // selectedTreeAdd('新建课时', option);
          }
        },
        {
          default: () => '测评报告(未提交)'
        }
      );
    }
  },
  {
    title: '测评评分',
    key: 'totalScore',
    width: 100
  }
];

const PracticeRef = ref();
const PracticeData = ref();
const showPractice = (row: Recordable<any>) => {
  console.log(row);
  PracticeData.value = row;
  PracticeRef.value.showModal = true;
};
</script>

<style scoped lang="sass"></style>
