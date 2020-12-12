
const map = {
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
}

const color = (name, string) => {
  return map[name] + string + '\x1b[0m'
}

const log = (command, data) => {
  console.log()
  console.log(
    color('white', '--------'),
    color('yellow', command),
    color('white', '-'),
    color('yellow', new Date().toLocaleString()),
    color('white', '--------')
  )
  console.log(data.trim())
}

module.exports = log
