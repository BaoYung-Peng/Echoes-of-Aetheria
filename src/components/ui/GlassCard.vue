<template>
  <v-card class="glass-card" variant="outlined" :flat="flat">
    <slot />
  </v-card>
</template>

<script setup lang="ts">
// import { defineProps } from 'vue';

const props = defineProps({
  flat: { type: Boolean, default: false },
});
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(16px);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.18);
}
</style>
