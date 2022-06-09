<!--
 * @Author: ZHENG
 * @Date: 2022-05-21 09:09:42
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-08 18:07:59
 * @FilePath: \work\src\views\course\courseInfo\components\addOrEditChapterModal.vue
 * @Description:
-->
<template>
  <n-modal
    v-model:show="showModal"
    preset="dialog"
    :show-icon="false"
    :title="`${addOrEdit ? '新增' : '修改'}章节`"
  >
    <n-form
      ref="formRef"
      label-placement="left"
      :rules="rules"
      :model="formParams"
      :label-width="80"
      class="py-4"
    >
      <n-form-item label="章节标题" path="label">
        <n-input-group>
          <n-input-group-label :style="{ width: '30%' }"
            ><n-space
              >第{{ numberfilter(tableDataLength) }}章</n-space
            ></n-input-group-label
          >
          <n-input
            v-model:value="formParams.label"
            :style="{ width: '70%' }"
            maxlength="25"
            show-count
            placeholder="请输入标题"
          />
        </n-input-group>
        <!-- <n-input
          v-model:value="formParams.label"
          maxlength="25"
          show-count
          placeholder="请输入标题"
        /> -->
      </n-form-item>
      <n-form-item label="描述" path="note">
        <n-input
          v-model:value="formParams.note"
          type="textarea"
          maxlength="255"
          show-count
          placeholder="请输入描述"
        />
      </n-form-item>
    </n-form>
    <template #action>
      <n-space>
        <n-button @click="() => (showModal = false)">取消</n-button>
        <n-button type="primary" :loading="subLoading" @click="formSubmit">保存</n-button>
      </n-space>
    </template>
  </n-modal>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useMessage } from "naive-ui";
import { useCourseStore } from "@/store";
import { addChapter, editChapter } from "@/service";
import { deafultFormParams, numberfilter } from "@/utils";

const addOrEdit = ref(false);
const showModal = ref(false);
const subLoading = ref(false);
const courseStore = useCourseStore();
const { coutesInfoId } = storeToRefs(courseStore);
const message = useMessage();
const formParams = reactive({
  label: "",
  note: "",
  id: 0,
});
const rules = {
  label: {
    required: true,
    trigger: ["blur", "input"],
    message: "请输入章节名称",
  },
};
const emit = defineEmits(["reset"]);

/**
 * @author: ZHENG
 * @description: 新增章节
 */
const tableDataLength = ref();
const showAddModal = (data) => {
  deafultFormParams(formParams);
  addOrEdit.value = true;
  showModal.value = true;
  tableDataLength.value = data.length + 1;
};

const showEditModal = (form) => {
  console.log(form);
  Object.assign(formParams, form);
  tableDataLength.value = form.shortId;
  addOrEdit.value = false;
  showModal.value = true;
};
/**
 * @author: ZHENG
 * @description: 新建和编辑章节，后刷新table数据
 * @return {*}
 */
const formRef = ref();
const formSubmit = async () => {
  subLoading.value = true;
  formRef.value.validate(async (errors: any) => {
    if (!errors) {
      if (addOrEdit.value === true) {
        const params = {
          courseId: coutesInfoId.value,
          chapterName: formParams.label,
          note: formParams.note,
        };
        const result = await addChapter(params);
        if (!result?.error?.msg) {
          message.success("新增章节成功");
        }
      } else {
        const params = {
          courseId: coutesInfoId.value,
          id: formParams.id,
          chapterName: formParams.label,
          note: formParams.note,
        };
        const result = await editChapter(params);
        if (!result?.error?.msg) {
          message.success("编辑章节成功");
        }
      }
      showModal.value = false;
      emit("reset");
    } else {
      message.error("请填写完整信息");
    }
  });
  subLoading.value = false;
};

defineExpose({ showAddModal, showEditModal });
</script>
