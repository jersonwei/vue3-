<!--
 * @Author: ZHENG
 * @Date: 2022-05-17 18:13:55
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-27 15:35:02
 * @FilePath: \work\src\components\wangEditor.vue
 * @Description:
-->
<template>
  <div style="border: 1px solid #ccc">
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
        valueHtml.value = `<p>${props.propsValue}</p>`;
      }, 1500);
    });

    const toolbarConfig = {
      excludeKeys: [
        'italic',
        'color',
        'emotion',
        'viewLink',
        'editLink',
        'insertVideo',
        'uploadVideo',
        'group-more-style' // 排除菜单组，写菜单组 key 的值即可
      ]
    };
    const editorConfig = { placeholder: '请输入内容...' };

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
