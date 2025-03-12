import type { USEDefineTemplateOption } from './types'

const cacheStringFunction = (fn: (str: string) => string) => {
  const cache = Object.create(null)
  return (str: string) => {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }
}

const camelize = cacheStringFunction((str: string) => str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : '')))

function keysToCamelKebabCase(obj: Record<string, unknown>) {
  const newObj: Record<string, unknown> = {}
  Object.keys(obj).forEach(key => {
    newObj[camelize(key)] = obj[key]
  })
  return newObj
}

/**
 * 创建模板
 */
export const useDefineTemplate = (options: USEDefineTemplateOption = {}) => {
  const { inheritAttrs = true } = options

  const render = shallowRef()

  const defineTemplate = defineComponent({
    setup(_, { slots }) {
      return () => {
        render.value = slots.default
      }
    }
  })
  const reuseTemplate = defineComponent({
    inheritAttrs,
    setup(_, { attrs, slots }) {
      return () => {
        if (!render.value && process.env.NODE_ENV !== 'production') throw new Error('[VueUse] Failed to find the definition of reusable template')
        const vnode = render.value?.({ ...keysToCamelKebabCase(attrs), $slots: slots })

        return inheritAttrs && vnode?.length === 1 ? vnode[0] : vnode
      }
    }
  })

  return [defineTemplate, reuseTemplate]
}
