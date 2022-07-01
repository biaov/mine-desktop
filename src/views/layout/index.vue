<style scoped lang="less">
@import './index.less';
</style>
<template>
  <!-- layout -->
  <div class="layout" :style="sidebarRef?.sidebarStyle">
    <MineHeader></MineHeader>
    <SideBar v-model:collapsed="isCollapsed" ref="sidebarRef"></SideBar>
    <main class="router-main">
      <router-view></router-view>
    </main>
  </div>
</template>
<script lang="ts" setup>
import MineHeader from '@/components/MineHeader'
import SideBar from '@/components/SideBar'
import { useLayout } from './hooks'

const { sidebarRef, isCollapsed } = useLayout()
</script>
