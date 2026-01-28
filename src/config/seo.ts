/**
 * Centralised SEO defaults for reuse across route meta.
 * Values align with index.html for consistency.
 */
export const baseUrl = 'https://martingreenwood.com'

export const defaultSeo = {
  title: 'Martin Greenwood | Consultant Developer – Laravel, Vue, Integration Specialist',
  description:
    'I help businesses build, fix, and scale digital systems. Laravel/Vue developer with 10+ years experience in integrations, signage, dashboards & booking engines.',
  ogImage: `${baseUrl}/og-image.jpg`,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogLocale: 'en_GB',
  siteName: 'Martin Greenwood',
  twitterCard: 'summary_large_image' as const,
}
