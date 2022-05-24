<!--
 * @Author: ZHENG
 * @Date: 2022-05-24 16:25:20
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-24 17:57:37
 * @FilePath: \work\src\views\course\coursePreview\compontent\showPdf.vue
 * @Description:
-->
<template>
  <div>
    <n-grid cols="4" item-responsive responsive="screen">
      <n-grid-item span="0 m:1 l:1">
        <div
          v-for="anchor in titles"
          :style="{ padding: `10px 0 10px ${anchor.indent * 20}px`, width: `60px` }"
          @click="handleAnchorClick(anchor)"
        >
          <a style="cursor: pointer">{{ anchor.title }}</a>
        </div>
      </n-grid-item>
      <n-grid-item span="800:3">
        <v-md-preview ref="preview" style="height: 600px; width: 400px; overflow-x: auto" :text="text" />
      </n-grid-item>
    </n-grid>

    <!-- <div
      v-for="anchor in titles"
      :style="{ padding: `10px 0 10px ${anchor.indent * 20}px` }"
      @click="handleAnchorClick(anchor)"
    >
      <a style="cursor: pointer">{{ anchor.title }}</a>
    </div>
    <n-scrollbar style="max-height: 600px">
      <v-md-preview ref="preview" :text="text" />
    </n-scrollbar> -->
  </div>
</template>

<script>
const text = `
# heading 1
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent

## heading 2
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent

### heading 3
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent

## heading 2
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent

### heading 3
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent
contentcontentcontent
`;

export default {
  data() {
    return {
      text,
      titles: []
    };
  },
  mounted() {
    const anchors = this.$refs.preview.$el.querySelectorAll('h1,h2,h3,h4,h5,h6');
    const titles = Array.from(anchors).filter(title => !!title.innerText.trim());

    if (!titles.length) {
      this.titles = [];
      return;
    }

    const hTags = Array.from(new Set(titles.map(title => title.tagName))).sort();

    this.titles = titles.map(el => ({
      title: el.innerText,
      lineIndex: el.getAttribute('data-v-md-line'),
      indent: hTags.indexOf(el.tagName)
    }));
  },
  methods: {
    handleAnchorClick(anchor) {
      const { preview } = this.$refs;
      const { lineIndex } = anchor;

      const heading = preview.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);

      if (heading) {
        preview.scrollToTarget({
          target: heading,
          scrollContainer: window,
          top: 60
        });
      }
    }
  }
};
</script>
