<template>
  <span v-html="svgContent" class="icon-wrapper"></span>
</template>

<script setup lang="ts">
import moonSvg from '@/assets/icons/moon.svg?raw';
import sunSvg from '@/assets/icons/sun.svg?raw';
import { computed } from 'vue';

const props = defineProps<{
  theme: 'light' | 'dark';
}>();

const svgContent = computed(() => {
  return props.theme === 'light' ? sunSvg : moonSvg;
});
</script>

<style scoped>
.icon-wrapper {
  display: inline-block;
  line-height: 0;
  width: 100%;
  height: 100%;
  color: inherit;
}

.icon-wrapper :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
  color: inherit;
  stroke: currentColor;
}
</style>
