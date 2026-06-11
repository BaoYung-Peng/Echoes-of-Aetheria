<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  accent: { type: String, required: true },
});

const styleVars = computed(() => ({
  '--accent-color': props.accent,
}));
</script>

<template>
  <div class="toggle-card" :style="styleVars">
    <div class="toggle-card__header" :style="{ borderColor: accent }">
      <span class="toggle-card__title">{{ title }}</span>
    </div>
    <p class="toggle-card__description">{{ description }}</p>
  </div>
</template>

<style scoped>
.toggle-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 22px;
  padding: 18px;
}

.toggle-card__header {
  border-bottom: 1px solid;
  padding-bottom: 10px;
  margin-bottom: 10px;
}

.toggle-card__title {
  font-weight: 800;
  color: var(--accent-color);
}

.toggle-card__description {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
}
</style>
