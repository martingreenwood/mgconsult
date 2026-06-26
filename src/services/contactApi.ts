export type ContactFormPayload = {
  name: string
  email: string
  company?: string
  projectType: string
  message: string
  website?: string
}

type ContactApiError = {
  message?: string
  errors?: Record<string, string[]>
}

const apiBase = (import.meta.env.VITE_CONTENT_API_BASE_URL as string | undefined) ?? 'https://api.martingreenwood.com'

const contactEndpoint = (
  import.meta.env.VITE_CONTACT_API_URL as string | undefined
) ?? `${apiBase}/api/contact`

const csrfCookieEndpoint = (
  import.meta.env.VITE_CSRF_COOKIE_URL as string | undefined
) ?? `${apiBase}/sanctum/csrf-cookie`

const getCookie = (name: string) => {
  if (typeof document === 'undefined') {
    return undefined
  }

  return document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.split('=')
    .slice(1)
    .join('=')
}

const getXsrfToken = () => {
  const token = getCookie('XSRF-TOKEN')

  return token ? decodeURIComponent(token) : undefined
}

const refreshCsrfCookie = async () => {
  try {
    await fetch(csrfCookieEndpoint, {
      credentials: 'include',
    })
  } catch {
    // Let the contact request surface the useful API error if the cookie endpoint is unavailable.
  }
}

const postContactForm = (payload: ContactFormPayload) => {
  const xsrfToken = getXsrfToken()
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  if (xsrfToken) {
    headers['X-XSRF-TOKEN'] = xsrfToken
  }

  return fetch(contactEndpoint, {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...headers,
    },
    body: JSON.stringify(payload),
  })
}

export const submitContactForm = async (payload: ContactFormPayload) => {
  await refreshCsrfCookie()

  let response = await postContactForm(payload)

  if (response.status === 419) {
    await refreshCsrfCookie()
    response = await postContactForm(payload)
  }

  if (response.ok) {
    return
  }

  let error: ContactApiError | undefined

  try {
    error = await response.json()
  } catch {
    error = undefined
  }

  const validationMessage = error?.errors
    ? Object.values(error.errors).flat()[0]
    : undefined

  throw new Error(validationMessage ?? error?.message ?? 'Unable to send message')
}
