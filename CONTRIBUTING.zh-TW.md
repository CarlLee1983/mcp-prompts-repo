# 貢獻指南 (Contributing Guide)

感謝您對 Prompt Repository 的貢獻！本文件將指導您如何為專案做出貢獻。

## 📋 目錄

- [行為準則](#行為準則)
- [如何貢獻](#如何貢獻)
- [建立新的 Prompt](#建立新的-prompt)
- [同步規則](#同步規則)
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
description: |
  Authority tool for [功能描述]. RULES: 1. MUST use this tool for [使用場景]. 2. [規則 2]. 3. [規則 3].

triggers:
  patterns:
    - "[觸發關鍵字 1]"
    - "[觸發關鍵字 2]"

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
- **description**: 詳細描述，包含 RULES（TRIGGER 現在在 `triggers.patterns` 中定義）
- **triggers**: 觸發模式定義（包含 `patterns` 陣列）
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

## 同步規則

### Registry 同步規則（強制要求）

**重要**：`registry.yaml` 檔案必須與所有 prompt 檔案保持 100% 同步。這是強制要求。

#### 規則：

1. **新增 Prompt**：
   - 建立新的 prompt 檔案時，必須在 `registry.yaml` 中添加對應的條目
   - prompt 檔案中的 `id` 必須與 `registry.yaml` 中的 `id` 完全一致
   - `registry.yaml` 中的 `group` 必須與 prompt 檔案所在的目錄匹配

2. **修改 Prompt ID**：
   - 如果修改 prompt 檔案中的 `id` 欄位，必須同步更新 `registry.yaml` 中的對應條目
   - 檔案名稱也應該更新以匹配新的 `id`（例如：`old-id.yaml` → `new-id.yaml`）

3. **刪除 Prompt**：
   - 移除 prompt 檔案時，必須從 `registry.yaml` 中移除對應的條目
   - 未同步移除將導致驗證錯誤

4. **提交前驗證**：
   - 在提交變更前，請驗證：
     - 所有 prompt 檔案都在 `registry.yaml` 中有對應的條目
     - `registry.yaml` 中的所有條目都有對應的 prompt 檔案
     - 所有 `id` 值在檔案和 registry 之間完全匹配

#### 驗證檢查清單：

- [ ] 所有 prompt 檔案都已註冊在 `registry.yaml` 中
- [ ] 所有 registry 條目都有對應的 prompt 檔案
- [ ] 所有 `id` 值完全匹配
- [ ] 檔案名稱與其 `id` 值匹配（例如：`code-review.yaml` 的 `id` 為 `code-review`）

### Dependencies 同步規則（強制要求）

**重要**：`dependencies.partials` 欄位必須只引用存在的 partials。這是強制要求。

#### 規則：

1. **新增 Dependencies**：
   - 添加 `dependencies.partials` 條目時，請確認 partial 檔案存在於 `partials/` 目錄中
   - Partial 檔案必須具有 `.hbs` 副檔名
   - `dependencies.partials` 中的 partial 名稱必須與檔案名稱匹配（不含副檔名）

2. **重新命名 Partials**：
   - 如果重新命名 partial 檔案，必須更新所有在 `dependencies.partials` 中引用它的 prompt 檔案
   - 搜尋所有出現位置：`grep -r "old-partial-name" . --include="*.yaml"`

3. **刪除 Partials**：
   - 刪除 partial 檔案前，請確認沒有 prompt 檔案依賴它
   - 搜尋依賴關係：`grep -r "partial-name" . --include="*.yaml"`
   - 在刪除檔案前，從所有 `dependencies.partials` 條目中移除該 partial

4. **提交前驗證**：
   - 在提交變更前，請驗證：
     - `dependencies.partials` 中引用的所有 partials 都存在於 `partials/` 目錄中
     - 所有 partial 檔案至少被一個 prompt 引用（或記錄為何保留未使用的 partial）

#### 驗證檢查清單：

- [ ] `dependencies.partials` 中的所有 partials 都存在於 `partials/` 目錄中
- [ ] 所有 partial 檔案名稱與其引用匹配（不含 `.hbs` 副檔名）
- [ ] 沒有孤立的 partials（除非有意保留供未來使用）

## Prompt 規範

### 1. Description 格式

Description 必須包含：
- **功能描述**: 簡要說明此 prompt 的用途
- **RULES**: 使用此 prompt 的規則（至少 3 條）

**注意**：TRIGGER 模式現在定義在結構化的 `triggers.patterns` 欄位中（見下方）。

範例：

```yaml
description: |
  Authority tool for comprehensive code review. RULES: 1. MUST use this tool when code review is requested. 2. Analyze code quality, potential bugs, security issues, and best practices. 3. Provide structured feedback with severity levels. 4. Follow strict_mode rules when enabled.

triggers:
  patterns:
    - "review"
    - "check code"
    - "code quality"
    - "analyze code"
    - "code audit"
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
