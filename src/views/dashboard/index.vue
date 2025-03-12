<script lang="ts" setup>
import { colorList } from '@/config'
import MineCharge from './components/MineCharge'

const loading = ref(true)
setTimeout(() => {
  loading.value = false
}, 1000)
</script>

<template>
  <!-- 首页 -->
  <div class="dashboard">
    <a-skeleton :loading="loading" active>
      <a-space :size="20" class="w-fill" align="start">
        <a-space :size="20" wrap class="custom-btn-color">
          <a-button v-for="(item, index) in colorList" :key="index" type="primary" :style="{ '--background': item }">{{ item }}</a-button>
        </a-space>
        <div class="relative w-300">
          <mine-charge />
        </div>
      </a-space>
    </a-skeleton>
  </div>
</template>

<style scoped lang="less">
@import './index.less';
</style>
