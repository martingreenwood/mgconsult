# Performance Optimization Guide

This document outlines the performance optimizations implemented on the site and recommendations for ongoing maintenance.

## Implemented Optimizations

### 1. Resource Loading

#### Font Optimization
- **Custom fonts** preloaded using `<link rel="preload">` for Cocogoose Classic
- **Font fallback stack** added for both heading and body fonts
- `font-display: swap` enabled to prevent FOIT (Flash of Invisible Text)
- Google Fonts loaded with optimal settings

#### Resource Hints
- **Preconnect** to external domains (Google Fonts, Calendly)
- **DNS prefetch** for analytics
- **Preload** critical resources (fonts, hero video)

### 2. Image Optimization

#### Lazy Loading
All below-the-fold images use:
- `loading="lazy"` - Browser-native lazy loading
- `decoding="async"` - Non-blocking image decoding (for raster images)

Images that are lazy-loaded:
- All service cards (6 images)
- All project cards (4 images)
- All client logos (6 images)

#### Image Formats
Current format: WebP
- Excellent compression
- Wide browser support
- Consider AVIF for even better compression (requires fallback)

### 3. Video Optimization

#### Background Video
- `preload="metadata"` - Only loads metadata initially
- `muted` and `playsinline` - Enables autoplay on mobile
- `aria-hidden="true"` - Marked as decorative for accessibility
- Parallax effect using CSS transforms (GPU-accelerated)

### 4. Code Performance

#### JavaScript
- Vue 3 with Composition API for optimal reactivity
- Minimal dependencies
- Request Animation Frame used for scroll events

#### CSS
- Tailwind CSS with purging for minimal bundle size
- CSS animations use GPU-accelerated properties (transform, opacity)
- Smooth scroll behavior without layout thrashing

## Recommendations

### Image Optimization Workflow

#### 1. Before Adding Images

**Compress all images before adding them to the project:**

```bash
# For PNG/JPG to WebP conversion:
# Install imagemin-cli
npm install -g imagemin-cli imagemin-webp

# Convert images
imagemin src/assets/img/*.{png,jpg,jpeg} --plugin=webp --out-dir=src/assets/img/
```

**Target sizes:**
- Hero images: < 200KB
- Service/Project cards: < 100KB
- Logos/Icons: < 50KB
- Thumbnails: < 30KB

#### 2. Image Dimensions

Use appropriate dimensions:
- Service cards: 800x600px (4:3 ratio)
- Project images: 1200x800px (3:2 ratio)
- Client logos: 400x200px maximum
- OG image: 1200x630px

#### 3. Responsive Images

Consider implementing `<picture>` element for art direction:

```vue
<picture>
  <source media="(max-width: 768px)" srcset="image-mobile.webp">
  <source media="(min-width: 769px)" srcset="image-desktop.webp">
  <img src="image-fallback.jpg" alt="Description">
</picture>
```

### Video Optimization

#### Current Video
- Format: MP4 (H.264)
- Location: `/src/assets/video/video.mp4`

**Optimization checklist:**
- [ ] Compress video to < 5MB if possible
- [ ] Add poster image for faster perceived load
- [ ] Consider multiple formats (WebM, MP4) for better compression
- [ ] Limit duration to 10-20 seconds for loops

**Example with poster:**
```vue
<video
  poster="/path/to/poster.jpg"
  preload="metadata"
  ...
>
```

### Bundle Size Monitoring

#### Current Dependencies
Review periodically:
```bash
npm run build
```

Check bundle size in `dist/` folder.

**Size budgets:**
- JavaScript (vendor): < 150KB gzipped
- JavaScript (app): < 100KB gzipped
- CSS: < 50KB gzipped
- Total initial load: < 300KB gzipped

### Performance Testing

#### Tools to Use

1. **Lighthouse** (Chrome DevTools)
   - Target scores: 90+ for all metrics
   - Run on desktop and mobile
   - Test in incognito mode

2. **WebPageTest**
   - Test from multiple locations
   - Check Time to First Byte (TTFB)
   - Analyze waterfall

3. **PageSpeed Insights**
   - Google's official tool
   - Real-world field data
   - Core Web Vitals

#### Core Web Vitals Targets

- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### Ongoing Maintenance

#### Monthly Tasks
- [ ] Run Lighthouse audit
- [ ] Check bundle sizes
- [ ] Review and update dependencies
- [ ] Optimize any new images

#### Quarterly Tasks
- [ ] Review all images for optimization
- [ ] Check for unused dependencies
- [ ] Audit third-party scripts
- [ ] Test on slower connections (3G)

## Future Optimizations

### Recommended Next Steps

1. **Service Worker** for offline support and caching
2. **Image CDN** for automatic optimization (Cloudflare, Cloudinary)
3. **Code splitting** for larger features
4. **Prefetch** for likely next pages/routes
5. **Critical CSS** extraction
6. **HTTP/2 Server Push** for critical resources

### Advanced Image Techniques

1. **AVIF format** with WebP fallback:
```vue
<picture>
  <source type="image/avif" srcset="image.avif">
  <source type="image/webp" srcset="image.webp">
  <img src="image.jpg" alt="Description">
</picture>
```

2. **Responsive images** with srcset:
```vue
<img
  srcset="image-320w.webp 320w,
          image-640w.webp 640w,
          image-1280w.webp 1280w"
  sizes="(max-width: 768px) 100vw, 50vw"
  src="image-640w.webp"
  alt="Description"
>
```

3. **Blur placeholder** technique (LQIP - Low Quality Image Placeholder)

## Resources

- [Web.dev Performance](https://web.dev/performance/)
- [MDN Web Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
- [Vite Performance](https://vitejs.dev/guide/performance.html)
- [Vue Performance](https://vuejs.org/guide/best-practices/performance.html)
- [Image Optimization](https://web.dev/fast/#optimize-your-images)
