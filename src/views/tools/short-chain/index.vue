<template>
  <a-space direction="vertical" class="w-fill">
    <a-card title="生成短链">
      <a-form v-bind="cols">
        <a-form-item label="短链内容" v-bind="validateInfos.content">
          <a-input v-model:value="formState.content" placeholder="请输入需要生成的短链"></a-input>
        </a-form-item>
        <a-form-item label=" " :colon="false">
          <a-button type="primary" @click="onSubmit">提交</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card title="生成的短链">
      {{ shortChain }}
      <a-button type="link" @click="onCopy">复制</a-button>
    </a-card>
  </a-space>
</template>
<script lang="ts" setup>
import { cols } from '@/config/form'
import { useForm } from './hooks'

const { formState, validateInfos, onSubmit, shortChain, onCopy } = useForm()
</script>
