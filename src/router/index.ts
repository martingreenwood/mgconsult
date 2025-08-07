import { createRouter, createWebHistory } from 'vue-router'
import ButtonShowcase from '@/components/ButtonShowcase.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/showcase',
      name: 'showcase',
      component: ButtonShowcase
    }
  ],
})

export default router
