
import { h as node, text as textNode } from 'superfine'
import { renderNode, renderTextNode } from './render'

const EMPTY_OBJ = {}
const isArray = Array.isArray

const nodeType = STATIC ? renderNode : node
const text = STATIC ? renderTextNode : textNode

const h = a => (b, c) => {
  const cond = STATIC
    ? typeof b === 'string'
    : b && b._node === true

  return b === undefined || isArray(b) || cond
    ? privateNode(a, EMPTY_OBJ, b)
    : privateNode(a, b, c)
}

const privateNode = (a, b, c) => {
  const target = nodeType(a, b, c)
  target._node = true
  return target
}

const privateText = a => {
  const target = text(a)
  target._node = true
  return target
}

export { h, privateText as text }
