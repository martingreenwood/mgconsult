const TALLY_FORM_ID = 'Bz27eR'
const TALLY_SCRIPT_URL = 'https://tally.so/widgets/embed.js'

type TallyOptions = {
  autoClose?: number
  hiddenFields?: Record<string, string>
}

type TallyApi = {
  openPopup?: (formId: string, options?: TallyOptions) => void
  loadEmbeds?: () => void
}

declare global {
  interface Window {
    Tally?: TallyApi
  }
}

let tallyScriptPromise: Promise<void> | null = null

const loadTally = () => {
  if (window.Tally?.openPopup) {
    return Promise.resolve()
  }

  if (tallyScriptPromise) {
    return tallyScriptPromise
  }

  tallyScriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${TALLY_SCRIPT_URL}"]`)

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true })
      existingScript.addEventListener('error', () => reject(new Error('Unable to load Tally')), { once: true })
      return
    }

    const script = document.createElement('script')
    script.src = TALLY_SCRIPT_URL
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Unable to load Tally'))
    document.head.appendChild(script)
  })

  return tallyScriptPromise
}

export const openTallyMessage = async (source: string) => {
  try {
    await loadTally()

    if (window.Tally?.openPopup) {
      window.Tally.openPopup(TALLY_FORM_ID, {
        autoClose: 0,
        hiddenFields: { source },
      })
      return
    }
  } catch (error) {
    console.error('Tally failed to load:', error)
  }

  window.location.href = `https://tally.so/r/${TALLY_FORM_ID}`
}
