<style scoped lang="less">
@import './index.less';
</style>
<template>
  <video class="video" ref="v1Ref"></video>
</template>
<script lang="ts" setup>
import { useConnection } from './hooks'

const { v1Ref } = useConnection()
</script>
