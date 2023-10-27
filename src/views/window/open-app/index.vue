<script lang="ts" setup>
import { cols } from '@/config/form'
import { usePreset, useCustomApp } from './hooks'

const { presetList, onPresetItem } = usePreset()
const { historyList, onClearHistory, customForm, customFormRef, customFormRules, onSubmit } = useCustomApp({ onPresetItem })
</script>
<template>
  <a-space direction="vertical" :size="20" class="w-fill">
    <a-card title="预设软件">
      <a-alert message="确保你的电脑存在下面软件，不然点击会无反应" type="warning" closable class="m-b-20" />
      <a-space :size="20" wrap class="p-b-20 custom-btn-color">
        <mine-button v-for="(item, index) in presetList" v-bind="item" :key="index" type="primary" :style="{ '--background': item.color }" @click="onPresetItem(item)">{{ item.label }}</mine-button>
      </a-space>
    </a-card>
    <a-card title="自定义软件">
      <a-alert message="确保输入的应用路径为正确的应用路径，不然打不开" type="warning" closable class="m-b-10" />
      <a-alert message="例如：D:\\Program Files\\Microsoft VS Code\\Code.exe" type="warning" closable class="m-b-10" />
      <a-alert message="不要操作过多无用的测试，因为这会积累你注册表的冗余文件，尽管此文件极小，<=1KB" type="warning" closable class="m-b-20" />
      <a-form ref="customFormRef" v-bind="{ ...cols, model: customForm, rules: customFormRules }">
        <a-form-item name="name" label="应用名称" required>
          <a-input v-model:value="customForm.name" :maxlength="20" placeholder="请输入应用名称, 最多支持 20 个字" />
        </a-form-item>
        <a-form-item name="path" label="应用路径" required>
          <a-input v-model:value="customForm.path" placeholder="请输入应用路径" />
        </a-form-item>
        <a-form-item :wrapper-col="cols.btnWrapperCol">
          <a-button type="primary" @click="onSubmit">打开应用</a-button>
        </a-form-item>
      </a-form>
      <a-space direction="vertical" class="w-fill">
        <a-space :size="10">
          <span>历史记录</span>
          <a-popconfirm title="你确定要清空历史记录吗?" :disabled="!historyList.length" @confirm="onClearHistory">
            <a-button type="link" :disabled="!historyList.length" danger>
              <template #icon>
                <ant-icon name="DeleteOutlined" />
              </template>
            </a-button>
          </a-popconfirm>
        </a-space>
        <a-space wrap v-if="historyList.length" class="custom-btn-color">
          <mine-button v-for="(item, index) in historyList" v-bind="item" :key="index" type="primary" :style="{ '--background': item.color }" @click="onPresetItem(item)">{{ item.label }}</mine-button>
        </a-space>
        <a-empty v-else description="暂无记录" />
      </a-space>
    </a-card>
  </a-space>
</template>

<style scoped lang="less">
@import './index.less';
</style>
