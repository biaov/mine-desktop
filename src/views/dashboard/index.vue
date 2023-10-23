<script lang="ts" setup>
import { ref } from 'vue'
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
      <mine-charge></mine-charge>
    </a-skeleton>
  </div>
</template>

<style scoped lang="less">
@import './index.less';
</style>
