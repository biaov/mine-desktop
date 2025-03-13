<script lang="ts" setup>
import type { DefaultSlots } from '../types'
import AntIcon from '../ant-icon'
import { useHandle } from './hooks'
import type { Props, Emits } from './types'

defineSlots<DefaultSlots>()

const emit = defineEmits<Emits>()

defineProps<Props>()

const { onClick } = useHandle(emit)
const [DefineTemplate, ReuseTemplate] = useDefineTemplate()
</script>

<template>
  <div class="inline-block">
    <DefineTemplate>
      <a-button :type="type" v-bind="$attrs" @click="onClick">
        <template #icon>
          <ant-icon v-if="antIcon" :name="antIcon" />
          <span v-else-if="icon" class="iconfont mr-8 leading-none align-[-0.08em]" :class="icon"></span>
        </template>
        <slot></slot>
      </a-button>
    </DefineTemplate>
    <a-tooltip placement="topLeft" :title="tips" v-if="tips">
      <ReuseTemplate />
    </a-tooltip>
    <ReuseTemplate v-else />
  </div>
</template>
