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
import type { DefaultSlots } from '../types'
import AntIcon from '../AntIcon'
import { useHandle } from './hooks'
import type { Props, Emits } from './types'

defineOptions({
  name: 'MineButton'
})
defineSlots<DefaultSlots>()

const emit = defineEmits<Emits>()

defineProps<Props>()

const { onClick } = useHandle(emit)
</script>
