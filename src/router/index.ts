import { createRouter, createWebHistory } from 'vue-router'
import ButtonShowcase from '@/components/ButtonShowcase.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/showcase',
      name: 'showcase',
      component: ButtonShowcase
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFound,
      meta: {
        title: '404 - Page Not Found | Martin Greenwood'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // If saved position (browser back/forward), use it
    if (savedPosition) {
      return savedPosition
    }
    // If navigating to hash (anchor link)
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    // Otherwise scroll to top
    return { top: 0, behavior: 'smooth' }
  },
})

// Update page title on route change
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  } else {
    document.title = 'Martin Greenwood | Consultant Developer – Laravel, Vue, Integration Specialist'
  }
  next()
})

export default router
