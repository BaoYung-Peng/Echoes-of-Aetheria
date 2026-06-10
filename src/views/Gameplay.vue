<template>
  <v-container class="py-16 px-6 fill-height" fluid style="background-color: #0a0a0c;">
    <div class="max-w-5xl mx-auto text-center">
      
      <div class="section-header-wrapper mb-12">
        <h2 class="text-h4 font-weight-black tracking-widest text-white">遊戲玩法介紹</h2>
      </div>

      <div class="d-flex flex-column" style="gap: 48px;">
        
        <v-card class="feature-box rounded-xl pa-6" flat>
          <v-row align="center">
            <v-col cols="12" md="4">
              <div class="d-flex align-center justify-center rounded-lg border-thin border-purple-lighten-1 bg-purple-darken-4" style="height: 192px;">
                [戰鬥演示視覺圖]
              </div>
            </v-col>
            <v-col cols="12" md="8" class="text-md-left text-center">
              <h3 class="text-h5 font-weight-bold text-teal-accent-3 mb-3">戰術共鬥：連鎖反應</h3>
              <p class="text-grey-lighten-1">突破傳統回合制，採用 4+1 陣容策略。透過「連鎖反應系統」，針對敵人弱點觸發多次連擊，將 MMORPG 的 Boss 共鬥體驗完美融入回合制戰鬥中。</p>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="feature-box rounded-xl pa-6" flat>
          <v-row align="center" class="flex-md-row-reverse">
            <v-col cols="12" md="4">
              <div class="d-flex align-center justify-center rounded-lg border-thin border-teal-lighten-1 bg-teal-darken-4" style="height: 192px;">
                [社交住宅模擬圖]
              </div>
            </v-col>
            <v-col cols="12" md="8" class="text-md-left text-center">
              <h3 class="text-h5 font-weight-bold text-teal-accent-3 mb-3">都市生活：社交住宅區</h3>
              <p class="text-grey-lighten-1">星刻市不僅是戰場，更是您的公共大廳。在此經營店鋪、裝潢專屬空間，邀請好友互動，體驗深度社交與經營的樂趣。</p>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="feature-box rounded-xl pa-6" flat>
          <v-row align="center">
            <v-col cols="12" md="4">
              <div class="d-flex align-center justify-center rounded-lg border-thin border-blue-lighten-1 bg-blue-darken-4" style="height: 192px;">
                [長線版本地圖預覽]
              </div>
            </v-col>
            <v-col cols="12" md="8" class="text-md-left text-center">
              <h3 class="text-h5 font-weight-bold text-teal-accent-3 mb-3">敘事級長線更新</h3>
              <p class="text-grey-lighten-1">每一週期重大版本更新，均會帶來全新都市區域與異世界地圖。揭開維度坍塌的真相，保證您的每一次探索都充滿新鮮感。</p>
            </v-col>
          </v-row>
        </v-card>

      </div>
    </div>
  </v-container>
</template>

<style scoped>
.section-header-wrapper {
  position: relative;
  display: inline-block;
  padding: 10px 40px;
  background: linear-gradient(180deg, #6B4CFF, #4830b8);
  clip-path: polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0% 50%);
}

.feature-box {
  background: rgba(255, 255, 255, 0.03) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  transition: all 0.5s ease;
}

.feature-box:hover {
  transform: scale(1.02);
  background: rgba(107, 76, 255, 0.1) !important;
  border-color: #00FFC6 !important;
}
</style>