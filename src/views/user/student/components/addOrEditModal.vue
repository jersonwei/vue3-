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
      <!-- :rules="rules" -->
      <n-form
        ref="formRef"
        :model="formParams"
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
            v-model:value="formParams.sex"
            clearable
            placeholder="请选择性别"
            :options="sex"
          ></n-select>
        </n-form-item>
        <n-form-item label="院系" path="collegeList">
          <n-select
            v-model:value="formParams.collegeId"
            :options="form.collegeId"
            clearable
            placeholder="请选择院系"
          ></n-select>
        </n-form-item>
        <n-form-item label="专业" path="majorList">
          <n-select
            v-model:value="formParams.majorId"
            :options="form.majorId"
            clearable
            placeholder="请选择专业"
          ></n-select>
        </n-form-item>
        <n-form-item label="班级" path="classList">
          <n-select
            v-model:value="formParams.classId"
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
          <n-input
            v-model:value="formParams.idCard"
            placeholder="请输入身份证号"
          ></n-input>
        </n-form-item>
        <n-form-item label="入学时间" path="startTime">
          <n-date-picker
            style="width: 100%"
            v-model:value="formParams.startTime"
            type="date"
            clearable
          />
          <!-- <n-input v-model:value="formParams.startTime"></n-input> -->
        </n-form-item>
        <div class="address" style="flex: 1">
          <n-form-item label="地址" path="address">
            <CitySelector
              data-type="pcas"
              check-strategy="child"
              @update:value="onSelectItem"
            />
            <n-input
              v-model:value="formParams.address"
              placeholder="请输入地址详情"
            ></n-input>
            <!-- <div><VDistpicker></VDistpicker></div> -->
            <!-- <n-select v-model:value="formParams.address"></n-select> -->
          </n-form-item>
        </div>
      </n-form>
    </n-scrollbar>
    <template #action>
      <n-space>
        <!-- <n-button @click="() => ((showModal = false), (showForm = null))">取消</n-button> -->
        <n-button @click="() => (showModal = false)">取消</n-button>
        <n-button type="info" :loading="formBtnLoading" @click="confirmForm"
          >确定</n-button
        >
      </n-space>
    </template>
  </n-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useMessage } from "naive-ui";
// import { useDebounceFn } from "@vueuse/core";
// import { useAuthStore } from "@/store";
import { addStudent, putStudent } from "@/service";
import { deafultFormParams } from "@/utils";
import {
  getClassListOptions,
  getCollegeLegistOptions,
  getMajorListOptions,
} from "../getOptions";
// 选择省市区
const currentItem = ref({});
function onSelectItem(item: any) {
  currentItem.value = item;
  // formParams.address = JSON.stringify(currentItem);
}
const showModal = ref(false);
const addOrEdit = ref(false); // true 新增，false修改
const formBtnLoading = ref(false);
const formRef = ref(); // 表单双向绑定
const message = useMessage(); // 轻提示

let Form = new FormData();
const emits = defineEmits(["reloadTable"]);
const checkTime = new Date();
const formParams = reactive({
  userName: "",
  stunu: "",
  sex: "",
  classId: "", // 班级
  majorId: "", // 专业
  collegeId: "", // 学院
  phone: "",
  email: "",
  idCard: "",
  startTime: ref<Date>(checkTime),
  address: "",
});

// 下拉
const sex = ref([
  { value: 1, label: "男" },
  { value: 0, label: "女" },
]);
// 获取院系 专业  班级 下拉框的值
const stuDepartmentIdOptions = ref([]);
const stuMajorIdOptions = ref([]);
const stuClassIdOptions = ref([]);
const getOption = async () => {
  stuDepartmentIdOptions.value = await getCollegeLegistOptions();
  stuClassIdOptions.value = await getClassListOptions();
  stuMajorIdOptions.value = await getMajorListOptions();
};
getOption();

const showModalFn = () => {
  deafultFormParams(formParams);
  Form = new FormData();
  addOrEdit.value = true;
  showModal.value = true;
};
const editID = ref();
const editModalFn = (record) => {
  Form = new FormData();
  editID.value = record.id;
  // formParams.userName = [];
  // formParams.stunu = [];
  // formParams.sex = [];
  // formParams.classId = [];
  // formParams.majorId = [];
  // formParams.collegeId = [];
  // formParams.phone = [];
  // formParams.email = [];
  // formParams.idCard = [];
  // formParams.startTime = [];
  // formParams.address = [];
  // formParams.labelList = [];
  // formParams.classList = [];
  const formData = {
    userName: record.userName,
    stunu: record.stunu,
    sex: record.sex,
    classId: record.classId, // 班级
    // majorId: record.majorId, // 专业
    // collegeId: record.collegeId, // 学院
    phone: record.phone,
    email: record.email,
    idCard: record.idCard,
    startTime: record.startTime,
    address: record.address,
    // local: []
    // localName: []
    // robot: ""
    // virtualNumber: 0
    // virtualRobot: ""
  };
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  Object.assign(formParams, formData);
  addOrEdit.value = false;
  showModal.value = true;
};
// 新增修改的Form
// const rules = {
//   userName: {
//     required: true,
//     trigger: ["blur", "change"],
//     message: "请输入正确的姓名",
//     pattern: /[\u4e00-\u9fa5]/gm,
//   },
//   stunu: {
//     required: true,
//     trigger: ["blur", "change"],
//     message: "请输入正确的学号",
//     pattern: /^\d+$/,
//   },
//   // sexList: { required: true, trigger: ['blur', 'change'], message: '请选择性别' },
//   collegeList: { required: true, trigger: ["blur", "change"], message: "请选择院系" },
//   majorList: { required: true, trigger: ["blur", "change"], message: "请选择专业" },
//   // classList: { required: true, trigger: ['blur', 'change'], message: '请选择班级' },
//   phone: {
//     required: true,
//     trigger: ["blur", "change"],
//     message: "请输入正确的手机号码",
//     pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
//   },
//   email: {
//     required: true,
//     trigger: ["blur", "change"],
//     message: "请输入正确的邮箱",
//     pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
//   },
//   idCard: {
//     required: true,
//     trigger: ["blur", "change"],
//     message: "请输入正确的身份证号",
//     pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
//   },
//   // startTime: { required: true, trigger: ['blur', 'change'], message: '请选择入学日期' },
//   // address: { required: true, trigger: ['blur', 'change'], message: '请填写地址' },
// };

const form = reactive({
  classId: [],
  majorId: [],
  collegeId: [],
});

const getList = async () => {
  form.classId = await getClassListOptions();
  form.collegeId = await getCollegeLegistOptions();
  form.majorId = await getMajorListOptions();
};
getList();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const confirmForm = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  // const auth = useAuthStore();
  // e.preventDefault();
  formBtnLoading.value = true;
  formRef.value.validate((errors: any) => {
    if (!errors) {
      setTimeout(async () => {
        if (addOrEdit.value === true) {
          // const {
          //   userName,
          //   stunu,
          //   sex,
          //   classId,
          //   majorId,
          //   collegeId,
          //   phone,
          //   email,
          //   idCard,
          //   address,
          //   startTime,
          // } = formParams;
          // const params = {
          //   userName,
          //   stunu,
          //   sex,
          //   classId,
          //   majorId,
          //   collegeId,
          //   phone,
          //   email,
          //   idCard,
          //   address,
          //   startTime,
          // };
          Form.append("userName", formParams.userName);
          Form.append("stunu", formParams.stunu);
          Form.append("sex", formParams.sex);
          Form.append("classId", formParams.classId);
          Form.append("collegeId", formParams.collegeId);
          Form.append("phone", formParams.phone);
          Form.append("email", formParams.email);
          Form.append("address", formParams.address);
          Form.append("idCard", formParams.idCard);
          Form.append("startTime", formParams.startTime);
          const result = await addStudent(Form);
          if (!result.error) {
            message.success("新建成功");
          }
          // const { userId } = auth.userInfo;
          // Form.append("lecturer", userId);
          // const result = await addStudent(Form);
          // if (!result.error) {
          //   message.success(`新建成功`);
          // }
        }
        if (addOrEdit.value === false) {
          Form.append("userName", formParams.userName);
          Form.append("stunu", formParams.stunu);
          Form.append("sex", formParams.sex);
          Form.append("classId", formParams.classId);
          Form.append("collegeId", formParams.collegeId);
          Form.append("phone", formParams.phone);
          Form.append("email", formParams.email);
          Form.append("address", formParams.address);
          Form.append("idCard", formParams.idCard);
          Form.append("startTime", formParams.startTime);
          //   Form.append('id', editID.value);
          //   Form.append('courseName', formParams.courseName);
          //   Form.append('courseCategory', formParams.courseCategory);
          //   Form.append('eclassId', formParams.classList);
          //   Form.append('note', formParams.note);
          //   // const { userId } = auth.userInfo;
          //   // Form.append('lecturer', userId);
          const result = await putStudent(Form);
          console.log(result);
          if (!result.error) {
            message.success(`修改成功`);
          }
        }
        emits("reloadTable");
        showModal.value = false;
      });
      // showForm.value = null;
    } else {
      message.error("请填写完整信息");
    }
    formBtnLoading.value = false;
  });
};
defineExpose({ showModalFn, editModalFn });
// defineExpose({ showModalFn });
</script>

<style scoped>
::v-deep(.n-form-item) {
  width: 360px;
}
/* ::v-deep(.n-date-picker) {
  width: 280px;
} */
/* ::v-deep(.n-form-item-blank:last-child) {
  width: 600px;
} */
::v-deep(.n-form-item:last-child) {
  width: 600px !important;
}
/* ::v-deep(.n-date-picker) {
  width: 230px;
} */
</style>
