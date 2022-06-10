<template>
  <n-card title="学生管理/学生导入">
    <div style="display: flex">
      <div class="left">
        <div class="title" style="font-size: 14px; margin-top: 60px">
          <span style="margin-left: 20px">下载模板:</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <n-button
            type="text"
            @click="downloadTemp"
            style="text-decoration: underline; color: #6266eb"
            >学生信息导入模板</n-button
          >
        </div>
        <div class="choose" style="display: flex; margin: 20px">
          <div style="width: 180px; line-height: 34px">选择导入文件 :</div>
          <n-input
            autosize
            placeholder="仅限xls,xlsx文件"
            style="height: 34px; width: 300px"
            type="text"
          ></n-input>
          <n-upload
            v-model:file-list="formParams.uploadOutline"
            :action="`${getServiceEnv}/uploadOutline`"
            :custom-request="customRequestOutline"
            :max="1"
            @before-upload="beforeOutLineUpload"
          >
            <n-button>选择文件</n-button>
          </n-upload>
        </div>
        <div style="margin-left: 20px; letter-spacing: 2px">
          <h3 style="font-size: 16px; margin-bottom: 12px">注意事项：</h3>
          <h4 style="font-size: 14px; margin-bottom: 8px">1. * 为必填信息；</h4>
          <h4 style="font-size: 14px; margin-bottom: 8px">
            2. 字段类型为下拉选择项的，请使用下拉选项内容；
          </h4>
          <h4 style="font-size: 14px; margin-bottom: 8px">
            3.若存在数据重复情况，系统将自动过滤已存在数据；
          </h4>
          <h4 style="font-size: 14px; margin-bottom: 8px">
            4.导入结束后，系统会提示导入失败条数，以及失败原因；
          </h4>
        </div>
      </div>
      <div class="right">
        <div style="margin-left: 80px; letter-spacing: 2px">
          导入学生学生信息<span style="color: #019f11; font-size: 16px">成功200条</span
          >，<span style="color: #f70909; font-size: 16px">失败12条</span>，失败原因如下：
        </div>
      </div>
    </div>
  </n-card>
</template>

<script setup lang="ts">
// 导出插件
import { useDownload } from "@/hooks";
import { reactive } from "vue";
import { UploadCustomRequestOptions, UploadFileInfo, useMessage } from "naive-ui";
import { fileTypeOfPdf } from "@/utils";
import { downloadTemplate } from "@/service";
const formParams = reactive({
  uploadOutline: [],
});
const message = useMessage();
let Form = new FormData();
const formData = {
  uploadOutline: [],
};
// const outLineIndexOf = record.courseOutline.indexOf("outline/");
// const outLineName = record.courseOutline.slice(outLineIndexOf + 8);
// formData.uploadOutline = [
//   {
//     // name: outLineName,
//     // status: "finished",
//     // url: `${serviceEnv}${record.courseOutline}`,
//   },
// ];
// 模板下载
const downloadTemp = () => {
  useDownload(downloadTemplate, "学生信息导入模板");
};

const customRequestOutline = ({ file, data }: UploadCustomRequestOptions) => {
  console.log("上传的文件", file.file);
  Form.delete("outLine");
  Form.append("outLine", file.file || "");
};
// 上传图片直接判断是否为
const beforeOutLineUpload = async (data: {
  file: UploadFileInfo;
  fileList: UploadFileInfo[];
}): Promise<boolean> => {
  const result = fileTypeOfPdf(data);
  if (result === false) {
    message.error("只能上传xls或xlsx格式的文件，请重新上传");
    return false;
  }
  return true;
};
</script>

<style scoped lang="scss">
.n-card {
  display: flex;
  font-size: 18px;
  .left {
    border-right: 1px solid black;
    width: 800px;
    height: 500px;
  }
  .right {
    width: 500px;
    height: 500px;
    flex: 1;
  }
}
</style>
