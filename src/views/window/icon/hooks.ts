import { message } from 'ant-design-vue'
import { useRenderer } from '@/composables/useBridge'
import type { ListItem, Modal } from './types'

/**
 * 按钮操作
 */
export const useBtn = () => {
  const { ipcRenderer } = useRenderer()

  const modal = reactive<Modal>({
    visible: false,
    selectValue: '',
    title: '提示',
    cancelText: '取消',
    okButtonProps: { type: 'primary' },
    okText: '确定',
    content: ''
  })
  const listData = ref<ListItem[]>([
    {
      type: 'primary',
      label: '设置磁盘图标',
      value: 'disk',
      icon: 'icon-disk',
      action() {
        modal.visible = true
        modal.selectValue = this.value
        modal.content = ''
      }
    },
    {
      type: 'primary',
      label: '重置磁盘图标',
      value: 'diskReset',
      icon: 'icon-zhongzhi',
      action() {
        modal.visible = true
        modal.selectValue = this.value
        modal.content = ''
      }
    }
  ])
  const onClickItem = (item: ListItem) => {
    item.action && item.action()
  }

  const handleOk = async () => {
    const tips = { before: '', after: '' }
    if (modal.selectValue === 'disk') {
      tips.before = '请选择 ICO 图标文件'
      tips.after = '文件生成成功，请把磁盘根目录的 disk.inf 文件名改为 autorun.inf 即可'
    } else {
      tips.before = '请选择磁盘'
      tips.after = '重置成功'
    }
    if (!modal.content) {
      message.error(tips.before)
      return
    }
    await ipcRenderer.invoke(modal.selectValue, modal.content)
    modal.visible = false
    message.success(tips.after)
  }

  const onSelectFile = async () => {
    const path: string = await ipcRenderer.invoke('selectFile', { title: '请选择 ICO 图标文件', filters: [{ name: 'Images', extensions: ['ico'] }] })
    modal.content = path
  }
  const onSelectFolder = async () => {
    const path: string = await ipcRenderer.invoke('selectFolder', { title: '请选择磁盘' })
    modal.content = path
  }

  return { listData, modal, onClickItem, handleOk, onSelectFile, onSelectFolder }
}
