<!--
 * @Author: ZHENG
 * @Date: 2022-05-17 18:13:55
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-04 10:12:36
 * @FilePath: \work\src\components\wangEditor.vue
 * @Description:
-->
<template>
  <div style="width: 60%; border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :default-config="toolbarConfig" :mode="mode" />
    <Editor
      v-model="valueHtml"
      style="height: 100px; overflow-y: hidden"
      :default-config="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>
<script>
import '@wangeditor/editor/dist/css/style.css'; // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { uploadPaperQuestion } from '@/service';

export default {
  components: { Editor, Toolbar },
  props: {
    propsValue: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();

    // 内容 HTML
    const valueHtml = ref();

    // 模拟 ajax 异步获取内容
    onMounted(() => {
      setTimeout(() => {
        console.log(editorRef.value);
        valueHtml.value = `${props.propsValue}`;
      }, 100);
    });

    const toolbarConfig = {
      toolbarKeys: [
        'bold',
        'underline',
        '|',
        'code',
        'bulletedList',
        'numberedList',
        'uploadImage',
        '|',
        'undo',
        'redo'
      ]
      // excludeKeys: [
      //   'italic',
      //   'color',
      //   'emotion',
      //   'viewLink',
      //   'editLink',
      //   'insertVideo',
      //   'uploadVideo',
      //   'group-more-style' // 排除菜单组，写菜单组 key 的值即可
      // ]
    };
    const editorConfig = { MENU_CONF: {}, placeholder: '请输入内容...' };
    editorConfig.MENU_CONF.uploadImage = {
      async customUpload(file, insertFn) {
        console.log(file);
        const Form = new FormData();
        Form.append('file', file);
        const { data: result } = await uploadPaperQuestion(Form);
        console.log(result);
        insertFn(result.url);
      }
      // async uploadPaperQuestion(file: File)
      //   async uploadPaperQuestion(file: File, insertFn: InsertFnType) {
      //     console.log(file);
      //   }
      //   // async customUpload(file: File, insertFn: InsertFnType) {
      //   //   // file 即选中的文件
      //   //   // 自己实现上传，并得到图片 url alt href
      //   //   const { data: result } = await uploadPaperQuestion(file);
      //   //   console.log(result);
      //   //   // 最后插入图片
      //   //   insertFn(url, alt, href);
      //   // }
    };

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    const handleCreated = editor => {
      editorRef.value = editor; // 记录 editor 实例，重要！
    };

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated
    };
  }
};
</script>
