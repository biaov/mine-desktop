<style scoped lang="less">
@import './index.less';
</style>
<template>
  <a-space direction="vertical">
    <a-alert message="点击以下按钮可能会操作你的电脑，请注意保存好未保存的文件" type="error" closable />
    <a-card title="常规操作">
      <a-button v-for="(item, index) in listData" :type="item.type" :key="index" @click="onClickItem(item)">
        <template #icon>
          <ant-icon :name="item.antIcon" v-if="item.antIcon"></ant-icon>
          <span class="iconfont" :class="item.icon" v-else-if="item.icon"></span>
        </template>
        {{ item.label }}
      </a-button>
    </a-card>
  </a-space>
  <a-modal v-model:visible="modal.visible" v-bind="{ title: modal.title, cancelText: modal.cancelText, okButtonProps: modal.okButtonProps, okText: modal.okText }" @ok="handleOk">
    <p v-if="modal.content">{{ modal.content }}</p>
    <a-input v-model:value="modal.time" suffix="秒" placeholder="请输入你要定时的秒数" v-else-if="modal.selectValue === timedShutdownKey" @change="onModalChange"></a-input>
  </a-modal>
</template>
<script lang="ts" setup>
import AntIcon from '@/components/AntIcon'
import { useBtn } from './hooks'

const { listData, modal, timedShutdownKey, onModalChange, onClickItem, handleOk } = useBtn()
</script>
