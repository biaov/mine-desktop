<script lang="ts" setup>
import { useContextmenu, useMenu, useResize, useMove } from './hooks'

defineOptions({
  name: 'MineHeader'
})
const { aboutDrawer, menuList, modal, onMenuItem, onMenuChildItem, onClearAll, onHideDropdown, handleOk } = useMenu()
const { dropdownList, dropdownConfig, onDropdownItem, onContextmenu } = useContextmenu({ menuList, onClearAll, onHideDropdown })
const { resizeList } = useResize()
const { onMousedown } = useMove()
</script>

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
    <div class="center">mine-desktop [biaov]</div>
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
  <a-drawer v-model:open="aboutDrawer.visible" title="关于" placement="bottom" :closable="false">
    <a-descriptions title="" bordered>
      <a-descriptions-item label="名称">{{ aboutDrawer.name }}</a-descriptions-item>
      <a-descriptions-item label="版本">{{ aboutDrawer.version }}</a-descriptions-item>
      <a-descriptions-item label="版权">Copyright (c) 2022-present biaov</a-descriptions-item>
    </a-descriptions>
  </a-drawer>
  <a-modal
    v-model:open="modal.visible"
    v-bind="{
      title: modal.title,
      cancelText: modal.cancelText,
      okButtonProps: modal.okButtonProps,
      okText: modal.okText,
      footer: modal.footer,
      closable: modal.closable,
      maskClosable: modal.maskClosable
    }"
    @ok="handleOk"
  >
    <p v-if="modal.content">{{ modal.content }}</p>
    <template v-else>
      <a-row justify="center">
        <a-col>
          <a-progress type="circle" :percent="modal.percent" />
        </a-col>
      </a-row>
    </template>
  </a-modal>
</template>

<style scoped lang="less">
@import './index.less';
</style>
