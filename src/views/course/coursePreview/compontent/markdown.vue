<!--
 * @Author: ZHENG
 * @Date: 2022-06-06 16:00:09
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-06-06 16:00:10
 * @FilePath: \work\src\views\course\coursePreview\compontent\markdown.vue
 * @Description:
-->
<template>
  <n-grid class="mt-4" cols="12" responsive="screen" :x-gap="12" :key="2">
    <n-gi span="3">
      <template v-if="loading">
        <div class="flex items-center justify-center py-4">
          <n-spin size="medium" />
        </div>
      </template>
      <template v-else
        ><n-scrollbar style="max-height: 620px; background-color: rgba(0, 0, 0, 0.1)">
          <div
            v-for="anchor in markDown.titles"
            :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
            @click="handleAnchorClick(anchor)"
          >
            <a style="cursor: pointer">{{ anchor.title }}</a>
          </div>
        </n-scrollbar>
      </template>
    </n-gi>
    <n-gi span="9">
      <n-scrollbar ref="scrollbarRef" style="max-height: 620px">
        <v-md-preview-html
          ref="previewMd"
          :html="markDown.html"
          preview-class="vuepress-markdown-body"
        ></v-md-preview-html>
      </n-scrollbar>
    </n-gi>
  </n-grid>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

const previewMd = ref();
const loading = ref(false);
const markDown = reactive({
  html: `<html>
<head>
<META http-equiv="Content-Type" content="text/html; charset=utf-8">
<style type="text/css">.b1{white-space-collapsing:preserve;}
.b2{margin: 1.0in 1.25in 1.0in 1.25in;}
.s1{font-weight:bold;}
.p1{margin-top:0.2361111in;margin-bottom:0.22916667in;text-align:start;hyphenate:auto;keep-together.within-page:always;keep-with-next.within-page:always;font-family:Calibri;font-size:22pt;}
.p2{margin-top:0.18055555in;margin-bottom:0.18055555in;text-align:start;hyphenate:auto;keep-together.within-page:always;keep-with-next.within-page:always;font-family:Arial;font-size:16pt;}
.p3{margin-top:0.18055555in;margin-bottom:0.18055555in;text-align:start;hyphenate:auto;keep-together.within-page:always;keep-with-next.within-page:always;font-family:Calibri;font-size:16pt;}
.p4{text-align:justify;hyphenate:auto;font-family:Calibri;font-size:10pt;}
</style>
<meta content="Administrator" name="author">
</head>
<body class="b1 b2">
<p id='1' class="p1">
<span class="s1">这是一个一级标题</span>
</p>
<p id='2' class="p2">
<span class="s1">这是一个二级标题1</span>
</p>
<p class="p3">
<span class="s1">这是一个三级标题1</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p2">
<span class="s1">这是一个二级标题3</span>
</p>
<p class="p3">
<span class="s1">这是一个三级标题3</span>
</p>
<p class="p4"></p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p2">
<span class="s1">这是一个二级标题1</span>
</p>
<p class="p3">
<span class="s1">这是一个三级标题1</span>
</p>
<p class="p4"></p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p2">
<span class="s1">这是一个二级标题4</span>
</p>
<p class="p3">
<span class="s1">这是一个三级标题4</span>
</p>
<p class="p4"></p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p>
<img
	width="100"
	src="http://124.70.85.180:8086/img/docker-empty.43357460.svg"
/>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p2">
<span class="s1">这是一个二级标题5</span>
</p>
<p class="p3">
<span class="s1">这是一个三级标题5</span>
</p>
<p class="p4"></p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p4">
<span>测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试</span>
</p>
<p class="p2">
<span class="s1">这是一个二级标题6</span>
</p>
<p class="p3">
<span class="s1">这是一个三级标题6</span>
</p>
<p class="p4"></p>
<p class="p4"></p>
</body>
</html>
	`,
  titles: [],
});
const getTreeTime = () => {
  setTimeout(() => {
    if (markDown.titles.length) {
      return;
    }
    loading.value = true;
    const perviewDomP = previewMd.value.$el.getElementsByTagName("p");
    const pInclud = ["p1", "p2", "p3"];
    let p1 = 0;
    let p2 = 0;
    let p3 = 0;
    for (let i = 0; i < perviewDomP.length; i++) {
      let className = perviewDomP[i];
      if (pInclud.includes(className.className)) {
        console.log(className.className);
        if (className.className === "p1") {
          p1 = p1 + 1;
          className.setAttribute("data-v-md-heading", `heading-${p1}`);
        } else if (className.className === "p2") {
          p2 = p2 + 1;
          className.setAttribute("data-v-md-heading", `heading-${p1}-${p2}`);
        } else if (className.className === "p3") {
          p3 = p3 + 1;
          className.setAttribute("data-v-md-heading", `heading-${p1}-${p2}-${p3}`);
        }
        className.setAttribute("data-v-md-line", `${i}`);
      }
    }
    console.log(perviewDomP);
    const anchors = previewMd.value.$el.querySelectorAll(".p1,.p2,.p3");
    const titles = Array.from(anchors).filter((title) => !!title.innerText.trim());
    if (!titles.length) {
      this.titles = [];
      return;
    }
    const hTags = Array.from(new Set(titles.map((title) => title.className))).sort();
    console.log(hTags);
    markDown.titles = titles.map((el) => ({
      title: el.innerText,
      lineIndex: el.getAttribute("data-v-md-line"),
      indent: hTags.indexOf(el.className),
    }));
    console.log(markDown.titles);
    loading.value = false;
  }, 1000);
};

const scrollbarRef = ref();
const handleAnchorClick = (anchor) => {
  const { lineIndex } = anchor;
  const to = previewMd.value.$el.querySelector(`[data-v-md-line="${lineIndex}"]`)
    ?.offsetTop;
  console.log(scrollbarRef.value);
  if (to) {
    scrollbarRef.value.scrollTo({
      behavior: "smooth",
      top: to,
    });
  }
};
defineExpose({ getTreeTime });
</script>

<style scoped lang="sass"></style>
