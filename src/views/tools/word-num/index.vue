<style scoped lang="less">
@import './index.less';
</style>
<template>
  <a-card title="刷字数">
    <a-space direction="vertical" :size="20">
      <a-alert message="注意：当你开始的时候，请不要切换窗口，不然会自动停止，这是为了避免造成不好的影响。" type="warning" show-icon />
      <a-alert message="提示：请切换到你要刷字数的输入法，在以下文本输入框输入，按键 s 表示开始，按键 e 表示停止。" type="info" show-icon />
      <a-alert message="速度输入框：正整数，数值越大，速度越小，最小值为 100，当你改变速度时，得重新按键开始，才会生效。" type="info" show-icon />
      <a-input v-model:value="speed" placeholder="请输入正整数" addon-before="输入速度" addon-after="ms" @change="onChange" @blur="onBlur"></a-input>
      <a-textarea show-count :auto-size="{ minRows: 10, maxRows: 10 }" placeholder="请输入..." @keyup.stop="onKeyup" @blur="onWordBlur" />
    </a-space>
  </a-card>
</template>
<script lang="ts" setup>
import { useSpeed, useKeypad } from './hooks'

const { speed, onChange, onBlur } = useSpeed()
const { onKeyup, onWordBlur } = useKeypad({ speed })
</script>
