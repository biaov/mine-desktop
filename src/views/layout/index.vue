<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useLayout } from './hooks'

const { sidebarRef, isCollapsed } = useLayout()
const rotate = useRoute()
</script>

<template>
  <!-- layout -->
  <mine-header />
  <router-view v-if="rotate.meta.customLayout" />
  <div class="layout" :style="sidebarRef?.sidebarStyle" v-else>
    <side-bar v-model:collapsed="isCollapsed" ref="sidebarRef" />
    <main class="router-main">
      <router-view />
    </main>
  </div>
</template>

<style scoped lang="less">
@import './index.less';
</style>
