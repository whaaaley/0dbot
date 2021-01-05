
import { div, text } from '../html'

const Missing = (state, dispatch) => {
  return div([
    text('missing')
  ])
}

export default {
  view: Missing,
  init: () => {
    console.log('missing')
  }
}
