<template>
  <n-modal
    ref="newModalRef"
    v-model:show="showModal"
    :mask-closable="false"
    style="width: 800px"
    :show-icon="false"
    preset="dialog"
    :title="`${addOrEdit ? '新建' : '编辑'}教师`"
  >
    <n-scrollbar ref="scrollRef" style="max-height: 750px">
      <!-- :rules="rules" -->
      <n-form
        ref="formRef"
        :model="formParams"
        :rules="rules"
        label-placement="left"
        :label-width="80"
        class="m-2 py-4"
        style="display: flex; flex-wrap: wrap"
      >
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi :span="12" label="姓名" path="userName">
            <n-input v-model:value="formParams.userName" placeholder="请输入姓名" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="工号" path="teacherWorkNum">
            <n-input v-model:value="formParams.teacherWorkNum" placeholder="请输入工号" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="性别" path="sex">
            <n-select
              v-model:value="formParams.sex"
              clearable
              placeholder="请选择性别"
              :options="sexOptions"
            ></n-select>
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="专业" path="majorId">
            <n-cascader
              v-model:value="formParams.majorId"
              clearable
              placeholder="请选择所属专业"
              :options="cascaderOptions"
              :check-strategy="'child'"
              :show-path="true"
              remote
              :on-load="handleLoad"
            />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="手机号" path="mobile">
            <n-input
              v-model:value="formParams.mobile"
              placeholder="请输入手机号"
            ></n-input>
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="邮箱" path="email">
            <n-input-group>
              <n-input-group-label>www.</n-input-group-label>
              <n-input
                v-model:value="formParams.email"
                placeholder="请输入邮箱"
                :style="{ width: '55%' }"
              />
              <n-input-group-label>.com</n-input-group-label>
            </n-input-group>
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="身份证号" path="idCard">
            <n-input
              v-model:value="formParams.idCard"
              placeholder="请输入身份证号"
            ></n-input>
          </n-form-item-gi>
          <n-form-item-gi :span="24" label="地址" path="address">
            <CitySelector
              data-type="pcas"
              check-strategy="child"
              @update:value="onSelectAddress"
              :defaultValue="formParams.address"
            />
            <n-input
              v-model:value="formParams.detailAddress"
              placeholder="请输入地址详情"
            ></n-input>
          </n-form-item-gi>
        </n-grid>
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
import { CascaderOption, useMessage } from "naive-ui";
// import { useDebounceFn } from "@vueuse/core";
// import { useAuthStore } from "@/store";
import { addStudent, putStudent } from "@/service";
import { deafultFormParams } from "@/utils";
import {
  getChildren,
  getClassListOptions,
  getCollegeLegistOptions,
  getSexOptions,
} from "../getOptions";
import { REGEXP_EMAIL, REGEXP_PHONE } from "@/config";
const cascaderOptions = ref([]);
const sexOptions = ref();
const getOption = async () => {
  sexOptions.value = await getSexOptions();
  cascaderOptions.value = await getCollegeLegistOptions();
  // stuClassIdOptions.value = await getClassListOptions();
};
getOption();
const handleLoad = (option: CascaderOption) => {
  return new Promise<void>((resolve) => {
    cascaderOptions.value.children = getChildren(option);
    resolve();
  });
};
const formParams = reactive({
  userName: "",
  teacherWorkNum: "",
  sex: null,
  majorId: null, // 专业
  mobile: "",
  email: "",
  idCard: "",
  address: null,
  detailAddress: "",
});
const rules = {
  userName: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入姓名",
  },
  teacherWorkNum: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入工号",
  },
  sex: {
    type: "number",
    required: true,
    trigger: ["blur", "change"],
    message: "请选择性别",
  },
  majorId: {
    required: true,
    trigger: ["blur", "onChange"],
    message: "请选择专业",
  },
  mobile: [
    { required: true, message: "请输入手机号码" },
    { pattern: REGEXP_PHONE, message: "手机号码格式错误", trigger: ["blur", "onBlur"] },
  ],
  email: [
    { required: true, message: "请输入邮箱" },
    { pattern: REGEXP_EMAIL, message: "邮箱格式错误", trigger: ["blur", "onBlur"] },
  ],
  idCard: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入身份证号",
  },
};
// 选择省市区
function onSelectAddress(item: any) {
  formParams.address = item.value;
}
const showModal = ref(false);
const addOrEdit = ref(false); // true 新增，false修改
const formBtnLoading = ref(false);
const formRef = ref(); // 表单双向绑定
const message = useMessage(); // 轻提示

let Form = new FormData();
const emits = defineEmits(["reloadTable"]);
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

const confirmForm = (e: { preventDefault: () => void }) => {
  e.preventDefault();
  formBtnLoading.value = true;
  formRef.value.validate((errors: any) => {
    if (!errors) {
      setTimeout(async () => {
        if (addOrEdit.value === true) {
          console.log(formParams);
          return;
          const i = formParams.majorId?.indexOf("-");
          const majorId = formParams.majorId?.substring(i + 1);
          Form.append("userName", formParams.userName);
          Form.append("teacherWorkNum", formParams.teacherWorkNum);
          Form.append("sex", formParams.sex);
          Form.append("majorId", majorId);
          Form.append("mobile", formParams.mobile);
          Form.append("email", formParams.email);
          Form.append("idCard", formParams.idCard);
          Form.append("address", formParams.address);
          Form.append("detailAddress", formParams.detailAddress);
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
          const result = await putStudent(Form);
          console.log(result);
          if (!result.error) {
            message.success(`修改成功`);
          }
        }
        emits("reloadTable");
        showModal.value = false;
      });
    } else {
      message.error("请填写完整信息");
    }
    formBtnLoading.value = false;
  });
};
defineExpose({ showModalFn, editModalFn });
</script>

<style scoped></style>
