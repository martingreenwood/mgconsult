# Dark Mode Implementation Guide

## Overview

Your site now has a complete dark mode system with:
- ✅ Theme toggle component in the header
- ✅ localStorage persistence (remembers user preference)
- ✅ System preference detection
- ✅ Smooth transitions between themes
- ✅ Comprehensive dark mode color scheme

## How It Works

### Theme Management

The dark mode system uses a composable (`src/composables/useTheme.ts`) that handles:

1. **Theme States**: `'light'` | `'dark'` | `'system'`
2. **LocalStorage**: Saves user preference
3. **System Detection**: Respects `prefers-color-scheme`
4. **Auto-Apply**: Adds `.dark` class to `<html>` element

### Color System

**Custom Dark Mode Colors** (defined in `tailwind.config.js`):
```javascript
{
  dark: {
    bg: '#0a0a0a',          // Main background
    surface: '#1a1a1a',     // Card/surface background
    elevated: '#2a2a2a',    // Elevated elements
    border: '#3a3a3a',      // Borders
    text: {
      primary: '#f5f5f5',   // Primary text
      secondary: '#a3a3a3', // Secondary text
      tertiary: '#737373',  // Tertiary/muted text
    },
  },
}
```

## Usage

### In Components

Use Tailwind's `dark:` variant:

```vue
<div class="bg-white dark:bg-dark-bg text-slate-900 dark:text-white">
  Content
</div>
```

### Common Patterns

**Text Colors:**
```vue
<!-- Headings -->
<h1 class="text-slate-900 dark:text-white">Heading</h1>

<!-- Body text -->
<p class="text-gray-600 dark:text-gray-400">Body text</p>

<!-- Muted text -->
<span class="text-gray-500 dark:text-gray-500">Muted</span>
```

**Backgrounds:**
```vue
<!-- Main background -->
<div class="bg-white dark:bg-dark-bg">

<!-- Card/Surface -->
<div class="bg-gray-50 dark:bg-dark-surface">

<!-- Elevated surface -->
<div class="bg-slate-100 dark:bg-dark-elevated">
```

**Borders:**
```vue
<div class="border border-gray-200 dark:border-dark-border">
```

**Buttons:**
```vue
<!-- Primary button -->
<button class="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900">

<!-- Secondary button -->
<button class="bg-white dark:bg-dark-surface border dark:border-dark-border">
```

## Components Needing Updates

### Already Updated ✅

1. ✅ `ThemeToggle.vue` - Toggle component
2. ✅ `useTheme.ts` - Theme composable
3. ✅ `tailwind.config.js` - Dark mode configuration
4. ✅ `main.css` - Global dark mode styles
5. ✅ `App.vue` - Header with theme toggle

### Need Dark Mode Support

Update these components with `dark:` variants:

#### High Priority

1. **BaseButton.vue**
   - Update variants to support dark mode
   - Ensure proper contrast

2. **FloatingContactButton.vue**
   - Button background/text colors
   - Icon colors

3. **ContactModal.vue**
   - Modal background
   - Text colors
   - Form elements

4. **RecentProjects.vue**
   - Card backgrounds
   - Text colors
   - Tags

5. **FAQ.vue**
   - Accordion backgrounds
   - Question/answer text
   - Borders

6. **Testimonials.vue**
   - Card backgrounds
   - Quote text
   - Author details
   - Star ratings

#### Medium Priority

7. **NotFound.vue**
   - Error page backgrounds
   - Button styles

8. **ScrollToTop.vue**
   - Button colors

9. **ErrorBoundary.vue**
   - Error display backgrounds
   - Text colors

### Section Updates in App.vue

Add dark mode classes to these sections:

```vue
<!-- Video Section -->
<section class="bg-stone-100 dark:bg-dark-surface">

<!-- Services Section -->
<section class="services-section">
  <p class="text-gray-600 dark:text-gray-400">

<!-- CTA Section -->
<section class="bg-neutral-100 dark:bg-dark-surface">

<!-- Dark Section (already dark, reverse for dark mode) -->
<section class="bg-zinc-900 dark:bg-zinc-800">

<!-- Trust Section -->
<section class="trust-section bg-white dark:bg-dark-bg">

<!-- Footer -->
<footer class="bg-gray-800 dark:bg-gray-900">
```

## Quick Update Pattern

For each component/section, follow this pattern:

1. **Backgrounds**: Add `dark:bg-*` classes
2. **Text**: Add `dark:text-*` classes
3. **Borders**: Add `dark:border-*` classes
4. **Hover States**: Add `dark:hover:*` classes
5. **Shadows**: Consider `dark:shadow-*` or remove in dark mode

### Example Conversion

**Before:**
```vue
<div class="bg-white border border-gray-200 text-gray-900">
  <p class="text-gray-600">Content</p>
</div>
```

**After:**
```vue
<div class="bg-white dark:bg-dark-surface border border-gray-200 dark:border-dark-border text-gray-900 dark:text-white">
  <p class="text-gray-600 dark:text-gray-400">Content</p>
</div>
```

## Testing Dark Mode

### Manual Testing

1. Toggle dark mode using the button in the header
2. Check each section for:
   - Proper contrast (text readable)
   - Consistent colors
   - No "light leaks" (white backgrounds showing through)
   - Smooth transitions

3. Test with system preference:
   ```javascript
   // In browser console
   window.matchMedia('(prefers-color-scheme: dark)').matches
   ```

### Browser DevTools

**Chrome/Edge:**
1. Open DevTools (F12)
2. Open Command Menu (Ctrl/Cmd + Shift + P)
3. Type "Render"
4. Select "Emulate CSS prefers-color-scheme: dark"

**Firefox:**
1. about:config
2. Search for `ui.systemUsesDarkTheme`
3. Set to `1` for dark, `0` for light

### Accessibility Check

Ensure proper contrast ratios:
- **Normal text**: 4.5:1 minimum
- **Large text** (18pt+): 3:1 minimum
- **UI components**: 3:1 minimum

Use Chrome DevTools Lighthouse or axe DevTools to check.

## Current Status

### ✅ Completed

- [x] Theme toggle component with animations
- [x] Theme persistence (localStorage)
- [x] System preference detection
- [x] Tailwind dark mode configuration
- [x] Custom dark color palette
- [x] Global dark mode styles
- [x] Header with theme toggle
- [x] Base transitions between themes

### 🔄 In Progress

- [ ] Update all components with dark mode classes
- [ ] Update all sections in App.vue
- [ ] Test across all browsers
- [ ] Verify WCAG contrast ratios

### 📋 TODO

1. **Update BaseButton.vue** - Add dark mode variants
2. **Update ContactModal.vue** - Dark modal styles
3. **Update FloatingContactButton.vue** - Dark button
4. **Update service cards** - Dark backgrounds
5. **Update all sections** - Comprehensive dark styles
6. **Update FAQ** - Dark accordion styles
7. **Update Testimonials** - Dark card styles
8. **Test everything** - Manual and automated

## Best Practices

### DO ✅

- Use semantic color names (`text-gray-600 dark:text-gray-400`)
- Maintain consistent color hierarchy
- Test both light and dark modes
- Use smooth transitions (`transition-colors duration-300`)
- Respect `prefers-reduced-motion`

### DON'T ❌

- Don't hardcode hex colors in templates
- Don't forget hover/focus states
- Don't use pure black `#000000` (use `#0a0a0a` instead)
- Don't use pure white `#ffffff` on dark backgrounds
- Don't forget to test with actual content

## Tips for Good Dark Mode

1. **Contrast**: Dark mode ≠ inverted colors
   - Reduce contrast slightly compared to light mode
   - Use softer whites (#f5f5f5 instead of #ffffff)

2. **Colors**: Desaturate colors slightly in dark mode
   - Bright colors can be harsh on dark backgrounds
   - Use slightly muted versions

3. **Images**: Consider different images for dark mode
   - Logos might need light versions
   - Screenshots might need borders

4. **Shadows**: Adapt or remove shadows in dark mode
   - Shadows are less visible on dark backgrounds
   - Consider using borders or subtle glows instead

## Troubleshooting

### Theme not persisting?
- Check localStorage: `localStorage.getItem('theme-preference')`
- Ensure `initTheme()` is called in component mount

### Flicker on page load?
- Add this to `index.html` before any content loads:
```html
<script>
  // Prevent flash of wrong theme
  const theme = localStorage.getItem('theme-preference') || 'system';
  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
</script>
```

### Colors not applying?
- Ensure Tailwind is processing the dark: variants
- Check that `dark Mode: 'class'` is in tailwind.config.js
- Rebuild: `npm run build`

## Resources

- [Tailwind Dark Mode Docs](https://tailwindcss.com/docs/dark-mode)
- [Web.dev Dark Mode Guide](https://web.dev/prefers-color-scheme/)
- [Material Design Dark Theme](https://material.io/design/color/dark-theme.html)

---

**Status**: Foundation Complete, Components Need Updates
**Last Updated**: January 11, 2026
