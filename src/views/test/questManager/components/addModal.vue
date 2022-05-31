<!--
 * @Author: ZHENG
 * @Date: 2022-05-12 17:34:13
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-31 08:35:09
 * @FilePath: \work\src\views\test\questManager\components\addModal.vue
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
    :title="`新建题库`"
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
        <n-form-item label="题库名称" path="courseName">
          <n-input v-model:value="formParams.courseName" placeholder="请输入题库名称" />
        </n-form-item>
        <n-form-item label="所属类别" path="courseCategory">
          <n-select v-model:value="formParams.courseCategory" :options="form.courseCategory" />
        </n-form-item>
        <n-form-item label="题库介绍" path="note">
          <n-input v-model:value="formParams.note" type="textarea" placeholder="课程介绍" />
        </n-form-item>
        <n-form-item label="题库状态" path="robot">
          <n-switch :round="false" />
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
import { MinusCircleOutlined } from '@vicons/antd';
import { useDebounceFn } from '@vueuse/core';
import { addCourse, getcourseCategoryList, getClassList, getLabels, saveOrUpdateLabel } from '@/service';
import { fileTypeOfImage, fileTypeOfOutLine, getServiceEnv, deafultFormParams } from '@/utils';

const showModal = ref(false);
const showForm = ref<boolean | null>(null);
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
  label: [],
  robot: '',
  virtualRobot: '',
  virtualNumber: 0,
  local: [],
  localName: [],
  uploadIMage: [],
  uploadOutline: []
});

const showModalFn = () => {
  deafultFormParams(formParams);
  Form = new FormData();
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
    message: '请选择所属班级'
  }
};

const getList = async () => {
  const { data: result } = await getcourseCategoryList();
  const newList = result.map(item => {
    return { value: item.id, label: item.categoryName };
  });
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  form.courseCategory = newList;
  const { data: majorList } = await getClassList(1);
  const newMajorList = majorList.map(item => {
    return { value: item.id, label: item.className };
  });
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  form.majorId = newMajorList;

  const { data: labelResult } = await getLabels();
  const newLabelList = labelResult.map((item: { id: any; labelName: any }) => {
    return { value: item.id, label: item.labelName, depth: 1, isLeaf: false };
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
  // e.preventDefault();
  formBtnLoading.value = true;
  formRef.value.validate((errors: any) => {
    if (!errors) {
      setTimeout(async () => {
        // Form.append('file', (fileImage[0] as File) || '');
        // Form.append('outLine', (outLine[0] as File) || '');
        Form.append('courseName', formParams.courseName);
        Form.append('courseCategory', formParams.courseCategory);
        Form.append('eclassId', formParams.majorId);
        Form.append('note', formParams.note);
        Form.append('labelId', formParams.label);
        Form.append('lecturer', '12');
        const result = await addCourse(Form);
        console.log(result);
        if (!result.error) {
          message.success(`新建成功`);
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

defineExpose({ showModalFn });
</script>
