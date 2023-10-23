<script lang="ts" setup>
import { useConnection } from './hooks'

const { v1Ref } = useConnection()
</script>

<template>
  <video class="video" ref="v1Ref"></video>
</template>

<style scoped lang="less">
@import './index.less';
</style>
