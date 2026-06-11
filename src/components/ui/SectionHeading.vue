<script setup lang="ts">
const props = defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
});
</script>

<template>
  <div class="section-heading">
    <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
    <h2 class="heading"><slot>{{ title }}</slot></h2>
  </div>
</template>

<style scoped>
.section-heading {
  margin-bottom: 32px;
}
.eyebrow {
  display: inline-block;
  margin-bottom: 12px;
  color: #00ffc6;
  letter-spacing: 0.18em;
  font-weight: 700;
  text-transform: uppercase;
}
.heading {
  font-size: 2rem;
  font-weight: 900;
  line-height: 1.05;
}
</style>
