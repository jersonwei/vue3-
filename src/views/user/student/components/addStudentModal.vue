<template>
  <n-modal
    ref="newModalRef"
    v-model:show="showModal"
    :mask-closable="false"
    style="width: 800px"
    :show-icon="false"
    preset="dialog"
    :title="`${addOrEdit ? '新建' : '编辑'}学生`"
  >
    <n-scrollbar ref="scrollRef" style="max-height: 750px">
      <n-form
        ref="formRef"
        :model="formParams"
        :rules="rules"
        label-placement="left"
        :label-width="80"
        class="m-2 py-4"
        style="display: flex; flex-wrap: wrap"
      >
        <n-form-item label="姓名" path="userName">
          <n-input v-model:value="formParams.userName" placeholder="请输入姓名"></n-input>
        </n-form-item>
        <n-form-item label="学号" path="stunu">
          <n-input v-model:value="formParams.stunu" placeholder="请输入学号"></n-input>
        </n-form-item>
        <n-form-item label="性别" path="sexList">
          <n-select
            v-model:value="formParams.sexList"
            clearable
            placeholder="请选择性别"
            :options="form.sex"
          ></n-select>
        </n-form-item>
        <n-form-item label="院系" path="collegeList">
          <n-select
            v-model:value="formParams.collegeList"
            :options="form.collegeId"
            clearable
            placeholder="请选择院系"
          ></n-select>
        </n-form-item>
        <n-form-item label="专业" path="majorList">
          <n-select
            v-model:value="formParams.majorList"
            :options="form.majorId"
            clearable
            placeholder="请选择专业"
          ></n-select>
        </n-form-item>
        <n-form-item label="班级" path="classList">
          <n-select
            v-model:value="formParams.classList"
            :options="form.classId"
            clearable
            placeholder="请选择班级"
          ></n-select>
        </n-form-item>
        <n-form-item label="手机号" path="phone">
          <n-input v-model:value="formParams.phone" placeholder="请输入手机号"></n-input>
        </n-form-item>
        <n-form-item label="邮箱" path="email">
          <n-input v-model:value="formParams.email" placeholder="请输入邮箱"></n-input>
        </n-form-item>
        <n-form-item label="身份证号" path="idCard">
          <n-input v-model:value="formParams.idCard" placeholder="请输入身份证号"></n-input>
        </n-form-item>
        <n-form-item label="入学时间" path="startTime">
          <n-date-picker v-model:value="formParams.startTime" :options="form.startTime" type="date" />
        </n-form-item>
        <n-form-item label="地址" path="address">
          <n-select v-model:value="formParams.address"></n-select>
          <n-input style="500px"></n-input>
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
import { useMessage } from 'naive-ui';
import { useDebounceFn } from '@vueuse/core';
import { useAuthStore } from '@/store';
import { addStudent, saveOrUpdateLabel, updateCourseInfo } from '@/service';
import { fileTypeOfImage, fileTypeOfOutLine, getServiceEnv, deafultFormParams } from '@/utils';
import { getClassListOptions, getCollegeLegistOptions, getMajorListOptions } from '../getOptions';

const showModal = ref(false);
const addOrEdit = ref(false); // true 新增，false修改
const formBtnLoading = ref(false);
const formRef = ref(); // 表单双向绑定
const message = useMessage(); // 轻提示

let Form = new FormData();
const emits = defineEmits(['reloadTable']);
const formParams = reactive({
  userName: '',
  stunu: '',
  sex: '',
  classId: '', // 班级
  majorId: '', // 专业
  collegeId: '', // 学院
  sexList: [],
  collegeList: [],
  majorList: [],
  classList: [],
  phone: '',
  email: '',
  idCard: '',
  startTime: null,
  address: ''
  // createTime: '',
  // classId: 1,
  // id: '',
  // sex: 1,
  // majorId: '',
  // status: 1
});

// 下拉
// const form.sex = ref([
//   { value: 1, label: '男' },
//   { value: 0, label: '女' }
// ]);
// 获取院系 专业  班级 下拉框的值
const stuDepartmentIdOptions = ref([]);
const stuMajorIdOptions = ref([]);
const stuClassIdOptions = ref([]);
const getOption = async () => {
  stuDepartmentIdOptions.value = await getCollegeLegistOptions();
  stuClassIdOptions.value = await getClassListOptions();
  stuMajorIdOptions.value = await getMajorListOptions();
  // console.log(stuMajorIdOptions.value);
};
getOption();

const showModalFn = () => {
  deafultFormParams(formParams);
  Form = new FormData();
  addOrEdit.value = true;
  showModal.value = true;
};
// 编辑
const editID = ref();
// 获取url
// const serviceEnv = getServiceEnv();
// const labelList = ref([]);
// const classList = ref([]);
const editModalFn = record => {
  // console.log(record);
  Form = new FormData();
  editID.value = record.id;
  formParams.sexList = [];
  formParams.collegeList = [];
  formParams.majorList = [];
  formParams.classList = [];
  const formData = {
    userName: record.userName,
    stunu: record.stunu,
    sex: record.sex,
    classId: record.classId,
    majorId: record.majorId,
    collegeId: record.collegeId,
    sexList: record.sexList,
    collegeList: record.collegeList,
    majorList: record.majorList,
    classList: record.classList,
    phone: record.phone,
    email: record.email,
    idCard: record.idCard,
    startTime: record.startTime,
    address: record.address
    // : record.courseCategory,
    // label: record?.labelId?.split(','),
    // labelName: record.listLabelName,
    // majorId: record?.eclassId?.split(','),
    // note: record.note,
    // uploadIMage: [
    //   {
    //     status: 'finished',
    //     url: `${serviceEnv}${record.coverPic}`
    //   }
    // ],
    // uploadOutline: []
    // local: []
    // localName: []
    // robot: ""
    // virtualNumber: 0
    // virtualRobot: ""
  };
  // for (let i = 0; i < formData.label?.length; i++) {
  //   formParams.labelList.push(parseInt(formData.label[i], 10));
  // }
  // console.log('formData.majorId', formData.majorId);
  // for (let i = 0; i < formData.majorId?.length; i++) {
  //   formParams.classList.push(parseInt(formData.majorId[i], 10));
  // }
  // formData.label = formParams.labelList;
  // formData.majorId = formParams.classList;
  // if (record.courseOutline) {
  //   const outLineIndexOf = record.courseOutline.indexOf('outline/');
  //   const outLineName = record.courseOutline.slice(outLineIndexOf + 8);
  //   formData.uploadOutline = [{ name: outLineName, status: 'finished', url: `${serviceEnv}${record.courseOutline}` }];
  // }
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  Object.assign(formParams, formData);
  addOrEdit.value = false;
  showModal.value = true;
};

// 新增修改的Form
const rules = {
  userName: { required: true, trigger: ['blur', 'change'], message: '请输入姓名' },
  stunu: { required: true, trigger: ['blur', 'change'], message: '请输入学号' },
  // sexList: { required: true, trigger: ['blur', 'change'], message: '请选择性别' },
  collegeList: { required: true, trigger: ['blur', 'change'], message: '请选择院系' },
  majorList: { required: true, trigger: ['blur', 'change'], message: '请选择专业' },
  // classList: { required: true, trigger: ['blur', 'change'], message: '请选择班级' },
  phone: {
    required: true,
    trigger: ['blur', 'change'],
    message: '请输入手机号码',
    pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
  },
  email: {
    required: true,
    trigger: ['blur', 'change'],
    message: '请输入邮箱',
    pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
  },
  idCard: {
    required: true,
    trigger: ['blur', 'change'],
    message: '请输入身份证号',
    pattern:
      /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
  }
  // startTime: { required: true, trigger: ['blur', 'change'], message: '请选择入学日期' },
  // address: { required: true, trigger: ['blur', 'change'], message: '请填写地址' },
  // courseName: {
  //   required: true,
  //   trigger: ['blur', 'input'],
  //   message: '请输入名称'
  // },
  // courseCategory: {
  //   required: true,
  //   message: '请选择所属分类'
  // }
  // labelList: {
  //   required: true,
  //   message: '请选择课程标签'
  // }
};

const form = reactive({
  userName: [],
  stunu: [],
  sex: [],
  classId: [],
  majorId: [],
  collegeId: [],
  sexList: [],
  collegeList: [],
  majorList: [],
  classList: [],
  phone: [],
  email: [],
  idCard: [],
  startTime: [],
  address: []
  // courseCategory: [],
  // majorId: [],
  // label: [],
  // virtualRobot: [
  //   {
  //     label: 'Ubunto',
  //     value: '0'
  //   },
  //   {
  //     label: 'centos',
  //     value: '1'
  //   },
  //   {
  //     label: 'jq',
  //     value: '2'
  //   }
  // ]
});

const getList = async () => {
  // form.sexList.value = ref([
  //   { value: 1, label: '男' },
  //   { value: 0, label: '女' }
  // ]);
  form.classId = await getClassListOptions();
  form.collegeId = await getCollegeLegistOptions();
  form.majorId = await getMajorListOptions();
  // form.courseCategory = await getCourseCategoryOptions();
  // form.majorId = await getClassListOptions();
  // form.label = await getLabelsOptions();
};
getList();

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
          Form.append('userName', formParams.userName);
          Form.append('stunu', formParams.stunu);
          // if (formParams.classList) {
          //   Form.append('eclassId', formParams.classList);
          // }
          // if (formParams.note) {
          //   Form.append('note', formParams.note);
          // }
          // if (formParams.labelList.length) {
          //   Form.append('labelId', formParams.labelList);
          // }
          console.log(Form);
          const { userId } = auth.userInfo;
          Form.append('lecturer', userId);
          const result = await addStudent(Form);
          if (!result.error) {
            message.success(`新建成功`);
          }
        }
        // if (addOrEdit.value === false) {
        //   Form.append('id', editID.value);
        //   Form.append('courseName', formParams.courseName);
        //   Form.append('courseCategory', formParams.courseCategory);
        //   Form.append('eclassId', formParams.classList);
        //   Form.append('note', formParams.note);
        //   // const { userId } = auth.userInfo;
        //   // Form.append('lecturer', userId);
        //   const result = await updateCourseInfo(Form);
        //   console.log(result);
        //   if (!result.error) {
        //     message.success(`修改成功`);
        //   }
        // }
        emits('reloadTable');
        showModal.value = false;
      });
      // showForm.value = null;
    } else {
      message.error('请填写完整信息');
    }
    formBtnLoading.value = false;
  });
};
defineExpose({ showModalFn, editModalFn });
</script>

<style scoped>
::v-deep(.n-form-item) {
  width: 360px;
}
::v-deep(.n-form-item-blank) {
  width: 230px;
}
::v-deep(.n-form-item:last-child) {
  width: 600px !important;
}
::v-deep(.n-date-picker) {
  width: 230px;
}
</style>
