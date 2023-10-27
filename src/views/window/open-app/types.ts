/**
 * 预设列表项
 */
export interface PresetListItem {
  label: string
  value: string
  custom?: boolean
  icon?: string
  antIcon?: string
  color?: string
}

/**
 * 历史列表项
 */
export type HistoryListItem = PresetListItem

/**
 * 分享数据
 */
export interface ShareData {
  onPresetItem: (item: PresetListItem) => void
}
