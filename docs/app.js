// Liz HappyBeans Hook Generator - Main App
document.addEventListener('DOMContentLoaded', () => {
  // State
  let currentTab = 'browse';
  let searchQuery = '';
  let filters = {
    category: 'all',
    performance: 'all',
    format: 'all'
  };
  let randomHistory = [];

  // DOM Elements
  const tabs = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.panel');
  const searchInput = document.getElementById('search');
  const hooksGrid = document.getElementById('hooks-grid');
  const statsEl = document.getElementById('stats');
  const toast = document.getElementById('toast');

  // Initialize
  init();

  function init() {
    renderStats();
    populateFilters();
    renderHooks();
    renderFormulas();
    setupEventListeners();
  }

  // Render stats in header
  function renderStats() {
    let totalHooks = 0;
    const categories = Object.keys(hooksData.categories).length;
    const formulas = Object.keys(hooksData.formulas).length;

    Object.values(hooksData.categories).forEach(cat => {
      totalHooks += cat.hooks.length;
    });

    statsEl.innerHTML = `
      <div class="stat">
        <span class="stat-value">${totalHooks}</span>
        <span class="stat-label">Hooks</span>
      </div>
      <div class="stat">
        <span class="stat-value">${categories}</span>
        <span class="stat-label">Categories</span>
      </div>
      <div class="stat">
        <span class="stat-value">${formulas}</span>
        <span class="stat-label">Formulas</span>
      </div>
    `;
  }

  // Populate filter dropdowns
  function populateFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const randomCategory = document.getElementById('random-category');
    const genFormula = document.getElementById('gen-formula');

    // Categories
    Object.entries(hooksData.categories).forEach(([key, cat]) => {
      const option = `<option value="${key}">${cat.emoji} ${cat.name}</option>`;
      categoryFilter.innerHTML += option;
      randomCategory.innerHTML += option;
    });

    // Formulas for generator
    Object.entries(hooksData.formulas).forEach(([key, formula]) => {
      genFormula.innerHTML += `<option value="${key}">${formula.name}</option>`;
    });
  }

  // Render hooks grid
  function renderHooks() {
    let allHooks = [];

    Object.entries(hooksData.categories).forEach(([categoryKey, category]) => {
      category.hooks.forEach(hook => {
        allHooks.push({
          text: hook,
          category: category.name,
          categoryKey: categoryKey,
          emoji: category.emoji,
          format: category.format,
          performance: category.performance,
          color: category.color
        });
      });
    });

    // Apply filters
    let filtered = allHooks;

    if (filters.category !== 'all') {
      filtered = filtered.filter(h => h.categoryKey === filters.category);
    }

    if (filters.performance !== 'all') {
      filtered = filtered.filter(h => h.performance === filters.performance);
    }

    if (filters.format !== 'all') {
      filtered = filtered.filter(h => h.format === filters.format || h.format === 'both');
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(h => 
        h.text.toLowerCase().includes(query) ||
        h.category.toLowerCase().includes(query)
      );
    }

    // Render
    if (filtered.length === 0) {
      hooksGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-emoji">🔍</div>
          <p>No hooks found. Try adjusting your filters.</p>
        </div>
      `;
      return;
    }

    hooksGrid.innerHTML = filtered.map(hook => `
      <div class="hook-card" data-hook="${escapeHtml(hook.text)}" style="border-left-color: ${hook.color}">
        <p class="hook-text">${hook.text}</p>
        <div class="hook-meta">
          <span class="hook-tag">${hook.emoji} ${hook.category}</span>
          <span class="hook-tag ${hook.performance}">${getPerformanceLabel(hook.performance)}</span>
          <span class="hook-tag">${getFormatLabel(hook.format)}</span>
        </div>
      </div>
    `).join('');

    // Add click handlers
    document.querySelectorAll('.hook-card').forEach(card => {
      card.addEventListener('click', () => copyHook(card));
    });
  }

  // Render formulas
  function renderFormulas() {
    const formulasGrid = document.getElementById('formulas-grid');

    formulasGrid.innerHTML = Object.entries(hooksData.formulas).map(([key, formula]) => `
      <div class="formula-card" style="border-top-color: ${formula.color}">
        <h3 class="formula-name">📐 ${formula.name}</h3>
        <div class="formula-template">
          ${highlightPlaceholders(formula.template)}
        </div>
        <p class="formula-example">
          <strong>Example:</strong> "${formula.example}"
        </p>
      </div>
    `).join('');
  }

  // Setup event listeners
  function setupEventListeners() {
    // Tabs
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        switchTab(tabName);
      });
    });

    // Search
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderHooks();
    });

    // Filters
    document.getElementById('category-filter').addEventListener('change', (e) => {
      filters.category = e.target.value;
      renderHooks();
    });

    document.getElementById('performance-filter').addEventListener('change', (e) => {
      filters.performance = e.target.value;
      renderHooks();
    });

    document.getElementById('format-filter').addEventListener('change', (e) => {
      filters.format = e.target.value;
      renderHooks();
    });

    // Random button
    document.getElementById('btn-random').addEventListener('click', generateRandom);

    // Formula selection
    document.getElementById('gen-formula').addEventListener('change', handleFormulaSelect);

    // Generate button
    document.getElementById('btn-generate').addEventListener('click', generateFromFormula);

    // Copy generated
    document.getElementById('btn-copy-generated').addEventListener('click', () => {
      const text = document.getElementById('generated-hook').textContent;
      copyToClipboard(text);
    });

    // Mashup button
    document.getElementById('btn-mashup').addEventListener('click', generateMashup);
  }

  // Switch tabs
  function switchTab(tabName) {
    currentTab = tabName;

    tabs.forEach(t => {
      t.classList.toggle('active', t.dataset.tab === tabName);
    });

    panels.forEach(p => {
      p.classList.toggle('active', p.id === `panel-${tabName}`);
    });
  }

  // Generate random hook
  function generateRandom() {
    const categoryFilter = document.getElementById('random-category').value;
    let pool = [];

    if (categoryFilter === 'all') {
      Object.entries(hooksData.categories).forEach(([key, cat]) => {
        cat.hooks.forEach(hook => {
          pool.push({ text: hook, category: cat.name, emoji: cat.emoji });
        });
      });
    } else {
      const cat = hooksData.categories[categoryFilter];
      cat.hooks.forEach(hook => {
        pool.push({ text: hook, category: cat.name, emoji: cat.emoji });
      });
    }

    const random = pool[Math.floor(Math.random() * pool.length)];

    // Update display
    document.querySelector('.random-hook-text').textContent = `"${random.text}"`;
    document.querySelector('.random-hook-category').textContent = `${random.emoji} ${random.category}`;

    // Add to history
    randomHistory.unshift(random);
    if (randomHistory.length > 5) randomHistory.pop();
    renderHistory();

    // Copy to clipboard
    copyToClipboard(random.text);
  }

  // Render history
  function renderHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = randomHistory.map(h => 
      `<li data-hook="${escapeHtml(h.text)}">${h.emoji} ${h.text}</li>`
    ).join('');

    historyList.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', () => {
        copyToClipboard(li.dataset.hook);
      });
    });
  }

  // Handle formula selection
  function handleFormulaSelect(e) {
    const formulaKey = e.target.value;
    const fieldsContainer = document.getElementById('formula-fields');
    const generateBtn = document.getElementById('btn-generate');

    if (!formulaKey) {
      fieldsContainer.innerHTML = '';
      generateBtn.disabled = true;
      return;
    }

    const formula = hooksData.formulas[formulaKey];
    fieldsContainer.innerHTML = formula.fields.map((field, i) => `
      <div class="form-group">
        <label>${capitalize(field)}:</label>
        <input type="text" id="field-${i}" placeholder="Enter ${field}..." data-field="${field}">
      </div>
    `).join('');

    generateBtn.disabled = false;
  }

  // Generate from formula
  function generateFromFormula() {
    const formulaKey = document.getElementById('gen-formula').value;
    const formula = hooksData.formulas[formulaKey];
    let result = formula.template;

    // Replace placeholders with user input
    const inputs = document.querySelectorAll('#formula-fields input');
    inputs.forEach(input => {
      const placeholder = `[${input.dataset.field}]`;
      const value = input.value || input.dataset.field;
      result = result.replace(placeholder, value);
    });

    // Show result
    document.getElementById('generated-hook').textContent = result;
    document.getElementById('generated-result').style.display = 'block';
  }

  // Generate mashup (AI-style random generation)
  function generateMashup() {
    const mashups = [
      () => {
        const v = hooksData.variations;
        const time = v.timeframes[Math.floor(Math.random() * v.timeframes.length)];
        const thing = v.mistakes[Math.floor(Math.random() * v.mistakes.length)];
        return `I was doing ${thing} wrong for ${time}. Here's the fix.`;
      },
      () => {
        const v = hooksData.variations;
        const price = v.prices[Math.floor(Math.random() * v.prices.length)];
        const home = v.homePrices[Math.floor(Math.random() * v.homePrices.length)];
        const drink = v.drinks[Math.floor(Math.random() * v.drinks.length)];
        return `This ${drink} costs ${price} at Starbucks. I made it for ${home}.`;
      },
      () => {
        const v = hooksData.variations;
        const verb = v.improvements[Math.floor(Math.random() * v.improvements.length)];
        const thing = v.things[Math.floor(Math.random() * v.things.length)];
        return `This one change ${verb} my ${thing} forever.`;
      },
      () => {
        const numbers = [3, 5, 7, 10];
        const num = numbers[Math.floor(Math.random() * numbers.length)];
        const subjects = ['mistakes ruining your espresso', 'tips for better milk', 'Breville hacks you need to know', 'things I wish I knew earlier', 'upgrades that are actually worth it'];
        const subject = subjects[Math.floor(Math.random() * subjects.length)];
        return `${num} ${subject}`;
      },
      () => {
        const secrets = ['Breville doesn\'t want you to change', 'nobody talks about', 'transformed my shots', 'took me 2 years to learn', 'every barista knows'];
        const secret = secrets[Math.floor(Math.random() * secrets.length)];
        return `The setting that ${secret}.`;
      },
      () => {
        const things = ['the pressure gauge', 'the grind amount dial', 'the pressurized basket', 'pre-infusion', 'the cleaning cycle'];
        const thing = things[Math.floor(Math.random() * things.length)];
        return `Stop using ${thing}. Here's why.`;
      },
      () => {
        const times = ['Week 1', 'Day 1', 'Month 1', 'My first shot'];
        const time = times[Math.floor(Math.random() * times.length)];
        return `${time} vs now (what changed)`;
      }
    ];

    const generator = mashups[Math.floor(Math.random() * mashups.length)];
    const result = generator();

    document.getElementById('mashup-result').textContent = `"${result}"`;
    copyToClipboard(result);
  }

  // Copy hook to clipboard
  function copyHook(card) {
    const hook = card.dataset.hook;
    copyToClipboard(hook);

    // Visual feedback
    card.classList.add('copied');
    setTimeout(() => card.classList.remove('copied'), 2000);
  }

  // Copy to clipboard utility
  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
      showToast();
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  }

  // Show toast notification
  function showToast() {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
  }

  // Helper functions
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function getPerformanceLabel(perf) {
    const labels = {
      best: '⭐ Best',
      good: '✓ Good',
      testing: '🧪 Testing'
    };
    return labels[perf] || perf;
  }

  function getFormatLabel(format) {
    const labels = {
      short: '📱 Short',
      long: '📺 Long',
      both: '🔄 Both'
    };
    return labels[format] || format;
  }

  function highlightPlaceholders(template) {
    return template.replace(/\[([^\]]+)\]/g, '<span class="placeholder">[$1]</span>');
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
});
