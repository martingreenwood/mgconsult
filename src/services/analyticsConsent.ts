export type AnalyticsConsent = 'granted' | 'denied'

type StoredConsent = {
  status: AnalyticsConsent
  updatedAt: number
}

declare global {
  interface Window {
    dataLayer?: unknown[][]
    gtag?: (...args: unknown[]) => void
  }
}

const analyticsId = 'G-X5LPRZB8P4'
const consentStorageKey = 'mg-analytics-consent-v1'
const consentLifetime = 1000 * 60 * 60 * 24 * 180
const localHosts = new Set(['localhost', '127.0.0.1'])

let sessionConsent: AnalyticsConsent | null = null
let analyticsScheduled = false

const isAnalyticsConsent = (value: unknown): value is AnalyticsConsent => (
  value === 'granted' || value === 'denied'
)

const ensureGtag = () => {
  window.dataLayer = window.dataLayer ?? []
  window.gtag = window.gtag ?? ((...args: unknown[]) => {
    window.dataLayer?.push(args)
  })
}

const updateGoogleConsent = (status: AnalyticsConsent) => {
  ensureGtag()
  window.gtag?.('consent', 'update', {
    analytics_storage: status,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })
}

const removeAnalyticsCookies = () => {
  const hostname = window.location.hostname
  const domainCandidates = [hostname, `.${hostname}`]
  const analyticsCookies = document.cookie
    .split(';')
    .map((cookie) => cookie.trim().split('=')[0])
    .filter((name) => name === '_ga' || name.startsWith('_ga_'))

  analyticsCookies.forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax`

    domainCandidates.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/; domain=${domain}; SameSite=Lax`
    })
  })
}

const loadAnalytics = () => {
  if (
    localHosts.has(window.location.hostname)
    || document.querySelector(`script[data-analytics-id="${analyticsId}"]`)
  ) {
    return
  }

  ensureGtag()
  updateGoogleConsent('granted')

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`
  script.dataset.analyticsId = analyticsId
  document.head.appendChild(script)

  window.gtag?.('js', new Date())
  window.gtag?.('config', analyticsId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  })
}

const scheduleAnalytics = () => {
  if (analyticsScheduled) return
  analyticsScheduled = true

  const start = () => {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(loadAnalytics, { timeout: 2500 })
    } else {
      globalThis.setTimeout(loadAnalytics, 1500)
    }
  }

  if (document.readyState === 'complete') {
    start()
  } else {
    window.addEventListener('load', start, { once: true })
  }
}

export const getAnalyticsConsent = (): AnalyticsConsent | null => {
  if (sessionConsent) return sessionConsent

  try {
    const stored = JSON.parse(window.localStorage.getItem(consentStorageKey) ?? 'null') as StoredConsent | null

    if (
      !stored
      || !isAnalyticsConsent(stored.status)
      || !Number.isFinite(stored.updatedAt)
      || Date.now() - stored.updatedAt > consentLifetime
    ) {
      return null
    }

    sessionConsent = stored.status
    return stored.status
  } catch {
    return null
  }
}

export const setAnalyticsConsent = (status: AnalyticsConsent) => {
  sessionConsent = status

  try {
    window.localStorage.setItem(consentStorageKey, JSON.stringify({
      status,
      updatedAt: Date.now(),
    } satisfies StoredConsent))
  } catch {
    // The choice still applies for this page if browser storage is unavailable.
  }

  updateGoogleConsent(status)

  if (status === 'granted') {
    loadAnalytics()
  } else {
    removeAnalyticsCookies()
  }
}

export const initialiseAnalyticsConsent = () => {
  ensureGtag()
  window.gtag?.('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  })

  // Remove the old first-party Cookiebot preference during migration.
  document.cookie = 'CookieConsent=; Max-Age=0; path=/; SameSite=Lax'

  if (getAnalyticsConsent() === 'granted') {
    scheduleAnalytics()
  }
}
