<script setup lang='ts'>
interface WorldCard {
  title: string;
  description: string;
  color: string;
}

const worldCards: WorldCard[] = [
  {
    title: '現實：星刻市',
    description: '極致的高科技秩序，霓虹燈下的數據都市。居民們對維度異常習以為常，以為只是都市傳說，卻不知現實正在被蠶食。',
    color: '#00FFC6', // 祖母綠螢光
  },
  {
    title: '異界：阿爾卡迪亞',
    description: '失落的神域與結晶化荒原。這裡的時間停滯，英雄的靈魂在此長眠。這裡是維度坍塌的起源，也是力量的唯一出口。',
    color: '#FF00FF', // 粉紫螢光
  },
];
</script>

<template>
  <v-app class="app-bg">
    <section class="hero-section d-flex align-center justify-center text-center">
      <div class="overlay"></div>

      <v-container class="hero-content relative z-10 fill-height d-flex flex-column align-center justify-center">
        <div class="text-center hero-copy">
          <h1 class="text-h3 text-md-h2 text-lg-h1 font-weight-black mb-8 glitch-text text-white tracking-tighter">
            維度疊影，霓虹幻象
          </h1>

          <p class="text-h6 text-md-h5 leading-loose text-grey-lighten-3 mb-12 glow-text font-italic font-weight-medium">
            「星刻市的雨，從不洗去塵埃，只會映射出不屬於這裡的色彩。當天空裂開如琉璃般的縫隙，兩座維度在引力潮汐中強行擁抱。你是這場維度重疊中最後的變數，導標者。」
          </p>

          <div class="divider mx-auto mb-12"></div>

          <div class="d-flex justify-center">
            <v-btn
              variant="outlined"
              color="#00FFC6"
              size="x-large"
              class="px-10 py-6 font-weight-black text-h6 tracking-widest shadow-neon d-flex align-center justify-center"
              style="min-width: 280px;"
            >
              <span class="text-center">深入探索真相</span>
            </v-btn>
          </div>
        </div>
      </v-container>
    </section>

    <v-container class="py-16 py-md-32">
      <v-row align="stretch" justify="center">
          <v-col v-for="card in worldCards" :key="card.title" cols="12" md="6" lg="5">
            <v-card 
              class="card-glass pa-10 rounded-xl transition-swing d-flex flex-column" 
              :style="{ '--card-color': card.color }" 
              flat
            >
              <h2 class="text-h4 font-weight-black mb-6" :style="{ color: card.color }">
                {{ card.title }}
              </h2>

              <p class="text-subtitle-1 text-grey-lighten-2 leading-relaxed mb-8">
                {{ card.description }}
              </p>
            
              <div class="world-card-placeholder bg-grey-darken-4 rounded-lg border-thin border-grey-darken-1 mt-auto"></div>
            </v-card>
          </v-col>
      </v-row>
    </v-container>

    <section class="closing-section py-24">
      <v-container class="text-center">
        <h3 class="text-h4 font-weight-black mb-8 text-white glow-text">導標者的宿命</h3>
        <p class="text-h6 text-grey-lighten-2 font-weight-medium leading-loose mx-auto closing-copy">
          你擁有錨定維度的權限。每一次的戰鬥，不僅是為了生存，更是為了從破碎的現實中，搶救回那些屬於「阿爾卡迪亞」的英雄記憶。你將在科技與神蹟的夾縫中，為這座即將消亡的城市尋找唯一的出口。
        </p>
      </v-container>
    </section>
  </v-app>
</template>

<style scoped>
.app-bg {
  background-color: #050508 !important;
}

.hero-section {
  height: 100vh;
  position: relative;
  background-size: cover;
  background-position: center;
}

.hero-content {
  position: relative;
  z-index: 10;
}

.hero-copy {
  max-width: 900px;
  width: 100%;
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8));
}

.glow-text {
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
}

.shadow-neon:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease !important;
}

.glitch-text {
  animation: glitch 3s infinite;
}

@keyframes glitch {
  0% {
    text-shadow: 2px 0 #ff00c1, -2px 0 #00fff9;
  }

  50% {
    text-shadow: -2px 0 #ff00c1, 2px 0 #00fff9;
  }

  100% {
    text-shadow: 2px 0 #ff00c1, -2px 0 #00fff9;
  }
}

.divider {
  width: 320px;
  height: 3px;
  background: linear-gradient(90deg, transparent, #6B4CFF, #00FFC6, transparent);
}

.card-glass {
  background: rgba(255, 255, 255, 0.03) !important;
  backdrop-filter: blur(12px);
  /* 設定預設邊框 */
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  transition: all 0.4s ease !important;
}

/* 透過變數實現動態 Hover */
.card-glass:hover {
  transform: translateY(-5px) !important;
  border-color: var(--card-color) !important;
  box-shadow: 0 0 30px color-mix(in srgb, var(--card-color), transparent 60%) !important;
}

.world-card-placeholder {
  height: 256px;
}

.closing-section {
  background: linear-gradient(to top, #000000, #121215);
}

.closing-copy {
  max-width: 800px;
}
</style>
