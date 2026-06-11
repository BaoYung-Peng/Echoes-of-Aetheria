<script setup lang="ts">
import type { Character } from '../../types/character';

const props = defineProps<{ character: Character }>();

const emit = defineEmits<{
  (e: 'select', path: string): void;
}>();

const selectCharacter = () => {
  emit('select', props.character.path);
};
</script>

<template>
  <v-card class="character-card glass-card pa-2" variant="outlined" @click="selectCharacter">
    <v-img
      :src="character.image"
      height="450"
      aspect-ratio="0.9"
      cover
      class="rounded bg-grey-darken-4 cursor-pointer"
    >
      <template #placeholder>
        <div class="d-flex align-center justify-center fill-height bg-grey-darken-3">
          <span class="text-grey-lighten-1">載入中...</span>
        </div>
      </template>
    </v-img>

    <v-card-title class="mt-2">{{ character.name }}</v-card-title>
  </v-card>
</template>

<style scoped>
.character-card {
  cursor: pointer;
}
</style>