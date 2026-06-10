<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const dimension = ref(24);

// Strict color tokens from Agent.md
const STAR_CITY = '#00FFC6'; // 都市青
const ARCADIA = '#6B4CFF'; // 電光紫

const dimensionLabel = computed(() => (dimension.value < 50 ? '星刻市' : '阿爾卡迪亞'));
const sliderHint = computed(() =>
  dimension.value < 50
    ? '滑動次元刻度，觀察同一場域在都市與異界之間的實時資訊差異。'
    : '切換到異界視角，揭示符文地脈、裂隙連鎖與戰術機制。'
);

const currentAccent = computed(() => (dimension.value < 50 ? STAR_CITY : ARCADIA));

const cards = [
  {
    title: '星刻市',
    description:
      '電光街區資訊、社交住宅與商圈互動標記。',
    accent: STAR_CITY,
    realm: 'star',
  },
  {
    title: '阿爾卡迪亞戰術層',
    description:
      '浮空遺跡與符文地脈狀態：弱點連鎖、共鳴擴散）。',
    accent: ARCADIA,
    realm: 'arcadia',
  },
];

const goHome = () => {
  router.push('/');
};
</script>

<template>
  <section class="view-hero py-20">
    <v-container>
      <v-row align="center" justify="space-between">
        <v-col cols="12" md="6">
          <div class="hero-panel glass-panel pa-10">
            <p class="text-subtitle-1 text-teal-lighten-3 mb-4">次元切換模組</p>
            <h1 class="text-h3 font-weight-black mb-6 gradient-text">星刻市 ↔ 阿爾卡迪亞</h1>
            <p class="text-body-1 opacity-80 mb-8">
              呈現同一場域在兩個維度之間可操作的資訊與戰術差異。
            </p>
            <v-slider
              v-model="dimension"
              min="0"
              max="100"
              step="10"
              label="次元刻度"
              class="mb-6"
              :color="dimension < 50 ? STAR_CITY : ARCADIA"
              :track-color="dimension < 50 ? ARCADIA : STAR_CITY"
              thumb-color="#ffffff"
            />
            <div class="slider-state glass-subpanel pa-6">
              <h2 class="text-h6 font-weight-bold mb-2">目前維度：{{ dimensionLabel }}</h2>
              <p class="text-body-2 opacity-75">{{ sliderHint }}</p>
            </div>
            <div class="hero-actions d-flex flex-column flex-sm-row gap-4 mt-8">
              <v-btn :color="STAR_CITY" large style="color: #06070b;" class="btn-cta">預註冊體驗</v-btn>
              <v-btn variant="outlined" :color="ARCADIA" large @click="goHome">返回主頁</v-btn>
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="5">
          <div class="preview-panel glass-panel pa-8">
            <div class="preview-badge" :style="{ background: currentAccent }">
              {{ dimensionLabel }} 模組
            </div>
            <div class="preview-copy mt-6">
              <p class="text-body-1 opacity-80">
                次元切換視窗可在同一地點顯示「行動目標」、「場地狀態」與「敵我弱點」資訊層，凸顯維度差異。
              </p>
            </div>
            <div class="stats-grid mt-8">
              <div
                class="stat-card"
                v-for="card in cards"
                :key="card.title"
                :class="{ arcadia: card.realm === 'arcadia' }"
                :style="{ borderColor: card.accent }"
              >
                <h3 class="text-h6 font-weight-bold" :style="{ color: card.accent }">{{ card.title }}</h3>
                <p class="text-body-2 opacity-75 mt-3">{{ card.description }}</p>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.view-hero {
  min-height: calc(100vh - 64px);
  background: linear-gradient(180deg, rgba(5, 5, 8, 1) 0%, rgba(10, 10, 18, 0.95) 100%);
}

.glass-panel {
  background: rgba(6, 8, 15, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(18px);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.28);
}

.glass-subpanel {
  background: rgba(6, 8, 18, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(16px);
}

.gradient-text {
  background: linear-gradient(90deg, #6B4CFF, #00FFC6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.preview-panel {
  position: relative;
  overflow: hidden;
}

.preview-badge {
  display: inline-flex;
  padding: 10px 18px;
  border-radius: 999px;
  color: #06070b;
  font-weight: 700;
  font-size: 0.95rem;
}

.stats-grid {
  display: grid;
  gap: 18px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid;
  border-radius: 24px;
  padding: 20px;
  transition: transform 0.3s ease, background 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-6px);
}

/* Arcadia-specific neon border + glass */
.stat-card.arcadia {
  background: rgba(107, 76, 255, 0.06);
  border-color: rgba(107, 76, 255, 0.9) !important;
  box-shadow: 0 0 18px rgba(107, 76, 255, 0.28), 0 8px 30px rgba(107,76,255,0.06);
  backdrop-filter: blur(14px);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
}

.btn-cta {
  font-weight: 800;
  box-shadow: 0 6px 18px rgba(0, 255, 198, 0.12);
}

@media (max-width: 960px) {
  .hero-panel,
  .preview-panel {
    margin-top: 24px;
  }
}
</style>
