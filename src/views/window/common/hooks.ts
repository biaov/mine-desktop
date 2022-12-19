import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import { useRenderer } from '@/composables/useBridge'
import { ListItem, Modal } from './types'

/**
 * 按钮操作
 */
export const useBtn = () => {
  const { ipcRenderer } = useRenderer()

  const modal = reactive<Modal>({
    visible: false,
    selectValue: '',
    time: null,
    title: '提示',
    cancelText: '取消',
    okButtonProps: { type: 'primary' },
    okText: '确定',
    content: '你确定吗？'
  })
  const timedShutdownKey = 'timedShutdown'
  const listData = ref<ListItem[]>([
    {
      type: 'primary',
      label: '激活系统',
      value: 'activateSystem',
      icon: 'icon-jihuo',
      action() {
        ipcRenderer.invoke(this.value) // 渲染进程
      }
    },
    {
      type: 'primary',
      label: '锁屏',
      value: 'lockScreen',
      icon: 'icon-JC_011',
      action() {
        ipcRenderer.invoke(this.value) // 渲染进程
      }
    },
    {
      type: 'danger',
      label: '关机',
      value: 'quit',
      icon: 'icon-Quit',
      action() {
        modal.visible = true
        modal.selectValue = this.value
        modal.title = '关机'
        modal.cancelText = '等一下'
        modal.okButtonProps = { type: 'primary', danger: true }
        modal.okText = '关机'
        modal.content = '你确定要关机吗？'
      }
    },
    {
      type: 'danger',
      label: '重启',
      value: 'restart',
      icon: 'icon-zhongqi',
      action() {
        modal.visible = true
        modal.selectValue = this.value
        modal.title = '重启'
        modal.cancelText = '等一下'
        modal.okButtonProps = { type: 'primary', danger: true }
        modal.okText = '重启'
        modal.content = '你确定要重启吗？'
      }
    },
    {
      type: 'primary',
      label: '定时关机',
      value: timedShutdownKey,
      icon: 'icon-dingshi-',
      action() {
        modal.visible = true
        modal.selectValue = this.value
        modal.title = '定时关机'
        modal.cancelText = '等一下'
        modal.okButtonProps = { type: 'primary' }
        modal.okText = '启动'
        modal.time = null
        modal.content = ''
      }
    },
    {
      type: 'primary',
      label: '取消定时关机',
      value: 'cancelTimedShutdown',
      icon: 'icon-shouye',
      action() {
        // 渲染进程
        ipcRenderer.invoke(this.value).then(() => {
          message.success('已取消')
        })
      }
    }
  ])
  const onClickItem = (item: ListItem) => {
    item.action && item.action()
  }

  const handleOk = async () => {
    // 定时关机
    if (modal.selectValue === timedShutdownKey) {
      await ipcRenderer.invoke(modal.selectValue, modal.time) // 渲染进程
    } else {
      await ipcRenderer.invoke(modal.selectValue) // 渲染进程
    }
    modal.visible = false
    message.success('设置成功')
  }

  const onModalChange = () => {
    modal.time = parseInt(`${modal.time}`, 10) || null
  }

  return { listData, modal, timedShutdownKey, onModalChange, onClickItem, handleOk }
}
