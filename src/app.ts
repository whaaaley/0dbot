
import { patch } from 'superfine'
import { dispatch, getState } from './pocket'

// Stores
import discord from './stores/discord'
import router from './stores/router'

// Views
import Home from './views/home'

// App routes
const pages = {
  '/': Home
}

const getRouteObject = state => {
  const route = pages[state.router.to]
  return route && route.init ? route : pages['/missing']
}

const routeHandler = () => {
  dispatch(router.actions.routerInit)

  getState(state => {
    const routeObject = getRouteObject(state)
    routeObject.init()
  })
}

// Initalize routing
routeHandler()

// Listen for route events
window.addEventListener('popstate', routeHandler)
window.addEventListener('pushstate', routeHandler)

const node = document.getElementById('app')

// Listen for render events
window.addEventListener('render', () => {
  getState(state => {
    const routeObject = getRouteObject(state)
    patch(node, routeObject.view(state, dispatch))
  })
})

//
//
// Anything that needs to be done when the app starts
//
//

// Interval
window.setInterval(() => {
  dispatch(discord.actions.timer)
}, 1000)

// Self explanatory
dispatch(discord.actions.restoreLocalStorage)

//
// Google Tag Manager
//

interface dataLayerEvent {
  'gtm.start': number,
  'event': string
}

declare global {
  interface Window { dataLayer: dataLayerEvent[] }
}

window.dataLayer = window.dataLayer || []
window.dataLayer.push({
  'gtm.start': new Date().getTime(),
  'event': 'gtm.js'
})
