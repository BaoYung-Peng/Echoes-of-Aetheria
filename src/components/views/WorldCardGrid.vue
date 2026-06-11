<script setup lang="ts">
import GlassCard from '../ui/GlassCard.vue';

interface WorldCard {
  title: string;
  description: string;
  color: string;
}

const props = defineProps<{ cards: WorldCard[] }>();
</script>

<template>
  <v-row align="stretch" justify="center">
    <v-col v-for="card in cards" :key="card.title" cols="12" md="6" lg="5">
      <GlassCard class="world-card" flat>
        <div class="world-card__content">
          <h2 class="world-card__title" :style="{ color: card.color }">{{ card.title }}</h2>
          <p class="world-card__description">{{ card.description }}</p>
          <div class="world-card__placeholder"></div>
        </div>
      </GlassCard>
    </v-col>
  </v-row>
</template>

<style scoped>
.world-card {
  padding: 32px;
  min-height: 320px;
}
.world-card__title {
  font-size: 1.75rem;
  font-weight: 900;
  margin-bottom: 18px;
}
.world-card__description {
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.8;
  margin-bottom: 24px;
}
.world-card__placeholder {
  height: 220px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.04);
}
</style>
