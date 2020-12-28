
import escape from './lib/escapeHtml'

const isArray = Array.isArray

const VOID = ['img', 'input', 'meta', 'br', 'wbr', 'embed', 'area', 'base', 'col',
  'link', 'param', 'source', 'track', 'circle', 'ellipse', 'line', 'mesh',
  'path', 'polygon', 'polyline', 'rect']

const join = children => {
  let target = ''

  // WARNING: When used directly this includes unescaped text in the document.
  if (typeof children === 'string') {
    return children
  }

  if (isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      target += isArray(child) ? child.join('') : child
    }
  }

  return target
}

const renderNode = (tag, data, children) => {
  let attrs = ''

  for (const key in data) {
    const value = data[key]

    if (typeof value === 'string') {
      attrs += ' ' + key + '="' + escape(value) + '"'
    }
  }

  const target = '<' + tag + attrs

  if (VOID.includes(tag)) {
    return target + '/>'
  }

  return target + '>' + join(children) + '</' + tag + '>'
}

const renderTextNode = string => escape(string)

export { renderNode, renderTextNode }
