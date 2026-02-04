<template>
  <div class="card card-skeleton" aria-hidden="true" :data-color="color">
    <div class="image"></div>
    <div class="name"></div>
    <div class="speech">
      <div v-for="n in 5" :key="`line-${n}`" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  color?: string;
}>();
</script>

<style scoped>
/* Border and image styles come from components.css (data-color) */
.card-skeleton {
  max-width: 400px;
  padding: var(--spacing-md);
  margin: 0;
}

.image {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 200px;
  margin-bottom: var(--spacing-md);
  border-radius: 8px;
  border: var(--border-medium) solid var(--component-color-dark);
  background: linear-gradient(135deg, var(--component-color-dark), var(--component-color), var(--comic-purple-dark));
  box-shadow: inset 0 0 20px rgba(var(--comic-black-rgb), var(--color-opacity-50));

}

.image::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.25) 50%,
      transparent 100%);
  background-size: 200% 100%;
  animation: card-skeleton-shimmer 1.2s ease-in-out infinite;
}

.card-skeleton[data-color="blue"] .image {
  background: linear-gradient(135deg, var(--comic-blue-dark), var(--comic-blue), var(--comic-cyan-dark));
}

.card-skeleton[data-color="purple"] .image {
  background: linear-gradient(135deg, var(--comic-purple-dark), var(--comic-purple), var(--comic-pink-dark));
}

.card-skeleton[data-color="red"] .image {
  background: linear-gradient(135deg, var(--comic-red-dark), var(--comic-red), var(--comic-orange-dark));
}

.card-skeleton[data-color="orange"] .image {
  background: linear-gradient(135deg, var(--comic-orange-dark), var(--comic-orange), var(--comic-yellow-dark));
}

.name {
  height: 1.5rem;
  width: 70%;
  margin: 0 auto var(--spacing-sm);
  background: var(--comic-text-muted);
  opacity: 0.6;
  border-radius: 2px;
  animation: card-skeleton-pulse 1.2s ease-in-out infinite;
}

.speech {
  position: relative;
  background: var(--comic-white);
  border: var(--border-medium) solid var(--comic-blue-dark);
  border-radius: 20px;
  padding: var(--spacing-md);
  margin: var(--spacing-sm) 0;
  box-shadow: 0 2px 8px rgba(var(--comic-black-rgb), var(--color-opacity-20));

  >div {
    background: var(--comic-text-muted);
    opacity: 0.4;
    border-radius: 2px;
    height: 0.75rem;
    width: 85%;
    margin-bottom: var(--spacing-xs);
    animation-delay: 0.1s;
    animation: card-skeleton-pulse 1.2s ease-in-out infinite;

    &:first-child {
      height: 0.9rem;
      width: 100%;
      margin-bottom: var(--spacing-sm);
      animation-delay: 0s;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}

@keyframes card-skeleton-shimmer {
  to {
    background-position: 200% 0;
  }
}

@keyframes card-skeleton-pulse {

  0%,
  100% {
    opacity: 0.4;
  }

  50% {
    opacity: 0.7;
  }
}
</style>
