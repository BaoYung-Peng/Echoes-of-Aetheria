<script setup lang="ts">
const focusStats = [
  { value: '4+1', label: '戰陣與援護系統設計' },
  { value: '0 RNG', label: '固定數值裝備與策略配裝' },
  { value: '3+', label: 'Boss 多解戰術破解方案' },
];

const competencies = [
  {
    title: '系統企劃',
    items: ['4+1 戰鬥規則', '連鎖反應設計', '零隨機裝備', 'Boss 解法矩陣'],
  },
  {
    title: '產品與營運',
    items: ['章節式更新', '預註冊轉化', 'Live Service 節奏', '玩家留存漏斗'],
  },
  {
    title: '技術協作',
    items: ['Vue3 / Vuetify3', 'GTM / GA4 事件規格', '規格文件拆解', '跨職能溝通'],
  },
  {
    title: 'AI 工作流',
    items: ['Codex 協作', '美術管線自動化', '企劃文件生成', '內容迭代紀錄'],
  },
];

const experiences = [
  {
    role: '全端開發 / 系統分析',
    company: '大型保險系統專案',
    date: '近期實務',
    tasks: [
      '將業務需求拆解為可實作規格，建立資料流程、畫面邏輯與驗收條件。',
      '以工程角度控制風險，重視命名、狀態流、錯誤處理與跨模組邊界。',
      '累積與 PM、設計、後端、測試協作的實戰經驗，可轉化為遊戲研發跨職能溝通能力。',
    ],
  },
  {
    role: '原創遊戲企劃 / 產品原型',
    company: '《幻界迴響：霓虹傳說》',
    date: '2026',
    tasks: [
      '建立星刻市與阿爾卡迪亞雙維度世界觀，將敘事設定轉化為 UI、任務與戰鬥機制。',
      '設計 4 名角色 + 1 名援護角的戰陣邏輯，強調弱點觸發、連鎖反應與多解策略。',
      '規劃社交住宅區、虛擬演唱會、店鋪經營與預註冊漏斗，兼顧內容黏著與商業轉化。',
    ],
  },
];

const projectHighlights = [
  {
    title: '核心戰鬥',
    copy: '以固定規則連鎖取代隨機數值堆疊，讓玩家能推理、規劃並驗證每一次破盾與爆發。',
  },
  {
    title: '社交住宅區',
    copy: '把角色展示、店鋪經營、演唱會活動與多人公共大廳整合為長線留存場域。',
  },
  {
    title: '數據化轉化',
    copy: '以 GTM / GA4 事件規格追蹤預註冊、次元切換、角色卡互動與核心 CTA 表現。',
  },
];

const timeline = [
  { phase: '01', title: '產品定位', text: '二次元科幻 Live Service RPG，主打雙維度都市與策略戰陣。' },
  { phase: '02', title: '可玩原型', text: '完成首頁、角色展示、次元切換、玩法與戰鬥模擬頁。' },
  { phase: '03', title: '投遞目標', text: '以系統企劃、產品企劃與技術協作能力應徵櫃公司等相關職位。' },
];
</script>

<template>
  <main class="resume-page">
    <section class="resume-hero">
      <div class="hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">Game System Designer Portfolio</p>
          <h1>鮑圓鵬</h1>
          <h2>遊戲平台企劃履歷</h2>
          <p class="hero-bio">
            我具備資訊管理碩士背景與全端開發實務，能把遊戲創意拆成規格、系統、資料事件與可驗收的互動原型。
            目前以《幻界迴響：霓虹傳說》作為核心作品，展示二次元 Live Service RPG 的世界觀、戰鬥、社交與轉化設計能力。
          </p>

          <div class="hero-actions">
            <v-btn
              class="primary-cta"
              size="large"
              rounded="0"
              href="https://github.com/BaoYung-Peng/Echoes-of-Aetheria"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub 專案
            </v-btn>
            <v-btn class="secondary-cta" size="large" rounded="0" variant="outlined" to="/gameplan">
              查看企劃 Demo
            </v-btn>
          </div>
        </div>

        <aside class="identity-card">
          <div class="avatar-frame">
            <div class="avatar-core">BP</div>
          </div>
          <div class="identity-meta">
            <span>Target Role</span>
            <strong>System / Technical Game Designer</strong>
          </div>
          <div class="identity-meta">
            <span>Strength</span>
            <strong>企劃規格化、工程落地、數據追蹤</strong>
          </div>
          <div class="identity-meta">
            <span>Project</span>
            <strong>Echoes of Aetheria</strong>
          </div>
        </aside>
      </div>

      <div class="stats-strip">
        <div v-for="stat in focusStats" :key="stat.label" class="stat-item">
          <strong>{{ stat.value }}</strong>
          <span>{{ stat.label }}</span>
        </div>
      </div>
    </section>

    <section class="resume-section">
      <div class="section-heading">
        <span>01</span>
        <h2>核心能力</h2>
      </div>
      <div class="competency-grid">
        <article v-for="group in competencies" :key="group.title" class="glass-card competency-card">
          <h3>{{ group.title }}</h3>
          <ul>
            <li v-for="item in group.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="resume-section split-section">
      <div>
        <div class="section-heading">
          <span>02</span>
          <h2>經歷與定位</h2>
        </div>
        <div class="experience-list">
          <article v-for="exp in experiences" :key="`${exp.role}-${exp.company}`" class="glass-card exp-card">
            <div class="exp-head">
              <div>
                <h3>{{ exp.role }}</h3>
                <p>{{ exp.company }}</p>
              </div>
              <span>{{ exp.date }}</span>
            </div>
            <ul>
              <li v-for="task in exp.tasks" :key="task">{{ task }}</li>
            </ul>
          </article>
        </div>
      </div>

      <aside class="pitch-panel">
        <p class="eyebrow">Hiring Signal</p>
        <h2>我不是只會寫想法，而是能把想法落成可測試的產品。</h2>
        <p>
          針對高規格二次元產品而言，企劃價值不只在創意，而在能否穩定產出清楚規則、
          可擴充系統、可被資料驗證的玩家體驗。我的履歷頁以可執行原型證明這件事。
        </p>
      </aside>
    </section>

    <section class="resume-section">
      <div class="section-heading">
        <span>03</span>
        <h2>代表作品：幻界迴響</h2>
      </div>
      <div class="project-panel">
        <div class="project-copy">
          <p class="eyebrow">Echoes of Aetheria</p>
          <h2>霓虹都市、異界疊影、4+1 策略戰陣</h2>
          <p>
            以星刻市與阿爾卡迪亞的雙維度切換為主軸，將世界觀、角色羈絆、戰鬥弱點、社交住宅區與預註冊轉化整合成完整產品敘事。
          </p>
        </div>
        <div class="highlight-grid">
          <article v-for="item in projectHighlights" :key="item.title" class="highlight-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.copy }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="resume-section">
      <div class="section-heading">
        <span>04</span>
        <h2>投遞敘事</h2>
      </div>
      <div class="timeline">
        <article v-for="item in timeline" :key="item.phase" class="timeline-item">
          <span>{{ item.phase }}</span>
          <div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.resume-page {
  min-height: calc(100vh - 64px);
  color: #f8fbff;
  background:
    radial-gradient(circle at 18% 12%, rgba(107, 76, 255, 0.34), transparent 32%),
    radial-gradient(circle at 82% 18%, rgba(0, 255, 198, 0.22), transparent 30%),
    linear-gradient(135deg, #060713 0%, #101323 46%, #05070d 100%);
  padding: 72px clamp(20px, 5vw, 72px) 96px;
  overflow: hidden;
}

.resume-hero,
.resume-section {
  max-width: 1180px;
  margin: 0 auto;
}

.resume-hero {
  position: relative;
}

.hero-grid,
.split-section {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(300px, 0.65fr);
  gap: 28px;
  align-items: stretch;
}

.hero-copy,
.identity-card,
.glass-card,
.pitch-panel,
.project-panel,
.timeline-item {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(20px);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.34);
}

.hero-copy {
  padding: clamp(32px, 5vw, 64px);
}

.eyebrow {
  color: #00ffc6;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  margin-bottom: 18px;
  text-transform: uppercase;
}

.hero-copy h1 {
  font-size: clamp(3.5rem, 8vw, 7.5rem);
  line-height: 0.9;
  margin: 0;
  font-weight: 900;
}

.hero-copy h2 {
  max-width: 760px;
  color: #dfe8ff;
  font-size: clamp(1.45rem, 3vw, 2.45rem);
  line-height: 1.18;
  margin: 22px 0;
  font-weight: 900;
}

.hero-bio,
.project-copy p,
.pitch-panel p,
.timeline-item p,
.highlight-card p,
.exp-card li {
  color: rgba(238, 244, 255, 0.76);
  line-height: 1.85;
}

.hero-bio {
  max-width: 820px;
  font-size: 1.05rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 32px;
}

.primary-cta {
  background: #00ffc6 !important;
  color: #05070d !important;
  font-weight: 900;
  min-width: 148px;
}

.secondary-cta {
  border-color: rgba(107, 76, 255, 0.9) !important;
  color: #f8fbff !important;
  font-weight: 800;
}

.identity-card {
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
}

.avatar-frame {
  width: 148px;
  height: 148px;
  border: 1px solid rgba(0, 255, 198, 0.45);
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, rgba(107, 76, 255, 0.35), rgba(0, 255, 198, 0.14));
}

.avatar-core {
  width: 104px;
  height: 104px;
  display: grid;
  place-items: center;
  background: rgba(5, 7, 13, 0.72);
  color: #00ffc6;
  font-size: 2rem;
  font-weight: 900;
}

.identity-meta {
  border-top: 1px solid rgba(255, 255, 255, 0.12);
  padding-top: 16px;
}

.identity-meta span {
  display: block;
  color: rgba(255, 255, 255, 0.48);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.identity-meta strong {
  display: block;
  margin-top: 6px;
  color: #ffffff;
  font-size: 1rem;
}

.stats-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.stat-item {
  padding: 22px;
  border: 1px solid rgba(0, 255, 198, 0.22);
  background: rgba(0, 255, 198, 0.08);
}

.stat-item strong {
  display: block;
  color: #00ffc6;
  font-size: clamp(1.8rem, 4vw, 3rem);
  line-height: 1;
  font-weight: 900;
}

.stat-item span {
  display: block;
  margin-top: 8px;
  color: rgba(255, 255, 255, 0.72);
  font-weight: 700;
}

.resume-section {
  margin-top: 72px;
}

.section-heading {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 24px;
}

.section-heading span {
  color: #6b4cff;
  font-weight: 900;
}

.section-heading h2 {
  margin: 0;
  font-size: clamp(1.45rem, 3vw, 2.1rem);
  font-weight: 900;
}

.competency-grid,
.highlight-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.competency-card,
.exp-card {
  padding: 24px;
}

.competency-card h3,
.highlight-card h3,
.exp-card h3,
.timeline-item h3 {
  margin: 0;
  color: #ffffff;
  font-weight: 900;
}

.competency-card ul,
.exp-card ul {
  padding-left: 18px;
  margin: 16px 0 0;
}

.competency-card li {
  color: rgba(238, 244, 255, 0.76);
  line-height: 1.9;
}

.experience-list {
  display: grid;
  gap: 16px;
}

.exp-head {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 14px;
}

.exp-head p {
  color: #00ffc6;
  margin: 6px 0 0;
  font-weight: 700;
}

.exp-head span {
  color: rgba(255, 255, 255, 0.52);
  font-weight: 800;
  white-space: nowrap;
}

.pitch-panel {
  padding: 32px;
  align-self: start;
  border-color: rgba(107, 76, 255, 0.35);
}

.pitch-panel h2 {
  margin: 0 0 18px;
  font-size: clamp(1.35rem, 2.4vw, 2rem);
  line-height: 1.28;
}

.project-panel {
  display: grid;
  grid-template-columns: 0.82fr 1.18fr;
  gap: 24px;
  padding: 32px;
}

.project-copy h2 {
  margin: 0 0 18px;
  font-size: clamp(1.6rem, 3.2vw, 2.6rem);
  line-height: 1.18;
}

.highlight-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.highlight-card {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  padding: 22px;
}

.timeline {
  display: grid;
  gap: 14px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 20px;
  padding: 22px;
}

.timeline-item > span {
  color: #00ffc6;
  font-size: 1.4rem;
  font-weight: 900;
}

@media (max-width: 1080px) {
  .hero-grid,
  .split-section,
  .project-panel {
    grid-template-columns: 1fr;
  }

  .competency-grid,
  .highlight-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 680px) {
  .resume-page {
    padding-inline: 16px;
  }

  .stats-strip,
  .competency-grid,
  .highlight-grid {
    grid-template-columns: 1fr;
  }

  .hero-copy,
  .identity-card,
  .project-panel,
  .pitch-panel,
  .competency-card,
  .exp-card,
  .timeline-item {
    padding: 22px;
  }

  .timeline-item {
    grid-template-columns: 1fr;
  }

  .exp-head {
    flex-direction: column;
  }
}
</style>
