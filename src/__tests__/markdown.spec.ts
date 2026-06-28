import { describe, expect, it } from 'vitest'
import { renderMarkdown } from '@/utils/markdown'

describe('renderMarkdown image dimensions', () => {
  it('adds dimensions to Markdown images', () => {
    const html = renderMarkdown('![Dashboard](/assets/dashboard.png)')

    expect(html).toContain('width="1600"')
    expect(html).toContain('height="900"')
  })

  it('adds missing dimensions to CMS HTML images', () => {
    const html = renderMarkdown('<p><img src="/assets/dashboard.png" alt="Dashboard"></p>')

    expect(html).toContain('<img width="1600" height="900"')
  })

  it('preserves dimensions supplied by the CMS', () => {
    const html = renderMarkdown('<img src="/assets/dashboard.png" width="800" height="450">')

    expect(html).toContain('width="800"')
    expect(html).toContain('height="450"')
    expect(html).not.toContain('width="1600"')
  })
})
