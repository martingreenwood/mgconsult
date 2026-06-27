export type ContentCard = {
  id: string
  title: string
  intro: string
  url: string
  image?: string
  eyebrow?: string
  projectTypes?: string[]
}

export type ProjectDetail = ContentCard & {
  content?: string
  date?: string
  websiteUrl?: string
}

export type InsightDetail = ContentCard & {
  content?: string
  date?: string
}

type StatamicContentValue =
  | string
  | null
  | undefined
  | {
      html?: string | null
      raw?: StatamicContentValue
      text?: string | null
      value?: StatamicContentValue
    }
  | StatamicContentValue[]

type StatamicEntry = {
  id?: string
  slug?: string
  title?: string
  url?: string
  permalink?: string
  excerpt?: string
  intro?: string
  summary?: string
  body?: StatamicContentValue
  content?: StatamicContentValue
  markdown?: StatamicContentValue
  project_content?: StatamicContentValue
  date?: string
  updated_at?: string
  website_url?: string | null
  feature_image?: StatamicAsset
  feature_iamge?: StatamicAsset
  featured_image?: StatamicAsset
  featureImage?: StatamicAsset
  hero_image?: StatamicAsset
  image?: StatamicAsset
  project_type?: StatamicTaxonomyTerm | StatamicTaxonomyTerm[]
}

type StatamicTaxonomyTerm =
  | string
  | {
      title?: string
      label?: string
      slug?: string
      handle?: string
      value?: string
      data?: StatamicTaxonomyTerm
    }

type StatamicAsset =
  | string
  | string[]
  | {
      url?: string
      permalink?: string
      path?: string
      src?: string
      data?: StatamicAsset
    }
  | Array<{
      url?: string
      permalink?: string
      path?: string
      src?: string
      data?: StatamicAsset
    }>

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

const assetUrl = (asset?: StatamicAsset): string | undefined => {
  if (!asset) return undefined

  if (typeof asset === 'string') return toAbsoluteUrl(asset)

  if (Array.isArray(asset)) {
    const firstAsset = asset[0]
    return typeof firstAsset === 'string'
      ? toAbsoluteUrl(firstAsset)
      : assetUrl(firstAsset)
  }

  return toAbsoluteUrl(asset.url ?? asset.permalink ?? asset.path ?? asset.src) ?? assetUrl(asset.data)
}

const versionedAssetUrl = (url: string | undefined, updatedAt?: string) => {
  if (!url || !updatedAt) return url

  const version = Date.parse(updatedAt)
  if (Number.isNaN(version)) return url

  return `${url}${url.includes('?') ? '&' : '?'}v=${version}`
}

const imageUrl = (entry: StatamicEntry) => {
  const url = (
    assetUrl(entry.feature_image)
    ?? assetUrl(entry.feature_iamge)
    ?? assetUrl(entry.featured_image)
    ?? assetUrl(entry.featureImage)
    ?? assetUrl(entry.hero_image)
    ?? assetUrl(entry.image)
  )

  return versionedAssetUrl(url, entry.updated_at)
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

const timestamp = (value?: string) => {
  if (!value) return 0

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? 0 : date.getTime()
}

const formatTaxonomyLabel = (value?: string) => {
  if (!value) return undefined

  return value
    .replace(/^project_type::/, '')
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

const taxonomyLabel = (term?: StatamicTaxonomyTerm): string | undefined => {
  if (!term) return undefined

  if (typeof term === 'string') return formatTaxonomyLabel(term)

  return (
    term.title
    ?? term.label
    ?? formatTaxonomyLabel(term.value ?? term.slug ?? term.handle)
    ?? taxonomyLabel(term.data)
  )
}

const taxonomyLabels = (terms?: StatamicTaxonomyTerm | StatamicTaxonomyTerm[]) => {
  const list = Array.isArray(terms) ? terms : terms ? [terms] : []

  return Array.from(
    new Set(
      list
        .map((term) => taxonomyLabel(term))
        .filter((label): label is string => Boolean(label)),
    ),
  )
}

const normaliseUrl = (value?: string | null) => {
  if (!value) return undefined
  if (value.startsWith('http')) return value
  return `https://${value}`
}

const contentValue = (value?: StatamicContentValue): string | undefined => {
  if (!value) return undefined

  if (typeof value === 'string') return value

  if (Array.isArray(value)) {
    return value
      .map((item) => contentValue(item))
      .filter((item): item is string => Boolean(item))
      .join('\n\n') || undefined
  }

  return (
    value.html
    ?? contentValue(value.value)
    ?? contentValue(value.raw)
    ?? value.text
    ?? undefined
  )
}

const normaliseEntry = (
  entry: StatamicEntry,
  collection: 'projects' | 'insights',
  index = 0,
): ContentCard => {
  const slug = entry.slug ?? entry.id ?? `${collection}-${index}`
  const projectTypes = collection === 'projects' ? taxonomyLabels(entry.project_type) : []

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
    eyebrow: collection === 'projects' ? (projectTypes[0] ?? 'Project') : formatDate(entry.date),
    projectTypes,
  }
}

const normaliseProjectDetail = (entry: StatamicEntry, index = 0): ProjectDetail => {
  return {
    ...normaliseEntry(entry, 'projects', index),
    content: (
      contentValue(entry.content)
      ?? contentValue(entry.markdown)
      ?? contentValue(entry.body)
      ?? contentValue(entry.project_content)
    ),
    date: formatDate(entry.date ?? entry.updated_at),
    websiteUrl: normaliseUrl(entry.website_url),
  }
}

const normaliseInsightDetail = (entry: StatamicEntry, index = 0): InsightDetail => {
  return {
    ...normaliseEntry(entry, 'insights', index),
    content: (
      contentValue(entry.content)
      ?? contentValue(entry.markdown)
      ?? contentValue(entry.body)
    ),
    date: formatDate(entry.date ?? entry.updated_at),
  }
}

const normaliseEntries = (payload: unknown, collection: 'projects' | 'insights'): ContentCard[] => {
  const data = Array.isArray(payload)
    ? payload
    : Array.isArray((payload as { data?: unknown[] })?.data)
      ? (payload as { data: unknown[] }).data
      : []

  const entries = [...data].sort((first, second) => {
    if (collection !== 'projects') return 0

    const firstEntry = first as StatamicEntry
    const secondEntry = second as StatamicEntry

    return (
      timestamp(secondEntry.date ?? secondEntry.updated_at)
      - timestamp(firstEntry.date ?? firstEntry.updated_at)
    )
  })

  return entries.map((item, index) => normaliseEntry(item as StatamicEntry, collection, index))
}

export const fetchContentCards = async (collection: 'projects' | 'insights', limit = 3): Promise<ContentCard[]> => {
  const response = await fetch(`${apiBase}${endpoints[collection]}?limit=${limit}`)

  if (!response.ok) {
    throw new Error(`Unable to load ${collection}`)
  }

  const payload = await response.json()
  return normaliseEntries(payload, collection).slice(0, limit)
}

export const fetchProject = async (slug: string): Promise<ProjectDetail | undefined> => {
  const response = await fetch(`${apiBase}${endpoints.projects}?limit=100`)

  if (!response.ok) {
    throw new Error('Unable to load project')
  }

  const payload = await response.json()
  const data = Array.isArray(payload)
    ? payload
    : Array.isArray((payload as { data?: unknown[] })?.data)
      ? (payload as { data: unknown[] }).data
      : []

  const entryIndex = data.findIndex((item) => {
    const entry = item as StatamicEntry
    return entry.slug === slug || entry.id === slug || entry.url?.endsWith(`/projects/${slug}`)
  })

  if (entryIndex === -1) return undefined

  return normaliseProjectDetail(data[entryIndex] as StatamicEntry, entryIndex)
}

export const fetchInsight = async (slug: string): Promise<InsightDetail | undefined> => {
  const response = await fetch(`${apiBase}${endpoints.insights}?limit=100`)

  if (!response.ok) {
    throw new Error('Unable to load insight')
  }

  const payload = await response.json()
  const data = Array.isArray(payload)
    ? payload
    : Array.isArray((payload as { data?: unknown[] })?.data)
      ? (payload as { data: unknown[] }).data
      : []

  const entryIndex = data.findIndex((item) => {
    const entry = item as StatamicEntry
    return entry.slug === slug || entry.id === slug || entry.url?.endsWith(`/insights/${slug}`)
  })

  if (entryIndex === -1) return undefined

  return normaliseInsightDetail(data[entryIndex] as StatamicEntry, entryIndex)
}
