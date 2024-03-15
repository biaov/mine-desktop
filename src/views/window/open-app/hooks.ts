import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import { message } from 'ant-design-vue'
import { useRenderer } from '@/composables/useBridge'
import { randomColors, randomColor, randomId } from '@/utils/function'
import { setStorage, getStorage } from '@/utils/storage'
import type { PresetListItem, HistoryListItem, ShareData } from './types'

/**
 * 预设软件
 */
export const usePreset = () => {
  /**
   * 预设列表
   */
  const presetList = ref<PresetListItem[]>([
    {
      antIcon: 'WechatOutlined',
      label: '微信',
      value: 'weixin'
    },
    {
      icon: 'icon-qiyeweixin',
      label: '企业微信',
      value: 'wework'
    },
    {
      antIcon: 'QqOutlined',
      custom: true,
      label: 'QQ',
      value: 'tencent://message/?uin=554511998'
    },
    {
      icon: 'icon-vscode',
      label: 'Visual Studio Code',
      value: 'vscode'
    },
    {
      icon: 'icon-postman',
      label: 'Postman',
      value: 'postman'
    },
    {
      icon: 'icon-firefox',
      label: 'ApiFox',
      value: 'apifox'
    },
    {
      icon: 'icon-Microsoft-Store',
      label: 'Microsoft Store',
      value: 'zune'
    },
    {
      icon: 'icon-adobephotoshop',
      label: 'Adobe PhotoShop',
      value: 'adbps'
    },
    {
      icon: 'icon-adobeillustrator',
      label: 'Adobe Illustrator',
      value: 'adbai'
    },
    {
      icon: 'icon-userPrinergy',
      label: 'Adobe Premiere Pro',
      value: 'adobe+ppro'
    },
    {
      antIcon: 'AlipayCircleOutlined',
      label: '支付宝开发者工具',
      value: 'antdevtool-tiny'
    },
    {
      icon: 'icon-calculator',
      label: '计算器',
      value: 'calculator'
    },
    {
      icon: 'icon-hackerrank',
      label: 'HbuilderX',
      value: 'hbuilderx'
    },
    {
      antIcon: 'IeOutlined',
      label: 'Microsoft Edge 浏览器',
      value: 'microsoft-edge'
    },
    {
      antIcon: 'SkypeOutlined',
      label: '搜狗输入法',
      value: 'sgreg'
    }
  ])

  /**
   * 增加颜色
   */
  const increaseColors = (data: Ref<PresetListItem[]>) => {
    const colors = randomColors(data.value.length)
    data.value.forEach((item, i) => {
      item.color = colors[i]
    })
    return data
  }
  increaseColors(presetList)

  /**
   * 点击预设项
   */
  const onPresetItem = (item: PresetListItem) => {
    globalThis.location.href = `${item.value}${item.custom ? '' : ':'}`
  }

  return { presetList, increaseColors, onPresetItem }
}

/**
 * 自定义软件
 */
export const useCustomApp = ({ onPresetItem }: ShareData) => {
  const { ipcRenderer } = useRenderer()

  /**
   * 历史列表
   */
  const historyList = ref<HistoryListItem[]>([])
  getStorage('historyList') && (historyList.value = getStorage('historyList') as HistoryListItem[])

  /**
   * 清空历史列表
   */
  const onClearHistory = () => {
    historyList.value = []
  }

  /**
   * 自定义表单
   */
  const customForm = ref({ name: '', path: '' })
  const customFormRef = ref()

  /**
   * 自定义表单校验规则
   */
  const customFormRules = ref({
    name: [{ required: true, message: '请输入应用名称', trigger: 'blur' }],
    path: [{ required: true, message: '请输入应用路径', trigger: 'blur' }]
  })

  /**
   * 提交表单
   */
  const onSubmit = async (): Promise<unknown> => {
    await customFormRef.value.validate()
    const { name, path } = customForm.value
    if (historyList.value.some(item => item.label === name)) return message.error('应用名称已存在')
    const uniqueValue = `a${randomId()}`
    await ipcRenderer.invoke('openApp', { name: uniqueValue, path })

    /**
     * 更新历史列表
     */
    const newItem = { label: name, value: uniqueValue, color: randomColor(), antIcon: 'HeatMapOutlined' }
    historyList.value.push(newItem)
    customFormRef.value.resetFields()
    onPresetItem(newItem)
    return null
  }

  /**
   * 监听历史列表变化
   */
  watch(
    historyList,
    () => {
      setStorage('historyList', historyList.value)
    },
    { deep: true }
  )

  return { historyList, onClearHistory, customForm, customFormRef, customFormRules, onSubmit }
}
