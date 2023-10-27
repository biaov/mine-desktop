/**
 * label 占列数
 */
const labelSpan = 3

/**
 * wrapper 占列数
 */
const wrapperSpan = 24 - labelSpan

/**
 * 表单布局
 */
export const cols = {
  labelCol: { span: labelSpan },
  wrapperCol: { span: wrapperSpan },
  btnWrapperCol: { offset: labelSpan, span: wrapperSpan }
}
