import { ref } from 'vue'
import { message, Form } from 'ant-design-vue'
import { shortChainApi } from '@/api/short-chain'
import { useRenderer } from '@/composables/useBridge'

// 新增/修改表单
export const useForm = () => {
  const { ipcRenderer } = useRenderer()
  const origin = Object.freeze('http://desktop.biaov.cn/analy/')
  const shortChain = ref('--')
  // 表单
  const formState = ref({
    content: ''
  })

  const rules = ref({
    content: [{ required: true, message: '请输入 URL 地址' }]
  })

  const { validate, validateInfos } = Form.useForm(formState, rules)

  const onSubmit = async () => {
    await validate()
    const data = await shortChainApi.create(formState.value)
    message.success('操作成功')
    shortChain.value = origin + data.link
  }

  const onCopy = async () => {
    await ipcRenderer.invoke('copy', shortChain.value)
    message.success('复制成功')
  }

  return { formState, validateInfos, onSubmit, shortChain, onCopy }
}
