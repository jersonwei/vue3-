<!--
 * @Author: ZHENG
 * @Date: 2022-05-12 14:54:50
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-06 13:46:06
 * @FilePath: \work\src\views\course\courseDetail\index.vue
 * @Description:
-->
<template>
  <n-space :vertical="true" :size="16">
    <n-card :bordered="false">
      <n-space justify="space-between">
        <n-space vertical :size="20">
          <div style="font-size: 24px">{{ courseDetail.label }}</div>
          <div style="font-size: 18px">
            课程介绍:
            <span style="font-size: 15px">{{ courseDetail.note || "" }}</span>
          </div>
        </n-space>
        <div>
          <n-image width="100" :src="courseDetail.coverPic" preview-disabled />
        </div>
      </n-space>
    </n-card>
    <!-- 明细 -->
    <n-card :bordered="false" size="small" class="shadow-sm rounded-16px">
      <n-tabs
        class="card-tabs"
        default-value="signin"
        size="large"
        animated
        style="margin: 0 -4px"
        pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
      >
        <n-tab-pane name="signin" tab="章节列表" :key="1">
          <n-scrollbar style="max-height: 500px">
            <n-tree
              block-line
              cascade
              :data="treeData"
              key-field="unitId"
              label-field="label"
              :render-suffix="renderSuffix"
              style="max-height: 750px; overflow: hidden"
              :node-props="nodeProps"
              default-expand-all
            />
          </n-scrollbar>
        </n-tab-pane>
        <n-tab-pane v-if="courseOutLine" name="signup" tab="课程大纲">
          <iframe
            :src="`${courseOutLine}`"
            width="100%"
            height="100%"
            style="height: 700px"
          />
          <!-- <iframe
            v-if="item.ext === `.pdf`"
            :src="`${item.url}#toolbar=0`"
            width="100%"
            type="application/pdf"
            height="100%"
            style="height: 700px"
          />
          <iframe
            v-else
            :src="`http://120.79.129.174:8012/onlinePreview?url=${Base64.encode(
              item.url
            )}&officePreviewType=pdf`"
            width="100%"
            type="application/pdf"
            height="100%"
            style="height: 700px"
          /> -->
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </n-space>
</template>
<script lang="ts" setup>
import { h, onMounted, reactive, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { TreeOption, useMessage } from "naive-ui";
// import { FileOutlined } from '@vicons/antd';

import { useCourseStore } from "@/store";
import { getPreview } from "@/service";
import { getServiceEnv } from "@/utils";

const route = useRoute();

const router = useRouter();
const message = useMessage();
const { setFiles, getCourseInfo } = useCourseStore();
const treeData = ref([]);
const courseDetail = reactive({
  label: "",
  note: "",
  coverPic: "",
  courseOutline: "",
});
// eslint-disable-next-line consistent-return
const renderSuffix = ({ option }: { option: TreeOption }) => {
  if (option.type === 2) {
    if (!option.files) {
      return [];
    }
    const model = [];
    for (let i = 0; i < option.files.length; i++) {
      if (option.files[i].type === 0) {
        model.push(
          h(
            "NButton",
            {
              props: {
                type: "primary",
                size: "small",
              },
              style: { marginRight: "5px" },
              onclick: () => {
                console.log("123");
              },
            },
            {
              default: () => "PPT",
            }
          )
        );
      } else if (option.files[i].type === 1) {
        model.push(
          h(
            "NButton",
            {
              props: {
                type: "primary",
                size: "small",
              },
              style: { marginRight: "5px" },
              onclick: () => {
                // window.event.stopPropagation();
                // selectedTreeAdd('新建章节', option);
              },
            },
            {
              default: () => "视频",
            }
          )
        );
      } else if (option.files[i].type === 2) {
        model.push(
          h(
            "NButton",
            {
              props: {
                type: "primary",
                size: "small",
              },
              style: { marginRight: "5px" },
              onclick: () => {
                // window.event.stopPropagation();
                // selectedTreeAdd('新建章节', option);
              },
            },
            {
              default: () => "教学文档",
            }
          )
        );
      } else if (option.files[i].type === 3) {
        model.push(
          h(
            "NButton",
            {
              props: {
                type: "primary",
                size: "small",
              },
              style: { marginRight: "5px" },
              onclick: () => {
                // window.event.stopPropagation();
                // selectedTreeAdd('新建章节', option);
              },
            },
            {
              default: () => "实验手册",
            }
          )
        );
      }
    }
    return [h("div", [model])];
  }
};
const nodeProps = ({ option }: { option: TreeOption }) => {
  if (option.type === 2) {
    return {
      onClick() {
        message.info(`[Click] ${option.label}`);
        console.log(option);
        setFiles(option);
        router.push({ name: "course_coursePreview" });
      },
    };
  }
};
const courseOutLine = ref();
watchEffect(async () => {
  // const id =getCourseInfo()
  const params = {
    id: getCourseInfo(),
  };
  const { data: result } = await getPreview(params);
  console.log(getCourseInfo());
  const http = getServiceEnv();
  treeData.value = result.children;
  courseDetail.label = result.label;
  courseDetail.note = result.note;
  courseDetail.coverPic = `${http}${result.coverPic}`;
  courseOutLine.value = `${http}${result.courseOutline}`;
  // const lineType = result.courseOutline.substring(result.courseOutline.length - 4);
  // const url = `${http}${result.courseOutline}`;
  // if (lineType === ".pdf") {
  //   courseDetail.courseOutline = url;
  // } else {
  //   courseDetail.courseOutline = `http://120.79.129.174:8012/onlinePreview?url=${Base64.encode(
  //     url
  //   )}&officePreviewType=pdf`;
  // }
  setTimeout(() => {
    console.log(previewMd.value);
  }, 2000);
  console.log(previewMd.value);
});
const handleLoad = (option: CascaderOption) => {
  return new Promise<void>((resolve) => {
    window.setTimeout(() => {
      getChildren(option);
      resolve();
    }, 500);
  });
};
</script>
<style scoped>
:deep(.n-tree-node-content__text) {
  font-size: 16px !important;
  line-height: 30px !important;
}
</style>
