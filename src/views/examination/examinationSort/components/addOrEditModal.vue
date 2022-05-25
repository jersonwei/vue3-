<!--
 * @Author: ZHENG
 * @Date: 2022-05-12 17:34:13
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-25 16:26:25
 * @FilePath: \work\src\views\examination\examinationSort\components\addOrEditModal.vue
 * @Description:
-->
<template>
  <n-modal
    ref="newModalRef"
    v-model:show="showModal"
    :mask-closable="false"
    style="width: 650px"
    :show-icon="false"
    preset="dialog"
    :title="`${addOrEdit ? '新建' : '编辑'}分类`"
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
        <n-form-item label="分类名称" path="courseName">
          <n-input v-model:value="formParams.courseName" placeholder="请输入课程名称" />
        </n-form-item>
        <n-form-item label="所属课程" path="courseCategory">
          <n-select v-model:value="formParams.courseCategory" :options="form.courseCategory" />
        </n-form-item>
        <n-form-item label="所属专业" path="classList">
          <n-select v-model:value="formParams.classList" multiple :options="form.majorId" />
        </n-form-item>
        <n-form-item label="分类介绍" path="note">
          <n-input v-model:value="formParams.note" type="textarea" placeholder="课程介绍" />
        </n-form-item>
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
import { useDebounceFn } from '@vueuse/core';
import { useAuthStore } from '@/store';
import { addCourse, saveOrUpdateLabel, updateCourseInfo } from '@/service';
import { fileTypeOfImage, fileTypeOfOutLine, getServiceEnv, deafultFormParams } from '@/utils';

const showModal = ref(false);
const addOrEdit = ref(false); // true 新增，false修改
const showForm = ref<boolean | null>(null); // 展示虚拟机页面
const formBtnLoading = ref(false);
const local = ref(0);
const formRef = ref();
const message = useMessage();

let Form = new FormData();
const emits = defineEmits(['reloadTable']);
const formParams = reactive({
  courseName: '',
  courseCategory: '',
  majorId: '',
  note: '',
  robot: '',
  virtualRobot: '',
  virtualNumber: 0,
});

const showModalFn = () => {
  deafultFormParams(formParams);
  Form = new FormData();
  addOrEdit.value = true;
  showModal.value = true;
};

const editID = ref();
const serviceEnv = getServiceEnv();
// const labelList = ref([]);
// const classList = ref([]);
const editModalFn = record => {
  console.log(record);
  Form = new FormData();
  editID.value = record.id;
  formParams.labelList = [];
  formParams.classList = [];
  const formData = {
    courseCategory: record.courseCategory,
    courseName: record.courseName,
    label: record?.labelId?.split(','),
    labelName: record.listLabelName,
    majorId: record?.eclassId?.split(','),
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
  for (let i = 0; i < formData.label?.length; i++) {
    formParams.labelList.push(parseInt(formData.label[i], 10));
  }
  console.log('formData.majorId', formData.majorId);
  for (let i = 0; i < formData.majorId?.length; i++) {
    formParams.classList.push(parseInt(formData.majorId[i], 10));
  }
  formData.label = formParams.labelList;
  formData.majorId = formParams.classList;
  if (record.courseOutline) {
    const outLineIndexOf = record.courseOutline.indexOf('outline/');
    const outLineName = record.courseOutline.slice(outLineIndexOf + 8);
    formData.uploadOutline = [{ name: outLineName, status: 'finished', url: `${serviceEnv}${record.courseOutline}` }];
  }
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  Object.assign(formParams, formData);
  addOrEdit.value = false;
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
  classList: {
    required: true,
    message: '请选择所属班级'
  }
  // labelList: {
  //   required: true,
  //   message: '请选择课程标签'
  // }
};

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
}, 1000);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const confirmForm = (e: { preventDefault: () => void }) => {
  const auth = useAuthStore();
  // e.preventDefault();
  formBtnLoading.value = true;
  formRef.value.validate((errors: any) => {
    if (!errors) {
      setTimeout(async () => {
        if (addOrEdit.value === true) {
          // Form.append('file', (fileImage[0] as File) || '');
          // Form.append('outLine', (outLine[0] as File) || '');
          Form.append('courseName', formParams.courseName);
          Form.append('courseCategory', formParams.courseCategory);
          if (formParams.classList) {
            Form.append('eclassId', formParams.classList);
          }
          if (formParams.note) {
            Form.append('note', formParams.note);
          }
          if (formParams.labelList.length) {
            Form.append('labelId', formParams.labelList);
          }
          // const { userId } = auth.userInfo;
          // Form.append('lecturer', userId);
          const result = await addCourse(Form);
          if (!result.error) {
            message.success(`新建成功`);
          }
        }
        if (addOrEdit.value === false) {
          Form.append('id', editID.value);
          Form.append('courseName', formParams.courseName);
          Form.append('courseCategory', formParams.courseCategory);
          Form.append('eclassId', formParams.classList);
          Form.append('note', formParams.note);
          if (formParams.labelList.length) {
            Form.append('labelId', formParams.labelList);
          }

          // const { userId } = auth.userInfo;
          // Form.append('lecturer', userId);
          const result = await updateCourseInfo(Form);
          console.log(result);
          if (!result.error) {
            message.success(`修改成功`);
          }
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const customRequestIMage = ({ file, data }: UploadCustomRequestOptions) => {
  Form.delete('file');
  Form.append('file', file.file || '');
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const customRequestOutline = ({ file, data }: UploadCustomRequestOptions) => {
  Form.delete('outLine');
  Form.append('outLine', file.file || '');
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

defineExpose({ showModalFn, editModalFn });
</script>
