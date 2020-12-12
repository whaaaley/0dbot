
import './automaticReload'

import { patch } from 'superfine'
import { dispatch, getState } from './pocket'
// import { gtagConfig } from './gtag'

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

// Initialize stores
// dispatch(foobar.actions.init)

// const dragHandler = event => event.preventDefault()

// Listen for drop events
// document.body.addEventListener('drop', dragHandler)
// document.body.addEventListener('dragover', dragHandler)

const routeHandler = () => {
  dispatch(router.actions.routerInit)

  getState(state => {
    const routeObject = getRouteObject(state)
    routeObject.init()
  })

  // gtagConfig()
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

// Interval
window.setInterval(() => {
  dispatch(discord.actions.timer)
}, 1000)
