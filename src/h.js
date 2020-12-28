
import { renderNode, renderTextNode } from './render'

const EMPTY_ARR = []
const EMPTY_OBJ = {}
const isArray = Array.isArray

// The functions `virtualNode` and `virtualTextNode` are based on Superfine's
// https://github.com/jorgebucaran/superfine/blob/main/index.js

// NOTES:
// 1. These checks allow passing a node directly, outside of an array
//   Before h('div', [ <node> ])
//   After  h('div', <node>)
// 2. The _node property is nessecary to have an optional props object
//   Before h('div', {}, [ <children> ])
//   After  h('div', [ <children> ])

const virtualNode = (type, props, ch) => ({
  _vnode: true, // 2
  type,
  props,
  children: isArray(ch) ? ch : ch == null ? EMPTY_ARR : [ch], // 1
  dom: null,
  key: props.key
})

const virtualTextNode = (value, dom) => ({
  _vnode: true, // 2
  type: value,
  props: EMPTY_OBJ,
  children: EMPTY_ARR,
  dom,
  key: null,
  tag: 3
})

// NOTE: renderNode returns an HTML string while virtualNode returns virtual
// nodes. Likewise for renderTextNode and virtualTextNode.

const node = STATIC ? renderNode : virtualNode
const text = STATIC ? renderTextNode : virtualTextNode

// Syntax variations
// h('div')
// h('div', { <props> })
// h('div', { <props> }, [ <node> ])
// h('div', [ <node> ])
// h('div', <node>)

const h = a => (b, c) => {
  return b == null || isArray(b) || (STATIC ? typeof b === 'string' : b._vnode)
    ? node(a, EMPTY_OBJ, b)
    : node(a, b, c)
}

export { h, text }
