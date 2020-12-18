
// { source: /^\/gp\/[0-9a-f]{24}$/i, destination: '/general' }
// { source: /^\/dp\/[0-9a-f]{24}$/i, destination: '/detail' }

const rewrites = [
  // { source: /^\/user\/\w+$/i, destination: '/user' }
]

const pushstateEvent = new CustomEvent('pushstate')

// data = string
const decode = data => {
  const query = data.slice(1).split(/[&=]/g)
  const result = {}

  for (let i = 0; i < query.length; i += 2) {
    result[query[i]] = query[i + 1]
  }

  return result
}

// data = {
//   [key: string]: string
// }
const encode = data => {
  let result = '?'

  for (const key in data) {
    if (data[key] != null) {
      result += key + '=' + data[key] + '&'
    }
  }

  return result.slice(0, -1)
}

// state = {
//   router: {
//     id: string,
//     query: string,
//     to: string
//   }
// }
const routerInit = state => {
  const { pathname, search } = window.location
  const router = state.router

  if (typeof search === 'string') {
    router.query = decode(search)
  }

  for (let i = 0; i < rewrites.length; i++) {
    const result = pathname.match(rewrites[i].source)

    if (result != null) {
      router.id = result[0]
      router.to = rewrites[i].destination

      return { router }
    }
  }

  router.to = pathname

  return { router }
}

// data = {
//   to: string,
//   query: object
// }
const routerLink = state => data => {
  if (data.to === window.history.state) {
    window.history.back()
    return // stop execution
  }

  const to = typeof data.to === 'string'
    ? data.to
    : state.router.to

  const href = data.query
    ? to + encode(data.query)
    : to

  window.history.pushState(state.router.to, null, href)
  window.dispatchEvent(pushstateEvent)
}

export default {
  state: {
    id: null,
    query: null,
    to: '/'
  },
  actions: {
    routerLink,
    routerInit
  }
}
