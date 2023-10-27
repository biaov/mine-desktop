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

<template>
  <!-- 按钮 -->
  <a-button :type="type" @click="onClick">
    <template #icon>
      <ant-icon v-if="antIcon" :name="antIcon" />
      <span v-else-if="icon" class="iconfont" :class="icon"></span>
    </template>
    <slot></slot>
  </a-button>
</template>

<style scoped lang="less">
@import './index.less';
</style>
