<!--
 * @Author: ZHENG
 * @Date: 2022-05-11 16:10:59
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-21 20:12:49
 * @FilePath: \work\src\views\course\courseInfo\components\editForm.vue
 * @Description:
-->
<template>
  <n-card :segmented="{ content: true }" :bordered="false" size="small">
    <template #header>
      <n-space>
        <n-icon size="18">
          <FormOutlined />
        </n-icon>
        <span>{{ formParams.type === 1 ? '章节' : '课时' }}{{ addOrEdit ? '新增' : '修改' }}</span>
      </n-space>
    </template>
    <!-- 新建课时 -->
    <n-form
      v-if="isShowForm && formParams.type === 1"
      ref="formRef"
      :model="formParams"
      label-placement="left"
      :label-width="120"
      class="py-4"
    >
      <n-form-item label="章节标题" path="label">
        <n-input v-model:value="formParams.label" placeholder="请输入标题" />
      </n-form-item>
      <n-form-item label="描述" path="label">
        <n-input v-model:value="formParams.note" placeholder="请输入描述" />
      </n-form-item>
      <n-form-item path="auth" style="margin-left: 100px">
        <n-space>
          <n-button type="primary" :loading="subLoading" @click="formSubmit">保存</n-button>
          <n-button v-if="!addOrEdit" @click="chapterDelete">删除</n-button>
        </n-space>
      </n-form-item>
    </n-form>
    <!-- tabs 编辑课时 -->
    <n-tabs
      v-if="isShowForm && formParams.type === 2"
      class="card-tabs"
      default-value="signin"
      size="large"
      animated
      style="margin: 0 -4px"
      pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
    >
      <n-tab-pane name="signin" :tab="`课时${addOrEdit ? '新增' : '修改'}`">
        <n-form ref="formRef" :model="formParams" label-placement="left" :label-width="120" class="py-4">
          <template v-if="formParams.type === 2">
            <n-form-item label="课时标题" path="label">
              <n-input v-model:value="formParams.label" :style="{ width: '33%' }" placeholder="请输入标题" />
            </n-form-item>
            <n-form-item label="描述" path="label">
              <n-input
                v-model:value="formParams.note"
                :style="{ width: '33%' }"
                type="textarea"
                placeholder="请输入描述"
              />
            </n-form-item>
            <n-form-item label="教学内容文档" path="label">
              <n-upload
                :max="1"
                :custom-request="options => customRequestOutline(options, 0)"
                @before-upload="beforeOutLineUpload"
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
            <n-form-item label="教学视频" path="label">
              <n-upload
                :max="1"
                :custom-request="options => customRequestOutline(options, 1)"
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
            <n-form-item label="课件" path="label">
              <n-upload
                :max="1"
                :custom-request="options => customRequestOutline(options, 2)"
                @before-upload="beforeOutLineUpload"
              >
                <n-button>上传文件</n-button>
              </n-upload>
            </n-form-item>
            <n-form-item label="实验手册" path="label">
              <n-upload
                :max="1"
                :custom-request="options => customRequestOutline(options, 3)"
                @before-upload="beforeOutLineUpload"
              >
                <n-button>上传文件</n-button>
              </n-upload>
            </n-form-item>
            <n-form-item label="开发环境必需" path="label">
              <n-input
                v-model:value="formParams.need"
                :style="{ width: '33%' }"
                type="textarea"
                placeholder="请输入描述"
              />
            </n-form-item>
            <n-form-item label="开启实验" path="label">
              <n-checkbox v-model:checked="enableReport"> 是否开启实验 </n-checkbox>
            </n-form-item>
            <n-form-item path="auth" style="margin-left: 100px">
              <n-space>
                <n-button type="primary" :loading="subLoading" @click="formSubmit">保存</n-button>
                <n-button v-if="!addOrEdit" @click="deleteFrom">删除</n-button>
              </n-space>
            </n-form-item>
          </template>
        </n-form>
      </n-tab-pane>
      <n-tab-pane v-if="!addOrEdit" name="signup" tab="题目配置">
        <n-form ref="formRef" :model="formParams" label-placement="left" :label-width="120" class="py-4">
          <TablePro
            ref="actionPaperRef"
            :columns="columns"
            :request="loadPaperDataTable"
            :row-key="row => row.id"
            :action-column="actionColumn"
            :scroll-x="1200"
          >
            <template #tableTitle>
              <n-button type="primary" @click="showModal = true">
                <template #icon>
                  <n-icon>
                    <PlusOutlined />
                  </n-icon>
                </template>
                选择题目
              </n-button>
              <n-button type="primary" style="margin-left: 20px" @click="save"> 提交 </n-button>
            </template>
          </TablePro>
        </n-form>
      </n-tab-pane>
    </n-tabs>
    <!-- @positive-click="submitCallback"
      @negative-click="cancelCallback" -->
    <n-modal
      v-model:show="showModal"
      preset="dialog"
      style="width: 1050px"
      title="确认"
      positive-text="确认"
      negative-text="取消"
      @positive-click="onPositiveClick"
    >
      <n-scrollbar ref="scrollRef" style="max-height: 750px">
        <!--  :rules="rules" -->
        <n-form ref="formRef" inline :model="showFormParams" label-placement="left" :label-width="120" class="m-2 py-4">
          <n-form-item label="试题题干" path="questionName">
            <n-input v-model:value="showFormParams.questionName" placeholder="请输入题目ID" />
          </n-form-item>
          <n-form-item label="试题类型" style="width: 300px" path="label">
            <n-select v-model:value="showFormParams.type" :options="quesform.questionType" />
          </n-form-item>
          <n-form-item path="courseName">
            <n-button type="primary" @click="reloadDataTable">查询</n-button>
          </n-form-item>
        </n-form>
        <TablePro
          ref="actionRef"
          :columns="paperColumns"
          :request="loadDataTable"
          :row-key="row => row.id"
          :scroll-x="1200"
          @update:checked-row-keys="handleCheck"
        ></TablePro>
      </n-scrollbar>
    </n-modal>
    // eslint-disable-next-line vue/v-on-event-hyphenation
    <delModal ref="delModalRef" :del-data="delData" :del-text="delText" @reset-from-click="resetFrom"></delModal>
  </n-card>
</template>
<script lang="ts" setup>
import { ref, withDefaults, defineProps, defineEmits, h, reactive, toRefs } from 'vue';
import { useRoute } from 'vue-router';
import { UploadCustomRequestOptions, UploadFileInfo, useMessage } from 'naive-ui';
import { FormOutlined, QuestionCircleOutlined, PlusOutlined } from '@vicons/antd';
import {
  addChapter,
  addUnitPractice,
  editChapter,
  editUnitPractice,
  getPaperList,
  getUnitPracticeList,
  unitAdd
} from '@/service';
import { fileTypeOfOutLine, fileTypeOfVideo } from '@/utils';
import { TablePro, TableAction } from '@/components/TablePro';
import { columns, paperColumns } from './columns';
import delModal from './delModal.vue';

const route = useRoute();

const formRef = ref(null);
const message = useMessage();
const enableReport = ref(false);
const showModal = ref(false);

const actionRef = ref();
type formParamsType = {
  type: number;
  label: string;
  note: string;
  chapterId: number;
  id?: number;
};
interface Props {
  isShowForm: boolean;
  addOrEdit: boolean;
  formParams: formParamsType;
  subLoading: boolean;
}
const showFormParams = reactive({
  questionName: '',
  type: ''
});
const quesform = reactive({
  questionType: [
    {
      label: '单选题',
      value: '0'
    },
    {
      label: '多选题',
      value: '1'
    },
    {
      label: '不定项选择题',
      value: '2'
    },
    {
      label: '填空题',
      value: '3'
    },
    {
      label: '实操题',
      value: '5'
    },
    {
      label: '其他',
      value: '6'
    }
  ]
});
const deleteFrom = () => {
  message.success('删除');
};
const delModalRef = ref();
const formId = ref();
// const emit = defineEmits<{
//   (e: 'click', num: number): void;
// }>();

// 上传图片直接判断是否为
const beforeOutLineUpload = async (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }): Promise<boolean> => {
  const result = fileTypeOfOutLine(data);
  if (result === false) {
    message.error('只能上传ppt或pdf或MD格式的图片文件，请重新上传');
    return false;
  }
  return true;
};

const beforeVideoUpload = async (data: { file: UploadFileInfo; fileList: UploadFileInfo[] }): Promise<boolean> => {
  const result = fileTypeOfVideo(data);
  if (result === false) {
    message.error('只能上传mp4格式的视频文件，请重新上传');
    return false;
  }
  return true;
};

const actionPaperRef = ref();
// 获取习题小节关联列表
const loadPaperDataTable = async (res: any) => {
  const Param = {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    unitId: formParams.value.id,
    pageSize: res.size,
    current: res.current
  };
  const result = await getUnitPracticeList({ ...formId.value, ...Param });
  return result.data;
};

const reloadPaperTable = () => {
  actionPaperRef.value.reload();
};
defineExpose({
  reloadPaperTable
});
const delData = ref<number>(0); // 删除数据的ID
const delText = ref('');
const checkedRowKeysRef = ref([]);

const handleCheck = (rowKeys: never[]) => {
  checkedRowKeysRef.value = rowKeys;
  // console.log(rowKeys, actionRef.value.tableElRef.data);
  const pageData = actionRef.value.tableElRef.data;
  // checkedRowKeysRef.value = pageData.map(row => row.key);
  // console.log(pageData)
  // eslint-disable-next-line consistent-return
  pageData.forEach((element: { id: any; questionScore: any }) => {
    if (rowKeys === element.id) {
      if (element.questionScore) {
        console.log(element);
      } else {
        return message.error('请先输入分数');
      }
    }
  });
};
// eslint-disable-next-line consistent-return
const onPositiveClick = async () => {
  const pageData = actionRef.value.tableElRef.data;
  // pageData.forEach(x => {
  //   console.log(x);
  // });
  // checkedRowKeysRef.value;
  const unitPractice = [];
  Object.keys(checkedRowKeysRef.value).forEach(y => {
    Object.keys(pageData).forEach(i => {
      // eslint-disable-next-line no-cond-assign
      if ((pageData[i].id = checkedRowKeysRef.value[y])) {
        try {
          if (!pageData[i].questionScore) {
            message.error('请先输入分数');
            throw Error();
          }
          const params = {
            // eslint-disable-next-line @typescript-eslint/no-use-before-define
            unitId: formParams.value.id,
            questionId: pageData[i].id,
            questionScore: pageData[i].questionScore
          };
          unitPractice.push(params);
        } catch (e) {
          console.log(e);
        }
      }
    });
  });
  const params = {
    unitPractice
  };
  const { data: result } = await addUnitPractice(params);
  console.log(result);
  // pageData.forEach(element => {
  // 	checkedRowKeysRef.value.forEach
  //   // if (rowKeys == element.id) {
  //   //   if (element.questionScore) {
  //   //     console.log(element);
  //   //   } else {
  //   //     return message.error('请先输入分数');
  //   //   }
  //   // }
  // });
};
// 获取习题列表
const loadDataTable = async (res: any) => {
  console.log(showFormParams);
  const Param = {
    pageSize: res.size,
    current: res.current
  };
  const result = await getPaperList({ ...showFormParams, ...Param });
  return result.data;
};
const reloadDataTable = () => {
  actionRef.value.reload();
};
const save = async () => {
  const pageData = actionPaperRef.value.tableElRef.data;
  const params = {
    unitPractice: []
  };
  if (pageData.length > 0) {
    Object.keys(pageData).forEach(i => {
      const saveData = {
        id: pageData[i].id,
        unitId: pageData[i].unitId,
        questionId: pageData[i].questionId,
        questionScore: pageData[i].questionScore
      };
      params?.unitPractice?.push(saveData);
    });
  } else {
    const saveData = {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      unitId: formParams.value.id
    };
    params?.unitPractice?.push(saveData);
  }

  const result = await editUnitPractice(params);
  console.log(result);
  if (!result.error) {
    message.success('修改成功');
  }
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  resetFrom();
  // 	createTime: "2022-05-12 16:12:02"
  // creater: 10086
  // id: 10
  // questionId: 54
  // questionScore: 44
  // unitId: 1
};

const props = withDefaults(defineProps<Props>(), {
  isShowForm: false,
  addOrEdit: false,
  formParams: () => {
    return {
      type: 1,
      label: '',
      note: '',
      chapterId: 0,
      need: ''
    };
  }
});
const { formParams } = toRefs(props);
const emit = defineEmits(['handleReset', 'reGetTreeData', 'updateisShowForm']); // 定义一个变量来接收父组件传来的方法
const resetFrom = () => {
  console.log(123);
  emit('updateisShowForm', false);

  emit('handleReset');
};
// table的操作列
const actionColumn = reactive({
  width: 30,
  title: '操作',
  key: 'action',
  fixed: 'right',
  render(record: Recordable<any>) {
    return h(TableAction as any, {
      style: 'button',
      actions: [
        {
          label: '删除',
          icon: 'ic:outline-delete-outline',
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onClick: handleDelete.bind(null, record)
        }
      ]
    });
  }
});
const chapterDelete = (record: Recordable) => {
  console.log('章节删除', record);
  console.log(props.formParams);
  delText.value = props.formParams.label;
  delData.value = props.formParams.chapterId;
  delModalRef.value.showDelModal = true;
};
const handleDelete = async (record: Recordable) => {
  console.log('小节删除', record);
  const pageData = actionPaperRef.value.tableElRef.data;
  pageData.forEach((element: { id: any }, index: any) => {
    if (element.id === record.id) {
      console.log(element, index);
      pageData.splice(index, 1);
    }
  });
  const params = [];
  Object.Keys(pageData).forEach(i => {
    const saveData = {
      id: pageData[i].id,
      unitId: pageData[i].unitId,
      questionId: pageData[i].questionId,
      questionScore: pageData[i].questionScore
    };
    params.push(saveData);
  });

  // const result = await editUnitPractice(params);
  // console.log(result);
};

const fileList: File[] = []; // 文件
const fileType: string | number[] | Blob = [];
const customRequestOutline = ({ file }: UploadCustomRequestOptions, key: number) => {
  fileList.push(file.file);
  // Form.append('file', file.file);
  fileType.push(key);
  // console.log(key);
  // fileList.push(file.file);
};

function formSubmit() {
  // eslint-disable-next-line consistent-return
  formRef.value.validate(async (errors: boolean) => {
    if (!errors) {
      console.log(props.addOrEdit); // true 新建 false 编辑
      console.log(props.formParams.type === 1 ? '新建章节' : '新建课时');
      console.log(route.query);
      if (props.addOrEdit === true && props.formParams.type === 1) {
        // 新建章节
        if (!props.formParams.label) {
          return message.error('请填写章节标题');
        }
        const params = {
          courseId: route.query.id,
          chapterName: props.formParams.label,
          note: props.formParams.note
        };
        const result = await addChapter(params);
        if (!result?.error?.msg) {
          message.success('新增章节成功');
        }
        resetFrom();
      } else if (props.addOrEdit === false && props.formParams.type === 1) {
        // 编辑章节
        if (!props.formParams.label) {
          return message.error('请填写章节标题');
        }
        const params = {
          id: route.query.id,
          chapterId: props.formParams.chapterId || 1,
          chapterName: props.formParams.label,
          note: props.formParams.note
        };
        const result = await editChapter(params);
        if (!result?.error?.msg) {
          message.success('编辑章节成功');
        }
        resetFrom();
      } else if (props.addOrEdit === true && props.formParams.type === 2) {
        const Form = new FormData();
        fileList.forEach(file => Form.append('file', file));
        Form.append('details', props.formParams.note);
        Form.append('unitName', props.formParams.label);
        Form.append('chapterId', props.formParams.chapterId);
        Form.append('enableReport', enableReport.value ? 1 : 0);
        Form.append('development', props.formParams.need);
        Form.append('fileFlag', fileType);
        console.log(fileList);
        // const param = {
        //   file: fileList,
        //   details: props.formParams.note,
        //   unitName: props.formParams.label,
        //   chapterId: props.formParams.chapterId,
        //   enableReport: enableReport.value ? 1 : 0
        // };
        const result = await unitAdd(Form);
        if (!result.error) {
          resetFrom();
          return message.success('保存成功');
        }

        // reloadPaperTable();
      } else if (props.addOrEdit === false && props.formParams.type === 2) {
        const Form = new FormData();
        fileList.forEach(file => Form.append('file', file));
        Form.append('details', props.formParams.note);
        Form.append('unitName', props.formParams.label);
        Form.append('chapterId', props.formParams.chapterId);
        Form.append('enableReport', enableReport.value ? 1 : 0);
        Form.append('development', props.formParams.need);
        Form.append('unitId', props.formParams.id);
        Form.append('fileFlag', fileType);
        // console.log(Form, fileType);
        // console.log(fileList);
        // const param = {
        //   file: fileList,
        //   details: props.formParams.note,
        //   unitName: props.formParams.label,
        //   chapterId: props.formParams.chapterId,
        //   enableReport: enableReport.value ? 1 : 0
        // };
        const result = unitAdd(Form);
        if (!result.error) {
          resetFrom();
          return message.success('保存成功');
        }
        // reloadPaperTable();
      }
      emit('reGetTreeData');
    } else {
      message.error('请填写完整信息');
    }
  });
}
</script>
