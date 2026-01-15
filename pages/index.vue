<script setup lang="ts">
import JSConfetti from 'js-confetti'
import uselessWebsites from '~/assets/useless-websites.json'

defineOgImage({
  component: 'Default',
  props: {
    name: 'Joshua Omobola',
    bio: 'DevRel Engineer & AI Educator',
  },
})

useSeoMeta({
  title: 'Joshua Omobola',
  ogTitle: 'Joshua Omobola',
  description: 'DevRel Engineer & AI Educator',
  ogDescription: 'DevRel Engineer & AI Educator',
  twitterTitle: 'Joshua Omobola',
  twitterDescription: 'DevRel Engineer & AI Educator',
  twitterCard: 'summary_large_image',
})

const isLoading = ref(false)
const jsConfetti = ref<JSConfetti | null>(null)
const isMobile = ref(false)

onMounted(() => {
  jsConfetti.value = new JSConfetti()
  isMobile.value = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
})
const STORAGE_KEY = 'visited-useless-sites'

function getVisitedSites(): string[] {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

function markAsVisited(url: string) {
  const visited = getVisitedSites()
  if (!visited.includes(url)) {
    visited.push(url)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visited))
  }
}

function getRandomUselessSite() {
  const sites = uselessWebsites.uselessWebsites
  const visited = getVisitedSites()
  
  // Prefer unvisited sites
  const unvisited = sites.filter(s => !visited.includes(s.url))
  const pool = unvisited.length > 0 ? unvisited : sites
  
  return pool[Math.floor(Math.random() * pool.length)]
}

async function goToRandomSite() {
  isLoading.value = true
  
  // Sprinkle confetti on click
  jsConfetti.value?.addConfetti({
    emojis: ['🫵🏼', '🎉', '🎊', '🌈', '⭐',],
    emojiSize: 40,
    confettiNumber: 30,
    confettiColors: ['#ffffff'],
  })
  
  // Skip delay on mobile (popup blockers don't like async before window.open)
  if (!isMobile.value) {
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700))
  }
  
  const site = getRandomUselessSite()
  markAsVisited(site.url)
  
  // Mobile: navigate current tab. Desktop: new tab
  if (isMobile.value) {
    window.location.href = site.url
  } else {
    window.open(site.url, '_blank')
  }
  
  isLoading.value = false
}
</script>

<style scoped>
.icon-wrapper {
  position: relative;
  width: 1rem;
  height: 1rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-default,
.icon-hover {
  position: absolute;
  transition: transform 0.3s ease;
}

.icon-default {
  transform: translateX(0);
}

.icon-hover {
  transform: translateY(-100%);
}

.developer-pill:hover .icon-default {
  transform: translateY(100%);
}

.developer-pill:hover .icon-hover {
  transform: translateY(0);
}

.btn-useless {
  background-color: #8b5cf6;
  background-image: 
    linear-gradient(
      167deg, 
      rgba(255, 255, 255, 0.1) 50%, 
      rgba(0, 0, 0, 0) 55%
    ),
    linear-gradient(
      to bottom, 
      rgba(255, 255, 255, 0.15), 
      rgba(0, 0, 0, 0)
    );
  border-radius: 6px;
  box-shadow:
    0 0 0 1px #7c3aed inset,
    0 0 0 2px rgba(255, 255, 255, 0.15) inset,
    0 8px 0 0 #5b21b6,
    0 8px 0 1px rgba(0, 0, 0, 0.4),
    0 8px 8px 1px rgba(0, 0, 0, 0.5);
  color: #FFF;
  display: inline-block;
  font-family: "Lucida Grande", Arial, sans-serif;
  font-size: 22px;
  font-weight: bold;
  height: 61px;
  letter-spacing: -1px;
  line-height: 61px;
  margin: 30px 0 10px;
  position: relative;
  text-align: center;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  text-decoration: none !important;
  top: 0;
  width: 186px;
  transition: all 0.15s ease;
  cursor: pointer;
  border: none;
}

.btn-useless:hover:not(:disabled) {
  background-color: #7c3aed;
  box-shadow: 
    0 0 0 1px #7c3aed inset,
    0 0 0 2px rgba(255, 255, 255, 0.15) inset,
    0 10px 0 0 #4c1d95,
    0 10px 0 1px rgba(0, 0, 0, 0.4),
    0 10px 8px 1px rgba(0, 0, 0, 0.6);
  top: -2px;
}

.btn-useless:active:not(:disabled) {
  box-shadow: 
    0 0 0 1px #5b21b6 inset,
    0 0 0 2px rgba(255, 255, 255, 0.15) inset,
    0 0 0 1px rgba(0, 0, 0, 0.4);
  transform: translateY(10px);
}

.btn-useless:disabled {
  cursor: wait;
  opacity: 0.8;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
  vertical-align: middle;
}

.btn-container {
  position: relative;
  display: inline-block;
}

.btn-useless {
  position: relative;
  z-index: 2;
}

.slide-up-text {
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%) translateY(-100%);
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
  transition: transform 0.3s ease;
  pointer-events: none;
  z-index: 1;
}

.btn-container:hover .slide-up-text {
  transform: translateX(-50%) translateY(8px);
}
</style>
<template>
  <div class="min-h-screen bg-[#131313] text-white">
    <main class="mx-auto max-w-2xl px-6 py-16 lg:py-24">
      <h1 class="text-[32px] font-semibold leading-tight tracking-tight">
        Joshua Omobola*
      </h1>

      <section class="mt-8 space-y-6 text-lg leading-[1.7]">
        <p>
          I'm a <a href="https://github.com/kohasummons" class="underline decoration-white/40 underline-offset-2 hover:decoration-white">DevRel Engineer</a> and builder. 
        </p>
        
        <p>
        I help <span class="developer-pill group inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-base cursor-pointer"><span class="icon-wrapper"><span class="icon-default">✦</span><span class="icon-hover">🫵🏼</span></span><span>developers</span></span> ship faster and tell better product stories. Over the years I've worked across developer experience, content, and community.
        </p>
        <p>
          My work sits between engineering and education. I believe great developer tools deserve great developer experiences.
        </p>
        <!-- <div class="flex flex-wrap gap-2 pt-2">
          <a href="https://github.com/kohasummons" target="_blank" class="social-pill group inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-base no-underline hover:bg-white/15">
            <svg class="w-4 h-4" viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)"/></svg>
            <span>GitHub</span>
          </a>
          <a href="https://youtube.com/@kohasummons" target="_blank" class="social-pill group inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-base no-underline hover:bg-white/15">
            <svg class="w-4 h-4" viewBox="0 0 256 180" xmlns="http://www.w3.org/2000/svg"><path fill="red" d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134Z"/><path fill="#FFF" d="m102.421 128.06 66.328-38.418-66.328-38.418z"/></svg>
            <span>YouTube</span>
          </a>
          <a href="https://linkedin.com/in/kohasummons" target="_blank" class="social-pill group inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-base no-underline hover:bg-white/15">
            <svg class="w-4 h-4" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" fill="#0A66C2"/></svg>
            <span>LinkedIn</span>
          </a>
          <a href="https://instagram.com/kohasummons" target="_blank" class="social-pill group inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-base no-underline hover:bg-white/15">
            <svg class="w-4 h-4" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="ig-a" cx="50%" cy="100%" r="100%" fx="50%" fy="100%"><stop offset="0%" stop-color="#FFDD55"/><stop offset="10%" stop-color="#FFDD55"/><stop offset="50%" stop-color="#FF543E"/><stop offset="100%" stop-color="#C837AB"/></radialGradient><radialGradient id="ig-b" cx="0%" cy="0%" r="100%" fx="0%" fy="0%"><stop offset="0%" stop-color="#4168C9"/><stop offset="100%" stop-color="#4168C9" stop-opacity="0"/></radialGradient></defs><rect width="256" height="256" fill="url(#ig-a)" rx="55"/><rect width="256" height="256" fill="url(#ig-b)" rx="55"/><path fill="#fff" d="M128 45c-22.6 0-25.4.1-34.3.5-8.9.4-15 1.8-20.3 3.9-5.5 2.1-10.2 5-14.8 9.6-4.6 4.6-7.5 9.3-9.6 14.8-2.1 5.3-3.5 11.4-3.9 20.3-.4 8.9-.5 11.7-.5 34.3s.1 25.4.5 34.3c.4 8.9 1.8 15 3.9 20.3 2.1 5.5 5 10.2 9.6 14.8 4.6 4.6 9.3 7.5 14.8 9.6 5.3 2.1 11.4 3.5 20.3 3.9 8.9.4 11.7.5 34.3.5s25.4-.1 34.3-.5c8.9-.4 15-1.8 20.3-3.9 5.5-2.1 10.2-5 14.8-9.6 4.6-4.6 7.5-9.3 9.6-14.8 2.1-5.3 3.5-11.4 3.9-20.3.4-8.9.5-11.7.5-34.3s-.1-25.4-.5-34.3c-.4-8.9-1.8-15-3.9-20.3-2.1-5.5-5-10.2-9.6-14.8-4.6-4.6-9.3-7.5-14.8-9.6-5.3-2.1-11.4-3.5-20.3-3.9-8.9-.4-11.7-.5-34.3-.5zm0 15c22.2 0 24.9.1 33.7.5 8.1.4 12.5 1.7 15.5 2.9 3.9 1.5 6.6 3.3 9.6 6.2 2.9 2.9 4.7 5.7 6.2 9.6 1.2 3 2.5 7.4 2.9 15.5.4 8.7.5 11.4.5 33.7s-.1 24.9-.5 33.7c-.4 8.1-1.7 12.5-2.9 15.5-1.5 3.9-3.3 6.6-6.2 9.6-2.9 2.9-5.7 4.7-9.6 6.2-3 1.2-7.4 2.5-15.5 2.9-8.7.4-11.4.5-33.7.5s-24.9-.1-33.7-.5c-8.1-.4-12.5-1.7-15.5-2.9-3.9-1.5-6.6-3.3-9.6-6.2-2.9-2.9-4.7-5.7-6.2-9.6-1.2-3-2.5-7.4-2.9-15.5-.4-8.7-.5-11.4-.5-33.7s.1-24.9.5-33.7c.4-8.1 1.7-12.5 2.9-15.5 1.5-3.9 3.3-6.6 6.2-9.6 2.9-2.9 5.7-4.7 9.6-6.2 3-1.2 7.4-2.5 15.5-2.9 8.7-.4 11.4-.5 33.7-.5zm0 25.5c-23.2 0-42 18.8-42 42s18.8 42 42 42 42-18.8 42-42-18.8-42-42-42zm0 69.3c-15.1 0-27.3-12.2-27.3-27.3s12.2-27.3 27.3-27.3 27.3 12.2 27.3 27.3-12.2 27.3-27.3 27.3zm53.6-71c-5.4 0-9.8-4.4-9.8-9.8s4.4-9.8 9.8-9.8 9.8 4.4 9.8 9.8-4.4 9.8-9.8 9.8z"/></svg>
            <span>Instagram</span>
          </a>
        </div> -->
        <p>
          Recently, I'm tinkering at <NuxtLink to="https://attentionfactory.io/?utm_source=koha.wtf&utm_medium=referral&utm_campaign=personal-site" class="developer-pill group inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-base no-underline hover:bg-white/15"><span class="icon-wrapper"><span class="icon-default">🧪</span><span class="icon-hover">🏭</span></span><span>the attention factory</span></NuxtLink>.
        </p>
        <p>
          <a href="mailto:me@koha.wtf" class="underline decoration-white/40 underline-offset-2 hover:decoration-white">Reach out</a> if interested. 
        </p>
      </section>
      <section>
      <div class="flex flex-wrap items-center">
        <div class="btn-container group">
          <button 
            class="btn-useless" 
            :disabled="isLoading"
            @click="goToRandomSite"
          >
            <span v-if="isLoading" class="spinner"></span>
            <span v-else>Suprise me!</span>
          </button>
          <span class="slide-up-text">teleport to a useless website</span>
        </div>
      </div>
    </section>
    </main>
  </div>
</template>

