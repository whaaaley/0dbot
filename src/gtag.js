
window.dataLayer = window.dataLayer || []

function gtag () {
  dataLayer.push(arguments) // eslint-disable-line
}

gtag('js', new Date())

const gtagConfig = () => {
  gtag('config', 'G-G2KX3JWYLV', {
    page_title: document.title,
    page_location: location.href,
    page_path: location.pathname
  })
}

const gtagEvent = (action, data) => {
  return gtag('event', action, {
    event_category: data.category,
    event_label: data.label,
    value: data.value
  })
}

export { gtag, gtagConfig, gtagEvent }
