<script setup lang="ts">
import JSConfetti from 'js-confetti'
import uselessWebsites from '~/assets/useless-websites.json'

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
    emojis: ['🎉', '✨', '🎊', '🌈', '⭐'],
    emojiSize: 40,
    confettiNumber: 30,
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
        Joshua Omobola
      </h1>

      <section class="mt-8 space-y-6 text-lg leading-[1.7]">
        <p>
          I'm a <a href="https://github.com/koha" class="underline decoration-white/40 underline-offset-2 hover:decoration-white">DevRel Engineer</a> and builder. 
        </p>
        <p>
        I help <span class="developer-pill group inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-base cursor-pointer"><span class="icon-wrapper"><span class="icon-default">✦</span><span class="icon-hover">🫵🏼</span></span><span>developers</span></span> ship faster and tell better product stories. Over the years I've worked across developer experience, content, and community.
        </p>
        <p>
          My work sits between engineering and education. I believe great developer tools deserve great developer experiences.
        </p>
        <p>
          Recently, I'm tinkering at <NuxtLink to="/lab" class="underline decoration-white/40 underline-offset-2 hover:decoration-white">the attention factory</NuxtLink>.
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
