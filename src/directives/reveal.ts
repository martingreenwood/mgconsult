import type { Directive } from 'vue'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

let observer: IntersectionObserver | null = null

const getObserver = () => {
  if (observer) return observer

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        entry.target.classList.add('is-revealed')
        observer?.unobserve(entry.target)
      })
    },
    {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.01,
    },
  )

  return observer
}

export const reveal: Directive<HTMLElement> = {
  mounted(element) {
    element.classList.add('reveal-on-scroll')

    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      element.classList.add('is-revealed')
      return
    }

    getObserver().observe(element)
  },
  unmounted(element) {
    observer?.unobserve(element)
  },
}
