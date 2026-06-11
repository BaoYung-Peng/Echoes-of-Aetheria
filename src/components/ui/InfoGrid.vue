<script setup lang="ts">
type InfoItem = {
  label: string;
  value: string;
};

const props = defineProps<{ items: InfoItem[] }>();
</script>

<template>
  <div class="info-grid">
    <div v-for="item in items" :key="item.label" class="info-grid__item">
      <span class="info-grid__label">{{ item.label }}</span>
      <p class="info-grid__value">{{ item.value }}</p>
    </div>
  </div>
</template>

<style scoped>
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}
.info-grid__item {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  padding: 18px;
}
.info-grid__label {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: rgba(148, 163, 184, 0.88);
  letter-spacing: 0.12em;
}
.info-grid__value {
  margin-top: 10px;
  font-weight: 700;
  color: white;
}
</style>
