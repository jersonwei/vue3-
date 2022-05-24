<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 14:33:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-20 08:46:54
 * @FilePath: \work\src\views\course\courseMark\index.vue
 * @Description:
-->
<template>
  <n-card :bordered="false">
    <FormPro @register="register" @submit="handleSubmit" @reset="reloadTable"> </FormPro>
    <TablePro
      ref="actionRef"
      :columns="columns"
      :request="loadDataTable"
      :row-key="row => row.id"
      :action-column="actionColumn"
      :scroll-x="1090"
    />
  </n-card>
</template>

<script lang="ts" setup>
import { h, reactive, ref } from 'vue';
// import { useRouter } from 'vue-router';
import { useRouterPush } from '@/composables';
import { getCourseGradeVo } from '@/service';
import { TablePro, TableAction } from '@/components/TablePro';
import { FormPro, useForm } from '@/components/FormPro';
import { columns } from './columns';
import { schemas } from './schemas';

const { routerPush } = useRouterPush();
const actionRef = ref(); // 表格

const actionColumn = reactive({
  width: 70,
  title: '操作',
  key: 'action',
  fixed: 'right',
  render(record: Recordable<any>) {
    return h(TableAction as any, {
      style: 'button',
      actions: [
        {
          label: '报告成绩管理',
          icon: 'ic:outline-delete-outline',
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onClick: handleReporte.bind(null, record),
          // 根据业务控制是否显示 isShow 和 auth 是并且关系
          ifShow: () => {
            return true;
          },
          // 根据权限控制是否显示: 有权限，会显示，支持多个
          auth: ['basic_list']
        },
        {
          label: '测评成绩管理',
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onClick: handlePractice.bind(null, record),
          ifShow: () => {
            return true;
          },
          auth: ['basic_list']
        }
      ]
    });
  }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loadDataTable = async (res: any) => {
  const params = {
    pageSize: res.size,
    current: res.current
  };
  const result = await getCourseGradeVo({ ...params });
  return result.data;
};

/**
 * @author: ZHENG
 * @description: 刷新
 */
const reloadTable = () => {
  actionRef.value.reload();
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleReporte = (record: Recordable) => {
  console.log('点击了报告', record);
  routerPush({ name: 'course_courseReport', query: { id: record.courseId, courseName: record.courseName } });
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handlePractice = (record: Recordable) => {
  // console.log('点击了测试', record);
  routerPush({ name: 'course_coursePractice', query: { id: record.courseId, courseName: record.courseName } });
};
// , {}
const [register] = useForm({
  // 查询FORM
  gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
  labelWidth: 80,
  schemas
});
</script>
<style scoped></style>
