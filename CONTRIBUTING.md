# Contributing Guide

Thank you for contributing to the Prompt Repository! This guide explains how to contribute to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Create a New Prompt](#create-a-new-prompt)
- [Prompt Guidelines](#prompt-guidelines)
- [Submit Changes](#submit-changes)
- [Code Style](#code-style)

## Code of Conduct

Please stay friendly, respectful, and professional. We welcome all types of contributions, including:
- Reporting bugs
- Suggesting new features
- Submitting Pull Requests
- Improving documentation
- Sharing usage experiences

## How to Contribute

### 1. Fork and Clone the Repository

```bash
# After forking, clone to your local machine
git clone https://github.com/yourusername/prompts-repo.git
cd prompts-repo
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

### 3. Make Changes

Implement your changes and ensure you follow the guidelines in this document.

### 4. Submit Changes

Please follow the [Commit Message Guidelines](#commit-message-guidelines).

## Create a New Prompt

### Choose the Correct Group

- **common/**: General prompts for all languages and frameworks
- **laravel/**: Laravel-specific prompts
- **vue/**: Vue.js-specific prompts
- **react/**: React-specific prompts
- **Other frameworks/**: Prompts for the corresponding frameworks

### Prompt File Structure

Every prompt file must be YAML and include these required fields:

```yaml
id: "your-prompt-id"
title: "Your Prompt Title"
description: >
  Authority tool for [feature description].
  TRIGGER: When user mentions "[trigger keywords]".
  RULES:
  1. MUST use this tool for [usage scenario].
  2. [rule 2]
  3. [rule 3]

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
  
  # Context
  [Your Handlebars template content]
```

### Required Field Descriptions

- **id**: Unique identifier for the prompt (lowercase, kebab-case)
- **title**: Prompt title (concise and clear)
- **description**: Detailed description including TRIGGER and RULES
- **args**: Parameter definitions (optional but recommended)
- **template**: Handlebars template content

### Parameter Types

Supported parameter types:
- `string`
- `number`
- `boolean`

### File Naming Rules

- Use lowercase letters
- Separate words with hyphens (`-`)
- File extension is `.yaml` or `.yml`
- Examples: `code-review.yaml`, `laravel-api-implementation.yaml`

### Update registry.yaml

After adding a prompt, register it in `registry.yaml`:

```yaml
prompts:
  - id: "your-prompt-id"
    group: "common"  # or the appropriate group name
    visibility: "public"  # or "internal"
    deprecated: false
```

## Prompt Guidelines

### 1. Description Format

Description must include:
- **Feature description**: Briefly explain the prompt purpose
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

### 2. Template Guidelines

- Use Handlebars syntax (`{{}}`)
- Support partials (`{{> partial-name}}`)
- Use conditionals (`{{#if}}`, `{{#unless}}`)
- Use loops (`{{#each}}`)

### 3. General vs. Framework-Specific

**General Prompts (common/):**
- Do not depend on a specific framework
- Use `{{> role-expert}}`
- Include `language` and `framework` parameters (optional)

**Framework-Specific Prompts:**
- Target a specific framework
- Use framework-specific partials such as `{{> role-laravel-expert}}`
- Include framework version parameters (e.g., `laravel_version`, `vue_version`)

### 4. Version Parameters

Framework-specific prompts should include version parameters:

```yaml
args:
  laravel_version:
    type: "string"
    description: "Laravel version (e.g., 10.x, 11.x)"
    default: "11.x"
```

## Submit Changes

### Commit Message Guidelines

Use the following format:

```
<type>:[ <scope> ] <subject>

<body>

<footer>
```

**Type options:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Refactoring
- `test`: Tests
- `chore`: Build or tooling changes

**Example:**

```
feat: [common] add code-review prompt

Add a general code review prompt that supports multiple languages and frameworks
Includes full parameter definitions and Handlebars template
```

### Pull Request Process

1. Ensure your changes follow these guidelines
2. Update related documentation if needed
3. Open a Pull Request with a clear description
4. Wait for review and feedback

## Code Style

### YAML Formatting

- Use 2-space indentation
- Use `>` or `|` for multiline strings
- Keep formatting consistent

### Naming Rules

- **File names**: lowercase, kebab-case
- **Prompt IDs**: lowercase, kebab-case
- **Parameter names**: lowercase, snake_case

## Issue Reporting

If you find an issue:
1. Check whether a related issue already exists
2. Open a new issue with detailed information
3. Include reproduction steps when applicable

## Contact

If you have questions:
- Open an issue for discussion
- Refer to existing prompts as examples

Thank you for your contribution! 🎉
