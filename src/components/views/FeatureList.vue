<script setup lang="ts">
type FeatureItem = {
  title: string;
  description: string;
  visualLabel?: string;
  visualStyle?: Record<string, string>;
  reverse?: boolean;
};

const props = defineProps<{ features: FeatureItem[] }>();
</script>

<template>
  <div class="feature-list">
    <div
      v-for="(item, index) in features"
      :key="item.title"
      class="feature-list__item"
      :class="{ 'feature-list__item--reverse': item.reverse }"
    >
      <div class="feature-list__visual">
        <div class="feature-list__placeholder" :style="item.visualStyle">{{ item.visualLabel }}</div>
      </div>
      <div class="feature-list__content">
        <h3 class="feature-list__title">{{ item.title }}</h3>
        <p class="feature-list__description">{{ item.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feature-list {
  display: grid;
  gap: 32px;
}
.feature-list__item {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  align-items: center;
  gap: 24px;
}
.feature-list__item--reverse {
  grid-template-columns: 1.2fr 1fr;
}
.feature-list__visual {
  min-height: 192px;
}
.feature-list__placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-radius: 24px;
  color: rgba(255, 255, 255, 0.85);
  font-weight: 700;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
}
.feature-list__content {
  color: white;
}
.feature-list__title {
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 12px;
}
.feature-list__description {
  color: rgba(255, 255, 255, 0.78);
  line-height: 1.8;
}
@media (max-width: 960px) {
  .feature-list__item,
  .feature-list__item--reverse {
    grid-template-columns: 1fr;
  }
}
</style>
