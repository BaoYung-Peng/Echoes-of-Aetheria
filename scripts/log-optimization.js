#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logFile = path.resolve(__dirname, '../OPTIMIZATION_LOG.md');
const validTags = ['[Market_Analysis]', '[System_Balancing]', '[Narrative_Check]', '[Dev_Efficiency]'];
const validStates = ['已整合至企劃', '待驗證', '技術限制調整'];

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]+/g, '-')
    .replace(/\-+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function normalizeTag(tag) {
  return String(tag).replace(/\[|\]/g, '');
}

function buildId(date, tag, challenge) {
  const t = normalizeTag(tag).replace(/\s+/g, '');
  return `${date}_${t}_${slugify(challenge)}`;
}

function validateEntry(entry) {
  const missing = [];
  if (!entry || typeof entry !== 'object') throw new Error('輸入必須為 JSON 物件');
  if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(entry.date)) missing.push('date(YYYY-MM-DD)');
  if (!entry.tag || !validTags.includes(entry.tag)) missing.push('tag');
  if (!entry.challenge || !String(entry.challenge).trim()) missing.push('challenge');
  if (!entry.summary || !String(entry.summary).trim()) missing.push('summary');
  if (!entry.status || !validStates.includes(entry.status)) missing.push('status');
  if (missing.length) throw new Error(`欄位缺失或格式錯誤 -> [${missing.join(', ')}]`);
}

function buildEntry(entry) {
  const id = buildId(entry.date, entry.tag, entry.challenge);
  const techImpactLine = entry.techImpact ? `* **技術/產能影響:** ${entry.techImpact}\n` : '';
  return `### 📝 日誌紀錄：${entry.challenge}\n` +
    `* **ID:** ${id}\n` +
    `* **時間戳記:** ${entry.date}\n` +
    `* **指令標籤:** ${entry.tag}\n` +
    `* **原始挑戰:** ${entry.challenge}\n` +
    `${techImpactLine}` +
    `* **CodeX 方案摘要:** ${entry.summary}\n` +
    `* **執行狀態:** ${entry.status}\n\n`;
}

function buildAutoEntry(tag, partial = {}) {
  const defaults = {
    '[Market_Analysis]': {
      challenge: '市場分析自動生成',
      summary: '自動生成 Market_Analysis 日誌，後續補充具體市場評估內容。',
    },
    '[System_Balancing]': {
      challenge: '系統平衡自動生成',
      summary: '自動生成 System_Balancing 日誌，後續補充零隨機數值與平衡評估。',
    },
    '[Narrative_Check]': {
      challenge: '敘事檢查自動生成',
      summary: '自動生成 Narrative_Check 日誌，後續補充故事基調與劇情一致性評估。',
    },
    '[Dev_Efficiency]': {
      challenge: '開發效率自動生成',
      summary: '自動生成 Dev_Efficiency 日誌，後續補充模組化與美術成本評估。',
    },
  };
  const preset = defaults[tag] || {
    challenge: `${tag} 自動生成`,
    summary: `自動生成 ${tag} 日誌，後續補充內容。`,
  };
  return {
    date: partial.date || new Date().toISOString().split('T')[0],
    tag,
    challenge: partial.challenge || preset.challenge,
    summary: partial.summary || preset.summary,
    status: partial.status || '待驗證',
    techImpact: partial.techImpact || '自動生成條目，待補充技術與產能說明。',
  };
}

async function appendLog(entry, options = { retries: 1 }) {
  validateEntry(entry);

  const content = fs.existsSync(logFile) ? fs.readFileSync(logFile, 'utf8') : '';
  const id = buildId(entry.date, entry.tag, entry.challenge);
  if (content.includes(`* **ID:** ${id}`)) {
    throw new Error('偵測到重複日誌條目，請確認是否已寫入');
  }

  const text = buildEntry(entry);

  for (let attempt = 0; attempt <= options.retries; attempt++) {
    try {
      fs.appendFileSync(logFile, text, 'utf8');
      return { ok: true, id };
    } catch (err) {
      if (attempt === options.retries) throw new Error(`無法寫入 OPTIMIZATION_LOG.md：${err.message}`);
      await new Promise(r => setTimeout(r, 200 * (attempt + 1)));
    }
  }
}

function parseArgs() {
  const args = process.argv.slice(2);
  const out = {};
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--file' && args[i + 1]) { out.file = args[i + 1]; i++; }
    else if (a === '--retries' && args[i + 1]) { out.retries = Number(args[i + 1]) || 1; i++; }
    else if (a === '--date' && args[i + 1]) { out.date = args[i + 1]; i++; }
    else if (a === '--tag' && args[i + 1]) { out.tag = args[i + 1]; i++; }
    else if (a === '--challenge' && args[i + 1]) { out.challenge = args[i + 1]; i++; }
    else if (a === '--summary' && args[i + 1]) { out.summary = args[i + 1]; i++; }
    else if (a === '--status' && args[i + 1]) { out.status = args[i + 1]; i++; }
    else if (a === '--techImpact' && args[i + 1]) { out.techImpact = args[i + 1]; i++; }
    else if (a === '--help') { out.help = true; }
    else if (validTags.includes(a) && !out.tag) { out.tag = a; }
  }
  return out;
}

async function readJsonFromStdin() {
  const chunks = [];
  for await (const chunk of process.stdin) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8').trim();
  if (!raw) throw new Error('從 stdin 未讀到任何資料');
  return JSON.parse(raw);
}

async function main() {
  const argv = parseArgs();
  if (argv.help) {
    console.log('Usage: node scripts/log-optimization.js --file <path> | --date <YYYY-MM-DD> --tag <tag> --challenge <text> --summary <text> --status <state> [--techImpact <text>] [--retries <N>]');
    console.log('Valid tags: [Market_Analysis], [System_Balancing], [Narrative_Check], [Dev_Efficiency]');
    console.log('Valid status: 已整合至企劃, 待驗證, 技術限制調整');
    console.log('PowerShell example: node scripts/log-optimization.js --date 2026-06-13 --tag "[System_Balancing]" --challenge "測試系統平衡" --summary "驗證 System_Balancing 標籤紀錄。" --status "待驗證"');
    process.exit(0);
  }

  let entry;
  try {
    if (argv.file) {
      const p = path.resolve(process.cwd(), argv.file);
      const raw = fs.readFileSync(p, 'utf8');
      entry = JSON.parse(raw);
    } else if (!process.stdin.isTTY) {
      entry = await readJsonFromStdin();
    } else {
      entry = {
        date: argv.date,
        tag: argv.tag,
        challenge: argv.challenge,
        summary: argv.summary,
        status: argv.status,
        techImpact: argv.techImpact,
      };
    }

    if ((!entry.date || !entry.challenge || !entry.summary || !entry.status) && entry.tag && validTags.includes(entry.tag)) {
      entry = buildAutoEntry(entry.tag, entry);
    }

    if (!entry.tag || !validTags.includes(entry.tag)) {
      throw new Error('缺少有效的標籤，請提供 --tag 或直接輸入 [System_Balancing] 等有效標籤');
    }
  } catch (err) {
    console.error(`ERROR: 無法讀取輸入 JSON 或指令參數 -> ${err.message}`);
    process.exit(2);
  }

  try {
    const res = await appendLog(entry, { retries: argv.retries ?? 1 });
    console.log(`OK: 已寫入，ID=${res.id}`);
    process.exit(0);
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
    // on persistent failure, append a TODO marker for manual review
    try {
      const todo = `### 🛠️ TODO: 人工檢查 -> 無法自動寫入 (原因: ${err.message})\n* **時間戳記:** ${new Date().toISOString().split('T')[0]}\n\n`;
      fs.appendFileSync(logFile, todo, 'utf8');
    } catch (e) {
      // if even this fails, just exit with error
    }
    process.exit(3);
  }
}

// Allow import as module
export { appendLog, buildAutoEntry, validTags };

if (process.argv[1] && process.argv[1].endsWith('log-optimization.js')) {
  main();
}
