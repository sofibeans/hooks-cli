// Liz HappyBeans Hook Library - Expanded Edition
// 150+ hooks across 12 categories with formulas

const hooksData = {
  categories: {
    "breville-contrarian": {
      name: "Breville Contrarian/Myth-Busting",
      emoji: "🔧",
      format: "short",
      performance: "best",
      color: "#e74c3c",
      hooks: [
        "Stop looking at the pressure gauge. Here's why.",
        "This Breville dial is basically useless",
        "Your Breville grinder is lying to you",
        "Everyone does this wrong on the Breville",
        "The Breville setting Breville doesn't want you to change",
        "I was using my Breville wrong for 2 years",
        "The pressure gauge is a lie. Here's the truth.",
        "Why I ignore the 'espresso range' on my Breville",
        "This 'feature' is actually making your shots worse",
        "Stop using the cleaning tablets like this",
        "Your Breville manual is wrong about this one thing",
        "The grinder dial numbers mean nothing. Here's why.",
        "Everyone tells you to use the double basket. Don't.",
        "This Breville setting ruins your shots (and nobody talks about it)"
      ]
    },
    "breville-tips": {
      name: "Breville Tips/Hacks",
      emoji: "💡",
      format: "short",
      performance: "good",
      color: "#f39c12",
      hooks: [
        "One setting that changed my Breville shots forever",
        "The Breville hack that took me too long to learn",
        "Do this BEFORE your first shot of the day",
        "Clean your Breville like this (most people don't)",
        "The grind setting I actually use (it's not what you think)",
        "Run a blank shot first. Here's why.",
        "The 10-second trick for better Breville shots",
        "This $5 accessory changed my Breville game",
        "I purge my grinder. Here's why you should too.",
        "The hidden menu on your Breville (yes, it exists)",
        "How I dial in a new bag in under 5 shots",
        "The temperature trick nobody talks about",
        "Why I never use the default grind setting",
        "The easiest Breville upgrade that costs nothing"
      ]
    },
    "breville-problems": {
      name: "Breville Problem/Solution",
      emoji: "🩹",
      format: "short",
      performance: "good",
      color: "#9b59b6",
      hooks: [
        "Why your Breville shots taste bitter (easy fix)",
        "Sour shots? Try this.",
        "If your Breville is making watery espresso, watch this",
        "Your puck is soupy because of THIS",
        "Channeling on every shot? Here's the fix",
        "Shots running too fast? Don't touch the grind yet.",
        "Why your milk never gets silky (and how to fix it)",
        "Steam wand sputtering? Here's the actual reason.",
        "Pressure too high? It's probably not what you think.",
        "Espresso tastes burned? Check this first.",
        "Grinder making weird noises? Try this.",
        "Machine not heating up? Don't panic.",
        "Shots channeling every time? Look here first.",
        "Why your crema disappears in 10 seconds"
      ]
    },
    "breville-beginner": {
      name: "Breville Beginner-Friendly",
      emoji: "🎓",
      format: "both",
      performance: "good",
      color: "#3498db",
      hooks: [
        "What I wish I knew before buying a Breville",
        "Breville Barista Express: First week tips",
        "5 things beginners always get wrong",
        "The Breville accessory that's actually worth it",
        "New Breville owner? Start here.",
        "The 3 settings you need to change on day one",
        "Your first espresso will suck. Here's how to make it suck less.",
        "Beginner mistakes I made (so you don't have to)",
        "The learning curve nobody warns you about",
        "Week 1 vs Week 4 on the Breville (what changed)",
        "Skip these 'beginner' tips — they're wrong",
        "The one thing I'd do differently starting out"
      ]
    },
    "starbucks-copycat": {
      name: "Starbucks Copycat Recipes",
      emoji: "☕",
      format: "short",
      performance: "best",
      color: "#27ae60",
      hooks: [
        "This $7 Starbucks drink costs me $1.50 at home",
        "$8 drink. $2 at home. Same taste. Here's how.",
        "Skip the Starbucks line. Make this instead.",
        "Starbucks charges HOW much for this?!",
        "The Starbucks drink I recreated at home (blind taste test)",
        "I reverse-engineered the Starbucks [drink]. It's easy.",
        "Barista-approved: My Starbucks copycat is better than the original",
        "This Starbucks recipe took me 10 tries. Worth it.",
        "Stop paying $7 for this. Make it in 2 minutes.",
        "My Starbucks order, but make it homemade",
        "The secret ingredient Starbucks uses (it's not what you think)",
        "I worked at Starbucks. Here's how to make the [drink] at home.",
        "The Starbucks drink you can't order anymore (but can make)"
      ]
    },
    "starbucks-viral": {
      name: "Starbucks Viral/Trending",
      emoji: "🔥",
      format: "short",
      performance: "best",
      color: "#e74c3c",
      hooks: [
        "The Starbucks drink that broke TikTok",
        "Everyone's ordering this. Here's the recipe.",
        "This 'secret menu' drink isn't secret anymore",
        "The viral Starbucks drink you can make in 2 minutes",
        "The drink TikTok won't stop talking about",
        "This Starbucks hack has 50M views. Does it work?",
        "I tried the viral Starbucks order. Here's my honest take.",
        "The TikTok drink that's actually worth the hype",
        "This trend is everywhere. I made it at home.",
        "The Starbucks order baristas hate (but tastes amazing)",
        "This drink went viral for a reason",
        "Why is everyone ordering THIS?"
      ]
    },
    "starbucks-seasonal": {
      name: "Starbucks Seasonal",
      emoji: "🍂",
      format: "short",
      performance: "good",
      color: "#d35400",
      hooks: [
        "Starbucks' [seasonal] is back. Make it at home.",
        "The fall/winter/spring drink everyone's obsessed with",
        "Valentine's Starbucks drinks ranked (+ recipes)",
        "Don't wait in line for the [holiday] drinks",
        "PSL season but make it homemade",
        "The holiday drink that's worth the hype",
        "I ranked all the seasonal drinks. Here's the winner.",
        "This limited-time drink is going fast. DIY version:",
        "Starbucks spring menu, but better (and cheaper)",
        "The Dubai Chocolate [drink] is BACK. Make it now.",
        "Valentine's drinks ranked from worst to best",
        "Pistachio everything. Here's the recipe."
      ]
    },
    "latte-art": {
      name: "Latte Art",
      emoji: "🎨",
      format: "short",
      performance: "good",
      color: "#8e44ad",
      hooks: [
        "My latte art sucked until I learned THIS",
        "The milk texture secret nobody explains",
        "Why your hearts look like blobs (easy fix)",
        "Latte art in 30 days: What I learned",
        "The pour that changed everything",
        "Stop overcomplicating latte art. Do this instead.",
        "The one thing keeping you from good latte art",
        "Your milk is too hot. Here's how I know.",
        "First rosetta vs today (what changed)",
        "The latte art mistake I made for 6 months",
        "Why your tulips never stack properly",
        "The wrist movement nobody teaches you",
        "Milk not stretching right? Check this.",
        "The pitcher trick that improved my pours instantly"
      ]
    },
    "grinder": {
      name: "Grinder Tips",
      emoji: "⚙️",
      format: "short",
      performance: "good",
      color: "#2c3e50",
      hooks: [
        "Your grinder is the problem. Here's why.",
        "Upgrade your grinder before your machine",
        "The grind setting chart that changed my shots",
        "Why your grinder needs seasoning (and how to do it)",
        "Retention is killing your espresso. Fix it.",
        "Single dose vs hopper: The truth",
        "Why I switched to single dosing (and never went back)",
        "The grinder upgrade that's actually worth it",
        "Burr alignment: Why it matters",
        "Your grinder is too slow. Here's the fix.",
        "The grinder cleaning routine that takes 2 minutes",
        "Why your first shot of the day tastes weird"
      ]
    },
    "educational-long": {
      name: "Educational/Course",
      emoji: "📚",
      format: "long",
      performance: "good",
      color: "#1abc9c",
      hooks: [
        "New espresso machine? Watch this first.",
        "The complete beginner's guide to espresso",
        "Everything I learned in 5 years, in 5 minutes",
        "Why your first shots will suck (and how to fix it)",
        "From terrible shots to cafe-quality in 30 days",
        "The day my espresso finally clicked",
        "After 1000 shots, here's what I've learned",
        "The mistakes I made so you don't have to",
        "What they don't tell you about home espresso",
        "The espresso journey nobody prepares you for",
        "I spent $5000 on coffee gear. Here's what was worth it.",
        "The complete milk steaming guide (from terrible to cafe-quality)",
        "Dialing in espresso: The ONLY guide you need",
        "How I went from beginner to confident in 60 days"
      ]
    },
    "lifestyle": {
      name: "Lifestyle/Aesthetic",
      emoji: "✨",
      format: "short",
      performance: "testing",
      color: "#e91e63",
      hooks: [
        "Morning coffee routine (elevated version)",
        "The cozy coffee setup that cost less than you think",
        "Coffee bar tour (small space edition)",
        "My morning ritual (5 AM coffee edition)",
        "The setup that makes me excited to wake up",
        "Coffee corner glow-up on a budget",
        "POV: Your morning coffee just hits different",
        "The coffee setup that changed my mornings",
        "Small kitchen, big coffee energy",
        "Sunday morning coffee ritual ☕",
        "The aesthetic coffee setup you need to see",
        "Home cafe vibes (apartment edition)"
      ]
    },
    "trending-2026": {
      name: "Trending 2026",
      emoji: "🚀",
      format: "short",
      performance: "testing",
      color: "#673ab7",
      hooks: [
        "2026 is the year you master your milk",
        "This is the year we stop overfilling our coffee baskets",
        "2026: the year of actually cleaning your grinder",
        "Make 2026 the year you ditch the pressurized basket",
        "Curiosity got the better of me...",
        "I've been doing this wrong the entire time",
        "I finally tried the thing everyone's been talking about",
        "Sorry I called you overpriced, oat milk — you're worth it",
        "I was wrong about [common opinion]",
        "Okay fine, the internet was right about this one",
        "Miso in your latte? It actually works.",
        "Ube lattes are everywhere — are they worth the hype?",
        "The pistachio latte trend, but make it at home",
        "Why is everyone putting [ingredient] in their coffee?",
        "Little space, big difference",
        "Small change, huge impact on your shots",
        "One thing that costs $0 but improves every shot",
        "The 2026 coffee trends actually worth trying",
        "Coffee Twitter was right about this one"
      ]
    }
  },
  
  formulas: {
    "contrarian": {
      name: "The Contrarian",
      template: "Everyone says [common belief]. Here's why that's wrong.",
      example: "Everyone says to use the steam wand tip at the surface. Here's why that's wrong.",
      fields: ["common belief"],
      color: "#e74c3c"
    },
    "price-reveal": {
      name: "The Price Reveal",
      template: "This costs $[price] at [place]. I made it for $[your price].",
      example: "This costs $8 at Starbucks. I made it for $1.50.",
      fields: ["price", "place", "your price"],
      color: "#27ae60"
    },
    "mistake": {
      name: "The Mistake",
      template: "I was doing [thing] wrong for [time period]. Here's the fix.",
      example: "I was tamping wrong for 3 years. Here's the fix.",
      fields: ["thing", "time period"],
      color: "#9b59b6"
    },
    "secret": {
      name: "The Secret",
      template: "The [thing] that [authority] doesn't want you to know",
      example: "The setting that Breville doesn't want you to change",
      fields: ["thing", "authority"],
      color: "#2c3e50"
    },
    "curiosity-gap": {
      name: "The Curiosity Gap",
      template: "This one change [verb] my [thing] forever",
      example: "This one change transformed my milk texture forever",
      fields: ["verb (transformed/fixed/improved)", "thing"],
      color: "#3498db"
    },
    "challenge": {
      name: "The Challenge",
      template: "I tried [difficult thing] for [time period]. Here's what happened.",
      example: "I tried making latte art for 30 days. Here's what happened.",
      fields: ["difficult thing", "time period"],
      color: "#f39c12"
    },
    "list": {
      name: "The List",
      template: "[Number] [things] that will [benefit]",
      example: "5 mistakes that are ruining your espresso",
      fields: ["number", "things", "benefit"],
      color: "#1abc9c"
    },
    "before-after": {
      name: "Before/After",
      template: "[Time period] ago vs now (what changed)",
      example: "Week 1 vs Week 4 on the Breville (what changed)",
      fields: ["time period"],
      color: "#e91e63"
    },
    "pov": {
      name: "The POV",
      template: "POV: You finally [achievement]",
      example: "POV: You finally nail the milk texture",
      fields: ["achievement"],
      color: "#673ab7"
    },
    "hot-take": {
      name: "Hot Take",
      template: "[Controversial opinion]. Fight me.",
      example: "Light roast makes better espresso than dark roast. Fight me.",
      fields: ["controversial opinion"],
      color: "#e74c3c"
    }
  },

  // Random variations for AI-style generation
  variations: {
    timeframes: ["1 year", "2 years", "3 years", "6 months", "30 days", "2 weeks", "my whole life"],
    prices: ["$5", "$6", "$7", "$8", "$9", "$10", "$12"],
    homePrices: ["$0.50", "$1", "$1.50", "$2", "$2.50", "$3"],
    places: ["Starbucks", "Dunkin", "your local cafe", "that fancy coffee shop"],
    drinks: ["latte", "cappuccino", "oat milk latte", "vanilla latte", "caramel macchiato", "iced coffee", "cold brew"],
    mistakes: ["tamping", "grinding", "steaming milk", "dosing", "timing my shots", "cleaning my machine"],
    improvements: ["transformed", "fixed", "completely changed", "finally improved", "upgraded"],
    things: ["shots", "milk texture", "crema", "consistency", "morning routine", "espresso game"]
  }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = hooksData;
}
