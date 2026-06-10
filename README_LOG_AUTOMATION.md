# OPTIMIZATION_LOG 自動化使用說明

本文件說明如何使用 `scripts/log-optimization.js` 自動將 AI 分析結果寫入 `OPTIMIZATION_LOG.md`。

快速開始：

1. 使用 JSON 檔案作為輸入：

```bash
node scripts/log-optimization.js --file scripts/test-entry.json
```

2. 或使用 stdin 傳入 JSON：

```bash
cat scripts/test-entry.json | node scripts/log-optimization.js
```

3. 直接使用 CLI 參數輸入（不需要 JSON 檔）：

```bash
node scripts/log-optimization.js --date 2026-06-12 --tag "[Market_Analysis]" --challenge "測試直接 CLI 寫入" --summary "確認直接命令可寫入日誌。" --status "待驗證" --techImpact "前端可行，視覺規格符合 Agent.md。"
```

4. 只輸入 tag 自動生成日誌（自動使用 `待驗證` 作為執行狀態）：

```bash
npm run log -- "[Market_Analysis]"
```

如果要指定不同的執行狀態，使用完整參數：

```bash
node scripts/log-optimization.js --date 2026-06-12 --tag "[Market_Analysis]" --challenge "測試直接 CLI 寫入" --summary "確認直接命令可寫入日誌。" --status "已整合至企劃" --techImpact "前端可行，視覺規格符合 Agent.md。"
```

**執行狀態選項**（擇一使用）：
- `待驗證`（預設值）
- `已整合至企劃`
- `技術限制調整`

## Chat 中的建議流程

在 Chat 中輸入 `[Market_Analysis]`、`[System_Balancing]`、`[Narrative_Check]` 或 `[Dev_Efficiency]`，我會提供相應的建議內容。

收到建議後，你可以手動執行以下命令來記錄日誌：

```bash
npm run log -- "[tag]"
```

5. 以檔案觸發自動寫入：

1. 啟動 watch 模式：

```bash
npm run watch-log
```

2. 在專案根目錄打開 `OPTIMIZATION_LOG_TRIGGER.md`
3. 輸入想觸發的標籤，例如：

```text
[Market_Analysis]
```

4. 儲存檔案後，watcher 會自動將該標籤轉成 `OPTIMIZATION_LOG.md` 日誌條目。

注意：watch 模式會讀取檔案中的有效標籤，處理後會自動清空觸發檔案內容。

輸入 JSON 範例結構（必填欄位）：

```json
{
  "date": "YYYY-MM-DD",
  "tag": "[Market_Analysis]",
  "challenge": "功能名稱或挑戰描述",
  "techImpact": "技術/產能影響說明（選填）",
  "summary": "CodeX 方案摘要",
  "status": "待驗證"
}
```

注意：`tag` 必須為 `[Market_Analysis]`、`[System_Balancing]`、`[Narrative_Check]` 或 `[Dev_Efficiency]`。`status` 必須為 `已整合至企劃`、`待驗證` 或 `技術限制調整`。

錯誤代碼：

- 2：輸入讀取錯誤
- 3：寫入失敗或解析後仍錯誤（此情況會在 `OPTIMIZATION_LOG.md` 中加入 `### 🛠️ TODO: 人工檢查` 條目以供人工處理）

如需進一步整合 CI 或自動化流水線，請將 `node scripts/log-optimization.js --file <path>` 加入 workflow。
