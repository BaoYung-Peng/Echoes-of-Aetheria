<script setup lang="ts">
import { ref, onMounted } from 'vue';

const entropy = ref(0);
const icd = ref(0);
const isCollapsed = ref(false);
const logs = ref<string[]>(['系統就緒，請執行戰術行為...']);

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
  logs.value.unshift('!!! 激活過載模式：無視護盾，輸出爆發 !!!');
  // 模擬懲罰
  isCollapsed.value = true;
  setTimeout(() => { isCollapsed.value = false; logs.value.unshift('虛脫結束，恢復戰鬥'); }, 6000);
};

onMounted(tick);
</script>

<template>
  <v-container>
    <v-card class="pa-4" elevation="3">
      <v-card-title>戰鬥循環 ICD 模擬器</v-card-title>
      
      <v-row>
        <v-col cols="12" md="6">
          <v-progress-linear :model-value="entropy" height="25" color="purple" striped>
            <template v-slot:default="{ value }">
              <strong>熵能: {{ Math.ceil(value) }}%</strong>
            </template>
          </v-progress-linear>
        </v-col>
        <v-col cols="12" md="6">
          <v-chip :color="icd > 0 ? 'grey' : 'success'">
            ICD 狀態: {{ icd > 0 ? icd + 's 冷卻中' : '可觸發' }}
          </v-chip>
        </v-col>
      </v-row>

      <v-card-actions class="mt-4">
        <v-btn color="primary" @click="triggerAction" :disabled="isCollapsed">
          執行戰術行為 (+15 熵能)
        </v-btn>
        <v-btn color="error" @click="triggerOverload" :disabled="entropy < 100">
          激活過載 (爆發)
        </v-btn>
      </v-card-actions>

      <v-divider class="my-4"></v-divider>
      <v-list height="200" style="overflow-y: auto;">
        <v-list-item v-for="(log, i) in logs" :key="i" :title="log"></v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

