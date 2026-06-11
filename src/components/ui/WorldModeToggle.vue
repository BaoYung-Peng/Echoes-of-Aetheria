<script setup lang="ts">
import { watch } from 'vue';

const props = defineProps({
  modelValue: { type: String, required: true },
});
const emit = defineEmits(['update:modelValue']);

watch(
  () => props.modelValue,
  (value) => emit('update:modelValue', value)
);
</script>

<template>
  <v-btn-toggle v-model="modelValue" mandatory density="compact" class="mode-toggle">
    <v-btn value="city" class="text-caption btn-city">現實</v-btn>
    <v-btn value="aether" class="text-caption btn-aether">幻界</v-btn>
  </v-btn-toggle>
</template>

<style scoped>
.mode-toggle {
  min-width: 240px;
}
</style>
