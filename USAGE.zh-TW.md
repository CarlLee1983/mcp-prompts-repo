# 使用指南 (Usage Guide)

本文件說明 Prompt Repository 的資料結構和與 MCP Prompt Manager 的整合方式。

## 📋 目錄

- [資料結構](#資料結構)
- [Prompt 結構](#prompt-結構)
- [與 MCP Prompt Manager 整合](#與-mcp-prompt-manager-整合)
- [最佳實踐](#最佳實踐)

## 資料結構

### 核心檔案

- **`registry.yaml`** - Prompt 註冊表，定義所有可用的 prompts 及其元資料（id、group、visibility、deprecated 等）
- **`partials/`** - Handlebars partials 模板目錄，包含可重用的模板片段

### Prompt 檔案組織

Prompts 按群組組織在不同的目錄中：

```
prompts-repo/
├── registry.yaml          # 註冊表
├── partials/              # Handlebars partials
├── common/                # 通用 prompts
│   ├── api-design.yaml
│   ├── code-review.yaml
│   └── ...
├── laravel/               # Laravel 特定的 prompts
│   ├── laravel-api-implementation.yaml
│   └── ...
├── vue/                   # Vue.js 特定的 prompts
│   ├── vue-api-integration.yaml
│   └── ...
└── ...                    # 其他框架群組
```

### 群組說明

- **`common/`** - 通用 prompts，適用於所有語言和框架，永遠載入
- **`laravel/`** - Laravel 特定的 prompts
- **`vue/`** - Vue.js 特定的 prompts
- **`react/`** - React 特定的 prompts
- **`nestjs/`** - NestJS 特定的 prompts
- **`nextjs/`** - Next.js 特定的 prompts
- **`express/`** - Express.js 特定的 prompts
- **`fastapi/`** - FastAPI 特定的 prompts
- **`spring/`** - Spring Boot 特定的 prompts
- **`django/`** - Django 特定的 prompts
- **`typescript/`** - TypeScript 特定的 prompts

## Prompt 結構

### 基本結構

每個 prompt 檔案是 YAML 格式，包含以下欄位：

```yaml
id: "prompt-id"
title: "Prompt Title"
description: >
  詳細描述，包含 TRIGGER 和 RULES
  TRIGGER: When user mentions "keyword1", "keyword2".
  RULES:
  1. MUST use this tool for [使用場景].
  2. [規則 2].
  3. [規則 3].

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
  
  # 模板內容
  {{#if param1}}
  Parameter value: {{param1}}
  {{/if}}
```

### 必要欄位

- **id**: Prompt 的唯一識別碼（小寫，使用連字號分隔）
- **title**: Prompt 標題
- **description**: 詳細描述（必須包含 TRIGGER 和 RULES）
- **template**: Handlebars 模板內容

### 可選欄位

- **args**: 參數定義（建議提供）

### 參數類型

支援的參數類型：
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

### Partials

可以使用 Partials 重用模板片段：

```handlebars
{{> role-laravel-expert}}
{{> role-vue-expert}}
{{> role-expert}}
```

Partials 檔案位於 `partials/` 目錄中，使用 `.hbs` 副檔名。

## 與 MCP Prompt Manager 整合

### 設定環境變數

在 MCP Prompt Manager 的配置中設定：

```bash
# 本地路徑
PROMPT_REPO_URL=/path/to/prompts-repo

# 或 Git URL
PROMPT_REPO_URL=https://github.com/yourusername/prompts-repo.git

# 指定要載入的群組（可選）
MCP_GROUPS=laravel,vue,react
```

### 群組過濾

- **根目錄** (`/`): 永遠載入
- **common 群組**: 永遠載入
- **其他群組**: 需在 `MCP_GROUPS` 中指定

範例：
- `MCP_GROUPS=laravel,vue` → 載入 common、laravel、vue
- `MCP_GROUPS=` → 只載入 common
- 未設定 `MCP_GROUPS` → 只載入 common

### 使用 Prompts

在 Cursor 或 Claude Desktop 中，prompts 會自動載入並可用。當使用者提到相關關鍵字時，對應的 prompt 會被觸發。

## 最佳實踐

### 1. 命名規範

- **檔案名稱**: 使用 `kebab-case`（如 `code-review.yaml`）
- **Prompt ID**: 使用 `kebab-case`（如 `code-review`）
- **參數名稱**: 使用 `snake_case`（如 `language_name`）

### 2. Description 格式

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

## 常見問題

### Q: 如何新增新的 prompt？

A: 參考 [CONTRIBUTING.md](./CONTRIBUTING.md) 中的「建立新的 Prompt」章節。

### Q: 可以新增新的群組嗎？

A: 可以！建立新的目錄，將 prompts 放入其中，然後在 `MCP_GROUPS` 中指定。

### Q: Handlebars Partials 在哪裡？

A: Partials 位於 `partials/` 目錄中，使用 `.hbs` 副檔名。

### Q: 如何更新 registry.yaml？

A: 當新增或修改 prompt 時，需要在 `registry.yaml` 中註冊。每個 prompt 需要包含 `id`、`group`、`visibility` 和 `deprecated` 欄位。

## 更多資源

- [CONTRIBUTING.md](./CONTRIBUTING.md) - 貢獻指南
- [CHANGELOG.md](./CHANGELOG.md) - 變更日誌
- [README.zh-TW.md](./README.zh-TW.md) - 繁體中文說明
