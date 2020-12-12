
import escape from './lib/escapeHtml'

const VOID = ['img', 'input', 'meta', 'br', 'wbr', 'embed', 'area', 'base', 'col',
  'link', 'param', 'source', 'track', 'circle', 'ellipse', 'line', 'mesh',
  'path', 'polygon', 'polyline', 'rect']

const join = children => {
  let target = ''

  // WARNING: When used directly this includes unescaped text in the document
  if (typeof children === 'string') {
    return children
  }

  if (Array.isArray(children) === true) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i]

      target += Array.isArray(child) === true ? child.join('') : child
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

  // if (VOID.includes(tag) === true) {
  if (VOID.includes(tag) === true && !children) {
    return target + '/>'
  }

  return target + '>' + join(children) + '</' + tag + '>'
}

const renderTextNode = string => escape(string)

export { renderNode, renderTextNode }
