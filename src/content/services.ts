import consultancyImage from '@/assets/img/digital.webp'
import integrationsImage from '@/assets/img/api-integration-card.webp'
import websitesImage from '@/assets/img/web-app-development.webp'

export type Service = {
  slug: string
  title: string
  shortTitle: string
  summary: string
  image: string
  imageWidth: number
  imageHeight: number
  intro: string
  tags: string[]
  outcomes: string[]
  work: string[]
  proof: string
}

export const services: Service[] = [
  {
    slug: 'digital-consultancy',
    title: 'Digital consultancy',
    shortTitle: 'Consultancy',
    image: consultancyImage,
    imageWidth: 740,
    imageHeight: 740,
    summary:
      'Shape practical technical direction, prioritise the right work, and turn vague digital pressure into a plan the business can actually use.',
    intro:
      'Useful when the business knows something needs to change, but the route is tangled across websites, content, tooling, data and internal process. I help define the right technical direction, then stay close enough to the work that the advice survives delivery.',
    tags: ['Discovery', 'Roadmaps', 'Technical direction'],
    outcomes: [
      'Clearer priorities for digital investment',
      'Better decisions around platforms, rebuilds and integrations',
      'A practical roadmap that separates urgent fixes from strategic work',
    ],
    work: [
      'Technical discovery and stakeholder workshops',
      'Website, CMS and systems audits',
      'Platform selection and architecture planning',
      'Delivery planning for internal teams or agency partners',
    ],
    proof:
      'The output is plain-English direction backed by technical judgement, not a slide deck that avoids the hard parts.',
  },
  {
    slug: 'websites-and-cms',
    title: 'Websites and CMS',
    shortTitle: 'Websites & CMS',
    image: websitesImage,
    imageWidth: 820,
    imageHeight: 460,
    summary:
      'Design and build performant marketing sites, headless content systems and Laravel-backed digital products with clear editorial control.',
    intro:
      'For businesses that need a sharper public website and a calmer content setup behind it. The work can include the front-end experience, Statamic or headless CMS architecture, Laravel foundations, integrations and the editorial model that keeps the site useful after launch.',
    tags: ['Vue', 'Laravel', 'Statamic'],
    outcomes: [
      'A website that explains the business clearly and feels easier to trust',
      'CMS structures that editors can use without developer hand-holding',
      'A maintainable front-end that can support future campaign and content work',
    ],
    work: [
      'Marketing website builds and redesigns',
      'Statamic, headless CMS and Laravel implementation',
      'Content modelling, page builders and editorial workflows',
      'Performance, accessibility and deployment foundations',
    ],
    proof:
      'The goal is not just a nicer homepage. It is a web platform that makes the business easier to understand and easier to operate.',
  },
  {
    slug: 'systems-and-integrations',
    title: 'Systems and integrations',
    shortTitle: 'Systems',
    image: integrationsImage,
    imageWidth: 1200,
    imageHeight: 840,
    summary:
      'Connect booking engines, CRMs, payment flows, dashboards and internal tools so the operational work feels less handmade.',
    intro:
      'A fit for teams with too many disconnected tools, repeated manual steps, brittle data flows or customer journeys that depend on invisible operational work. I design and build the glue so the system feels intentional rather than improvised.',
    tags: ['APIs', 'Automation', 'Reporting'],
    outcomes: [
      'Cleaner handoffs between the tools the business already relies on',
      'Less manual re-keying, checking and workaround-heavy admin',
      'Better visibility into the workflows that affect revenue and service',
    ],
    work: [
      'API integrations and middleware',
      'Booking, availability, payment and entitlement flows',
      'Dashboards, reporting and operational alerts',
      'Internal tools around existing platforms',
    ],
    proof:
      'Good integration work should feel quiet: reliable, observable and easy to recover when something outside your control changes.',
  },
]

export const findServiceBySlug = (slug: string | string[] | undefined) => {
  const normalisedSlug = Array.isArray(slug) ? slug[0] : slug
  return services.find((service) => service.slug === normalisedSlug)
}
