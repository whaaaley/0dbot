
import { div, input, text } from '../html'
import discord from '../stores/discord'

const format = time => {
  return new Date(time * 1000).toISOString().slice(14, 19)
}

const List = queue => {
  const target = []

  if (queue.length === 0) {
    const item = div({ class: '-em' }, text('Awaiting messages...'))
    target[0] = item

    return target
  }

  for (let i = 0; i < queue.length; i++) {
    const message = queue[i]

    const item = div({ class: '-pending' }, [
      text(message.data)
    ])

    target[i] = item
  }

  return target
}

const Timer = time => {
  return div([
    text(format(time))
  ])
}

const Home = (state, dispatch) => {
  return div({ class: 'home' }, [
    div({ class: 'home-box' }, [
      div({ class: 'home-inputs' }, [
        input({
          type: 'password',
          autocomplete: 'off',
          placeholder: 'Discord Token',
          onchange: e => {
            dispatch(discord.actions.updateToken, e.target.value)
          }
        }),
        input({
          placeholder: 'Channel ID',
          onchange: e => {
            dispatch(discord.actions.updateChannelID, e.target.value)
          }
        })
      ]),
      div({ id: 'list', class: 'home-list' }, List(state.discord.queue)),
      div({ class: 'home-message' }, [
        input({
          type: 'text',
          placeholder: 'Message #general',
          class: '-message',
          onkeypress: e => {
            if (e.key === 'Enter') {
              dispatch(discord.actions.enqueue, e)

              // reset input
              e.target.value = ''

              // scroll to bottom
              // dumb hack because lifecycle events are dead
              const el = document.getElementById('list')
              el.scrollTop = el.scrollHeight
            }
          }
        }),
        Timer(state.discord.timer)
      ])
    ])
  ])
}

export default {
  view: Home,
  init: () => {
    console.log('home')
  }
}
