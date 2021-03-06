import { ref, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { useRenderer } from '@/composables/useBridge'
import { ListItem, ShareData, DropdownConfig, ContextmenuReturn, MoveReturn, PackageJson } from './interfaces'
import { CallBackFn, ClearAllFn } from './types'

/**
 * 鼠标右击
 * @param { ShareData } 共享数据
 * @return { useContextmenuReturn } 返回数据
 */
export const useContextmenu = ({ menuList, onClearAll, onHideDropdown }: ShareData): ContextmenuReturn => {
  const { ipcRenderer } = useRenderer()
  // 下拉列表
  const dropdownList = ref<ListItem[]>([
    {
      label: '最大化',
      value: 'maximize',
      action() {
        ipcRenderer.invoke(this.value) // 渲染进程
      }
    },
    {
      label: '最小化',
      value: 'minimize',
      action() {
        ipcRenderer.invoke(this.value) // 渲染进程
      }
    },
    {
      label: '关闭',
      value: 'quit',
      shortcut: 'Alt + F4',
      action() {
        ipcRenderer.invoke(this.value) // 渲染进程
      }
    }
  ])
  // 下拉框配置项
  const dropdownConfig = ref<DropdownConfig>({
    visible: false,
    x: 0,
    y: 0
  })

  // 点击下拉框项
  const onDropdownItem = (item: ListItem) => {
    dropdownConfig.value.visible = false
    item.action && item.action()
  }

  // 右击
  const onContextmenu = (e: MouseEvent) => {
    onClearAll()
    dropdownConfig.value = {
      visible: true,
      x: `${e.clientX}px`,
      y: `${e.clientY}px`
    }
  }

  // 执行快捷键方法
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
  const { ipcRenderer } = useRenderer()
  let callBack: CallBackFn
  let onClearAll: ClearAllFn
  const aboutDrawer = ref({ visible: false, name: '', version: '' })
  const menuList = ref<ListItem[]>([
    {
      label: '作品集',
      value: 'works',
      shortcut: 'E',
      action() {
        onClearAll()
        this.state = !this.state
      },
      children: [
        {
          label: 'H5 UI 组件库 - MINE-H5-UI',
          value: 'mine-h5-ui',
          action() {
            ipcRenderer.invoke('open', 'https://mineh5ui.biaov.cn/v2/') // 渲染进程
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
            ipcRenderer.invoke('open', 'https://baidu.com/') // 渲染进程
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
            ipcRenderer.invoke('open', 'https://github.com/biaov/mine-desktop') // 渲染进程
          }
        },
        {
          label: '提问题',
          value: 'issues',
          shortcut: 'Ctrl + I',
          action() {
            ipcRenderer.invoke('open', 'https://github.com/biaov/mine-desktop/issues') // 渲染进程
          }
        },
        {
          label: '检查更新',
          value: 'checkUpdate',
          shortcut: 'Ctrl + U',
          action() {
            message.info('暂未开放')
            // ipcRenderer.invoke(this.value) // 渲染进程
          }
        },
        {
          label: '关于',
          value: 'about',
          shortcut: 'Ctrl + A',
          action() {
            // 渲染进程
            ipcRenderer.invoke(this.value).then((data: PackageJson) => {
              aboutDrawer.value = { ...data, visible: true }
            })
          }
        }
      ]
    }
  ])

  // 清空下拉框
  onClearAll = (list = menuList.value) => {
    list.forEach(item => {
      item.state && (item.state = false)
      item.children?.length && onClearAll(item.children)
    })
  }

  // 点击菜单项
  const onMenuItem = (item: ListItem) => {
    callBack()
    item.action && item.action()
  }
  // 点击菜单下拉项
  const onMenuChildItem = (item: ListItem) => {
    onClearAll()
    item.action && item.action()
  }
  // 隐藏下拉框
  const onHideDropdown = (cb: CallBackFn) => {
    callBack = cb
  }

  return { aboutDrawer, menuList, onMenuItem, onMenuChildItem, onClearAll, onHideDropdown }
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
        console.log(ipcRenderer, '--')
        ipcRenderer.invoke(this.value) // 渲染进程
      }
    },
    {
      title: '最大化',
      iconName: 'icon-maximize',
      value: 'maximize',
      action() {
        ipcRenderer.invoke(this.value) // 渲染进程
      }
    },
    {
      title: '关闭',
      iconName: 'icon-Quit',
      value: 'quit',
      action() {
        ipcRenderer.invoke(this.value) // 渲染进程
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
  // 鼠标按下
  const onMousedown = () => {
    ipcRenderer.send('start')
    // 表达式声明移动事件
    document.onmousemove = () => {
      ipcRenderer.send('move')
    }

    // 表达式声明抬起事件
    document.onmouseup = () => {
      document.onmousemove = null // 清理上次的移动事件
      document.onmouseup = null // 清理上次的抬起事件
    }
  }

  return { onMousedown }
}
