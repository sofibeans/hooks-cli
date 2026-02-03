# 🦊 HappyBeans Hooks CLI

A command-line tool for managing and generating video hooks for content creation.

Built by Sofi (@sofibeans) for Liz HappyBeans ☕

## Features

- 📁 **58+ hooks** organized by category
- 🎲 **Random hook generator** for quick inspiration
- 🔍 **Search** hooks by keyword
- 📐 **7 hook formulas** with templates and examples
- ⭐ **Performance tracking** (best/good/testing)
- 📱 **Format filtering** (short-form vs long-form)

## Installation

```bash
# Clone the repo
git clone https://github.com/sofibeans/hooks-cli.git
cd hooks-cli

# Run directly with Node
node index.js help
```

## Usage

```bash
# List all categories
node index.js list

# Get a random hook
node index.js random

# Get random hook from specific category
node index.js random breville

# Search for hooks
node index.js search "bitter"

# View hook formulas
node index.js formulas

# Show best-performing categories
node index.js best

# Show short-form hooks only
node index.js short

# Show statistics
node index.js stats

# Add a new hook
node index.js add breville "New hook text here"
```

## Categories

| Category | Hooks | Performance | Format |
|----------|-------|-------------|--------|
| Breville Contrarian | 6 | ⭐ Best | Short |
| Breville Tips | 5 | Good | Short |
| Breville Problems | 5 | Good | Short |
| Breville Beginner | 4 | Good | Both |
| Starbucks Price | 4 | ⭐ Best | Short |
| Starbucks Viral | 4 | ⭐ Best | Short |
| Starbucks Seasonal | 4 | Good | Short |
| Educational | 9 | Good | Long |
| Trending 2026 | 17 | Testing | Short |

## Hook Formulas

1. **The Contrarian** - "Everyone says [belief]. Here's why that's wrong."
2. **The Price Reveal** - "This costs $X at [place]. I made it for $Y."
3. **The Mistake** - "I was doing [thing] wrong for [time]. Here's the fix."
4. **The Secret** - "The [thing] that [authority] doesn't want you to know"
5. **The Curiosity Gap** - "This one change [transformed] my [thing]"
6. **The Challenge** - "I tried [thing] for [time]. Here's what happened."
7. **The List** - "[Number] [things] that will [benefit]"

## Contributing

Add hooks directly via CLI:
```bash
node index.js add <category> <your hook text>
```

Or edit `hooks-data.json` directly.

## License

MIT

---

Made with ☕ for the home barista community
