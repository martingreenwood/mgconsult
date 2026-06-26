import type { Directive } from 'vue'

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

let observer: IntersectionObserver | null = null

const afterPaint = (callback: () => void) => {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(callback)
  })
}

const revealImage = (image: HTMLImageElement) => {
  window.requestAnimationFrame(() => {
    image.classList.add('is-visible')
  })
}

const markLoaded = (image: HTMLImageElement) => {
  afterPaint(() => {
    image.classList.add('is-loaded')
  })
}

const markLoadedAfterDecode = (image: HTMLImageElement) => {
  if (!image.decode) {
    markLoaded(image)
    return
  }

  image.decode()
    .catch(() => undefined)
    .finally(() => markLoaded(image))
}

const getObserver = () => {
  if (observer) return observer

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        revealImage(entry.target as HTMLImageElement)
        observer?.unobserve(entry.target)
      })
    },
    {
      rootMargin: '160px 0px',
      threshold: 0.12,
    },
  )

  return observer
}

export const imageReveal: Directive<HTMLImageElement> = {
  beforeMount(image) {
    image.classList.add('image-reveal')

    if (!image.hasAttribute('loading')) {
      image.loading = 'lazy'
    }

    if (!image.hasAttribute('decoding')) {
      image.decoding = 'async'
    }
  },

  mounted(image) {
    if (image.complete) {
      markLoadedAfterDecode(image)
    } else {
      image.addEventListener('load', () => markLoadedAfterDecode(image), { once: true })
    }

    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      revealImage(image)
      markLoaded(image)
      return
    }

    getObserver().observe(image)
  },
  unmounted(image) {
    observer?.unobserve(image)
  },
}
