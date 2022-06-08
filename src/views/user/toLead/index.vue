<template>
  <n-card title="学生管理/学生导入">
    <div class="left">
      <n-form>
        <n-form-item label="下载模板">
          <n-button @click="exportClick"></n-button
        ></n-form-item>
        <n-form-item label="课程大纲" path="text">
          <n-input placeholder="仅限xls,xlsx文件"></n-input>
          <n-upload
            v-model:file-list="formParams.uploadOutline"
            :action="`${getServiceEnv}/uploadOutline`"
            :custom-request="customRequestOutline"
            :max="1"
            @before-upload="beforeOutLineUpload"
          >
            <n-button>上传文件</n-button>
          </n-upload>
        </n-form-item>
      </n-form>
    </div>
    <div class="right">
      <span>123</span>
    </div>
  </n-card>
</template>

<script setup lang="ts">
// 导出插件
import { reactive, ref } from "vue";
import XLXS from "xlsx";
import FileSaver from "file-saver";
const formParams = reactive({
  uploadOutline: [],
});
const exportClick = () => {
  // 导出文件名
  const filename = "导出.xlsx";
  // 导出表格加id,通过id获取要导出的表单
  const wb = XLXS.utils.table_to_book(document.getElementById("table"));
  const wbout = XLXS.write(wb, {
    bookType: "xlsx",
    bookSST: true,
    type: "array",
  });
  try {
    FileSaver.saveAs(
      new Blob([wbout], {
        type: "application/octet-stream",
      }),
      filename
    );
  } catch (e) {
    console.log(e);
  }
  return wbout;
};

// const customRequestOutline = ({ file, data }: UploadCustomRequestOptions) => {
//   console.log("上传的文件", file.file);
//   Form.delete("outLine");
//   Form.append("outLine", file.file || "");
// };

const beforeOutLineUpload = async (data: {
  file: UploadFileInfo;
  fileList: UploadFileInfo[];
}): Promise<boolean> => {
  const result = fileTypeOfOutLine(data);
  if (result === false) {
    message.error("只能上传ppt或pdf格式的图片文件，请重新上传");
    return false;
  }
  return true;
};
</script>

<style scoped lang="scss">
.n-card {
  display: flex;
  // flex-direction: row;
  // flex-wrap: nowrap;
  color: #71747b;
  font-size: 18px;
  font-weight: 700;
  .left {
    border-right: 1px solid black;
    width: 800px;
    height: 500px;
    // flex: 0.5;
  }
  .right {
    width: 500px;
    height: 500px;
    flex: 1;
  }
}
</style>
