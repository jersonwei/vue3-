<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 14:33:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-31 10:41:19
 * @FilePath: \work\src\views\test\addQuest\index.vue
 * @Description:
-->
<template>
  <n-card title="📖 基本信息" :bordered="false">
    <n-form
      ref="formRef"
      :model="fromModel"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
    >
      <!-- 所属题库  dataBaseId dataBaseName-->
      <n-form-item label="所属题库" path="dataBaseName">
        <n-input v-model:value="fromModel.dataBaseName" :style="{ width: '50%' }" disabled placeholder="请选择题库" />
        <n-button @click="chooseDataBase">选择题库</n-button>
      </n-form-item>
      <!-- <n-form-item label="题目类型" path="problemsType">
        <n-button-group size="small">
          <n-button
            :style="{
              color: fromModel.questionType === 1 ? '#1890ff' : '',
              border: fromModel.questionType === 1 ? '2px solid #1890ff' : ''
            }"
            size="large"
            @click="changeQuestionType(1)"
            >单选题</n-button
          >
          <n-button
            :style="{
              color: fromModel.questionType === 3 ? 'blue' : '',
              border: fromModel.questionType === 3 ? '2px solid #1890ff' : ''
            }"
            size="large"
            @click="changeQuestionType(3)"
            >多选题</n-button
          >
          <n-button
            :style="{
              color: fromModel.questionType === 2 ? '#1890ff' : '',
              border: fromModel.questionType === 2 ? '2px solid #1890ff' : ''
            }"
            size="large"
            @click="changeQuestionType(2)"
            >判断题</n-button
          >
          <n-button
            :style="{
              color: fromModel.questionType === 4 ? 'blue' : '',
              border: fromModel.questionType === 4 ? '2px solid #1890ff' : ''
            }"
            size="large"
            @click="changeQuestionType(4)"
            >填空题</n-button
          >
          <n-button
            :style="{
              color: fromModel.questionType === 5 ? 'blue' : '',
              border: fromModel.questionType === 5 ? '2px solid #1890ff' : ''
            }"
            size="large"
            @click="changeQuestionType(5)"
            >简答题</n-button
          >
          <n-button
            disabled
            :style="{
              color: fromModel.questionType === 5 ? 'blue' : '',
              border: fromModel.questionType === 5 ? '2px solid #1890ff' : ''
            }"
            size="large"
            @click="changeQuestionType(5)"
            >编程题</n-button
          >
          <n-button
            :style="{
              color: fromModel.questionType === 6 ? 'blue' : '',
              border: fromModel.questionType === 6 ? '2px solid #1890ff' : ''
            }"
            size="large"
            @click="changeQuestionType(6)"
            >其他</n-button
          >
        </n-button-group>
      </n-form-item>
      <n-form-item label="题干" path="problems">
        <wangEditor ref="wangEditorStemRef" :props-value="fromModel.questionStem"></wangEditor>
      </n-form-item>
      <template v-if="fromModel.questionType === 1">
        <n-form-item label="选项" path="problemsType">
          <n-space vertical class="drag-box">
            <Draggable
              :list="radioList"
              :animation="100"
              item-key="id"
              class="list-group"
              :force-fallback="true"
              ghost-class="ghost"
            >
              <template #item="{ element, index }">
                <n-form-item :label="`选项${radioOption[index]}`" path="problemsType">
                  <n-radio :checked="checkedValue === index" :value="index" name="basic-demo" @change="handleChange">
                    正确
                  </n-radio>
                  <wangEditor :ref="el => (wangEditorRadioRef[index] = el)" :props-value="element.value"></wangEditor>
                  <n-button quaternary circle @click="delRadio('radioList', index)">
                    <template #icon>
                      <n-icon><DeleteTwotone /></n-icon>
                    </template>
                  </n-button>
                </n-form-item>
              </template>
            </Draggable>
          </n-space>
        </n-form-item>

        <n-space justify="center">
          <n-button size="large" type="info" @click="addList('radioList')">
            <template #icon>
              <n-icon>
                <PlusOutlined />
              </n-icon> </template
            >新增选项 {{ radioList.length }} / 26
          </n-button>
        </n-space>
      </template>
      <template v-if="fromModel.questionType === 2">
        <n-form-item label="选项" path="problems">
          <n-space vertical class="drag-box">
            <Draggable
              :list="decideList"
              :animation="100"
              item-key="id"
              class="list-group"
              :force-fallback="true"
              ghost-class="ghost"
            >
              <template #item="{ element, index }">
                <n-form-item :label="`选项${radioOption[index]}`" path="problem">
                  <n-radio :checked="checkedValue === index" :value="index" name="basic-demo" @change="handleChange">
                    正确
                  </n-radio>
                  <wangEditor :ref="el => (wangEditorRadioRef[index] = el)"></wangEditor>
                </n-form-item>
              </template>
            </Draggable>
          </n-space>
        </n-form-item>
      </template>
      <template v-if="fromModel.questionType === 3">
        <n-form-item label="选项" path="problems">
          <n-space vertical class="drag-box">
            <Draggable
              :list="multiList"
              :animation="100"
              item-key="id"
              class="list-group"
              :force-fallback="true"
              ghost-class="ghost"
            >
              <template #item="{ element, index }">
                <n-form-item :label="`选项${radioOption[index]}`" path="problem">
                  <n-checkbox v-model:checked="element.truemulti"> 正确 </n-checkbox>
                  <wangEditor :ref="el => (wangEditorRadioRef[index] = el)" :props-value="element.value"></wangEditor>
                  <n-button quaternary circle @click="delRadio('multiList', index)">
                    <template #icon>
                      <n-icon><DeleteTwotone /></n-icon>
                    </template>
                  </n-button>
                </n-form-item>
              </template>
            </Draggable>
          </n-space>
        </n-form-item>

        <n-space justify="center">
          <n-button size="large" type="info" @click="addList('multiList')">
            <template #icon>
              <n-icon>
                <PlusOutlined />
              </n-icon> </template
            >新增选项 {{ multiList.length }} / 26
          </n-button>
        </n-space>
      </template>
      <template v-if="fromModel.questionType === 4">
        <n-form-item label="选项" path="problems">
          <n-space vertical class="drag-box">
            <Draggable
              :list="multiList"
              :animation="100"
              item-key="id"
              class="list-group"
              :force-fallback="true"
              ghost-class="ghost"
            >
              <template #item="{ element, index }">
                <n-form-item :label="`选项${radioOption[index]}`" path="problem"
                  ><wangEditor ref="wangEditorRef" :props-value="element.value"></wangEditor>
                  <n-radio :checked="checkedValue === index" :value="index" name="basic-demo" @change="handleChange">
                    正确
                  </n-radio>
                  <n-button quaternary circle @click="delRadio('multiList', index)">
                    <template #icon>
                      <n-icon><DeleteTwotone /></n-icon>
                    </template>
                  </n-button>
                </n-form-item>
              </template>
            </Draggable>
          </n-space>
        </n-form-item>

        <n-space justify="center">
          <n-button size="large" type="info" @click="addList('multiList')">
            <template #icon>
              <n-icon>
                <PlusOutlined />
              </n-icon> </template
            >新增选项 {{ multiList.length }} / 26
          </n-button>
        </n-space>
      </template>
      <template v-if="fromModel.questionType === 5">
        <n-form-item label="参考答案" path="problem"><wangEditor ref="wangEditorRef"></wangEditor> </n-form-item>
      </template>
      <template v-if="fromModel.questionType === 6">
        <n-form-item label="参考答案" path="problem"><wangEditor ref="wangEditorRef"></wangEditor> </n-form-item>
      </template> -->
    </n-form>
  </n-card>
  <!-- <n-card title="📖 其他信息" :bordered="false">
    <n-form
      ref="formRef"
      :model="fromModel"
      :rules="rules"
      label-placement="left"
      label-width="auto"
      require-mark-placement="right-hanging"
    >
      <n-form-item label="知识点" path="problems">
        <n-input v-model:value="fromModel.problems" :style="{ width: '50%' }" disabled placeholder="请选择题库" />
        <n-button>选择知识点</n-button>
      </n-form-item>
      <n-form-item label="难易度" path="problemsType">
        <n-button-group size="small">
          <n-button
            :style="{
              color: fromModel.problemsType === 1 ? '#1890ff' : '',
              border: fromModel.problemsType === 1 ? '2px solid #1890ff' : ''
            }"
            size="large"
            @click="changeproblemsType(1)"
            >较难</n-button
          >
          <n-button
            :style="{
              color: fromModel.problemsType === 2 ? '#1890ff' : '',
              border: fromModel.problemsType === 2 ? '2px solid #1890ff' : ''
            }"
            size="large"
            @click="changeproblemsType(2)"
            >难</n-button
          >
          <n-button
            :style="{
              color: fromModel.problemsType === 3 ? '#1890ff' : '',
              border: fromModel.problemsType === 3 ? '2px solid #1890ff' : ''
            }"
            size="large"
            @click="changeproblemsType(3)"
            >中</n-button
          >
          <n-button
            :style="{
              color: fromModel.problemsType === 4 ? '#1890ff' : '',
              border: fromModel.problemsType === 4 ? '2px solid #1890ff' : ''
            }"
            size="large"
            @click="changeproblemsType(4)"
            >易</n-button
          >
          <n-button
            :style="{
              color: fromModel.problemsType === 5 ? '#1890ff' : '',
              border: fromModel.problemsType === 5 ? '2px solid #1890ff' : ''
            }"
            size="large"
            @click="changeproblemsType(5)"
            >较易</n-button
          >
        </n-button-group>
      </n-form-item>
      <n-form-item label="题目解析" path="problems">
        <wangEditor ref="problemsWangEditorRef"></wangEditor>
      </n-form-item>

      <n-space justify="center">
        <n-button size="large">返回</n-button>
        <n-button size="large" type="info" @click="saveQuestion">保存</n-button>
        <n-button size="large" type="info">保存并继续</n-button>
      </n-space>
    </n-form>
  </n-card> -->
  <n-modal
    v-model:show="showDelModal"
    preset="dialog"
    title="确认"
    content="确认要删除该选项吗?"
    positive-text="确认"
    negative-text="算了"
    @positive-click="submitCallback"
  />
  <dataBaseModal ref="dataBaseModalRef" @reload-table="choosedValue"></dataBaseModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useMessage } from 'naive-ui';
import { PlusOutlined, DeleteTwotone } from '@vicons/antd';
import Draggable from 'vuedraggable';
import { radioOption } from '@/enum';
import { addPaperQuestion } from '@/service';
import wangEditor from '@/components/wangEditor.vue';
import dataBaseModal from './components/showDataBase.vue';

const message = useMessage();
const fromModel = ref({
  dataBaseName: '',
  dataBaseId: ''
  // questionType: 1,
  // questionStem: '',
  // problemsType: 3
});
const rules = {
  dataBaseName: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请选择题库'
  },
  problems: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请填写题干'
  }
};
/**
 * @author: ZHENG
 * @description: 选择题库
 */
const dataBaseModalRef = ref();
const chooseDataBase = () => {
  dataBaseModalRef.value.showModalFn();
};

const choosedValue = (checkedValue, checkedValueName) => {
  fromModel.value.dataBaseId = checkedValue;
  fromModel.value.dataBaseName = checkedValueName;
};

/**
 * @author: ZHENG
 * @description: 切换题目类型
 */
const changeQuestionType = (type: number) => {
  fromModel.value.questionType = type;
  // checkedValue.value = '';
};

/**
 * @author: ZHENG
 * @description: 题干的ref
 */
const wangEditorStemRef = ref();

const checkedValue = ref('');
/**
 * @author: ZHENG
 * @description: 正确答案
 * @param {*} e
 * @return {*}
 */
const handleChange = (e: Event) => {
  checkedValue.value = parseInt((e.target as HTMLInputElement).value, 10);
};

const radioList = ref([{ id: 0, value: '' }, { id: 1 }, { id: 2 }, { id: 3 }]); // 单选
const decideList = ref([
  { id: 0, value: '' },
  { id: 1, value: '' }
]);
const multiList = ref([
  { id: 0, value: '', truemulti: false },
  { id: 1, value: '', truemulti: false }
]);

/**
 * @author: ZHENG
 * @description: 切换难易程度
 * @param {*} type
 * @return {*}
 */
const changeproblemsType = (type: number) => {
  fromModel.value.problemsType = type;
};

const showDelModal = ref(false);
/**
 * @author: ZHENG
 * @description: 新增选项
 */
const addList = (type: string) => {
  const param = {};
  if (type === 'radioList') {
    param.id = radioList.value.length;
    radioList.value.push(param);
  } else if (type === 'multiList') {
    param.id = multiList.value.length;
    multiList.value.push(param);
  }
};
const delData = ref();
const delType = ref();
/**
 * @author: ZHENG
 * @description: 删除选项
 * @param {*} index
 */
const delRadio = (type, index) => {
  if (type === 'radioList') {
    if (radioList.value.length < 3) {
      return;
    }
  } else if (type === 'multiList') {
    if (multiList.value.length < 3) {
      return;
    }
  }
  delData.value = index;
  delType.value = type;
  showDelModal.value = true;
};
/**
 * @author: ZHENG
 * @description: 删除
 * @return {*}
 */
const submitCallback = () => {
  if (delType.value === 'radioList') {
    radioList.value.splice(delData.value, 1);
  } else if (delType.value === 'multiList') {
    multiList.value.splice(delData.value, 1);
  }
};
const wangEditorRadioRef = ref([]);
const problemsWangEditorRef = ref();
// 新增还是修改
const saveQuestion = async () => {
  const { dataBaseId, questionType, problemsType } = fromModel.value; // 题库ID，题库类型
  const questionName = wangEditorStemRef.value.valueHtml; // 题干的值
  let questionOption = [];
  let questionAnswer = '';
  const trueAnswer = [];
  if (questionType === 1) {
    // 单选题
    if (checkedValue?.value === '') {
      return message.warning('未选择正确答案');
    }
    for (let i = 0; i < wangEditorRadioRef.value.length; i++) {
      if (wangEditorRadioRef.value[i]?.valueHtml) {
        const param = {};
        param[i] = `${[radioOption[i]]}:${wangEditorRadioRef.value[i].valueHtml}`;
        questionOption.push(param[i]);
      }
    }
    questionOption = JSON.stringify(questionOption);
    questionAnswer = checkedValue?.value;
  } else if (questionType === 2) {
    // 多选题
    if (checkedValue?.value === '') {
      return message.warning('未选择正确答案');
    }
    for (let i = 0; i < wangEditorRadioRef.value.length; i++) {
      if (wangEditorRadioRef.value[i]?.valueHtml) {
        const param = {};
        param[i] = `${[radioOption[i]]}:${wangEditorRadioRef.value[i].valueHtml}`;
        questionOption.push(param[i]);
      }
    }
    questionOption = JSON.stringify(questionOption);
    questionAnswer = checkedValue?.value;
  } else if (questionType === 3) {
    // 多选题
    for (let i = 0; i < wangEditorRadioRef.value.length; i++) {
      if (wangEditorRadioRef.value[i]?.valueHtml) {
        const param = {};
        param[i] = `${[radioOption[i]]}:${wangEditorRadioRef.value[i].valueHtml}`;
        questionOption.push(param[i]);
        trueAnswer.push(multiList[i].truemulti);
      }
    }
    questionOption = JSON.stringify(questionOption);
    trueAnswer = JSON.stringify(trueAnswer);
    questionAnswer = checkedValue?.value;
  }
  const questionAnalyse = problemsWangEditorRef.value.valueHtml;
  const param = {
    questionName,
    mediaSource: 0,
    questionType,
    questionOption,
    pointRelated: '1',
    bankRelated: dataBaseId,
    difficultLevel: problemsType,
    questionAnswer: questionType === 3 ? trueAnswer : questionAnswer,
    questionAnalyse,
    status: 0,
    note: ''
  };
  const result = await addPaperQuestion(param);
  console.log(result);
};
</script>
<style scoped>
/* :deep(.n-form-item-blank) {
  width: 70% !important;
} */
:deep(.n-form-item .n-form-item--left-labelled) {
  width: calc(100vw) !important;
}

.drag-box {
  .items {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20px;
    margin-bottom: 20px;
    background: #e3e3e3;
    border-radius: 8px;
  }
}
</style>
