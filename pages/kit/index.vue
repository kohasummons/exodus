<script setup lang="ts">
import {
  profile,
  stats,
  modes,
  modeIntros,
  packagesByMode,
  alaCarteByMode,
  addOnsByMode,
  sectionVisibility,
  timelineByMode,
  includedFeatures,
  type ModeId,
} from '~/rate.config'

const route = useRoute()
const router = useRouter()

// Map hash aliases to mode IDs
const hashToMode: Record<string, ModeId> = {
  ugc: 'ugc',
  social: 'social',
  post: 'social',
  posts: 'social',
  strategy: 'strategy',
  coaching: 'strategy',
  coach: 'strategy',
}

const getModeFromHash = (hash: string): ModeId => {
  const clean = hash.replace('#', '').toLowerCase()
  return hashToMode[clean] || 'social'
}

const activeMode = ref<ModeId>(getModeFromHash(route.hash))

// Sync hash → activeMode
watch(() => route.hash, (hash) => {
  if (hash) activeMode.value = getModeFromHash(hash)
})

// Sync activeMode → hash
watch(activeMode, (mode) => {
  router.replace({ hash: `#${mode}` })
})

const currentPackages = computed(() => packagesByMode[activeMode.value])
const currentAlaCarte = computed(() => alaCarteByMode[activeMode.value])
const currentAddOns = computed(() => addOnsByMode[activeMode.value])
const currentIntro = computed(() => modeIntros[activeMode.value])
const currentVisibility = computed(() => sectionVisibility[activeMode.value])
const currentTimeline = computed(() => timelineByMode[activeMode.value])

defineOgImage({
  component: 'Bio',
  props: {
    name: profile.name,
    bio: 'Rate Card & Collaboration',
  },
})

useSeoMeta({
  title: `Rate Card | ${profile.name}`,
  description: 'Collaboration & Partnership Opportunities',
  ogTitle: `Rate Card | ${profile.name}`,
  ogDescription: 'Collaboration & Partnership Opportunities',
  twitterTitle: `Rate Card | ${profile.name}`,
  twitterDescription: 'Collaboration & Partnership Opportunities',
  twitterCard: 'summary_large_image',
  twitterCreator: profile.twitter,
  twitterSite: profile.twitter,
})
</script>

<template>
  <div class="min-h-screen flex justify-center p-6 py-12 font-sans relative max-sm:p-0">
    <!-- Fixed background -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <img
        src="https://framerusercontent.com/images/mtxquOUwbPjOKdEoG496Zv8CEs.jpg"
        alt=""
        class="w-full h-full object-cover"
      />
    </div>

    <div
      class="relative z-10 w-full max-w-[720px] h-fit bg-[rgba(13,13,13,0.9)] backdrop-blur-[50px] rounded-3xl p-12 flex flex-col items-center gap-6 max-sm:max-w-full max-sm:px-5 max-sm:py-10 max-sm:rounded-none overflow-hidden"
    >
      <!-- Floating Tag -->
      <a
        href="https://attentionfactory.io"
        target="_blank"
        rel="noopener noreferrer"
        class="absolute top-4 right-4 bg-white/5 border border-white/10 text-white/40 text-[9px] uppercase tracking-wider font-medium px-2 py-1 rounded-full hover:bg-white/10 hover:text-white/60 hover:border-white/20 transition-all duration-300 no-underline flex items-center gap-1 max-sm:top-3 max-sm:right-3"
      >
        Attention Factory
        <span class="text-[8px]">↗</span>
      </a>

      <!-- Header -->
      <div class="flex flex-col items-center gap-3">
        <img src="~/assets/images/shot.png" :alt="profile.name" class="w-24 h-24 rounded-full object-cover grayscale" />
        <h1 class="text-3xl font-bold text-white m-0 flex items-center gap-2 max-sm:text-2xl">
          {{ profile.name }}
          <img src="~/assets/icons/check.svg" alt="Verified" class="w-6 h-6 shrink-0" />
        </h1>
        <p class="text-white/50 text-sm tracking-widest uppercase">{{ profile.subtitle }}</p>
      </div>

      <!-- Stats Grid -->
      <div class="w-full grid grid-cols-2 gap-3 max-sm:grid-cols-1">
        <div v-for="stat in stats" :key="stat.label" class="bg-white/5 rounded-xl p-4 flex flex-col gap-1">
          <span class="text-white/40 text-xs uppercase tracking-wider">{{ stat.label }}</span>
          <span class="text-white font-semibold text-sm">{{ stat.value }}</span>
        </div>
      </div>

      <!-- Divider -->
      <div class="w-full h-px bg-white/10"></div>

      <!-- Mode Tabs -->
      <div class="w-full flex gap-2">
        <button
          v-for="mode in modes"
          :key="mode.id"
          :class="[
            'flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
            activeMode === mode.id
              ? 'bg-white text-black'
              : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white/80',
          ]"
          @click="activeMode = mode.id"
        >
          {{ mode.label }}
        </button>
      </div>

      <!-- Mode Intro -->
      <p class="text-white/50 text-sm leading-relaxed text-center max-w-lg">
        {{ currentIntro }}
      </p>

      <!-- Divider -->
      <div class="w-full h-px bg-white/10"></div>

      <!-- Packages Section -->
      <div class="w-full flex flex-col gap-4">
        <h2 class="text-white/60 text-xs uppercase tracking-widest font-medium">Collaboration Packages</h2>

        <div class="flex flex-col gap-3">
          <div
            v-for="pkg in currentPackages"
            :key="pkg.name"
            :class="[
              'rounded-xl p-5 flex flex-col gap-3 transition-all duration-300',
              pkg.highlight ? 'bg-gradient-to-br from-white/15 to-white/5 ring-1 ring-white/20' : 'bg-white/5',
            ]"
          >
            <div class="flex items-start justify-between gap-4">
              <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2">
                  <span class="text-white font-semibold">{{ pkg.name }}</span>
                  <span
                    v-if="pkg.highlight"
                    class="text-[10px] uppercase tracking-wider bg-white/20 text-white/80 px-2 py-0.5 rounded-full"
                    >Popular</span
                  >
                </div>
                <span class="text-white/40 text-xs">{{ pkg.best }}</span>
              </div>
              <span class="text-white text-2xl font-bold whitespace-nowrap">{{ pkg.price }}</span>
            </div>
            <ul class="flex flex-col gap-1.5 m-0 p-0 list-none">
              <li v-for="feature in pkg.features" :key="feature" class="text-white/60 text-sm flex items-start gap-2">
                <span class="text-white/30 mt-0.5">✦</span>
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div v-if="currentVisibility.alaCarte || currentVisibility.addOns" class="w-full h-px bg-white/10"></div>

      <!-- A La Carte Section -->
      <div v-if="currentVisibility.alaCarte" class="w-full flex flex-col gap-4">
        <h2 class="text-white/60 text-xs uppercase tracking-widest font-medium">A La Carte</h2>

        <div class="flex flex-col gap-2">
          <div
            v-for="item in currentAlaCarte"
            :key="item.name"
            class="flex items-center justify-between py-2.5 px-4 bg-white/5 rounded-lg"
          >
            <span class="text-white/70 text-sm">{{ item.name }}</span>
            <span class="text-white font-medium text-sm">{{ item.price }}</span>
          </div>
        </div>
      </div>

      <!-- Add-ons Section -->
      <div v-if="currentVisibility.addOns" class="w-full flex flex-col gap-4">
        <h2 class="text-white/60 text-xs uppercase tracking-widest font-medium">Add-Ons</h2>

        <div class="flex flex-wrap gap-2">
          <div
            v-for="addon in currentAddOns"
            :key="addon.name"
            class="flex items-center gap-2 py-2 px-3 bg-white/5 rounded-lg text-sm"
          >
            <span class="text-white/50">{{ addon.name }}</span>
            <span class="text-white/80 font-medium">{{ addon.price }}</span>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div v-if="currentVisibility.included" class="w-full h-px bg-white/10"></div>

      <!-- What's Included -->
      <div v-if="currentVisibility.included" class="w-full flex flex-col gap-3">
        <h2 class="text-white/60 text-xs uppercase tracking-widest font-medium">What's Included (All Packages)</h2>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="item in includedFeatures"
            :key="item"
            class="text-white/50 text-xs py-1.5 px-3 bg-white/5 rounded-full"
          >
            {{ item }}
          </span>
        </div>
      </div>

      <!-- Timeline -->
      <div v-if="currentTimeline" class="w-full grid gap-3" :class="currentTimeline.rush ? 'grid-cols-2' : 'grid-cols-1'">
        <div class="bg-white/5 rounded-xl p-4 flex flex-col gap-1">
          <span class="text-white/40 text-xs uppercase tracking-wider">Standard Delivery</span>
          <span class="text-white font-semibold text-sm">{{ currentTimeline.standard }}</span>
        </div>
        <div v-if="currentTimeline.rush" class="bg-white/5 rounded-xl p-4 flex flex-col gap-1">
          <span class="text-white/40 text-xs uppercase tracking-wider">Rush Delivery</span>
          <span class="text-white font-semibold text-sm">{{ currentTimeline.rush.time }} ({{ currentTimeline.rush.price }})</span>
        </div>
      </div>

      <!-- Divider -->
      <div class="w-full h-px bg-white/10"></div>

      <!-- Contact -->
      <div class="w-full flex flex-col gap-4 items-center">
        <h2 class="text-white/60 text-xs uppercase tracking-widest font-medium">Let's Work Together</h2>

        <div class="flex flex-wrap gap-3 justify-center">
          <a
            :href="`mailto:${profile.email}`"
            class="flex items-center gap-2 py-2.5 px-4 bg-white/10 hover:bg-white/15 rounded-xl text-white/80 text-sm no-underline transition-all duration-300"
          >
            <span>✉</span>
            {{ profile.email }}
          </a>
          <a
            :href="profile.twitterUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 py-2.5 px-4 bg-white/10 hover:bg-white/15 rounded-xl text-white/80 text-sm no-underline transition-all duration-300"
          >
            <img src="~/assets/icons/x_dark.svg" alt="X" class="w-4 h-4 opacity-80" />
            {{ profile.twitter }}
          </a>
          <a
            :href="profile.tiktokUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 py-2.5 px-4 bg-white/10 hover:bg-white/15 rounded-xl text-white/80 text-sm no-underline transition-all duration-300"
          >
            <img src="~/assets/icons/tiktok-icon-dark.svg" alt="TikTok" class="w-4 h-4 opacity-80" />
            {{ profile.tiktok }}
          </a>
          <a
            :href="profile.instagramUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 py-2.5 px-4 bg-white/10 hover:bg-white/15 rounded-xl text-white/80 text-sm no-underline transition-all duration-300"
          >
          <img src="~/assets/icons/instagram.svg" alt="Instagram" class="w-4 h-4 opacity-80" />
            {{ profile.instagram }}
          </a>
          <a
            :href="profile.linkedinUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 py-2.5 px-4 bg-white/10 hover:bg-white/15 rounded-xl text-white/80 text-sm no-underline transition-all duration-300"
          >
            <img src="~/assets/icons/linkedin.svg" alt="LinkedIn" class="w-4 h-4 opacity-80" />
            {{ profile.linkedin }}
          </a>
        </div>

        <p class="text-white/30 text-xs text-center">Rates effective January 2026. All prices in USD.</p>
      </div>

      <!-- Home link -->
      <NuxtLink
        to="/links"
        class="text-white/30 text-sm hover:text-white/60 transition-colors mt-2 focus-visible:outline-none focus-visible:text-white/60 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm"
      >
        <span class="text-white/30">✦</span> Back to Links <span class="text-white/30">✦</span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
