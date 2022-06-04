<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 14:33:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-04 15:23:14
 * @FilePath: \work\src\views\test\addQuest\index.vue
 * @Description:
-->
<template>
  <n-card>
    <n-card title="📖 基本信息" :bordered="false">
      <n-form
        ref="formRef"
        :model="fromModel"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
      >
        <!-- 所属题库 -->
        <n-form-item label="所属题库" path="dataBaseName">
          <n-input v-model:value="fromModel.dataBaseName" :style="{ width: '50%' }" disabled placeholder="请选择题库" />
          <n-button @click="chooseDataBase">选择题库</n-button>
        </n-form-item>
        <!-- 题目类型 默认选择单选 0 单选 1 多选 7判断 3 填空题 4 简答题 5 编辑题 6 其他-->
        <n-form-item label="题目类型" path="questionType">
          <n-button-group size="small">
            <n-button
              :style="{
                color: fromModel.questionType === 0 ? '#1890ff' : '',
                border: fromModel.questionType === 0 ? '2px solid #1890ff' : ''
              }"
              size="large"
              @click="changeQuestionType(0)"
              >单选题</n-button
            >
            <n-button
              :style="{
                color: fromModel.questionType === 1 ? 'blue' : '',
                border: fromModel.questionType === 1 ? '2px solid #1890ff' : ''
              }"
              size="large"
              @click="changeQuestionType(1)"
              >多选题</n-button
            >
            <n-button
              :style="{
                color: fromModel.questionType === 7 ? '#1890ff' : '',
                border: fromModel.questionType === 7 ? '2px solid #1890ff' : ''
              }"
              size="large"
              @click="changeQuestionType(7)"
              >判断题</n-button
            >
            <n-button
              :style="{
                color: fromModel.questionType === 3 ? 'blue' : '',
                border: fromModel.questionType === 3 ? '2px solid #1890ff' : ''
              }"
              size="large"
              @click="changeQuestionType(3)"
              >填空题</n-button
            >
            <n-button
              :style="{
                color: fromModel.questionType === 4 ? 'blue' : '',
                border: fromModel.questionType === 4 ? '2px solid #1890ff' : ''
              }"
              size="large"
              @click="changeQuestionType(4)"
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
        <n-form-item label="题干" path="questionName">
          <wangEditor ref="wangEditorStemRef" :props-value="fromModel.questionName"></wangEditor>
        </n-form-item>
        <!-- 单选 -->
        <template v-if="fromModel.questionType === 0">
          <n-form-item label="选项" path="problems">
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
                  <n-form-item :label="`选项${radioOption[index]}`" path="problem">
                    <n-radio
                      :checked="checkedValue === radioOption[index]"
                      :value="radioOption[index]"
                      name="basic-demo"
                      @change="handleChange"
                    >
                      正确
                    </n-radio>
                    <wangEditor :ref="el => (wangEditorRadioRef[index] = el)" :props-value="element.value"></wangEditor>
                    <n-button quaternary circle @click="delRadio('radioList', index)">
                      <template #icon>
                        <n-icon><DeleteTwotone /></n-icon>
                      </template>
                    </n-button>
                    <n-button quaternary circle>
                      <template #icon
                        ><n-icon><DragOutlined /></n-icon
                      ></template>
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
        <!-- 多选 -->
        <template v-if="fromModel.questionType === 1">
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
                    <wangEditor :ref="el => (wangEditorMultiRef[index] = el)" :props-value="element.value"></wangEditor>
                    <n-button quaternary circle @click="delRadio('multiList', index)">
                      <template #icon>
                        <n-icon><DeleteTwotone /></n-icon>
                      </template>
                    </n-button>
                    <n-button quaternary circle>
                      <template #icon
                        ><n-icon><DragOutlined /></n-icon
                      ></template>
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
        <!-- 判断 -->
        <template v-if="fromModel.questionType === 7">
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
                    <n-radio
                      :checked="checkedValue === radioOption[index]"
                      :value="radioOption[index]"
                      name="basic-demo"
                      @change="handleChange"
                    >
                      正确
                    </n-radio>
                    <wangEditor
                      :ref="el => (wangEditorDecideRef[index] = el)"
                      :props-value="element.value"
                    ></wangEditor>
                    <n-button quaternary circle>
                      <template #icon
                        ><n-icon><DragOutlined /></n-icon
                      ></template>
                    </n-button>
                  </n-form-item>
                </template>
              </Draggable>
            </n-space>
          </n-form-item>
        </template>
        <!-- 填空 -->
        <template v-if="fromModel.questionType === 3">
          <n-form-item label="选项" path="problems">
            <n-space vertical class="drag-box">
              <Draggable
                :list="blankList"
                :animation="100"
                item-key="id"
                class="list-group"
                :force-fallback="true"
                ghost-class="ghost"
              >
                <template #item="{ element, index }">
                  <n-form-item :label="`填空${index + 1}`" path="problem">
                    <wangEditor :ref="el => (wangEditorBlankRef[index] = el)" :props-value="element.value"></wangEditor>
                    <n-button quaternary circle @click="delRadio('blankList', index)">
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
            <n-button size="large" type="info" @click="addList('blankList')">
              <template #icon>
                <n-icon>
                  <PlusOutlined />
                </n-icon> </template
              >新增选项 {{ blankList.length }} / 26
            </n-button>
          </n-space>
        </template>
        <!-- 简答 -->
        <template v-if="fromModel.questionType === 4">
          <n-form-item label="参考答案" path="problems">
            <wangEditor ref="wangAnswerEditorRef" :props-value="answerList"></wangEditor>
          </n-form-item>
        </template>
        <!-- 其他 -->
        <template v-if="fromModel.questionType === 6">
          <n-form-item label="参考答案" path="problems">
            <wangEditor ref="wangOtherEditorRef" :props-value="otherList"></wangEditor>
          </n-form-item>
        </template>
      </n-form>
    </n-card>
    <n-card title="📖 其他信息" :bordered="false">
      <n-form
        ref="formRef"
        :model="fromModel"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
      >
        <n-form-item label="知识点" path="pointRelated">
          <!-- <n-input v-model:value="fromModel.point" :style="{ width: '50%' }" disabled placeholder="请选择知识点" />
          <n-button>选择知识点</n-button> -->
          <n-cascader
            v-model:value="fromModel.pointRelated"
            placeholder="请选择课时"
            :options="pointOptions"
            :check-strategy="'child'"
            :show-path="false"
            :multiple="true"
            remote
            :on-load="handleLoad"
          />
        </n-form-item>
        <!-- 难易度 4 较难 3 难 2 中 1易 0 较易 -->
        <n-form-item label="难易度" path="difficultLevel">
          <n-button-group size="small">
            <n-button
              :style="{
                color: fromModel.difficultLevel === 4 ? '#1890ff' : '',
                border: fromModel.difficultLevel === 4 ? '2px solid #1890ff' : ''
              }"
              size="large"
              @click="changeproblemsType(4)"
              >较难</n-button
            >
            <n-button
              :style="{
                color: fromModel.difficultLevel === 3 ? '#1890ff' : '',
                border: fromModel.difficultLevel === 3 ? '2px solid #1890ff' : ''
              }"
              size="large"
              @click="changeproblemsType(3)"
              >难</n-button
            >
            <n-button
              :style="{
                color: fromModel.difficultLevel === 2 ? '#1890ff' : '',
                border: fromModel.difficultLevel === 2 ? '2px solid #1890ff' : ''
              }"
              size="large"
              @click="changeproblemsType(2)"
              >中</n-button
            >
            <n-button
              :style="{
                color: fromModel.difficultLevel === 1 ? '#1890ff' : '',
                border: fromModel.difficultLevel === 1 ? '2px solid #1890ff' : ''
              }"
              size="large"
              @click="changeproblemsType(1)"
              >易</n-button
            >
            <n-button
              :style="{
                color: fromModel.difficultLevel === 0 ? '#1890ff' : '',
                border: fromModel.difficultLevel === 0 ? '2px solid #1890ff' : ''
              }"
              size="large"
              @click="changeproblemsType(0)"
              >较易</n-button
            >
          </n-button-group>
        </n-form-item>
        <n-form-item label="题目解析" path="questionAnalyse">
          <wangEditor ref="problemsAnalysissWangEditorRef" :props-value="fromModel.questionAnalyse"></wangEditor>
        </n-form-item>

        <n-space justify="center">
          <!-- <n-button size="large">返回</n-button> -->
          <n-button size="large" type="info" @click="saveQuestion(1)">保存</n-button>
          <n-button size="large" type="info" @click="saveQuestion(2)">保存并继续</n-button>
        </n-space>
      </n-form>
    </n-card>
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
  </n-card>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRoute } from 'vue-router'; // 调用hook
import { storeToRefs } from 'pinia';
import { CascaderOption, useMessage } from 'naive-ui';
import { PlusOutlined, DeleteTwotone, DragOutlined } from '@vicons/antd';
import Draggable from 'vuedraggable';
import { radioOption } from '@/enum';
import { useExamStore, useTabStore } from '@/store';
import { addPaperQuestion, editPaperQuestion, getListByPointCategoryId, getPointCategory } from '@/service';
import wangEditor from '@/components/wangEditor.vue';
import dataBaseModal from './components/showDataBase.vue';

const tab = useTabStore();

const router = useRoute();

const fromModel = ref({
  id: '',
  dataBaseName: '',
  dataBaseId: '',
  questionType: 0,
  questionName: '',
  pointRelated: '',
  difficultLevel: 4,
  questionAnalyse: ''
});
const rules = {
  dataBaseName: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请选择题库'
  },
  questionType: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请选择题目类型'
  },
  questionName: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请填写题干'
  },
  problems: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请选择选项'
  },
  difficultLevel: {
    required: true,
    trigger: ['blur', 'input'],
    message: '请选择难易度'
  }
};
/**
 * @author: ZHENG
 * @description: 题干的ref
 */
const wangEditorStemRef = ref(); // 题干
const problemsAnalysissWangEditorRef = ref(); // 解析
const radioList = ref(); // 单选的，value是编辑的时候的默认值
const multiList = ref(); // 多选题
const decideList = ref(); // 判断题
const blankList = ref(); // 填空题
const answerList = ref(); // 简答题
const otherList = ref(); // 其他题
const checkedValue = ref('');
const message = useMessage();
const examStore = useExamStore();
// const { questionList } = storeToRefs(examStore);
const questionData = ref({});
questionData.value = examStore.getQuestionList();
const addOrEdit = ref(false); // true 新增

const defaultFormValue = () => {
  fromModel.value = {
    id: '',
    dataBaseName: '',
    dataBaseId: '',
    questionType: 0,
    questionName: '',
    pointRelated: '',
    difficultLevel: 4,
    questionAnalyse: ''
  };
};

const pointOptions = ref([]);
const getChildren = async (option: CascaderOption) => {
  const { data: result } = await getListByPointCategoryId(option.value);
  const newList = result.map((item: { pointId: any; pointName: any }) => {
    return { value: `${option.value}-${item.pointId}`, label: item.pointName, isLeaf: 1 };
  });
  for (let i = 0; i <= (option as { depth: number }).depth; ++i) {
    option.children = newList;
  }
};
const getOptions = async () => {
  const { data: result } = await getPointCategory();
  const newList = result.map((item: { id: number; categoryName: string }) => {
    return { value: item.id, label: item.categoryName, depth: 1, isLeaf: false };
  });
  pointOptions.value = newList;
  for (let i = 0; i < fromModel.value.pointRelated?.length; i++) {
    for (let j = 0; j < pointOptions.value.length; j++) {
      const index = fromModel.value.pointRelated[i].indexOf('-');
      const indexNumber = fromModel.value.pointRelated[i].substring(0, index);
      if (pointOptions.value[j].value === indexNumber) {
        console.log(pointOptions.value[j]);
        getChildren(pointOptions.value[j]);
        // return;
      }
      //
      // console.log(indexNumber);
    }
  }
  console.log(questionData.value);
};
getOptions();
const handleLoad = (option: CascaderOption) => {
  return new Promise<void>(resolve => {
    getChildren(option);
    resolve();
  });
};
const getAddOrEdit = async () => {
  if (!questionData.value) {
    addOrEdit.value = true;
    const { questionType } = fromModel.value;
    if (questionType === 0) {
      // 单选题
      radioList.value = [{ id: 0, value: '' }, { id: 1, value: '' }, { id: 2 }, { id: 3 }];
    } else if (questionType === 1) {
      // 多选题
      multiList.value = [
        { id: 0, value: '', truemulti: false },
        { id: 1, value: '', truemulti: false }
      ];
    } else if (questionType === 7) {
      decideList.value = [
        { id: 0, value: '' },
        { id: 1, value: '' }
      ];
    } else if (questionType === 3) {
      // 填空题
      blankList.value = [{ id: 0, value: '' }];
    } else if (questionType === 4) {
      answerList.value = '';
    } else if (questionType === 6) {
      otherList.value = '';
    }
  } else {
    addOrEdit.value = false;
    // 修改
    const {
      id,
      bankRelated: dataBaseId,
      bankName: dataBaseName,
      questionType,
      questionName,
      questionOption,
      difficultLevel,
      questionAnalyse,
      pointRelated,
      questionAnswer
    } = questionData.value;
    const params = {
      id,
      dataBaseId,
      dataBaseName,
      questionType,
      questionName,
      difficultLevel,
      questionAnalyse,
      pointRelated: JSON.parse(pointRelated)
    };
    if (questionType === 0) {
      // 单选题
      const radioQuestionOption = JSON.parse(questionOption);
      radioList.value = []; // 先清空
      radioQuestionOption.forEach((item, index) => {
        radioList.value.push({ id: index, value: item });
      });
      checkedValue.value = questionAnswer;
    } else if (questionType === 1) {
      // 多选题multiList
      const multiQuestionOption = JSON.parse(questionOption);
      const multiQuestionAnswer = JSON.parse(questionAnswer);
      console.log(multiQuestionAnswer);
      multiList.value = [];
      multiQuestionOption.forEach((item, index) => {
        multiList.value.push({ id: index, value: item });
      });
      multiQuestionAnswer.forEach((item, index) => {
        multiList.value[item].truemulti = true;
      });
      // 		  { id: 0, value: '', truemulti: false },
      // { id: 1, value: '', truemulti: false }
      // multiList.value.push()
    } else if (questionType === 7) {
      // 判断题
      const decideQuestionOption = JSON.parse(questionOption);
      decideList.value = []; // 先清空
      decideQuestionOption.forEach((item, index) => {
        decideList.value.push({ id: index, value: item });
      });
      checkedValue.value = questionAnswer;
    } else if (questionType === 3) {
      const blankQuestionOption = JSON.parse(questionAnswer);
      blankList.value = [];
      blankQuestionOption.forEach((item, index) => {
        blankList.value.push({ id: index, value: item });
      });
    } else if (questionType === 4) {
      answerList.value = questionAnswer;
    } else if (questionType === 6) {
      otherList.value = questionAnswer;
    }
    Object.assign(fromModel.value, params);
  }
};
getAddOrEdit();

/**
 * @author: ZHENG
 * @description: 切换题目类型
 */
const changeQuestionType = (type: number) => {
  if (!addOrEdit.value) {
    return message.warning('修改题目不允许修改题目类型');
  }
  defaultFormValue();
  fromModel.value.questionType = type;
  checkedValue.value = '';
  getAddOrEdit();
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
 * @description: 切换难易程度
 * @param {*} type
 * @return {*}
 */
const changeproblemsType = (type: number) => {
  fromModel.value.difficultLevel = type;
};
/**
 * @author: ZHENG
 * @description: 正确答案
 * @param {*} e
 * @return {*}
 */
const handleChange = (e: Event) => {
  checkedValue.value = (e.target as HTMLInputElement).value;
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
  } else if (type === 'blankList') {
    param.id = blankList.value.length;
    blankList.value.push(param);
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
  } else if (type === 'blankList') {
    if (blankList.value.length < 2) {
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
  } else if (delType.value === 'blankList') {
    blankList.value.splice(delData.value, 1);
  }
};
const wangEditorRadioRef = ref([]); // 单选题的wangEditor
const wangEditorMultiRef = ref([]); // 多选题wangEditor
const wangEditorDecideRef = ref([]); // 判断题
const wangEditorBlankRef = ref([]); // 填空题
const wangAnswerEditorRef = ref(); // 简答题
const wangOtherEditorRef = ref(); // 其他
/**
 * @author: ZHENG
 * @description: 保存单选题，题目类型不同保存拆分出去，方便维护
 * @param {*} dataBaseId 题库ID，
 * @param {*} questionType 题库类型,
 * @param {*} difficultLevel 难易度
 * @param {*} questionName 题干
 * @param {*} questionAnalyse 打哪解析
 */
const saveRadioQuestion = async (
  dataBaseId,
  questionType,
  difficultLevel,
  questionName,
  questionAnalyse,
  pointRelated
) => {
  if (checkedValue?.value === '') {
    return message.warning('未选择正确答案');
  }
  let questionOption = [];
  let questionAnswer = '';
  for (let i = 0; i < wangEditorRadioRef.value.length; i++) {
    if (wangEditorRadioRef.value[i]?.valueHtml) {
      const param = {};
      param[i] = `${wangEditorRadioRef.value[i].valueHtml}`;
      questionOption.push(param[i]);
    }
  }
  questionOption = JSON.stringify(questionOption);
  questionAnswer = checkedValue?.value;
  if (addOrEdit.value === true) {
    const param = {
      questionName,
      mediaSource: 0,
      questionType,
      questionAnalyse,
      questionOption,
      pointRelated,
      bankRelated: dataBaseId,
      questionAnswer,
      difficultLevel,
      status: 0,
      note: ''
    };
    const result = await addPaperQuestion(param);
    if (!result.error) {
      message.success('新增完成');
    }
  } else {
    const { id } = fromModel.value;
    const param = {
      id,
      questionName,
      mediaSource: 0,
      questionType,
      questionAnalyse,
      questionOption,
      pointRelated,
      bankRelated: dataBaseId,
      questionAnswer,
      difficultLevel,
      status: 0,
      note: ''
    };
    const result = await editPaperQuestion(param);
    if (!result.error) {
      message.success('修改完成');
    }
  }
};
/**
 * @author: ZHENG
 * @description: 保存多选题
 * @param {*} dataBaseId
 * @param {*} questionType
 * @param {*} difficultLevel
 * @param {*} questionName
 * @param {*} questionAnalyse
 * @return {*}
 */
const saveMultQuestion = async (
  dataBaseId,
  questionType,
  difficultLevel,
  questionName,
  questionAnalyse,
  pointRelated
) => {
  let questionOption = [];
  let questionAnswer = [];
  for (let i = 0; i < wangEditorMultiRef.value.length; i++) {
    if (wangEditorMultiRef.value[i]?.valueHtml) {
      const param = {};
      param[i] = `${wangEditorMultiRef.value[i].valueHtml}`;
      questionOption.push(param[i]);
    }
    if (multiList.value[i].truemulti) {
      console.log(radioOption[i]);
      questionAnswer.push(i);
    }
    // console.log(wangEditorMultiRef.value[i].valueHtml);
    // console.log(multiList.value[i].truemulti);
  }
  questionOption = JSON.stringify(questionOption);
  questionAnswer = JSON.stringify(questionAnswer);
  if (addOrEdit.value === true) {
    const param = {
      questionName,
      mediaSource: 0,
      questionType,
      questionAnalyse,
      questionOption,
      pointRelated,
      bankRelated: dataBaseId,
      questionAnswer,
      difficultLevel,
      status: 0,
      note: ''
    };
    const result = await addPaperQuestion(param);
    if (!result.error) {
      message.success('新增完成');
    }
  } else {
    const { id } = fromModel.value;
    const param = {
      id,
      questionName,
      mediaSource: 0,
      questionType,
      questionAnalyse,
      questionOption,
      pointRelated,
      bankRelated: dataBaseId,
      questionAnswer,
      difficultLevel,
      status: 0,
      note: ''
    };
    const result = await editPaperQuestion(param);
    if (!result.error) {
      message.success('修改完成');
    }
  }
};
const saveDecideQuestion = async (
  dataBaseId,
  questionType,
  difficultLevel,
  questionName,
  questionAnalyse,
  pointRelated
) => {
  let questionOption = [];
  let questionAnswer = '';
  for (let i = 0; i < wangEditorDecideRef.value.length; i++) {
    if (wangEditorDecideRef.value[i]?.valueHtml) {
      const param = {};
      param[i] = `${wangEditorDecideRef.value[i].valueHtml}`;
      questionOption.push(param[i]);
    }
  }
  questionOption = JSON.stringify(questionOption);
  questionAnswer = radioOption[checkedValue?.value];
  if (addOrEdit.value === true) {
    const param = {
      questionName,
      mediaSource: 0,
      questionType,
      questionAnalyse,
      questionOption,
      pointRelated,
      bankRelated: dataBaseId,
      questionAnswer,
      difficultLevel,
      status: 0,
      note: ''
    };
    const result = await addPaperQuestion(param);
    if (!result.error) {
      message.success('新增完成');
    }
  } else {
    const { id } = fromModel.value;
    const param = {
      id,
      questionName,
      mediaSource: 0,
      questionType,
      questionAnalyse,
      questionOption,
      pointRelated,
      bankRelated: dataBaseId,
      questionAnswer,
      difficultLevel,
      status: 0,
      note: ''
    };
    const result = await editPaperQuestion(param);
    if (!result.error) {
      message.success('修改完成');
    }
  }
};
const saveBlankQuestion = async (
  dataBaseId,
  questionType,
  difficultLevel,
  questionName,
  questionAnalyse,
  pointRelated
) => {
  let questionAnswer = [];
  for (let i = 0; i < wangEditorBlankRef.value.length; i++) {
    if (wangEditorBlankRef.value[i]?.valueHtml) {
      const param = {};
      param[i] = `${wangEditorBlankRef.value[i].valueHtml}`;
      questionAnswer.push(param[i]);
    }
  }
  questionAnswer = JSON.stringify(questionAnswer);
  if (addOrEdit.value === true) {
    const param = {
      questionName,
      mediaSource: 0,
      questionType,
      questionAnalyse,
      questionOption: '',
      pointRelated,
      bankRelated: dataBaseId,
      questionAnswer,
      difficultLevel,
      status: 0,
      note: ''
    };
    const result = await addPaperQuestion(param);
    if (!result.error) {
      message.success('新增完成');
    }
  } else {
    const { id } = fromModel.value;
    const param = {
      id,
      questionName,
      mediaSource: 0,
      questionType,
      questionAnalyse,
      questionOption: '',
      pointRelated,
      bankRelated: dataBaseId,
      questionAnswer,
      difficultLevel,
      status: 0,
      note: ''
    };
    const result = await editPaperQuestion(param);
    if (!result.error) {
      message.success('修改完成');
    }
  }
};
const saveAnswerQuestion = async (
  dataBaseId,
  questionType,
  difficultLevel,
  questionName,
  questionAnalyse,
  pointRelated
) => {
  const questionAnswer = wangAnswerEditorRef.value.valueHtml;
  if (addOrEdit.value === true) {
    const param = {
      questionName,
      mediaSource: 0,
      questionType,
      questionAnalyse,
      questionOption: '',
      pointRelated,
      bankRelated: dataBaseId,
      questionAnswer,
      difficultLevel,
      status: 0,
      note: ''
    };
    const result = await addPaperQuestion(param);
    if (!result.error) {
      message.success('新增完成');
    }
  } else {
    const { id } = fromModel.value;
    const param = {
      id,
      questionName,
      mediaSource: 0,
      questionType,
      questionAnalyse,
      questionOption: '',
      pointRelated,
      bankRelated: dataBaseId,
      questionAnswer,
      difficultLevel,
      status: 0,
      note: ''
    };
    const result = await editPaperQuestion(param);
    if (!result.error) {
      message.success('修改完成');
    }
  }
};
const saveOtherQuestion = async (
  dataBaseId,
  questionType,
  difficultLevel,
  questionName,
  questionAnalyse,
  pointRelated
) => {
  const questionAnswer = wangOtherEditorRef.value.valueHtml;
  if (addOrEdit.value === true) {
    const param = {
      questionName,
      mediaSource: 0,
      questionType,
      questionAnalyse,
      questionOption: '',
      pointRelated,
      bankRelated: dataBaseId,
      questionAnswer,
      difficultLevel,
      status: 0,
      note: ''
    };
    const result = await addPaperQuestion(param);
    if (!result.error) {
      message.success('新建完成');
    }
  } else {
    const { id } = fromModel.value;
    const param = {
      id,
      questionName,
      mediaSource: 0,
      questionType,
      questionAnalyse,
      questionOption: '',
      pointRelated,
      bankRelated: dataBaseId,
      questionAnswer,
      difficultLevel,
      status: 0,
      note: ''
    };
    const result = await editPaperQuestion(param);
    if (!result.error) {
      message.success('修改完成');
    }
  }
};
const saveQuestion = async type => {
  const { dataBaseId, questionType, difficultLevel, pointRelated: point } = fromModel.value; // 题库ID，题库类型, 难易度
  const questionName = wangEditorStemRef.value.valueHtml; // 题干的值
  const questionAnalyse = problemsAnalysissWangEditorRef.value.valueHtml; // 解析的值
  // console.log(dataBaseId, questionType, difficultLevel, questionName, questionAnalyse);
  const pointRelated = JSON.stringify(point);
  if (!dataBaseId) {
    return message.error('请选择所选题库');
  }
  if (!questionName) {
    return message.error('请输入题干');
  }

  if (questionType === 0) {
    saveRadioQuestion(dataBaseId, questionType, difficultLevel, questionName, questionAnalyse, pointRelated);
  } else if (questionType === 1) {
    saveMultQuestion(dataBaseId, questionType, difficultLevel, questionName, questionAnalyse, pointRelated);
  } else if (questionType === 7) {
    saveDecideQuestion(dataBaseId, questionType, difficultLevel, questionName, questionAnalyse, pointRelated);
  } else if (questionType === 3) {
    saveBlankQuestion(dataBaseId, questionType, difficultLevel, questionName, questionAnalyse, pointRelated);
  } else if (questionType === 4) {
    saveAnswerQuestion(dataBaseId, questionType, difficultLevel, questionName, questionAnalyse, pointRelated);
  } else if (questionType === 6) {
    saveOtherQuestion(dataBaseId, questionType, difficultLevel, questionName, questionAnalyse, pointRelated);
  }
  if (type === 1) {
    tab.removeTab('/test/addQuest');
  } else if (type === 2) {
    wangEditorStemRef.value.valueHtml = '';
    problemsAnalysissWangEditorRef.value.valueHtml = '';
    defaultFormValue();
    questionData.value = '';
    getAddOrEdit();
  }
};
</script>
<style style="scss" scoped>
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
