
import { renderNode, renderTextNode } from './render'

// TODO: Learn how to declare these globally
declare var DEV: any
declare var STATIC: any

const EMPTY_ARR = []
const EMPTY_OBJ = {}
const isArray = Array.isArray

const virtualNode = (type: string, props?, children?) => ({
  type,
  props,
  children: children == null ? EMPTY_ARR : children,
  key: props.key
})

const virtualTextNode = (type: string) => ({
  type,
  props: EMPTY_OBJ,
  children: EMPTY_ARR,
  tag: 3
})

const node = STATIC ? renderNode : virtualNode
const text = STATIC ? renderTextNode : virtualTextNode

const h = (type: string) => (props?, children?) => {
  return props == null || isArray(props) || (STATIC && typeof props === 'string')
    ? node(type, EMPTY_OBJ, props)
    : node(type, props, children)
}

export { h, text }
