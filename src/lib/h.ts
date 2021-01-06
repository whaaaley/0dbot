
import { renderNode, renderTextNode } from './render'

const EMPTY_ARR: void[] = []
const EMPTY_OBJ = {}
const isArray = Array.isArray

// TODO: Learn how to declare these globally
declare var DEV: any
declare var STATIC: any

// TODO: Should these be in their own file?
interface Node {
  type: string,
  props: {
    [key: string]: any
  },
  children: void | void[] | Node[],
  key?: string,
  tag?: number
}

interface Props {
  [key: string]: any
}

type Children = void | void[] | Node[]
type OptionalProps = Props | Children

const virtualNode = (type: string, props?: Props, ch?: Children): Node => ({
  type,
  props,
  children: ch == null ? EMPTY_ARR : ch,
  key: props.key
})

const virtualTextNode = (type: string): Node => ({
  type,
  props: EMPTY_OBJ,
  children: EMPTY_ARR,
  tag: 3
})

const node = STATIC ? renderNode : virtualNode
const text = STATIC ? renderTextNode : virtualTextNode

const h = (type: string) => (props?: OptionalProps, children?: Children) => {
  return props == null || isArray(props) || (STATIC && typeof props === 'string')
    ? node(type, EMPTY_OBJ, props)
    : node(type, props, children)
}

export { h, text }
