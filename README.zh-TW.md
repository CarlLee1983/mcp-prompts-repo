# 提示詞倉庫 (Prompt Repository)

這是一個純資料結構倉庫，包含用於 MCP Prompt Manager 的 prompt 模板和配置檔案。

## 📋 專案說明

本倉庫是一個**純資料結構倉庫**，不包含任何功能代碼或 CLI 工具。所有驗證、文檔生成等功能已由通用的 CLI 工具處理。

## 📂 資料結構

### 核心檔案

- **`registry.yaml`** - Prompt 註冊表，定義所有可用的 prompts 及其元資料
- **`partials/`** - Handlebars partials 模板目錄

### Prompt 檔案

Prompts 按群組組織在不同的目錄中：

- **`common/`** - 通用 prompts，適用於所有語言和框架
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

## 📚 文檔

- [使用指南](./USAGE.md) - 資料結構說明和與 MCP Prompt Manager 整合
- [貢獻指南](./CONTRIBUTING.md) - 如何為專案做出貢獻
- [變更日誌](./CHANGELOG.md) - 版本變更記錄
- [英文文檔](./README.md) - 英文說明

## 🔗 與 MCP Prompt Manager 整合

### 設定環境變數

在 MCP Prompt Manager 的配置中設定：

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

## 📦 統計

- **總 Prompts**: 53 個
- **框架覆蓋**: 11 個框架/語言
- **通用 Prompts**: 11 個
- **框架特定 Prompts**: 42 個

## 📂 群組：common（通用）

- **api-design**：RESTful API 設計與架構的權威工具。觸發條件：當使用者提到「設計 api」、「建立 api」、「api 端點」、「rest api」、「api 架構」或「api 結構」時。規則：1. 進行 API 設計任務時必須使用此工具。2. 遵循業界最佳實踐設計 RESTful API。3. 考慮後端與前端整合模式。4. 提供完整的 API 規格與範例。

- **architecture-design**：設計系統架構與模組結構的權威工具。觸發條件：當使用者提到「架構」、「系統設計」、「模組設計」、「系統架構」、「軟體架構」、「微服務」、「單體架構」或「系統結構」時。規則：1. 進行架構與系統設計任務時必須使用此工具。2. 設計可擴展、可維護且穩健的系統架構。3. 考慮不同的架構模式（單體架構、微服務、無伺服器等）。4. 提供模組結構與元件設計。5. 包含可擴展性、可維護性與效能考量。

- **code-generation**：從規格生成代碼骨架與實作的權威工具。觸發條件：當使用者提到「生成代碼」、「建立代碼」、「代碼骨架」、「代碼腳手架」、「從規格實作」、「從需求生成代碼」或「生成實作」時。規則：1. 進行代碼生成任務時必須使用此工具。2. 遵循語言與框架最佳實踐從規格生成代碼。3. 建立完整、可投入生產的代碼結構。4. 包含適當的錯誤處理、驗證與文檔。5. 適用時遵循 SOLID 原則與設計模式。

- **code-review**：全面代碼審查的權威工具。觸發條件：當使用者提到「審查」、「檢查代碼」、「代碼品質」、「分析代碼」或「代碼稽核」時。規則：1. 當請求代碼審查時必須使用此工具。2. 分析代碼品質、潛在錯誤、安全問題與最佳實踐。3. 提供結構化的回饋與嚴重程度分級。4. 啟用 strict_mode 時遵循嚴格模式規則。

- **database-optimization**：資料庫優化與查詢效能分析的權威工具。觸發條件：當使用者提到「優化資料庫」、「慢查詢」、「資料庫效能」、「查詢優化」、「n+1 問題」或「預載入」時。規則：1. 進行資料庫與查詢優化任務時必須使用此工具。2. 分析任何 ORM 或查詢建構器的資料庫查詢與結構。3. 識別 N+1 問題、缺失的索引與低效查詢。4. 提供優化策略與代碼範例。

- **documentation-generator**：生成全面文檔的權威工具，包括 API 文檔、代碼註解與 README 檔案。觸發條件：當使用者提到「生成文檔」、「建立文檔」、「api 文檔」、「代碼註解」、「readme」、「文檔化代碼」或「撰寫文檔」時。規則：1. 進行文檔生成任務時必須使用此工具。2. 遵循業界標準與最佳實踐生成文檔。3. 支援多種文檔格式（Markdown、OpenAPI、JSDoc、PHPDoc 等）。4. 請求時包含範例與使用模式。5. 確保文檔清晰、全面且可維護。

- **error-handling-design**：設計全面錯誤處理模式與異常結構的權威工具。觸發條件：當使用者提到「錯誤處理」、「異常設計」、「錯誤管理」、「錯誤恢復」、「錯誤日誌」或「錯誤模式」時。規則：1. 進行錯誤處理設計任務時必須使用此工具。2. 遵循語言與框架最佳實踐設計錯誤處理模式。3. 建立異常層次結構與錯誤回應結構。4. 包含日誌與監控策略。5. 提供錯誤恢復機制。

- **generate-unit-tests**：為任何程式語言生成單元測試的權威工具。觸發條件：當使用者提到「生成測試」、「建立測試」、「撰寫測試」、「單元測試」、「測試案例」、「測試覆蓋率」或「測試」時。規則：1. 當請求單元測試生成時必須使用此工具。2. 分析代碼結構並生成全面的單元測試。3. 使用適合程式語言的測試框架。4. 請求時包含邊界情況與錯誤處理。5. 遵循語言與框架最佳實踐。

- **performance-analysis**：分析代碼效能並識別非資料庫相關效能瓶頸的權威工具。觸發條件：當使用者提到「效能」、「優化效能」、「慢代碼」、「瓶頸」、「cpu 使用率」、「記憶體使用率」、「演算法優化」或「效能分析」時。規則：1. 進行效能分析任務時必須使用此工具（排除資料庫特定優化）。2. 分析 CPU、記憶體、網路、I/O 與演算法效能。3. 識別效能瓶頸與優化機會。4. 提供可執行的效能改進建議。5. 適用時考慮並發與平行處理。

- **refactor-code**：代碼重構的權威工具。觸發條件：當使用者提到「重構」、「改進代碼」、「優化代碼」、「重組代碼」或「代碼清理」時。規則：1. 進行代碼重構任務時必須使用此工具。2. 在改進代碼結構的同時維持現有功能。3. 應用 SOLID 原則與最佳實踐。4. 如果未指定意圖，則自動推斷重構機會。

- **security-audit**：全面安全漏洞評估與安全稽核的權威工具。觸發條件：當使用者提到「安全稽核」、「安全審查」、「漏洞」、「安全檢查」、「滲透測試」、「安全掃描」、「owasp」或「安全評估」時。規則：1. 進行安全稽核與漏洞評估任務時必須使用此工具。2. 專注於識別安全漏洞與風險。3. 對照 OWASP Top 10、CWE 與其他安全標準進行檢查。4. 提供可執行的安全建議。5. 按嚴重程度與影響優先排序漏洞。


## 📂 群組：django

- **django-view-design**：設計 Django 視圖與 API 端點的權威工具。觸發條件：當使用者提到「django view」、「django api」、「django endpoint」、「django rest」或「django viewset」時。規則：1. 進行 Django 視圖設計任務時必須使用此工具。2. 遵循 Django 最佳實踐設計視圖。3. 使用 Django REST Framework 建立 RESTful 端點。4. 包含適當的序列化與驗證。5. 提供完整的視圖實作。


## 📂 群組：express

- **express-route-design**：設計 Express.js 路由與處理器的權威工具。觸發條件：當使用者提到「express route」、「express api」、「express endpoint」、「express handler」或「express routing」時。規則：1. 進行 Express.js 路由設計任務時必須使用此工具。2. 遵循 Express.js 最佳實踐設計路由。3. 建立具有適當中介軟體的 RESTful 端點。4. 包含適當的錯誤處理與驗證。5. 提供完整的路由實作。


## 📂 群組：fastapi

- **fastapi-endpoint-design**：設計 FastAPI 端點與路由的權威工具。觸發條件：當使用者提到「fastapi endpoint」、「fastapi route」、「fastapi api」、「fastapi handler」或「fastapi router」時。規則：1. 進行 FastAPI 端點設計任務時必須使用此工具。2. 遵循 FastAPI 最佳實踐設計端點。3. 建立具有適當 Pydantic 模型的 RESTful 端點。4. 包含適當的驗證與文檔。5. 提供完整的端點實作。


## 📂 群組：laravel

- **eloquent-optimization**：Laravel Eloquent ORM 優化與查詢效能分析的權威工具。觸發條件：當使用者提到「優化 eloquent」、「eloquent 效能」、「eloquent 查詢」、「n+1 eloquent」或「預載入 eloquent」時。規則：1. 進行 Eloquent ORM 優化任務時必須使用此工具。2. 分析 Eloquent 查詢與關聯。3. 識別 N+1 問題、缺失的索引與低效的 Eloquent 查詢。4. 提供 Eloquent 特定的優化策略。

- **laravel-api-implementation**：Laravel RESTful API 實作的權威工具。觸發條件：當使用者提到「實作 laravel api」、「建立 laravel api」、「laravel api 端點」、「laravel rest api」或「laravel api 路由」時。規則：1. 進行 Laravel API 實作任務時必須使用此工具。2. 遵循 Laravel 最佳實踐實作 RESTful API。3. 提供完整的 Laravel 實作，包括控制器、請求、服務與路由。4. 考慮 Laravel API 資源與表單請求。

- **laravel-architecture**：設計 Laravel 系統架構與模組結構的權威工具。觸發條件：當使用者提到「laravel architecture」、「laravel system design」、「laravel module design」、「laravel system architecture」、「laravel software architecture」或「laravel structure」時。規則：1. 進行 Laravel 架構與系統設計任務時必須使用此工具。2. 設計可擴展、可維護且穩健的 Laravel 架構。3. 考慮 Laravel 架構模式（MVC、Service Layer、Repository 等）。4. 提供 Laravel 模組結構與元件設計。5. 包含 Laravel 可擴展性、可維護性與效能考量。

- **laravel-code-generation**：從規格生成 Laravel 代碼骨架與實作的權威工具。觸發條件：當使用者提到「generate laravel code」、「create laravel code」、「laravel code skeleton」、「scaffold laravel code」、「laravel artisan」、「implement laravel from spec」或「generate laravel implementation」時。規則：1. 進行 Laravel 代碼生成任務時必須使用此工具。2. 遵循 Laravel 最佳實踐從規格生成代碼。3. 建立完整、可投入生產的 Laravel 代碼結構。4. 包含適當的錯誤處理、驗證與文檔。5. 遵循 SOLID 原則與 Laravel 設計模式。

- **laravel-code-review**：全面 Laravel 代碼審查的權威工具。觸發條件：當使用者提到「review laravel」、「check laravel code」、「laravel code quality」、「analyze laravel code」、「laravel code audit」或「review php laravel」時。規則：1. 當請求 Laravel 代碼審查時必須使用此工具。2. 分析 Laravel 代碼品質、潛在錯誤、安全問題與 Laravel 最佳實踐。3. 檢查 PSR 標準、Laravel 慣例與框架特定模式。4. 提供結構化的回饋與嚴重程度分級。5. 啟用 strict_mode 時遵循嚴格模式規則。

- **laravel-documentation**：生成全面 Laravel 文檔的權威工具，包括 API 文檔、PHPDoc 註解與 README 檔案。觸發條件：當使用者提到「generate laravel docs」、「create laravel documentation」、「laravel api docs」、「phpdoc」、「laravel code comments」、「laravel readme」或「document laravel code」時。規則：1. 進行 Laravel 文檔生成任務時必須使用此工具。2. 遵循 PHPDoc 與 Laravel 文檔標準生成文檔。3. 支援 PHPDoc、Markdown 與 OpenAPI 格式。4. 包含 Laravel 特定的範例與使用模式。5. 確保文檔清晰、全面且可維護。

- **laravel-error-handling**：設計全面 Laravel 錯誤處理模式與異常結構的權威工具。觸發條件：當使用者提到「laravel error handling」、「laravel exception design」、「laravel error management」、「laravel error recovery」、「laravel error logging」或「laravel error patterns」時。規則：1. 進行 Laravel 錯誤處理設計任務時必須使用此工具。2. 遵循 Laravel 最佳實踐設計錯誤處理模式。3. 建立 Laravel 異常層次結構與錯誤回應結構。4. 包含 Laravel 日誌與監控策略。5. 提供 Laravel 特定的錯誤恢復機制。

- **laravel-generate-tests**：使用 PHPUnit 生成 Laravel 單元測試與功能測試的權威工具。觸發條件：當使用者提到「generate laravel tests」、「create laravel tests」、「write laravel tests」、「phpunit tests」、「laravel test cases」或「laravel testing」時。規則：1. 當請求 Laravel 測試生成時必須使用此工具。2. 遵循 Laravel 測試最佳實踐生成 PHPUnit 測試。3. 適當地包含單元測試與功能測試。4. 使用 Laravel 測試輔助工具與斷言。5. 適當時包含資料庫測試模式。

- **laravel-migration-design**：設計 Laravel 資料庫遷移與結構描述的權威工具。觸發條件：當使用者提到「laravel migration」、「database migration」、「laravel schema」、「create table」、「alter table」、「laravel migration design」或「database structure」時。規則：1. 進行 Laravel 遷移設計任務時必須使用此工具。2. 遵循 Laravel 最佳實踐設計遷移。3. 定義適當的資料表結構、索引與外鍵。4. 考慮遷移回滾策略。5. 提供完整的遷移實作。

- **laravel-model-design**：設計 Laravel Eloquent 模型、關聯與模型結構的權威工具。觸發條件：當使用者提到「laravel model」、「eloquent model」、「laravel model design」、「model relationships」、「model structure」、「laravel model optimization」或「eloquent relationships」時。規則：1. 進行 Laravel 模型設計任務時必須使用此工具。2. 遵循 Laravel 最佳實踐設計 Eloquent 模型。3. 定義關聯、存取器、修改器與作用域。4. 考慮大量賦值保護與模型事件。5. 提供包含關聯的完整模型實作。

- **laravel-performance**：分析 Laravel 代碼效能並識別非資料庫效能瓶頸的權威工具。觸發條件：當使用者提到「laravel performance」、「optimize laravel performance」、「slow laravel code」、「laravel bottleneck」、「laravel cpu usage」、「laravel memory usage」或「laravel performance profiling」時。規則：1. 進行 Laravel 效能分析任務時必須使用此工具（排除資料庫特定優化，請使用 eloquent-optimization）。2. 在 Laravel 上下文中分析 CPU、記憶體、網路、I/O 與演算法效能。3. 識別 Laravel 特定的效能瓶頸與優化機會。4. 提供可執行的 Laravel 效能改進建議。5. 考慮 Laravel 快取、佇列與優化功能。

- **laravel-refactor-code**：Laravel 代碼重構的權威工具（通用，不限於控制器）。觸發條件：當使用者提到「refactor laravel」、「improve laravel code」、「optimize laravel code」、「restructure laravel code」或「laravel code cleanup」時。規則：1. 進行 Laravel 代碼重構任務時必須使用此工具。2. 在改進代碼結構的同時維持現有功能。3. 應用 SOLID 原則與 Laravel 最佳實踐。4. 如果未指定意圖，則自動推斷重構機會。

- **laravel-security**：全面 Laravel 安全漏洞評估與安全稽核的權威工具。觸發條件：當使用者提到「laravel security audit」、「laravel security review」、「laravel vulnerability」、「laravel security check」、「laravel security scan」、「laravel owasp」或「laravel security assessment」時。規則：1. 進行 Laravel 安全稽核與漏洞評估任務時必須使用此工具。2. 專注於識別 Laravel 特定的安全漏洞與風險。3. 對照 OWASP Top 10、Laravel 安全功能與最佳實踐進行檢查。4. 提供可執行的 Laravel 安全建議。5. 按嚴重程度與影響優先排序漏洞。

- **laravel-service-provider**：設計 Laravel 服務提供者與服務容器綁定的權威工具。觸發條件：當使用者提到「laravel service provider」、「service provider design」、「laravel container」、「dependency injection」、「laravel binding」或「service provider configuration」時。規則：1. 進行 Laravel 服務提供者設計任務時必須使用此工具。2. 遵循 Laravel 最佳實踐設計服務提供者。3. 定義適當的服務容器綁定。4. 考慮延遲提供者與單例綁定。5. 提供完整的服務提供者實作。

- **refactor-controller**：Laravel 控制器重構的權威工具。觸發條件：當使用者提到「refactor controller」、「improve controller」、「optimize controller」或「restructure controller」時。規則：1. 進行 Laravel 控制器重構任務時必須使用此工具。2. 在改進代碼結構的同時維持現有功能。3. 應用 SOLID 原則與 Laravel 最佳實踐。4. 如果未指定意圖，則自動推斷重構機會。


## 📂 群組：nestjs

- **nestjs-controller-design**：設計 NestJS 控制器與端點的權威工具。觸發條件：當使用者提到「nestjs controller」、「nestjs api」、「nestjs endpoint」、「nestjs route」或「nestjs handler」時。規則：1. 進行 NestJS 控制器設計任務時必須使用此工具。2. 遵循 NestJS 最佳實踐設計控制器。3. 建立具有適當裝飾器的 RESTful 端點。4. 包含適當的 DTO 與驗證。5. 提供完整的控制器實作。


## 📂 群組：nextjs

- **nextjs-api-routes**：設計 Next.js API 路由與處理器的權威工具。觸發條件：當使用者提到「nextjs api」、「next api routes」、「nextjs api handler」、「next api endpoint」或「nextjs api implementation」時。規則：1. 進行 Next.js API 路由設計任務時必須使用此工具。2. 遵循 Next.js 最佳實踐設計 API 路由。3. 考慮 Route Handlers（App Router）與 API Routes（Pages Router）。4. 提供完整的 API 路由實作。

- **nextjs-page-design**：設計 Next.js 頁面與路由結構的權威工具。觸發條件：當使用者提到「nextjs page」、「next page design」、「nextjs routing」、「next page structure」或「nextjs page implementation」時。規則：1. 進行 Next.js 頁面設計任務時必須使用此工具。2. 遵循 Next.js 最佳實踐設計頁面。3. 考慮 App Router 與 Pages Router 模式。4. 提供完整的頁面實作。


## 📂 群組：react

- **react-api-integration**：React API 整合模式與實作的權威工具。觸發條件：當使用者提到「react api」、「react fetch」、「react axios」、「react api integration」、「react http client」或「react data fetching」時。規則：1. 進行 React API 整合任務時必須使用此工具。2. 使用 React 模式（hooks、context 等）實作 API 整合。3. 提供具有適當錯誤處理與載入狀態的 API 呼叫 hooks。4. 遵循 React 最佳實踐進行 API 整合。

- **react-component-review**：React 元件審查與分析的權威工具。觸發條件：當使用者提到「review react」、「check react component」、「react component」、「component analysis」或「react code review」時。規則：1. 進行 React 元件審查時必須使用此工具。2. 分析 React Hooks 使用、元件模式與 React 最佳實踐。3. 檢查效能優化與無障礙性。4. 提供可執行的回饋與代碼範例。

- **react-hooks-design**：設計 React 自訂 Hooks 與 Hooks 模式的權威工具。觸發條件：當使用者提到「react hooks」、「custom hooks」、「react hooks design」、「hooks pattern」、「react hooks implementation」或「react hooks best practices」時。規則：1. 進行 React Hooks 設計任務時必須使用此工具。2. 遵循 React Hooks 最佳實踐設計 Hooks。3. 建立可重用、可測試且可維護的 Hooks。4. 考慮 Hooks 模式與慣例。5. 提供完整的 Hooks 實作。

- **react-performance**：分析 React 代碼效能並識別效能瓶頸的權威工具。觸發條件：當使用者提到「react performance」、「optimize react」、「slow react」、「react bottleneck」、「react render performance」或「react performance profiling」時。規則：1. 進行 React 效能分析任務時必須使用此工具。2. 分析渲染效能、重新渲染、套件大小與 React 特定優化。3. 識別 React 效能瓶頸與優化機會。4. 提供可執行的 React 效能改進建議。

- **react-testing**：使用 React Testing Library 或 Jest 生成 React 測試的權威工具。觸發條件：當使用者提到「generate react tests」、「create react tests」、「react test cases」、「react testing」或「react unit tests」時。規則：1. 當請求 React 測試生成時必須使用此工具。2. 遵循 React Testing Library 最佳實踐生成測試。3. 包含元件與 Hooks 測試。4. 使用 React Testing Library 與 Jest/Vitest。


## 📂 群組：spring

- **spring-controller-design**：設計 Spring Boot REST 控制器與端點的權威工具。觸發條件：當使用者提到「spring controller」、「spring rest controller」、「spring api」、「spring endpoint」或「spring boot controller」時。規則：1. 進行 Spring Boot 控制器設計任務時必須使用此工具。2. 遵循 Spring Boot 最佳實踐設計控制器。3. 建立具有適當註解的 RESTful 端點。4. 包含適當的錯誤處理與驗證。5. 提供完整的控制器實作。


## 📂 群組：typescript

- **typescript-type-design**：設計 TypeScript 類型、介面與類型結構的權威工具。觸發條件：當使用者提到「typescript types」、「type design」、「typescript interfaces」、「type definitions」或「typescript type system」時。規則：1. 進行 TypeScript 類型設計任務時必須使用此工具。2. 遵循 TypeScript 最佳實踐設計類型。3. 建立可重用、可維護的類型定義。4. 考慮類型安全與推斷。5. 提供完整的類型實作。


## 📂 群組：vue

- **vue-component-review**：Vue 3 元件審查與分析的權威工具。觸發條件：當使用者提到「review vue」、「check component」、「vue component」、「component analysis」或「vue code review」時。規則：1. 進行 Vue 3 元件審查時必須使用此工具。2. 分析 Composition API 使用、響應式系統與 Vue 3 最佳實踐。3. 檢查效能優化與無障礙性。4. 提供可執行的回饋與代碼範例。

- **vue-api-integration**：Vue 3 API 整合模式與實作的權威工具。觸發條件：當使用者提到「vue api」、「vue fetch」、「vue axios」、「vue composable api」、「vue api integration」或「vue http client」時。規則：1. 進行 Vue 3 API 整合任務時必須使用此工具。2. 使用 Vue 3 Composition API 模式實作 API 整合。3. 提供具有適當錯誤處理與載入狀態的 API 呼叫 composables。4. 遵循 Vue 3 API 整合最佳實踐。

- **vue-architecture**：設計 Vue 應用架構與元件結構的權威工具。觸發條件：當使用者提到「vue architecture」、「vue system design」、「vue module design」、「vue application structure」、「vue component architecture」或「vue project structure」時。規則：1. 進行 Vue 架構與系統設計任務時必須使用此工具。2. 設計可擴展、可維護且穩健的 Vue 架構。3. 考慮 Vue 架構模式（Component-based、Composition API 等）。4. 提供 Vue 模組結構與元件設計。5. 包含 Vue 可擴展性、可維護性與效能考量。

- **vue-code-generation**：從規格生成 Vue 代碼骨架與實作的權威工具。觸發條件：當使用者提到「generate vue code」、「create vue code」、「vue code skeleton」、「scaffold vue code」、「vue component」、「implement vue from spec」或「generate vue implementation」時。規則：1. 進行 Vue 代碼生成任務時必須使用此工具。2. 遵循 Vue 最佳實踐從規格生成代碼。3. 建立完整、可投入生產的 Vue 代碼結構。4. 包含適當的錯誤處理、驗證與文檔。5. 遵循 Vue Composition API 模式與最佳實踐。

- **vue-code-review**：全面 Vue 代碼審查的權威工具。觸發條件：當使用者提到「review vue」、「check vue code」、「vue code quality」、「analyze vue code」、「vue code audit」或「review vue component」時。規則：1. 當請求 Vue 代碼審查時必須使用此工具。2. 分析 Vue 代碼品質、潛在錯誤、安全問題與 Vue 最佳實踐。3. 檢查 Vue 3 Composition API 使用、響應式系統與元件模式。4. 提供結構化的回饋與嚴重程度分級。5. 啟用 strict_mode 時遵循嚴格模式規則。

- **vue-composable-design**：設計 Vue Composables 與可重用 Composition API 函數的權威工具。觸發條件：當使用者提到「vue composable」、「composable design」、「vue composition api」、「reusable vue logic」、「vue composable pattern」或「vue composable function」時。規則：1. 進行 Vue Composable 設計任務時必須使用此工具。2. 遵循 Vue Composition API 最佳實踐設計 Composables。3. 建立可重用、可測試且可維護的 Composables。4. 考慮 Composable 模式與慣例。5. 提供完整的 Composable 實作。

- **vue-documentation**：生成全面 Vue 文檔的權威工具，包括元件文檔、JSDoc 註解與 README 檔案。觸發條件：當使用者提到「generate vue docs」、「create vue documentation」、「vue component docs」、「jsdoc」、「vue code comments」、「vue readme」或「document vue code」時。規則：1. 進行 Vue 文檔生成任務時必須使用此工具。2. 遵循 JSDoc 與 Vue 文檔標準生成文檔。3. 支援 JSDoc、Markdown 與元件文檔格式。4. 包含 Vue 特定的範例與使用模式。5. 確保文檔清晰、全面且可維護。

- **vue-error-handling**：設計全面 Vue 錯誤處理模式與錯誤結構的權威工具。觸發條件：當使用者提到「vue error handling」、「vue error management」、「vue error recovery」、「vue error logging」、「vue error boundaries」或「vue error patterns」時。規則：1. 進行 Vue 錯誤處理設計任務時必須使用此工具。2. 遵循 Vue 最佳實踐設計錯誤處理模式。3. 建立錯誤邊界模式與錯誤回應結構。4. 包含 Vue 錯誤日誌與監控策略。5. 提供 Vue 特定的錯誤恢復機制。

- **vue-generate-tests**：使用 Vitest 或 Jest 生成 Vue 單元測試與元件測試的權威工具。觸發條件：當使用者提到「generate vue tests」、「create vue tests」、「write vue tests」、「vitest tests」、「vue test cases」或「vue testing」時。規則：1. 當請求 Vue 測試生成時必須使用此工具。2. 遵循 Vue 測試最佳實踐生成 Vitest/Jest 測試。3. 適當地包含單元測試與元件測試。4. 使用 Vue Test Utils 與測試輔助工具。5. 適當時包含元件互動測試。

- **vue-performance**：分析 Vue 代碼效能並識別效能瓶頸的權威工具。觸發條件：當使用者提到「vue performance」、「optimize vue performance」、「slow vue code」、「vue bottleneck」、「vue render performance」、「vue bundle size」或「vue performance profiling」時。規則：1. 進行 Vue 效能分析任務時必須使用此工具。2. 分析渲染效能、響應式系統、套件大小與 Vue 特定優化。3. 識別 Vue 效能瓶頸與優化機會。4. 提供可執行的 Vue 效能改進建議。5. 考慮 Vue 3 Composition API 優化。

- **vue-pinia-setup**：設計 Pinia Stores 與狀態管理結構的權威工具。觸發條件：當使用者提到「vue pinia」、「pinia store」、「vue state management」、「pinia setup」、「vue store design」或「pinia configuration」時。規則：1. 進行 Pinia Store 設計任務時必須使用此工具。2. 遵循 Pinia 最佳實踐設計 Stores。3. 定義適當的狀態、Getters 與 Actions。4. 考慮 Store 組織與模組化。5. 提供完整的 Pinia Store 實作。

- **vue-refactor-code**：Vue 代碼重構的權威工具。觸發條件：當使用者提到「refactor vue」、「improve vue code」、「optimize vue code」、「restructure vue code」或「vue code cleanup」時。規則：1. 進行 Vue 代碼重構任務時必須使用此工具。2. 在改進代碼結構的同時維持現有功能。3. 應用 Vue 最佳實踐與 Composition API 模式。4. 如果未指定意圖，則自動推斷重構機會。

- **vue-router-config**：設計 Vue Router 配置與路由結構的權威工具。觸發條件：當使用者提到「vue router」、「router config」、「vue routing」、「route design」、「vue router setup」或「vue navigation」時。規則：1. 進行 Vue Router 配置任務時必須使用此工具。2. 遵循 Vue Router 最佳實踐設計路由器配置。3. 定義適當的路由結構、守衛與延遲載入。4. 考慮路由組織與導航模式。5. 提供完整的路由器實作。

- **vue-security**：全面 Vue 安全漏洞評估與安全稽核的權威工具。觸發條件：當使用者提到「vue security audit」、「vue security review」、「vue vulnerability」、「vue security check」、「vue security scan」、「vue xss」或「vue security assessment」時。規則：1. 進行 Vue 安全稽核與漏洞評估任務時必須使用此工具。2. 專注於識別 Vue 特定的安全漏洞與風險。3. 對照 OWASP Top 10、Vue 安全最佳實踐與 XSS 防護進行檢查。4. 提供可執行的 Vue 安全建議。5. 按嚴重程度與影響優先排序漏洞。
