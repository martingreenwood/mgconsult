<template>
  <BaseButton
    variant="primary"
    size="lg"
    :has-arrow="true"
    aria-label="Start with a call"
    class="fit-call-button"
    @click="openContact"
  >
    Start with a Call
  </BaseButton>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue'

const emit = defineEmits<{
  click: [event: Event]
}>()

const openContact = (event: Event) => {
  emit('click', event)
  window.dispatchEvent(new CustomEvent('open-contact-modal'))
}
</script>
