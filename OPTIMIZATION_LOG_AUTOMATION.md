# OPTIMIZATION_LOG 自動化執行方案

## 1. 目的

將 `OPTIMIZATION_LOG.md` 中的 CodeX 日誌模板，轉換成可自動化執行的內容輸入與記錄流程。

目標：當 AI Agent 收到特定關鍵標籤或分析需求時，自動生成符合日誌規範的 Markdown 條目，並將其穩定儲存回 `OPTIMIZATION_LOG.md`。

---

## 2. 關鍵要素

### 2.1 觸發標籤

- `[Market_Analysis]`
- `[System_Balancing]`
- `[Narrative_Check]`
- `[Dev_Efficiency]`

### 2.2 日誌紀錄格式

每次自動紀錄時，必須包含以下欄位：

- 日期：YYYY-MM-DD
- 指令標籤：如 `[Market_Analysis]`
- 原始挑戰：具體企劃問題
- CodeX 方案摘要：核心建議
- 執行狀態：已整合至企劃 / 待驗證 / 技術限制調整

### 2.3 回覆結構規範（當觸發標籤時）

在 AI 回覆中，必須遵循：

- `### [關鍵指令標籤]`
- `* **評估標的：**`
- `* **市場判斷**`
- `* **競品對照**`
- `* **競爭力評分：X/10**`
  - `* **優勢明確：**`
  - `* **最大風險：**`
- `* **建議落地**`
  - `* [具體建議 1]`
  - `* [具體建議 2]`
- `* **執行狀態：**`

### 2.4 精確解析規則

此文件必須定義可被機器解析的格式，後續 Node.js 腳本應使用下列規則：

- 標籤行：`^### \[(Market_Analysis|System_Balancing|Narrative_Check|Dev_Efficiency)\]$`
- 評估標的：`^\* \*\*評估標的：\*\*\s*(.+)$`
- 市場判斷：行首為 `* **市場判斷**`，其後內容直到下一個 `* **` 標記為該段落內容。
- 競品對照：行首為 `* **競品對照**`，其後內容直到下一個 `* **` 標記為該段落內容。
- 競爭力評分：`^\* \*\*競爭力評分：([0-9]|10)/10\*\*$`
- 優勢明確：`^\* \*\*優勢明確：\*\*\s*(.+)$`
- 最大風險：`^\* \*\*最大風險：\*\*\s*(.+)$`
- 建議落地：行首為 `* **建議落地**`，後續 `* ` 條目為建議項目，至少兩項。
- 執行狀態：`^\* \*\*執行狀態：\*\*\s*(已整合至企劃|待驗證|技術限制調整)$`

解析後若缺少任何一項，應判定為「格式不符」並拒絕寫入。

---

## 3. 自動化流程設計

### 3.1 流程概述

1. 解析使用者輸入或 Agent 指令，判斷是否包含關鍵標籤。
2. 若符合觸發標籤，AI 生成符合回覆結構的分析內容。
3. 從分析內容中抽取必要欄位，轉換為 `OPTIMIZATION_LOG.md` 的日誌條目。
4. 檢查是否有格式錯誤、欄位缺漏、數值不正確或重複條目。
5. 將新條目附加到 `OPTIMIZATION_LOG.md`。
6. 若需要，可輸出已寫入日誌的確認訊息；若失敗，輸出明確錯誤訊息。

### 3.2 欄位映射規則

| 來源 | 目標欄位 |
|---|---|
| `### [Tag]` | `指令標籤` |
| `評估標的` | `原始挑戰` |
| `市場判斷` + `競品對照` + `建議落地` | `CodeX 方案摘要` |
| `執行狀態` | `執行狀態` |

> 註：`CodeX 方案摘要` 需由腳本將多段分析合併成一段可讀摘要；若要避免丟失內容，可同時保留每個小節作為進一步結構化資料。

### 3.3 執行狀態判定規則

- 若方案已能直接落地，應寫入 `已整合至企劃`
- 若方案仍需內部驗證或數值測試，應寫入 `待驗證`
- 若方案遭遇可執行障礙，應寫入 `技術限制調整`

### 3.4 錯誤處理機制

自動化流程必須支援以下例外情境：

1. 解析失敗：
   - 若 AI 回覆缺少任一必填欄位，輸出 `ERROR: 欄位缺失 -> [缺少欄位列表]`
   - 不進行寫入，並要求 AI 重新生成符合格式的回覆。

2. 格式錯誤：
   - 若 `競爭力評分` 非 `0-10/10` 格式，輸出 `ERROR: 競爭力評分格式錯誤，請使用 X/10`。
   - 若標籤不在允許列表內，輸出 `ERROR: 無效標籤，請使用 [Market_Analysis]、[System_Balancing]、[Narrative_Check]、[Dev_Efficiency]`。
   - 若 `執行狀態` 不符指定值，輸出 `ERROR: 執行狀態錯誤，請使用 已整合至企劃 / 待驗證 / 技術限制調整`。

3. 重複檢測：
   - 若 `OPTIMIZATION_LOG.md` 已存在相同 `### 📝 日誌紀錄：<功能名稱>`，輸出 `ERROR: 偵測到重複日誌條目`。
   - 若內容需覆蓋，應改為手動更新而非自動追加。

4. 檔案異常：
   - 若無法讀寫 `OPTIMIZATION_LOG.md`，輸出 `ERROR: 無法讀寫 OPTIMIZATION_LOG.md，請確認檔案權限與路徑`。
   - 若 append 寫入失敗，應保持原檔案不變，並回傳失敗原因。

---

## 4. 自動化實作範例

### 4.1 Node.js 筆記型腳本

可在專案根目錄新增 `scripts/log-optimization.js`，作為自動 append 工具。此範例包含驗證、重複檢查與明確錯誤回傳。

```js
const fs = require('fs');
const path = require('path');

const logFile = path.resolve(__dirname, '../OPTIMIZATION_LOG.md');
const validTags = ['[Market_Analysis]', '[System_Balancing]', '[Narrative_Check]', '[Dev_Efficiency]'];
const validStates = ['已整合至企劃', '待驗證', '技術限制調整'];

function validateEntry({ date, tag, challenge, summary, status }) {
  if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(date)) {
    throw new Error('日期格式必須為 YYYY-MM-DD');
  }
  if (!validTags.includes(tag)) {
    throw new Error('無效指令標籤');
  }
  if (!challenge || !summary || !status) {
    throw new Error('缺少必填欄位：challenge, summary, status');
  }
  if (!validStates.includes(status)) {
    throw new Error('執行狀態錯誤，請使用 已整合至企劃 / 待驗證 / 技術限制調整');
  }
}

function buildEntry({ date, tag, challenge, summary, status }) {
  return `### 📝 日誌紀錄：${challenge}\n` +
    `* **時間戳記:** ${date}\n` +
    `* **指令標籤:** ${tag}\n` +
    `* **原始挑戰:** ${challenge}\n` +
    `* **CodeX 方案摘要:** ${summary}\n` +
    `* **執行狀態:** ${status}\n\n`;
}

function appendLog(entry) {
  validateEntry(entry);

  const content = fs.existsSync(logFile) ? fs.readFileSync(logFile, 'utf8') : '';
  const duplicateKey = `### 📝 日誌紀錄：${entry.challenge}`;
  if (content.includes(duplicateKey)) {
    throw new Error('偵測到重複日誌條目，請確認是否已寫入');
  }

  try {
    fs.appendFileSync(logFile, buildEntry(entry), 'utf8');
  } catch (err) {
    throw new Error(`無法寫入 OPTIMIZATION_LOG.md：${err.message}`);
  }
}

module.exports = { appendLog };
```

### 4.2 自動生成日誌的觸發器

- 透過 AI Agent 後端程式或 CLI script，將分析回覆轉成欄位物件。
- 若使用 VS Code 任務，可透過 `npm run append-log` 呼叫該腳本。
- 若使用 CI/CD，可將生成內容自動寫入檔案並提交變更，但請先確保格式驗證通過。

---

## 5. Chat 中的建議流程

- 在 Chat 中輸入標籤如 `[Market_Analysis]` 後，AI 會直接提供建議內容。
- 建議內容產生後，使用者需手動執行 `npm run log -- "[tag]"` 或編輯 `OPTIMIZATION_LOG_TRIGGER.md` 來記錄日誌。
- 此流程保證了建議內容在 Chat 中可見，而日誌記錄由使用者主動觸發。

---

## 6. 具體執行建議

### 5.1 建議一：將 `OPTIMIZATION_LOG.md` 視為單一事件日誌檔

- 每次 AI 生成建議時，追加一則獨立條目。
- 條目頭部使用 `### 📝 日誌紀錄：功能名稱`。
- 條目底部固定留空行，保證後續追加可讀性。

### 5.2 建議二：建立固定輸入提醒模板

在 AI prompt 中強制要求：

- 標籤必須使用 `[Market_Analysis]`、`[System_Balancing]`、`[Narrative_Check]`、`[Dev_Efficiency]`。
- 回覆結構必須完全照本文件的格式輸出。
- 必須包含 `* **執行狀態：**` 欄位。
- 若未符合格式，自動判定為「格式錯誤」，並重新生成。

### 5.3 建議三：加入自動驗證機制

- 解析後比對是否包含 `時間戳記`、`指令標籤`、`原始挑戰`、`CodeX 方案摘要`、`執行狀態`。
- 若欄位缺漏，回傳錯誤訊息並要求補齊。
- 若 `競爭力評分` 或 `執行狀態` 格式錯誤，也必須拒絕寫入。

### 5.4 建議四：明確錯誤回傳規則

- 解析失敗時，輸出 `ERROR: 欄位缺失 -> [...]`。
- 標籤錯誤時，輸出 `ERROR: 無效標籤 -> [...]`。
- 重複條目時，輸出 `ERROR: 偵測到重複日誌條目`。
- 檔案寫入失敗時，輸出 `ERROR: 無法寫入 OPTIMIZATION_LOG.md`。

---

## 6. 針對本專案的實施重點

### 6.1 與 `Agent.md` 對齊

- 觸發標籤應與 `Agent.md` 中的角色設定、執行準則與核心系統一致。
- `OPTIMIZATION_LOG.md` 內容應作為 `Agent.md` 設計決策的可追溯驗證紀錄。
- 若 `Agent.md` 改動標籤或流程，須同步更新本文件中的解析規則。

### 6.2 建議實作方式

- 若專案已有 GitHub / GitLab CI，可將此自動化流程納入 `workflow`，讓每次分析建議生成後，直接更新 `OPTIMIZATION_LOG.md`。
- 若專案以專案管理工具為主，可將這份 MD 檔作為「AI 分析紀錄清單」，每次改動皆由 AI 自動輸出並 append。

---

## 7. 範例條目

### 📝 日誌紀錄：社交住宅區活動設計
* **時間戳記:** 2026-06-10
* **指令標籤:** `[Market_Analysis]`
* **原始挑戰:** 評估社交住宅區活動是否可提升 CAC 與留存
* **CodeX 方案摘要:** 建議將虛擬偶像演唱會與付費外觀、家具緊密結合，導入公會排行榜與活動道具交易，提升社群互動與長線變現。
* **執行狀態:** 待驗證

---

## 8. 期望成果

- `OPTIMIZATION_LOG.md` 成為每次 AI 分析建議的唯一且可追溯紀錄。
- AI 生成的內容可直接轉換成日誌，無需手動重整格式。
- 自動化流程可支援標籤辨識、格式校驗、錯誤回傳與 Markdown 追加。
