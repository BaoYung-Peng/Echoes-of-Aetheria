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
const dimensionMode = computed(() => (dimension.value < 50 ? 'star' : 'arcadia'));
const modeTag = computed(() => (dimension.value < 50 ? '現實維度' : '異界視角'));

const cards = [
  {
    title: '星刻市視角',
    description: '電光商圈資訊、社交住宅與數據目標標記，強調現實維度的任務與資源流。',
    accent: STAR_CITY,
    realm: 'star',
  },
  {
    title: '阿爾卡迪亞戰術層',
    description: '浮空遺跡符文地脈、裂隙連鎖與弱點節點，凸顯異界模式的策略差異。',
    accent: ARCADIA,
    realm: 'arcadia',
  },
];

const sceneOptions = [
  {
    title: '霓虹商圈 • 星刻市',
    description: '現實維度下的場景以高樓、資料塔與社交住宅為核心，資源採集與任務提示更偏向玩家觀察與地形預判。',
    accent: STAR_CITY,
    realm: 'star',
  },
  {
    title: '符文裂隙 • 阿爾卡迪亞',
    description: '異界維度揭示裂隙連鎖與地脈共鳴，敵人弱點會隨地形變化，玩家需要用場地謀略引導連鎖爆發。',
    accent: ARCADIA,
    realm: 'arcadia',
  },
];

const bonusTriggers = computed(() => {
  if (dimensionMode.value === 'star') {
    return [
      { label: 'Bonus 觸發', value: '社交住宅事件完成時可獲得「戰力回復」與「資料節點強化」。' },
      { label: '場景切換', value: '從星刻市切換至異界後，同一區域會解鎖符文地脈視角。' },
      { label: '戰術利基', value: '固定裝備可在都市場景中疊加「數據盾牌」，提高 4+1 戰陣耐久。' },
    ];
  }
  return [
    { label: 'Bonus 觸發', value: '進入阿爾卡迪亞可激活「裂隙共鳴」，連鎖攻擊額外造成符文爆發傷害。' },
    { label: '場景切換', value: '從異界返回現實，可獲得「弱點標記」與「能量回復」的切換紅利。' },
    { label: '戰術利基', value: '「地形謀略」影響敵方耐性，地脈節點可讓固定裝備獲得次元屬性加成。' },
  ];
});

const terrainStrategy = computed(() => {
  if (dimensionMode.value === 'star') {
    return [
      { label: '雲塔高地', value: '利用高地視野標記敵人弱點並佈置輔助角色，提升隊伍控制。' },
      { label: '霓虹街區', value: '在開放街區判斷敵群走位，將群攻技能與場地節點結合形成破盾節奏。' },
      { label: '住宅區域', value: '透過社交住宅事件增加能量蓄積，為 4+1 戰陣鋪路。' },
    ];
  }
  return [
      { label: '裂隙廢墟', value: '利用地形裂隙推動連鎖爆發，讓固定技能命中弱點產生擴散效果。' },
      { label: '符文祭壇', value: '排列角色技能順序以觸發「共鳴連鎖」，形成可控的異界傷害路徑。' },
      { label: '空中遺跡', value: '在浮空平台布局隊形，強化「職能替代」與「援護節奏」的戰術多樣性。' },
  ];
});

const dimensionDetails = computed(() => {
  if (dimensionMode.value === 'star') {
    return [
      { label: '場地狀態', value: '資料封鎖、社交住宅事件' },
      { label: '弱點資訊', value: '目標緩衝區、破盾節點' },
      { label: '戰術焦點', value: '編組 4+1、隊友支援、能量管理' },
    ];
  }
  return [
    { label: '場地狀態', value: '符文地脈、裂隙擴散、共鳴點' },
    { label: '弱點資訊', value: '異界弱點連鎖、減抗節點' },
    { label: '戰術焦點', value: '幻境輔助、連鎖爆發、維度觸發' },
  ];
});

const formation = [
  { label: '前鋒', desc: '主攻單位，承擔破盾與輸出任務' },
  { label: '重裝', desc: '坦克/防禦位，維持隊伍穩定' },
  { label: '術師', desc: '範圍與控場，觸發地脈連鎖' },
  { label: '輔助', desc: '治療/增益，支持 4+1 編成' },
  { label: '偵查', desc: '遠端偵查與標記弱點' },
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
              {{ dimensionLabel }} 模組 • {{ modeTag }}
            </div>
            <div class="preview-copy mt-6">
              <p class="text-body-1 opacity-80">
                次元切換視窗同時呈現「行動目標」、「場地狀態」與「敵我弱點」資訊層，讓玩家能直觀感受星刻市與阿爾卡迪亞的戰術差異。
              </p>
            </div>
            <div class="dimension-info mt-8">
              <div class="info-chip" :style="{ borderColor: currentAccent, color: currentAccent }">
                當前維度: {{ modeTag }}
              </div>
              <div class="info-chip" :style="{ background: currentAccent + '22', color: currentAccent }">
                4+1 戰陣 / 角色定位
              </div>
            </div>
            <div class="dimension-details mt-6 d-grid gap-4">
              <div v-for="detail in dimensionDetails" :key="detail.label" class="detail-card glass-card p-4">
                <span class="text-xs uppercase text-slate-400 tracking-widest">{{ detail.label }}</span>
                <p class="text-sm font-bold text-white mt-2">{{ detail.value }}</p>
              </div>
            </div>
            <div class="formation-panel mt-8">
              <h3 class="text-h6 font-weight-bold mb-4">核心隊伍佈局</h3>
              <div class="formation-grid">
                <div v-for="slot in formation" :key="slot.label" class="formation-card">
                  <span class="text-xs uppercase text-slate-400">{{ slot.label }}</span>
                  <p class="text-sm font-bold text-white mt-2">{{ slot.desc }}</p>
                </div>
              </div>
            </div>
            <div class="scene-switch-panel mt-8 glass-subpanel p-6">
              <h3 class="text-h6 font-weight-bold mb-4">場景切換 / Bonus 觸發</h3>
              <div class="scene-grid">
                <div v-for="scene in sceneOptions" :key="scene.title" class="scene-card" :style="{ borderColor: scene.accent }">
                  <h4 class="text-subtitle-2 font-weight-bold" :style="{ color: scene.accent }">{{ scene.title }}</h4>
                  <p class="text-body-2 opacity-75 mt-3">{{ scene.description }}</p>
                </div>
              </div>
              <div class="bonus-grid mt-6">
                <div v-for="bonus in bonusTriggers" :key="bonus.label" class="bonus-card">
                  <span class="text-xs uppercase text-slate-400">{{ bonus.label }}</span>
                  <p class="text-sm font-bold text-white mt-2">{{ bonus.value }}</p>
                </div>
              </div>
            </div>
            <div class="terrain-panel mt-8 glass-subpanel p-6">
              <h3 class="text-h6 font-weight-bold mb-4">玩家地形謀略</h3>
              <div class="terrain-grid">
                <div v-for="terrain in terrainStrategy" :key="terrain.label" class="terrain-card">
                  <span class="text-xs uppercase text-slate-400">{{ terrain.label }}</span>
                  <p class="text-sm font-bold text-white mt-2">{{ terrain.value }}</p>
                </div>
              </div>
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
  background-clip: text;
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

.dimension-info {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.info-chip {
  padding: 10px 14px;
  border: 1px solid;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 700;
}

.detail-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 22px;
}

.formation-panel {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 22px;
}

.formation-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.formation-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 18px;
}

.scene-switch-panel,
.terrain-panel {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 26px;
}

.scene-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.scene-card,
.bonus-card,
.terrain-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 22px;
  padding: 18px;
}

.bonus-grid,
.terrain-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
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
