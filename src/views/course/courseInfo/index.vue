<!--
 * @Author: ZHENG
 * @Date: 2022-05-04 17:20:30
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-08 18:12:52
 * @FilePath: \work\src\views\course\courseInfo\index.vue
 * @Description: 课程页面
-->
<template>
  <n-card :bordered="false" :title="courseName">
    <template #header>
      <n-space
        >{{ courseName }}
        <p class="cursor-pointer text-gray-400" style="font-size: 12px; margin-top: 5px">
          <n-icon size="12"> <BookOutlined /> </n-icon>{{ sumChapter }} 章节
        </p>
        <p class="cursor-pointer text-gray-400" style="font-size: 12px; margin-top: 5px">
          <n-icon size="12"> <ClockCircleTwotone /> </n-icon>{{ sumUnit }} 课时
        </p>
      </n-space>
    </template>
    <n-space vertical :size="30">
      <n-button type="primary" @click="addChapter"
        ><template #icon>
          <n-icon>
            <PlusOutlined />
          </n-icon>
        </template>
        新建章节
      </n-button>
      <n-data-table
        :row-key="(row) => row.id"
        :columns="columns"
        :style="{ height: `600px` }"
        flex-height
        :cascade="false"
        :data="data"
        :default-expanded-row-keys="expandedRow"
      />
    </n-space>

    <addOrEditChapterModal
      ref="addOrEditChapterModalRef"
      @reset="loadDataTable"
    ></addOrEditChapterModal>
    <delChapterModal ref="delChapterModalRef" @reset="loadDataTable"></delChapterModal>
    <addUnitModal ref="addUnitModalRef" @reset="loadDataTable"></addUnitModal>
    <delUnitModal ref="delUnitModalRef" @reset="loadDataTable"></delUnitModal>
    <changeSort ref="changeSortRef" @reset="loadDataTable"></changeSort>
  </n-card>
</template>
<script lang="ts" setup>
import { ref, h, onMounted, watchEffect, computed } from "vue";
import { BookOutlined, ClockCircleTwotone } from "@vicons/antd";
import { storeToRefs } from "pinia";
import { PlusOutlined } from "@vicons/antd";
import { useCourseStore } from "@/store";
import { getPreview } from "@/service";
import { useMessage } from "naive-ui";
import { TableAction } from "@/components/TablePro";
import addOrEditChapterModal from "./components/addOrEditChapterModal.vue";
import delChapterModal from "./components/delChapterModal.vue";
import addUnitModal from "./components/addUnitModal.vue";
import delUnitModal from "./components/delUnitModal.vue";
import changeSort from "./components/changeSort.vue";
// 刷新功能
const courseStore = useCourseStore();
const message = useMessage();
// 展示Form
const { coutesInfoId } = storeToRefs(courseStore);
const courseName = ref();
// 查询表格数据
type RowData = {
  id: string;
  label: string;
  children?: RowData[];
};
const data: RowData[] = ref([]);
const sumChapter = computed(() => {
  return data?.value.length;
});
const sumUnit = computed(() => {
  let sumUnitNum = 0;
  for (let i = 0; i < data?.value.length; i++) {
    console.log(data.value[i].children);
    sumUnitNum = sumUnitNum + data.value[i].children.length;
  }
  return sumUnitNum;
});
const loadDataTable = async () => {
  // coutesInfoId.value
  const { data: result } = await getPreview({ id: coutesInfoId.value });
  courseName.value = result.courseName;
  for (let i = 0; i < result.children.length; i++) {
    if (result.children[i].children.length) {
      for (let j = 0; j < result.children[i].children.length; j++) {
        // console.log(result.children[i].children);
        result.children[i].children[j].id = result.children[i].id;
      }
    }
  }
  for (let i = 0; i < result?.children?.length; i++) {
    // console.log(result.children[i].id);
    expandedRow.value.push(result.children[i].id);
  }
  data.value = result.children;
};

watchEffect(() => {
  loadDataTable();
});

const expandedRow = ref([1]);
const addOrEditChapterModalRef = ref();
/**
 * @author: ZHENG
 * @description: 新增章节
 */
const addChapter = () => {
  addOrEditChapterModalRef.value.showAddModal(data.value);
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
  if (record.children.length) {
    return message.warning("当前章节下含有课时内容，无法删除");
  }
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
const changeSortRef = ref();
const handleSort = (record: Recordable) => {
  changeSortRef.value.showChangeSortModal(record);
};
const columns = [
  {
    title: "章节名称/课时名称",
    key: "label",
    width: 150,
    render(row: { label: string; shortId: number; children: Object }, index) {
      if (row.children) {
        const sumLength = row.children?.length || 0;
        return h("span", [
          h("span", `第${row.shortId}章节 ${row.label}`),
          h(
            "span",
            {
              style: {
                fontSize: "12px",
                color: "rgb(204, 204, 204)",
                marginLeft: "5px",
              },
            },
            { default: () => `(含${sumLength}个课时)` }
          ),
        ]);
      } else {
        return h("span", [h("span", `第${row.shortId}课时 ${row.label}`)]);
      }
    },
  },
  {
    title: "描述",
    key: "note",
    width: 120,
  },
  {
    title: "序号",
    key: "tableId",
    width: 50,
    render(row, index) {
      if (row.children) {
        return h("h1", `章节序号：${row.shortId}`);
      } else {
        return h("h1", `课时序号：${row.shortId}`);
      }
    },
  },
  {
    title: "操作",
    key: "action",
    width: 120,
    fixed: "right",
    render(record: Recordable<any>) {
      if (record.type === 2) {
        return h(TableAction as any, {
          style: "button",
          actions: [
            {
              label: "删除课时",
              icon: "ic:outline-delete-outline",
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              onClick: handleUnitDelete.bind(null, record),
            },
            {
              label: "编辑课时",
              onClick: handleUnitEdit.bind(null, record),
            },
            {
              label: "课时排序",
              onClick: handleSort.bind(null, record),
            },
            {
              label: "配置习题",
              // eslint-disable-next-line @typescript-eslint/no-use-before-define
              onClick: handleQuConfig.bind(null, record),
            },
          ],
        });
      }
      return h(TableAction as any, {
        style: "button",
        actions: [
          {
            label: "删除章节",
            icon: "ic:outline-delete-outline",
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            onClick: handleChapterDelete.bind(null, record),
          },
          {
            label: "编辑章节",
            onClick: handleChapteEdit.bind(null, record),
          },
          {
            label: "章节排序",
            onClick: handleSort.bind(null, record),
          },
          {
            label: "新建课时",
            onClick: handleUnitAdd.bind(null, record),
          },
        ],
      });
    },
  },
];
</script>
<style scoped>
:deep(.age) {
  display: flex !important;
}
</style>
