<script setup>
import { ref } from 'vue'
import Simulation from './Simulation.vue';

// 狀態管理
const worldMode = ref('city')
const isSimulatorOpen = ref(false);

// 資料定義
const metrics = [
  {
    val: '雙重人格',
    label: '同一角色，兩種命運'
  },

  {
    val: '雙維度探索',
    label: '現實與異界共享世界'
  },

  {
    val: '人格切換',
    label: '兩套技能樹自由轉換'
  },

  {
    val: '4+1 戰陣',
    label: '多重職能策略搭配'
  },

  {
    val: '三種破局',
    label: '每個 Boss 至少三種解法'
  },

  {
    val: '社交住宅區',
    label: '展示、經營、演唱會'
  }
]

const units = [
  { city: '防禦者', aether: '破盾者（破壞）' },
  { city: '反制者', aether: '治療者（救贖）' },
  { city: '支援者', aether: '控制者（支配）' },
  { city: '指揮家', aether: '處刑者（處刑）' },
  { city: '分析師', aether: '揭露者（弱點揭露）' },
  { city: '執行者', aether: '狂戰士（毀滅）' }
]

const loopSteps = [
  { title: '接取任務', desc: '在星刻市取得主線、日常與活動委託。' },
  { title: '次元調查', desc: '切換阿爾卡迪亞視角，找出隱藏機關。' },
  { title: '編成隊伍', desc: '依 Boss 弱點與場地規則配置 4+1 陣容。' },
  { title: '連鎖戰術', desc: '運用特殊效果完成戰術解題。' },
  { title: '固定成長', desc: '取得固定數值模組與店鋪經營資源。' },
  { title: '社交展示', desc: '住宅區展示角色與版本成果。' }
]

const solutions = [
  { title: '弱點連鎖', desc: '透過標記敵人或揭露弱點放大 Debuff，引爆全隊的連鎖支援反應。' },
  { title: '場地機制', desc: '穿梭於現實與異界維度，重塑移動路徑並改寫場地屬性，考驗玩家的戰術抉擇。' },
  { title: '人格應用', desc: '拒絕數值碾壓。配合六大人格原型進行信念與戰術切換，引導防守到粉碎的決策變革。' }
]
</script>

<template>
  <v-app id="app-container">
    <v-main class="main-content-bg">
      <!-- Hero 區域：定位與次元預覽 -->
      <section id="positioning" class="section-padding">
        <v-container>
          <v-row align="center">
            <v-col cols="12" lg="6">
              <v-chip color="secondary" variant="outlined" class="mb-4 font-weight-black" size="small">
                二次元科幻都市戰術 RPG
              </v-chip>
              <h1 class="text-h2 font-weight-black mb-4">
                重疊於 <span class="text-gradient">異界的倒影</span>
              </h1>
              <p class="text-body-1 text-grey-lighten-1 mb-6">
                玩家作為「導標者」穿梭星刻市與阿爾卡迪亞，運用謀略設法破解裂隙 Boss。
                企劃核心拒絕單純的數值堆疊，而是讓固定規則與維度切換形成可規劃的戰術解題。
              </p>
              <div class="d-flex gap-4 mb-8">
                <v-btn color="primary" class="font-weight-black px-8" @click="isSimulatorOpen = true">
                  戰術循環 ICD 模擬器 (Prototype)
                </v-btn>
                <v-btn variant="outlined" class="ml-4 px-8">戰術確認</v-btn>
              </div>
              <!-- 核心指標 -->
              <v-row dense>
                <v-col cols="4" v-for="m in metrics" :key="m.label">
                  <v-card variant="outlined" class="glass-card pa-4">
                    <div class="text-h4 font-weight-black text-secondary">{{ m.val }}</div>
                    <div class="text-caption text-grey">{{ m.label }}</div>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>

            <!-- 核心玩法模擬器 (互動組件) -->
            <v-col cols="12" lg="6">
              <v-card class="demo-screen-container pa-4" border>
                <div class="d-flex justify-space-between align-center mb-4">
                  <span class="text-subtitle-1 font-weight-bold text-white">星刻裂隙作戰介面</span>
                  <v-btn-toggle v-model="worldMode" mandatory density="compact" class="mode-toggle">
                    <v-btn value="city" class="text-caption btn-city">現實 (City)</v-btn>
                    <v-btn value="aether" class="text-caption btn-aether">幻界 (Aether)</v-btn>
                  </v-btn-toggle>
                </div>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-card variant="outlined" class="pa-4 world-box" :class="worldMode">
                      <div class="text-subtitle-2 font-weight-black mb-1">
                        {{ worldMode === 'city' ? '場景：星刻市 / 現實維度' : '場景：阿爾卡迪亞 / 異界維度' }}
                      </div>
                      <p class="text-caption">
                        {{ worldMode === 'city' ? '現實維度：部署防禦戰線，維持隊伍站位與戰術空間。' : '異界維度：執行弱點粉碎與狂暴輸出，切換核心戰術。' }}
                      </p>
                    </v-card>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-card variant="outlined" class="pa-4">
                      <div class="text-subtitle-2 font-weight-black mb-2 text-white">4+1 戰陣</div>
                      <v-row dense>
                        <v-col cols="6" v-for="u in units" :key="u.city">
                          <v-card color="rgba(255,255,255,0.05)" class="pa-2" flat>
                            <div class="text-secondary text-caption font-weight-bold">
                              {{ u[worldMode] }}
                            </div>
                          </v-card>
                        </v-col>
                        <v-col cols="12">
                          <v-card color="rgba(255, 207, 90, 0.1)" class="pa-2" border="warning" flat>
                            <div class="text-warning text-caption font-weight-bold">戰友支援：[Leader Skills Execute]</div>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- 3. 每日玩法循環 (Core Loop) -->
      <section id="loop" class="section-padding border-t">
        <v-container>
          <div class="mb-8">
            <span class="text-overline text-secondary font-weight-black">Core Loop</span>
            <h2 class="text-h3 font-weight-black">每日玩法循環(日常任務etc)</h2>
          </div>
          <v-row>
            <v-col cols="12" sm="6" md="4" v-for="(step, i) in loopSteps" :key="i">
              <v-card class="glass-card pa-6 h-100 position-relative overflow-hidden">
                <div class="text-h2 position-absolute"
                  style="right: -10px; bottom: -10px; opacity: 0.05; font-weight: 900;">0{{ i + 1 }}</div>
                <div class="text-h6 text-secondary mb-2 font-weight-black">{{ step.title }}</div>
                <p class="text-body-2 text-grey">{{ step.desc }}</p>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <!-- 4. Boss 設計：三解法範例 -->
      <section id="boss" class="section-padding border-t">
        <v-container>
          <v-row>
            <v-col cols="12" md="5">
              <span class="text-overline text-secondary font-weight-black">Boss Design</span>
              <h2 class="text-h3 font-weight-black mb-4">???</h2>
              <v-card class="boss-visual-card pa-6 d-flex flex-column align-center">
                <v-avatar size="150" class="boss-core-ui mb-4">裂隙核心</v-avatar>
                <p class="text-caption text-center text-grey">階段切換與次元穿梭時，Boss 將同步於兩個維度改寫弱點，強制引導玩家切換信念與戰術機制，拒絕無腦換皮設計。</p>
              </v-card>
            </v-col>
            <v-col cols="12" md="7">
              <div class="d-flex flex-column gap-4">
                <v-card v-for="(sol, i) in solutions" :key="i" class="glass-card pa-6" border="s-xl secondary">
                  <div class="d-flex align-center mb-3">
                    <v-badge :content="i + 1" color="secondary" inline text-color="black"></v-badge>
                    <span class="text-h6 ml-3 font-weight-black text-white">{{ sol.title }}</span>
                  </div>
                  <p class="text-body-1 text-grey-lighten-4 mb-0" style="line-height: 1.6;">{{ sol.desc }}</p>
                </v-card>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </section>
      <v-divider class="my-10" color="secondary" thickness="2"></v-divider>
    </v-main>

    <v-dialog v-model="isSimulatorOpen" max-width="800">
      <v-card class="bg-transparent pa-0" elevation="0">
        <Simulation />
      </v-card>
    </v-dialog>
  </v-app>
</template>

<style scoped>
/* 1. 核心配色與背景 (Visual Style Guide) [1] */
.main-content-bg {
  background: linear-gradient(135deg, #05070d 0%, #0b1020 46%, #150d27 100%);
  color: #eef4ff;
}

/* 2. 玻璃擬態 (20% 霧化效果) [1] */
.glass-card {
  background: rgba(14, 18, 32, 0.74) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
}

/* 3. 漸層文字 (電光紫 & 都市青) [1] */
.text-gradient {
  background: linear-gradient(90deg, #00FFC6, #6B4CFF);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.brand-title {
  background: linear-gradient(90deg, #00FFC6, #6B4CFF);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* 4. 元件特定樣式 */
.section-padding {
  padding: 80px 0;
}

.demo-screen-container {
  background: rgba(4, 9, 19, 0.86) !important;
  box-shadow: 0 24px 90px rgba(0, 0, 0, 0.38);
}

/* 移除任何可能覆蓋顏色的繼承，強制設定文字為高對比色 */
.world-box {
  transition: all 0.4s ease !important;
  border-width: 2px !important;
  /* 強制背景色以防透明度導致視覺錯覺 */
  background: rgba(10, 15, 25, 0.8) !important;
}

/* 星刻市模式 */
.world-box.city {
  border-color: #00FFC6 !important;
}

.world-box.city .text-subtitle-2 {
  color: #00FFC6 !important;
  /* 強制標題為螢光綠 */
}

.world-box.city .text-caption {
  color: #ffffff !important;
  /* 強制描述為白色 */
}

/* 阿爾卡迪亞模式 */
.world-box.aether {
  border-color: #FF00FF !important;
}

.world-box.aether .text-subtitle-2 {
  color: #FF00FF !important;
  /* 強制標題為螢光紫 */
}

.world-box.aether .text-caption {
  color: #ffffff !important;
  /* 強制描述為白色 */
}

.boss-visual-card {
  background: linear-gradient(145deg, rgba(107, 76, 255, 0.2), rgba(3, 8, 19, 0.86)) !important;
  border: 1px solid rgba(107, 76, 255, 0.34);
}

.boss-core-ui {
  background: rgba(3, 8, 19, 0.78);
  border: 2px solid #ff5d8f;
  box-shadow: 0 0 30px rgba(255, 93, 143, 0.4);
  font-weight: 900;
  color: #ffd7e5;
}

.gap-4 {
  gap: 1rem;
}
</style>