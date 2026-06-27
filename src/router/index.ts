import { createRouter, createWebHistory } from 'vue-router'
import ButtonShowcase from '@/components/ButtonShowcase.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import HomeView from '@/views/HomeView.vue'
import InsightView from '@/views/InsightView.vue'
import InsightsView from '@/views/InsightsView.vue'
import NotFound from '@/views/NotFound.vue'
import ProjectView from '@/views/ProjectView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ServiceView from '@/views/ServiceView.vue'
import { baseUrl, defaultSeo } from '@/config/seo'
import { findServiceBySlug, services } from '@/content/services'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        seo: {
          title: defaultSeo.title,
          description: defaultSeo.description,
          ogTitle: defaultSeo.title,
          ogDescription: defaultSeo.description,
          ogImage: defaultSeo.ogImage,
          ogImageWidth: defaultSeo.ogImageWidth,
          ogImageHeight: defaultSeo.ogImageHeight,
          ogUrl: `${baseUrl}/`,
          ogType: 'website',
          ogLocale: defaultSeo.ogLocale,
          ogSiteName: defaultSeo.siteName,
          twitterCard: defaultSeo.twitterCard,
          twitterTitle: defaultSeo.title,
          twitterDescription: defaultSeo.description,
          twitterImage: defaultSeo.ogImage,
          canonical: `${baseUrl}/`,
        },
      },
    },
    {
      path: '/service',
      redirect: `/service/${services[0].slug}`,
    },
    ...services.map((service) => ({
      path: `/service/${service.slug}`,
      name: `service-${service.slug}`,
      component: ServiceView,
      meta: {
        serviceSlug: service.slug,
        seo: {
          title: `${service.title} | Martin Greenwood`,
          description: service.summary,
          ogTitle: `${service.title} | Martin Greenwood`,
          ogDescription: service.summary,
          ogImage: defaultSeo.ogImage,
          ogImageWidth: defaultSeo.ogImageWidth,
          ogImageHeight: defaultSeo.ogImageHeight,
          ogUrl: `${baseUrl}/service/${service.slug}`,
          ogType: 'website',
          ogLocale: defaultSeo.ogLocale,
          ogSiteName: defaultSeo.siteName,
          twitterCard: defaultSeo.twitterCard,
          twitterTitle: `${service.title} | Martin Greenwood`,
          twitterDescription: service.summary,
          twitterImage: defaultSeo.ogImage,
          canonical: `${baseUrl}/service/${service.slug}`,
        },
      },
    })),
    {
      path: '/service/:slug',
      name: 'service-not-found',
      redirect: (to) => {
        const service = findServiceBySlug(to.params.slug)
        return service ? `/service/${service.slug}` : { name: 'not-found' }
      },
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsView,
      meta: {
        seo: {
          title: 'Projects | Martin Greenwood',
          description:
            'Selected website, CMS, integration and digital operations projects from Martin Greenwood.',
          ogTitle: 'Projects | Martin Greenwood',
          ogDescription:
            'Selected website, CMS, integration and digital operations projects from Martin Greenwood.',
          ogImage: defaultSeo.ogImage,
          ogImageWidth: defaultSeo.ogImageWidth,
          ogImageHeight: defaultSeo.ogImageHeight,
          ogUrl: `${baseUrl}/projects`,
          ogType: 'website',
          ogLocale: defaultSeo.ogLocale,
          ogSiteName: defaultSeo.siteName,
          twitterCard: defaultSeo.twitterCard,
          twitterTitle: 'Projects | Martin Greenwood',
          twitterDescription:
            'Selected website, CMS, integration and digital operations projects from Martin Greenwood.',
          twitterImage: defaultSeo.ogImage,
          canonical: `${baseUrl}/projects`,
        },
      },
    },
    {
      path: '/projects/:slug',
      name: 'project-detail',
      component: ProjectView,
      meta: {
        seo: {
          title: 'Project | Martin Greenwood',
          description:
            'Selected website, CMS, integration and digital operations project from Martin Greenwood.',
          ogTitle: 'Project | Martin Greenwood',
          ogDescription:
            'Selected website, CMS, integration and digital operations project from Martin Greenwood.',
          ogImage: defaultSeo.ogImage,
          ogImageWidth: defaultSeo.ogImageWidth,
          ogImageHeight: defaultSeo.ogImageHeight,
          ogType: 'article',
          ogLocale: defaultSeo.ogLocale,
          ogSiteName: defaultSeo.siteName,
          twitterCard: defaultSeo.twitterCard,
          twitterTitle: 'Project | Martin Greenwood',
          twitterDescription:
            'Selected website, CMS, integration and digital operations project from Martin Greenwood.',
          twitterImage: defaultSeo.ogImage,
        },
      },
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        seo: {
          title: 'About | Martin Greenwood',
          description:
            'About Martin Greenwood, independent digital consultant for websites, CMS platforms, integrations and operational systems.',
          ogTitle: 'About | Martin Greenwood',
          ogDescription:
            'About Martin Greenwood, independent digital consultant for websites, CMS platforms, integrations and operational systems.',
          ogImage: defaultSeo.ogImage,
          ogImageWidth: defaultSeo.ogImageWidth,
          ogImageHeight: defaultSeo.ogImageHeight,
          ogUrl: `${baseUrl}/about`,
          ogType: 'website',
          ogLocale: defaultSeo.ogLocale,
          ogSiteName: defaultSeo.siteName,
          twitterCard: defaultSeo.twitterCard,
          twitterTitle: 'About | Martin Greenwood',
          twitterDescription:
            'About Martin Greenwood, independent digital consultant for websites, CMS platforms, integrations and operational systems.',
          twitterImage: defaultSeo.ogImage,
          canonical: `${baseUrl}/about`,
        },
      },
    },
    {
      path: '/insights',
      name: 'insights',
      component: InsightsView,
      meta: {
        seo: {
          title: 'Insights | Martin Greenwood',
          description:
            'Practical notes on better websites, calmer systems, CMS decisions and digital operations from Martin Greenwood.',
          ogTitle: 'Insights | Martin Greenwood',
          ogDescription:
            'Practical notes on better websites, calmer systems, CMS decisions and digital operations from Martin Greenwood.',
          ogImage: defaultSeo.ogImage,
          ogImageWidth: defaultSeo.ogImageWidth,
          ogImageHeight: defaultSeo.ogImageHeight,
          ogUrl: `${baseUrl}/insights`,
          ogType: 'website',
          ogLocale: defaultSeo.ogLocale,
          ogSiteName: defaultSeo.siteName,
          twitterCard: defaultSeo.twitterCard,
          twitterTitle: 'Insights | Martin Greenwood',
          twitterDescription:
            'Practical notes on better websites, calmer systems, CMS decisions and digital operations from Martin Greenwood.',
          twitterImage: defaultSeo.ogImage,
          canonical: `${baseUrl}/insights`,
        },
      },
    },
    {
      path: '/insights/:slug',
      name: 'insight-detail',
      component: InsightView,
      meta: {
        seo: {
          title: 'Insight | Martin Greenwood',
          description:
            'A practical note on websites, CMS decisions, integrations and digital operations from Martin Greenwood.',
          ogTitle: 'Insight | Martin Greenwood',
          ogDescription:
            'A practical note on websites, CMS decisions, integrations and digital operations from Martin Greenwood.',
          ogImage: defaultSeo.ogImage,
          ogImageWidth: defaultSeo.ogImageWidth,
          ogImageHeight: defaultSeo.ogImageHeight,
          ogType: 'article',
          ogLocale: defaultSeo.ogLocale,
          ogSiteName: defaultSeo.siteName,
          twitterCard: defaultSeo.twitterCard,
          twitterTitle: 'Insight | Martin Greenwood',
          twitterDescription:
            'A practical note on websites, CMS decisions, integrations and digital operations from Martin Greenwood.',
          twitterImage: defaultSeo.ogImage,
        },
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
      meta: {
        seo: {
          title: 'Contact | Martin Greenwood',
          description:
            'Contact Martin Greenwood about websites, CMS platforms, integrations, booking journeys and technical partnership.',
          ogTitle: 'Contact | Martin Greenwood',
          ogDescription:
            'Contact Martin Greenwood about websites, CMS platforms, integrations, booking journeys and technical partnership.',
          ogImage: defaultSeo.ogImage,
          ogImageWidth: defaultSeo.ogImageWidth,
          ogImageHeight: defaultSeo.ogImageHeight,
          ogUrl: `${baseUrl}/contact`,
          ogType: 'website',
          ogLocale: defaultSeo.ogLocale,
          ogSiteName: defaultSeo.siteName,
          twitterCard: defaultSeo.twitterCard,
          twitterTitle: 'Contact | Martin Greenwood',
          twitterDescription:
            'Contact Martin Greenwood about websites, CMS platforms, integrations, booking journeys and technical partnership.',
          twitterImage: defaultSeo.ogImage,
          canonical: `${baseUrl}/contact`,
        },
      },
    },
    {
      path: '/showcase',
      name: 'showcase',
      component: ButtonShowcase,
      meta: {
        seo: {
          title: 'BaseButton Showcase | Martin Greenwood',
          description: 'UI component showcase for BaseButton variants, sizes, and states.',
          ogTitle: 'BaseButton Showcase | Martin Greenwood',
          ogDescription: 'UI component showcase for BaseButton variants, sizes, and states.',
          ogImage: defaultSeo.ogImage,
          ogImageWidth: defaultSeo.ogImageWidth,
          ogImageHeight: defaultSeo.ogImageHeight,
          ogUrl: `${baseUrl}/showcase`,
          ogType: 'website',
          ogLocale: defaultSeo.ogLocale,
          ogSiteName: defaultSeo.siteName,
          twitterCard: defaultSeo.twitterCard,
          twitterTitle: 'BaseButton Showcase | Martin Greenwood',
          twitterDescription: 'UI component showcase for BaseButton variants, sizes, and states.',
          twitterImage: defaultSeo.ogImage,
          canonical: `${baseUrl}/showcase`,
          robots: 'noindex',
        },
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
      meta: {
        seo: {
          title: '404 - Page Not Found | Martin Greenwood',
          description: 'The page you\'re looking for doesn\'t exist or has been moved.',
          ogTitle: '404 - Page Not Found | Martin Greenwood',
          ogDescription: 'The page you\'re looking for doesn\'t exist or has been moved.',
          ogImage: defaultSeo.ogImage,
          ogUrl: baseUrl,
          ogType: 'website',
          ogLocale: defaultSeo.ogLocale,
          ogSiteName: defaultSeo.siteName,
          twitterCard: defaultSeo.twitterCard,
          twitterTitle: '404 - Page Not Found | Martin Greenwood',
          twitterDescription: 'The page you\'re looking for doesn\'t exist or has been moved.',
          twitterImage: defaultSeo.ogImage,
          robots: 'noindex, nofollow',
        },
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      // Let the new route paint before Vue Router measures the anchor.
      // Otherwise its getBoundingClientRect() calls can synchronously flush
      // the layout invalidated by the route render.
      return new Promise((resolve) => {
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            resolve({
              el: to.hash,
              behavior: 'smooth',
            })
          })
        })
      })
    }
    return { top: 0, behavior: 'smooth' }
  },
})

// Ensure root path always resolves to home, not the catch-all
router.beforeEach((to) => {
  const path = to.path
  const isRoot = path === '/' || path === ''
  if (isRoot && to.name === 'not-found') {
    return { name: 'home', replace: true }
  }
})

export default router
