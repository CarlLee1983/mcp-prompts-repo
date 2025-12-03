# 貢獻指南 (Contributing Guide)

感謝您對 Prompt Repository 的貢獻！本文件將指導您如何為專案做出貢獻。

## 📋 目錄

- [行為準則](#行為準則)
- [如何貢獻](#如何貢獻)
- [建立新的 Prompt](#建立新的-prompt)
- [Prompt 規範](#prompt-規範)
- [提交變更](#提交變更)
- [程式碼風格](#程式碼風格)

## 行為準則

請保持友善、尊重和專業的態度。我們歡迎所有形式的貢獻，無論是：
- 報告錯誤
- 建議新功能
- 提交 Pull Request
- 改進文檔
- 分享使用經驗

## 如何貢獻

### 1. Fork 並 Clone 專案

```bash
# Fork 專案後，clone 到本地
git clone https://github.com/yourusername/prompts-repo.git
cd prompts-repo
```

### 2. 建立分支

```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-bug-fix
```

### 3. 進行變更

進行您的變更，並確保遵循本指南的規範。

### 4. 提交變更

請遵循 [Commit Message 規範](#commit-message-規範)。

## 建立新的 Prompt

### 選擇正確的群組

- **common/**: 通用 prompts，適用於所有語言和框架
- **laravel/**: Laravel 特定的 prompts
- **vue/**: Vue.js 特定的 prompts
- **react/**: React 特定的 prompts
- **其他框架/**: 對應的框架特定 prompts

### Prompt 檔案結構

每個 Prompt 檔案必須是 YAML 格式，包含以下必要欄位：

```yaml
id: "your-prompt-id"
title: "Your Prompt Title"
description: >
  Authority tool for [功能描述].
  TRIGGER: When user mentions "[觸發關鍵字]".
  RULES:
  1. MUST use this tool for [使用場景].
  2. [規則 2]
  3. [規則 3]

args:
  param1:
    type: "string"
    description: "參數描述"
    default: "預設值"  # 可選
  param2:
    type: "number"
    description: "另一個參數"

template: |
  {{> role-expert}}
  
  # Context
  [您的 Handlebars 模板內容]
```

### 必要欄位說明

- **id**: Prompt 的唯一識別碼（小寫，使用連字號分隔）
- **title**: Prompt 的標題（簡潔明瞭）
- **description**: 詳細描述，包含 TRIGGER 和 RULES
- **args**: 參數定義（可選，但建議提供）
- **template**: Handlebars 模板內容

### 參數類型

支援的參數類型：
- `string`: 字串類型
- `number`: 數字類型
- `boolean`: 布林類型

### 檔案命名規範

- 使用小寫字母
- 使用連字號 (`-`) 分隔單詞
- 檔案副檔名為 `.yaml` 或 `.yml`
- 範例：`code-review.yaml`, `laravel-api-implementation.yaml`

### 更新 registry.yaml

新增 prompt 後，需要在 `registry.yaml` 中註冊：

```yaml
prompts:
  - id: "your-prompt-id"
    group: "common"  # 或對應的群組名稱
    visibility: "public"  # 或 "internal"
    deprecated: false
```

## Prompt 規範

### 1. Description 格式

Description 必須包含：
- **功能描述**: 簡要說明此 prompt 的用途
- **TRIGGER**: 觸發此 prompt 的關鍵字或情境
- **RULES**: 使用此 prompt 的規則（至少 3 條）

範例：

```yaml
description: >
  Authority tool for comprehensive code review.
  TRIGGER: When user mentions "review", "check code", "code quality", "analyze code", or "code audit".
  RULES:
  1. MUST use this tool when code review is requested.
  2. Analyze code quality, potential bugs, security issues, and best practices.
  3. Provide structured feedback with severity levels.
  4. Follow strict_mode rules when enabled.
```

### 2. Template 規範

- 使用 Handlebars 語法 (`{{}}`)
- 支援 Partials (`{{> partial-name}}`)
- 使用條件語句 (`{{#if}}`, `{{#unless}}`)
- 使用迴圈 (`{{#each}}`)

### 3. 通用 vs 框架特定

**通用 Prompt (common/)**:
- 不依賴特定框架
- 使用 `{{> role-expert}}`
- 參數包含 `language` 和 `framework`（可選）

**框架特定 Prompt**:
- 針對特定框架
- 使用 `{{> role-laravel-expert}}` 等框架特定 partials
- 包含框架版本參數（如 `laravel_version`, `vue_version`）

### 4. 版本參數

框架特定的 prompts 應包含版本參數：

```yaml
args:
  laravel_version:
    type: "string"
    description: "Laravel version (e.g., 10.x, 11.x)"
    default: "11.x"
```

## 提交變更

### Commit Message 規範

請遵循以下格式：

```
<type>：[ <scope> ] <subject>

<body>

<footer>
```

**Type 類型**:
- `feat`: 新增功能
- `fix`: 修復錯誤
- `docs`: 文檔變更
- `style`: 程式碼格式變更
- `refactor`: 重構
- `test`: 測試相關
- `chore`: 建構或工具變更

**範例**:

```
feat: [common] 新增 code-review prompt

新增通用的代碼審查 prompt，支援多種程式語言和框架
包含完整的參數定義和 Handlebars 模板
```

### Pull Request 流程

1. 確保您的變更遵循本指南的規範
2. 更新相關文檔（如需要）
3. 提交 Pull Request，並提供清晰的描述
4. 等待審查和反饋

## 程式碼風格

### YAML 格式

- 使用 2 個空格縮排
- 字串使用 `>` 或 `|` 進行多行處理
- 保持一致的格式

### 命名規範

- **檔案名稱**: 小寫，連字號分隔（`kebab-case`）
- **Prompt ID**: 小寫，連字號分隔（`kebab-case`）
- **參數名稱**: 小寫，底線分隔（`snake_case`）

## 問題回報

如果發現問題，請：
1. 檢查是否已有相關 Issue
2. 建立新的 Issue，提供詳細描述
3. 包含重現步驟（如適用）

## 聯絡方式

如有疑問，請：
- 建立 Issue 進行討論
- 參考現有的 prompts 作為範例

感謝您的貢獻！🎉
