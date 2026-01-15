# BioPage PRD

## Overview

**BioPage** is a CLI tool that lets developers add beautiful, customizable link-in-bio pages to their existing websites. Following shadcn's "copy, don't install" philosophy, it drops a single page file directly into your project with full ownership of the code.

## Problem

Current solutions for link-in-bio pages are:
- **Hosted SaaS** (Linktree, Beacons) - separate domain, no ownership
- **Full standalone apps** (OpenBio, LinkNode) - requires new deployment
- **Templates** - start from scratch, can't add to existing site

**Gap:** No tool lets you simply add a styled bio page to your existing Next.js/Nuxt/React site.

## Solution

A CLI tool that:
1. Detects your framework (or accepts `--framework` flag)
2. Copies a self-contained page file into your project
3. Creates a config file for easy content updates
4. Offers multiple style themes to choose from

## Target Users

- Developers with existing personal sites who want a /links page
- Freelancers/creators who want bio links on their own domain
- Anyone who values owning their code over SaaS dependencies

---

## Core Features

### 1. CLI Commands

```bash
# Initialize - creates config + default page
npx biopage init

# Add a specific theme
npx biopage add glass
npx biopage add minimal
npx biopage add brutalist

# List available themes
npx biopage list

# Update to latest version of current theme
npx biopage update
```

### 2. Framework Support

| Framework | Output Path | File Type |
|-----------|-------------|-----------|
| Nuxt | `pages/links.vue` | Vue SFC |
| Next.js (App Router) | `app/links/page.tsx` | React TSX |
| Next.js (Pages Router) | `pages/links.tsx` | React TSX |
| React (Vite) | `src/pages/Links.tsx` | React TSX |
| SvelteKit | `src/routes/links/+page.svelte` | Svelte |
| Astro | `src/pages/links.astro` | Astro |

Auto-detection via:
- `nuxt.config.ts` → Nuxt
- `next.config.js` → Next.js
- `svelte.config.js` → SvelteKit
- `astro.config.mjs` → Astro
- `vite.config.ts` + no framework → React

### 3. Config File

`biopage.config.json`:

```json
{
  "name": "Joshua Omobola",
  "bio": "DevRel Engineer & AI Educator",
  "avatar": "./public/avatar.png",
  "verified": true,
  "theme": "glass",
  "background": {
    "type": "image",
    "src": "https://example.com/bg.jpg"
  },
  "links": [
    {
      "title": "Get my free Prompt Bank",
      "description": "Ready-to-use prompts for AI",
      "url": "https://gumroad.com/...",
      "icon": "./public/icons/gumroad.png"
    },
    {
      "title": "Book a 1:1 Call",
      "description": "Let's chat about your project",
      "url": "https://cal.com/...",
      "icon": "./public/icons/cal.png"
    }
  ],
  "socials": [
    { "platform": "github", "url": "https://github.com/username" },
    { "platform": "twitter", "url": "https://x.com/username" },
    { "platform": "linkedin", "url": "https://linkedin.com/in/username" },
    { "platform": "youtube", "url": "https://youtube.com/@username" }
  ],
  "footer": {
    "text": "koha.wtf",
    "url": "/"
  }
}
```

### 4. Theme Variants

#### Glass (Default)
- Dark semi-transparent card
- Backdrop blur
- Subtle hover animations
- Sky/nature background image

#### Minimal
- Clean white or black background
- No background image
- Simple typography
- Monochrome icons

#### Brutalist
- Bold borders
- Raw, unpolished aesthetic
- High contrast
- System fonts

#### Gradient
- Colorful gradient backgrounds
- Vibrant accent colors
- Smooth transitions
- Modern feel

#### Bento
- Grid layout for links
- Card-based design
- More visual, less list-like

#### Notion
- Clean, structured
- Serif headings
- Notion-inspired aesthetics

---

## Technical Architecture

### What Gets Copied to User's Project

Each theme defines its own components. You only get what that theme needs.

**Glass theme:**
```
components/
└── biopage/
    ├── GlassCard.vue           # Frosted glass container
    ├── GlassAvatar.vue         # Circular avatar with border
    ├── GlassLinkItem.vue       # Link card with hover scale
    └── GlassBackground.vue     # Fixed image background
pages/
└── links.vue
biopage.config.json
```

**Minimal theme:**
```
components/
└── biopage/
    ├── MinimalContainer.vue    # Clean wrapper
    └── MinimalLink.vue         # Simple link row
pages/
└── links.vue
biopage.config.json
```

**Bento theme:**
```
components/
└── biopage/
    ├── BentoGrid.vue           # Grid layout
    ├── BentoCard.vue           # Grid item card
    ├── BentoProfile.vue        # Large profile card
    └── BentoLink.vue           # Link tile
pages/
└── links.vue
biopage.config.json
```

**Brutalist theme:**
```
components/
└── biopage/
    ├── BrutalistFrame.vue      # Bold bordered container
    ├── BrutalistLink.vue       # Raw link block
    └── BrutalistBadge.vue      # Stamp-style badge
pages/
└── links.vue
biopage.config.json
```

Each theme is self-contained. Different structure, different components, different aesthetic.

### CLI Package Structure

```
biopage/
├── bin/
│   └── cli.js
├── src/
│   ├── commands/
│   │   ├── init.ts
│   │   ├── add.ts
│   │   ├── list.ts
│   │   └── update.ts
│   ├── registry/
│   │   ├── themes.json           # Theme metadata + component list
│   │   ├── nuxt/
│   │   │   ├── glass/
│   │   │   │   ├── components/
│   │   │   │   │   ├── GlassCard.vue
│   │   │   │   │   ├── GlassAvatar.vue
│   │   │   │   │   ├── GlassLinkItem.vue
│   │   │   │   │   └── GlassBackground.vue
│   │   │   │   └── page.vue
│   │   │   ├── minimal/
│   │   │   │   ├── components/
│   │   │   │   │   ├── MinimalContainer.vue
│   │   │   │   │   └── MinimalLink.vue
│   │   │   │   └── page.vue
│   │   │   ├── bento/
│   │   │   └── brutalist/
│   │   ├── next/
│   │   │   ├── glass/
│   │   │   ├── minimal/
│   │   │   └── ...
│   │   └── react/
│   ├── utils/
│   │   ├── detect-framework.ts
│   │   ├── copy-theme.ts
│   │   └── config.ts
│   └── index.ts
├── package.json
└── README.md
```

**themes.json:**
```json
{
  "glass": {
    "name": "Glass",
    "description": "Frosted glass card with blur effect",
    "components": ["GlassCard", "GlassAvatar", "GlassLinkItem", "GlassBackground"],
    "preview": "https://biopage.dev/preview/glass"
  },
  "minimal": {
    "name": "Minimal",
    "description": "Clean and simple, no distractions",
    "components": ["MinimalContainer", "MinimalLink"],
    "preview": "https://biopage.dev/preview/minimal"
  },
  "bento": {
    "name": "Bento",
    "description": "Grid layout inspired by bento boxes",
    "components": ["BentoGrid", "BentoCard", "BentoProfile", "BentoLink"],
    "preview": "https://biopage.dev/preview/bento"
  }
}
```

### Dependencies

Minimal - the CLI itself:
- `commander` - CLI framework
- `prompts` - Interactive prompts
- `picocolors` - Terminal colors
- `fs-extra` - File operations

Generated pages use only:
- Tailwind CSS (assumed present)
- Framework's built-in features

### Template Requirements

**Components must:**
1. Be self-contained (no external dependencies beyond Tailwind)
2. Accept props for customization
3. Use only Tailwind for styling
4. Include all variants (responsive, hover states)
5. Be fully customizable after copying

**Page must:**
1. Import components from `components/biopage/`
2. Read from `biopage.config.json` for data
3. Compose components together
4. Handle the layout and background

**Config provides:**
1. Profile info (name, bio, avatar)
2. Links array with title, description, url, icon
3. Social links
4. Theme settings (colors, background)

---

## User Flow

### First Time Setup

```bash
$ npx biopage init

✔ Detected framework: Nuxt
? Choose a theme:
  ● glass - Frosted glass card with blur effect
  ○ minimal - Clean and simple, no distractions
  ○ bento - Grid layout inspired by bento boxes
  ○ brutalist - Bold borders, raw aesthetic

✔ Selected: glass
✔ Created biopage.config.json
✔ Created components/biopage/GlassCard.vue
✔ Created components/biopage/GlassAvatar.vue
✔ Created components/biopage/GlassLinkItem.vue
✔ Created components/biopage/GlassBackground.vue
✔ Created pages/links.vue

Next steps:
  1. Edit biopage.config.json with your info
  2. Add your avatar to public/avatar.png
  3. Visit http://localhost:3000/links
```

### Switching Themes

```bash
$ npx biopage add bento

⚠ This will remove glass components and add bento components
? Continue? Yes

Removing:
  ✖ components/biopage/GlassCard.vue
  ✖ components/biopage/GlassAvatar.vue
  ✖ components/biopage/GlassLinkItem.vue
  ✖ components/biopage/GlassBackground.vue

Adding:
  ✔ components/biopage/BentoGrid.vue
  ✔ components/biopage/BentoCard.vue
  ✔ components/biopage/BentoProfile.vue
  ✔ components/biopage/BentoLink.vue
  ✔ Updated pages/links.vue

Your config (biopage.config.json) was preserved.
```

### Preview Themes

```bash
$ npx biopage list

Available themes:

  glass (current)
  Frosted glass card with blur effect
  Preview: https://biopage.dev/preview/glass

  minimal
  Clean and simple, no distractions
  Preview: https://biopage.dev/preview/minimal

  bento
  Grid layout inspired by bento boxes
  Preview: https://biopage.dev/preview/bento

  brutalist
  Bold borders, raw aesthetic
  Preview: https://biopage.dev/preview/brutalist
```

### Listing Themes

```bash
$ npx biopage list

Available themes:
  ● glass (current)
  ○ minimal
  ○ brutalist
  ○ gradient
  ○ bento
  ○ notion

Preview at: https://biopage.dev/themes
```

---

## Success Metrics

1. **Adoption** - npm downloads, GitHub stars
2. **Retention** - users who keep the page vs. delete
3. **Contributions** - community-submitted themes
4. **Framework coverage** - supporting major frameworks

---

## Roadmap

### Phase 1: MVP
- [ ] CLI with `init`, `add`, `list` commands
- [ ] Nuxt + Next.js support
- [ ] 2 themes: glass, minimal
- [ ] Basic config structure

### Phase 2: Expansion
- [ ] React, SvelteKit, Astro support
- [ ] 4 more themes
- [ ] Social icons built-in
- [ ] Analytics integration option

### Phase 3: Community
- [ ] Theme submission system
- [ ] Preview website (biopage.dev)
- [ ] Theme customizer UI
- [ ] VS Code extension

### Phase 4: Advanced
- [ ] Animation variants
- [ ] A/B testing support
- [ ] Custom CSS injection
- [ ] Multi-page support (different links pages)

---

## Naming Options

- **biopage** - clear, available
- **linkdrop** - action-oriented
- **onepage** - simple
- **biodrop** - catchy
- **pagelink** - descriptive

Check npm availability before finalizing.

---

## Open Questions

1. Should we support CSS-only (no Tailwind) variants?
2. Include built-in analytics or leave to user?
3. Support for custom themes from URLs?
4. Monorepo or separate packages per framework?

---

## References

- [shadcn/ui](https://ui.shadcn.com) - inspiration for CLI approach
- [Linktree](https://linktr.ee) - market leader, feature reference
- [OpenBio](https://github.com/vanxh/openbio) - open source alternative
- [Tailwind CSS](https://tailwindcss.com) - styling foundation
