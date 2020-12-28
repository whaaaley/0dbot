
// TODO
// Inject this script into the client server side instead of importing it
// esbuild outputs empty app.js files when there's a build error
// so the client won't auto reconnect

if (DEVELOPMENT === true) {
  const source = new EventSource('/reload')

  source.onmessage = body => {
    if (body.data === 'connect') {
      console.log('Connected to automatic reload')
      return // stop execution
    }

    if (body.data === 'reload') {
      window.location.reload()
      return // stop execution
    }

    if (body.data === undefined) {
      console.log('Heartbeat from automatic reload')
    }
  }
}
