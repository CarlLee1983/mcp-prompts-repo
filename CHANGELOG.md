# Changelog

This project follows [Semantic Versioning](https://semver.org/).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project is licensed under [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).

## [Unreleased]

### Breaking Changes

#### Removed executable code; converted to a data-only repository
- **Removed**: CLI tool (`scripts/pm.js`) — all validation, doc generation, and related features are now handled by the shared CLI tool
- **Removed**: `package.json` — Node.js dependencies and scripts are no longer needed
- **Removed**: `pnpm-lock.yaml` — dependency management is no longer required
- **Updated**: All docs updated to remove CLI-related content
  - `README.md` — rewritten as a data-only repository guide
  - `README.zh-TW.md` — Traditional Chinese docs updated in sync
  - `USAGE.md` — simplified to focus on data structure
  - `CONTRIBUTING.md` — removed validation and installation steps

#### Notes
This repository is now a **data-only repository** focused on storing prompt templates and configuration files. All functional code (validation, doc generation, etc.) has moved to a shared CLI tool to improve separation of concerns and maintainability.

### Planned
- More framework support
- Prompt versioning

## [1.0.0] - 2024-12-01

### Added

#### Core
- Initialize Prompt Repository project structure
- Create CLI tool (`scripts/pm.js`) supporting basic operations
  - `list`: list all prompts
  - `validate`: validate prompt formats
  - `config`: show configuration info
  - `docs`: auto-generate documentation
  - `add`: add a prompt (in progress)

#### General Prompts (common/)
- `api-design`: RESTful API design and architecture
- `architecture-design`: System architecture and module design
- `code-generation`: Generate code from specifications
- `code-review`: Comprehensive code review
- `database-optimization`: Database optimization and query performance analysis
- `documentation-generator`: Documentation generation tool
- `error-handling-design`: Error-handling pattern design
- `generate-unit-tests`: General unit-test generator
- `performance-analysis`: Non-database performance analysis
- `refactor-code`: Code refactoring
- `security-audit`: Security vulnerability assessment

#### Laravel Prompts (laravel/)
- `eloquent-optimization`: Eloquent ORM optimization
- `laravel-api-implementation`: Laravel RESTful API implementation
- `laravel-architecture`: Laravel system architecture design
- `laravel-code-generation`: Laravel code generation
- `laravel-code-review`: Laravel code review
- `laravel-documentation`: Laravel documentation generation
- `laravel-error-handling`: Laravel error handling design
- `laravel-generate-tests`: Laravel test generation (PHPUnit)
- `laravel-migration-design`: Laravel database migration design
- `laravel-model-design`: Laravel Eloquent model design
- `laravel-performance`: Laravel performance analysis
- `laravel-refactor-code`: Laravel code refactoring
- `laravel-security`: Laravel security audit
- `laravel-service-provider`: Laravel service provider design
- `refactor-controller`: Laravel controller refactoring

#### Vue Prompts (vue/)
- `vue-component-review`: Vue 3 component review
- `vue-api-integration`: Vue 3 API integration
- `vue-architecture`: Vue application architecture design
- `vue-code-generation`: Vue code generation
- `vue-code-review`: Vue code review
- `vue-composable-design`: Vue composable design
- `vue-documentation`: Vue documentation generation
- `vue-error-handling`: Vue error handling design
- `vue-generate-tests`: Vue test generation (Vitest/Jest)
- `vue-performance`: Vue performance analysis
- `vue-pinia-setup`: Pinia store design
- `vue-refactor-code`: Vue code refactoring
- `vue-router-config`: Vue Router configuration
- `vue-security`: Vue security audit

#### React Prompts (react/)
- `react-api-integration`: React API integration
- `react-component-review`: React component review
- `react-hooks-design`: React Hooks design
- `react-performance`: React performance analysis
- `react-testing`: React test generation

#### Next.js Prompts (nextjs/)
- `nextjs-api-routes`: Next.js API route design
- `nextjs-page-design`: Next.js page design

#### Other Framework Prompts
- `django-view-design`: Django view design
- `express-route-design`: Express.js route design
- `fastapi-endpoint-design`: FastAPI endpoint design
- `nestjs-controller-design`: NestJS controller design
- `spring-controller-design`: Spring Boot controller design
- `typescript-type-design`: TypeScript type design

#### Documentation
- `README.md`: Auto-generated English documentation
- `README.zh-TW.md`: Traditional Chinese documentation
- `LICENSE`: ISC License
- `.gitignore`: Comprehensive Git ignore rules

### Technical Details

#### Dependencies
- `js-yaml`: ^4.1.1 (YAML parsing)

#### Tooling
- Node.js CLI tool
- Automatic documentation generation
- YAML format validation
- Group management

### Stats
- Total prompts: 53
- Framework coverage: 11 frameworks/languages
- General prompts: 11
- Framework-specific prompts: 42

---

## Version Notes

- **[Unreleased]**: Changes not yet released
- **[version]**: Released versions with date and change types

### Change Types

- **Added**: New features
- **Changed**: Changes to existing features
- **Deprecated**: Features soon to be removed
- **Removed**: Features removed
- **Fixed**: Bug fixes
- **Security**: Security-related changes
