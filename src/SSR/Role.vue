<script setup lang="ts">
import { ref, computed } from 'vue'
import cute1Image from '../assets/images/Cute1.png'
import cute2Image from '../assets/images/Cute2.png'
import cute3Image from '../assets/images/Cute3.png'

// 外部字體與客製化樣式通常放在全域 CSS 中，此處提供對應介面
interface Skill {
  icon: string
  name: string
  desc: string
}

interface Voice {
  label: string
  text: string
}

interface Character {
  name: string
  subtitle: string
  rarity: string
  world: string
  role: string
  position: string
  elements: string
  quote: string
  height: string
  race: string
  weapon: string
  cv: string
  desc: string
  prompt: string
  mechanics: string[]
  emoji: string
  placeholder: string
  image: string
  skills: Skill[]
  voices: Voice[]
}

// 完整的角色資料庫
const characters = ref<Record<string, Character>>({
  hacker: {
    name: "流光駭客",
    subtitle: "STREAMING HACKER (CYBER GLITCH)",
    rarity: "SSR 限定登場",
    world: "星刻市 / 現實維度",
    role: "特殊 / 弱點標記",
    position: "數據破綻者",
    elements: "主要屬性: 特殊 / 連鎖支援",
    quote: "「數據不會說謊，人卻會。讓我來解開這座城市的秘密。」",
    height: "154 cm",
    race: "人類",
    weapon: "虛擬音波鍵盤",
    cv: "悠木碧",
    desc: "擅長穿梭於星刻市資料雲塔與維度裂隙之間的破綻偵查者。她透過數據流標記弱點，讓隊伍能在 4+1 戰陣中引發精準連鎖。",
    prompt: "masterpiece, best quality, 1girl, twin tails, pink and teal hair, cyberpunk clothing, cyber goggles, holographic screens, futuristic urban skyline, neon teal lighting, anime style, high detail.",
    mechanics: [
      "弱點標記引發 4+1 連鎖",
      "現實維度數據滲透，強化下一次破盾",
      "提供全隊能量與支援增益"
    ],
    emoji: "💻",
    placeholder: "[立繪模擬：流光駭客]",
    image: cute1Image,
    skills: [
      { icon: "💥", name: "普通攻擊：代碼干涉", desc: "發射數據流並標記弱點，使目標在下一次連鎖傷害中承受更多傷害。" },
      { icon: "⚡", name: "戰技：系統超載", desc: "短暫提升全隊技能效率，並在都市模式下強化下一次破盾效果。" },
      { icon: "🌐", name: "終結技：流光天幕", desc: "駭入戰場，改寫空間規則，對所有敵人造成屬性傷害並降低防禦。" }
    ],
    voices: [
      { label: "🔊 初次見面", text: "「唷！今天又要入侵哪台伺服器？事先聲明，本小姐收費可是很貴的！」" },
      { label: "🔊 關於代碼", text: "「程式碼是世界上唯一完美的語言，只要輸入正確，它就不會背叛你。」" }
    ]
  },
  guardian: {
    name: "星刻守護者",
    subtitle: "GUARDIAN OF STAR CARVING",
    rarity: "SSR 限定登場",
    world: "星刻市 / 現實維度",
    role: "防禦 / 場地改寫",
    position: "前排守護",
    elements: "主要屬性: 秩序 / 場地",
    quote: "「拜託~為什麼我要遇到這種倒楣事」",
    height: "165 cm",
    race: "人類",
    weapon: "冰晶汐刃",
    cv: "石川由依",
    desc: "身為星刻市的守護者，她以冰晶刃在現實與幻界之間劃出防線。她的技能能重塑場地，讓 4+1 隊伍在次元切換時保有戰術空間。",
    prompt: "masterpiece, best quality, 1girl, silver hair, purple tactical armor, glowing ice greatsword, neon city street, glass mist, anime style, high detail, sharp focus.",
    mechanics: [
      "場地轉換時提供防守與路徑重塑",
      "在現實維度保持隊伍站位穩定",
      "連鎖支援可打斷敵方異界流程"
    ],
    emoji: "🛡️",
    placeholder: "[立繪模擬：星刻守護者]",
    image: cute2Image,
    skills: [
      { icon: "🪓", name: "普通攻擊：冰晶突刺", desc: "快速突刺單體目標，並在被命中的敵人周圍生成冰晶防護場。" },
      { icon: "🛡️", name: "戰技：守護之冰壁", desc: "構築防禦力場，抵擋遠程攻擊並改變場地屬性，為隊友提供連鎖觸發支持。" },
      { icon: "❄️", name: "終結技：冰河星辰", desc: "以冰河之力重塑戰場，對全體敵人造成範圍傷害並減速，同時短暫凍結部分異界效果。" }
    ],
    voices: [
      { label: "🔊 初次見面", text: "「可以不要天天加班嗎？這種事不要找我比較好。」" },
      { label: "🔊 戰鬥信念", text: "「劍刃是為了信念而揮舞，並非為了發洩仇恨。」" }
    ]
  },
  guide: {
    name: "幻境導師",
    subtitle: "THE ETHEREAL GUIDE (ELF SCHOLAR)",
    rarity: "SSR 限定登場",
    world: "阿爾卡迪亞 / 異界維度",
    role: "支援 / 幻境引導",
    position: "後排輔助",
    elements: "主要屬性: 星魂 / 幻境",
    quote: "「夢境與真實、只有一線之隔。看破虛幻、便是真實。旅人，你準備好在我的槍尖下直面靈魂的倒影了嗎？」",
    height: "168 cm",
    race: "純血妖精族 (Elf)",
    weapon: "星輝交織之長槍",
    cv: "能登麻美子",
    desc: "古老阿爾卡迪亞的靈魂導師，她操控幻境與星辰力量，引導導標者在異界中找到弱點與共鳴。她的存在讓隊伍在次元切換時能保持隊伍輔助節奏。",
    prompt: "masterpiece, best quality, 1girl, elf, long flowing blonde hair, glowing purple eyes, ornate spear, ethereal violet robes, floating runes, dreamlike mist, anime style, high detail.",
    mechanics: [
      "幻境引導異界隊伍能量流",
      "降低敵方異界抗性並擴大弱點效果",
      "連鎖終結技提供全隊護盾與充能"
    ],
    emoji: "✨",
    placeholder: "[立繪模擬：幻境導師]",
    image: cute3Image,
    skills: [
      { icon: "🌟", name: "普通攻擊：星隕刺擊", desc: "以星辰長槍進行連續刺擊，造成神聖屬性傷害並附加幻境印記。" },
      { icon: "🔮", name: "戰技：鏡花水月", desc: "展開幻境法陣，讓目標進入低防禦狀態並減少異界抗性。" },
      { icon: "🕊️", name: "終結技：羽翼綻放・靈魂倒影", desc: "引爆幻境力量，為全隊提供能量充能、護盾與短暫異界增幅。" }
    ],
    voices: [
      { label: "🔊 初次見面", text: "「我是引路者，亦是你的歸宿。不用害怕這迷茫的深淵，我會引導你。」" },
      { label: "🔊 關於長槍", text: "「這柄長槍並非用於殺戮，而是用來劃破兩界之間虛假的帷幕。」" }
    ]
  }
})

// 當前狀態控制
const currentCharacterId = ref<string>('guardian')
const activeTab = ref<string>('profile')
const snackbar = ref<boolean>(false)

// 取得當前角色物件
const currentCharacter = computed(() => characters.value[currentCharacterId.value])

// 計算屬性：將履歷轉換為容易跑迴圈的格式
const profileDetails = computed(() => {
  return {
    '身高': currentCharacter.value.height,
    '種族': currentCharacter.value.race,
    '戰陣定位': currentCharacter.value.role,
    '戰場位置': currentCharacter.value.position,
    '元素屬性': currentCharacter.value.elements,
    '專屬武器': currentCharacter.value.weapon,
    '配音 (CV)': currentCharacter.value.cv
  }
})

// 切換角色並重設分頁
function selectCharacter(id: string) {
  currentCharacterId.value = id
  activeTab.value = 'profile'
}

// 複製 Prompt 功能
async function copyPrompt() {
  try {
    await navigator.clipboard.writeText(currentCharacter.value.prompt)
    snackbar.value = true
  } catch (err) {
    console.error('複製失敗: ', err)
  }
}

// 樣式對應輔助函式
function getActiveIdClass(id: string): string {
  if (id === 'hacker') return 'border-cyan-500/40 bg-cyan-950/10 text-cyan-400'
  if (id === 'guardian') return 'card-glass-active'
  if (id === 'guide') return 'border-purple-500/40 bg-purple-950/10 text-purple-400'
  return ''
}

function getTagColorClass(id: string): string {
  if (id === 'hacker') return 'text-amber-500'
  if (id === 'guardian') return 'text-cyan-400'
  if (id === 'guide') return 'text-purple-400'
  return ''
}

function getSkillIconClass(index: number): string {
  if (index === 0) return 'bg-purple-950/80 border-purple-500/30'
  if (index === 1) return 'bg-amber-950/80 border-amber-500/30'
  if (index === 2) return 'bg-pink-950/80 border-pink-500/30'
  return ''
}
</script>

<template>
  <v-container class="py-12 px-4 md:px-8 max-w-7xl">
    <div class="text-center mb-12">
      <h2 class="text-5xl font-black text-white tracking-widest font-serif-title glow-gold">
        登場角色
      </h2>
      <p class="text-slate-400 mt-3 tracking-widest uppercase text-xs">
        Arkadia Database & Character Showcase
      </p>
      <div class="glow-line-gold w-64 mx-auto mt-6"></div>
    </div>

    <v-row gap="6">
      <v-col cols="12" lg="4" class="space-y-4">
        <p class="text-xs font-bold text-amber-500/80 tracking-widest uppercase px-1">
          角色定位 / 戰陣職能
        </p>

        <v-card
          v-for="(char, id) in characters"
          :key="id"
          variant="outlined"
          :class="[
            'card-glass p-4 rounded-xl cursor-pointer transition-all border-1',
            currentCharacterId === id ? getActiveIdClass(id) : 'border-white/10'
          ]"
          @click="selectCharacter(id)"
        >
          <div class="d-flex align-center space-x-4">
            <div class="w-16 h-16 bg-gray-900 rounded-xl flex-shrink-0 d-flex align-center justify-center text-2xl border border-white/10">
              {{ char.emoji }}
            </div>
            <div class="overflow-hidden">
              <span :class="['text-[10px] font-bold tracking-wider uppercase', getTagColorClass(id)]">
                {{ char.world }}
              </span>
              <h4 :class="['text-lg font-black text-white mt-0.5', currentCharacterId === id && id === 'guardian' ? 'glow-gold' : '']">
                {{ char.name }}
              </h4>
              <p class="text-xs text-slate-400 mt-1 truncate max-w-[200px]">
                {{ char.role }}
              </p>
            </div>
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" lg="8">
        <v-row>
          <v-col cols="12" md="5" class="d-flex flex-column space-y-6">
            <v-card variant="outlined" class="card-glass p-6 rounded-2xl relative overflow-hidden">
              <div class="h-80 bg-gray-950 rounded-xl d-flex align-center justify-center text-slate-500 border border-white/5 relative overflow-hidden">
                <span class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></span>
                <v-img
                  v-if="currentCharacter.image"
                  :src="currentCharacter.image"
                  height="100%"
                  class="object-cover"
                />
                <div v-else class="relative z-20 text-center px-4">
                  <span class="text-6xl mb-4 block">{{ currentCharacter.emoji }}</span>
                  <span class="text-xs tracking-widest text-slate-400">{{ currentCharacter.placeholder }}</span>
                </div>
              </div>

              <div class="mt-6">
                <div class="d-flex justify-space-between align-center">
                  <div>
                    <span class="text-[10px] font-bold tracking-widest text-amber-500 bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/20">
                      {{ currentCharacter.rarity }}
                    </span>
                  </div>
                  <span class="text-xs font-bold text-slate-300 font-serif-title">
                    {{ currentCharacter.world }}
                  </span>
                </div>
                <h3 class="text-3xl font-black text-white mt-3 font-serif-title glow-gold">
                  {{ currentCharacter.name }}
                </h3>
                <p class="text-[10px] tracking-wider text-slate-400 uppercase mt-1">
                  {{ currentCharacter.subtitle }}
                </p>
                <div class="mt-3 text-xs text-slate-300 tracking-wider">
                  <span class="font-bold text-white">戰陣定位：</span>{{ currentCharacter.role }}
                  <span class="mx-2">•</span>
                  <span class="font-bold text-white">位置：</span>{{ currentCharacter.position }}
                </div>
              </div>
            </v-card>

            <v-card variant="outlined" class="card-glass p-5 rounded-2xl">
              <div class="d-flex justify-space-between align-center mb-3">
                <span class="text-xs font-bold text-amber-500 tracking-wider">🌟 完美二次元藝術提示詞</span>
                <span class="text-[10px] text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded-md">無暇版</span>
              </div>
              <div class="bg-black/60 p-3 rounded-lg border border-slate-800/80">
                <p class="text-[11px] text-slate-400 font-mono select-all leading-relaxed break-words h-24 overflow-y-auto">
                  {{ currentCharacter.prompt }}
                </p>
              </div>
              <v-btn
                block
                variant="outlined"
                color="amber-darken-2"
                class="mt-3 text-none text-xs font-bold tracking-wider"
                @click="copyPrompt"
              >
                複製完整繪圖提示詞
              </v-btn>
            </v-card>
          </v-col>

          <v-col cols="12" md="7" class="d-flex flex-column justify-center">
            <v-tabs
              v-model="activeTab"
              bg-color="transparent"
              color="amber-darken-2"
              grow
              class="mb-6 border-b border-white/5"
            >
              <v-tab value="profile" class="text-sm font-bold tracking-widest text-slate-400">角色履歷</v-tab>
              <v-tab value="skills" class="text-sm font-bold tracking-widest text-slate-400">技能星盤</v-tab>
              <v-tab value="voice" class="text-sm font-bold tracking-widest text-slate-400">幻境語音</v-tab>
            </v-tabs>

            <v-window v-model="activeTab" class="fade-transition">
              <v-window-item value="profile" class="space-y-6">
                <p class="text-sm text-slate-200 font-medium italic border-l-2 border-amber-500 pl-4 leading-relaxed">
                  {{ currentCharacter.quote }}
                </p>

                <v-row dense>
                  <v-col cols="6" v-for="(val, label) in profileDetails" :key="label">
                    <div class="bg-white/5 p-4 rounded-xl border border-white/5">
                      <span class="text-xs text-slate-400 block mb-1">{{ label }}</span>
                      <span class="text-sm font-bold text-white">{{ val }}</span>
                    </div>
                  </v-col>
                </v-row>

                <v-card variant="outlined" class="card-glass p-5 rounded-2xl border border-white/5">
                  <h4 class="text-amber-500 font-bold mb-3 text-xs d-flex align-center">
                    <span class="inline-block w-2 h-2 rounded-full bg-amber-500 mr-2"></span> 檔案庫解密資料
                  </h4>
                  <p class="text-slate-300 text-xs leading-relaxed mb-4">
                    {{ currentCharacter.desc }}
                  </p>
                  <div class="space-y-2">
                    <div v-for="(item, index) in currentCharacter.mechanics" :key="index" class="flex items-start space-x-2">
                      <span class="text-amber-400">•</span>
                      <p class="text-slate-300 text-xs leading-relaxed">{{ item }}</p>
                    </div>
                  </div>
                </v-card>
              </v-window-item>

              <v-window-item value="skills" class="space-y-4">
                <div
                  v-for="(skill, index) in currentCharacter.skills"
                  :key="index"
                  class="d-flex align-center space-x-4 bg-white/5 p-4 rounded-xl border border-white/5"
                >
                  <div :class="['w-12 h-12 rounded-full border d-flex align-center justify-center text-xl flex-shrink-0', getSkillIconClass(index)]">
                    {{ skill.icon }}
                  </div>
                  <div>
                    <h5 :class="['font-bold text-sm', index === 1 ? 'text-amber-400' : index === 2 ? 'text-purple-400' : 'text-white']">
                      {{ skill.name }}
                    </h5>
                    <p class="text-xs text-slate-400 mt-1">{{ skill.desc }}</p>
                  </div>
                </div>
              </v-window-item>

              <v-window-item value="voice" class="space-y-4">
                <v-card variant="outlined" class="card-glass p-5 rounded-2xl space-y-4">
                  <div
                    v-for="(voice, index) in currentCharacter.voices"
                    :key="index"
                    :class="{ 'border-b border-white/5 pb-3': index === 0 }"
                  >
                    <span :class="['text-xs font-bold block mb-1', index === 0 ? 'text-amber-500' : 'text-purple-400']">
                      {{ voice.label }}
                    </span>
                    <p class="text-xs text-slate-300 leading-relaxed">{{ voice.text }}</p>
                  </div>
                </v-card>
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-snackbar
      v-model="snackbar"
      timeout="2500"
      color="amber-darken-2"
      rounded="pill"
      class="text-black font-bold text-center"
    >
      已成功複製繪圖提示詞！
    </v-snackbar>
  </v-container>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@300;400;500;700;900&family=Cinzel:wght@400;700;900&display=swap');

/* 保留原本客製化的酷炫視覺樣式 */
:deep(body) {
  background-color: #030205 !important;
}

.font-serif-title {
  font-family: 'Cinzel', 'Noto Sans TC', serif;
}

.glow-gold {
  text-shadow: 0 0 15px rgba(245, 158, 11, 0.5);
}

.card-glass {
  background: rgba(255, 255, 255, 0.02) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.card-glass-active {
  background: rgba(245, 158, 11, 0.05) !important;
  border-color: rgba(245, 158, 11, 0.4) !important;
  box-shadow: inset 0 0 15px rgba(245, 158, 11, 0.1);
}

.glow-line-gold {
  background: linear-gradient(90deg, transparent, #D97706, #A855F7, transparent);
  height: 2px;
}

.fade-transition {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

:deep(.v-tab) {
  text-transform: none !important;
}
</style>