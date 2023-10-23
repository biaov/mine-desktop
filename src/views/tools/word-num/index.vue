<script lang="ts" setup>
import { useSpeed, useKeypad, useAlert } from './hooks'

const { speed, onChange, onBlur } = useSpeed()
const { onKeyup, onWordBlur } = useKeypad({ speed })
const { alertList } = useAlert()
</script>

<template>
  <a-card title="刷字数">
    <a-space direction="vertical" :size="20">
      <a-alert v-for="(item, index) in alertList" :key="index" v-bind="item" show-icon>
        <template #icon>
          <ant-icon name="SmileOutlined" />
        </template>
      </a-alert>
      <a-input v-model:value="speed" placeholder="请输入正整数" addon-before="输入速度" addon-after="ms" @change="onChange" @blur="onBlur"></a-input>
      <a-textarea show-count :auto-size="{ minRows: 10, maxRows: 10 }" placeholder="请输入..." @keyup.stop="onKeyup" @blur="onWordBlur" />
    </a-space>
  </a-card>
</template>

<style scoped lang="less">
@import './index.less';
</style>
