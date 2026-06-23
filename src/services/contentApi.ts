export type ContentCard = {
  id: string
  title: string
  intro: string
  url: string
  image?: string
  eyebrow?: string
}

type StatamicEntry = {
  id?: string
  slug?: string
  title?: string
  url?: string
  permalink?: string
  excerpt?: string
  intro?: string
  summary?: string
  date?: string
  hero_image?: string | { url?: string; permalink?: string }
  image?: string | { url?: string; permalink?: string }
}

const apiBase = (import.meta.env.VITE_CONTENT_API_BASE_URL as string | undefined) ?? 'https://api.martingreenwood.com'

const endpoints = {
  projects: '/api/collections/projects/entries',
  insights: '/api/collections/insights/entries',
}

const toAbsoluteUrl = (value?: string) => {
  if (!value) return undefined
  if (value.startsWith('http')) return value
  return `${apiBase}${value.startsWith('/') ? value : `/${value}`}`
}

const imageUrl = (entry: StatamicEntry) => {
  const image = entry.hero_image ?? entry.image
  if (typeof image === 'string') return toAbsoluteUrl(image)
  return toAbsoluteUrl(image?.url ?? image?.permalink)
}

const formatDate = (value?: string) => {
  if (!value) return undefined

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

const normaliseEntries = (payload: unknown, collection: 'projects' | 'insights'): ContentCard[] => {
  const data = Array.isArray(payload)
    ? payload
    : Array.isArray((payload as { data?: unknown[] })?.data)
      ? (payload as { data: unknown[] }).data
      : []

  return data.map((item, index) => {
    const entry = item as StatamicEntry
    const slug = entry.slug ?? entry.id ?? `${collection}-${index}`

    return {
      id: entry.id ?? slug,
      title: entry.title ?? 'Untitled',
      intro: entry.excerpt ?? entry.intro ?? entry.summary ?? (
        collection === 'projects'
          ? 'Selected project from the MG archive.'
          : 'A practical note from the MG journal.'
      ),
      url: entry.url ?? entry.permalink ?? `/${collection}/${slug}`,
      image: imageUrl(entry),
      eyebrow: collection === 'projects' ? 'Project' : formatDate(entry.date),
    }
  })
}

export const fetchContentCards = async (collection: 'projects' | 'insights', limit = 3): Promise<ContentCard[]> => {
  const response = await fetch(`${apiBase}${endpoints[collection]}?limit=${limit}`)

  if (!response.ok) {
    throw new Error(`Unable to load ${collection}`)
  }

  const payload = await response.json()
  return normaliseEntries(payload, collection).slice(0, limit)
}
