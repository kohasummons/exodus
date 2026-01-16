/**
 * Rate Card Configuration
 *
 * QUICK ADJUSTMENT:
 * - Set `multiplierByMode` to increase rates per mode (e.g., 1.2 = 20% increase)
 * - Override individual items with `customPrice` to set exact amounts
 */

export type ModeId = 'ugc' | 'social' | 'strategy'

// Per-mode multipliers (1.0 = no change, 1.5 = 50% increase, 2.0 = double)
export const multiplierByMode: Record<ModeId, number> = {
  social: 0.5,
  ugc: 1.0,
  strategy: 1.0,
}

// Helper to apply multiplier and round to nearest 50
const applyRate = (base: number, mode: ModeId, custom?: number) => {
  if (custom !== undefined) return custom
  return Math.round((base * multiplierByMode[mode]) / 50) * 50
}

const formatPrice = (amount: number, suffix?: string) => {
  return `$${amount.toLocaleString()}${suffix || ''}`
}

// ============================================
// PROFILE & STATS
// ============================================
export const profile = {
  name: 'Joshua Omobola',
  subtitle: 'Software Engineer & AI Educator',
  avatar: '~/assets/images/shot.png',
  email: 'collab@koha.wtf',
  twitter: '@kohawithstuff',
  twitterUrl: 'https://x.com/kohawithstuff',
  tiktok: '@kohawithstuff',
  tiktokUrl: 'https://tiktok.com/@kohawithstuff',
  instagram: '@kohawithstuff',
  instagramUrl: 'https://instagram.com/kohawithstuff',
  linkedin: 'Joshua Omobola',
  linkedinUrl: 'https://linkedin.com/in/kohasummons',
}

export const stats = [
  { label: 'Niche', value: 'AI Tools · Dev Tooling · SaaS' },
  { label: 'Content', value: 'Short-Form & Long-Form Video' },
  { label: 'Platforms', value: 'YouTube, TikTok, Instagram, X' },
  { label: 'Focus', value: 'Education → Conversion → Launches' },
]

// ============================================
// MODES (TABS)
// ============================================
export const modes: { id: ModeId; label: string }[] = [
  { id: 'social', label: 'Posts on My Socials' },
  { id: 'ugc', label: 'UGC' },
  { id: 'strategy', label: '1:1 AI Coaching' },
]

// ============================================
// TAB INTRO COPY
// ============================================
export const modeIntros: Record<ModeId, string> = {
  ugc: "Short-form and long-form videos filmed by me, delivered for your brand. Explainers, tutorials, walkthroughs, and ad-style UGC.",
  social:
    'Leverage my audience. I create content about your product on my own profiles — stories, feed posts, or multi-platform campaigns.',
  strategy:
    "Learn AI hands-on with me. 1:1 calls where I walk you through tools, workflows, and techniques—tailored to what you're building or what you want to learn.",
}

// ============================================
// COLLABORATION PACKAGES BY MODE
// ============================================
const packagesConfigByMode: Record<
  ModeId,
  {
    name: string
    basePrice: number
    customPrice?: number
    priceSuffix?: string
    priceOverride?: string // Use this to show custom text instead of price
    best: string
    features: string[]
    highlight: boolean
  }[]
> = {
  ugc: [
    {
      name: 'Daily Retainer Pack',
      basePrice: 4000,
      priceSuffix: ' / month',
      highlight: true,
      best: 'daily short-form content',
      features: [
        '30 vertical videos per month (1/day)',
        'On-camera explainers, tutorials, ad-style UGC',
        'Organic usage on your brand-owned accounts',
        'Up to 2 revisions per video',
        'Async comms via Slack or email',
      ],
    },
    {
      name: 'Launch Pack',
      basePrice: 3000,
      priceSuffix: ' / month',
      highlight: false,
      best: 'Product launches & sustained campaigns',
      features: [
        '20 vertical videos per month',
        'Hook variants for A/B testing (2 per video)',
        'Organic usage rights included',
        '1 revision per video',
      ],
    },
    {
      name: 'Lite Pack',
      basePrice: 1800,
      priceSuffix: ' / month',
      highlight: false,
      best: 'Brands testing UGC before scaling',
      features: [
        '12 vertical videos per month',
        'Organic usage rights included',
        '1 revision per video',
      ],
    },
    {
      name: 'Custom',
      basePrice: 0,
      priceOverride: "Let's Talk",
      highlight: false,
      best: 'Unique needs or larger volumes',
      features: [
        'Custom video count & cadence',
        'Long-form, ads, or hybrid formats',
        'Exclusivity & extended usage options',
        'Dedicated Slack channel',
      ],
    },
  ],
  social: [
    {
      name: 'Premium Package',
      basePrice: 2500,
      highlight: true,
      best: 'Maximum reach & extended campaigns',
      features: [
        '1 × Professional Video (YouTube + Shorts/Reels)',
        'Cross-post to TikTok & X',
        '3 × Story slides (24-hour feature)',
        '30-day link in bio',
        'Collaboration post feature',
        'Performance report (7 days)',
      ],
    },
    {
      name: 'Professional Package',
      basePrice: 1800,
      highlight: false,
      best: 'Focused video campaign',
      features: [
        '1 × Professional Video (YouTube Short or Reel)',
        '2 × Story slides (24-hour feature)',
        '14-day link in bio',
        'Collaboration post feature',
        'Basic performance report',
      ],
    },
    {
      name: 'Standard Package',
      basePrice: 1200,
      highlight: false,
      best: 'Budget-conscious brands',
      features: [
        '1 × Video (TikTok OR YouTube Short)',
        '7-day link in bio',
        'Collaboration post (optional)',
      ],
    },
  ],
  strategy: [
    {
      name: '1:1 AI Deep Dive',
      basePrice: 250,
      highlight: true,
      best: 'Learn specific AI tools or workflows',
      features: [
        '60-min live call (recorded)',
        'Screen-share walkthrough of your use case',
        'Hands-on setup help if needed',
        'Resource list + notes after session',
        '1 week async follow-up via DM',
      ],
    },
    {
      name: 'AI Crash Course (4 Sessions)',
      basePrice: 800,
      highlight: false,
      best: 'Go from zero to competent in AI tools',
      features: [
        '4 × 60-min sessions over 2–4 weeks',
        'Custom curriculum based on your goals',
        'Homework + practice between sessions',
        'All recordings + notes',
        'Ongoing async support during the course',
      ],
    },
    {
      name: 'Monthly AI Office Hours',
      basePrice: 400,
      priceSuffix: ' / month',
      highlight: false,
      best: 'Ongoing access for quick questions',
      features: [
        '2 × 30-min calls per month',
        'Priority async support via DM',
        'Early access to my tool recommendations',
        'Cancel anytime',
      ],
    },
  ],
}

// ============================================
// A LA CARTE BY MODE
// ============================================
const alaCarteConfigByMode: Record<ModeId, { name: string; basePrice: number; customPrice?: number }[]> = {
  ugc: [
    { name: 'Extra 60s Video', basePrice: 150 },
    { name: 'Extra Hook Variant', basePrice: 50 },
    { name: 'Extra Revision Round', basePrice: 75 },
    { name: 'Vertical → Horizontal Re-edit', basePrice: 100 },
  ],
  social: [
    { name: 'YouTube Video (standalone)', basePrice: 800 },
    { name: 'TikTok/Short (standalone)', basePrice: 600 },
    { name: 'Story Feature (3–5 slides)', basePrice: 400 },
    { name: 'Link in Bio (7 days)', basePrice: 300 },
    { name: 'Link in Bio (14 days)', basePrice: 500 },
    { name: 'Link in Bio (30 days)', basePrice: 800 },
  ],
  strategy: [
    { name: 'Extra 30-min Call', basePrice: 100 },
    { name: 'Screen Recording Walkthrough', basePrice: 75 },
    { name: 'Custom Prompt Library', basePrice: 150 },
  ],
}

// ============================================
// ADD-ONS BY MODE
// ============================================
const addOnsConfigByMode: Record<ModeId, { name: string; price: string }[]> = {
  ugc: [
    { name: 'Paid Ads Usage (per video, 3 months)', price: '+25–50%' },
    { name: 'Whitelisting from My Handle', price: 'Custom' },
    { name: 'Scriptwriting & Concepts', price: '+$100/video' },
    { name: 'Rush Delivery (24h)', price: '+$150/video' },
  ],
  social: [
    { name: 'Usage Rights (30 days)', price: '+$300' },
    { name: 'Usage Rights (90 days)', price: '+$800' },
    { name: 'Exclusivity (30 days)', price: '+$500' },
    { name: 'Additional Platform Cross-post', price: '+$400–600' },
    { name: 'Rush Delivery (48–72 hrs)', price: '+$500' },
  ],
  strategy: [
    { name: 'Priority Scheduling', price: '+$50' },
    { name: 'Extended Async Support (+2 weeks)', price: '+$75' },
    { name: 'Session Transcript + Summary', price: '+$25' },
  ],
}

// ============================================
// INCLUDED FEATURES (applies to all modes)
// ============================================
export const includedFeatures = [
  'Clear scope & written agreement',
  'Content tailored to your product & ICP',
  'Basic performance tracking',
  'Async feedback via email/DM',
  'FTC-compliant disclosures',
]

// ============================================
// SECTION VISIBILITY PER MODE
// ============================================
export const sectionVisibility: Record<ModeId, { alaCarte: boolean; addOns: boolean; included: boolean }> = {
  ugc: { alaCarte: false, addOns: false, included: false },
  social: { alaCarte: true, addOns: true, included: true },
  strategy: { alaCarte: true, addOns: true, included: false },
}

// ============================================
// TIMELINE BY MODE
// ============================================
export const timelineByMode: Record<
  ModeId,
  { standard: string; rush?: { time: string; price: string } } | null
> = {
  ugc: {
    standard: 'Ideally 1 video per day',
    // rush: { time: '24 hours', price: '+$150/video' }, // uncomment to show rush
  },
  social: {
    standard: '5–7 business days',
    rush: { time: '48–72 hours', price: '+$500' },
  },
  strategy: null, // no timeline for coaching
}

// ============================================
// EXPORTS WITH CALCULATED PRICES
// ============================================
export const packagesByMode = Object.fromEntries(
  Object.entries(packagesConfigByMode).map(([mode, pkgs]) => [
    mode,
    pkgs.map((pkg) => ({
      ...pkg,
      price: pkg.priceOverride ?? formatPrice(applyRate(pkg.basePrice, mode as ModeId, pkg.customPrice), pkg.priceSuffix),
    })),
  ])
) as Record<ModeId, ((typeof packagesConfigByMode)[ModeId][number] & { price: string })[]>

export const alaCarteByMode = Object.fromEntries(
  Object.entries(alaCarteConfigByMode).map(([mode, items]) => [
    mode,
    items.map((item) => ({
      name: item.name,
      price: formatPrice(applyRate(item.basePrice, mode as ModeId, item.customPrice)),
    })),
  ])
) as unknown as Record<ModeId, { name: string; price: string }[]>

export const addOnsByMode = addOnsConfigByMode

// Legacy exports for backwards compatibility (defaults to ugc mode)
export const packages = packagesByMode.ugc
export const alaCarte = alaCarteByMode.ugc
export const addOns = addOnsByMode.ugc
