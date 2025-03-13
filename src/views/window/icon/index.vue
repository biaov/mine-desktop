<script lang="ts" setup>
import { useBtn } from './hooks'
import disk01 from '../../../assets/disk01.png'
import disk02 from '../../../assets/disk02.png'

const { listData, modal, onClickItem, handleOk, onSelectFile, onSelectFolder } = useBtn()
</script>

<template>
  <a-space direction="vertical">
    <a-alert message="点击以下按钮可能会操作你的电脑，请注意保存好未保存的文件" type="error" closable />
    <a-card title="常规操作">
      <a-space :size="20" wrap>
        <mine-button v-for="(item, index) in listData" v-bind="item" :key="index" @click="onClickItem(item)">{{
          item.label }}</mine-button>
      </a-space>
    </a-card>
  </a-space>
  <a-modal v-model:open="modal.visible"
    v-bind="{ title: modal.title, cancelText: modal.cancelText, okButtonProps: modal.okButtonProps, okText: modal.okText }"
    @ok="handleOk">
    <a-space :size="20" direction="vertical">
      <template v-if="modal.selectValue === 'disk'">
        <a-alert message="注意：图标文件在哪个磁盘则改变哪个磁盘的图标" type="error" closable />
        <a-alert message="注意：如果是 U 盘，成功之后重新插如 U 盘即可看到效果；如果是其它磁盘，则需重启电脑" type="error" closable />
        <a-row>
          <a-col :span="12">
            <p class="text-center">改变前</p>
            <a-image :src="disk01" :width="191" :height="60"></a-image>
          </a-col>
          <a-col :span="12">
            <p class="text-center">改变后</p>
            <a-image :src="disk02" :width="191" :height="60"></a-image>
          </a-col>
        </a-row>
      </template>
      <a-row type="flex" align="middle">
        <a-col :span="12">
          <a-button @click="onSelectFile" class="m-0" v-if="modal.selectValue === 'disk'">
            <span class="iconfont icon-select"></span>
            选择 ICO 图标文件
          </a-button>
          <a-button @click="onSelectFolder" class="m-0" v-else>
            <span class="iconfont icon-zhongzhi"></span>
            选择要重置的磁盘
          </a-button>
        </a-col>
        <a-col :span="12">
          {{ modal.content }}
        </a-col>
      </a-row>
    </a-space>
  </a-modal>
</template>

<style scoped lang="less">
@import './index.less';
</style>
