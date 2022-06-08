<template>
  <n-card>
    <n-form class="record" :label-width="160">
      <n-form-item>
        <n-image
          class="img"
          width="100"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        ></n-image>
      </n-form-item>
      <div class="info">
        <n-form-item label="姓名:">
          <n-button text>张三</n-button>
        </n-form-item>
        <n-form-item label="性别:">
          <n-button text>张三</n-button>
        </n-form-item>
        <n-form-item label="学号:">
          <n-button text>张三</n-button>
        </n-form-item>
        <n-form-item label="院系:">
          <n-button text>张三</n-button>
        </n-form-item>
        <n-form-item label="专业:">
          <n-button text>张三</n-button>
        </n-form-item>
        <n-form-item label="班级:">
          <n-button text>张三</n-button>
        </n-form-item>
        <n-form-item label="手机号:">
          <n-button text>张三</n-button>
        </n-form-item>
        <n-form-item label="邮箱:">
          <n-button text>张三</n-button>
        </n-form-item>
        <n-form-item label="身份证号:">
          <n-button text>张三</n-button>
        </n-form-item>
        <n-form-item label="地址:">
          <n-button text>张三</n-button>
        </n-form-item>
      </div>
    </n-form>
    <n-tabs type="segment">
      <n-tab-pane name="chap1" tab="参加课程">
        <course></course>
      </n-tab-pane>
      <n-tab-pane name="chap2" tab="考试成绩">2</n-tab-pane>
      <n-tab-pane name="chap3" tab="课程笔记">3</n-tab-pane>
      <n-tab-pane name="chap4" tab="课程互动">4</n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup lang="ts">
import course from "./component/course/index.vue"
export default {
  components: {
    course
  }
</script>

<style lang="scss" scoped>
.record {
  display: flex;
}
.info {
  display: flex;
}
.img {
  border-radius: 50%;
}
</style>
