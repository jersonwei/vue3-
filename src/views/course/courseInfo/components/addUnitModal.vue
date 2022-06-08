<!--
 * @Author: ZHENG
 * @Date: 2022-05-21 11:21:27
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-08 10:43:39
 * @FilePath: \work\src\views\course\courseInfo\components\addUnitModal.vue
 * @Description:
-->
<!-- ${current === 1 ? '课时' : '试题关联'}` -->
<template>
  <n-modal
    v-model:show="showModal"
    style="width: 650px"
    preset="dialog"
    :title="`${addOrEdit ? '新增' : '修改'}${quType ? '习题' : '课时'}`"
  >
    <n-space v-if="addOrEdit" vertical>
      <n-steps :current="current" :status="currentStatus">
        <n-step title="新增课时"> </n-step>
        <n-step title="课时文件"> </n-step>
        <n-step title="配置题目"> </n-step>
      </n-steps>
    </n-space>
    <!-- current ===1 新建课时第一步 -->
    <template v-if="addOrEdit && current === 1">
      <n-form
        ref="formRef"
        :rules="rules1"
        :model="formParams"
        label-placement="left"
        :label-width="120"
        class="py-4"
      >
        <n-form-item label="课时名称" path="label">
          <n-input v-model:value="formParams.label" placeholder="请输入课时标题" />
        </n-form-item>
        <n-form-item label="课时描述" path="note">
          <n-input
            v-model:value="formParams.note"
            type="textarea"
            placeholder="请输入课时描述"
          />
        </n-form-item>
        <n-form-item label="开启实验" path="enableReport">
          <template #label>
            开启实验
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-icon size="18" class="cursor-pointer text-gray-400">
                  <QuestionCircleOutlined />
                </n-icon>
              </template>
              开启实验,后续需要提交实验文档
            </n-tooltip>
          </template>
          <n-checkbox v-model:checked="formParams.enableReport">
            是否开启实验
          </n-checkbox>
        </n-form-item>
        <n-form-item path="auth" style="margin-left: 100px">
          <n-space>
            <n-button type="primary" :disabled="isNext" @click="Next">下一步</n-button>
          </n-space>
        </n-form-item>
        <div style="display: flex; justify-content: flex-end">
          <n-button type="primary" :loading="subLoading" @click="formSubmit"
            >提交</n-button
          >
        </div>
      </n-form>
    </template>
    <template v-if="addOrEdit && current === 2">
      <n-form
        ref="formRef"
        :model="formParams"
        label-placement="left"
        :label-width="120"
        class="py-4"
      >
        <n-form-item label="教学内容文档" path="studyFile">
          <template #label>
            教学内容文档
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-icon size="18" class="cursor-pointer text-gray-400">
                  <QuestionCircleOutlined />
                </n-icon>
              </template>
              上传word文档
            </n-tooltip>
          </template>
          <n-upload
            v-model:file-list="formParams.studyFile"
            :max="1"
            :custom-request="(options) => customRequestOutline(options, 0)"
            @before-upload="beforeWordUpload"
          >
            <n-button>上传文件</n-button>
          </n-upload>
        </n-form-item>
        <n-form-item label="教学视频" path="studyVideo">
          <template #label>
            教学视频
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-icon size="18" class="cursor-pointer text-gray-400">
                  <QuestionCircleOutlined />
                </n-icon>
              </template>
              mp4文件
            </n-tooltip>
          </template>
          <n-upload
            v-model:file-list="formParams.studyVideo"
            :max="1"
            :custom-request="(options) => customRequestOutline(options, 1)"
            @before-upload="beforeVideoUpload"
          >
            <n-button>上传文件</n-button>
          </n-upload>
        </n-form-item>
        <n-form-item label="课件" path="studyPPT">
          <template #label>
            课件
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-icon size="18" class="cursor-pointer text-gray-400">
                  <QuestionCircleOutlined />
                </n-icon>
              </template>
              PPT文件
            </n-tooltip>
          </template>
          <n-upload
            v-model:file-list="formParams.studyPPT"
            :max="1"
            :custom-request="(options) => customRequestOutline(options, 2)"
            @before-upload="beforePPTUpload"
          >
            <n-button>上传文件</n-button>
          </n-upload>
        </n-form-item>
        <n-form-item label="实验手册" path="studyManual">
          <template #label>
            实验手册
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-icon size="18" class="cursor-pointer text-gray-400">
                  <QuestionCircleOutlined />
                </n-icon>
              </template>
              word文件
            </n-tooltip>
          </template>
          <n-upload
            v-model:file-list="formParams.studyManual"
            :max="1"
            :custom-request="(options) => customRequestOutline(options, 3)"
            @before-upload="beforeWordUpload"
          >
            <n-button>上传文件</n-button>
          </n-upload>
        </n-form-item>
        <n-form-item label="开发环境必需" path="development">
          <n-input
            v-model:value="formParams.development"
            type="textarea"
            placeholder="请输入开发环境说明"
          />
        </n-form-item>
        <n-form-item path="auth" style="margin-left: 100px">
          <n-space>
            <n-button type="primary" @click="Back">上一步</n-button>
            <n-button type="primary" :disabled="isNext" @click="Next">下一步</n-button>
          </n-space>
        </n-form-item>
        <div style="display: flex; justify-content: flex-end">
          <n-button type="primary" :loading="subLoading" @click="formSubmit"
            >提交</n-button
          >
        </div>
      </n-form>
    </template>
    <template v-if="addOrEdit && current === 3">
      <n-space>
        <paperTable :id="0" ref="paperTableRef"></paperTable>
      </n-space>
      <n-form-item path="auth" style="margin-left: 100px">
        <n-space>
          <n-button type="primary" @click="Back">上一步</n-button>
        </n-space>
      </n-form-item>

      <!-- <n-button type="primary" :loading="subLoading" @click="formSubmit">提交</n-button> -->
      <div style="display: flex; justify-content: flex-end">
        <n-button type="primary" :loading="subLoading" @click="formSubmit">提交</n-button>
      </div>
    </template>
    <!-- 编辑 -->
    <template v-if="!addOrEdit">
      <template v-if="current === 1">
        <n-form
          ref="formRef"
          :model="formParams"
          label-placement="left"
          :label-width="120"
          class="py-4"
        >
          <n-form-item label="课时标题" path="label">
            <n-input v-model:value="formParams.label" placeholder="请输入标题" />
          </n-form-item>
          <n-form-item label="描述" path="label">
            <n-input
              v-model:value="formParams.note"
              type="textarea"
              placeholder="请输入描述"
            />
          </n-form-item>
          <n-form-item label="教学内容文档" path="studyFile">
            <n-upload
              v-model:file-list="formParams.studyFile"
              :max="1"
              :custom-request="(options) => customRequestOutline(options, 0)"
              @before-upload="fileTypeOfPdf"
            >
              <n-button>上传文件</n-button>
            </n-upload>
            <template #label>
              教学内容文档
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-icon size="18" class="cursor-pointer text-gray-400">
                    <QuestionCircleOutlined />
                  </n-icon>
                </template>
                pdf文件
              </n-tooltip>
            </template>
          </n-form-item>
          <n-form-item label="教学视频" path="studyVideo">
            <n-upload
              v-model:file-list="formParams.studyVideo"
              :max="1"
              :custom-request="(options) => customRequestOutline(options, 1)"
              @before-upload="beforeVideoUpload"
            >
              <n-button>上传文件</n-button>
            </n-upload>
            <template #label>
              教学视频
              <n-tooltip trigger="hover">
                <template #trigger>
                  <n-icon size="18" class="cursor-pointer text-gray-400">
                    <QuestionCircleOutlined />
                  </n-icon>
                </template>
                MP4文件
              </n-tooltip>
            </template>
          </n-form-item>
          <n-form-item label="课件" path="studyPPT">
            <n-upload
              v-model:file-list="formParams.studyPPT"
              :max="1"
              :custom-request="(options) => customRequestOutline(options, 2)"
              @before-upload="beforeOutLineUpload"
            >
              <n-button>上传文件</n-button>
            </n-upload>
          </n-form-item>
          <n-form-item label="实验手册" path="studyManual">
            <n-upload
              v-model:file-list="formParams.studyManual"
              :max="1"
              :custom-request="(options) => customRequestOutline(options, 3)"
              @before-upload="beforeOutLineUpload"
            >
              <n-button>上传文件</n-button>
            </n-upload>
          </n-form-item>
          <n-form-item label="开发环境必需" path="development">
            <n-input
              v-model:value="formParams.development"
              type="textarea"
              placeholder="请输入开发环境说明"
            />
          </n-form-item>
          <n-form-item label="开启实验" path="label">
            <n-checkbox v-model:checked="formParams.enableReport">
              是否开启实验
            </n-checkbox>
          </n-form-item>
          <n-form-item path="auth" style="margin-left: 100px">
            <n-space>
              <n-button type="primary" :loading="subLoading" @click="formSubmit"
                >提交</n-button
              >
            </n-space>
          </n-form-item>
        </n-form>
      </template>
      <template v-else>
        <paperTable
          :id="formParams.unitId"
          ref="paperTableRef"
          @resetTable="resetTable"
        ></paperTable>
      </template>
    </template>
  </n-modal>
</template>
<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import {
  StepsProps,
  UploadCustomRequestOptions,
  UploadFileInfo,
  useMessage,
} from "naive-ui";
import { QuestionCircleOutlined } from "@vicons/antd";

import { saveOrUpdateUnit } from "@/service";
import { deafultFormParams, fileTypeOfOutLine, fileTypeOfVideo } from "@/utils";
// import { columns, paperColumns } from './columns';
import paperTable from "./paperTable.vue";
import { fileTypeOfPdf, fileTypeOfDocx, fileTypeOfPPT } from "@/utils";

const addOrEdit = ref(false);
const showModal = ref(false);
const current = ref(1);
const currentStatus = ref<StepsProps["status"]>("process");

const message = useMessage();

const emit = defineEmits(["reset"]);

const formParams = reactive({
  label: "",
  note: "",
  development: "",
  studyFile: [
    {
      id: "",
      name: "",
      url: "",
      status: "finished",
    },
  ],
  studyVideo: [
    {
      id: "",
      name: "",
      url: "",
      status: "finished",
    },
  ],
  studyPPT: [
    {
      id: "",
      name: "",
      url: "",
      status: "finished",
    },
  ],
  studyManual: [
    {
      id: "",
      name: "",
      url: "",
      status: "finished",
    },
  ],
  enableReport: false,
  chapterId: 0,
  id: 0,
});

const rules1 = {
  label: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入课时标题",
  },
};

const subLoading = ref(false);
const fileList: File[] = reactive([]); // 文件
const fileType: string | number[] | Blob = reactive([]);
const customRequestOutline = ({ file }: UploadCustomRequestOptions, key: number) => {
  fileList.push(file.file);
  fileType.push(key);
};
/**
 * @author: ZHENG
 * @description: 新增章节
 */
const showAddModal = (record) => {
  quType.value = false;
  deafultFormParams(formParams);
  console.log(record);
  formParams.chapterId = record.id;
  current.value = 1;
  fileList.length = 0;
  fileType.length = 0;
  addOrEdit.value = true;
  showModal.value = true;
  formParams.enableReport = form.enableReport === 1;
};
const showEditUnitModal = (form) => {
  quType.value = false;
  Object.assign(formParams, form);
  formParams.enableReport = form.enableReport === 1;
  formParams.studyFile = [];
  formParams.studyVideo = [];
  formParams.studyPPT = [];
  formParams.studyManual = [];
  if (form.files && form.files.length > 0) {
    for (let i = 0; i < form.files.length; i++) {
      if (form.files[i].type === 0) {
        formParams.studyFile = [
          {
            id: "",
            name: "",
            url: "",
            status: "finished",
          },
        ];
        formParams.studyFile[0].id = form.files[i].id;
        formParams.studyFile[0].name = form.files[i].fileName;
        formParams.studyFile[0].url = form.files[i].url;
      } else if (form.files[i].type === 1) {
        formParams.studyVideo = [
          {
            id: "",
            name: "",
            url: "",
            status: "finished",
          },
        ];
        formParams.studyVideo[0].id = form.files[i].id;
        formParams.studyVideo[0].name = form.files[i].fileName;
        formParams.studyVideo[0].url = form.files[i].url;
      } else if (form.files[i].type === 2) {
        formParams.studyPPT = [
          {
            id: "",
            name: "",
            url: "",
            status: "finished",
          },
        ];
        formParams.studyPPT[0].id = form.files[i].id;
        formParams.studyPPT[0].name = form.files[i].fileName;
        formParams.studyPPT[0].url = form.files[i].url;
      } else if (form.files[i].type === 3) {
        formParams.studyManual = [
          {
            id: "",
            name: "",
            url: "",
            status: "finished",
          },
        ];
        formParams.studyManual[0].id = form.files[i].id;
        formParams.studyManual[0].name = form.files[i].fileName;
        formParams.studyManual[0].url = form.files[i].url;
      }
    }
  }
  current.value = 1; // 编辑课时
  fileList.length = 0;
  fileType.length = 0;
  addOrEdit.value = false;
  showModal.value = true;
};
const quType = ref(true);
const showEditUnitQuModal = (form) => {
  console.log(form);
  Object.assign(formParams, form);
  quType.value = true;
  current.value = 2; // 配置题目
  addOrEdit.value = false;
  showModal.value = true;
};

const isNext = computed(() => {
  if (current.value === 3) return true;
  return false;
});

const Next = () => {
  if (current.value === 1 && !formParams.label) {
    return;
  }
  current.value++;
};
const Back = () => {
  current.value--;
};

// 上传图片直接判断是否为
const beforeWordUpload = async (data: {
  file: UploadFileInfo;
  fileList: UploadFileInfo[];
}): Promise<boolean> => {
  const result = fileTypeOfDocx(data);
  if (result === false) {
    message.error("只能上传Word文件以docx结尾，请重新上传");
    return false;
  }
  return true;
};

// 上传图片直接判断是否为
const beforeOutLineUpload = async (data: {
  file: UploadFileInfo;
  fileList: UploadFileInfo[];
}): Promise<boolean> => {
  const result = fileTypeOfOutLine(data);
  if (result === false) {
    message.error("只能上传ppt或pdf或MD格式的图片文件，请重新上传");
    return false;
  }
  return true;
};
const beforePPTUpload = async (data: {
  file: UploadFileInfo;
  fileList: UploadFileInfo[];
}): Promise<boolean> => {
  const result = fileTypeOfPPT(data);
  if (result === false) {
    message.error("只能上传PPT格式的文件，请重新上传");
    return false;
  }
  return true;
};
const beforeVideoUpload = async (data: {
  file: UploadFileInfo;
  fileList: UploadFileInfo[];
}): Promise<boolean> => {
  const result = fileTypeOfVideo(data);
  if (result === false) {
    message.error("只能上传mp4格式的视频文件，请重新上传");
    return false;
  }
  return true;
};
const paperTableRef = ref();
/**
 * @author: ZHENG
 * @description: 新建和编辑章节，后刷新table数据
 * @return {*}
 */
const unitPractice = ref([]);
const formSubmit = async () => {
  unitPractice.value = [];
  subLoading.value = true;
  if (addOrEdit.value === true) {
    const Form = new FormData();
    fileList.forEach((file) => Form.append("file", file));
    Form.append("note", formParams.note);
    Form.append("unitName", formParams.label);
    Form.append("chapterId", formParams.chapterId);
    Form.append("enableReport", formParams.enableReport ? 1 : 0);
    Form.append("development", formParams.development);
    Form.append("fileFlag", fileType);
    console.log(paperTableRef?.value);
    let index = 0;
    // 单选的
    if (paperTableRef?.value?.radioList?.length) {
      for (let i = 0; i < paperTableRef.value.radioList.length; i++) {
        console.log("单选", paperTableRef.value.radioList[i].questionScore);
        if (!paperTableRef.value.radioList[i].questionScore) {
          subLoading.value = false;
          return message.error("请先录入分数");
        }
        index++;
        Form.append(
          `unitPractice[${index}].questionId`,
          paperTableRef.value.radioList[i].id
        );
        Form.append(
          `unitPractice[${index}].questionScore`,
          paperTableRef.value.radioList[i].questionScore
        );
        Form.append(
          `unitPractice[${index}].questionType`,
          paperTableRef.value.radioList[i].questionType
        );
        Form.append(`unitPractice[${index}].sort`, i + 1);
      }
    }
    // 多选的
    if (paperTableRef?.value?.multiList?.length) {
      for (let i = 0; i < paperTableRef.value.multiList.length; i++) {
        console.log("多少", paperTableRef.value.multiList[i].questionScore);
        if (!paperTableRef.value.multiList[i].questionScore) {
          subLoading.value = false;
          return message.error("请先录入分数");
        }
        index++;
        Form.append(
          `unitPractice[${index}].questionId`,
          paperTableRef.value.multiList[i].id
        );
        Form.append(
          `unitPractice[${index}].questionScore`,
          paperTableRef.value.multiList[i].questionScore
        );
        Form.append(
          `unitPractice[${index}].questionType`,
          paperTableRef.value.multiList[i].questionType
        );
        Form.append(`unitPractice[${index}].sort`, i + 1);
      }
    }
    // 实操题
    if (paperTableRef?.value?.operateList?.length) {
      for (let i = 0; i < paperTableRef.value.operateList.length; i++) {
        console.log("实操", paperTableRef.value.operateList[i].questionScore);
        if (!paperTableRef.value.operateList[i].questionScore) {
          subLoading.value = false;
          return message.error("请先录入分数");
        }
        index++;
        Form.append(
          `unitPractice[${index}].questionId`,
          paperTableRef.value.operateList[i].id
        );
        Form.append(
          `unitPractice[${index}].questionScore`,
          paperTableRef.value.operateList[i].questionScore
        );
        Form.append(
          `unitPractice[${index}].questionType`,
          paperTableRef.value.operateList[i].questionType
        );
        Form.append(`unitPractice[${index}].sort`, i + 1);
      }
    }
    // 实操题
    if (paperTableRef?.value?.answerList?.length) {
      for (let i = 0; i < paperTableRef.value.answerList.length; i++) {
        console.log("简答", paperTableRef.value.answerList[i].questionScore);
        if (!paperTableRef.value.answerList[i].questionScore) {
          subLoading.value = false;
          return message.error("请先录入分数");
        }
        index++;
        Form.append(
          `unitPractice[${index}].questionId`,
          paperTableRef.value.answerList[i].id
        );
        Form.append(
          `unitPractice[${index}].questionScore`,
          paperTableRef.value.answerList[i].questionScore
        );
        Form.append(
          `unitPractice[${index}].questionType`,
          paperTableRef.value.answerList[i].questionType
        );
        Form.append(`unitPractice[${index}].sort`, i + 1);
      }
    }
    const result = await saveOrUpdateUnit(Form);
    if (!result.error) {
      message.success("保存成功");
    }
  } else if (addOrEdit.value === false) {
    const Form = new FormData();
    console.log(formParams);
    fileList.forEach((file) => Form.append("file", file));
    Form.append("note", formParams.note);
    Form.append("unitName", formParams.label);
    Form.append("chapterId", formParams.chapterId);
    Form.append("enableReport", formParams.enableReport ? 1 : 0);
    Form.append("unitId", formParams.unitId);
    Form.append("development", formParams.development);
    Form.append("fileFlag", fileType);
    // if (paperTableRef?.value?.radioList.length) {
    //   for (let i = 0; i < paperTableRef.value.radioList.length; i++) {
    //     const params = {
    //       questionId: paperTableRef.value.radioList[i].id,
    //       questionScore: paperTableRef.value.radioList[i].questionScore,
    //       questionType: paperTableRef.value.radioList[i].questionType,
    //       sort: i + 1
    //     };
    //     unitPractice.value.push(params);
    //   }
    // }
    // Form.append('unitPractice', unitPractice.value);
    const result = await saveOrUpdateUnit(Form);
    if (!result.error) {
      message.success("保存成功");
    }
  }
  subLoading.value = false;
  showModal.value = false;
  emit("reset");
};
const resetTable = () => {
  showModal.value = false;
  emit("reset");
};

defineExpose({ showAddModal, showEditUnitModal, showEditUnitQuModal });
</script>
