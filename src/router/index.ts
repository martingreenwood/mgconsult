import { createRouter, createWebHistory } from 'vue-router'
import ButtonShowcase from '@/components/ButtonShowcase.vue'
import HomeView from '@/views/HomeView.vue'
import NotFound from '@/views/NotFound.vue'
import { baseUrl, defaultSeo } from '@/config/seo'

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
      return {
        el: to.hash,
        behavior: 'smooth',
      }
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
