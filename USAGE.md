# Usage Guide

This document describes the Prompt Repository data structure and how it integrates with the MCP Prompt Manager.

## 📋 Table of Contents

- [Data Structure](#data-structure)
- [Prompt Structure](#prompt-structure)
- [Integration with MCP Prompt Manager](#integration-with-mcp-prompt-manager)
- [Best Practices](#best-practices)

## Data Structure

### Core Files

- **`registry.yaml`** - Prompt registry defining all available prompts and their metadata (id, group, visibility, deprecated, etc.)
- **`partials/`** - Handlebars partials directory containing reusable template snippets

### Prompt File Organization

Prompts are organized by group in separate directories:

```
prompts-repo/
├── registry.yaml          # Registry
├── partials/              # Handlebars partials
├── common/                # General prompts
│   ├── api-design.yaml
│   ├── code-review.yaml
│   └── ...
├── laravel/               # Laravel-specific prompts
│   ├── laravel-api-implementation.yaml
│   └── ...
├── vue/                   # Vue.js-specific prompts
│   ├── vue-api-integration.yaml
│   └── ...
└── ...                    # Other framework groups
```

### Group Overview

- **`common/`** - General prompts for all languages and frameworks; always loaded
- **`laravel/`** - Laravel-specific prompts
- **`vue/`** - Vue.js-specific prompts
- **`react/`** - React-specific prompts
- **`nestjs/`** - NestJS-specific prompts
- **`nextjs/`** - Next.js-specific prompts
- **`express/`** - Express.js-specific prompts
- **`fastapi/`** - FastAPI-specific prompts
- **`spring/`** - Spring Boot-specific prompts
- **`django/`** - Django-specific prompts
- **`typescript/`** - TypeScript-specific prompts

## Prompt Structure

### Basic Structure

Each prompt file is YAML and includes:

```yaml
id: "prompt-id"
title: "Prompt Title"
description: >
  Detailed description with TRIGGER and RULES
  TRIGGER: When user mentions "keyword1", "keyword2".
  RULES:
  1. MUST use this tool for [usage scenario].
  2. [rule 2].
  3. [rule 3].

args:
  param1:
    type: "string"
    description: "Parameter description"
    default: "default value"  # optional
  param2:
    type: "number"
    description: "Another parameter"

template: |
  {{> role-expert}}
  
  # Template content
  {{#if param1}}
  Parameter value: {{param1}}
  {{/if}}
```

### Required Fields

- **id**: Unique prompt identifier (lowercase, hyphen-separated)
- **title**: Prompt title
- **description**: Detailed description (must include TRIGGER and RULES)
- **template**: Handlebars template content

### Optional Fields

- **args**: Parameter definitions (recommended)

### Parameter Types

Supported parameter types:
- `string`
- `number`
- `boolean`

### Handlebars Syntax

Prompts use Handlebars templates:

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

Reuse template fragments with partials:

```handlebars
{{> role-laravel-expert}}
{{> role-vue-expert}}
{{> role-expert}}
```

Partial files are in the `partials/` directory with the `.hbs` extension.

## Integration with MCP Prompt Manager

### Set Environment Variables

Configure MCP Prompt Manager with:

```bash
# Local path
PROMPT_REPO_URL=/path/to/prompts-repo

# Or Git URL
PROMPT_REPO_URL=https://github.com/yourusername/prompts-repo.git

# Specify groups to load (optional)
MCP_GROUPS=laravel,vue,react
```

### Group Filtering

- **Root directory** (`/`): Always loaded
- **common group**: Always loaded
- **Other groups**: Must be listed in `MCP_GROUPS`

Examples:
- `MCP_GROUPS=laravel,vue` → loads common, laravel, vue
- `MCP_GROUPS=` → loads only common
- `MCP_GROUPS` unset → loads only common

### Using Prompts

In Cursor or Claude Desktop, prompts load automatically. When users mention related keywords, the corresponding prompt is triggered.

## Best Practices

### 1. Naming

- **File names**: `kebab-case` (e.g., `code-review.yaml`)
- **Prompt ID**: `kebab-case` (e.g., `code-review`)
- **Parameter names**: `snake_case` (e.g., `language_name`)

### 2. Description Format

Descriptions must include:
- **Feature description**: Brief purpose of the prompt
- **TRIGGER**: Keywords or scenarios that trigger the prompt
- **RULES**: Rules for using the prompt (at least 3)

Example:

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

### 3. Parameter Design

- Provide clear descriptions
- Set sensible defaults
- Use appropriate types

### 4. Template Design

- Reuse code with partials
- Use conditionals for optional parameters
- Keep templates clear and readable

### 5. Versioning

- Use Git for version control
- Follow Semantic Versioning
- Record changes in `CHANGELOG.md`

## FAQ

### Q: How do I add a new prompt?

A: See the “Create a New Prompt” section in [CONTRIBUTING.md](./CONTRIBUTING.md).

### Q: Can I add a new group?

A: Yes. Create a new directory, place prompts inside, and specify the group in `MCP_GROUPS`.

### Q: Where are the Handlebars partials?

A: Partials are in the `partials/` directory with the `.hbs` extension.

### Q: How do I update registry.yaml?

A: When adding or changing a prompt, register it in `registry.yaml`. Each prompt needs `id`, `group`, `visibility`, and `deprecated` fields.

## More Resources

- [CONTRIBUTING.md](./CONTRIBUTING.md) - Contributing Guide
- [CHANGELOG.md](./CHANGELOG.md) - Changelog
- [README.zh-TW.md](./README.zh-TW.md) - Traditional Chinese README
