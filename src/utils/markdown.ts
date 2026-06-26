const escapeHtml = (value: string) => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

const contentAssetBase = (
  import.meta.env.VITE_CONTENT_API_BASE_URL as string | undefined
) ?? 'https://api.martingreenwood.com'

const absoluteAssetUrl = (value: string) => {
  const url = value.trim()

  if (!url || url.startsWith('http') || url.startsWith('data:')) return url
  if (url.startsWith('//')) return `https:${url}`
  if (url.startsWith('/')) return `${contentAssetBase}${url}`
  if (url.startsWith('assets/')) return `${contentAssetBase}/${url}`

  return url
}

const htmlWithAbsoluteAssets = (value: string) => {
  return value.replace(
    /\ssrc=(["'])(\/assets\/[^"']+|assets\/[^"']+)\1/g,
    (_match, quote: string, url: string) => ` src=${quote}${absoluteAssetUrl(url)}${quote}`,
  )
}

const inlineMarkdown = (value: string) => {
  return escapeHtml(value)
    .replace(
      /!\[([^\]]*)\]\((https?:\/\/[^)\s]+|\/[^)\s]+|assets\/[^)\s]+|[^)\s]+)\)/g,
      (_match, alt: string, url: string) => (
        `<img src="${escapeHtml(absoluteAssetUrl(url))}" alt="${alt}" loading="lazy" decoding="async">`
      ),
    )
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/__([^_]+)__/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/_([^_]+)_/g, '<em>$1</em>')
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]+)\)/g,
      '<a href="$2" target="_blank" rel="noreferrer">$1</a>',
    )
}

const listHtml = (items: string[], ordered: boolean) => {
  const tag = ordered ? 'ol' : 'ul'
  const html = items.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')

  return `<${tag}>${html}</${tag}>`
}

const looksLikeHtml = (value: string) => /<\/?[a-z][\s\S]*>/i.test(value)

export const renderMarkdown = (value?: string) => {
  if (!value) return ''

  const trimmed = value.trim()
  if (!trimmed) return ''
  if (looksLikeHtml(trimmed)) return htmlWithAbsoluteAssets(trimmed)

  const lines = trimmed.replace(/\r\n/g, '\n').split('\n')
  const blocks: string[] = []
  let paragraph: string[] = []
  let unorderedItems: string[] = []
  let orderedItems: string[] = []

  const flushParagraph = () => {
    if (paragraph.length === 0) return
    blocks.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`)
    paragraph = []
  }

  const flushLists = () => {
    if (unorderedItems.length > 0) {
      blocks.push(listHtml(unorderedItems, false))
      unorderedItems = []
    }

    if (orderedItems.length > 0) {
      blocks.push(listHtml(orderedItems, true))
      orderedItems = []
    }
  }

  for (const line of lines) {
    const currentLine = line.trim()

    if (!currentLine) {
      flushParagraph()
      flushLists()
      continue
    }

    const heading = currentLine.match(/^(#{2,4})\s+(.+)$/)
    if (heading) {
      flushParagraph()
      flushLists()
      blocks.push(`<h${heading[1].length}>${inlineMarkdown(heading[2])}</h${heading[1].length}>`)
      continue
    }

    const unordered = currentLine.match(/^[-*]\s+(.+)$/)
    if (unordered) {
      flushParagraph()
      orderedItems = []
      unorderedItems.push(unordered[1])
      continue
    }

    const ordered = currentLine.match(/^\d+\.\s+(.+)$/)
    if (ordered) {
      flushParagraph()
      unorderedItems = []
      orderedItems.push(ordered[1])
      continue
    }

    const quote = currentLine.match(/^>\s+(.+)$/)
    if (quote) {
      flushParagraph()
      flushLists()
      blocks.push(`<blockquote>${inlineMarkdown(quote[1])}</blockquote>`)
      continue
    }

    flushLists()
    paragraph.push(currentLine)
  }

  flushParagraph()
  flushLists()

  return blocks.join('\n')
}
