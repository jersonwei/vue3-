<!--
 * @Author: ZHENG
 * @Date: 2022-05-12 17:34:13
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-28 21:15:49
 * @FilePath: \work\src\views\course\courseMgt\components\addOrEditModal.vue
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
    :title="`${addOrEdit ? '新建' : '编辑'}课程`"
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
          <n-select v-model:value="formParams.courseCategory" clearable :options="form.courseCategory" />
        </n-form-item>
        <n-form-item label="所属班级" path="classList">
          <n-select v-model:value="formParams.classList" clearable multiple :options="form.majorId" />
        </n-form-item>
        <n-form-item label="课程标签" path="labelList">
          <n-select
            v-model:value="formParams.labelList"
            filterable
            clearable
            multiple
            tag
            :options="form.label"
            @create="createLabel"
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
import { useAuthStore } from '@/store';
import { addCourse, saveOrUpdateLabel, updateCourseInfo } from '@/service';
import { fileTypeOfImage, fileTypeOfOutLine, getServiceEnv, deafultFormParams } from '@/utils';
import { getCourseCategoryOptions, getClassListOptions, getLabelsOptions } from '../getOptions';

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
  label: [],
  robot: '',
  virtualRobot: '',
  virtualNumber: 0,
  classList: [],
  labelList: [],
  local: [],
  localName: [],
  uploadIMage: [],
  uploadOutline: []
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

const getList = async () => {
  form.courseCategory = await getCourseCategoryOptions();
  form.majorId = await getClassListOptions();
  form.label = await getLabelsOptions();
};
getList();

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
  console.log('上传的文件', file.file);
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
