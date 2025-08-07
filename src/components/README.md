# BaseButton Component

A flexible, reusable button component with multiple variants, sizes, and features.

## Features

- ✅ Multiple variants (primary, secondary, outline, ghost)
- ✅ Three sizes (sm, md, lg)
- ✅ Optional animated arrow
- ✅ Support for both buttons and links
- ✅ Custom color support
- ✅ Full TypeScript support
- ✅ Accessibility features

## Usage

### Basic Button

```vue
<BaseButton @click="handleClick">
  Click me
</BaseButton>
```

### Button with Arrow Animation

```vue
<BaseButton 
  variant="primary"
  size="lg"
  :has-arrow="true"
  @click="handleClick"
>
  Book a Call
</BaseButton>
```

### External Link

```vue
<BaseButton 
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
  :has-arrow="true"
>
  Visit Website
</BaseButton>
```

### Custom Color (Dynamic)

```vue
<BaseButton 
  variant="outline"
  :custom-color="dynamicColor"
  @click="handleClick"
>
  Contact
</BaseButton>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | `'primary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `href` | `string` | `undefined` | If provided, renders as `<a>` tag |
| `target` | `string` | `undefined` | Link target (for href) |
| `rel` | `string` | `undefined` | Link relationship (for href) |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type (for button) |
| `disabled` | `boolean` | `false` | Disable the button |
| `hasArrow` | `boolean` | `false` | Show animated arrow |
| `customColor` | `string` | `undefined` | Custom color (CSS color value) |
| `customBorderColor` | `string` | `undefined` | Custom border color |

## Variants

### Primary
Dark button style with neutral-950 background and white text. Features a neutral-700 arrow background with smooth hover effects.

### Secondary
Light button style with neutral-100 background and dark text. Perfect for secondary actions with subtle hover effects.

### Outline
Transparent background with dark border. Transforms to dark background on hover with smooth transitions.

### Ghost
Transparent background, no border. Subtle hover effect with light background tint.

## Events

| Event | Description |
|-------|-------------|
| `click` | Emitted when button is clicked |

## Examples in Codebase

- **Header Contact Button**: `variant="outline"` with `customColor`
- **Hero CTA**: `variant="primary"` with `hasArrow="true"`
- **Footer CTA**: `variant="secondary"` with `hasArrow="true"`
- **Modal Submit**: `variant="secondary"` for form submission
