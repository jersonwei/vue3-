<!--
 * @Author: ZHENG
 * @Date: 2022-05-14 19:12:42
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-24 18:46:19
 * @FilePath: \work\src\views\course\coursePreview\compontent\wordPre.vue
 * @Description:

-->
<template>
  <div>
    <!-- <button @click="goPreview">点击预览word文件</button>
    <button @click="downLoad">点击下载word文件</button> -->
    <div class="docWrap">
      <!-- 预览文件的地方（用于渲染） -->
      <div ref="file"></div>
    </div>
  </div>
</template>

<script>
// 引入axios用来发请求
import axios from 'axios';
// 引入docx-preview插件
import { renderAsync } from 'docx-preview';

export default {
  created() {
    this.goPreview();
  },
  methods: {
    // 预览
    goPreview() {
      axios({
        method: 'get',
        responseType: 'blob', // 因为是流文件，所以要指定blob类型
        url: 'http://120.79.129.174:9000/hms/Teachingdocuments/d5fc0f09129f44468063e079c7001d39.docx' // 自己的服务器，提供的一个word下载文件接口
      }).then(({ data }) => {
        console.log(data); // 后端返回的是流文件
        const options = {
          breakPages: true
        };
        renderAsync(data, this.$refs.file, null, options); // 渲染到页面
      });
    }

    // // 下载
    // downLoad() {
    //   axios({
    //     method: "get",
    //     responseType: "blob", // 因为是流文件，所以要指定blob类型
    //     url: "http://ashuai.work:10000/getDoc", // 自己的服务器，提供的一个word下载文件接口
    //   }).then(({ data }) => {
    //     console.log(data); // 后端返回的是流文件
    //     const blob = new Blob([data]); // 把得到的结果用流对象转一下
    //     var a = document.createElement("a"); //创建一个<a></a>标签
    //     a.href = URL.createObjectURL(blob); // 将流文件写入a标签的href属性值
    //     a.download = "出师表.docx"; //设置文件名
    //     a.style.display = "none"; // 障眼法藏起来a标签
    //     document.body.appendChild(a); // 将a标签追加到文档对象中
    //     a.click(); // 模拟点击了a标签，会触发a标签的href的读取，浏览器就会自动下载了
    //     a.remove(); // 一次性的，用完就删除a标签
    //   });
    // },
  }
};
</script>
<style lang="scss" scoped>
.docWrap {
  // 指定样式宽度
  height: 600px;
  width: 900px;
  overflow-x: auto;
}
</style>
