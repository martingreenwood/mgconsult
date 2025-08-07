<template>
  <div class="p-8 space-y-8 bg-gray-50 min-h-screen">
    <h1 class="text-3xl font-bold text-gray-900 coco">BaseButton Showcase</h1>
    
    <!-- Variants -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-gray-800 coco">Variants</h2>
      <div class="flex flex-wrap gap-4">
        <BaseButton variant="primary">Primary</BaseButton>
        <BaseButton variant="secondary">Secondary</BaseButton>
        <BaseButton variant="outline">Outline</BaseButton>
        <BaseButton variant="ghost">Ghost</BaseButton>
      </div>
    </section>

    <!-- Sizes -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-gray-800 coco">Sizes</h2>
      <div class="flex flex-wrap items-center gap-4">
        <BaseButton size="sm">Small</BaseButton>
        <BaseButton size="md">Medium</BaseButton>
        <BaseButton size="lg">Large</BaseButton>
      </div>
    </section>

    <!-- With Arrow -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-gray-800 coco">With Arrow Animation</h2>
      <div class="flex flex-wrap gap-4">
        <BaseButton variant="primary" :has-arrow="true">Book a Call</BaseButton>
        <BaseButton variant="secondary" :has-arrow="true">Learn More</BaseButton>
        <BaseButton variant="outline" :has-arrow="true">Get Started</BaseButton>
        <BaseButton variant="ghost" :has-arrow="true">Ghost Arrow</BaseButton>
      </div>
    </section>

    <!-- All Variants Large with Arrow -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-gray-800 coco">Large Buttons with Arrow (Hover to see effect)</h2>
      <div class="flex flex-wrap gap-4">
        <BaseButton variant="primary" size="lg" :has-arrow="true">Primary Large</BaseButton>
        <BaseButton variant="secondary" size="lg" :has-arrow="true">Secondary Large</BaseButton>
        <BaseButton variant="outline" size="lg" :has-arrow="true">Outline Large</BaseButton>
        <BaseButton variant="ghost" size="lg" :has-arrow="true">Ghost Large</BaseButton>
      </div>
    </section>
    
    <!-- Outline Variant Showcase -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-gray-800 coco">Outline Variant Showcase</h2>
      <div class="flex flex-wrap gap-4">
        <BaseButton variant="outline" size="sm">Small Outline</BaseButton>
        <BaseButton variant="outline" size="md">Medium Outline</BaseButton>
        <BaseButton variant="outline" size="lg">Large Outline</BaseButton>
        <BaseButton variant="outline" size="lg" :has-arrow="true">Outline with Arrow</BaseButton>
        <BaseButton variant="outline" :loading="true">Loading Outline</BaseButton>
        <BaseButton variant="outline" :loading="true" :has-arrow="true">Loading with Arrow</BaseButton>
      </div>
    </section>

    <!-- States -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-gray-800 coco">States</h2>
      <div class="flex flex-wrap gap-4">
        <BaseButton>Normal</BaseButton>
        <BaseButton :disabled="true">Disabled</BaseButton>
        <BaseButton :loading="true">Loading</BaseButton>
        <BaseButton :loading="true" :has-arrow="true">Loading with Arrow</BaseButton>
      </div>
    </section>

    <!-- Links -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-gray-800 coco">As Links</h2>
      <div class="flex flex-wrap gap-4">
        <BaseButton 
          href="https://example.com" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          External Link
        </BaseButton>
        <BaseButton 
          href="https://calendly.com/example" 
          target="_blank" 
          rel="noopener noreferrer"
          variant="secondary"
          :has-arrow="true"
        >
          Book a Call
        </BaseButton>
      </div>
    </section>

    <!-- Custom Colors -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-gray-800 coco">Custom Colors</h2>
      <div class="flex flex-wrap gap-4">
        <BaseButton 
          variant="outline"
          custom-color="#ef4444"
          custom-border-color="#ef4444"
        >
          Red Button
        </BaseButton>
        <BaseButton 
          variant="outline"
          custom-color="#10b981"
          custom-border-color="#10b981"
        >
          Green Button
        </BaseButton>
        <BaseButton 
          variant="outline"
          custom-color="#3b82f6"
          custom-border-color="#3b82f6"
        >
          Blue Button
        </BaseButton>
      </div>
    </section>

    <!-- Interactive Demo -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold text-gray-800 coco">Interactive Demo</h2>
      <div class="flex flex-wrap gap-4">
        <BaseButton @click="handleClick">Click Me</BaseButton>
        <BaseButton 
          :loading="isLoading"
          @click="handleAsyncAction"
        >
          {{ isLoading ? 'Processing...' : 'Async Action' }}
        </BaseButton>
      </div>
      <p v-if="clickCount > 0" class="text-sm text-gray-600">
        Button clicked {{ clickCount }} times
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from './BaseButton.vue'

const clickCount = ref(0)
const isLoading = ref(false)

const handleClick = () => {
  clickCount.value++
}

const handleAsyncAction = async () => {
  isLoading.value = true
  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 2000))
  isLoading.value = false
  clickCount.value++
}
</script>
