<style scoped lang="less">
@import './index.less';
</style>
<template>
  <a-card title="屏幕">
    <mine-button type="primary" ant-icon="FundProjectionScreenOutlined" @click="onShowScreen">屏幕展示</mine-button>
  </a-card>
</template>
<script lang="ts" setup>
import { useScreen } from './hooks'

const { onShowScreen } = useScreen()
</script>
