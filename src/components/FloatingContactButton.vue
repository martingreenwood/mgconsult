<template>
  <div
    class="floating-contact-button"
    @click="$emit('click')"
  >
    <!-- Rotating text -->
    <svg
      class="rotating-text"
      viewBox="0 0 200 200"
      width="200"
      height="200"
    >
      <defs>
        <path
          id="circle"
          d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
        />
      </defs>
      <text class="circular-text" :fill="textColor">
        <textPath href="#circle" startOffset="0%" textLength="440" lengthAdjust="spacingAndGlyphs">
          {{ rotatingText }} -  {{ rotatingText }} - &nbsp;
        </textPath>
      </text>
    </svg>

    <!-- Central image/icon -->
    <div class="central-image">
      <!-- You can replace this with a background image in CSS -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  logoColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  logoColor: '#374151'
})

defineEmits<{
  click: []
}>()

// Text that rotates around the button
const rotatingText = computed(() => {
  return 'FREE - 15 MINUTE CONSULTATION'
})

// Use the same color as the logo
const textColor = computed(() => props.logoColor)
</script>

<style scoped>
.floating-contact-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 50;
  width: 140px;
  height: 140px;
  cursor: pointer;
  transition: transform 0.3s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-contact-button:hover {
  transform: scale(1.2);
}

.rotating-text {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  animation: rotate 20s linear infinite;
}

.circular-text {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.05em;
  font-family: "Cocogoose Classic", sans-serif;
  text-transform: uppercase;
  text-anchor: start;
  transition: fill 0.3s ease;
}

.central-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 3px solid #f1f5f9;
  transition: all 0.3s ease;

  /* Add your background image here */
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="%23374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 9h8M8 13h6" stroke="%23374151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  background-size: 32px 32px;
  background-repeat: no-repeat;
  background-position: center;
}

.floating-contact-button:hover .central-image {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border-color: #e2e8f0;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .floating-contact-button {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 120px;
    height: 120px;
  }

  .central-image {
    width: 70px;
    height: 70px;
    background-size: 28px 28px;
  }

  .circular-text {
    font-size: 10px;
  }
}
</style>
