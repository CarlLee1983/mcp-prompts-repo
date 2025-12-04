# 熱重載功能測試指南

本指南說明如何測試熱重載（Watch Mode）功能，包括 LocalSource 檔案監聽和 GitSource polling 機制。

## 📋 前置準備

### 1. 安裝依賴

```bash
cd mcp-prompt-manager
pnpm install
```

### 2. 編譯程式碼

```bash
pnpm run build
```

## 🧪 測試場景

### 場景 1: 測試 LocalSource 檔案監聽

#### 步驟 1: 準備測試環境

1. 確保您有一個本地 prompts repository（例如 `~/prompts-repo` 或 `/path/to/your/prompts-repo`）

2. 建立測試用的 `.env` 檔案：

```bash
# .env
PROMPT_REPO_URL=/path/to/your/prompts-repo
STORAGE_DIR=/path/to/your/prompts-repo  # 使用 direct read mode
WATCH_MODE=true
MCP_GROUPS=common
LOG_LEVEL=debug
```

> **注意**: 
> - 將 `/path/to/your/prompts-repo` 替換為您實際的 prompts repository 路徑
> - 設定 `STORAGE_DIR` 與 `PROMPT_REPO_URL` 相同，這樣會啟用 direct read mode，檔案監聽會直接監聽 source 目錄
> - 也可以使用相對路徑，例如 `./prompts-repo`（相對於執行目錄）

#### 步驟 2: 啟動 MCP Server

```bash
pnpm run inspector:dev
```

或直接執行（請替換為您的實際路徑）：

```bash
WATCH_MODE=true \
PROMPT_REPO_URL=/path/to/your/prompts-repo \
STORAGE_DIR=/path/to/your/prompts-repo \
LOG_LEVEL=debug \
node dist/index.js
```

#### 步驟 3: 驗證監聽已啟動

在日誌中應該看到：

```
{"level":30,"time":...,"msg":"Starting file watcher for local repository","repoPath":"...","storageDir":"...","watchPath":"..."}
{"level":30,"time":...,"msg":"File watcher ready","path":"..."}
{"level":30,"time":...,"msg":"File watcher started successfully","path":"..."}
{"level":30,"time":...,"msg":"Watch mode started for all repositories"}
```

#### 步驟 4: 測試檔案變更

1. **修改現有 prompt 檔案**：
   - 開啟 prompts repository 中的任一 `.yaml` 檔案（例如 `common/code-review.yaml`）
   - 修改 `description` 或 `template` 欄位
   - 儲存檔案

2. **觀察日誌**：
   應該看到類似以下的日誌：

```
{"level":30,"time":...,"msg":"File changed, triggering reload","filePath":"/path/to/code-review.yaml"}
{"level":30,"time":...,"msg":"File change detected, reloading single prompt","filePath":"/path/to/code-review.yaml"}
{"level":30,"time":...,"msg":"Single prompt reloaded successfully","promptId":"code-review","filePath":"/path/to/code-review.yaml"}
```

3. **驗證變更生效**：
   - 使用 MCP Inspector 或 Cursor 呼叫該 prompt
   - 確認變更已生效（無需重啟 Server）

#### 步驟 5: 測試新增檔案

1. **新增 prompt 檔案**：
   ```bash
   # 在 prompts repository 中新增檔案
   touch common/test-prompt.yaml
   ```

2. **編輯檔案內容**：
   ```yaml
   id: test-prompt
   title: Test Prompt
   description: This is a test prompt
   template: |
     This is a test template.
   ```

3. **觀察日誌**：
   應該看到檔案新增的日誌和 reload 訊息

#### 步驟 6: 測試刪除檔案

1. **刪除 prompt 檔案**：
   ```bash
   rm common/test-prompt.yaml
   ```

2. **觀察日誌**：
   應該看到檔案刪除的日誌和 prompt 移除的訊息

### 場景 2: 測試 GitSource Polling

#### 步驟 1: 準備測試環境

1. 使用 Git repository URL：

```bash
# .env
PROMPT_REPO_URL=https://github.com/your-username/prompts-repo.git
WATCH_MODE=true
GIT_POLLING_INTERVAL=60000  # 1 分鐘（測試用，生產環境建議 5 分鐘）
MCP_GROUPS=common
LOG_LEVEL=debug
```

> **注意**: 將 `your-username/prompts-repo` 替換為您實際的 GitHub repository

#### 步驟 2: 啟動 MCP Server

```bash
WATCH_MODE=true \
GIT_POLLING_INTERVAL=60000 \
PROMPT_REPO_URL=https://github.com/your-username/prompts-repo.git \
LOG_LEVEL=debug \
node dist/index.js
```

#### 步驟 3: 驗證 Polling 已啟動

在日誌中應該看到：

```
{"level":30,"time":...,"msg":"Starting Git polling","repoUrl":"...","branch":"main","interval":60000}
{"level":30,"time":...,"msg":"Git polling started successfully","interval":60000}
{"level":30,"time":...,"msg":"Initial commit hash recorded","commitHash":"..."}
```

#### 步驟 4: 測試遠端更新

1. **在另一個終端機或 Git 客戶端**：
   - 修改 prompts repository 中的檔案
   - Commit 並 push 到遠端

2. **等待 polling 觸發**（最多等待 `GIT_POLLING_INTERVAL` 時間）

3. **觀察日誌**：
   應該看到類似以下的日誌：

```
{"level":30,"time":...,"msg":"Git repository update detected","oldHash":"...","newHash":"...","branch":"main"}
{"level":30,"time":...,"msg":"Git sync successful"}
{"level":30,"time":...,"msg":"Git update detected, reloading all prompts"}
{"level":30,"time":...,"msg":"Starting prompts reload (zero-downtime)"}
{"level":30,"time":...,"msg":"Prompts reload completed (zero-downtime)","loaded":...,"errors":0}
```

#### 步驟 5: 手動觸發 Polling（可選）

如果需要立即測試，可以修改 `GIT_POLLING_INTERVAL` 為較短時間（例如 10000 = 10 秒），或使用 `mcp_reload_prompts` tool 手動觸發。

### 場景 3: 測試錯誤處理

#### 測試單一 Prompt Reload 失敗時的 Fallback

1. **建立一個無效的 prompt 檔案**：
   ```yaml
   id: invalid-prompt
   # 缺少必要的欄位
   ```

2. **修改該檔案**：
   - 監聽應該會觸發
   - 單一 reload 會失敗
   - 應該自動 fallback 到全部 reload

3. **觀察日誌**：
   應該看到 fallback 的警告訊息：

```
{"level":40,"time":...,"msg":"Failed to validate prompt definition",...}
{"level":30,"time":...,"msg":"Falling back to full reload due to validation error","filePath":"..."}
```

## 🔍 驗證檢查清單

### LocalSource 檔案監聽

- [ ] 監聽成功啟動（日誌中有 "File watcher started successfully"）
- [ ] 修改檔案時觸發 reload（日誌中有 "File changed, triggering reload"）
- [ ] 新增檔案時觸發 reload（日誌中有 "File added, triggering reload"）
- [ ] 刪除檔案時移除 prompt（日誌中有 "File deleted, triggering reload"）
- [ ] Prompt 變更立即生效（無需重啟 Server）
- [ ] 錯誤處理正常（失敗時 fallback 到全部 reload）

### GitSource Polling

- [ ] Polling 成功啟動（日誌中有 "Git polling started successfully"）
- [ ] 初始 commit hash 已記錄（日誌中有 "Initial commit hash recorded"）
- [ ] 遠端更新被偵測到（日誌中有 "Git repository update detected"）
- [ ] 自動觸發全部 reload（日誌中有 "Git update detected, reloading all prompts"）
- [ ] Prompts 成功重新載入（日誌中有 "Prompts reload completed"）

### 通用功能

- [ ] Watch mode 可以正常停止（graceful shutdown）
- [ ] 錯誤不會導致 Server 崩潰
- [ ] 日誌記錄完整且清晰

## 🐛 疑難排解

### 問題 1: 檔案監聽沒有啟動

**可能原因**：
- `WATCH_MODE` 環境變數未設定或為 `false`
- 路徑不存在或無法存取

**解決方法**：
- 確認 `WATCH_MODE=true` 已設定
- 檢查路徑是否正確且可存取
- 查看日誌中的錯誤訊息

### 問題 2: 檔案變更沒有觸發 Reload

**可能原因**：
- 檔案不在監聽範圍內（例如在 excluded 目錄中）
- 檔案不是 `.yaml` 或 `.yml` 格式
- chokidar 的穩定性閾值設定過高

**解決方法**：
- 確認檔案路徑和格式正確
- 檢查日誌中是否有相關錯誤
- 嘗試手動觸發 `mcp_reload_prompts` tool

### 問題 3: Git Polling 沒有偵測到更新

**可能原因**：
- Polling interval 設定過長
- Git fetch 失敗
- 網路連線問題

**解決方法**：
- 暫時降低 `GIT_POLLING_INTERVAL` 進行測試
- 檢查 Git 認證和網路連線
- 查看日誌中的 Git 操作錯誤

### 問題 4: 單一 Prompt Reload 失敗

**可能原因**：
- Prompt 檔案格式錯誤
- 缺少必要的 partials
- 模板編譯失敗

**解決方法**：
- 檢查 prompt 檔案格式
- 確認所有依賴的 partials 都存在
- 查看日誌中的詳細錯誤訊息
- 系統會自動 fallback 到全部 reload

## 📊 效能測試

### 測試大量檔案變更

1. 同時修改多個 prompt 檔案
2. 觀察系統是否能正確處理
3. 檢查是否有效能問題

### 測試 Polling 頻率

1. 調整 `GIT_POLLING_INTERVAL` 到不同值
2. 觀察系統資源使用情況
3. 找到適合的平衡點

## 🎯 最佳實踐

1. **開發環境**：使用 LocalSource + Watch Mode，方便快速迭代
2. **生產環境**：使用 GitSource + Polling，確保版本一致性
3. **Polling Interval**：建議設定為 5 分鐘（300000 毫秒），避免過度頻繁的檢查
4. **日誌級別**：開發時使用 `debug`，生產環境使用 `info`

## 📝 測試腳本範例

建立一個簡單的測試腳本 `test-watch-mode.sh`：

```bash
#!/bin/bash

# 設定您的 prompts repository 路徑
PROMPTS_REPO_PATH="${PROMPTS_REPO_PATH:-./prompts-repo}"

# 測試 LocalSource Watch Mode
echo "Testing LocalSource Watch Mode..."
echo "Using prompts repository: $PROMPTS_REPO_PATH"

WATCH_MODE=true \
PROMPT_REPO_URL="$PROMPTS_REPO_PATH" \
STORAGE_DIR="$PROMPTS_REPO_PATH" \
LOG_LEVEL=debug \
node dist/index.js &

SERVER_PID=$!
echo "Server started with PID: $SERVER_PID"

# 等待伺服器啟動
sleep 5

# 修改測試檔案
echo "Modifying test file..."
echo "# Test change" >> "$PROMPTS_REPO_PATH/common/test.yaml"

# 等待 reload
sleep 3

# 停止伺服器
kill $SERVER_PID
echo "Test completed"
```

執行測試：

```bash
# 使用預設路徑（./prompts-repo）
chmod +x test-watch-mode.sh
./test-watch-mode.sh

# 或指定自訂路徑
PROMPTS_REPO_PATH=/path/to/your/prompts-repo ./test-watch-mode.sh
```

