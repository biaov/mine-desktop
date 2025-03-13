<script lang="ts" setup>
import { useMenu, useMenuOpen } from './hooks'
import type { Props, Emits } from './types'

const emit = defineEmits<Emits>()

const props = withDefaults(defineProps<Props>(), {
  collapsed: false
})
const { openKeys, selectedKeys, onOpenChange } = useMenuOpen()
const { listData, isCollapsed, sidebarStyle, onCollapsed, onMenuItem } = useMenu(props, emit)

defineExpose({
  sidebarStyle
})
</script>

<template>
  <!-- 菜单栏 -->
  <div class="side-bar fixed top-0 left-0 z-2 h-screen px-0 py-50 select-none" :style="sidebarStyle">
    <a-menu mode="inline" :inline-collapsed="isCollapsed" v-model:selectedKeys="selectedKeys" :open-keys="openKeys"
      @openChange="onOpenChange">
      <template v-for="(item, index) in listData">
        <template v-if="!item.hidden">
          <a-sub-menu v-if="item.children?.length" :key="`${index}`">
            <template #icon>
              <div>
                <ant-icon v-if="item.meta.antIcon" :name="item.meta.antIcon" />
              </div>
            </template>
            <template #title>
              {{ item.meta.title }}
            </template>
            <template v-for="it in item.children">
              <a-menu-item v-if="!it.hidden" :key="it.name" @click="onMenuItem(it)">
                {{ it.meta.title }}
              </a-menu-item>
            </template>
          </a-sub-menu>
          <a-menu-item :key="item.name" @click="onMenuItem(item)" v-else>
            <template #icon>
              <ant-icon v-if="item.meta.antIcon" :name="item.meta.antIcon" />
            </template>
            {{ item.meta.title }}
          </a-menu-item>
        </template>
      </template>
    </a-menu>
    <div class="menu-fold fixed left-0 bottom-0 flex items-center h-60">
      <div class="icon w-80 text-center text-xl" @click="onCollapsed">
        <ant-icon :name="isCollapsed ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
@import './index.less';
</style>
