<!--
 * @Author: ZHENG
 * @Date: 2022-05-20 13:34:42
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-23 14:13:19
 * @FilePath: \work\src\views\course\courseMgt\components\editModal.vue
 * @Description: 新增和修改像差的逻辑有点多，拆分出去维护
-->
<template>
  <n-modal
    ref="newModalRef"
    v-model:show="showModal"
    :mask-closable="false"
    style="width: 650px"
    :show-icon="false"
    preset="dialog"
    :title="`编辑课程`"
  >
    <n-scrollbar ref="scrollRef" style="max-height: 750px">
      <n-form
        ref="formRef"
        :model="formParams"
        :rules="rules"
        label-placement="left"
        :label-width="120"
        class="m-2 py-4"
      >
        <n-form-item label="课程名称" path="courseName">
          <n-input v-model:value="formParams.courseName" placeholder="请输入课程名称" />
        </n-form-item>
        <n-form-item label="所属类别" path="courseCategory">
          <n-select v-model:value="formParams.courseCategory" :options="form.courseCategory" />
        </n-form-item>
        <n-form-item label="所属班级" path="majorId">
          <n-select v-model:value="formParams.majorId" :options="form.majorId" />
        </n-form-item>
        <n-form-item label="课程标签" path="label">
          <n-select
            v-model:value="formParams.label"
            filterable
            multiple
            tag
            :options="form.label"
            @create="createLabel"
            @update-value="updateLabelData"
          />
        </n-form-item>
        <n-form-item label="课程介绍" path="note">
          <n-input v-model:value="formParams.note" type="textarea" placeholder="课程介绍" />
        </n-form-item>
        <n-form-item label="课程封面" path="uploadIMage">
          <n-upload
            v-model:file-list="formParams.uploadIMage"
            :action="`${getServiceEnv}/uploadIMage`"
            list-type="image-card"
            :max="1"
            :custom-request="customRequestIMage"
            @before-upload="beforeUpload"
          />
        </n-form-item>
        <n-form-item label="课程大纲" path="text">
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
        <n-form-item label="创建虚拟机" path="robot">
          <n-radio-group v-model:value="formParams.robot" name="radiogroup">
            <n-space>
              <n-radio v-for="song in form.songs" :key="song.value" :value="song.value" @change="handleChange">
                {{ song.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <template v-if="showForm === true">
          <n-form-item label="虚拟机组模板" path="virtualRobot">
            <n-select
              v-model:value="formParams.virtualRobot"
              placeholder="请选择虚拟机组模板"
              :options="form.virtualRobot"
            />
          </n-form-item>
          <n-form-item label="子虚拟机数量" path="courseName">
            <n-input-number v-model:value="formParams.virtualNumber" placeholder="子虚拟机数量" />
          </n-form-item>
        </template>
        <template v-if="showForm === false">
          <view v-for="(item, index) in local" :key="index">
            <n-form-item :label="`本地虚拟机镜像${index + 1}`" path="courseName">
              <n-input v-model:value="formParams.local[index]" placeholder="请输入课程名称" />
              <n-button v-if="index > 0" tertiary circle type="primary" @click="cutLocal">
                <template #icon>
                  <n-icon>
                    <MinusCircleOutlined />
                  </n-icon>
                </template>
              </n-button>
            </n-form-item>
            <n-form-item :label="`本地虚拟机快照${index + 1}`" path="courseName">
              <n-input v-model:value="formParams.localName[index]" placeholder="请输入课程名称" />
            </n-form-item>
          </view>
          <n-form-item>
            <n-button type="success" @click="addLocal">
              <template #icon>
                <n-icon>
                  <MinusCircleOutlined />
                </n-icon>
              </template>
              添加 本地虚拟机
            </n-button>
          </n-form-item>
        </template>
      </n-form>
    </n-scrollbar>

    <template #action>
      <n-space>
        <n-button @click="() => ((showModal = false), (showForm = null))">取消</n-button>
        <n-button type="info" :loading="formBtnLoading" @click="confirmForm">确定</n-button>
      </n-space>
    </template>
  </n-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { UploadCustomRequestOptions, UploadFileInfo, useMessage } from 'naive-ui';
import { MinusCircleOutlined } from '@vicons/antd';
import { useDebounceFn } from '@vueuse/core';
import {
  getcourseCategoryList,
  getClassList,
  updateCourseInfo,
  uploadIMage,
  uploadOutline,
  getLabels,
  saveOrUpdateLabel
} from '@/service';
import { fileTypeOfImage, fileTypeOfOutLine, getServiceEnv } from '@/utils';

const showModal = ref(false);
const showForm = ref<boolean | null>(null);
const formBtnLoading = ref(false);
const local = ref(0);
const formRef = ref();
const message = useMessage();

let Form = new FormData();
const emits = defineEmits(['reloadTable']);

const updateLabelData = (
  value: Array | string | number | null,
  option: SelectBaseOption | null | SelectBaseOption[]
) => {
  console.log(value, option);
};

const editID = ref();
const serviceEnv = getServiceEnv();
const editModalFn = record => {
  Form = new FormData();
  editID.value = record.id;
  console.log(record);
  const outLineIndexOf = record.courseOutline.indexOf('outline/');
  const outLineName = record.courseOutline.slice(outLineIndexOf + 8);
  console.log(outLineIndexOf, outLineName);
  // "/education-jar/upload/outline/python语言a_01-锐智教育2022.pdf"

  console.log(record.labelId.split(','));
  const formData = {
    courseCategory: record.courseCategory,
    courseName: record.courseName,
    label: record.labelId.split(','),
    labelName: record.listLabelName,
    majorId: record.majorId,
    note: record.note,
    uploadIMage: [
      {
        status: 'finished',
        url: `${serviceEnv}${record.coverPic}`
      }
    ],
    uploadOutline: []
    // local: []
    // localName: []
    // robot: ""
    // virtualNumber: 0
    // virtualRobot: ""
  };
  console.log(formData.label);
  for (let i = 0; i < formData.label; i++) {
    console.log(formData.label[i], formData.labelName[i]);
  }
  if (record.courseOutline) {
    formData.uploadOutline = [{ name: outLineName, status: 'finished', url: `${serviceEnv}${record.courseOutline}` }];
  }
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  Object.assign(formParams, formData);
  showModal.value = true;
};
// 新增修改的Form
const rules = {
  courseName: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请输入名称'
  },
  courseCategory: {
    required: true,
    message: '请选择所属分类'
  },
  majorId: {
    required: true,
    message: '请选择所属专业'
  }
};
const getList = async () => {
  const { data: result } = await getcourseCategoryList();
  const newList = result.map(item => {
    return { value: item.id, label: item.categoryName };
  });
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  form.courseCategory = newList;
  // form[1] = newcollegeList;
  const { data: majorList } = await getClassList(1);
  const newMajorList = majorList.map(item => {
    return { value: item.id, label: item.className };
  });
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  form.majorId = newMajorList;

  const { data: labelResult } = await getLabels();
  const newLabelList = labelResult.map((item: { id: any; labelName: any }) => {
    return { value: item.id, label: item.labelName };
  });
  form.label = newLabelList;
};
getList();

const form = reactive({
  courseCategory: [],
  majorId: [],
  label: [],
  virtualRobot: [
    {
      label: 'Ubunto',
      value: '0'
    },
    {
      label: 'centos',
      value: '1'
    },
    {
      label: 'jq',
      value: '2'
    }
  ],
  songs: [
    {
      value: '云端虚拟机',
      label: '云端虚拟机'
    },
    {
      value: '本地虚拟机',
      label: '本地虚拟机'
    }
  ].map(s => {
    // eslint-disable-next-line no-param-reassign
    s.value = s.value.toLowerCase();
    return s;
  })
});

const formParams = reactive({
  courseName: '',
  courseCategory: '',
  majorId: '',
  note: '',
  label: '',
  labelName: '',
  robot: '',
  virtualRobot: '',
  virtualNumber: 0,
  local: [],
  localName: [],
  uploadIMage: [],
  uploadOutline: []
});
const handleChange = () => {
  if (formParams.robot === '云端虚拟机') {
    showForm.value = true;
  } else if (formParams.robot === '本地虚拟机') {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    addLocal();
    showForm.value = false;
  }
};
const addLocal = () => {
  formParams.local = [];
  formParams.localName = [];
  local.value++;
};
const cutLocal = () => {
  local.value--;
};
const createLabel = useDebounceFn(async (label: string) => {
  const params = {
    labelName: label,
    note: ''
  };
  const { data: result } = await saveOrUpdateLabel(params);
  form.label.push({ label: result.labelName, value: result.id });
}, 500);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const confirmForm = (e: { preventDefault: () => void }) => {
  // e.preventDefault();
  formBtnLoading.value = true;
  formRef.value.validate((errors: any) => {
    if (!errors) {
      setTimeout(async () => {
        // Form.append('file', (fileImage[0] as File) || '');
        // Form.append('outLine', (outLine[0] as File) || '');
        Form.append('id', editID.value);
        Form.append('courseName', formParams.courseName);
        Form.append('courseCategory', formParams.courseCategory);
        Form.append('majorId', formParams.majorId);
        Form.append('note', formParams.note);
        console.log(formParams);
        Form.append('labelId', formParams.label);
        Form.append('lecturer', '12');
        const result = await updateCourseInfo(Form);
        if (!result.error) {
          message.success('编辑成功');
          showModal.value = false;
        }
        emits('reloadTable');
        showModal.value = false;
      });
      showForm.value = null;
    } else {
      message.error('请填写完整信息');
    }
    formBtnLoading.value = false;
  });
};
// 提交
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const customRequestIMage = ({ file, data }: UploadCustomRequestOptions) => {
  Form.append('file', file.file || '');
  Form.append('id', editID.value);
  uploadIMage(Form);
};

// const outLine: (File | null | undefined)[] = []; // 文件
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const customRequestOutline = ({ file, data }: UploadCustomRequestOptions) => {
  Form.append('outLine', file.file || '');
  Form.append('id', editID.value);
  uploadOutline(Form);
};
// 上传图片直接判断是否为
const beforeUpload = async (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }): Promise<boolean> => {
  const result = fileTypeOfImage(data);
  if (result === false) {
    message.error('只能上传png或jpg格式的图片文件，请重新上传');
    return false;
  }
  return true;
};

// 上传图片直接判断是否为
const beforeOutLineUpload = async (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }): Promise<boolean> => {
  const result = fileTypeOfOutLine(data);
  if (result === false) {
    message.error('只能上传ppt或pdf格式的图片文件，请重新上传');
    return false;
  }
  return true;
};

defineExpose({ editModalFn });
</script>
