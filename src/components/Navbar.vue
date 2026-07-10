<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { useRoute } from 'vue-router'
import { useAudioManager } from '../composables/useAudioManager'

const { mobile } = useDisplay()
const drawer = ref(false)
const route = useRoute()
const { play, stop, setCategoryVolume } = useAudioManager()
const showVolumeMenu = ref(false)
const bgmEnabled = ref(false)
const volume = ref(0.5)

const bgmFileName = 'lnplusmusic-cyberpunk-futuristic-city-music-323171.mp3'
const bgmPath = `/audio/bgm/${encodeURIComponent(bgmFileName)}`

const navItems = [
  { title: '首頁', to: '/' },
  { title: '玩法介紹', to: '/gameplay' },
  { title: '世界觀', to: '/theWorldView' },
  { title: '次元切換', to: '/dimension-switch' },
  { title: '測試演示', to: '/gameplan' },
  { title: '履歷', to: '/resume' },
]

const closeDrawer = () => {
  drawer.value = false
}

const toggleBgm = () => {
  if (bgmEnabled.value) {
    stop('bgm')
    bgmEnabled.value = false
    return
  }

  setCategoryVolume('bgm', volume.value)
  play('bgm', bgmPath, { loop: true })
  bgmEnabled.value = true
}

const updateVolume = (value: number) => {
  volume.value = value
  setCategoryVolume('bgm', value)
}

onMounted(() => {
  volume.value = 0.5
  setCategoryVolume('bgm', 0.5)
  play('bgm', bgmPath, { loop: true })
  bgmEnabled.value = true
})

const activePath = computed(() => route.path)
const isActive = (path: string) => activePath.value === path
</script>

<template>
  <div>
    <v-app-bar flat class="glass-nav" color="transparent" height="76">
      <v-btn
        v-if="mobile"
        icon
        class="nav-hamburger"
        @click="drawer = !drawer"
      >
        <v-icon size="24">mdi-menu</v-icon>
      </v-btn>

      <div class="brand-group">
        <span class="brand-mark"></span>
        <div class="brand-text">
          <div class="brand-title">Echoes of Aetheria</div>
          <div class="brand-subtitle">Aetheria Vanguard</div>
        </div>
      </div>

      <v-spacer />

      <v-menu
        v-model="showVolumeMenu"
        :close-on-content-click="false"
        location="bottom end"
        offset="8"
      >
        <template #activator="{ props }">
          <v-btn
            v-bind="props"
            icon
            class="audio-toggle-btn"
            :color="bgmEnabled ? '#00ffc6' : 'transparent'"
            variant="text"
            @click="showVolumeMenu = !showVolumeMenu"
          >
            <v-icon size="22">{{ bgmEnabled ? 'mdi-volume-high' : 'mdi-volume-off' }}</v-icon>
          </v-btn>
        </template>

        <div class="audio-panel">
          <div class="audio-panel-header">
            <span class="audio-panel-title">背景音樂</span>
            <span class="audio-panel-value">{{ Math.round(volume * 100) }}%</span>
          </div>

          <v-slider
            v-model="volume"
            class="audio-volume-slider"
            min="0"
            max="1"
            step="0.01"
            hide-details
            density="compact"
            @update:model-value="updateVolume"
          />

          <div class="audio-panel-actions">
            <v-btn
              size="small"
              variant="text"
              class="audio-panel-action"
              @click="toggleBgm"
            >
              {{ bgmEnabled ? '靜音' : '播放' }}
            </v-btn>
          </div>
        </div>
      </v-menu>

      <template v-if="!mobile">
        <v-btn
          v-for="item in navItems"
          :key="item.to"
          variant="text"
          :to="item.to"
          class="desktop-nav-btn"
          :class="{ 'active-link': isActive(item.to) }"
        >
          {{ item.title }}
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="left"
      class="mobile-drawer"
      width="280"
    >
      <div class="drawer-header">
        <div class="drawer-title">主選單</div>
        <div class="drawer-subtitle">探索次元，直達核心</div>
      </div>
      <v-list density="comfortable" nav>
        <v-list-item
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="mobile-nav-item"
          :class="{ 'active-link': isActive(item.to) }"
          @click="closeDrawer"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style scoped>
.glass-nav {
  backdrop-filter: blur(20px);
  background: rgba(6, 8, 20, 0.82) !important;
  border-bottom: 1px solid rgba(0, 255, 198, 0.18);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.32);
}

.brand-group {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-mark {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: radial-gradient(circle at top left, #7b7dff, #00ffc6);
  box-shadow: 0 0 24px rgba(0, 255, 198, 0.28);
}

.brand-text {
  display: grid;
  gap: 2px;
}

.brand-title {
  color: #f3f6ff;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.brand-subtitle {
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.desktop-nav-btn {
  margin-left: 10px;
  min-height: 46px;
  border-radius: 999px;
  padding: 0 18px;
  color: rgba(255, 255, 255, 0.88);
  font-weight: 600;
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.desktop-nav-btn:hover {
  background: rgba(0, 255, 198, 0.1);
  color: #e6ffff;
  transform: translateY(-1px);
}

.desktop-nav-btn.active-link {
  background: linear-gradient(135deg, rgba(0, 255, 198, 0.22), rgba(35, 63, 255, 0.16));
  color: #00ffc6;
  box-shadow: inset 0 0 0 1px rgba(0, 255, 198, 0.28);
}

.nav-hamburger {
  margin-left: 12px;
  margin-right: 8px;
  width: 46px;
  height: 46px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: rgba(0, 255, 198, 0.08);
  border: 1px solid rgba(0, 255, 198, 0.2);
  box-shadow: 0 0 18px rgba(0, 255, 198, 0.12);
}

.nav-hamburger .v-icon {
  color: #00ffc6;
}

.audio-toggle-btn {
  margin-right: 8px;
  border-radius: 999px;
  background: rgba(0, 255, 198, 0.08);
  border: 1px solid rgba(0, 255, 198, 0.2);
}

.audio-toggle-btn .v-icon {
  color: #00ffc6;
}

.audio-panel {
  width: 220px;
  padding: 14px;
  border-radius: 16px;
  background: rgba(6, 10, 24, 0.92);
  border: 1px solid rgba(0, 255, 198, 0.2);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.28);
  backdrop-filter: blur(18px);
}

.audio-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  color: #f3f6ff;
  font-size: 0.9rem;
  font-weight: 700;
}

.audio-panel-value {
  color: #00ffc6;
  font-size: 0.9rem;
}

.audio-volume-slider {
  color: #00ffc6;
}

.audio-volume-slider :deep(.v-slider-thumb) {
  color: #00ffc6;
}

.audio-volume-slider :deep(.v-slider-track__fill) {
  background: linear-gradient(90deg, #00ffc6, #7b7dff);
}

.audio-panel-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 6px;
}

.audio-panel-action {
  color: #00ffc6;
}

.mobile-drawer {
  background: rgba(8, 12, 26, 0.96) !important;
  backdrop-filter: blur(22px);
  border-right: 1px solid rgba(0, 255, 198, 0.12);
  box-shadow: 0 0 80px rgba(0, 0, 0, 0.36);
  color: rgba(255, 255, 255, 0.94);
}

.drawer-header {
  padding: 22px 20px 10px;
}

.drawer-title {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #ffffff;
}

.drawer-subtitle {
  margin-top: 6px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.4;
}

.mobile-nav-item {
  border-radius: 16px;
  margin: 10px 14px;
  min-height: 52px;
  padding: 0 16px;
  transition: background 0.18s ease, transform 0.18s ease;
  background: rgba(255, 255, 255, 0.02);
}

.mobile-nav-item:hover {
  background: rgba(0, 255, 198, 0.08);
  transform: translateX(2px);
}

.mobile-nav-item.active-link {
  background: rgba(0, 255, 198, 0.14);
  border: 1px solid rgba(0, 255, 198, 0.24);
}

.mobile-nav-item .v-list-item__title {
  color: rgba(255, 255, 255, 0.94) !important;
  font-weight: 600;
}

.mobile-nav-item.active-link .v-list-item__title {
  color: #00ffc6 !important;
}
</style>
