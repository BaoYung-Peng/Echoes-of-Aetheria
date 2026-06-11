<script setup lang="ts">
import GlassCard from './GlassCard.vue';

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  flat: { type: Boolean, default: false },
});
</script>

<template>
  <GlassCard class="feature-card" :flat="flat">
    <div class="feature-card__inner">
      <div class="feature-card__title">{{ title }}</div>
      <p class="feature-card__desc">{{ description }}</p>
      <slot />
    </div>
  </GlassCard>
</template>

<style scoped>
.feature-card {
  padding: 24px;
}
.feature-card__title {
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 12px;
}
.feature-card__desc {
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.7;
}
</style>
