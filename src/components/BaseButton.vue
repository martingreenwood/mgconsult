<template>
  <component
    :is="tag"
    :href="href"
    :target="target"
    :rel="rel"
    :type="type"
    :disabled="disabled"
    :class="buttonClasses"
    :style="customStyle"
    @click="handleClick"
  >
    <span class="z-10 flex items-center gap-2" :class="{ 'pr-2': hasArrow }">
      <!-- Loading Spinner -->
      <svg
        v-if="loading"
        class="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <slot />
    </span>
    
    <!-- Animated Arrow -->
    <div 
      v-if="hasArrow"
      class="absolute right-1 inline-flex h-12 w-12 items-center justify-end rounded-full transition-[width] group-hover:w-[calc(100%-8px)]"
      :class="arrowClasses"
    >
      <div class="mr-3.5 flex items-center justify-center">
        <svg 
          width="15" 
          height="15" 
          viewBox="0 0 15 15" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-5 w-5"
          :class="arrowIconClasses"
        >
          <path 
            d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" 
            fill="currentColor" 
            fill-rule="evenodd" 
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  hasArrow?: boolean
  customColor?: string
  customBorderColor?: string
  customHoverColor?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  hasArrow: false
})

const emit = defineEmits<{
  click: [event: Event]
}>()

// Determine the component tag
const tag = computed(() => props.href ? 'a' : 'button')

// Handle click events
const handleClick = (event: Event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

// Base classes
const baseClasses = computed(() => [
  'group relative inline-flex items-center justify-center font-medium transition-all duration-300 ease-in-out',
  'focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-full',
  {
    'cursor-not-allowed opacity-50': props.disabled || props.loading,
    'cursor-pointer': !props.disabled && !props.loading
  }
])

// Size classes
const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-4 py-2 text-sm h-10',
    md: 'pl-6 pr-14 py-3 text-base h-12',
    lg: 'pl-6 pr-14 py-1 text-base h-[calc(48px+8px)]'
  }
  
  // Adjust padding if no arrow
  if (!props.hasArrow) {
    sizes.md = 'px-6 py-3 text-base h-12'
    sizes.lg = 'px-6 py-1 text-base h-[calc(48px+8px)]'
  }
  
  return sizes[props.size]
})

// Variant classes
const variantClasses = computed(() => {
  if (props.customColor) {
    // Custom color variant (like the header contact button)
    return [
      'border border-current hover:bg-current hover:text-white',
      'focus:ring-current'
    ]
  }

  const variants = {
    primary: [
      'bg-neutral-950 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-950 border border-neutral-950 dark:border-neutral-100',
      'hover:bg-neutral-800 dark:hover:bg-neutral-200',
      'focus:ring-neutral-700 dark:focus:ring-neutral-300'
    ],
    secondary: [
      'bg-neutral-100 dark:bg-neutral-800 text-neutral-950 dark:text-neutral-50 border border-neutral-100 dark:border-neutral-800',
      'hover:bg-neutral-200 dark:hover:bg-neutral-700',
      'focus:ring-neutral-300 dark:focus:ring-neutral-600'
    ],
    outline: [
      'bg-transparent text-neutral-950 dark:text-neutral-50 border border-neutral-950 dark:border-neutral-50',
      'hover:text-neutral-50 dark:hover:text-neutral-950',
      'focus:ring-neutral-950 dark:focus:ring-neutral-50'
    ],
    ghost: [
      'bg-transparent text-neutral-950 dark:text-neutral-50 border border-transparent',
      'hover:bg-neutral-100 dark:hover:bg-neutral-800',
      'focus:ring-neutral-300 dark:focus:ring-neutral-600'
    ]
  }
  return variants[props.variant]
})

// Arrow background classes
const arrowClasses = computed(() => {
  if (props.customColor) {
    return 'bg-current bg-opacity-20 w-12'
  }

  const arrowBgs = {
    primary: 'bg-neutral-700 dark:bg-neutral-300',
    secondary: 'bg-neutral-300 dark:bg-neutral-700',
    outline: 'bg-neutral-700 dark:bg-neutral-300',
    ghost: 'bg-neutral-200 dark:bg-neutral-700'
  }

  // Ensure the height matches the button size
  const baseSize = props.size === 'lg' ? 'h-12 w-12' : props.size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'

  return [arrowBgs[props.variant], baseSize]
})

// Arrow icon classes
const arrowIconClasses = computed(() => {
  if (props.customColor) {
    return 'text-current'
  }

  const iconColors = {
    primary: 'text-neutral-50 dark:text-neutral-950',
    secondary: 'text-neutral-950 dark:text-neutral-50',
    outline: 'text-neutral-50 dark:text-neutral-950',
    ghost: 'text-neutral-950 dark:text-neutral-50'
  }

  return iconColors[props.variant]
})

// Combined button classes
const buttonClasses = computed(() => [
  ...baseClasses.value,
  sizeClasses.value,
  ...variantClasses.value
])

// Custom style for dynamic colors
const customStyle = computed(() => {
  if (props.customColor) {
    const style: Record<string, string> = {
      color: props.customColor
    }
    
    if (props.customBorderColor) {
      style.borderColor = props.customBorderColor
    } else {
      style.borderColor = props.customColor
    }
    
    return style
  }
  return {}
})
</script>
