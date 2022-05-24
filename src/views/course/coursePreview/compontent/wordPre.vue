<!--
 * @Author: ZHENG
 * @Date: 2022-05-14 19:12:42
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-23 23:21:22
 * @FilePath: \work\src\views\course\coursePreview\compontent\wordPre.vue
 * @Description:

-->
<template>
  <iframe height="100%" style="height: 500px" frameBorder="0" :src="url" width="100%"></iframe>
</template>
<script lang="ts" setup>
interface Props {
  src: string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<Props>(), {
  src: ''
});
// const result = 'http://120.79.129.174:9000/hms/reportbc840ddf965f47f5b66e087ea85c6a48.doc';
// const resultNew = encodeURIComponent(result);
const url = `https://view.xdocin.com/view?src=${props.src}`;

// const url =
//   'https://view.xdocin.com/file_8po7nm3n2j2kc43wnrrbapplsnu.htm?p=eyJfcyI6Im9maWF3bmE1ajNvaXBkdDIiLCJfdCI6IjE2NTMzMTkzNzgiLCJfc2F2ZWFibGUiOiJ0cnVlIn0%3D';
</script>
