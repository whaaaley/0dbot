
// TODO
// + Inline favicon.svg and manifest.webmanifest as data URLs
// + Optimize gtm.js

import { readFileSync } from 'fs'
import { body, html, link, meta, noscript, script, style, title, div } from './html'

const render = data => {
  return html({ lang: 'en' }, [
    meta({ charset: 'utf-8' }),
    title(data.title),
    meta({ name: 'author', content: data.author }),
    meta({ name: 'description', content: data.description }),
    meta({ name: 'theme-color', content: '#202225' }),
    meta({ name: 'viewport', content: 'width=device-width' }),
    link({ rel: 'icon', href: '/favicon.svg' }),
    link({ rel: 'manifest', href: '/manifest.webmanifest' }),
    data.styles,
    body([
      noscript('Please enable JavaScript and try again.'),
      div({ id: 'app' }),
      // div(),
      // div({ foo: 'bar' }),
      // div({ foo: 'bar' }, [div()]),
      // div({ foo: 'bar' }, div()),
      // div([div()]),
      // div(div()),
      data.scripts,
      script({ defer: true, src: '//googletagmanager.com/gtm.js?id=GTM-KW3BBQZ' })
    ])
  ])
}

const output = render({
  title: 'Discord Message Queue',
  author: 'Dustin Dowell',
  description: 'Queue Discord messages. Send one per minute.',
  styles: DEVELOPMENT
    ? link({ rel: 'stylesheet', href: '/main.css' })
    : style(readFileSync('./public/main.min.css', 'utf8')),
  scripts: DEVELOPMENT
    ? script({ defer: true, src: '/app.js' })
    : script(readFileSync('./public/app.min.js', 'utf8'))
})

process.stdout.write('<!DOCTYPE html>' + output)
