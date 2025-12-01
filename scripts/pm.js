#!/usr/bin/env node

/**
 * Prompt Manager CLI 工具
 * 用於管理 prompts repository 的基本操作
 * 
 * @fileoverview 提供 list, config, validate, docs 等指令來管理 prompt 檔案
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import yaml from 'js-yaml';

// 在 ES modules 中獲取 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 設定
const ROOT_DIR = path.resolve(__dirname, '..');
const IGNORE_DIRS = ['.git', 'node_modules', 'scripts', 'partials'];
const REQUIRED_FIELDS = ['id', 'title', 'description', 'template'];

/**
 * 驗證路徑是否安全，防止路徑遍歷攻擊
 * @param {string} filePath - 要驗證的檔案路徑
 * @param {string} baseDir - 基礎目錄
 * @returns {boolean} 路徑是否安全
 */
function isSafePath(filePath, baseDir) {
    const resolved = path.resolve(baseDir, filePath);
    const baseResolved = path.resolve(baseDir);
    return resolved.startsWith(baseResolved);
}

/**
 * 驗證群組名稱是否安全
 * @param {string} group - 群組名稱
 * @returns {boolean} 群組名稱是否安全
 */
function isValidGroupName(group) {
    if (!group || typeof group !== 'string') {
        return false;
    }
    // 防止路徑遍歷和特殊字元
    if (group.includes('..') || group.includes('/') || group.includes('\\') || group.includes('\0')) {
        return false;
    }
    return true;
}

/**
 * 獲取所有群組 (資料夾)
 * @returns {string[]} 群組名稱陣列
 */
function getGroups() {
    try {
        const groups = fs.readdirSync(ROOT_DIR, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
            .filter(name => !IGNORE_DIRS.includes(name) && !name.startsWith('.'))
            .filter(name => isValidGroupName(name));
        
        return groups;
    } catch (error) {
        console.error(`❌ Error reading directory: ${error.message}`);
        return [];
    }
}

/**
 * 獲取某群組下的所有 Prompt 檔案
 * @param {string} group - 群組名稱
 * @returns {string[]} Prompt 檔案名稱陣列
 */
function getPrompts(group) {
    if (!isValidGroupName(group)) {
        console.warn(`⚠️  Invalid group name: ${group}`);
        return [];
    }

    const groupPath = path.join(ROOT_DIR, group);
    
    // 驗證路徑安全性
    if (!isSafePath(groupPath, ROOT_DIR)) {
        console.warn(`⚠️  Unsafe path detected: ${groupPath}`);
        return [];
    }

    try {
        if (!fs.existsSync(groupPath)) {
            return [];
        }

        const stats = fs.statSync(groupPath);
        if (!stats.isDirectory()) {
            return [];
        }

        return fs.readdirSync(groupPath)
            .filter(f => {
                const filePath = path.join(groupPath, f);
                // 驗證檔案路徑安全性
                if (!isSafePath(filePath, ROOT_DIR)) {
                    return false;
                }
                return f.endsWith('.yaml') || f.endsWith('.yml');
            });
    } catch (error) {
        console.error(`❌ Error reading prompts from ${group}: ${error.message}`);
        return [];
    }
}

/**
 * 解析 Prompt YAML 檔案
 * @param {string} group - 群組名稱
 * @param {string} file - 檔案名稱
 * @returns {Object|null} 解析後的 YAML 物件，失敗時返回 null
 */
function parsePromptFile(group, file) {
    if (!isValidGroupName(group)) {
        return null;
    }

    const filePath = path.join(ROOT_DIR, group, file);
    
    // 驗證路徑安全性
    if (!isSafePath(filePath, ROOT_DIR)) {
        console.warn(`⚠️  Unsafe path detected: ${filePath}`);
        return null;
    }

    try {
        if (!fs.existsSync(filePath)) {
            return null;
        }

        const content = fs.readFileSync(filePath, 'utf-8');
        const parsed = yaml.load(content);
        
        if (!parsed || typeof parsed !== 'object') {
            throw new Error('Invalid YAML format');
        }
        
        return parsed;
    } catch (error) {
        console.error(`❌ Error parsing ${group}/${file}: ${error.message}`);
        return null;
    }
}

/**
 * 列出所有群組與 Prompt (List)
 */
function list() {
    const groups = getGroups();
    
    if (groups.length === 0) {
        console.log('\n⚠️  No prompt groups found.\n');
        return;
    }
    
    console.log('\n📦 Available Prompt Groups:\n');
    
    let totalPrompts = 0;
    groups.forEach(group => {
        const prompts = getPrompts(group);
        totalPrompts += prompts.length;
        console.log(`  📂 \x1b[36m${group}\x1b[0m (${prompts.length} prompts)`);
        prompts.forEach(p => console.log(`     - ${p}`));
    });
    
    if (totalPrompts === 0) {
        console.log('\n💡 No prompts found. Add .yaml or .yml files to group directories.\n');
    }
    
    console.log('\n💡 \x1b[33mTip:\x1b[0m Run "npm run config" to generate MCP configuration for your IDE/editor\n');
}

/**
 * 生成設定字串 (Config Hint)
 */
function generateConfig() {
    const groups = getGroups();
    
    if (groups.length === 0) {
        console.log('\n⚠️  No prompt groups found. Cannot generate configuration.\n');
        return;
    }
    
    console.log('--- 📋 MCP Configuration (for Cursor, Claude Desktop, VS Code, etc.) ---');
    console.log('\nEnvironment Variables:');
    console.log(`MCP_GROUPS=${groups.join(',')}`);
    console.log(`PROMPT_REPO_URL=${process.cwd()}`);
    console.log('\n---------------------------------------');
    
    console.log(`\nTo activate specific groups, set MCP_GROUPS to one of:`);
    console.log(groups.join(', '));
    console.log('');
}

/**
 * 驗證 YAML 格式 (Validate)
 */
function validate() {
    const groups = getGroups();
    let hasError = false;
    let totalPrompts = 0;
    let validPrompts = 0;

    if (groups.length === 0) {
        console.log('\n⚠️  No prompt groups found.\n');
        return;
    }

    groups.forEach(group => {
        const prompts = getPrompts(group);
        totalPrompts += prompts.length;

        prompts.forEach(file => {
            const parsed = parsePromptFile(group, file);
            
            if (!parsed) {
                console.error(`❌ Error in [${group}/${file}]: Failed to parse YAML`);
                hasError = true;
                return;
            }
            
            const missingFields = REQUIRED_FIELDS.filter(field => !parsed[field]);
            if (missingFields.length > 0) {
                console.error(`❌ Error in [${group}/${file}]: Missing required fields: ${missingFields.join(', ')}`);
                hasError = true;
            } else {
                validPrompts++;
            }
        });
    });

    if (totalPrompts === 0) {
        console.log('\n⚠️  No prompts found to validate.\n');
        return;
    }

    if (!hasError) {
        console.log(`\n✅ All ${validPrompts} prompts validated successfully!`);
    } else {
        console.log(`\n❌ Validation failed: ${validPrompts}/${totalPrompts} prompts are valid`);
        process.exit(1);
    }
}

/**
 * 生成文件 (Generate Docs)
 */
function generateDocs() {
    const readmePath = path.join(ROOT_DIR, 'README.md');
    const backupPath = path.join(ROOT_DIR, 'README.md.backup');
    
    try {
        // 備份現有 README
        if (fs.existsSync(readmePath)) {
            fs.copyFileSync(readmePath, backupPath);
        }
        
        let readme = '# Prompt Repository\n\nAuto-generated documentation.\n\n';
        const groups = getGroups();
        
        if (groups.length === 0) {
            readme += '⚠️  No prompt groups found.\n\n';
        } else {
            let totalPrompts = 0;
            
            groups.forEach(group => {
                const prompts = getPrompts(group);
                totalPrompts += prompts.length;
                
                readme += `## 📂 Group: ${group}\n\n`;
                
                if (prompts.length === 0) {
                    readme += '*No prompts in this group.*\n\n';
                } else {
                    prompts.forEach(file => {
                        const parsed = parsePromptFile(group, file);
                        
                        if (parsed && parsed.id) {
                            const description = parsed.description || 'No description';
                            readme += `- **${parsed.id}**: ${description}\n`;
                        } else {
                            readme += `- **${file}**: (Failed to parse)\n`;
                        }
                    });
                    readme += '\n';
                }
            });
            
            if (totalPrompts === 0) {
                readme += '\n💡 No prompts found. Add .yaml or .yml files to group directories.\n\n';
            }
        }

        fs.writeFileSync(readmePath, readme, 'utf-8');
        console.log('✅ README.md updated!');
        
        // 刪除備份（成功後）
        if (fs.existsSync(backupPath)) {
            fs.unlinkSync(backupPath);
        }
    } catch (error) {
        console.error(`❌ Error generating docs: ${error.message}`);
        
        // 恢復備份
        if (fs.existsSync(backupPath)) {
            try {
                fs.copyFileSync(backupPath, readmePath);
                console.log('✅ Restored original README.md from backup');
            } catch (restoreError) {
                console.error(`❌ Failed to restore backup: ${restoreError.message}`);
            }
        }
        process.exit(1);
    }
}

// --- Main Switch ---
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case 'ls':
    case 'list':
        list();
        break;
    case 'cfg':
    case 'config':
        generateConfig();
        break;
    case 'check':
    case 'validate':
        validate();
        break;
    case 'docs':
        generateDocs();
        break;
    default:
        console.log('Usage: npm run [list|config|check|docs]');
        list(); // 預設執行 list
}
