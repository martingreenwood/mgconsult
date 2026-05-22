/**
 * Centralised SEO defaults for reuse across route meta.
 * Values align with index.html for consistency.
 */
export const baseUrl = 'https://martingreenwood.com'

export const defaultSeo = {
  title: 'Martin Greenwood | Consultant Developer - Laravel, Vue & Systems Integration',
  description:
    'I help businesses build, fix, and scale custom digital systems. Laravel and Vue consultant for integrations, dashboards, booking workflows, internal tools, and technical rescue.',
  ogImage: `${baseUrl}/og-image.jpg`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogLocale: 'en_GB',
  siteName: 'Martin Greenwood',
  twitterCard: 'summary_large_image' as const,
}
