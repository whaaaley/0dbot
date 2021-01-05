
> discord-message-queue

[![Netlify Status](https://api.netlify.com/api/v1/badges/b5bb1a13-107e-423c-a473-64f1d869955d/deploy-status)](https://app.netlify.com/sites/discord-message-queue/deploys)

Delay each message 60 seconds by using discord message queue.

This project is hosted here https://discord-message-queue.netlify.app/

## Features
+ Sending messages every 60 seconds
+ Merging messages
+ Removing messages
+ Saving token and channel id to local storage

## Todo
+ Editing messages
+ Saving multiple channel ids
+ Auto merging messages within a customizable threshold
+ Customizable merge delimiter
+ Customizable timer duration

## View Layer Syntax

Children _must_ be contained inside an array. This was was traded for optional
prop objects which are more common.

```js
// Valid syntax
div()
div([/* nodes */])
div({ /* props */ })
div({ /* props */ }, [/* nodes */])

// Deprecated syntax
div(/* node */)
div({ /* props */ }, /* node */)
```

## Preview

![screenshot](screenshot.png)
