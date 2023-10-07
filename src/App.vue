<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>
<script lang="ts" setup>
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import moment from 'moment'
import 'moment/dist/locale/zh-cn'

moment.locale(zhCN.locale)
</script>
<style lang="less">
@import './styles/index.less';
</style>
