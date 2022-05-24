<!--
 * @Author: ZHENG
 * @Date: 2022-04-30 08:41:04
 * @LastEditors: ZHENG
 * @LastEditTime: 2022-05-23 19:24:54
 * @FilePath: \work\src\views\course\coursePreview\compontent\index.vue
 * @Description:
-->
<template>
  <div class="h-full">
    <n-card title="视频播放器插件" class="h-full shadow-sm rounded-16px">
      <div ref="domRef"></div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps } from 'vue';
import Player from 'xgplayer';

const domRef = ref<HTMLElement>();
const player = ref<Player>();

interface Props {
  src: '';
}
const props = defineProps<Props>();

function renderXgPlayer() {
  console.log(props);
  if (!domRef.value) return;
  const url = props.src; // 'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4';
  player.value = new Player({
    el: domRef.value,
    url,
    playbackRate: [0.5, 0.75, 1, 1.5, 2]
  });
}
function destroyXgPlayer() {
  player.value?.destroy();
}

onMounted(() => {
  renderXgPlayer();
});

onUnmounted(() => {
  destroyXgPlayer();
});
</script>
<style scoped></style>
