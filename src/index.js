
import fs from 'fs'
import { body, html, link, meta, noscript, script, style, title, div } from './html'

const readFile = file => fs.readFileSync(file, 'utf-8')

const Inline = () => [
  style(readFile('./public/main.min.css')),
  script(readFile('./public/app.min.js'))
]

const Reference = () => [
  link({ rel: 'stylesheet', href: '/main.css' }),
  script({ defer: true, src: '/app.js' })
]

const render = data => {
  return html({ lang: 'en' }, [
    meta({ charset: 'utf-8' }),
    title(data.title),
    meta({ name: 'author', content: data.author }),
    meta({ name: 'description', content: data.description }),
    meta({ name: 'theme-color', content: '#202225' }),
    meta({ id: 'viewport', name: 'viewport', content: 'width=device-width' }),
    link({ rel: 'icon', type: 'image/png', href: '/favicon.png' }),
    link({ rel: 'manifest', href: '/manifest.webmanifest' }),
    body([
      div({ id: 'app' }),
      noscript('Please enable JavaScript and try again.'),
      (DEV ? Reference : Inline)(),
      script({ defer: true, src: 'https://www.googletagmanager.com/gtm.js?id=GTM-KW3BBQZ' })
    ])
  ])
}

const output = render({
  title: 'Discord Message Queue',
  author: 'Dustin Dowell',
  description: 'Queue Discord messages. Send one per minute.'
})

process.stdout.write('<!DOCTYPE html>' + output)
