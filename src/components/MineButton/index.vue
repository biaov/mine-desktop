<style scoped lang="less">
@import './index.less';
</style>
<template>
  <!-- 按钮 -->
  <a-button :type="type" @click="onClick">
    <template #icon>
      <ant-icon :name="antIcon" v-if="antIcon"></ant-icon>
      <span class="iconfont" :class="icon" v-else-if="icon"></span>
    </template>
    <slot></slot>
  </a-button>
</template>
<script lang="ts" setup>
import AntIcon from '../AntIcon'
import { useHandle } from './hooks'

const emit = defineEmits<{
  (event: 'click'): void
}>()

const props = defineProps<{
  type: string
  antIcon?: string
  icon?: string
}>()

const { onClick } = useHandle(props, emit)
</script>
