/**
 * Centralised SEO defaults for reuse across route meta.
 * Values align with index.html for consistency.
 */
export const baseUrl = 'https://martingreenwood.com'

export const defaultSeo = {
  title: 'Martin Greenwood | Senior Technical Partner for PHP, CMS & Systems Integration',
  description:
    'Independent senior technical partner for business-critical digital systems. PHP, CMS, and integration consultancy for rescue work, dashboards, booking flows, internal tools, and ongoing retainer support.',
  ogImage: `${baseUrl}/og-image.jpg`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogLocale: 'en_GB',
  siteName: 'Martin Greenwood',
  twitterCard: 'summary_large_image' as const,
}
