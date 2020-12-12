
const sendMessage = async data => {
  fetch(`https://discord.com/api/v8/channels/${data.channelID}/messages`, {
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

const enqueue = ({ discord }) => data => {
  discord.timer = discord.timer + 60
  discord.queue.push({
    data: data.target.value
  })

  return { discord }
}

const timer = async ({ discord }) => {
  if (discord.queue.length > 0 && discord.timer % 60 === 0) {
    await sendMessage({
      channelID: discord.channelID,
      content: discord.queue[0].data,
      token: discord.token
    })

    discord.queue = discord.queue.slice(1)
  }

  if (discord.timer > 0) {
    discord.timer = discord.timer - 1
  }

  return { discord }
}

export default {
  state: {
    queue: [],
    timer: 0,
    token: ''
  },
  actions: {
    enqueue,
    timer,
    updateToken: ({ discord }) => data => {
      discord.token = data
      return { discord }
    },
    updateChannelID: ({ discord }) => data => {
      discord.channelID = data
      return { discord }
    }
  }
}
