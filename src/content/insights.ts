import type { ContentCard } from '@/services/contentApi'
import integrationImage from '@/assets/img/api-integration-card.webp'
import bookingImage from '@/assets/img/booking.webp'
import dashboardImage from '@/assets/img/data-dashboards.webp'

export const fallbackInsights: ContentCard[] = [
  {
    id: 'headless-content',
    title: 'When a headless CMS is worth the extra moving parts',
    intro: 'A practical note on content architecture, editorial control and avoiding unnecessary complexity.',
    url: '/insights/headless-content',
    image: dashboardImage,
    imageWidth: 1305,
    imageHeight: 683,
    eyebrow: 'Content systems',
  },
  {
    id: 'booking-flows',
    title: 'The hidden complexity inside simple booking flows',
    intro: 'Availability, entitlement, payment and operational rules need more care than the UI suggests.',
    url: '/insights/booking-flows',
    image: bookingImage,
    imageWidth: 1574,
    imageHeight: 884,
    eyebrow: 'Booking logic',
  },
  {
    id: 'api-glue',
    title: 'Good API glue is boring in exactly the right way',
    intro: 'Why integration work should prioritise observability, recovery and clear ownership.',
    url: '/insights/api-glue',
    image: integrationImage,
    imageWidth: 1200,
    imageHeight: 840,
    eyebrow: 'Integrations',
  },
]
