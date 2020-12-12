
// I made this :)
// This is a really simple state manager

// Import some state from our stores
import discord from './stores/discord'
import router from './stores/router'

// Create a render event for dom patching in app.js
const renderEvent = new CustomEvent('render')

// App state
const state = {
  discord: discord.state,
  router: router.state
}

// Locking prevents dispatching multiple render evnets
let lock = false

// Update the state object and dispatch a render event
const update = data => {
  Object.assign(state, data)

  if (!lock) {
    lock = true

    window.requestAnimationFrame(() => {
      lock = false
      window.dispatchEvent(renderEvent)
    })
  }
}

// Decide how to call update
// Note: Actions must return a plain object or promise
const dispatch = (action, data) => {
  let result = action(state, dispatch)

  if (typeof result === 'function') {
    result = result(data)
  }

  if (result.then === undefined) {
    update(result)
  } else {
    result.then(data => update(data))
  }
}

// Does the thing
const getState = action => action(state)

// Wrap it up...
export { dispatch, update, getState }
