<script setup lang="ts">
const svgGithub = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 208" fill="currentColor"><path d="M205.28 31.36c14.096 14.88 20.016 35.2 22.512 63.68c6.626 0 12.805 1.47 16.976 7.152l7.792 10.56A17.55 17.55 0 0 1 256 123.2v28.688c-.008 3.704-1.843 7.315-4.832 9.504C215.885 187.222 172.35 208 128 208c-49.066 0-98.19-28.273-123.168-46.608c-2.989-2.189-4.825-5.8-4.832-9.504V123.2c0-3.776 1.2-7.424 3.424-10.464l7.792-10.544c4.173-5.657 10.38-7.152 16.992-7.152c2.496-28.48 8.4-48.8 22.512-63.68C77.331 3.165 112.567.06 127.552 0H128c14.72 0 50.4 2.88 77.28 31.36m-77.264 47.376c-3.04 0-6.544.176-10.272.544c-1.312 4.896-3.248 9.312-6.08 12.128c-11.2 11.2-24.704 12.928-31.936 12.928c-6.802 0-13.927-1.42-19.744-5.088c-5.502 1.808-10.786 4.415-11.136 10.912c-.586 12.28-.637 24.55-.688 36.824c-.026 6.16-.05 12.322-.144 18.488c.024 3.579 2.182 6.903 5.44 8.384C79.936 185.92 104.976 192 128.016 192c23.008 0 48.048-6.08 74.512-18.144c3.258-1.48 5.415-4.805 5.44-8.384c.317-18.418.062-36.912-.816-55.312h.016c-.342-6.534-5.648-9.098-11.168-10.912c-5.82 3.652-12.927 5.088-19.728 5.088c-7.232 0-20.72-1.728-31.936-12.928c-2.832-2.816-4.768-7.232-6.08-12.128a106 106 0 0 0-10.24-.544m-26.941 43.93c5.748 0 10.408 4.66 10.408 10.409v19.183c0 5.749-4.66 10.409-10.408 10.409s-10.408-4.66-10.408-10.409v-19.183c0-5.748 4.66-10.408 10.408-10.408m53.333 0c5.749 0 10.409 4.66 10.409 10.409v19.183c0 5.749-4.66 10.409-10.409 10.409c-5.748 0-10.408-4.66-10.408-10.409v-19.183c0-5.748 4.66-10.408 10.408-10.408M81.44 28.32c-11.2 1.12-20.64 4.8-25.44 9.92c-10.4 11.36-8.16 40.16-2.24 46.24c4.32 4.32 12.48 7.2 21.28 7.2c6.72 0 19.52-1.44 30.08-12.16c4.64-4.48 7.52-15.68 7.2-27.04c-.32-9.12-2.88-16.64-6.72-19.84c-4.16-3.68-13.6-5.28-24.16-4.32m68.96 4.32c-3.84 3.2-6.4 10.72-6.72 19.84c-.32 11.36 2.56 22.56 7.2 27.04c10.56 10.72 23.36 12.16 30.08 12.16c8.8 0 16.96-2.88 21.28-7.2c5.92-6.08 8.16-34.88-2.24-46.24c-4.8-5.12-14.24-8.8-25.44-9.92c-10.56-.96-20 .64-24.16 4.32M128 56c-2.56 0-5.6.16-8.96.48c.32 1.76.48 3.68.64 5.76c0 1.44 0 2.88-.16 4.48c3.2-.32 5.92-.32 8.48-.32s5.28 0 8.48.32c-.16-1.6-.16-3.04-.16-4.48c.16-2.08.32-4 .64-5.76c-3.36-.32-6.4-.48-8.96-.48"/></svg>`

const svgX = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="m13.458 9.122l7.516-7.965h2.491l-.01.011l-8.89 9.424l8.139 10.802a.906.906 0 0 1-.658 1.45H16.95a.9.9 0 0 1-.659-.359l-5.727-7.601l-7.472 7.96H.535l8.922-9.43L1.318 2.612a.906.906 0 0 1 .724-1.452h4.965c.285 0 .553.134.724.361zm-.763 2a1 1 0 0 1-.07-.093l-6.07-8.056H3.86l13.607 18.06h2.696z" clip-rule="evenodd"/></svg>`

const svgLinkedin = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor"><path d="M27.26 27.271h-4.733v-7.427c0-1.771-.037-4.047-2.475-4.047c-2.468 0-2.844 1.921-2.844 3.916v7.557h-4.739V11.999h4.552v2.083h.061c.636-1.203 2.183-2.468 4.491-2.468c4.801 0 5.692 3.161 5.692 7.271v8.385zM7.115 9.912a2.75 2.75 0 0 1-2.751-2.756a2.753 2.753 0 1 1 2.751 2.756m2.374 17.359H4.74V12h4.749zM29.636 0H2.36C1.057 0 0 1.031 0 2.307v27.387c0 1.276 1.057 2.307 2.36 2.307h27.271c1.301 0 2.369-1.031 2.369-2.307V2.307C32 1.031 30.932 0 29.631 0z"/></svg>`

const svgGame = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M6 11h4M8 9v4m7-1h.01M18 10h.01m-.69-5H6.68a4 4 0 0 0-3.978 3.59l-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258q-.01-.075-.017-.151A4 4 0 0 0 17.32 5"/></svg>`

interface LinkItem {
  id: number
  title: string
  url: string
  icon: string | null
  svg: string | null
  size: number
  isGame?: boolean
}

const links = ref<LinkItem[]>([
  { id: 1, title: "Website", url: "https://koha.wtf", icon: "🏠", svg: null, size: 1 },
  { id: 2, title: "GitHub", url: "https://github.com/kohasummons", icon: null, svg: svgGithub, size: 1 },
  { id: 3, title: "Twitter", url: "https://x.com/kohawithstuff", icon: null, svg: svgX, size: 1 },
  { id: 4, title: "LinkedIn", url: "https://linkedin.com/in/kohasummons", icon: null, svg: svgLinkedin, size: 1 },
  { id: 5, title: "Lab", url: "/lab", icon: "🧪", svg: null, size: 1 },
  { id: 6, title: "Mail", url: "mailto:me@koha.wtf", icon: "✉️", svg: null, size: 1 },
  { id: 7, title: "Speed Tap", url: "#", icon: null, svg: svgGame, size: 1, isGame: true },
])

// Only non-game links for the game sequence
const gameLinks = computed(() => links.value.filter(l => !l.isGame))

// Random column count on load (3-5)
const colCount = ref(4)

onMounted(() => {
  colCount.value = 3 + Math.floor(Math.random() * 3)
  
  // Only randomize size for non-game links
  const nonGameIndices = links.value
    .map((l, i) => l.isGame ? -1 : i)
    .filter(i => i !== -1)
  const shuffled = nonGameIndices.sort(() => Math.random() - 0.5)
  const bigCount = 1 + Math.floor(Math.random() * 2)
  
  shuffled.slice(0, bigCount).forEach(i => {
    links.value[i].size = 2
  })
})

const gridClass = computed(() => {
  const cols: Record<number, string> = {
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
  }
  return cols[colCount.value] || 'grid-cols-4'
})

// Drag & Drop
const draggedIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)

function onDragStart(e: DragEvent, index: number) {
  if (gameState.value !== 'idle') return
  draggedIndex.value = index
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
  }
}

function onDragOver(e: DragEvent, index: number) {
  if (gameState.value !== 'idle') return
  e.preventDefault()
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'move'
  }
  dragOverIndex.value = index
}

function onDrop(e: DragEvent, index: number) {
  if (gameState.value !== 'idle') return
  e.preventDefault()
  if (draggedIndex.value !== null && draggedIndex.value !== index) {
    const items = [...links.value]
    const temp = items[draggedIndex.value]
    items[draggedIndex.value] = items[index]
    items[index] = temp
    links.value = items
  }
  draggedIndex.value = null
  dragOverIndex.value = null
}

function onDragEnd() {
  draggedIndex.value = null
  dragOverIndex.value = null
}

// Confetti
const particles = ref<Array<{ id: number; x: number; y: number; color: string; tx: number; ty: number; rotation: number; scale: number }>>([])
let particleId = 0

function spawnConfetti(e: MouseEvent, count = 24) {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2
  spawnConfettiAt(x, y, count)
}

function spawnConfettiAt(x: number, y: number, count = 24) {
  const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#aa96da', '#fcbad3', '#a8d8ea']
  const newParticles: typeof particles.value = []
  
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5
    const velocity = 4 + Math.random() * 6
    newParticles.push({
      id: particleId++,
      x,
      y,
      color: colors[Math.floor(Math.random() * colors.length)],
      tx: Math.cos(angle) * velocity * 25,
      ty: Math.sin(angle) * velocity * 25 + 60,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
    })
  }
  
  particles.value.push(...newParticles)
  
  setTimeout(() => {
    particles.value = particles.value.filter(p => !newParticles.find(np => np.id === p.id))
  }, 800)
}

// ============ SPEED TAP GAME ============
type GameState = 'idle' | 'countdown' | 'showing' | 'playing' | 'won' | 'failed'

const gameState = ref<GameState>('idle')
const showRulesModal = ref(false)
const sequence = ref<number[]>([])
const currentShowIndex = ref(0)
const currentTapIndex = ref(0)
const highlightedCard = ref<number | null>(null)
const flashCard = ref<{ index: number; type: 'correct' | 'wrong' } | null>(null)
const level = ref(1)
const startTime = ref(0)
const endTime = ref(0)
const countdown = ref(3)
const bestTime = ref<number | null>(null)

const sequenceLength = computed(() => Math.min(3 + level.value, gameLinks.value.length))
const elapsedTime = computed(() => {
  if (!startTime.value) return 0
  const end = endTime.value || Date.now()
  return ((end - startTime.value) / 1000).toFixed(2)
})

function openRulesModal() {
  showRulesModal.value = true
}

function closeModal() {
  showRulesModal.value = false
}

function startGame() {
  showRulesModal.value = false
  level.value = 1
  startRound()
}

function startRound() {
  gameState.value = 'countdown'
  countdown.value = 3
  
  // Generate random sequence from non-game links only
  const nonGameIndices = links.value
    .map((l, i) => l.isGame ? -1 : i)
    .filter(i => i !== -1)
  sequence.value = nonGameIndices.sort(() => Math.random() - 0.5).slice(0, sequenceLength.value)
  
  const countdownInterval = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(countdownInterval)
      showSequence()
    }
  }, 600)
}

function showSequence() {
  gameState.value = 'showing'
  currentShowIndex.value = 0
  
  const showNext = () => {
    if (currentShowIndex.value >= sequence.value.length) {
      highlightedCard.value = null
      setTimeout(() => {
        gameState.value = 'playing'
        currentTapIndex.value = 0
        startTime.value = Date.now()
        endTime.value = 0
      }, 300)
      return
    }
    
    highlightedCard.value = sequence.value[currentShowIndex.value]
    currentShowIndex.value++
    
    setTimeout(() => {
      highlightedCard.value = null
      setTimeout(showNext, 200)
    }, 500)
  }
  
  showNext()
}

function onCardClick(e: MouseEvent, index: number, link: LinkItem) {
  e.preventDefault()
  
  // Game card clicked
  if (link.isGame) {
    if (gameState.value === 'idle') {
      openRulesModal()
    }
    return
  }
  
  // Normal behavior when idle
  if (gameState.value === 'idle') {
    spawnConfetti(e)
    // Navigate manually since we preventDefault
    if (link.url.startsWith('http')) {
      window.open(link.url, '_blank')
    } else {
      window.location.href = link.url
    }
    return
  }
  
  if (gameState.value !== 'playing') return
  
  const expected = sequence.value[currentTapIndex.value]
  
  if (index === expected) {
    flashCard.value = { index, type: 'correct' }
    spawnConfetti(e, 12)
    
    setTimeout(() => {
      flashCard.value = null
    }, 200)
    
    currentTapIndex.value++
    
    if (currentTapIndex.value >= sequence.value.length) {
      endTime.value = Date.now()
      const time = (endTime.value - startTime.value) / 1000
      
      if (bestTime.value === null || time < bestTime.value) {
        bestTime.value = time
      }
      
      if (level.value >= 3) {
        gameState.value = 'won'
        setTimeout(() => {
          for (let i = 0; i < 5; i++) {
            setTimeout(() => {
              spawnConfettiAt(
                window.innerWidth * (0.2 + Math.random() * 0.6),
                window.innerHeight * (0.3 + Math.random() * 0.4),
                30
              )
            }, i * 150)
          }
        }, 100)
      } else {
        level.value++
        setTimeout(() => startRound(), 1000)
      }
    }
  } else {
    flashCard.value = { index, type: 'wrong' }
    setTimeout(() => {
      flashCard.value = null
      gameState.value = 'failed'
    }, 500)
  }
}

function resetGame() {
  gameState.value = 'idle'
  sequence.value = []
  currentShowIndex.value = 0
  currentTapIndex.value = 0
  highlightedCard.value = null
  flashCard.value = null
  startTime.value = 0
  endTime.value = 0
}
</script>

<template>
  <div class="min-h-dvh bg-[#0a0a0a] p-6 flex flex-col items-center justify-center overflow-hidden gap-6">
    <!-- Game Status Bar (only during game) -->
    <div v-if="gameState !== 'idle'" class="flex items-center gap-4 text-white">
      <template v-if="gameState === 'countdown'">
        <span class="text-4xl font-bold animate-pulse">{{ countdown }}</span>
      </template>
      
      <template v-else-if="gameState === 'showing'">
        <span class="text-white/70">Watch the sequence...</span>
        <span class="text-white/50 text-sm">Level {{ level }}</span>
      </template>
      
      <template v-else-if="gameState === 'playing'">
        <span class="text-white/70">GO! Tap in order</span>
        <span class="font-mono text-lg">{{ elapsedTime }}s</span>
        <span class="text-white/50 text-sm">{{ currentTapIndex }}/{{ sequence.length }}</span>
      </template>
      
      <template v-else-if="gameState === 'won'">
        <span class="text-2xl">🎉</span>
        <span class="text-green-400 font-bold">You won!</span>
        <span class="font-mono">{{ elapsedTime }}s</span>
        <button 
          @click="resetGame"
          class="px-4 py-1 bg-white/10 hover:bg-white/20 border border-white/30 rounded transition-colors text-sm"
        >
          Done
        </button>
      </template>
      
      <template v-else-if="gameState === 'failed'">
        <span class="text-2xl">💥</span>
        <span class="text-red-400 font-bold">Wrong!</span>
        <button 
          @click="resetGame"
          class="px-4 py-1 bg-white/10 hover:bg-white/20 border border-white/30 rounded transition-colors text-sm"
        >
          Try Again
        </button>
      </template>
    </div>
    
    <!-- Best time indicator (idle only) -->
    <div v-if="gameState === 'idle' && bestTime" class="text-white/50 text-sm">
      Best time: {{ bestTime.toFixed(2) }}s
    </div>
    
    <!-- Confetti particles -->
    <div 
      v-for="p in particles" 
      :key="p.id"
      class="confetti"
      :style="{
        left: p.x + 'px',
        top: p.y + 'px',
        '--tx': p.tx + 'px',
        '--ty': p.ty + 'px',
        '--rotation': p.rotation + 'deg',
        '--scale': p.scale,
        backgroundColor: p.color,
      }"
    />
    
    <!-- Grid -->
    <div 
      class="grid gap-px w-full max-w-[960px] mx-auto auto-rows-[minmax(120px,1fr)] bg-white/30 border border-white/30"
      :class="gridClass"
      style="grid-auto-flow: dense; background-image: repeating-linear-gradient(0deg, transparent, transparent 1px, transparent 1px), repeating-linear-gradient(90deg, transparent, transparent 1px, transparent 1px);"
    >
      <div 
        v-for="(link, i) in links" 
        :key="link.id"
        :draggable="gameState === 'idle'"
        class="group relative bg-[#0a0a0a] flex flex-col items-center justify-center gap-3 no-underline text-white transition-all duration-150 cursor-pointer min-h-[120px]"
        :class="[
          { 'opacity-50 ring-2 ring-white/50 ring-inset z-10': draggedIndex === i },
          { 'bg-white/10': dragOverIndex === i && draggedIndex !== i },
          { 'bg-yellow-500/40': highlightedCard === i },
          { 'bg-green-500/50': flashCard?.index === i && flashCard?.type === 'correct' },
          { 'bg-red-500/50 animate-shake': flashCard?.index === i && flashCard?.type === 'wrong' },
          { 'hover:bg-white/5': gameState === 'idle' },
          { 'hover:bg-white/10': gameState === 'playing' && !link.isGame },
          { 'opacity-40 pointer-events-none': link.isGame && gameState !== 'idle' },
          link.size === 2 ? 'col-span-2 row-span-2' : ''
        ]"
        @click="onCardClick($event, i, link)"
        @dragstart="onDragStart($event, i)"
        @dragover="onDragOver($event, i)"
        @drop="onDrop($event, i)"
        @dragend="onDragEnd"
      >
        <span 
          v-if="gameState === 'idle'"
          class="absolute top-2 right-2 text-white/0 group-hover:text-white/40 transition-colors text-xs cursor-grab active:cursor-grabbing"
        >⠿</span>
        <span 
          v-if="link.svg" 
          class="pointer-events-none text-white"
          :class="link.size === 2 ? 'w-20 h-20' : 'w-12 h-12'"
          v-html="link.svg"
        />
        <span 
          v-else 
          class="leading-none pointer-events-none"
          :class="link.size === 2 ? 'text-7xl' : 'text-5xl'"
        >{{ link.icon }}</span>
        <span 
          class="font-medium tracking-wide uppercase opacity-90 pointer-events-none"
          :class="link.size === 2 ? 'text-lg' : 'text-sm'"
        >{{ link.title }}</span>
      </div>
    </div>
    
    <!-- Rules Modal -->
    <Teleport to="body">
      <div 
        v-if="showRulesModal" 
        class="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
        @click.self="closeModal"
      >
        <div class="bg-[#0a0a0a] border border-white/30 max-w-sm w-full">
          <div class="border-b border-white/30 p-4 flex items-center justify-between">
            <span class="text-sm font-medium tracking-wide uppercase text-white/90">Speed Tap</span>
            <button @click="closeModal" class="text-white/30 hover:text-white transition-colors">&times;</button>
          </div>
          
          <div class="p-4 space-y-4 text-white/70 text-sm">
            <div class="flex gap-3">
              <span class="text-white/30">01</span>
              <span>Watch the cards light up</span>
            </div>
            <div class="flex gap-3">
              <span class="text-white/30">02</span>
              <span>Tap them in the same order</span>
            </div>
            <div class="flex gap-3">
              <span class="text-white/30">03</span>
              <span>Complete 3 levels to win</span>
            </div>
            <div class="flex gap-3">
              <span class="text-white/30">04</span>
              <span>Each level adds one more card</span>
            </div>
          </div>
          
          <div class="border-t border-white/30 p-4">
            <button 
              @click="startGame"
              class="w-full py-3 border border-white/30 text-white text-sm font-medium tracking-wide uppercase hover:bg-white/5 transition-colors"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.confetti {
  position: fixed;
  width: 10px;
  height: 10px;
  border-radius: 2px;
  pointer-events: none;
  z-index: 1000;
  transform: scale(var(--scale)) rotate(var(--rotation));
  animation: confetti-burst 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

@keyframes confetti-burst {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(var(--scale)) rotate(var(--rotation));
  }
  100% {
    opacity: 0;
    transform: translate(var(--tx), var(--ty)) scale(0) rotate(calc(var(--rotation) + 540deg));
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-8px); }
  40%, 80% { transform: translateX(8px); }
}

.animate-shake {
  animation: shake 0.4s ease-in-out;
}
</style>
