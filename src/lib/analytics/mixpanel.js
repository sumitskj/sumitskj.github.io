import mixpanel from 'mixpanel-browser'

const MIXPANEL_TOKEN = '5462a8b52389624fc89dac843cde9557'

let isInitialized = false

export function initMixpanel() {
  if (isInitialized) return
  if (!MIXPANEL_TOKEN) {
    console.warn('[analytics] Mixpanel token not set; analytics disabled')
    return
  }

  mixpanel.init(MIXPANEL_TOKEN, {
    debug: false,
    track_pageview: true,
    api_host: 'https://api-eu.mixpanel.com'
  })
  trackPageview();
  isInitialized = true
}

export function trackEvent(eventName, props = {}) {
  if (!isInitialized) return
  try {
    mixpanel.track(eventName, props)
  } catch {
    // ignore
  }
}

export function trackPageview(pathname = window.location.pathname) {
  trackEvent('Page Viewed', { pathname })
}


