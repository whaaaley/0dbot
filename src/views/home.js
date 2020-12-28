
import { div, input, text } from '../html'
import discord from '../stores/discord'

let state
let dispatch

//

const format = time => new Date(time * 1000).toISOString().slice(14, 19)

//

const message = (index, data) => {
  return div({ class: 'message' }, [
    div(text(data)),
    div({ class: 'message-control' }, [
      div({
        class: '-merge',
        onclick: () => {
          dispatch(discord.actions.merge, index)
        }
      }),
      div({
        class: '-remove',
        onclick: () => {
          dispatch(discord.actions.remove, index)
        }
      })
    ])
  ])
}

//

const List = queue => {
  const target = []

  if (queue.length === 0) {
    target[0] = div({ class: 'placeholder' }, text('Awaiting messages...'))
  } else {
    for (let i = 0; i < queue.length; i++) {
      target[i] = message(i, queue[i])
    }
  }

  return div({ id: 'list', class: 'list' }, target)
}

//

const Home = (localState, localDispatch) => {
  state = localState
  dispatch = localDispatch

  return div({ class: 'home' }, [
    div({ class: 'container' }, [
      div({ class: 'header' }, [
        // label({ for: 'password' }, text('Discord Token')),
        input({
          // id: 'password',
          type: 'password',
          autocomplete: 'off',
          placeholder: 'Discord Token',
          value: state.discord.token,
          onchange: e => {
            dispatch(discord.actions.updateToken, e.target.value)
          }
        }),
        div({
          class: state.discord.saveToken === true && '-on',
          onclick: () => {
            dispatch(discord.actions.saveToken)
          }
        }),
        // label({ for: 'channel-id' }, text('Channel ID')),
        input({
          // id: 'channel-id',
          placeholder: 'Channel ID',
          value: state.discord.channelID,
          onchange: e => {
            dispatch(discord.actions.updateChannelID, e.target.value)
          }
        }),
        div({
          class: state.discord.saveChannelID === true && '-on',
          onclick: () => {
            dispatch(discord.actions.saveChannelID)
          }
        })
      ]),
      div({ class: 'content' }, [
        List(state.discord.queue),
        div({ class: 'x' }, [
          // label({ for: 'message-box' }, text('Message #general')),
          input({
            // id: 'message-box',
            type: 'text',
            placeholder: 'Message #general',
            onkeypress: e => {
              if (e.key === 'Enter') {
                dispatch(discord.actions.add, e)

                // reset input
                e.target.value = ''

                // scroll to bottom
                // dumb hack because lifecycle events are dead
                const el = document.getElementById('list')
                el.scrollTop = el.scrollHeight
              }
            }
          }),
          div(text(format(state.discord.timer)))
        ])
      ])
    ])
  ])
}

//

export default {
  view: Home,
  init: () => {
    console.log('home')
  }
}
