
import fs from 'fs'
import { body, html, link, meta, script, style, title, div, text } from './html'

const readFile = file => fs.readFileSync(file, 'utf-8')

const Inline = () => [
  style(readFile('./public/main.min.css')),
  script(readFile('./public/app.min.js'))
]

const Reference = () => [
  link({ rel: 'stylesheet', href: '/main.css' }),
  script({ defer: true, src: '/app.js' })
]

const Sources = DEV ? Reference : Inline

const render = data => {
  return html({ lang: 'en' }, [
    meta({ charset: 'utf-8' }),
    title(text(data.title)),
    meta({ name: 'author', content: data.author }),
    meta({ name: 'description', content: data.description }),
    meta({ name: 'theme-color', content: '#202225' }),
    meta({ id: 'viewport', name: 'viewport', content: 'width=device-width, maximum-scale=1, user-scalable=0' }),
    link({ rel: 'icon', type: 'image/png', href: '/favicon.png' }),
    body([
      div({ id: 'app' }),
      Sources(data),
      script({ async: true, src: 'https://www.googletagmanager.com/gtm.js?id=GTM-KW3BBQZ' })
    ])
  ])
}

const output = render({
  title: 'Discord Message Queue',
  author: 'Dustin Dowell',
  description: ''
})

process.stdout.write('<!DOCTYPE html>' + output)
