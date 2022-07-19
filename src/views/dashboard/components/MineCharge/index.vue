<style scoped lang="less">
@import './index.less';
</style>
<template>
  <div class="container">
    <div class="number">充电中</div>
    <div class="contrast">
      <div class="circle"></div>
      <ul class="bubbles">
        <li v-for="item in 15"></li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup></script>
