<script setup lang="ts">
const profile = {
  name: 'Joshua Omobola',
  alias: 'Koha',
  role: 'DevRel Engineer & AI Educator',
  shortBio:
    'Joshua Omobola (Koha) is a DevRel Engineer and AI Educator helping developers, creators, and founders ship faster and tell better product stories.',
  mediumBio:
    'Joshua Omobola is an AI Educator, Developer Advocate, and founder of Attention Factory, helping brands and businesses integrate AI into their workflows. His background spans developer relations, product design, and community building across Web3Afrika, Mode Network, and DeepLearning.AI. He focuses on making AI and developer tools practical and accessible so teams can ship faster and tell better product stories.',
  longBio:
    'Joshua Omobola is an AI Educator, Developer Advocate, and Co-founder of Attention Factory, an AI education and consulting company helping brands and businesses integrate AI into their workflows. His work sits at the intersection of engineering and education, with a focus on making AI and developer tools practical and accessible. With a background spanning developer relations, product design, and community building, Joshua has worked across Web3Afrika and Mode Network, and is a DeepLearning.AI Ambassador. He is also the founder of TheDeverelCamp, a community focused on devrel professionals. Over the years, Joshua has built a reputation for helping developers ship faster and tell better product stories through events, educational content, and hands-on product support.',
  focusAreas: ['Developer Experience', 'AI Education', 'Product Storytelling'],
  formats: ['Keynotes', 'Workshops', 'Panels', 'Fireside Chats'],
  audience: ['Developers', 'Creators', 'Founders', 'Students', 'Community Builders'],
  topics: [
    'Practical AI workflows for developers and creators',
    'How to teach technical ideas without dumbing them down',
    'Developer advocacy that actually drives product growth',
    'From demo to adoption: better product storytelling',
  ],
  links: {
    pressKit: 'https://koha.wtf/links',
    website: 'https://koha.wtf',
    x: 'https://x.com/kohawithstuff',
    github: 'https://github.com/kohasummons',
    linkedin: 'https://linkedin.com/in/kohasummons',
    instagram: 'https://instagram.com/kohawithstuff',
    youtube: 'https://youtube.com/@kohawithstuff',
    email: 'mailto:collab@koha.wtf',
  },
}

const bioModes = ['short', 'medium', 'long'] as const
type BioMode = (typeof bioModes)[number]
const activeBioMode = ref<BioMode>('medium')

const activeBio = computed(() => {
  if (activeBioMode.value === 'short') return profile.shortBio
  if (activeBioMode.value === 'medium') return profile.mediumBio
  return profile.longBio
})

const feesCompensation = [
  'I require an honorarium for all speaking engagements. Fees vary depending on event type, audience size, format, and preparation required.',
  'Keynote / Talk (30-60 mins): Fee negotiable based on event scope.',
  'Workshop / Hands-on Session (1-3 hours): Fee negotiable based on event scope.',
  'Panel Participation: Fee negotiable based on event scope.',
  'Moderation / Hosting: Fee negotiable based on event scope.',
  "I'm open to adjusting fees for community-driven events, nonprofits, and events with a strong diversity and inclusion focus.",
]

const paymentTerms = [
  '50% deposit required before the event date to confirm the engagement.',
  'Remaining 50% due within 7 days after the event.',
  'Payment via transfer or any agreed-upon method.',
  "Feel free to open conversations about this, I'm flexible.",
]

const travelAccommodation = [
  'For events outside Lagos, Nigeria: round-trip economy (or above) flight booked and paid for by the organizer.',
  'Hotel accommodation for the event duration, plus one night before and one night after when travel is required.',
  'Airport transfers and local transportation to and from the venue.',
  'Per diem for meals and incidentals when meals are not provided at the event.',
  "Visa support: official invitation letter and required visa documents; visa fees covered by organizer.",
  'For virtual events, no travel arrangements are needed, but the honorarium still applies.',
]

const technicalRequirements = [
  'Working microphone (lapel/lavalier preferred).',
  'Projector or screen that supports 16:9 format.',
  'A clicker.',
  'HDMI connection or adapter compatibility for my laptop.',
  'Confidence monitor or timer visible from stage.',
  'Stable internet connection if live demos are involved.',
  'Access to the room at least 30 minutes before session for setup and sound check.',
]

const contentRecordingRights = [
  'I retain full ownership of my slides, materials, and any original content I create for the engagement.',
  'If the event will be recorded, I need to be informed in advance and approve the recording.',
  "I grant organizers the right to use event recordings for promotional purposes, provided I'm credited and notified.",
  'I reserve the right to share my own recordings or clips from the session on my platforms.',
]

const promotionVisibility = [
  "Please include me in event marketing materials (website, social media, email campaigns) using my approved bio and headshot.",
  'Please share promotional assets or hashtags in advance so I can amplify on my end.',
  'If a partnership or sponsorship component involves Attention Factory, this should be discussed and agreed upon separately.',
]

const cancellationPolicy = [
  'If the event is cancelled by the organizer, any deposits paid are non-refundable. Travel costs already incurred will be reimbursed.',
  'If I need to cancel due to an emergency, I will provide as much notice as possible and work with the organizer to find a replacement or reschedule.',
  'Cancellations by either party should be communicated at least 14 days before the event date.',
]

defineOgImage({
  component: 'Bio',
  props: {
    name: profile.name,
    bio: 'Speaker Rider + Press Kit',
  },
})

useSeoMeta({
  title: `${profile.name} | Speaker Rider + Press Kit`,
  description:
    'Speaker rider and press kit for Joshua Omobola (Koha): bio, topics, audience fit, and event requirements.',
  ogTitle: `${profile.name} | Speaker Rider + Press Kit`,
  ogDescription:
    'Speaker rider and press kit for Joshua Omobola (Koha): bio, topics, audience fit, and event requirements.',
  twitterTitle: `${profile.name} | Speaker Rider + Press Kit`,
  twitterDescription:
    'Speaker rider and press kit for Joshua Omobola (Koha): bio, topics, audience fit, and event requirements.',
  twitterCard: 'summary_large_image',
  twitterCreator: '@kohawithstuff',
  twitterSite: '@kohawithstuff',
})
</script>

<template>
  <div class="min-h-screen flex justify-center p-6 py-10 font-sans relative max-sm:p-0">
    <div class="fixed inset-0 z-0 pointer-events-none">
      <img
        src="https://framerusercontent.com/images/mtxquOUwbPjOKdEoG496Zv8CEs.jpg"
        alt=""
        class="w-full h-full object-cover"
      />
    </div>

    <main
      class="relative z-10 w-full max-w-[860px] bg-[rgba(13,13,13,0.9)] backdrop-blur-[40px] rounded-3xl p-10 max-sm:max-w-full max-sm:px-5 max-sm:py-8 max-sm:rounded-none text-white"
    >
      <header class="flex flex-col gap-4">
        <p class="text-[11px] uppercase tracking-[0.2em] text-white/50">Speaker Rider + Press Kit</p>
        <a
          href="https://standing-swallow-78c.notion.site/Joshua-Speaker-Rider-324ab15ddf728063b85ccd34f606b6b4"
          target="_blank"
          rel="noopener noreferrer"
          class="text-4xl leading-tight font-bold max-sm:text-3xl text-white no-underline hover:text-white/85 transition"
        >
          {{ profile.name }}
        </a>
        <p class="text-white/80">{{ profile.alias }} · {{ profile.role }}</p>
        <p class="text-white/70 leading-relaxed max-w-[75ch]">{{ profile.shortBio }}</p>
      </header>

      <div class="w-full h-px bg-white/10 my-7"></div>

      <section class="grid md:grid-cols-3 gap-4">
        <article class="md:col-span-2 bg-white/5 rounded-2xl p-5">
          <h2 class="text-xs uppercase tracking-widest text-white/60 mb-3">Official Bio</h2>
          <div class="flex flex-wrap gap-2 mb-4">
            <button
              v-for="mode in bioModes"
              :key="mode"
              type="button"
              :class="activeBioMode === mode ? 'chip-active' : 'chip-button'"
              @click="activeBioMode = mode"
            >
              {{ mode }}
            </button>
          </div>
          <p class="text-sm leading-relaxed text-white/75">{{ activeBio }}</p>
        </article>

        <article class="bg-white/5 rounded-2xl p-5">
          <h2 class="text-xs uppercase tracking-widest text-white/60 mb-3">Focus</h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="item in profile.focusAreas"
              :key="item"
              class="text-xs text-white/80 py-1.5 px-3 bg-white/10 rounded-full"
            >
              {{ item }}
            </span>
          </div>
        </article>
      </section>

      <section class="grid md:grid-cols-2 gap-4 mt-4">
        <article class="bg-white/5 rounded-2xl p-5">
          <h2 class="text-xs uppercase tracking-widest text-white/60 mb-3">Speaking Topics</h2>
          <div class="w-full h-[300px] rounded-xl overflow-hidden border border-white/10 bg-white/5">
            <img
              src="~/assets/images/headshot.png"
              alt="Joshua Omobola speaking topics visual"
              class="w-full h-full object-cover object-top"
            />
          </div>
          <a
            href="/images/headshot.png"
            download="joshua-omobola-headshot.png"
            class="inline-flex items-center gap-2 mt-3 text-xs uppercase tracking-wider px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white/85 no-underline transition"
          >
            Download Image
          </a>
        </article>

        <article class="bg-white/5 rounded-2xl p-5">
          <h2 class="text-xs uppercase tracking-widest text-white/60 mb-3">Formats + Audience</h2>
          <p class="text-[11px] uppercase tracking-wider text-white/45 mb-2">Formats</p>
          <div class="flex flex-wrap gap-2 mb-4">
            <span v-for="format in profile.formats" :key="format" class="chip">{{ format }}</span>
          </div>
          <p class="text-[11px] uppercase tracking-wider text-white/45 mb-2">Best Fit Audience</p>
          <div class="flex flex-wrap gap-2">
            <span v-for="segment in profile.audience" :key="segment" class="chip">{{ segment }}</span>
          </div>
        </article>
      </section>

      <div class="w-full h-px bg-white/10 my-7"></div>

      <section class="grid md:grid-cols-2 gap-4">
        <article class="bg-white/5 rounded-2xl p-5">
          <h2 class="text-xs uppercase tracking-widest text-white/60 mb-3">Fees & Compensation</h2>
          <ul class="space-y-2">
            <li v-for="item in feesCompensation" :key="item" class="text-sm text-white/75 flex items-start gap-2">
              <span class="text-white/35">-</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>

        <article class="bg-white/5 rounded-2xl p-5">
          <h2 class="text-xs uppercase tracking-widest text-white/60 mb-3">Payment Terms</h2>
          <ul class="space-y-2">
            <li v-for="item in paymentTerms" :key="item" class="text-sm text-white/75 flex items-start gap-2">
              <span class="text-white/35">-</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>

        <article class="bg-white/5 rounded-2xl p-5">
          <h2 class="text-xs uppercase tracking-widest text-white/60 mb-3">Travel & Accommodation</h2>
          <ul class="space-y-2">
            <li v-for="item in travelAccommodation" :key="item" class="text-sm text-white/75 flex items-start gap-2">
              <span class="text-white/35">-</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>

        <article class="bg-white/5 rounded-2xl p-5">
          <h2 class="text-xs uppercase tracking-widest text-white/60 mb-3">Technical Requirements</h2>
          <ul class="space-y-2">
            <li v-for="item in technicalRequirements" :key="item" class="text-sm text-white/75 flex items-start gap-2">
              <span class="text-white/35">-</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>

        <article class="bg-white/5 rounded-2xl p-5">
          <h2 class="text-xs uppercase tracking-widest text-white/60 mb-3">Content & Recording Rights</h2>
          <ul class="space-y-2">
            <li v-for="item in contentRecordingRights" :key="item" class="text-sm text-white/75 flex items-start gap-2">
              <span class="text-white/35">-</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>

        <article class="bg-white/5 rounded-2xl p-5">
          <h2 class="text-xs uppercase tracking-widest text-white/60 mb-3">Promotion & Visibility</h2>
          <ul class="space-y-2">
            <li v-for="item in promotionVisibility" :key="item" class="text-sm text-white/75 flex items-start gap-2">
              <span class="text-white/35">-</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>

        <article class="bg-white/5 rounded-2xl p-5">
          <h2 class="text-xs uppercase tracking-widest text-white/60 mb-3">Diversity & Inclusion</h2>
          <p class="text-sm text-white/75 leading-relaxed">
            I care about who I share a stage with. I expect the event to make genuine efforts toward a diverse and
            inclusive lineup of speakers. I may decline engagements where the lineup does not reflect this.
          </p>
        </article>

        <article class="bg-white/5 rounded-2xl p-5">
          <h2 class="text-xs uppercase tracking-widest text-white/60 mb-3">Cancellation Policy</h2>
          <ul class="space-y-2">
            <li v-for="item in cancellationPolicy" :key="item" class="text-sm text-white/75 flex items-start gap-2">
              <span class="text-white/35">-</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </article>
      </section>

      <div class="w-full h-px bg-white/10 my-7"></div>

      <section class="grid md:grid-cols-2 gap-4">
        <article class="bg-white/5 rounded-2xl p-5">
          <h2 class="text-xs uppercase tracking-widest text-white/60 mb-3">Press + Assets</h2>
          <p class="text-sm text-white/75 leading-relaxed mb-3">
            If these terms work for you, I'd love to move forward. Reach out and let's make it happen.
          </p>
          <a
            :href="profile.links.pressKit"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white/85 no-underline transition"
          >
            Open Koha Links
            <span>-></span>
          </a>
        </article>

        <article class="bg-white/5 rounded-2xl p-5">
          <h2 class="text-xs uppercase tracking-widest text-white/60 mb-3">Booking Contact</h2>
          <div class="flex flex-wrap gap-2 mb-3">
            <a href="mailto:omobolathejoshua@gmail.com" class="chip-link">Primary Email</a>
            <a :href="profile.links.email" class="chip-link">Collab Email</a>
            <a :href="profile.links.x" target="_blank" rel="noopener noreferrer" class="chip-link">X</a>
            <a :href="profile.links.linkedin" target="_blank" rel="noopener noreferrer" class="chip-link">LinkedIn</a>
            <a :href="profile.links.github" target="_blank" rel="noopener noreferrer" class="chip-link">GitHub</a>
            <a :href="profile.links.instagram" target="_blank" rel="noopener noreferrer" class="chip-link">Instagram</a>
            <a :href="profile.links.youtube" target="_blank" rel="noopener noreferrer" class="chip-link">YouTube</a>
          </div>
          <p class="text-sm text-white/70">
            Website: koha.wtf · Company: Attention Factory
          </p>
        </article>
      </section>

      <footer class="mt-8 pt-4 border-t border-white/10 flex items-center justify-between max-sm:flex-col max-sm:items-start gap-2">
        <NuxtLink to="/links" class="text-sm text-white/45 hover:text-white/70 no-underline transition">
          - Back to Links
        </NuxtLink>
        <p class="text-[11px] text-white/35">Updated March 2026</p>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.chip {
  font-size: 0.75rem;
  color: rgb(255 255 255 / 0.8);
  padding: 0.375rem 0.75rem;
  background: rgb(255 255 255 / 0.1);
  border-radius: 9999px;
}

.chip-link {
  font-size: 0.75rem;
  color: rgb(255 255 255 / 0.9);
  padding: 0.375rem 0.75rem;
  background: rgb(255 255 255 / 0.1);
  border-radius: 0.5rem;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.chip-link:hover {
  background: rgb(255 255 255 / 0.16);
}

.chip-button {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: rgb(255 255 255 / 0.75);
  padding: 0.35rem 0.7rem;
  background: rgb(255 255 255 / 0.08);
  border: 1px solid rgb(255 255 255 / 0.14);
  border-radius: 9999px;
  transition: all 0.2s ease;
}

.chip-button:hover {
  color: rgb(255 255 255 / 0.9);
  background: rgb(255 255 255 / 0.12);
}

.chip-active {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #111827;
  padding: 0.35rem 0.7rem;
  background: rgb(255 255 255 / 0.95);
  border: 1px solid rgb(255 255 255 / 0.95);
  border-radius: 9999px;
}
</style>
