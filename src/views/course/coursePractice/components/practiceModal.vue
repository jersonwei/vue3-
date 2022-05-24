<!--
 * @Author: ZHENG
 * @Date: 2022-05-12 17:34:13
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-24 17:09:17
 * @FilePath: \work\src\views\course\coursePractice\components\practiceModal.vue
 * @Description:
-->
<template>
  <n-modal
    v-if="showModalIf"
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    :style="bodyStyle"
    :header-style="headerSyle"
    title="测评报告"
    size="huge"
    :bordered="false"
    :segmented="segmented"
  >
    <n-space vertical>
      <n-card size="small">
        <n-space justify="space-between">
          <n-space>
            <template v-if="radioList.length">
              <p>单选题</p>
              <n-tag
                v-for="(item, index) in radioList"
                :key="index"
                v-model:checked="checked"
                checkable
                :style="{ color: getColor(item) }"
                :on-update:checked="value => checkTag(item)"
              >
                {{ item.questionId + 1 }}
              </n-tag>
            </template>
            <template v-if="multiList.length">
              <p>多选</p>
              <n-tag
                v-for="(item, index) in multiList"
                :key="index"
                v-model:checked="checked"
                checkable
                :style="{ color: getColor(item) }"
                :on-update:checked="value => checkTag(item)"
              >
                {{ item.questionId + 1 }}
              </n-tag>
            </template>
            <template v-if="indefiniteList.length">
              <p>不定项选择题</p>
              <n-tag
                v-for="(item, index) in indefiniteList"
                :key="index"
                v-model:checked="checked"
                checkable
                :style="{ color: getColor(item) }"
                :on-update:checked="value => checkTag(item)"
              >
                {{ item.questionId + 1 }}
              </n-tag>
            </template>
            <template v-if="exerciseList.length">
              <p>填空</p>
              <n-tag
                v-for="(item, index) in exerciseList"
                :key="index"
                v-model:checked="checked"
                checkable
                :style="{ color: getColor(item) }"
                :on-update:checked="value => checkTag(item)"
              >
                {{ item.questionId + 1 }}
              </n-tag>
            </template>
            <template v-if="answerList.length">
              <p>简答</p>
              <n-tag
                v-for="(item, index) in answerList"
                :key="index"
                v-model:checked="checked"
                checkable
                :style="{ color: getColor(item) }"
                :on-update:checked="value => checkTag(item)"
              >
                {{ item.questionId + 1 }}
              </n-tag>
            </template>
            <template v-if="operateList.length">
              <p>实操</p>
              <n-tag
                v-for="(item, index) in operateList"
                :key="index"
                v-model:checked="checked"
                checkable
                :style="{ color: getColor(item) }"
                :on-update:checked="value => checkTag(item)"
              >
                {{ item.questionId + 1 }}
              </n-tag>
            </template>
            <template v-if="otherList.length">
              <p>其他</p>
              <n-tag
                v-for="(item, index) in otherList"
                :key="index"
                v-model:checked="checked"
                checkable
                :style="{ color: getColor(item) }"
                :on-update:checked="value => checkTag(item)"
              >
                {{ item.questionId + 1 }}
              </n-tag>
            </template>
          </n-space>
          <n-gradient-text type="info">总分 {{ paperData.totalScore }} </n-gradient-text>
        </n-space>
      </n-card>
      <template v-if="checkTagType === '单选题'">
        <n-card :title="`${checkTagID + 1}${checkTagType}(本题 ${checkTagData.questionScore} 分)`" size="small">
          <p>{{ checkTagData.questionName }}</p>
          <n-radio-group :value="checkTagData.answerContent" disabled name="radiogroup">
            <n-space vertical>
              <n-radio v-for="song in checkTagData.questionOption" :key="song.value" :value="song.value">
                {{ song.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-card>
      </template>
      <template v-else-if="checkTagType === '多选题' || checkTagType === '不定项选择题'">
        <n-card :title="`${checkTagID + 1}${checkTagType}(本题 ${checkTagData.questionScore} 分)`" size="small">
          <p>{{ checkTagData.questionName }}</p>
          <n-checkbox-group v-model:value="checkTagData.answerContent" name="radiogroup">
            <n-space vertical>
              <n-checkbox
                v-for="(item, index) in checkTagData.questionOption"
                :key="index"
                disabled
                :value="item.value"
                :label="item.label"
              />
            </n-space>
          </n-checkbox-group>
        </n-card>
      </template>
      <template v-else-if="checkTagType === '填空题'">
        <n-card :title="`${checkTagID + 1}${checkTagType}(本题 ${checkTagData.questionScore} 分)`" size="small">
          <p>{{ checkTagData.questionName }}</p>
          <n-space v-for="(item, index) in checkTagData.answerContent" :key="index">
            <p class="borderBtm">{{ item }}</p>
          </n-space>
        </n-card>
      </template>
      <template v-else-if="checkTagType === '简答题' || checkTagType === '编程题' || checkTagType === '实操题'">
        <n-card :title="`${checkTagID + 1}${checkTagType}(本题 ${checkTagData.questionScore} 分)`" size="small">
          <p>{{ checkTagData.questionName }}</p>
          <n-space>
            <n-input v-model:value="checkTagData.answerContent" style="width: 500px" type="textarea"></n-input>
          </n-space>
        </n-card>
      </template>
      <template v-else-if="checkTagType === '其他'">
        <n-card :title="`${checkTagID + 1}${checkTagType}(本题 ${checkTagData.questionScore} 分)`" size="small">
          <p>{{ checkTagData.questionName }}</p>
          <n-input v-model:value="checkTagData.answerContent" style="width: 500px" type="textarea"></n-input>
        </n-card>
      </template>
      <n-card size="small">
        <n-space vertical>
          <p>正确答案:{{ checkTagData.questionAnswer }}</p>
          <p>答案解析:{{ checkTagData.questionAnalyse }}</p>
        </n-space>
      </n-card>
      <n-card size="small">
        <n-space justify="space-between">
          <n-space>
            <p>学生答案:{{ checkTagData.answerContent }}</p>
            <template v-if="checkTagType === '单选题'">
              <n-button
                v-if="checkTagData.answerContent === checkTagData.questionAnswer"
                size="tiny"
                disabled
                type="success"
              >
                正确
              </n-button>
              <n-button v-else size="tiny" disabled type="error"> 错误 </n-button>
            </template>
            <template v-else-if="checkTagType === '多选题' || checkTagType === '不定项选择题'">
              <n-button
                v-if="compareArraySort(checkTagData.answerContent, checkTagData.questionAnswer)"
                size="tiny"
                disabled
                type="success"
              >
                正确
              </n-button>
              <n-button v-else size="tiny" disabled type="error"> 错误 </n-button>
            </template>
          </n-space>

          <p v-if="checkTagType === '单选题'">系统评分：{{ checkTagData.score }}</p>
          <n-space v-else>
            <p>教师评分：</p>
            <n-input-number
              v-model:value="checkTagData.score"
              clearable
              placeholder="评分"
              @focus="handleFocus"
              @blur="handleBlur"
              @update:value="handleChange"
            />
          </n-space>
        </n-space>
      </n-card>
    </n-space>
    <template #footer>
      <n-space justify="center">
        <n-button :disabled="disabledLast" @click="lastQu">上一题</n-button>
        <n-button :disabled="disabledNext" @click="nextQu">下一题</n-button>
        <n-button type="primary"> 提交评分 </n-button>
      </n-space>
    </template>
  </n-modal>
</template>
<script lang="ts" setup>
import { computed, nextTick, ref, toRefs, watch } from 'vue';
import { updateUnitPracticeAnswers } from '@/service';
// import wangEditor from './wangEditor.vue';
// import { useCourseStore } from '@/store';

// const { setPractiveList, searchPractiveList } = useCourseStore();
const showModal = ref(false);
const checked = ref();
const compareArraySort = (a1: any, a2: any) => {
  let array1 = a1;
  let array2 = a2;
  if ((!array1 && array2) || (array1 && !array2)) return false;
  if (array1.length !== array2.length) return false;
  array1 = [].concat(array1);
  array2 = [].concat(array2);
  array1 = array1.sort();
  array2 = array2.sort();
  for (let i = 0, n = array1.length; i < n; i++) {
    if (array1[i] !== array2[i]) return false;
  }
  return true;
};
// 弹窗效果
const headerSyle = {
  height: '50px'
};
const bodyStyle = {
  width: '1000px'
};
const segmented = {
  content: 'soft',
  footer: 'soft'
} as const;
// 试卷信息
interface Props {
  practiceData: Object;
  unitId: number;
}

const paperData = ref([]); // 当前试卷上面的题目
const radioList = ref([]); // 单选题
const multiList = ref([]); // 多选题
const indefiniteList = ref([]); // 不定项 暂时不用
const answerList = ref([]); // 简答题
const exerciseList = ref([]); // 填空题
const operateList = ref([]); // 实操题
const otherList = ref([]); // 其他题

const props = defineProps<Props>();
const { practiceData } = toRefs(props);
const checkTagID = ref(0);
const checkTagData = ref();
const checkTagType = ref('');

// 禁用上一题下一题效果
const disabledLast = computed(() => {
  if (checkTagID.value === 0) {
    return true;
  }
  return false;
});
const disabledNext = computed(() => {
  if (checkTagID.value === paperData.value.unitPracticeAnswers.length - 1) {
    return true;
  }
  return false;
});

const checkTag = (item: any) => {
  console.log(item);
  checkTagID.value = item.questionId;
  checkTagData.value = item;
  checkTagType.value = item.label;
};
const lastQu = () => {
  checkTagID.value -= 1;
  checkTag(paperData.value.unitPracticeAnswers[checkTagID.value]);
};
const nextQu = () => {
  checkTagID.value += 1;
  checkTag(paperData.value.unitPracticeAnswers[checkTagID.value]);
};

// const enumPractice = ['单选题', '多选题', '不定项', '填空题', '简答题', '实操题'];
// const getUnitId = (unitId: string) => {
//   const i = unitId.indexOf('-');
//   const subUnitId = unitId.substring(i + 1);
//   return parseInt(subUnitId, 10);
// };
const showModalIf = ref(false);
const getKey = value => {
  const index = value.indexOf(':'); // 取到：的索引
  const Astr = value.substr(0, index);
  return Astr;
};

const refreshList = () => {
  paperData.value = []; // 当前试卷上面的题目
  radioList.value = []; // 单选题
  multiList.value = []; // 多选题
  indefiniteList.value = []; // 不定项 暂时不用
  answerList.value = []; // 简答题
  exerciseList.value = []; // 填空题
  operateList.value = []; // 实操题
  otherList.value = []; // 其他题
};
// 拆分试卷信息
const getPracticeType = () => {
  refreshList();
  // const unitIdNumber = getUnitId(unitId.value);
  paperData.value = practiceData.value;
  // const PractiveKey = `${unitIdNumber}+${data.id}`;
  // searchPractiveList(PractiveKey);
  // return;exercise;
  paperData.value.unitPracticeAnswers.forEach((x, index) => {
    const item = x;
    // 试卷信息拆分
    item.questionId = index;
    if (item.label === '单选题') {
      console.log('单选题', typeof item.questionOption);
      if (typeof item.questionOption === 'string') {
        const questionOption = JSON.parse(item.questionOption).map(e => ({ value: getKey(e), label: e }));
        item.questionOption = questionOption;
      }
      radioList.value.push(item);
    } else if (item.label === '多选题') {
      if (typeof item.questionOption === 'string') {
        const questionOption = JSON.parse(item.questionOption).map(e => ({ value: getKey(e), label: e }));
        item.questionOption = questionOption;
        item.questionAnswer = item.questionAnswer.split(',');
        item.answerContent = item.answerContent.split(',');
      }
      multiList.value.push(item);
    } else if (item.label === '不定项选择题') {
      if (typeof item.questionOption === 'string') {
        console.log(item.questionOption);
        const questionOption = JSON.parse(item.questionOption).map(e => ({ value: getKey(e), label: e }));
        item.questionOption = questionOption;
        item.questionAnswer = item.questionAnswer.split(',');
        item.answerContent = item.answerContent.split(',');
      }
      indefiniteList.value.push(item);
    } else if (item.label === '填空题') {
      if (typeof item.questionAnswer === 'string') {
        item.questionAnswer = JSON.parse(item.questionAnswer);
        item.answerContent = JSON.parse(item.answerContent);
      }

      exerciseList.value.push(item);
    } else if (item.label === '简答题') {
      answerList.value.push(item);
    } else if (item.label === '实操题') {
      operateList.value.push(item);
    } else if (item.label === '其他') {
      otherList.value.push(item);
    }
  }); // 课时ID
  // 在上面弄完之后，选中第一个值
  showModalIf.value = true;
  // console.log(unitIdNumber, data);
  // const practice = {};
  // practice[PractiveKey] = [radioList.value, answerList.value];
  // setPractiveList(practice);
  checkTag(paperData.value.unitPracticeAnswers[checkTagID.value]);
};
watch(showModal, async newValue => {
  // console.log('watch 已触发', newValue);
  if (newValue === true) {
    nextTick(async () => {
      await getPracticeType();
    });
  }
});
// eslint-disable-next-line consistent-return
const getColor = (item: number) => {
  if (item.id === checkTagData.value.id) {
    return 'green';
  }
};

// 评分的分数
const grade = ref(0);
// 获取过去的数据
const handleFocus = () => {
  grade.value = checkTagData.value.score;
};
const handleBlur = async () => {
  const value = checkTagData.value.score - grade.value;
  // console.log(grade.value, checkTagData.value.score);
  // console.log(paperData.value.totalScore, value);
  paperData.value.totalScore += value;
  const params = {
    id: checkTagData.value.id,
    score: checkTagData.value.score
  };
  const result = await updateUnitPracticeAnswers(params);
  if (result.error) {
    checkTagData.value.score = grade.value;
    paperData.value.totalScore -= value;
  }
};
defineExpose({ showModal });
</script>
<style scoped>
.success {
  color: green;
}
.error {
  color: red;
}
.borderBtm {
  border-bottom: 1px dashed #000;
}
</style>
