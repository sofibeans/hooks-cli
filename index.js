#!/usr/bin/env node

/**
 * 🦊 HappyBeans Hooks CLI
 * Built by Sofi (@sofibeans)
 * 
 * Manage, search, and generate video hooks for content creation
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_FILE = join(__dirname, 'hooks-data.json');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function c(color, text) {
  return `${colors[color]}${text}${colors.reset}`;
}

function loadData() {
  try {
    return JSON.parse(readFileSync(DATA_FILE, 'utf8'));
  } catch (e) {
    console.error(c('red', '❌ Error loading hooks data:'), e.message);
    process.exit(1);
  }
}

function saveData(data) {
  writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function printHelp() {
  console.log(`
${c('bright', '🦊 HappyBeans Hooks CLI')}
${c('dim', 'Built by Sofi (@sofibeans)')}

${c('yellow', 'USAGE:')}
  hooks <command> [options]

${c('yellow', 'COMMANDS:')}
  ${c('cyan', 'list')}              List all hook categories
  ${c('cyan', 'show')} <category>   Show all hooks in a category
  ${c('cyan', 'random')} [category] Get a random hook (optionally from specific category)
  ${c('cyan', 'search')} <term>     Search hooks by keyword
  ${c('cyan', 'formulas')}          Show hook formulas/templates
  ${c('cyan', 'generate')} <formula> Generate a hook using a formula
  ${c('cyan', 'add')} <cat> <hook>  Add a new hook to a category
  ${c('cyan', 'best')}              Show best-performing hook categories
  ${c('cyan', 'short')}             Show hooks optimized for Shorts
  ${c('cyan', 'long')}              Show hooks optimized for long-form
  ${c('cyan', 'stats')}             Show hook library statistics

${c('yellow', 'EXAMPLES:')}
  hooks random                  Get any random hook
  hooks random breville         Get random Breville hook
  hooks search "bitter"         Find hooks about bitter coffee
  hooks formulas                See hook templates
  hooks best                    See top-performing categories
  hooks short                   Get hooks for Reels/Shorts

${c('dim', 'Made with ☕ for Liz HappyBeans')}
`);
}

function listCategories(data) {
  console.log(`\n${c('bright', '📁 Hook Categories')}\n`);
  
  for (const [key, cat] of Object.entries(data.categories)) {
    const count = cat.hooks.length;
    const perf = cat.performance === 'best' ? c('green', '⭐ BEST') : 
                 cat.performance === 'good' ? c('yellow', '✓ GOOD') : 
                 c('dim', '• testing');
    console.log(`  ${cat.emoji} ${c('cyan', key.padEnd(20))} ${String(count).padStart(2)} hooks  ${perf}`);
  }
  console.log(`\n${c('dim', 'Use: hooks show <category> to see hooks')}\n`);
}

function showCategory(data, categoryName) {
  // Find category (partial match)
  const key = Object.keys(data.categories).find(k => 
    k.includes(categoryName.toLowerCase())
  );
  
  if (!key) {
    console.log(c('red', `❌ Category "${categoryName}" not found.`));
    console.log(c('dim', 'Use: hooks list to see available categories'));
    return;
  }
  
  const cat = data.categories[key];
  console.log(`\n${cat.emoji} ${c('bright', cat.name)}`);
  console.log(c('dim', `Format: ${cat.format} | Performance: ${cat.performance}`));
  console.log('');
  
  cat.hooks.forEach((hook, i) => {
    console.log(`  ${c('cyan', String(i + 1).padStart(2))}. "${hook}"`);
  });
  console.log('');
}

function getRandomHook(data, categoryFilter) {
  let pool = [];
  
  if (categoryFilter) {
    const key = Object.keys(data.categories).find(k => 
      k.includes(categoryFilter.toLowerCase())
    );
    if (key) {
      pool = data.categories[key].hooks.map(h => ({ 
        hook: h, 
        category: data.categories[key].name,
        emoji: data.categories[key].emoji
      }));
    }
  } else {
    for (const [key, cat] of Object.entries(data.categories)) {
      cat.hooks.forEach(h => pool.push({ 
        hook: h, 
        category: cat.name,
        emoji: cat.emoji
      }));
    }
  }
  
  if (pool.length === 0) {
    console.log(c('red', '❌ No hooks found.'));
    return;
  }
  
  const pick = randomItem(pool);
  console.log(`\n${c('bright', '🎲 Random Hook:')}\n`);
  console.log(`  ${c('green', '"' + pick.hook + '"')}`);
  console.log(`  ${c('dim', pick.emoji + ' ' + pick.category)}\n`);
}

function searchHooks(data, term) {
  const results = [];
  const searchTerm = term.toLowerCase();
  
  for (const [key, cat] of Object.entries(data.categories)) {
    cat.hooks.forEach(hook => {
      if (hook.toLowerCase().includes(searchTerm)) {
        results.push({
          hook,
          category: cat.name,
          emoji: cat.emoji
        });
      }
    });
  }
  
  if (results.length === 0) {
    console.log(c('yellow', `\n🔍 No hooks found matching "${term}"\n`));
    return;
  }
  
  console.log(`\n${c('bright', `🔍 Found ${results.length} hooks matching "${term}"`)}\n`);
  results.forEach(r => {
    console.log(`  ${c('green', '"' + r.hook + '"')}`);
    console.log(`  ${c('dim', r.emoji + ' ' + r.category)}\n`);
  });
}

function showFormulas(data) {
  console.log(`\n${c('bright', '📐 Hook Formulas')}\n`);
  
  for (const [key, formula] of Object.entries(data.formulas)) {
    console.log(`  ${c('cyan', formula.name)}`);
    console.log(`  ${c('dim', 'Template:')} ${formula.template}`);
    console.log(`  ${c('dim', 'Example:')} "${c('green', formula.example)}"`);
    console.log('');
  }
}

function showBest(data) {
  console.log(`\n${c('bright', '⭐ Best Performing Hook Categories')}\n`);
  
  for (const [key, cat] of Object.entries(data.categories)) {
    if (cat.performance === 'best') {
      console.log(`  ${cat.emoji} ${c('cyan', cat.name)}`);
      console.log(`  ${c('dim', `${cat.hooks.length} hooks | Format: ${cat.format}`)}`);
      console.log(`  ${c('green', 'Example:')} "${randomItem(cat.hooks)}"`);
      console.log('');
    }
  }
}

function showByFormat(data, format) {
  const label = format === 'short' ? '📱 Short-Form Hooks' : '📺 Long-Form Hooks';
  console.log(`\n${c('bright', label)}\n`);
  
  for (const [key, cat] of Object.entries(data.categories)) {
    if (cat.format === format || cat.format === 'both') {
      console.log(`  ${cat.emoji} ${c('cyan', cat.name)}`);
      cat.hooks.slice(0, 3).forEach(h => {
        console.log(`     • "${h}"`);
      });
      if (cat.hooks.length > 3) {
        console.log(c('dim', `     ... and ${cat.hooks.length - 3} more`));
      }
      console.log('');
    }
  }
}

function showStats(data) {
  let total = 0;
  let byPerf = { best: 0, good: 0, testing: 0 };
  let byFormat = { short: 0, long: 0, both: 0 };
  
  for (const cat of Object.values(data.categories)) {
    total += cat.hooks.length;
    byPerf[cat.performance] = (byPerf[cat.performance] || 0) + cat.hooks.length;
    byFormat[cat.format] = (byFormat[cat.format] || 0) + cat.hooks.length;
  }
  
  console.log(`\n${c('bright', '📊 Hooks Library Stats')}\n`);
  console.log(`  ${c('cyan', 'Total Hooks:')} ${total}`);
  console.log(`  ${c('cyan', 'Categories:')} ${Object.keys(data.categories).length}`);
  console.log(`  ${c('cyan', 'Formulas:')} ${Object.keys(data.formulas).length}`);
  console.log('');
  console.log(`  ${c('green', 'By Performance:')}`);
  console.log(`    ⭐ Best: ${byPerf.best || 0}`);
  console.log(`    ✓ Good: ${byPerf.good || 0}`);
  console.log(`    • Testing: ${byPerf.testing || 0}`);
  console.log('');
  console.log(`  ${c('green', 'By Format:')}`);
  console.log(`    📱 Short-form: ${byFormat.short || 0}`);
  console.log(`    📺 Long-form: ${byFormat.long || 0}`);
  console.log(`    🔄 Both: ${byFormat.both || 0}`);
  console.log('');
}

function addHook(data, category, hook) {
  const key = Object.keys(data.categories).find(k => 
    k.includes(category.toLowerCase())
  );
  
  if (!key) {
    console.log(c('red', `❌ Category "${category}" not found.`));
    return;
  }
  
  data.categories[key].hooks.push(hook);
  saveData(data);
  console.log(c('green', `\n✅ Added hook to ${data.categories[key].name}:`));
  console.log(`   "${hook}"\n`);
}

// Main CLI
const args = process.argv.slice(2);
const command = args[0];
const data = loadData();

switch (command) {
  case 'list':
  case 'ls':
    listCategories(data);
    break;
    
  case 'show':
  case 'cat':
    if (!args[1]) {
      console.log(c('red', '❌ Please specify a category'));
      console.log(c('dim', 'Use: hooks list to see available categories'));
    } else {
      showCategory(data, args[1]);
    }
    break;
    
  case 'random':
  case 'r':
    getRandomHook(data, args[1]);
    break;
    
  case 'search':
  case 's':
    if (!args[1]) {
      console.log(c('red', '❌ Please specify a search term'));
    } else {
      searchHooks(data, args.slice(1).join(' '));
    }
    break;
    
  case 'formulas':
  case 'f':
    showFormulas(data);
    break;
    
  case 'best':
  case 'top':
    showBest(data);
    break;
    
  case 'short':
  case 'shorts':
    showByFormat(data, 'short');
    break;
    
  case 'long':
  case 'longform':
    showByFormat(data, 'long');
    break;
    
  case 'stats':
    showStats(data);
    break;
    
  case 'add':
    if (args.length < 3) {
      console.log(c('red', '❌ Usage: hooks add <category> <hook text>'));
    } else {
      addHook(data, args[1], args.slice(2).join(' '));
    }
    break;
    
  case 'help':
  case '-h':
  case '--help':
  default:
    printHelp();
}
