#!/usr/bin/env node
import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { appendLog, buildAutoEntry, validTags } from './log-optimization.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const triggerFile = path.resolve(__dirname, '../OPTIMIZATION_LOG_TRIGGER.md');

async function ensureTriggerFile() {
  try {
    await fsPromises.access(triggerFile);
  } catch {
    const template = `# 請在此輸入要觸發的標籤，每行一個。
# 有效標籤：[Market_Analysis], [System_Balancing], [Narrative_Check], [Dev_Efficiency]
# 儲存檔案後，watch-log 會自動將標籤轉成日誌條目並追加到 OPTIMIZATION_LOG.md。
`;
    await fsPromises.writeFile(triggerFile, template, 'utf8');
  }
}

async function processTrigger() {
  try {
    const raw = await fsPromises.readFile(triggerFile, 'utf8');
    const lines = raw
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line && validTags.includes(line));

    const tags = [...new Set(lines)];
    if (!tags.length) {
      console.log('watch-log: 未找到有效標籤，請在觸發檔案中輸入一個標籤並儲存。');
      return;
    }

    for (const tag of tags) {
      try {
        const entry = buildAutoEntry(tag);
        const res = await appendLog(entry, { retries: 2 });
        console.log(`watch-log: 已寫入 ${tag} -> ID=${res.id}`);
      } catch (err) {
        if (String(err.message).includes('偵測到重複日誌條目')) {
          console.log(`watch-log: 已略過重複標籤 ${tag}`);
        } else {
          console.error(`watch-log: ${tag} 寫入失敗 -> ${err.message}`);
        }
      }
    }

    await fsPromises.writeFile(triggerFile, '', 'utf8');
  } catch (err) {
    console.error(`watch-log: 無法讀取觸發檔案 -> ${err.message}`);
  }
}

async function main() {
  await ensureTriggerFile();
  await processTrigger();
  console.log(`watch-log: 監視中，請編輯 ${path.basename(triggerFile)} 並儲存。`);
  fs.watchFile(triggerFile, { interval: 800 }, async (curr, prev) => {
    if (curr.mtimeMs === prev.mtimeMs) return;
    await processTrigger();
  });
}

main();
