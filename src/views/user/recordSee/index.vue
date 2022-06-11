<template>
  <n-card>
    <div class="top" style="display: flex">
      <div class="img" style="width: 140px; height: 140px; margin: 20px">
        <n-avatar
          style="width: 100px; height: 100px"
          round
          :size="48"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        />
      </div>
      <div class="grid" style="width: 900px">
        <n-grid x-gap="13" :cols="3">
          <n-gi>
            <div style="font-weight: 700; font-size: 14px">姓名:</div>
          </n-gi>
          <n-gi>
            <div style="font-weight: 700; font-size: 14px">性别:</div>
          </n-gi>
          <n-gi>
            <div style="font-weight: 700; font-size: 14px">学号:</div>
          </n-gi>
          <n-gi>
            <div style="font-weight: 700; font-size: 14px">院系:</div>
          </n-gi>
          <n-gi>
            <div style="font-weight: 700; font-size: 14px">专业:</div>
          </n-gi>
          <n-gi>
            <div style="font-weight: 700; font-size: 14px">班级:</div>
          </n-gi>
          <n-gi>
            <div style="font-weight: 700; font-size: 14px">手机号:</div>
          </n-gi>
          <n-gi>
            <div style="font-weight: 700; font-size: 14px">邮箱:</div>
          </n-gi>
          <n-gi>
            <div style="font-weight: 700; font-size: 14px">身份证号:</div>
          </n-gi>
          <n-gi>
            <div style="font-weight: 700; font-size: 14px">地址:</div>
          </n-gi>
        </n-grid>
      </div>
    </div>
    <n-tabs type="segment">
      <n-tab-pane name="chap1" tab="参加课程">
        <course></course>
      </n-tab-pane>
      <n-tab-pane name="chap2" tab="考试成绩">
        <examManager></examManager>
      </n-tab-pane>
      <n-tab-pane name="chap3" tab="课程笔记" :request="loadDataTable">
        <classNote></classNote>
      </n-tab-pane>
      <n-tab-pane name="chap4" tab="课程互动">4</n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup lang="ts">
// import { useRouterPush } from "@/composables";
import examManager from "./component/examManager/exam.vue";
import course from "./component/course/course.vue";
import classNote from "./component/classNote.vue";
import { getNotesShowInfo } from "@/service";
const loadDataTable = async (res: any) => {
  const Param = {
    pageSize: res.size,
    current: res.current,
  };
  const getNotesShowInfoList = await getNotesShowInfo(Param);
  console.log(getNotesShowInfoList);
};
// const formParams = {
//   username: "",
// };
// const { routerPush } = useRouterPush();
// 查看成绩
// const reportSee = () => {
//   routerPush({ name: "course_courseMark" });
// };
</script>

<style lang="scss" scoped>
.img {
  ::v-deep(.n-form-item) {
    width: 280px;
    height: 30px;
    ::v-deep(.n-form-item-label) {
      width: 80px;
      height: 67px;
      line-height: 67px;
    }
  }
}
.info {
  display: flex;
}

.grid {
  div {
    line-height: 45px;
  }
}
</style>
