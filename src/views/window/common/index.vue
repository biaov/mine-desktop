<script lang="ts" setup>
import { useBtn } from './hooks'

const { listData, modal, timedShutdownKey, onModalChange, onClickItem, handleOk } = useBtn()
</script>

<template>
  <a-space direction="vertical" class="w-full">
    <a-alert message="点击以下按钮可能会操作你的电脑，请注意保存好未保存的文件" type="error" closable />
    <a-card title="常规操作">
      <a-space :size="20" wrap>
        <mine-button v-for="(item, index) in listData" v-bind="item" :key="index" @click="onClickItem(item)">{{
          item.label
        }}</mine-button>
      </a-space>
    </a-card>
  </a-space>
  <a-modal v-model:open="modal.visible"
    v-bind="{ title: modal.title, cancelText: modal.cancelText, okButtonProps: modal.okButtonProps, okText: modal.okText }"
    @ok="handleOk">
    <p v-if="modal.content">{{ modal.content }}</p>
    <a-input v-model:value="modal.time" suffix="秒" placeholder="请输入你要定时的秒数"
      v-else-if="modal.selectValue === timedShutdownKey" @change="onModalChange"></a-input>
  </a-modal>
</template>

<style scoped lang="less">
@import './index.less';
</style>
