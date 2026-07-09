<script setup lang="ts">
import { computed, ref } from 'vue'
import cute1Image from '../assets/images/Cute1.png'
import cute2Image from '../assets/images/Cute2.png'
import cute3Image from '../assets/images/Cute3.png'
import alter1Image from '../assets/images/Alter1.png'
import alter2Image from '../assets/images/Alter2.png'
import alter3Image from '../assets/images/Alter3.png'

type DimensionMode = 'city' | 'aether'
type TabKey = 'profile' | 'combat' | 'bond'

interface Skill {
  name: string
  type: string
  city: string
  aether: string
}

interface BossPlan {
  title: string
  desc: string
}

interface Character {
  id: string
  name: string
  englishName: string
  rarity: string
  archetype: string
  cityPersona: string
  aetherPersona: string
  cityRole: string
  aetherRole: string
  position: string
  weapon: string
  cv: string
  height: string
  race: string
  cityQuote: string
  aetherQuote: string
  cityDesc: string
  aetherDesc: string
  imageCity: string
  imageAether: string
  metrics: {
    chain: number
    support: number
    break: number
  }
  chainSteps: string[]
  skills: Skill[]
  bossPlans: BossPlan[]
  bondTruth: string
  assetPrompt: string
}

const STAR_CITY = '#00FFC6'
const ARCADIA = '#6B4CFF'

const characters: Character[] = [
  {
    id: 'hacker',
    name: '流光駭客',
    englishName: 'Streaming Hacker',
    rarity: 'SSR 限定登場',
    archetype: '洞察 / Insight',
    cityPersona: '分析師',
    aetherPersona: '揭露者',
    cityRole: '資料雲塔滲透、弱點標記',
    aetherRole: '裂隙破譯、異界弱點揭露',
    position: '後排支援',
    weapon: '虛擬音波鍵盤',
    cv: '悠木碧',
    height: '154 cm',
    race: '人類',
    cityQuote: '「數據不會說謊，人卻會。讓我來解開這座城市的秘密。」',
    aetherQuote: '「那些被藏起來的弱點，現在全部顯影。」',
    cityDesc: '現實中的她是星刻市資料雲塔的沉默駭客，擅長用資料流拆解任務線索，將敵方行動轉換為可讀取的弱點節點。',
    aetherDesc: '進入阿爾卡迪亞後，她會將裂隙訊號轉譯為戰場標記，讓 4+1 戰陣能在固定規則下穩定觸發破盾與擴散連鎖。',
    imageCity: cute1Image,
    imageAether: alter1Image,
    metrics: { chain: 95, support: 88, break: 91 },
    chainSteps: ['資料標記', '弱點揭露', '援護插入', '裂隙擴散'],
    skills: [
      {
        name: '代碼干涉',
        type: '普通攻擊',
        city: '標記目標資料破綻，使下一次隊伍技能命中時提高破盾效率。',
        aether: '將破綻轉化為裂隙印記，連鎖觸發時擴散到相鄰敵人。',
      },
      {
        name: '系統超載',
        type: '戰技',
        city: '提高全隊技能循環效率，並保留下一段援護能量。',
        aether: '短暫展開資料天幕，使被揭露敵人受到固定倍率的連鎖增傷。',
      },
      {
        name: '流光天幕',
        type: '終結技',
        city: '鎖定所有目標弱點資訊，提供導標者戰術確認窗口。',
        aether: '改寫裂隙路徑，讓下一次 4+1 連鎖必定沿弱點節點傳導。',
      },
    ],
    bossPlans: [
      { title: '弱點連鎖', desc: '先以資料標記定位核心弱點，再讓援護角插入破盾。' },
      { title: '場地機制', desc: '利用資料雲塔節點降低敵方防護，穩定觸發裂隙擴散。' },
      { title: '職能替代', desc: '可替代傳統破盾位，讓隊伍保留更多治療或控制空間。' },
    ],
    bondTruth: '好感度滿級後揭露：她並非單純駭入雲塔，而是在追查第一位導標者留下的失蹤座標。',
    assetPrompt: 'neon cyber hacker girl, translucent keyboard weapon, cyan data stream, purple aether glitch, glassmorphism UI, anime RPG key visual',
  },
  {
    id: 'guardian',
    name: '星刻守護者',
    englishName: 'Guardian of Star Carving',
    rarity: 'SSR 限定登場',
    archetype: '守護 / Guardian',
    cityPersona: '防禦者',
    aetherPersona: '破盾者',
    cityRole: '隊伍站位保護、護盾維持',
    aetherRole: '防線粉碎、場地改寫',
    position: '前排守護',
    weapon: '冰晶汐刃',
    cv: '石川由依',
    height: '165 cm',
    race: '人類',
    cityQuote: '「拜託，為什麼我要遇到這種倒楣事。」',
    aetherQuote: '「劍刃是為了信念而揮舞。退後，這裡交給我。」',
    cityDesc: '現實中是星芒科技的上班族，負責在危機中維持隊伍站位與資源節奏，是新手理解 4+1 戰陣的防守核心。',
    aetherDesc: '異界人格覺醒後，她的防守邏輯反轉為破盾推進，能切開符文地脈，替隊友創造固定且可預測的輸出窗口。',
    imageCity: cute2Image,
    imageAether: alter2Image,
    metrics: { chain: 82, support: 94, break: 96 },
    chainSteps: ['冰壁站位', '承傷穩定', '地脈切開', '破盾窗口'],
    skills: [
      {
        name: '冰晶突刺',
        type: '普通攻擊',
        city: '生成短時防護場，降低隊伍受到的連續傷害。',
        aether: '突刺變為破盾斬擊，對符文護甲造成固定破壞值。',
      },
      {
        name: '守護之冰壁',
        type: '戰技',
        city: '重排隊伍站位，讓援護角能在安全節點進場。',
        aether: '冰壁碎裂成地形裂痕，讓敵方弱點暴露一回合。',
      },
      {
        name: '冰河星辰',
        type: '終結技',
        city: '凍結敵方高威脅行動，為隊伍重整節奏。',
        aether: '改寫戰場地形，使下一輪破盾、控制與援護技能形成連鎖。',
      },
    ],
    bossPlans: [
      { title: '護盾節奏', desc: '在 Boss 蓄力前建立冰壁，吸收壓力並保存援護能量。' },
      { title: '地形破解', desc: '切開符文地脈，使場地從防守區轉為破盾區。' },
      { title: '隊形替換', desc: '用守護者承擔前排與破盾雙職能，釋放後排編成空間。' },
    ],
    bondTruth: '好感度滿級後揭露：她在星刻市保護的並不是公司機密，而是一段會導致維度坍塌的記憶備份。',
    assetPrompt: 'anime guardian girl, crystalline blade, cyan urban office uniform, purple aether armor, defensive stance, neon glass city, tactical RPG portrait',
  },
  {
    id: 'guide',
    name: '幻境導師',
    englishName: 'Ethereal Guide',
    rarity: 'SSR 限定登場',
    archetype: '意志 / Will',
    cityPersona: '反制者',
    aetherPersona: '治療者',
    cityRole: '行動反制、節奏修正',
    aetherRole: '救贖護盾、星辰充能',
    position: '後排輔助',
    weapon: '星織之槍',
    cv: '能登麻美子',
    height: '178 cm',
    race: '純血妖精族',
    cityQuote: '「夢境與真實，只有一線之隔。」',
    aetherQuote: '「我是引路者，亦是你的歸宿。不要害怕深淵。」',
    cityDesc: '她在星刻市以地下學者的身分收集夢境殘響，能透過反制敵方行動讓隊伍安全跨過高壓回合。',
    aetherDesc: '異界中她會展開星織結界，將不穩定的幻境力量轉換為護盾、充能與弱點共鳴，是長線 Boss 戰的穩定核心。',
    imageCity: cute3Image,
    imageAether: alter3Image,
    metrics: { chain: 89, support: 97, break: 79 },
    chainSteps: ['夢境迷霧', '行動反制', '星辰護盾', '靈魂倒影'],
    skills: [
      {
        name: '星隕刺擊',
        type: '普通攻擊',
        city: '以星痕印記干擾敵方行動序，降低下一次高威脅技能成功率。',
        aether: '星痕轉為治癒節點，使隊友攻擊弱點時回復少量能量。',
      },
      {
        name: '鏡花水月',
        type: '戰技',
        city: '製造夢境迷霧，反制敵方鎖定並修正隊伍站位。',
        aether: '展開救贖結界，讓承傷角色獲得固定值護盾與抗性。'
      },
      {
        name: '靈魂倒影',
        type: '終結技',
        city: '讀取敵方行動意圖，提供導標者安全反擊窗口。',
        aether: '全面充能隊伍並強化下一次弱點共鳴，讓連鎖不依賴隨機暴擊。',
      },
    ],
    bossPlans: [
      { title: '反制窗口', desc: '用夢境迷霧錯開 Boss 大招，爭取輸出與治療節奏。' },
      { title: '救贖續航', desc: '固定護盾與充能讓長線戰鬥不被單次失誤擊穿。' },
      { title: '弱點共鳴', desc: '配合洞察或破盾角色，將星痕轉為可規劃的連鎖收益。' },
    ],
    bondTruth: '好感度滿級後揭露：她一直知道導標者會失去哪段記憶，因此用夢境保存了另一條世界線的真相。',
    assetPrompt: 'elegant elf mentor, star woven spear, dream mist, cyan city scholar coat, purple aether wings, healing shield, anime live service RPG',
  },
]

const currentCharacterId = ref('hacker')
const dimensionMode = ref<DimensionMode>('city')
const activeTab = ref<TabKey>('profile')
const snackbar = ref(false)
const snackbarText = ref('')

const currentCharacter = computed(() => {
  return characters.find((character) => character.id === currentCharacterId.value) ?? characters[0]
})

const dimensionAccent = computed(() => (dimensionMode.value === 'city' ? STAR_CITY : ARCADIA))
const dimensionLabel = computed(() => (dimensionMode.value === 'city' ? '星刻市' : '阿爾卡迪亞'))
const personaLabel = computed(() =>
  dimensionMode.value === 'city'
    ? currentCharacter.value.cityPersona
    : currentCharacter.value.aetherPersona
)
const roleLabel = computed(() =>
  dimensionMode.value === 'city'
    ? currentCharacter.value.cityRole
    : currentCharacter.value.aetherRole
)
const activeQuote = computed(() =>
  dimensionMode.value === 'city'
    ? currentCharacter.value.cityQuote
    : currentCharacter.value.aetherQuote
)
const activeDesc = computed(() =>
  dimensionMode.value === 'city'
    ? currentCharacter.value.cityDesc
    : currentCharacter.value.aetherDesc
)
const activeImage = computed(() =>
  dimensionMode.value === 'city'
    ? currentCharacter.value.imageCity
    : currentCharacter.value.imageAether
)

const profileDetails = computed(() => [
  { label: '人格原型', value: currentCharacter.value.archetype },
  { label: '目前人格', value: personaLabel.value },
  { label: '戰場位置', value: currentCharacter.value.position },
  { label: '專屬武器', value: currentCharacter.value.weapon },
  { label: '種族', value: currentCharacter.value.race },
  { label: '身高', value: currentCharacter.value.height },
  { label: 'CV 參考', value: currentCharacter.value.cv },
  { label: '版本定位', value: currentCharacter.value.rarity },
])

const formationSlots = computed(() => [
  { slot: 'Leader', label: currentCharacter.value.name, desc: roleLabel.value },
  { slot: 'Chain', label: '連鎖輸出', desc: '依照弱點標記與場地狀態啟動固定規則連鎖。' },
  { slot: 'Break', label: '破盾位', desc: '在 Boss 轉階段前建立可預測破盾窗口。' },
  { slot: 'Support', label: '支援位', desc: '提供能量、護盾、反制或隊伍站位修正。' },
  { slot: 'Assist', label: '援護角', desc: '在連鎖節點插入，補足隊伍缺口與戰術節奏。' },
])

function selectCharacter(id: string) {
  currentCharacterId.value = id
  activeTab.value = 'profile'
}

function setDimension(mode: DimensionMode) {
  dimensionMode.value = mode
}

async function copyPrompt() {
  try {
    await navigator.clipboard.writeText(currentCharacter.value.assetPrompt)
    snackbarText.value = '已複製自動化美術提示詞。'
  } catch (error) {
    snackbarText.value = '複製失敗，請檢查瀏覽器權限。'
  }
  snackbar.value = true
}

function runTacticCheck() {
  snackbarText.value = `${currentCharacter.value.name} 已完成戰術確認：至少 3 種 Boss 破解方案可用。`
  snackbar.value = true
}

function runDamageTest() {
  snackbarText.value = `${currentCharacter.value.name} 傷害測試通過：連鎖收益不依賴隨機暴擊。`
  snackbar.value = true
}
</script>

<template>
  <main class="role-page" :style="{ '--accent': dimensionAccent }">
    <section class="role-hero">
      <div class="hero-copy">
        <p class="eyebrow">Arkadia Character Database</p>
        <h1>登場角色</h1>
        <p>
          角色不是單一職業卡，而是同一靈魂在星刻市與阿爾卡迪亞中的雙重人格。
          每次次元切換都改變戰術判斷、隊伍節奏與 Boss 破解方式。
        </p>
      </div>

      <div class="hero-actions" aria-label="次元切換">
        <button
          type="button"
          :class="{ active: dimensionMode === 'city' }"
          @click="setDimension('city')"
        >
          星刻市
        </button>
        <button
          type="button"
          :class="{ active: dimensionMode === 'aether' }"
          @click="setDimension('aether')"
        >
          阿爾卡迪亞
        </button>
      </div>
    </section>

    <section class="database-layout">
      <aside class="selector-panel glass-panel">
        <div class="panel-heading">
          <span>Roster</span>
          <strong>人格原型</strong>
        </div>

        <button
          v-for="character in characters"
          :key="character.id"
          type="button"
          class="character-select"
          :class="{ active: currentCharacterId === character.id }"
          @click="selectCharacter(character.id)"
        >
          <span class="select-code">{{ character.rarity }}</span>
          <strong>{{ character.name }}</strong>
          <small>{{ character.archetype }}</small>
        </button>
      </aside>

      <section class="portrait-panel glass-panel">
        <div class="portrait-shell">
          <v-img :src="activeImage" class="portrait-image" cover />
          <div class="portrait-overlay"></div>
          <div class="portrait-badge">
            <span>{{ dimensionLabel }}</span>
            <strong>{{ personaLabel }}</strong>
          </div>
        </div>

        <div class="identity-strip">
          <div>
            <p>{{ currentCharacter.englishName }}</p>
            <h2>{{ currentCharacter.name }}</h2>
          </div>
          <span>{{ currentCharacter.position }}</span>
        </div>

        <blockquote>{{ activeQuote }}</blockquote>

        <div class="metric-grid">
          <div>
            <strong>{{ currentCharacter.metrics.chain }}</strong>
            <span>連鎖</span>
          </div>
          <div>
            <strong>{{ currentCharacter.metrics.support }}</strong>
            <span>支援</span>
          </div>
          <div>
            <strong>{{ currentCharacter.metrics.break }}</strong>
            <span>破盾</span>
          </div>
        </div>
      </section>

      <section class="detail-panel glass-panel">
        <div class="panel-heading">
          <span>{{ dimensionLabel }} / {{ personaLabel }}</span>
          <strong>{{ roleLabel }}</strong>
        </div>

        <v-tabs v-model="activeTab" bg-color="transparent" :color="dimensionAccent" grow class="role-tabs">
          <v-tab value="profile">角色履歷</v-tab>
          <v-tab value="combat">戰術星盤</v-tab>
          <v-tab value="bond">羈絆真相</v-tab>
        </v-tabs>

        <v-window v-model="activeTab" class="tab-window">
          <v-window-item value="profile">
            <p class="description">{{ activeDesc }}</p>
            <div class="profile-grid">
              <div v-for="item in profileDetails" :key="item.label" class="info-cell">
                <span>{{ item.label }}</span>
                <strong>{{ item.value }}</strong>
              </div>
            </div>
          </v-window-item>

          <v-window-item value="combat">
            <div class="skill-list">
              <article v-for="skill in currentCharacter.skills" :key="skill.name" class="skill-row">
                <span>{{ skill.type }}</span>
                <div>
                  <h3>{{ skill.name }}</h3>
                  <p>{{ dimensionMode === 'city' ? skill.city : skill.aether }}</p>
                </div>
              </article>
            </div>
          </v-window-item>

          <v-window-item value="bond">
            <p class="description">{{ currentCharacter.bondTruth }}</p>
            <div class="asset-prompt">
              <span>AI Art Pipeline Prompt</span>
              <p>{{ currentCharacter.assetPrompt }}</p>
            </div>
            <v-btn block variant="outlined" :color="dimensionAccent" class="action-button" @click="copyPrompt">
              複製美術提示詞
            </v-btn>
          </v-window-item>
        </v-window>

        <div class="action-grid">
          <v-btn class="action-button primary" :color="STAR_CITY" @click="runDamageTest">
            傷害測試
          </v-btn>
          <v-btn class="action-button" variant="outlined" :color="ARCADIA" @click="runTacticCheck">
            戰術確認
          </v-btn>
        </div>
      </section>
    </section>

    <section class="systems-layout">
      <section class="glass-panel system-panel">
        <div class="panel-heading">
          <span>4+1 Formation</span>
          <strong>戰陣配置</strong>
        </div>
        <div class="formation-grid">
          <article v-for="slot in formationSlots" :key="slot.slot" class="formation-card">
            <span>{{ slot.slot }}</span>
            <h3>{{ slot.label }}</h3>
            <p>{{ slot.desc }}</p>
          </article>
        </div>
      </section>

      <section class="glass-panel system-panel">
        <div class="panel-heading">
          <span>Chain Reaction</span>
          <strong>連鎖反應</strong>
        </div>
        <div class="chain-flow">
          <div v-for="step in currentCharacter.chainSteps" :key="step" class="chain-step">
            {{ step }}
          </div>
        </div>
      </section>

      <section class="glass-panel system-panel boss-panel">
        <div class="panel-heading">
          <span>Boss Strategy</span>
          <strong>三種破解方案</strong>
        </div>
        <div class="boss-grid">
          <article v-for="plan in currentCharacter.bossPlans" :key="plan.title" class="boss-card">
            <h3>{{ plan.title }}</h3>
            <p>{{ plan.desc }}</p>
          </article>
        </div>
      </section>
    </section>

    <v-snackbar v-model="snackbar" timeout="2400" :color="dimensionAccent" rounded="0">
      <span class="snackbar-copy">{{ snackbarText }}</span>
    </v-snackbar>
  </main>
</template>

<style scoped>
.role-page {
  --accent: #00ffc6;
  min-height: calc(100vh - 64px);
  color: #f5f7fb;
  background:
    linear-gradient(120deg, rgba(5, 7, 13, 0.96), rgba(11, 13, 25, 0.94)),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0 1px, transparent 1px 72px),
    repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.025) 0 1px, transparent 1px 72px);
  padding: clamp(24px, 4vw, 56px);
}

.role-hero,
.database-layout,
.systems-layout {
  max-width: 1320px;
  margin: 0 auto;
}

.role-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  align-items: end;
  margin-bottom: 24px;
}

.hero-copy {
  max-width: 820px;
}

.eyebrow,
.panel-heading span,
.select-code,
.identity-strip p,
.info-cell span,
.skill-row span,
.asset-prompt span,
.formation-card span {
  color: var(--accent);
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-copy h1 {
  margin: 0;
  font-size: clamp(3.2rem, 7vw, 6.8rem);
  line-height: 0.92;
  font-weight: 900;
}

.hero-copy p {
  max-width: 760px;
  margin: 18px 0 0;
  color: rgba(245, 247, 251, 0.72);
  line-height: 1.85;
}

.hero-actions {
  display: inline-grid;
  grid-template-columns: repeat(2, minmax(118px, 1fr));
  gap: 8px;
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
}

.hero-actions button,
.character-select {
  border-radius: 8px;
  border: 1px solid transparent;
  color: rgba(245, 247, 251, 0.68);
  background: transparent;
  font-weight: 800;
}

.hero-actions button {
  padding: 12px 16px;
}

.hero-actions button.active,
.character-select.active {
  border-color: color-mix(in srgb, var(--accent) 64%, white 12%);
  color: #ffffff;
  background: rgba(0, 0, 0, 0.52);
  box-shadow: inset 0 0 0 1px rgba(0, 255, 198, 0.18);
}

.character-select.active strong,
.character-select.active small {
  color: #ffffff;
}

.character-select.active {
  background: rgba(0, 0, 0, 0.56);
}

.glass-panel {
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.32);
}

.database-layout {
  display: grid;
  grid-template-columns: 280px minmax(320px, 0.92fr) minmax(360px, 1fr);
  gap: 18px;
}

.selector-panel,
.portrait-panel,
.detail-panel,
.system-panel {
  border-radius: 8px;
  padding: 18px;
}

.panel-heading {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: center;
  margin-bottom: 16px;
}

.panel-heading strong {
  color: #ffffff;
  font-size: 0.95rem;
}

.character-select {
  width: 100%;
  display: block;
  text-align: left;
  padding: 16px;
  margin-top: 10px;
  background: rgba(255, 255, 255, 0.045);
}

.character-select strong,
.character-select small {
  display: block;
}

.character-select strong {
  margin-top: 6px;
  color: #ffffff;
  font-size: 1.05rem;
}

.character-select small {
  margin-top: 6px;
  color: rgba(245, 247, 251, 0.58);
}

.portrait-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.portrait-shell {
  position: relative;
  min-height: 540px;
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: #05070d;
}

.portrait-image {
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  transform: scale(1.02);
  transition: transform 420ms ease, filter 420ms ease;
}

.portrait-shell:hover .portrait-image {
  transform: scale(1.06);
}

.portrait-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, transparent 32%, rgba(5, 7, 13, 0.92) 100%),
    linear-gradient(90deg, rgba(0, 255, 198, 0.16), rgba(107, 76, 255, 0.14));
}

.portrait-badge {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 18px;
  display: flex;
  justify-content: space-between;
  gap: 14px;
  align-items: center;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(5, 7, 13, 0.6);
  backdrop-filter: blur(18px);
}

.portrait-badge span {
  color: rgba(245, 247, 251, 0.72);
  font-weight: 700;
}

.portrait-badge strong {
  color: var(--accent);
  font-weight: 900;
}

.identity-strip {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
}

.identity-strip h2 {
  margin: 4px 0 0;
  font-size: clamp(1.8rem, 3.5vw, 2.6rem);
  font-weight: 900;
}

.identity-strip span {
  color: rgba(245, 247, 251, 0.72);
  font-weight: 800;
}

blockquote {
  margin: 0;
  padding-left: 16px;
  border-left: 3px solid var(--accent);
  color: rgba(245, 247, 251, 0.78);
  line-height: 1.7;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.metric-grid div,
.info-cell,
.skill-row,
.asset-prompt,
.formation-card,
.chain-step,
.boss-card {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.055);
}

.metric-grid div {
  padding: 14px;
}

.metric-grid strong {
  display: block;
  color: var(--accent);
  font-size: 1.7rem;
  line-height: 1;
}

.metric-grid span {
  display: block;
  margin-top: 8px;
  color: rgba(245, 247, 251, 0.58);
  font-weight: 700;
}

.detail-panel {
  min-width: 0;
}

.role-tabs {
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

:deep(.v-tab) {
  text-transform: none;
  font-weight: 800;
}

.tab-window {
  min-height: 390px;
}

.description {
  color: rgba(245, 247, 251, 0.78);
  line-height: 1.9;
  margin: 0 0 18px;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.info-cell {
  padding: 14px;
}

.info-cell strong {
  display: block;
  margin-top: 6px;
  color: #ffffff;
  line-height: 1.45;
}

.skill-list {
  display: grid;
  gap: 12px;
}

.skill-row {
  display: grid;
  grid-template-columns: 88px 1fr;
  gap: 14px;
  padding: 14px;
}

.skill-row h3,
.formation-card h3,
.boss-card h3 {
  margin: 0;
  color: #ffffff;
  font-size: 1rem;
}

.skill-row p,
.asset-prompt p,
.formation-card p,
.boss-card p {
  margin: 6px 0 0;
  color: rgba(245, 247, 251, 0.68);
  line-height: 1.65;
}

.asset-prompt {
  padding: 14px;
  margin-bottom: 14px;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;
}

.action-button {
  font-weight: 900;
  letter-spacing: 0;
}

.action-button.primary {
  color: #05070d;
}

.systems-layout {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 18px;
  margin-top: 18px;
}

.boss-panel {
  grid-column: 1 / -1;
}

.formation-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
}

.formation-card,
.boss-card {
  padding: 14px;
}

.chain-flow {
  display: grid;
  gap: 10px;
}

.chain-step {
  padding: 14px;
  color: #ffffff;
  font-weight: 900;
}

.boss-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.snackbar-copy {
  color: #05070d;
  font-weight: 900;
}

@media (max-width: 1180px) {
  .database-layout {
    grid-template-columns: 1fr 1fr;
  }

  .selector-panel {
    grid-column: 1 / -1;
  }

  .systems-layout,
  .formation-grid,
  .boss-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 760px) {
  .role-page {
    padding: 18px;
  }

  .role-hero,
  .database-layout {
    grid-template-columns: 1fr;
  }

  .hero-actions,
  .profile-grid,
  .metric-grid,
  .action-grid {
    grid-template-columns: 1fr;
  }

  .portrait-shell {
    min-height: 420px;
  }

  .identity-strip,
  .portrait-badge,
  .panel-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .skill-row {
    grid-template-columns: 1fr;
  }
}
</style>
