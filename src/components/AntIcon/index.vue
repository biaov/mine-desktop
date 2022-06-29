<style lang="less" scoped>
@import './index.less';
</style>
<template>
  <!-- 动态设置 ant-design-vue 图标 -->
  <component :is="curIcon" />
</template>
<script lang="ts" setup>
import { useIcon } from './hooks'

const props = withDefaults(
  defineProps<{
    name: string // 名称
    type?: string // 类型: primary | success | info | warning | danger
  }>(),
  {
    type: ''
  }
)
const { curIcon } = useIcon(props)
</script>
