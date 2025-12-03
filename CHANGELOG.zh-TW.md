# 變更日誌 (Changelog)

本專案遵循 [Semantic Versioning](https://semver.org/lang/zh-TW/) 版本規範。

格式基於 [Keep a Changelog](https://keepachangelog.com/zh-TW/1.0.0/)，
本專案採用 [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/deed.zh_TW) 授權。

## [Unreleased]

### 已變更 (Changed)

- 所有 prompt 檔案現在使用結構化的 `triggers.patterns` 欄位，而非在 description 中使用 TRIGGER 文字
- 所有使用 `{{> partial }}` 的 prompt 檔案現在都有明確的 `dependencies.partials` 聲明
- `registry.yaml` 與所有 YAML prompt 檔案現在已 100% 同步
- 所有文檔已更新，移除 CLI 工具相關內容
  - `README.md` - 更新為純資料倉庫說明
  - `README.zh-TW.md` - 同步更新繁體中文文檔
  - `USAGE.md` - 簡化為資料結構說明
  - `CONTRIBUTING.md` - 移除驗證和安裝步驟，並補上 registry 與 dependencies 強制同步規則

### 已移除 (Removed)

- CLI 工具 (`scripts/pm.js`) - 所有驗證、文檔生成等功能已由通用 CLI 工具處理
- `package.json` - 不再需要 Node.js 依賴和腳本
- `pnpm-lock.yaml` - 不再需要依賴管理

#### 說明
本倉庫現在是一個**純資料結構倉庫**，專注於儲存 prompt 模板和配置檔案。所有功能代碼（驗證、文檔生成等）已移至通用的 CLI 工具中，以實現更好的關注點分離和可維護性。

## [1.0.0] - 2024-12-01

### 新增 (Added)

#### 核心功能
- 初始化 Prompt Repository 專案結構
- 建立 CLI 工具 (`scripts/pm.js`) 支援基本操作
  - `list`: 列出所有 prompts
  - `validate`: 驗證 prompts 格式
  - `config`: 顯示配置資訊
  - `docs`: 自動生成文檔
  - `add`: 新增 prompt（開發中）

#### 通用 Prompts (common/)
- `api-design`: RESTful API 設計與架構
- `architecture-design`: 系統架構與模組設計
- `code-generation`: 從規格生成代碼
- `code-review`: 全面代碼審查
- `database-optimization`: 資料庫優化與查詢效能分析
- `documentation-generator`: 文檔生成工具
- `error-handling-design`: 錯誤處理模式設計
- `generate-unit-tests`: 通用單元測試生成器
- `performance-analysis`: 非資料庫效能分析
- `refactor-code`: 代碼重構
- `security-audit`: 安全漏洞評估

#### Laravel Prompts (laravel/)
- `eloquent-optimization`: Eloquent ORM 優化
- `laravel-api-implementation`: Laravel RESTful API 實作
- `laravel-architecture`: Laravel 系統架構設計
- `laravel-code-generation`: Laravel 代碼生成
- `laravel-code-review`: Laravel 代碼審查
- `laravel-documentation`: Laravel 文檔生成
- `laravel-error-handling`: Laravel 錯誤處理設計
- `laravel-generate-tests`: Laravel 測試生成（PHPUnit）
- `laravel-migration-design`: Laravel 資料庫遷移設計
- `laravel-model-design`: Laravel Eloquent 模型設計
- `laravel-performance`: Laravel 效能分析
- `laravel-refactor-code`: Laravel 代碼重構
- `laravel-security`: Laravel 安全稽核
- `laravel-service-provider`: Laravel 服務提供者設計
- `refactor-controller`: Laravel 控制器重構

#### Vue Prompts (vue/)
- `vue-component-review`: Vue 3 元件審查
- `vue-api-integration`: Vue 3 API 整合
- `vue-architecture`: Vue 應用架構設計
- `vue-code-generation`: Vue 代碼生成
- `vue-code-review`: Vue 代碼審查
- `vue-composable-design`: Vue Composables 設計
- `vue-documentation`: Vue 文檔生成
- `vue-error-handling`: Vue 錯誤處理設計
- `vue-generate-tests`: Vue 測試生成（Vitest/Jest）
- `vue-performance`: Vue 效能分析
- `vue-pinia-setup`: Pinia Store 設計
- `vue-refactor-code`: Vue 代碼重構
- `vue-router-config`: Vue Router 配置
- `vue-security`: Vue 安全稽核

#### React Prompts (react/)
- `react-api-integration`: React API 整合
- `react-component-review`: React 元件審查
- `react-hooks-design`: React Hooks 設計
- `react-performance`: React 效能分析
- `react-testing`: React 測試生成

#### Next.js Prompts (nextjs/)
- `nextjs-api-routes`: Next.js API 路由設計
- `nextjs-page-design`: Next.js 頁面設計

#### 其他框架 Prompts
- `django-view-design`: Django 視圖設計
- `express-route-design`: Express.js 路由設計
- `fastapi-endpoint-design`: FastAPI 端點設計
- `nestjs-controller-design`: NestJS 控制器設計
- `spring-controller-design`: Spring Boot 控制器設計
- `typescript-type-design`: TypeScript 類型設計

#### 文檔
- `README.md`: 自動生成的英文文檔
- `README.zh-TW.md`: 繁體中文文檔
- `LICENSE`: ISC License
- `.gitignore`: 完整的 Git 忽略規則

### 技術細節

#### 依賴
- `js-yaml`: ^4.1.1 (YAML 解析)

#### 工具
- Node.js CLI 工具
- 自動文檔生成
- YAML 格式驗證
- 群組管理

### 統計
- 總 Prompts 數: 53 個
- 框架覆蓋: 11 個框架/語言
- 通用 Prompts: 11 個
- 框架特定 Prompts: 42 個

---

## 版本說明

- **[Unreleased]**: 尚未發布的變更
- **[版本號]**: 已發布的版本，包含日期和變更類型

### 變更類型

- **Added**: 新增功能
- **Changed**: 對現有功能的變更
- **Deprecated**: 即將移除的功能
- **Removed**: 已移除的功能

