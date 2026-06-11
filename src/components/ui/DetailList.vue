<script setup lang="ts">
type DetailItem = {
  label: string;
  value: string;
};

const props = defineProps<{ items: DetailItem[] }>();
</script>

<template>
  <div class="detail-list">
    <div v-for="item in items" :key="item.label" class="detail-list__item">
      <span class="detail-list__label">{{ item.label }}</span>
      <p class="detail-list__text">{{ item.value }}</p>
    </div>
  </div>
</template>

<style scoped>
.detail-list {
  display: grid;
  gap: 14px;
}
.detail-list__item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 18px;
}
.detail-list__label {
  display: block;
  color: rgba(148, 163, 184, 0.9);
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
.detail-list__text {
  margin-top: 10px;
  font-weight: 700;
  color: white;
}
</style>
