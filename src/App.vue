<script setup>
import { ref, onMounted } from 'vue';
import Navbar from './components/Navbar.vue';
import { useAudioManager } from './composables/useAudioManager';

const { playBgm, stop, setCategoryVolume, setEnabled } = useAudioManager();
const showPortfolio = ref(false);
const enableBgm = ref(true);
const language = ref('en');

const enterPortfolio = () => {
  showPortfolio.value = true

  setEnabled(enableBgm.value)

  if (enableBgm.value) {
    setCategoryVolume('bgm', 0.5)
    playBgm()
  }
}

onMounted(() => {
  setEnabled(false);
  stop('bgm');
});
</script>

<template>
  <v-app class="bg-black">
    <Navbar v-if="showPortfolio" />
    <v-main>
      <router-view v-if="showPortfolio" />

      <div v-else class="entry-screen">
        <div class="entry-card">
          <div class="entry-title">Echoes of Aetheria</div>
          <div class="entry-subtitle">Music Special Thanks</div>

          <div class="entry-copy" v-if="language === 'en'">
            <p>
              To create a more immersive, game-inspired portfolio experience, this website features background music
              generously shared by lNPLUSMUSIC (Andrii).
            </p>
            <p>
              Special thanks to Andrii for making high-quality music freely available to creators around the world.
              If you enjoy the music, please consider supporting the original creator through Pixabay.
            </p>
            <p class="entry-highlight">
              Background Music: <strong>Cyberpunk Futuristic City Music</strong><br />
              by <strong>lNPLUSMUSIC</strong>
            </p>
          </div>

          <div class="entry-copy" v-else>
            <p>
              為了營造更具沉浸感的遊戲作品集體驗，本網站使用了 lNPLUSMUSIC（Andrii）分享於 Pixabay 的背景音樂。
            </p>
            <p>
              特別感謝 Andrii 無償提供高品質音樂，讓全球創作者能夠在合法授權下使用於創作之中。
              若您喜歡這首音樂，也歡迎前往 Pixabay 支持原作者。
            </p>
            <p class="entry-highlight">
              背景音樂：<strong>Cyberpunk Futuristic City Music</strong><br />
              by <strong>lNPLUSMUSIC</strong>
            </p>
          </div>

          <div class="entry-actions">
            <label class="entry-checkbox">
              <input v-model="enableBgm" type="checkbox" />
              <span>{{ language === 'en' ? 'Enable Background Music' : '開啟背景音樂' }}</span>
            </label>

            <div class="entry-language-switch">
              <button :class="{ active: language === 'en' }" @click="language = 'en'">EN</button>
              <button :class="{ active: language === 'zh' }" @click="language = 'zh'">中文</button>
            </div>
          </div>

          <button class="entry-button" @click="enterPortfolio">
            {{ language === 'en' ? 'Enter Portfolio' : '進入作品集' }}
          </button>

          <div class="entry-footer">
            {{ language === 'en'
              ? 'Background music is used under the Pixabay Content License. All rights remain with the original creator.'
              : '本網站背景音樂依 Pixabay Content License 使用，音樂著作權仍歸原創作者所有。' }}
          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<style scoped>
.bg-black {
  background: #03050a;
}

.entry-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background:
    radial-gradient(circle at top, rgba(0, 255, 198, 0.16), transparent 40%),
    linear-gradient(135deg, #04060d 0%, #0a1124 55%, #03050a 100%);
}

.entry-card {
  width: min(720px, 100%);
  padding: 36px;
  border-radius: 24px;
  background: rgba(6, 10, 24, 0.82);
  border: 1px solid rgba(0, 255, 198, 0.24);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.42);
  backdrop-filter: blur(24px);
  color: #f3f6ff;
}

.entry-title {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #00ffc6;
  text-align: center;
  margin-bottom: 8px;
}

.entry-subtitle {
  text-align: center;
  font-size: 1.1rem;
  margin-bottom: 20px;
  color: #8ee8da;
}

.entry-copy {
  display: grid;
  gap: 12px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.88);
  margin-bottom: 22px;
}

.entry-highlight {
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(0, 255, 198, 0.1);
  border: 1px solid rgba(0, 255, 198, 0.2);
}

.entry-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.entry-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #e6ffff;
  font-weight: 600;
}

.entry-language-switch {
  display: inline-flex;
  gap: 8px;
}

.entry-language-switch button {
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.04);
  color: #f3f6ff;
  padding: 6px 10px;
  border-radius: 999px;
  cursor: pointer;
}

.entry-language-switch button.active {
  background: rgba(0, 255, 198, 0.16);
  border-color: rgba(0, 255, 198, 0.32);
  color: #00ffc6;
}

.entry-button {
  width: 100%;
  padding: 12px 18px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #00ffc6, #6f79ff);
  color: #03111b;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  margin-top: 4px;
}

.entry-footer {
  margin-top: 16px;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.58);
  line-height: 1.5;
  text-align: center;
}
</style>