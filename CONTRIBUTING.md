# Contributing Guide

Thank you for contributing to the Prompt Repository! This guide explains how to contribute to the project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Create a New Prompt](#create-a-new-prompt)
- [Synchronization Rules](#synchronization-rules)
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
description: |
  Authority tool for [feature description]. RULES: 1. MUST use this tool for [usage scenario]. 2. [rule 2]. 3. [rule 3].

triggers:
  patterns:
    - "trigger keyword 1"
    - "trigger keyword 2"
    - "trigger keyword 3"

args:
  param1:
    type: "string"
    description: "Parameter description"
    default: "default value"  # optional
  param2:
    type: "number"
    description: "Another parameter"

dependencies:
  partials:
    - role-expert

template: |
  {{> role-expert}}
  
  # Context
  [Your Handlebars template content]
```

### Required Field Descriptions

- **id**: Unique identifier for the prompt (lowercase, kebab-case)
- **title**: Prompt title (concise and clear)
- **description**: Detailed description including RULES (TRIGGER patterns are defined separately in `triggers.patterns`)
- **triggers**: Trigger patterns array (required, defines when the prompt should be used)
- **args**: Parameter definitions (optional but recommended)
- **dependencies**: Partial dependencies (required if using `{{> partial }}` in template)
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

**⚠️ CRITICAL**: After creating or modifying a prompt file, you **MUST** ensure:
1. The prompt is registered in `registry.yaml` with matching `id` and `group`
2. If using `{{> partial }}` in the template, the partial is declared in `dependencies.partials`
3. All partials referenced in `dependencies.partials` exist in the `partials/` directory

See [Synchronization Rules](#synchronization-rules) below for detailed requirements and validation checklists.

## Synchronization Rules

**⚠️ IMPORTANT**: The synchronization rules below are **MANDATORY** and **NON-NEGOTIABLE**. Pull requests that violate these rules will be **automatically rejected**. Please ensure all synchronization requirements are met before submitting your PR.

### Registry Synchronization (MANDATORY - PR REJECTION RISK)

**Critical**: The `registry.yaml` file must be kept **100% synchronized** with all prompt files. This is a **mandatory requirement** and violations will result in PR rejection.

#### Rules:

1. **Adding a Prompt**:
   - When creating a new prompt file, you MUST add a corresponding entry to `registry.yaml`
   - The `id` in the prompt file must exactly match the `id` in `registry.yaml`
   - The `group` in `registry.yaml` must match the directory where the prompt file is located

2. **Modifying a Prompt ID**:
   - If you change the `id` field in a prompt file, you MUST update the corresponding entry in `registry.yaml`
   - The filename should also be updated to match the new `id` (e.g., `old-id.yaml` → `new-id.yaml`)

3. **Deleting a Prompt**:
   - When removing a prompt file, you MUST remove the corresponding entry from `registry.yaml`
   - Failure to do so will cause validation errors

4. **Pre-Commit Validation**:
   - Before committing changes, verify that:
     - All prompt files have a corresponding entry in `registry.yaml`
     - All entries in `registry.yaml` have a corresponding prompt file
     - All `id` values match exactly between files and registry

#### Validation Checklist:

- [ ] All prompt files are registered in `registry.yaml`
- [ ] All registry entries have corresponding prompt files
- [ ] All `id` values match exactly
- [ ] File names match their `id` values (e.g., `code-review.yaml` has `id: code-review`)

### Partial Dependencies Synchronization (MANDATORY - PR REJECTION RISK)

**Critical**: All prompt files that use `{{> partial }}` syntax in their templates **MUST** declare those partials in the `dependencies.partials` field. Additionally, all partials referenced in `dependencies.partials` must exist in the `partials/` directory. This is a **mandatory requirement** and violations will result in PR rejection.

#### Rules:

1. **Adding Dependencies**:
   - When adding a `dependencies.partials` entry, verify that the partial file exists in the `partials/` directory
   - Partial files must have the `.hbs` extension
   - The partial name in `dependencies.partials` must match the filename (without extension)

2. **Renaming Partials**:
   - If you rename a partial file, you MUST update all prompt files that reference it in their `dependencies.partials`
   - Search for all occurrences: `grep -r "old-partial-name" . --include="*.yaml"`

3. **Deleting Partials**:
   - Before deleting a partial file, verify that no prompt files depend on it
   - Search for dependencies: `grep -r "partial-name" . --include="*.yaml"`
   - Remove the partial from all `dependencies.partials` entries before deleting the file

4. **Pre-Commit Validation**:
   - Before committing changes, verify that:
     - All partials referenced in `dependencies.partials` exist in the `partials/` directory
     - All partial files are referenced by at least one prompt (or document why they're unused)

#### Validation Checklist:

- [ ] All prompt files using `{{> partial }}` have a `dependencies.partials` field
- [ ] All partials in `dependencies.partials` exist in `partials/` directory
- [ ] All partial filenames match their references (without `.hbs` extension)
- [ ] No orphaned partials (unless intentionally kept for future use)
- [ ] All `{{> partial }}` references in templates are declared in `dependencies.partials`

### Pre-Submission Validation Checklist

Before submitting your PR, ensure you have completed **ALL** of the following checks:

#### Registry Synchronization
- [ ] All prompt files are registered in `registry.yaml`
- [ ] All registry entries have corresponding prompt files
- [ ] All `id` values match exactly between files and registry
- [ ] File names match their `id` values (e.g., `code-review.yaml` has `id: code-review`)
- [ ] `group` values in registry match the directory structure

#### Partial Dependencies Synchronization
- [ ] All prompt files using `{{> partial }}` have a `dependencies.partials` field
- [ ] All partials in `dependencies.partials` exist in `partials/` directory
- [ ] All partial filenames match their references (without `.hbs` extension)
- [ ] No `{{> partial }}` references exist without corresponding `dependencies.partials` entry

#### General Validation
- [ ] All prompt files have valid YAML syntax
- [ ] All required fields are present (`id`, `title`, `description`, `triggers`, `template`)
- [ ] All `triggers.patterns` arrays are non-empty
- [ ] Description does not contain "TRIGGER:" text (triggers should be in `triggers.patterns` only)

## Prompt Guidelines

### 1. Description Format

Description must include:
- **Feature description**: Briefly explain the prompt purpose
- **RULES**: Rules for using the prompt (at least 3)

**Note**: TRIGGER patterns are now defined in the structured `triggers.patterns` field (see below).

Example:

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
