<script setup lang='ts'>
import { useRouter } from 'vue-router';
import SectionHeading from '../components/ui/SectionHeading.vue';
import CharacterSection from '../components/views/CharacterSection.vue';
import { useHomeCharacters } from '../composables/useHomeCharacters';

const router = useRouter();
const { characters } = useHomeCharacters();

const handlePreReg = () => {
  alert('預註冊活動已啟動！');
};

const goToRolePage = () => {
  router.push('/ssr/role');
};

const navigateTo = (path: string) => {
  if (!path) {
    console.warn('此角色詳細頁面尚未開放');
    return;
  }
  router.push(path);
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
    <SectionHeading eyebrow="角色展示" title="登場角色" />
    <CharacterSection :characters="characters" />
  
    <v-row justify="center" class="mt-12">
      <v-col cols="auto">
        <v-btn 
          variant="outlined" 
          color="#00FFC6" 
          size="x-large" 
          rounded="0"
          class="px-12 font-weight-bold"
          style="min-width: 300px;"
          @click="goToRolePage"
        >
          瀏覽完整檔案庫
        </v-btn>
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

.neon-border {
  border: 2px solid #00FFC6 !important;
  box-shadow: 0 0 10px rgba(0, 255, 198, 0.3);
}
.neon-border:hover {
  background-color: rgba(0, 255, 198, 0.1);
  box-shadow: 0 0 20px rgba(0, 255, 198, 0.5);
}

</style>

