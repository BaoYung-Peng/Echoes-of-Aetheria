<script setup lang="ts">
import { ref } from 'vue';
import type { Character } from '../../types/character';

const props = defineProps<{ character: Character }>();
const isFlipped = ref(false);
</script>

<template>
  <div class="card-wrapper" @click="isFlipped = !isFlipped">
    <div class="card-inner" :class="{ 'is-flipped': isFlipped }">
      
      <v-card class="card-face front" variant="outlined">
        <v-img :src="character.image" height="450" cover />
        <v-card-title>{{ character.name }}</v-card-title>
      </v-card>

      <v-card class="card-face back" variant="outlined">
        <v-img :src="character.alternateImage" height="450" cover />
        <v-card-title>{{ character.name }} (異界形態)</v-card-title>
      </v-card>

    </div>
  </div>
</template>

<style scoped>
/* 1. 容器設定 */
.card-wrapper {
  width: 100%;
  height: 500px;
  perspective: 1000px; /* 3D 空間 */
  cursor: pointer;
}

/* 2. 旋轉核心 */
.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.is-flipped {
  transform: rotateY(180deg);
}

/* 3. 面與背的定位 */
.card-face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /* 這是隱藏背面內容的關鍵 */
  -webkit-backface-visibility: hidden;
}

.back {
  transform: rotateY(180deg);
}
</style>