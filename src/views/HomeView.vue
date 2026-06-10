<script setup lang='ts'>
import { useRouter } from 'vue-router';
import type { Character } from '../types/character';

import cute1Image from '../assets/images/Cute1.png';
import cute2Image from '../assets/images/Cute2.png';
import cute3Image from '../assets/images/Cute3.png';

const router = useRouter();

const characters: Character[] = [
  { name: 'Character1', image: cute1Image, path: '/ssr/role' },
  { name: 'Character2', image: cute2Image, path: '/ssr/role' },
  { name: 'Character3', image: cute3Image, path: '/ssr/role' },
];

const navigateTo = (path: Character['path']) => {
  if (!path) {
    console.log('此角色詳細頁面尚未開放');
    return;
  }
  router.push(path);
};

const handlePreReg = () => {
  alert('預註冊活動已啟動！');
};
</script>

<template>
  <section class="hero-section d-flex align-center">
    <v-container>
      <v-row align="center">
        <v-col cols="12" md="6">
          <h1 class="text-h2 font-weight-black mb-6">
            幻界迴響：<br />
            <span class="gradient-text">霓虹傳說</span>
          </h1>
          <p class="text-h6 opacity-70 mb-8">
            在星刻市與阿爾卡迪亞的夾縫中，尋找維度的真相。
          </p>
          <v-btn color="#00FFC6" size="x-large" rounded="0" @click="handlePreReg">
            立即預註冊
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </section>

  <v-container class="py-16">
    <h2 class="text-h3 text-center mb-12 gradient-text">登場角色</h2>
    <v-row>
      <v-col v-for="character in characters" :key="character.name" cols="12" md="4">
        <v-card class="glass-card pa-2" variant="outlined">
          <v-img
            :src="character.image"
            height="450"
            aspect-ratio="0.9"
            cover
            class="rounded bg-grey-darken-4 cursor-pointer"
            @click="navigateTo(character.path)"
          >
            <template #placeholder>
              <div class="d-flex align-center justify-center fill-height bg-grey-darken-3">
                <span class="text-grey-lighten-1">載入中...</span>
              </div>
            </template>
          </v-img>

          <v-card-title class="mt-2">{{ character.name }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* 確保 hero-section 的文字基礎顏色為白色 */
.hero-section {
  color: white;
  height: 100vh;
  background:
    linear-gradient(90deg, rgba(10, 10, 12, 0.9) 0%, rgba(10, 10, 12, 0.4) 60%, rgba(10, 10, 12, 0.2) 100%),
    url('../assets/images/IndexBackground.png') no-repeat center center;
  background-size: cover;
  position: relative;
}

/* 漸層標題保留給需要強調的文字 */
.gradient-text {
  background: linear-gradient(90deg, #6B4CFF, #00FFC6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900;
}
</style>

