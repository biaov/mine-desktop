<script lang="ts" setup>
import { useIcon } from './hooks'
import type { Props } from './types'

const props = withDefaults(defineProps<Props>(), {
  type: ''
})
const { curIcon } = useIcon(props)
</script>

<template>
  <!-- 动态设置 ant-design-vue 图标 -->
  <component :is="curIcon" />
</template>

<style lang="less" scoped>
@import './index.less';
</style>
