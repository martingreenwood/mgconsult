# Performance Monitoring Guide

This guide covers how to monitor and maintain optimal performance for your site.

## Quick Performance Check

### Using Lighthouse (Built into Chrome)

1. Open your site in Chrome
2. Open DevTools (F12 or Cmd+Option+I)
3. Click on "Lighthouse" tab
4. Select "Performance", "Accessibility", "Best Practices", and "SEO"
5. Click "Analyze page load"

**Target Scores:**
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

### Using Lighthouse CI (Automated)

We've included a Lighthouse CI configuration (`.lighthouserc.json`) for automated testing.

**Install Lighthouse CI:**
```bash
npm install -g @lhci/cli
```

**Run locally:**
```bash
# Build the project
npm run build

# Preview the build
npm run preview

# In another terminal, run Lighthouse CI
lhci autorun
```

## Bundle Size Monitoring

### Check Current Bundle Size

```bash
# Build the project
npm run build

# View the build output
ls -lh dist/assets/js/
```

### Budget Guidelines

**Size budgets (gzipped):**
- JavaScript (total): < 250KB
  - Vendor chunk: < 150KB  - App chunk: < 100KB
- CSS: < 50KB
- Images (per image): < 150KB
- Total initial load: < 400KB

### Analyze Bundle Composition

For detailed bundle analysis, you can use:

**1. Rollup Plugin Visualizer**

Install:
```bash
npm install --save-dev rollup-plugin-visualizer
```

Add to `vite.config.ts`:
```typescript
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    // ... other plugins
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ]
})
```

Run build:
```bash
npm run build
```

This will open a visual representation of your bundle.

## Core Web Vitals Monitoring

### What to Monitor

**1. Largest Contentful Paint (LCP)**
- Target: < 2.5 seconds
- What it measures: Loading performance
- How to improve:
  - Optimize images
  - Remove render-blocking resources
  - Use CDN

**2. First Input Delay (FID) / Interaction to Next Paint (INP)**
- Target: < 100ms (FID) / < 200ms (INP)
- What it measures: Interactivity
- How to improve:
  - Minimize JavaScript execution time
  - Code splitting
  - Optimize third-party scripts

**3. Cumulative Layout Shift (CLS)**
- Target: < 0.1
- What it measures: Visual stability
- How to improve:
  - Set explicit dimensions for images/video
  - Reserve space for dynamic content
  - Avoid inserting content above existing content

### Real User Monitoring (RUM)

For production monitoring, consider using:

**1. Google Analytics 4 (Already integrated)**
- Web Vitals automatically collected
- View in GA4: Reports > Engagement > Pages and screens

**2. Web Vitals Library (Optional)**

Install:
```bash
npm install web-vitals
```

Usage in `src/main.ts`:
```typescript
import { onCLS, onFID, onLCP } from 'web-vitals'

function sendToAnalytics(metric) {
  // Send to your analytics
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
    })
  }
}

onCLS(sendToAnalytics)
onFID(sendToAnalytics)
onLCP(sendToAnalytics)
```

## Testing Checklist

### Before Each Deployment

- [ ] Run `npm run build` and check for warnings
- [ ] Check bundle sizes (should not increase significantly)
- [ ] Run Lighthouse audit (local preview)
- [ ] Test on slow 3G connection (Chrome DevTools Network throttling)
- [ ] Verify images are optimized
- [ ] Check console for errors (DevTools)

### Monthly Review

- [ ] Run full Lighthouse audit
- [ ] Review bundle sizes trend
- [ ] Check Web Vitals in Google Analytics
- [ ] Update dependencies and retest
- [ ] Review and optimize largest assets

### Quarterly Deep Dive

- [ ] Full performance audit with WebPageTest
- [ ] Review all third-party scripts
- [ ] Check for unused dependencies
- [ ] Review and update performance budgets
- [ ] Test on real devices (mobile, tablet)

## Tools & Resources

### Online Tools

1. **PageSpeed Insights**
   - URL: https://pagespeed.web.dev/
   - Provides both lab and field data
   - Official Google tool

2. **WebPageTest**
   - URL: https://www.webpagetest.org/
   - Detailed waterfall analysis
   - Test from multiple locations

3. **Chrome DevTools**
   - Performance panel
   - Network panel
   - Lighthouse
   - Coverage tool (find unused code)

### Browser Extensions

- **Web Vitals** - Chrome extension for real-time CWV monitoring
- **Lighthouse** - Built into Chrome DevTools
- **React Developer Tools** - For Vue debugging

## Performance Regression Prevention

### Git Hooks (Pre-commit)

Consider adding a pre-commit hook to prevent performance regressions:

Create `.husky/pre-commit`:
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Run build and check bundle size
npm run build

# Add bundle size check here
# (Example: fail if bundle exceeds certain size)
```

### CI/CD Integration

Add Lighthouse CI to your deployment pipeline:

**GitHub Actions Example:**
```yaml
name: Performance
on: [pull_request]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run preview &
      - run: npm run lhci
```

## Troubleshooting

### Common Issues

**1. Large JavaScript Bundle**
- Solution: Check for duplicate dependencies
- Tool: `npm dedupe`
- Consider lazy loading routes/components

**2. Poor LCP**
- Check: Hero image size
- Solution: Optimize/compress images
- Consider: Using CDN

**3. High CLS**
- Check: Images without dimensions
- Solution: Add explicit width/height
- Check: Font loading (FOUT/FOIT)

**4. Long Time to Interactive**
- Check: Third-party scripts
- Solution: Defer non-critical scripts
- Consider: Service worker for caching

## Additional Resources

- [Web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/)
- [Vite Performance Guide](https://vitejs.dev/guide/performance.html)
- [Vue Performance Guide](https://vuejs.org/guide/best-practices/performance.html)
