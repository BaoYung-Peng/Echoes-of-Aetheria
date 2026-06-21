<script setup lang="ts">
import { ref, onMounted } from 'vue';

const entropy = ref(0);
const icd = ref(0);
const isCollapsed = ref(false);
const logs = ref<string[]>(['導標者，系統就緒，請規劃戰術行為...']);

// 核心循環：每秒觸發
const tick = () => {
  if (icd.value > 0) icd.value--;
  setTimeout(tick, 1000);
};

const triggerAction = () => {
  if (icd.value === 0) {
    entropy.value = Math.min(entropy.value + 15, 100);
    icd.value = 18; // 設定 ICD 18s
    logs.value.unshift('執行戰術行為，產生 15 熵能，ICD 觸發 (18s)');
  } else {
    logs.value.unshift('行動被阻擋：ICD 冷卻中！');
  }
};

const triggerOverload = () => {
  entropy.value = 0;
  logs.value.unshift('!!! 激活過載模式：次元裂隙打開，輸出爆發 !!!');
  // 模擬懲罰
  isCollapsed.value = true;
  setTimeout(() => { isCollapsed.value = false; logs.value.unshift('虛脫結束，信念恢復，準備再次切換'); }, 6000);
};

onMounted(tick);
</script>

<template>
  <v-container class="pa-0">
    <v-card 
      class="pa-6 tactical-card" 
      elevation="3" 
      theme="dark" 
      variant="flat"
    >
      <v-card-title class="text-h6 font-weight-black text-secondary mb-2">
        戰術循環驗證器：ICD 18s 策略模擬
      </v-card-title>
      
      <p class="text-caption text-grey mb-4">
        透過模擬熵能累積，驗證「人格切換」後的 18s ICD 戰術循環極限。
      </p>

      <v-row align="center">
        <v-col cols="12" md="8">
          <v-progress-linear 
            :model-value="entropy" 
            height="25" 
            color="#6B4CFF" 
            striped
          >
            <template v-slot:default="{ value }">
              <strong>熵能: {{ Math.ceil(value) }}%</strong>
            </template>
          </v-progress-linear>
        </v-col>
        <v-col cols="12" md="4" class="text-right">
          <v-chip :color="icd > 0 ? 'grey' : '#00FFC6'" variant="tonal">
            ICD 狀態: {{ icd > 0 ? icd + 's 冷卻中' : '可觸發' }}
          </v-chip>
        </v-col>
      </v-row>

      <v-card-actions class="mt-6 px-0 d-flex gap-4">
        <v-btn 
          color="#00FFC6" 
          @click="triggerAction" 
          :disabled="isCollapsed" 
          variant="elevated" 
          class="font-weight-black"
        >
          執行戰術行為 (+15 熵能)
        </v-btn>
        
        <v-btn 
          color="error" 
          @click="triggerOverload" 
          :disabled="entropy < 100" 
          variant="outlined"
        >
          激活過載 (爆發)
        </v-btn>
      </v-card-actions>

      <v-divider class="my-5" color="secondary"></v-divider>
      
      <v-list 
        height="200" 
        style="overflow-y: auto; border-radius: 4px;" 
        :style="{ border: isCollapsed ? '2px solid rgba(255, 93, 143, 0.5)' : '1px solid rgba(255,255,255,0.1)' }"
      >
        <v-list-item 
          v-for="(log, i) in logs" 
          :key="i" 
          :title="log" 
          :class="{ 'log-overload': log.includes('過載'), 'log-collapsed': isCollapsed && i === logs.indexOf('虛脫結束') - 1 }"
        >
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<style scoped>
.tactical-card {
  /* 使用你的 main-content-bg 顏色作為基礎，加上玻璃霧化 */
  background: linear-gradient(135deg, #05070d 0%, #0b1020 46%, #150d27 100%) !important; 
  backdrop-filter: blur(10px);
  border: 1px solid rgba(107, 76, 255, 0.2) !important;
}

/* 如果需要，這裡可以加上更細微的日誌文字樣式 */
.log-overload {
  color: #ff5d8f !important; /* 裂隙核心的紅粉色 */
  font-weight: bold;
}
</style>