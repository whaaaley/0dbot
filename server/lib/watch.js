
// NOTE: Node's recursive file watching doesn't work on Linux
// Roughly derived from https://github.com/gavoja/simple-watcher

const fs = require('fs')
const path = require('path')

let last = 0

const debounce = (eventType, filename, handler) => {
  const now = new Date().getTime()

  if (now > last + 200) {
    handler(eventType, filename)
  }

  last = now
}

const watch = (root, handler) => {
  const dirs = [root]

  const watchHandler = (eventType, filename) => {
    debounce(eventType, filename, handler)
  }

  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i]
    const children = fs.readdirSync(dir)

    for (let i = 0; i < children.length; i++) {
      const childPath = path.resolve(dir, children[i])

      if (fs.statSync(childPath).isDirectory()) {
        dirs.push(childPath)
      }
    }

    fs.watch(dir, watchHandler)
  }
}

module.exports = watch
