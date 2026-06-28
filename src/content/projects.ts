import type { ContentCard } from '@/services/contentApi'
import hoarCrossImage from '@/assets/projects/hoar-cross-hall-card.webp'
import theElmsImage from '@/assets/projects/the-elms-card.webp'
import vineyardImage from '@/assets/projects/the-vineyard-card.webp'

export const fallbackProjects: ContentCard[] = [
  {
    id: 'hoar-cross-hall',
    title: 'Hoar Cross Hall',
    intro: 'Operational improvements around hospitality workflows, booking journeys and internal systems.',
    url: '/projects/hoar-cross-hall',
    image: hoarCrossImage,
    imageWidth: 1200,
    imageHeight: 840,
    eyebrow: 'Hospitality systems',
  },
  {
    id: 'the-elms',
    title: 'The Elms',
    intro: 'Useful digital infrastructure for experience-led teams with live customer journeys.',
    url: '/projects/the-elms',
    image: theElmsImage,
    imageWidth: 1200,
    imageHeight: 840,
    eyebrow: 'Experience-led hotel',
  },
  {
    id: 'the-vineyard',
    title: 'The Vineyard',
    intro: 'Technical partnership across web, operational tooling and connected commercial workflows.',
    url: '/projects/the-vineyard',
    image: vineyardImage,
    imageWidth: 1200,
    imageHeight: 840,
    eyebrow: 'Luxury hospitality',
  },
]
