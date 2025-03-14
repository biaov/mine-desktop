import { Modal, message } from 'ant-design-vue'
import { useRenderer } from '@/composables/useBridge'
import { updatesEnums } from '@/enums/icp'
import type { CallBackFn, ClearAllFn, ListItem, ShareData, DropdownConfig, ContextmenuReturn, MoveReturn, PackageJson, ModalReactive } from './types'

/**
 * 鼠标右击
 * @param { ShareData } 共享数据
 * @return { useContextmenuReturn } 返回数据
 */
export const useContextmenu = ({ menuList, onClearAll, onHideDropdown }: ShareData): ContextmenuReturn => {
  const { ipcRenderer } = useRenderer()

  /**
   * 下拉列表
   */
  const dropdownList = ref<ListItem[]>([
    {
      label: '最大化',
      value: 'maximize',
      action() {
        ipcRenderer.invoke(this.value)
      }
    },
    {
      label: '最小化',
      value: 'minimize',
      action() {
        ipcRenderer.invoke(this.value)
      }
    },
    {
      label: '关闭',
      value: 'quit',
      shortcut: 'Alt + F4',
      action() {
        ipcRenderer.invoke(this.value)
      }
    }
  ])

  /**
   * 下拉框配置项
   */
  const dropdownConfig = ref<DropdownConfig>({
    visible: false,
    x: 0,
    y: 0
  })

  /**
   * 点击下拉框项
   */
  const onDropdownItem = (item: ListItem) => {
    dropdownConfig.value.visible = false
    item.action && item.action()
  }

  /**
   * 右击
   */
  const onContextmenu = (e: MouseEvent) => {
    onClearAll()
    dropdownConfig.value = {
      visible: true,
      x: `${e.clientX}px`,
      y: `${e.clientY}px`
    }
  }

  /**
   * 执行快捷键方法
   */
  const onShortcut = (list: ListItem[], value: string) => {
    const isAllExist = list.some(item => {
      let isExist: boolean | number | undefined = false
      if (item.shortcut === value) {
        isExist = true
        item.action && item.action()
      } else {
        isExist = item.children?.length && onShortcut(item.children, value)
      }
      return isExist
    })
    return isAllExist
  }

  onMounted(() => {
    document.addEventListener('click', () => {
      dropdownConfig.value.visible = false
      onClearAll()
    })
    document.addEventListener('keyup', (e: KeyboardEvent) => {
      let key = e.key.toUpperCase()
      e.altKey && (key = `Alt + ${key}`)
      e.shiftKey && (key = `Shift + ${key}`)
      e.ctrlKey && (key = `Ctrl + ${key}`)
      !onShortcut(dropdownList.value, key) && onShortcut(menuList.value, key)
    })
    onHideDropdown(() => {
      dropdownConfig.value.visible = false
    })
  })

  return { dropdownList, dropdownConfig, onDropdownItem, onContextmenu }
}

/**
 * 菜单
 */
export const useMenu = () => {
  const { ipcRenderer, onCheckForUpdate } = useRenderer()
  let callBack: CallBackFn
  const aboutDrawer = ref({ visible: false, name: '', version: '' })
  const modal = reactive<ModalReactive>({
    visible: false,
    title: '提示',
    type: '',
    cancelText: '',
    okButtonProps: { type: 'primary' },
    okText: '',
    content: '',
    footer: undefined,
    closable: true,
    percent: 0,
    maskClosable: true
  })
  const menuList = ref<ListItem[]>([
    {
      label: '案例集锦',
      value: 'works',
      shortcut: 'E',
      action() {
        onClearAll()
        this.state = !this.state
      },
      children: [
        {
          label: '组件库 MINE-H5-UI',
          value: 'mine-h5-ui',
          action() {
            ipcRenderer.invoke('open', 'https://mineh5ui.biaov.cn/v2/')
          }
        },
        {
          label: '初始化项目 create-mine',
          value: 'create-mine',
          action() {
            ipcRenderer.invoke('open', 'https://github.com/biaov/create-mine')
          }
        },
        {
          label: '项目模板 project-template',
          value: 'project-template',
          action() {
            ipcRenderer.invoke('open', 'https://github.com/biaov/project-template')
          }
        },
        {
          label: '生态系统 ecosystem',
          value: 'ecosystem',
          action() {
            ipcRenderer.invoke('open', 'https://github.com/biaov/ecosystem')
          }
        },
        {
          label: '多命令简化 mine-auto-cli',
          value: 'mine-auto-cli',
          action() {
            ipcRenderer.invoke('open', 'https://github.com/biaov/mine-auto-cli')
          }
        },
        {
          label: '特效集锦 effects',
          value: 'effects',
          action() {
            ipcRenderer.invoke('open', 'https://github.com/biaov/effects')
          }
        }
      ]
    },
    {
      label: '工具',
      value: 'tools',
      shortcut: 'T',
      action() {
        onClearAll()
        this.state = !this.state
      },
      children: [
        {
          label: '百度一下',
          value: 'baidu',
          action() {
            ipcRenderer.invoke('open', 'https://baidu.com/')
          }
        },
        {
          label: '必应',
          value: 'biying',
          action() {
            ipcRenderer.invoke('open', 'https://cn.bing.com/')
          }
        }
      ]
    },
    {
      label: '帮助',
      value: 'help',
      shortcut: 'H',
      action() {
        const { state } = this
        onClearAll()
        this.state = !state
      },
      children: [
        {
          label: 'Github',
          value: 'github',
          shortcut: 'Ctrl + G',
          action() {
            ipcRenderer.invoke('open', 'https://github.com/biaov/mine-desktop')
          }
        },
        {
          label: '提问题',
          value: 'issues',
          shortcut: 'Ctrl + I',
          action() {
            ipcRenderer.invoke('open', 'https://github.com/biaov/mine-desktop/issues')
          }
        },
        {
          label: '检查更新',
          value: 'checkUpdate',
          shortcut: 'Ctrl + U',
          action() {
            ipcRenderer.invoke('check-for-updates', updatesEnums.check)
          }
        },
        {
          label: '关于',
          value: 'about',
          shortcut: 'Ctrl + A',
          action() {
            ipcRenderer.invoke(this.value).then((data: PackageJson) => {
              aboutDrawer.value = { ...data, visible: true }
            })
          }
        }
      ]
    }
  ])
  /**
   * 检查更新回传
   */
  onCheckForUpdate &&
    onCheckForUpdate(({ type, data }) => {
      switch (type) {
        case updatesEnums.error:
          message.error(JSON.stringify(data))
          break
        case updatesEnums.progress:
          modal.percent = +data.percent.toFixed(2)
          modal.closable = false
          modal.title = '下载进度条'
          modal.footer = null
          modal.type = 'progress'
          modal.content = ''
          modal.visible = true
          modal.maskClosable = false
          break
        case updatesEnums.available:
          Modal.confirm({
            title: '更新提示',
            content: `发现最新版本 v${data.version}，是否更新？体验更多功能`,
            cancelText: '不更新',
            okText: '更新',
            onOk() {
              Modal.confirm({
                title: '提示',
                content: `是否打开下载地址，自定义去下载？当前下载有可能会很慢！`,
                cancelText: '自定义下载',
                okText: '当前下载',
                onOk() {
                  ipcRenderer.invoke('check-for-updates', updatesEnums.downloading)
                },
                onCancel() {
                  ipcRenderer.invoke('open', 'https://github.com/biaov/mine-desktop/releases')
                }
              })
            }
          })
          break
        case updatesEnums.notAvailable:
          message.success('当前已是最新版本')
          break
        case updatesEnums.downloaded:
          modal.visible = false
          Modal.info({
            title: '升级提示',
            content: `已为您下载最新应用，点击确定马上替换为最新版本！`,
            okText: '确定',
            onOk() {
              ipcRenderer.invoke('check-for-updates', updatesEnums.quitAndInstall)
            }
          })
          break
      }
    })
  /**
   * 清空下拉框
   */
  const onClearAll: ClearAllFn = (list = menuList.value) => {
    list.forEach(item => {
      item.state && (item.state = false)
      item.children?.length && onClearAll(item.children)
    })
  }

  /**
   * 点击菜单项
   */
  const onMenuItem = (item: ListItem) => {
    callBack()
    item.action && item.action()
  }

  /**
   * 点击菜单下拉项
   */
  const onMenuChildItem = (item: ListItem) => {
    onClearAll()
    item.action && item.action()
  }

  /**
   * 隐藏下拉框
   */
  const onHideDropdown = (cb: CallBackFn) => {
    callBack = cb
  }

  /**
   * 点击确定
   */
  const handleOk = async () => {
    if (modal.type === 'down') {
      ipcRenderer.invoke('open', 'https://github.com/biaov/mine-desktop/releases')
    }
    modal.visible = false
  }

  return { aboutDrawer, menuList, modal, onMenuItem, onMenuChildItem, onClearAll, onHideDropdown, handleOk }
}

/**
 * 窗口大小
 */
export const useResize = () => {
  const { ipcRenderer } = useRenderer()
  const resizeList = ref<ListItem[]>([
    {
      title: '最小化',
      iconName: 'icon-minus',
      value: 'minimize',
      action() {
        ipcRenderer.invoke(this.value)
      }
    },
    {
      title: '最大化',
      iconName: 'icon-maximize',
      value: 'maximize',
      action() {
        ipcRenderer.invoke(this.value)
      }
    },
    {
      title: '关闭',
      iconName: 'icon-Quit',
      value: 'quit',
      action() {
        ipcRenderer.invoke(this.value)
      }
    }
  ])

  return { resizeList }
}

/**
 * 移动
 * @returns { MoveReturn } 返回数据
 */
export const useMove = (): MoveReturn => {
  const { ipcRenderer } = useRenderer()

  /**
   * 鼠标按下
   */
  const onMousedown = () => {
    ipcRenderer.send('start')
    /**
     * 表达式声明移动事件
     */
    document.onmousemove = () => {
      ipcRenderer.send('move')
    }

    /**
     * 表达式声明抬起事件
     */
    document.onmouseup = () => {
      /**
       * 清理上次的移动事件
       */
      document.onmousemove = null
      /**
       * 清理上次的抬起事件
       */
      document.onmouseup = null
    }
  }

  return { onMousedown }
}
