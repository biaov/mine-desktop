<style scoped lang="less">
@import './index.less';
</style>
<template>
  <!-- layout -->
  <MineHeader></MineHeader>
  <router-view v-if="rotate.meta.customLayout"></router-view>
  <div class="layout" :style="sidebarRef?.sidebarStyle" v-else>
    <SideBar v-model:collapsed="isCollapsed" ref="sidebarRef"></SideBar>
    <main class="router-main">
      <router-view></router-view>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useLayout } from './hooks'

const { sidebarRef, isCollapsed } = useLayout()
const rotate = useRoute()
</script>
