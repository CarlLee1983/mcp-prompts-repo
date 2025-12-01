# 使用指南 (Usage Guide)

本文件說明如何使用 Prompt Repository 和 CLI 工具。

## 📋 目錄

- [快速開始](#快速開始)
- [CLI 工具使用](#cli-工具使用)
- [Prompt 結構](#prompt-結構)
- [與 MCP Prompt Manager 整合](#與-mcp-prompt-manager-整合)
- [最佳實踐](#最佳實踐)

## 快速開始

### 1. 安裝依賴

```bash
pnpm install
# 或
npm install
```

### 2. 驗證 Prompts

```bash
npm run validate
```

### 3. 查看所有 Prompts

```bash
npm run list
```

### 4. 生成文檔

```bash
npm run docs
```

## CLI 工具使用

### `npm run list` / `npm run list`

列出所有可用的 prompt 群組和 prompts。

```bash
npm run list
```

**輸出範例**:
```
📦 Available Prompt Groups:

  📂 common (11 prompts)
     - api-design.yaml
     - code-review.yaml
     ...
```

### `npm run validate` / `npm run check`

驗證所有 prompts 的 YAML 格式和必要欄位。

```bash
npm run validate
```

**成功輸出**:
```
✅ All 53 prompts validated successfully!
```

**失敗輸出**:
```
❌ Error in [laravel/example.yaml]: Missing required fields: title
❌ Validation failed: 52/53 prompts are valid
```

### `npm run docs`

自動生成 `README.md` 文檔。

```bash
npm run docs
```

**功能**:
- 掃描所有 prompt 檔案
- 提取 `id` 和 `description`
- 按群組組織
- 覆蓋現有的 `README.md`（會自動備份）

### `npm run config`

顯示專案配置資訊（開發中）。

```bash
npm run config
```

### `npm run add`

互動式新增 prompt（開發中）。

```bash
npm run add
```

## Prompt 結構

### 基本結構

每個 prompt 檔案是 YAML 格式，包含以下欄位：

```yaml
id: "prompt-id"
title: "Prompt Title"
description: "詳細描述，包含 TRIGGER 和 RULES"
args:
  param1:
    type: "string"
    description: "參數描述"
template: |
  {{> role-expert}}
  
  # 模板內容
```

### 必要欄位

- **id**: Prompt 的唯一識別碼
- **title**: Prompt 標題
- **description**: 詳細描述（包含 TRIGGER 和 RULES）
- **template**: Handlebars 模板內容

### 可選欄位

- **args**: 參數定義（建議提供）

### 參數類型

- `string`: 字串
- `number`: 數字
- `boolean`: 布林值

### Handlebars 語法

Prompts 使用 Handlebars 模板語法：

```handlebars
{{> role-expert}}

{{#if language}}
You are working with {{language}} code.
{{/if}}

{{#each items}}
- {{this}}
{{/each}}
```

## 與 MCP Prompt Manager 整合

### 設定環境變數

在 MCP Prompt Manager 的 `.env` 檔案中設定：

```bash
# 本地路徑
PROMPT_REPO_URL=/path/to/prompts-repo

# 或 Git URL
PROMPT_REPO_URL=https://github.com/yourusername/prompts-repo.git

# 指定要載入的群組
MCP_GROUPS=laravel,vue,react
```

### 群組過濾

- **根目錄** (`/`): 永遠載入
- **common 群組**: 永遠載入
- **其他群組**: 需在 `MCP_GROUPS` 中指定

範例：
- `MCP_GROUPS=laravel,vue` → 載入 common、laravel、vue
- `MCP_GROUPS=` → 只載入 common

### 使用 Prompts

在 Cursor 或 Claude Desktop 中，prompts 會自動載入並可用。

## 最佳實踐

### 1. 命名規範

- **檔案名稱**: 使用 `kebab-case`（如 `code-review.yaml`）
- **Prompt ID**: 使用 `kebab-case`（如 `code-review`）
- **參數名稱**: 使用 `snake_case`（如 `language_name`）

### 2. Description 格式

```yaml
description: >
  Authority tool for [功能描述].
  TRIGGER: When user mentions "[關鍵字1]", "[關鍵字2]", or "[關鍵字3]".
  RULES:
  1. MUST use this tool for [使用場景].
  2. [規則 2].
  3. [規則 3].
```

### 3. 參數設計

- 提供清晰的描述
- 設定合理的預設值
- 使用適當的類型

### 4. 模板設計

- 使用 Partials 重用程式碼
- 使用條件語句處理可選參數
- 保持模板清晰易讀

### 5. 版本管理

- 使用 Git 進行版本控制
- 遵循語義化版本規範
- 在 CHANGELOG.md 中記錄變更

### 6. 測試

在提交前：
```bash
npm run validate  # 驗證格式
npm run list      # 檢查列表
npm run docs      # 更新文檔
```

## 常見問題

### Q: 如何新增新的 prompt？

A: 參考 [CONTRIBUTING.md](./CONTRIBUTING.md) 中的「建立新的 Prompt」章節。

### Q: 驗證失敗怎麼辦？

A: 檢查錯誤訊息，確保所有必要欄位都存在且格式正確。

### Q: 如何更新文檔？

A: 執行 `npm run docs`，它會自動掃描所有 prompts 並更新 `README.md`。

### Q: 可以新增新的群組嗎？

A: 可以！建立新的目錄，將 prompts 放入其中，然後在 `MCP_GROUPS` 中指定。

### Q: Handlebars Partials 在哪裡？

A: Partials 通常定義在 MCP Prompt Manager 的 `partials/` 目錄中，或 prompt repository 的 `partials/` 目錄。

## 更多資源

- [CONTRIBUTING.md](./CONTRIBUTING.md) - 貢獻指南
- [CHANGELOG.md](./CHANGELOG.md) - 變更日誌
- [README.zh-TW.md](./README.zh-TW.md) - 繁體中文說明

