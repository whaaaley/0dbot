
import { div } from '../html'

const Missing = (state, dispatch) => {
  return div('missing')
}

export default {
  view: Missing,
  init: () => {
    console.log('missing')
  }
}
