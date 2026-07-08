<script setup lang="ts">
import CharacterCard from '../ui/CharacterCard.vue';
import type { Character } from '../../types/character';

const props = defineProps<{ characters: Character[] }>();

const emit = defineEmits<{
  (e: 'selectCharacter', path: string): void;
}>();

const navigateToCharacter = (path: string) => {
  emit('selectCharacter', path);
};
</script>

<template>
  <div class="character-section">
    <div class="hero-copy">
      <slot name="hero" />
    </div>

    <div class="character-grid">
      <CharacterCard
        class="tracking-card"
        v-for="character in characters"
        :key="character.name"
        :character="character"
        @select="navigateToCharacter"
      />
    </div>
  </div>
</template>

<style scoped>
.character-section {
  display: grid;
  gap: 48px;
}
.hero-copy {
  text-align: center;
}
.character-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
</style>
