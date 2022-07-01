<style scoped lang="less">
@import './index.less';
</style>
<template>
  <!-- 头部 -->
  <header class="mine-header" @contextmenu.prevent="onContextmenu" @mousedown="onMousedown">
    <div class="lf">
      <!-- logo -->
      <div class="logo">
        <img src="../../assets/logo.svg" alt="图片" mode="contain" title="mine-desktop" />
      </div>
      <!-- 菜单 -->
      <ul class="menu-list" @click.stop>
        <li class="menu-item" :class="{ active: item.state }" v-for="item in menuList" :key="item.value" @click="onMenuItem(item)">
          {{ item.label }}(
          <span class="line">{{ item.shortcut }}</span>
          )
          <ul class="dropdown-list" v-if="item.children?.length" @click.stop>
            <li class="dropdown-item" v-for="it in item.children" :key="it.value" @click="onMenuChildItem(it)">
              <span>{{ it.label }}</span>
              <span>{{ it.shortcut }}</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="center">MINE-DESKTOP [biaov]</div>
    <!-- 设置大小 -->
    <ul class="resize-list" @click.stop>
      <li class="item" v-for="item in resizeList" :key="item.value" @click="item.action && item.action()"><span :class="['iconfont', item.iconName]"></span></li>
    </ul>
    <!-- 下拉框 -->
    <ul class="dropdown-list" :style="{ top: dropdownConfig.y, left: dropdownConfig.x }" v-if="dropdownConfig.visible" @click.stop>
      <li class="dropdown-item" :class="{ disabled: item.disabled }" v-for="item in dropdownList" :key="item.value" @click="onDropdownItem(item)">
        <span>{{ item.label }}</span>
        <span>{{ item.shortcut }}</span>
      </li>
    </ul>
  </header>
  <a-drawer v-model:visible="aboutDrawer.visible" title="关于" placement="bottom" :closable="false">
    <a-descriptions title="" bordered>
      <a-descriptions-item label="名称">{{ aboutDrawer.name }}</a-descriptions-item>
      <a-descriptions-item label="版本">{{ aboutDrawer.version }}</a-descriptions-item>
      <a-descriptions-item label="版权">Copyright (c) 2022-present biaov</a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>
<script lang="ts" setup>
import { useContextmenu, useMenu, useResize, useMove } from './hooks'

const { aboutDrawer, menuList, onMenuItem, onMenuChildItem, onClearAll, onHideDropdown } = useMenu()
const { dropdownList, dropdownConfig, onDropdownItem, onContextmenu } = useContextmenu({ menuList, onClearAll, onHideDropdown })
const { resizeList } = useResize()
const { onMousedown } = useMove()
</script>
