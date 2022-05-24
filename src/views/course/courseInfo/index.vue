<!--
 * @Author: ZHENG
 * @Date: 2022-05-04 17:20:30
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-23 22:12:49
 * @FilePath: \work\src\views\course\courseInfo\index.vue
 * @Description: 课程页面
-->
<template>
  <n-card :bordered="false">
    <n-space vertical :size="30">
      <n-button type="primary" @click="addChapter"> 新建章节 </n-button>
      <n-data-table
        :row-key="row => row.id"
        :columns="columns"
        :style="{ height: `600px` }"
        flex-height
        :cascade="false"
        :data="data"
      />
    </n-space>

    <addOrEditChapterModal ref="addOrEditChapterModalRef" @reset="loadDataTable"></addOrEditChapterModal>
    <delChapterModal ref="delChapterModalRef" @reset="loadDataTable"></delChapterModal>
    <addUnitModal ref="addUnitModalRef" @reset="loadDataTable"></addUnitModal>
    <delUnitModal ref="delUnitModalRef" @reset="loadDataTable"></delUnitModal>
  </n-card>
</template>
<script lang="ts" setup>
import { ref, h, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCourseStore } from '@/store';
import { getPreview } from '@/service';
import { TableAction } from '@/components/TablePro';
import addOrEditChapterModal from './components/addOrEditChapterModal.vue';
import delChapterModal from './components/delChapterModal.vue';
import addUnitModal from './components/addUnitModal.vue';
import delUnitModal from './components/delUnitModal.vue';

// 刷新功能
const courseStore = useCourseStore();
// 展示Form
const { coutesInfoId } = storeToRefs(courseStore);

// 查询表格数据
type RowData = {
  id: string;
  label: string;
  children?: RowData[];
};
const data: RowData[] = ref([]);
const loadDataTable = async () => {
  // coutesInfoId.value
  const { data: result } = await getPreview({ id: coutesInfoId.value });
  for (let i = 0; i < result.children.length; i++) {
    if (result.children[i].children.length) {
      for (let j = 0; j < result.children[i].children.length; j++) {
        // console.log(result.children[i].children);
        result.children[i].children[j].id = result.children[i].id;
      }
    }
  }
  data.value = result.children;
};

onMounted(() => {
  loadDataTable();
});

const addOrEditChapterModalRef = ref();
/**
 * @author: ZHENG
 * @description: 新增章节
 */
const addChapter = () => {
  addOrEditChapterModalRef.value.showAddModal();
};
/**
 * @author: ZHENG
 * @description: 编辑章节
 * @param 当前行数据
 * @return {*}
 */
const handleChapteEdit = (record: Recordable) => {
  addOrEditChapterModalRef.value.showEditModal(record);
};

/**
 * @author: ZHENG
 * @description: 删除章节
 * @return {*}
 */
const delChapterModalRef = ref();
const handleChapterDelete = (record: Recordable) => {
  delChapterModalRef.value.showDelModal(record);
};

const addUnitModalRef = ref();
const delUnitModalRef = ref();
/**
 * @author: ZHENG
 * @description: 新增课时,编辑和新增逻辑有些不同，拆分出去方便用
 * @return {*}
 */
const handleUnitAdd = (record: Recordable) => {
  addUnitModalRef.value.showAddModal(record);
};
const handleUnitEdit = (record: Recordable) => {
  addUnitModalRef.value.showEditUnitModal(record);
};
const handleUnitDelete = (record: Recordable) => {
  delUnitModalRef.value.showDelModal(record);
};
const handleQuConfig = (record: Recordable) => {
  addUnitModalRef.value.showEditUnitQuModal(record);
};

const columns = [
  // {
  //   title: '序号',
  //   key: 'tableId',
  //   width: 80,
  //   render(row, index) {
  //     return h('h1', index + 1);
  //   }
  // },
  {
    title: '名称',
    key: 'label',
    width: 120
  },
  // {
  //   title: '类型',
  //   key: 'type',
  //   width: 50,
  //   render(row) {
  //     if (row.type === 2) {
  //       return h('p', '课时');
  //     }
  //     return h('p', '章节');
  //   },
  //   className: 'age'
  // },
  {
    title: '备注',
    key: 'note',
    width: 120
  },
  {
    title: '操作',
    key: 'action',
    width: 120,
    fixed: 'right',
    render(record: Recordable<any>) {
      if (record.type === 2) {
        return h(TableAction as any, {
          style: 'button',
          actions: [
            {
              label: '删除课时',
              icon: 'ic:outline-delete-outline',
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              onClick: handleUnitDelete.bind(null, record)
            },
            {
              label: '编辑课时',
              onClick: handleUnitEdit.bind(null, record)
            },
            {
              label: '配置课题',
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              onClick: handleQuConfig.bind(null, record)
            }
          ]
        });
      }
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '删除章节',
            icon: 'ic:outline-delete-outline',
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            onClick: handleChapterDelete.bind(null, record)
          },
          {
            label: '编辑章节',
            onClick: handleChapteEdit.bind(null, record)
          },
          {
            label: '新建课时',
            onClick: handleUnitAdd.bind(null, record)
          }
        ]
      });
    }
  }
];

// const updateisShowForm = () => {
//   isShowForm.value = false;
// };

// const formParams = reactive({
//   type: 1,
//   label: '',
//   note: '',
//   chapterId: 0,
//   unitId: 0
// });

// // 菜单后缀
// // eslint-disable-next-line consistent-return
// const renderSuffix = ({ option }: { option: TreeOption }) => {
//   if (option.type === 0) {
//     return [
//       h('div', [
//         h(
//           'NButton',
//           {
//             props: {
//               type: 'primary',
//               size: 'small'
//             },
//             style: { marginRight: '5px' },
//             onclick: () => {
//               window.event.stopPropagation();
//               // eslint-disable-next-line @typescript-eslint/no-use-before-define
//               selectedTreeAdd('新建章节', option);
//             }
//           },
//           {
//             default: () => '新建章节'
//           }
//         )
//       ])
//     ];
//   }
//   if (option.type === 1) {
//     return [
//       h('div', [
//         h(
//           'NButton',
//           {
//             props: {
//               type: 'primary',
//               size: 'small'
//             },
//             style: { marginRight: '5px' },
//             onclick: () => {
//               window.event.stopPropagation();
//               // eslint-disable-next-line @typescript-eslint/no-use-before-define
//               selectedTreeAdd('新建课时', option);
//             }
//           },
//           {
//             default: () => '新建课时'
//           }
//         ),
//         h(
//           'NButton',
//           {
//             props: {
//               type: 'primary',
//               size: 'small'
//             },
//             style: { marginRight: '5px' },
//             onclick: () => {
//               window.event.stopPropagation();
//               // eslint-disable-next-line @typescript-eslint/no-use-before-define
//               selectedTreeAdd('编辑', option);
//             }
//           },
//           {
//             default: () => '编辑章节'
//           }
//         )
//       ])
//     ];
//   }
//   if (option.type === 2) {
//     return [
//       h('div', [
//         h(
//           'NButton',
//           {
//             props: {
//               type: 'primary',
//               size: 'small'
//             },
//             style: { marginRight: '5px' },
//             onclick: () => {
//               window.event.stopPropagation();
//               // eslint-disable-next-line @typescript-eslint/no-use-before-define
//               selectedTreeAdd('编辑', option);
//             }
//           },
//           {
//             default: () => '编辑课时'
//           }
//         )
//       ])
//     ];
//   }
// };
// //  设置两个方法 新增房租组
// const selectedTreeAdd = (type: string, option: Array<TreeOption | null>) => {
//   // console.log(editFormRef);
//   isShowForm.value = true;
//   // addOrEdit.value = true;
//   resetForm(formParams, ['type']);
//   if (type === '新建章节' || type === '新建课时') {
//     addOrEdit.value = true;
//     formParams.type = type === '新建章节' ? 1 : 2;
//     if (formParams.type === 1) {
//       console.log('新建章节', option);
//     } else {
//       // 新建课时
//       console.log('新建课时', option);
//       formParams.chapterId = option?.id;
//     }
//   } else if (type === '编辑') {
//     addOrEdit.value = false;
//     formParams.type = option?.type === 1 ? 1 : 2;
//     if (option?.type === 1) {
//       console.log(option);
//       formParams.chapterId = option?.id;
//       formParams.label = option?.label;
//       formParams.note = option?.note;
//     } else {
//       console.log(option);
//       formParams.chapterId = option?.chapterId;
//       formParams.id = option?.id;
//       formParams.label = option?.label;
//       formParams.note = option?.note;
//       editFormRef.value.reloadPaperTable();
//       // reloadPaperTable();
//     }
//   }
// };
</script>
<style scoped>
:deep(.age) {
  display: flex !important;
}
</style>
