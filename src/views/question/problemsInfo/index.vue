<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 14:33:21
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-27 16:44:56
 * @FilePath: \work\src\views\question\problemsInfo\index.vue
 * @Description:
-->
<template>
  <n-card title="📖 题目信息  简答题" :bordered="false">
    <n-space vertical>
      <p style="text-indent: 2em; padding: 50px">
        甲遗失手链1条，被乙拾得。为找回手链，甲张贴了悬赏500元的寻物告示。后经人指证手链为乙拾得，甲要求乙返还，乙索要500元报酬，甲不同意，双方数次交涉无果。后乙在桥边玩耍时手链掉入河中被冲走。下列哪一选项是正确的
      </p>
      <n-form ref="formRef" :model="model" label-placement="left">
        <n-grid :cols="24" :x-gap="24">
          <n-form-item-gi
            :span="7"
            :label-style="{ fontSize: '20px', fontWeight: 'bold' }"
            label="所属题库:"
            path="inputValue"
          >
            <p style="font-size: 18px">一级分类 / 二级分类 / 题库名称</p>
          </n-form-item-gi>
          <n-form-item-gi
            :span="7"
            label="题库类型:"
            :label-style="{ fontSize: '20px', fontWeight: 'bold' }"
            path="textareaValue"
          >
            <p>简答题</p>
          </n-form-item-gi>
          <n-form-item-gi
            :span="7"
            label="难易度:"
            :label-style="{ fontSize: '20px', fontWeight: 'bold' }"
            path="selectValue"
          >
            <p>难</p>
          </n-form-item-gi>
          <n-form-item-gi
            :span="7"
            label="被引用次数:"
            :label-style="{ fontSize: '20px', fontWeight: 'bold' }"
            path="multipleSelectValue"
          >
            <p>20次</p>
          </n-form-item-gi>
          <n-form-item-gi
            :span="7"
            label="作答次数:"
            :label-style="{ fontSize: '20px', fontWeight: 'bold' }"
            path="datetimeValue"
          >
            <p>200次</p>
          </n-form-item-gi>
          <n-form-item-gi
            :span="7"
            label="设计知识点:"
            :label-style="{ fontSize: '20px', fontWeight: 'bold' }"
            path="switchValue"
          >
            <p>知识点一，知识点二，知识点三</p>
          </n-form-item-gi>
          <n-form-item-gi
            :span="24"
            label="参考答案:"
            :label-style="{ fontSize: '20px', fontWeight: 'bold' }"
            path="checkboxGroupValue"
          >
            <p>
              基于邮件附件场景,WPS开放平台提供云文档能力,添加邮件附件时,支持从金山文档中选取在线文档,区别传统邮件附件上传和下载环节,收集工作总结、周报无需下载,打开就能写,云端实时保存。
            </p>
          </n-form-item-gi>
          <n-form-item-gi
            :span="24"
            label="参考答案:"
            :label-style="{ fontSize: '20px', fontWeight: 'bold' }"
            path="checkboxGroupValue"
          >
            <p>
              a)正确组织工作。b)检查工作票所列安全措施是否正确完备，是否符合现场实际条件，必要时予以补充完善。c)工作前，对工作班成员进行工作任务、安全措施、技术措施交底和危险点告知，并确认每个工作班成员都已签名。d)严格执行工作票所列安全措施。e)监督工作班成员遵守本规程，正确使用劳动防护用品和安全工器具以及执行现场安全措施。f)关注工作班成员身体状况和精神状态是否出现异常迹象，人员变动是否合适。
            </p>
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </n-space>
  </n-card>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const model = reactive({
  inputValue: null,
  textareaValue: null,
  selectValue: null,
  multipleSelectValue: null,
  datetimeValue: null,
  nestedValue: {
    path1: null,
    path2: null
  },
  switchValue: false,
  checkboxGroupValue: null,
  radioGroupValue: null,
  radioButtonGroupValue: null,
  inputNumberValue: null,
  timePickerValue: null,
  sliderValue: 0,
  transferValue: null
});
</script>
<style scoped></style>
