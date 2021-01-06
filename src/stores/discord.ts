
const sendMessage = data => {
  console.log(data)

  return fetch(`https://discord.com/api/v8/channels/${data.channelID}/messages`, {
    headers: {
      'accept': '*/*',
      'accept-language': 'en-US',
      'authorization': data.token,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      content: data.content,
      tts: false
    }),
    method: 'POST',
    credentials: 'include'
  })
}

//

const add = ({ discord }) => data => {
  discord.timer += 60
  discord.queue.push(data.target.value)

  return { discord }
}

//

// const edit = ({ discord }) => data => {
//   return { discord }
// }

//

const merge = ({ discord }) => data => {
  const queue = discord.queue
  discord.timer -= 60 // one less message = one less minute

  for (let i = data; i < queue.length; i++) {
    queue[i - 1] = i === data
      ? queue[i - 1] + '. ' + queue[i]
      : queue[i]
  }

  queue.pop()

  return { discord }
}

//

const remove = ({ discord }) => data => {
  const queue = discord.queue
  discord.timer -= 60 // one less message = one less minute

  for (let i = data; i < queue.length; i++) {
    queue[i] = queue[i + 1]
  }

  queue.pop()

  return { discord }
}

//

const timer = async ({ discord }) => {
  if (discord.queue.length > 0 && discord.timer % 60 === 0) {
    await sendMessage({
      channelID: discord.channelID,
      content: discord.queue[0],
      token: discord.token
    })

    discord.queue = discord.queue.slice(1)
  }

  if (discord.timer > 0) {
    discord.timer = discord.timer - 1
  }

  return { discord }
}

//

const saveChannelID = ({ discord }) => {
  discord.saveChannelID = !discord.saveChannelID
  localStorage.setItem('channelID', discord.saveChannelID ? discord.channelID : '')

  return { discord }
}

const updateChannelID = ({ discord }) => data => {
  discord.channelID = data

  if (discord.saveChannelID) {
    localStorage.setItem('channelID', discord.channelID)
  }

  return { discord }
}

//

const saveToken = ({ discord }) => {
  discord.saveToken = !discord.saveToken
  localStorage.setItem('token', discord.saveToken ? discord.token : '')

  return { discord }
}

const updateToken = ({ discord }) => data => {
  discord.token = data

  if (discord.saveToken) {
    localStorage.setItem('token', discord.token)
  }

  return { discord }
}

//

const restoreLocalStorage = ({ discord }) => {
  discord.saveChannelID = !discord.saveChannelID
  discord.saveToken = !discord.saveToken

  discord.channelID = localStorage.getItem('channelID')
  discord.token = localStorage.getItem('token')

  return { discord }
}

//

export default {
  state: {
    queue: [],
    saveChannelID: false,
    saveToken: false,
    timer: 0,
    token: '',
    channelID: ''
  },
  actions: {
    add,
    merge,
    remove,
    timer,

    saveChannelID,
    updateChannelID,

    saveToken,
    updateToken,

    restoreLocalStorage
  }
}
