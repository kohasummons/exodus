<template>
    <div :class="['valentine-root', 'theme-' + currentTheme]" ref="rootEl">
      <div class="bg-floats" ref="bgFloats"></div>
      <div class="vignette" :class="{ stormy: isStormy }"></div>
      <canvas ref="confettiCanvas" class="confetti-canvas"></canvas>
      <canvas ref="saveCanvas" width="1080" height="1350" class="save-canvas"></canvas>
      <div class="toast" :class="{ show: toastVisible }">{{ toastMsg }}</div>
  
      <!-- SETUP -->
      <div class="screen" :class="{ active: screen === 'setup' }">
        <div class="card setup-card">
          <div style="font-size: 3rem; margin-bottom: 4px">{{ T.icon }}</div>
          <h2>Create Your Link</h2>
          <p class="setup-sub">They won't be able to say no... literally</p>
          <div class="theme-picker">
            <div
              class="theme-option opt-lemon"
              :class="{ selected: currentTheme === 'lemon' }"
              @click="setTheme('lemon')"
            >
              <span>🍋</span><small>Lemon</small>
            </div>
            <div
              class="theme-option opt-rose"
              :class="{ selected: currentTheme === 'rose' }"
              @click="setTheme('rose')"
            >
              <span>🌹</span><small>Rose</small>
            </div>
          </div>
          <label>Your name</label>
          <input
            v-model="senderInput"
            type="text"
            placeholder="e.g. Joshua"
            maxlength="20"
            autocomplete="off"
            @keydown.enter="generateLink"
          />
          <label>Their name</label>
          <input
            v-model="receiverInput"
            type="text"
            placeholder="e.g. Dami"
            maxlength="20"
            autocomplete="off"
            @keydown.enter="generateLink"
          />
          <button
            class="btn-primary btn-start"
            :style="linkGenerated ? { pointerEvents: 'none', opacity: 0.6 } : {}"
            @click="generateLink"
          >
            {{ linkGenerated ? 'Link generated! 🎉' : 'Generate my link ✨' }}
          </button>
          <div class="link-result" :class="{ show: linkGenerated }">
            <div class="generated-link">{{ generatedURL }}</div>
            <div class="link-actions">
              <button class="btn-primary" @click="copyGeneratedLink">Copy 📋</button>
              <button class="btn-primary" @click="shareGeneratedLink">Share 💌</button>
            </div>
            <button class="btn-preview" @click="startQuestion">Preview what they'll see →</button>
            <p class="link-hint">Send this link to your person and watch the magic happen ✨</p>
          </div>
        </div>
      </div>
  
      <!-- QUESTION -->
      <div class="screen" :class="{ active: screen === 'question' }">
        <div class="guilt-counter" :class="{ show: noCount > 0 }" ref="guiltCounter">
          <span class="guilt-heart" :class="{ cracking: guiltCracking }" ref="guiltHeart">{{ guiltHeartEmoji }}</span>
          <span>You've broken my heart {{ noCount }} time{{ noCount > 1 ? 's' : '' }}</span>
        </div>
        <div class="desperate-msg" :class="{ show: desperateMsgVisible }">{{ desperateMsgText }}</div>
        <div class="question-content">
          <span class="bear-emoji">{{ bearEmoji }}</span>
          <h1 ref="questionTitle" v-html="questionHTML"></h1>
          <p class="sender-tag">— {{ senderName }}</p>
          <div class="button-row">
            <button
              class="btn-primary btn-yes-q"
              :style="{ transform: 'scale(' + yesScale + ')' }"
              @click="triggerCelebration"
            >
              {{ T.yesText }}
            </button>
            <button
              v-if="!noIsRogue"
              class="btn-ghost btn-no-q"
              ref="btnNoInline"
              @click="handleNo"
              @touchstart.prevent="handleNo"
            >
              {{ noButtonText }}
            </button>
          </div>
        </div>
      </div>
  
      <!-- ROGUE NO BUTTON (teleported to body) -->
      <Teleport to="body">
        <button
          v-if="noIsRogue"
          class="btn-ghost btn-no-q rogue"
          :class="['theme-' + currentTheme + '-rogue']"
          ref="btnNoRogue"
          :style="rogueStyle"
          @click="handleNo"
          @touchstart.prevent="handleNo"
          @mouseenter="onNoHover"
          @mouseleave="onNoLeave"
        >
          {{ noButtonText }}
        </button>
      </Teleport>
  
      <!-- FAKEOUT -->
      <div class="screen" :class="{ active: screen === 'fakeout' }">
        <div class="fakeout-content" v-show="!sikeActive">
          <span class="fakeout-emoji">😔</span>
          <div class="fakeout-text">Ok... I understand.<br />I'll just be here... alone...</div>
          <div class="fakeout-dots">. . .</div>
        </div>
        <div class="sike-content" :class="{ active: sikeActive }">
          <span class="sike-emoji">😏</span>
          <div class="sike-text">SIKE!! You thought?!</div>
          <div class="sike-sub">There's only one right answer here</div>
          <button class="btn-sike-yes" @click="triggerCelebration">YES!</button>
        </div>
      </div>
  
      <!-- CELEBRATION -->
      <div class="screen celeb-screen" :class="{ active: screen === 'celeb' }">
        <div class="celeb-badge">
          <span class="celeb-emoji">🥰</span>
          <div class="celeb-label">{{ T.celebLabel }}</div>
          <div class="celeb-names">
            {{ senderName }}<br /><span class="amp">&</span><br />{{ receiverName }}
          </div>
          <div class="celeb-date">{{ celebDate }}</div>
          <div class="celeb-hearts-row">{{ T.celebRow }}</div>
          <div class="celeb-status">IT'S OFFICIAL ✓</div>
          <div class="share-row">
            <div class="share-row-inner">
              <button class="btn-share-c" @click="copyPageLink">Copy Link 🔗</button>
              <button class="btn-share-c primary" @click="saveCard">Save Card 💾</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, nextTick } from 'vue'
  
  /* ── THEME CONFIG ── */
  const THEMES = {
    lemon: {
      bg: '#E0EFD5', primary: '#FCEFA6', primaryDark: '#F5D76E',
      card: '#FFFCF5', text: '#181818', textLight: '#555', accent: '#e07c3e',
      fontHead: "'Gloria Hallelujah', cursive", fontBody: "'Indie Flower', cursive", fontCaption: "'Sue Ellen Francisco', cursive",
      icon: '🍋', yesText: 'Yes! 🍋', bearDefault: '🍋',
      guiltDefault: '💛', celebLabel: '🍋 Official Valentine 🍋',
      celebRow: '🍋 💛 🍋 💛 🍋',
      trailEmoji: ['🍋', '😢', '💧', '😭'],
      confettiColors: ['#FCEFA6', '#F5D76E', '#e07c3e', '#E0EFD5', '#FFF5CC', '#FFD700', '#98D187'],
      confettiEmoji: ['🍋', '💛', '✨', '🌿', '💚', '🌻', '⭐'],
      floatSVG: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path fill="#FCEFA6" stroke="#181818" stroke-width="2.5" d="M15,50 Q10,20 40,15 Q70,10 85,35 Q100,60 70,80 Q40,100 20,75 Q5,60 15,50 Z"/><path fill="none" stroke="#181818" stroke-width="1.5" stroke-linecap="round" d="M25,30 Q35,25 45,35"/><path fill="none" stroke="#181818" stroke-width="1.5" stroke-linecap="round" d="M70,50 Q75,60 65,70"/></svg>',
      escalateBg: (p) => `rgb(${Math.round(224 - p * 180)},${Math.round(239 - p * 200)},${Math.round(213 - p * 170)})`,
      escalateText: (p) => `rgb(${24 + Math.round(p * 80)},${24 + Math.round(p * 20)},${24 + Math.round(p * 10)})`,
    },
    rose: {
      bg: '#fff5f7', primary: '#e8456b', primaryDark: '#c2185b',
      card: '#ffffff', text: '#2d1f2f', textLight: '#8a6575', accent: '#e8456b',
      fontHead: "'Playfair Display', serif", fontBody: "'Quicksand', sans-serif", fontCaption: "'Quicksand', sans-serif",
      icon: '🌹', yesText: 'Yes! 💕', bearDefault: '🧸',
      guiltDefault: '❤️', celebLabel: '💕 Official Valentine 💕',
      celebRow: '💖 💕 💖 💕 💖',
      trailEmoji: ['💔', '😢', '💧', '😭'],
      confettiColors: ['#e8456b', '#ff6b8a', '#f4a261', '#ff85a1', '#c2185b', '#ff4081', '#f06292', '#ffcdd2'],
      confettiEmoji: ['❤️', '💕', '💖', '💗', '💝', '✨', '🌹', '💘'],
      floatSVG: '<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 28s-10-7.35-10-15c0-4.42 3.58-8 8-8 2.56 0 4.84 1.21 6.3 3.09A7.97 7.97 0 0126 5c4.42 0 8 3.58 8 8 0 7.65-10 15-10 15H16z" transform="scale(0.8) translate(2,2)" fill="#e8456b" opacity="0.9"/></svg>',
      escalateBg: (p) => `rgb(${Math.round(255 - p * 210)},${Math.round(245 - p * 220)},${Math.round(247 - p * 200)})`,
      escalateText: (p) => `rgb(${194 - Math.round(p * 100)},${24 - Math.round(p * 10)},${92 - Math.round(p * 50)})`,
    },
  }
  
  const bearFacesLemon = ['🍋', '🥺', '😢', '😭', '💔', '😿', '🥹', '😩', '🫠', '😔', '🥀', '😵']
  const bearFacesRose = ['🧸', '🥺', '😢', '😭', '💔', '😿', '🥹', '😩', '🫠', '😔', '🥀', '😵']
  const noTexts = ['No', 'Are you sure? 🥺', 'Really sure?', 'Pookie please...', "I'm gonna cry 😢", "You're breaking my heart 💔", "I'll be so sad...", 'Pretty please?? 🙏', "I'll give you chocolate 🍫", 'Think again!', 'Last chance...', 'JUST SAY YES ALREADY!!']
  const desperateMessages = ['', "don't do this to me...", 'i literally can\'t rn 😩', 'POOKIE NOOO', '*sniffles*', 'my heart is in pieces 💔', "i'm literally shaking rn", 'fine... *cries in corner*', 'THIS IS YOUR LAST CHANCE', 'ok i\'m begging fr 🙏', '💀💀💀', 'I WILL NOT ACCEPT THIS']
  const guiltHeartsArr = ['❤️', '💔', '💔', '🖤', '🖤', '💀', '💀', '☠️', '☠️', '☠️', '☠️', '☠️']
  const FAKEOUT_AT = 8
  
  /* ── REFS ── */
  const rootEl = ref(null)
  const bgFloats = ref(null)
  const confettiCanvas = ref(null)
  const saveCanvas = ref(null)
  const questionTitle = ref(null)
  const guiltCounter = ref(null)
  const guiltHeart = ref(null)
  const btnNoRogue = ref(null)
  
  /* ── ROUTE PARAMS (parsed before first render to avoid flash) ── */
  const route = useRoute()
  const paramFrom = route.query.from
  const paramTo = route.query.to
  const paramTheme = route.query.theme
  const paramDone = route.query.done
  const hasRecipient = !!(paramFrom && paramTo)

  /* ── STATE ── */
  const currentTheme = ref(paramTheme && THEMES[paramTheme] ? paramTheme : 'lemon')
  const screen = ref(hasRecipient ? (paramDone === '1' ? 'celeb' : 'question') : 'setup')
  const senderInput = ref('')
  const receiverInput = ref('')
  const senderName = ref(hasRecipient ? decodeURIComponent(paramFrom) : '')
  const receiverName = ref(hasRecipient ? decodeURIComponent(paramTo) : '')
  const generatedURL = ref('')
  const linkGenerated = ref(false)
  
  const noCount = ref(0)
  const yesScale = ref(1)
  const noIsRogue = ref(false)
  const rogueLeft = ref(0)
  const rogueTop = ref(0)
  const noButtonText = ref('No')
  const noButtonScale = ref(1)
  const noButtonOpacity = ref(1)
  const bearEmoji = ref(THEMES[currentTheme.value].bearDefault)
  const desperateMsgText = ref('')
  const desperateMsgVisible = ref(false)
  const guiltCracking = ref(false)
  const isStormy = ref(false)
  const sikeActive = ref(false)
  const celebDate = ref('')
  const toastMsg = ref('')
  const toastVisible = ref(false)
  
  let hoverFleeTimeout = null
  let bgFloatEls = []
  let audioCtx = null
  
  const T = computed(() => THEMES[currentTheme.value])
  
  const questionHTML = computed(() => `${receiverName.value}, will you be<br>my Valentine?`)
  
  const guiltHeartEmoji = computed(() => {
    if (noCount.value === 0) return T.value.guiltDefault
    return guiltHeartsArr[Math.min(noCount.value, guiltHeartsArr.length - 1)]
  })
  
  const rogueStyle = computed(() => ({
    left: rogueLeft.value + 'px',
    top: rogueTop.value + 'px',
    transform: `scale(${noButtonScale.value})`,
    opacity: noButtonOpacity.value,
    fontFamily: T.value.fontBody,
    borderColor: currentTheme.value === 'lemon' ? '#e07c3e' : '#999',
    color: currentTheme.value === 'lemon' ? '#e07c3e' : '#999',
  }))
  
  /* ── THEME ── */
  function setTheme(t) {
    currentTheme.value = t
    const theme = THEMES[t]
    const root = document.documentElement
    root.style.setProperty('--bg', theme.bg)
    root.style.setProperty('--primary', theme.primary)
    root.style.setProperty('--primary-dark', theme.primaryDark)
    root.style.setProperty('--card', theme.card)
    root.style.setProperty('--text', theme.text)
    root.style.setProperty('--text-light', theme.textLight)
    root.style.setProperty('--accent', theme.accent)
    root.style.setProperty('--font-head', theme.fontHead)
    root.style.setProperty('--font-body', theme.fontBody)
    root.style.setProperty('--font-caption', theme.fontCaption)
    buildFloats()
  }
  
  /* ── AUDIO ── */
  function initAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  function playTone(f, d, t = 'sine', v = 0.12) {
    try {
      initAudio()
      const o = audioCtx.createOscillator(), g = audioCtx.createGain()
      o.type = t; o.frequency.value = f
      g.gain.setValueAtTime(v, audioCtx.currentTime)
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + d)
      o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime + d)
    } catch (e) {}
  }
  function playSadNote(c) {
    const n = [440, 415, 392, 370, 349, 330, 311, 294, 277, 262, 247, 233]
    const i = Math.min(c, n.length - 1)
    playTone(n[i], 0.8, 'sine', 0.1)
    setTimeout(() => playTone(n[i] * 0.75, 1, 'sine', 0.06), 150)
  }
  function playCelebration() {
    ;[523, 659, 784, 1047].forEach((f, i) => setTimeout(() => playTone(f, 0.5, 'sine', 0.1), i * 120))
    setTimeout(() => [1047, 1175, 1319].forEach((f, i) => setTimeout(() => playTone(f, 0.8, 'triangle', 0.08), i * 100)), 500)
  }
  
  /* ── BG FLOATS ── */
  function buildFloats() {
    const container = bgFloats.value
    if (!container) return
    container.innerHTML = ''
    bgFloatEls = []
    const theme = THEMES[currentTheme.value]
    for (let i = 0; i < 20; i++) {
      const h = document.createElement('span')
      h.className = 'bg-float'
      const s = 20 + Math.random() * 30
      h.innerHTML = theme.floatSVG
      h.querySelector('svg').style.width = s + 'px'
      h.querySelector('svg').style.height = s + 'px'
      h.style.left = Math.random() * 100 + '%'
      h.style.animationDuration = (8 + Math.random() * 14) + 's'
      h.style.animationDelay = (Math.random() * 10) + 's'
      container.appendChild(h)
      bgFloatEls.push(h)
    }
  }
  
  /* ── SETUP ── */
  function generateLink() {
    if (linkGenerated.value) return
    senderName.value = senderInput.value.trim() || 'Someone'
    receiverName.value = receiverInput.value.trim() || 'You'
    const base = window.location.origin + window.location.pathname
    generatedURL.value = `${base}?from=${encodeURIComponent(senderName.value)}&to=${encodeURIComponent(receiverName.value)}&theme=${currentTheme.value}`
    linkGenerated.value = true
  }
  
  function copyGeneratedLink() {
    navigator.clipboard.writeText(generatedURL.value).then(() => showToast('Link copied! Send it to them 💌'))
  }
  
  function shareGeneratedLink() {
    if (navigator.share) {
      navigator.share({ title: 'Will You Be My Valentine?', text: senderName.value + ' has a question for you...', url: generatedURL.value })
    } else {
      copyGeneratedLink()
    }
  }
  
  /* ── QUESTION ── */
  function startQuestion() {
    bearEmoji.value = T.value.bearDefault
    screen.value = 'question'
    initAudio()
  }
  
  function fleeNo() {
    const pad = 20
    const bw = 120, bh = 50
    const cL = rogueLeft.value || window.innerWidth / 2
    const cT = rogueTop.value || window.innerHeight / 2
    const a = Math.random() * Math.PI * 2, d = 150 + Math.random() * 150
    rogueLeft.value = Math.max(pad, Math.min(window.innerWidth - bw - pad, cL + Math.cos(a) * d))
    rogueTop.value = Math.max(pad, Math.min(window.innerHeight - bh - pad, cT + Math.sin(a) * d))
  }
  
  function handleNo(e) {
    if (e) { e.preventDefault(); e.stopPropagation() }
    noCount.value++
    const count = noCount.value
    const faces = currentTheme.value === 'lemon' ? bearFacesLemon : bearFacesRose
  
    if (count === FAKEOUT_AT) { triggerFakeout(); return }
  
    if (count === 1) {
      // Go rogue
      rogueLeft.value = window.innerWidth / 2 - 60
      rogueTop.value = window.innerHeight / 2 + 80
      noIsRogue.value = true
      nextTick(() => setTimeout(() => fleeNo(), 150))
    } else {
      setTimeout(() => fleeNo(), 60)
    }
  
    noButtonText.value = noTexts[Math.min(count, noTexts.length - 1)]
    yesScale.value += 0.22
    noButtonScale.value = Math.max(0.55, 1 - count * 0.04)
    noButtonOpacity.value = Math.max(0.5, 1 - count * 0.05)
    bearEmoji.value = faces[Math.min(count, faces.length - 1)]
  
    const msg = desperateMessages[Math.min(count, desperateMessages.length - 1)]
    if (msg) {
      desperateMsgVisible.value = false
      desperateMsgText.value = msg
      nextTick(() => { desperateMsgVisible.value = true })
    }
  
    // Guilt heart cracking animation
    guiltCracking.value = false
    nextTick(() => { guiltCracking.value = true })
  
    // Escalate BG
    escalateBackground(count)
  
    // Shake
    document.body.classList.remove('shake')
    void document.body.offsetWidth
    document.body.classList.add('shake')
  
    playSadNote(count)
    spawnTrailHeart(rogueLeft.value + 60, rogueTop.value + 25)
  }
  
  function onNoHover() {
    if (!noIsRogue.value) return
    clearTimeout(hoverFleeTimeout)
    hoverFleeTimeout = setTimeout(() => fleeNo(), 250)
  }
  function onNoLeave() { clearTimeout(hoverFleeTimeout) }
  
  function escalateBackground(c) {
    const theme = THEMES[currentTheme.value]
    const p = Math.min(c / 10, 1)
    document.body.style.background = theme.escalateBg(p)
    if (c >= 3) isStormy.value = true
    if (c >= 5) bgFloatEls.forEach(h => { h.style.animationName = 'floatDown'; h.style.opacity = '0.06' })
    if (questionTitle.value) questionTitle.value.style.color = theme.escalateText(p)
  }
  
  function spawnTrailHeart(x, y) {
    const theme = THEMES[currentTheme.value]
    const el = document.createElement('span')
    el.className = 'trail-heart'
    el.textContent = theme.trailEmoji[Math.floor(Math.random() * theme.trailEmoji.length)]
    el.style.left = x + 'px'
    el.style.top = y + 'px'
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 1000)
  }
  
  /* ── FAKEOUT ── */
  function triggerFakeout() {
    noIsRogue.value = false
    screen.value = 'fakeout'
    setTimeout(() => {
      sikeActive.value = true
      document.body.style.background = '#1c1a14'
      playTone(880, 0.3, 'square', 0.08)
    }, 3000)
  }
  
  /* ── CELEBRATION ── */
  function triggerCelebration() {
    const theme = THEMES[currentTheme.value]
    document.body.style.background = theme.bg
    isStormy.value = false
    bgFloatEls.forEach(h => { h.style.animationName = 'floatUp'; h.style.opacity = '0.12' })
  
    const now = new Date()
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    celebDate.value = months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear()
  
    screen.value = 'celeb'
    playCelebration()
    nextTick(() => launchConfetti())
  }
  
  /* ── CELEB ACTIONS ── */
  function getCelebURL() {
    const base = window.location.origin + window.location.pathname
    return `${base}?from=${encodeURIComponent(senderName.value)}&to=${encodeURIComponent(receiverName.value)}&theme=${currentTheme.value}&done=1`
  }
  
  function copyPageLink() {
    navigator.clipboard.writeText(getCelebURL()).then(() => showToast('Card link copied! 💌'))
  }
  
  function saveCard() {
    const canvas = saveCanvas.value
    const ctx = canvas.getContext('2d')
    const W = 1080, H = 1350
    const isLemon = currentTheme.value === 'lemon'
    const theme = THEMES[currentTheme.value]
  
    if (isLemon) { ctx.fillStyle = '#E0EFD5'; ctx.fillRect(0, 0, W, H) }
    else { const g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#fff5f7'); g.addColorStop(1, '#fce4ec'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H) }
  
    ctx.fillStyle = isLemon ? '#FFFCF5' : '#ffffff'
    roundRect(ctx, 90, 200, W - 180, 950, isLemon ? 12 : 28); ctx.fill()
    if (isLemon) { ctx.strokeStyle = '#181818'; ctx.lineWidth = 4; roundRect(ctx, 90, 200, W - 180, 950, 12); ctx.stroke() }
    else { ctx.shadowColor = 'rgba(194,24,92,0.12)'; ctx.shadowBlur = 30; roundRect(ctx, 90, 200, W - 180, 950, 28); ctx.fill(); ctx.shadowBlur = 0 }
  
    ctx.font = '80px serif'; ctx.textAlign = 'center'; ctx.fillText('🥰', W / 2, 310)
  
    ctx.font = `bold 20px ${isLemon ? 'Gloria Hallelujah' : 'Quicksand'}, sans-serif`
    ctx.fillStyle = isLemon ? '#e07c3e' : '#e8456b'
    ctx.fillText(theme.celebLabel, W / 2, 360)
  
    let y = 440
    ctx.fillStyle = isLemon ? '#181818' : '#c2185b'
    ctx.font = `bold 52px ${isLemon ? 'Gloria Hallelujah' : 'Playfair Display'}, serif`
    ctx.fillText(senderName.value, W / 2, y)
    ctx.fillStyle = isLemon ? '#e07c3e' : '#e8456b'
    ctx.font = `italic 36px ${isLemon ? 'Sue Ellen Francisco' : 'Playfair Display'}, serif`
    ctx.fillText('&', W / 2, y + 50)
    ctx.fillStyle = isLemon ? '#181818' : '#c2185b'
    ctx.font = `bold 52px ${isLemon ? 'Gloria Hallelujah' : 'Playfair Display'}, serif`
    ctx.fillText(receiverName.value, W / 2, y + 105)
  
    const now = new Date()
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    ctx.fillStyle = isLemon ? '#555' : '#8a6575'
    ctx.font = `24px ${isLemon ? 'Indie Flower' : 'Quicksand'}, sans-serif`
    ctx.fillText(months[now.getMonth()] + ' ' + now.getDate() + ', ' + now.getFullYear(), W / 2, y + 165)
  
    ctx.font = '36px serif'
    ctx.fillText(theme.celebRow, W / 2, y + 230)
  
    const by = y + 300
    if (isLemon) {
      ctx.fillStyle = '#FCEFA6'; roundRect(ctx, W / 2 - 130, by - 23, 260, 46, 8); ctx.fill()
      ctx.strokeStyle = '#181818'; ctx.lineWidth = 3; roundRect(ctx, W / 2 - 130, by - 23, 260, 46, 8); ctx.stroke()
      ctx.fillStyle = '#181818'
    } else {
      const bg = ctx.createLinearGradient(W / 2 - 130, 0, W / 2 + 130, 0)
      bg.addColorStop(0, '#e8456b'); bg.addColorStop(1, '#c2185b')
      ctx.fillStyle = bg; roundRect(ctx, W / 2 - 130, by - 23, 260, 46, 23); ctx.fill()
      ctx.fillStyle = 'white'
    }
    ctx.font = `bold 18px ${isLemon ? 'Gloria Hallelujah' : 'Quicksand'}, sans-serif`
    ctx.fillText("IT'S OFFICIAL ✓", W / 2, by + 7)
  
    ctx.fillStyle = '#999'; ctx.font = `16px ${isLemon ? 'Indie Flower' : 'Quicksand'}, sans-serif`
    ctx.fillText(isLemon ? 'made with koha.wtf/secret 🍋' : 'made with koha.wtf/secret 💕', W / 2, H - 60)
  
    const link = document.createElement('a')
    link.download = `valentine-${senderName.value}-${receiverName.value}.png`
    link.href = canvas.toDataURL('image/png')
    link.click()
    showToast('Card saved! 💾')
  }
  
  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath(); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y)
    ctx.quadraticCurveTo(x + w, y, x + w, y + r); ctx.lineTo(x + w, y + h - r)
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h); ctx.lineTo(x + r, y + h)
    ctx.quadraticCurveTo(x, y + h, x, y + h - r); ctx.lineTo(x, y + r)
    ctx.quadraticCurveTo(x, y, x + r, y); ctx.closePath()
  }
  
  /* ── TOAST ── */
  function showToast(msg) {
    toastMsg.value = msg
    toastVisible.value = true
    setTimeout(() => { toastVisible.value = false }, 2000)
  }
  
  /* ── CONFETTI ── */
  function launchConfetti() {
    const theme = THEMES[currentTheme.value]
    const canvas = confettiCanvas.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth; canvas.height = window.innerHeight
    const particles = []
    const origins = [
      { x: canvas.width * 0.5, y: canvas.height * 0.4 },
      { x: canvas.width * 0.1, y: canvas.height * 0.9 },
      { x: canvas.width * 0.9, y: canvas.height * 0.9 },
      { x: canvas.width * 0.25, y: canvas.height * 0.1 },
      { x: canvas.width * 0.75, y: canvas.height * 0.1 },
    ]
    origins.forEach((o, idx) => {
      const count = idx === 0 ? 80 : 30
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2, speed = 4 + Math.random() * 16
        particles.push({
          x: o.x, y: o.y,
          vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 3,
          size: 10 + Math.random() * 22, rotation: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 8, gravity: 0.18 + Math.random() * 0.12,
          color: theme.confettiColors[Math.floor(Math.random() * theme.confettiColors.length)],
          emoji: theme.confettiEmoji[Math.floor(Math.random() * theme.confettiEmoji.length)],
          opacity: 1, type: Math.random() > 0.35 ? 'emoji' : 'shape', delay: idx * 120,
        })
      }
    })
    const start = performance.now()
    function animate(now) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false
      particles.forEach(p => {
        if (now - start < p.delay) { alive = true; return }
        p.x += p.vx; p.vy += p.gravity; p.y += p.vy
        p.rotation += p.rotSpeed; p.vx *= 0.99; p.opacity -= 0.003
        if (p.opacity <= 0) return
        alive = true
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.globalAlpha = Math.max(0, p.opacity)
        if (p.type === 'emoji') {
          ctx.font = p.size + 'px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'
          ctx.fillText(p.emoji, 0, 0)
        } else {
          const s = p.size * 0.4; ctx.fillStyle = p.color
          ctx.beginPath(); ctx.ellipse(0, 0, s * 1.3, s, 0, 0, Math.PI * 2); ctx.fill()
        }
        ctx.restore()
      })
      if (alive) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }
  
  /* ── INIT ── */
  onMounted(() => {
    // Load fonts
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&family=Indie+Flower&family=Sue+Ellen+Francisco&family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Quicksand:wght@400;600;700&display=swap'
    document.head.appendChild(link)
  
    setTheme('lemon')
  
    // URL params
    const params = new URLSearchParams(window.location.search)
    const paramFrom = params.get('from')
    const paramTo = params.get('to')
    const paramTheme = params.get('theme')
    const paramDone = params.get('done')
  
    if (paramTheme && THEMES[paramTheme]) setTheme(paramTheme)
    if (paramFrom && paramTo) {
      senderName.value = decodeURIComponent(paramFrom)
      receiverName.value = decodeURIComponent(paramTo)
      if (paramDone === '1') {
        triggerCelebration()
      } else {
        startQuestion()
      }
    }
  
    window.addEventListener('resize', () => {
      if (confettiCanvas.value) {
        confettiCanvas.value.width = window.innerWidth
        confettiCanvas.value.height = window.innerHeight
      }
    })
  })
  </script>
  
  <style>
  /* Global styles that need to affect body */
  @keyframes screenShake {
    0%, 100% { transform: translate(0, 0); }
    15% { transform: translate(-5px, -3px); }
    30% { transform: translate(5px, 2px); }
    45% { transform: translate(-3px, 4px); }
    60% { transform: translate(4px, -2px); }
    75% { transform: translate(-2px, 3px); }
  }
  body.shake { animation: screenShake 0.45s ease; }
  
  .trail-heart {
    position: fixed; pointer-events: none; z-index: 5; font-size: 1.2rem;
    animation: trailFade 1s ease forwards;
  }
  @keyframes trailFade {
    0% { opacity: 0.7; transform: scale(1) translateY(0); }
    100% { opacity: 0; transform: scale(0.3) translateY(-40px); }
  }
  
  /* Rogue button global (teleported to body) */
  .btn-ghost.btn-no-q.rogue {
    display: inline-block;
    font-size: 1.2rem;
    padding: 14px 36px;
    cursor: pointer;
    transition: left 0.4s cubic-bezier(0.25, 1, 0.5, 1), top 0.4s cubic-bezier(0.25, 1, 0.5, 1), transform 0.25s ease, opacity 0.25s ease;
    position: fixed;
    z-index: 15;
    white-space: nowrap;
    background: white;
    border: 2.5px solid #999;
    border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
    box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.15);
  }
  </style>
  
  <style scoped>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  :root {
    --bg: #E0EFD5;
    --primary: #FCEFA6;
    --primary-dark: #F5D76E;
    --card: #FFFCF5;
    --text: #181818;
    --text-light: #555;
    --accent: #e07c3e;
    --font-head: 'Gloria Hallelujah', cursive;
    --font-body: 'Indie Flower', cursive;
    --font-caption: 'Sue Ellen Francisco', cursive;
  }
  
  .valentine-root {
    font-family: var(--font-body);
    background: var(--bg);
    height: 100dvh; width: 100vw;
    overflow: hidden; position: relative;
    -webkit-user-select: none; user-select: none;
    transition: background 1s ease;
  }
  
  .theme-lemon {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
  }
  
  .screen {
    position: fixed; inset: 0;
    display: none; flex-direction: column;
    align-items: center; justify-content: center;
    z-index: 10; padding: 24px;
  }
  .screen.active { display: flex; }
  
  /* ── CARD ── */
  .card {
    background: var(--card);
    padding: 40px 36px; max-width: 400px; width: 100%;
    text-align: center; position: relative;
    animation: cardDrop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }
  .theme-lemon .card {
    border: 2.5px solid var(--text);
    border-radius: 2px 255px 3px 25px / 255px 5px 225px 3px;
    box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.1), 3px 3px 10px rgba(0, 0, 0, 0.05);
  }
  .theme-rose .card {
    border: none; border-radius: 28px;
    box-shadow: 0 12px 50px rgba(194, 24, 92, 0.12), 0 4px 20px rgba(0, 0, 0, 0.06);
  }
  @keyframes cardDrop {
    0% { opacity: 0; transform: translateY(30px) rotate(-3deg) scale(0.95); }
    100% { opacity: 1; transform: translateY(0) rotate(-1deg) scale(1); }
  }
  .theme-rose .card { animation-name: cardDropRose; }
  @keyframes cardDropRose {
    0% { opacity: 0; transform: translateY(30px) scale(0.95); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
  
  /* ── BUTTONS ── */
  .btn-primary {
    display: inline-block; background: var(--primary);
    font-family: var(--font-head); font-size: 1.2rem;
    padding: 14px 36px; cursor: pointer; color: var(--text);
    transition: all 0.15s ease;
  }
  .theme-lemon .btn-primary {
    border: 2.5px solid var(--text);
    border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
    box-shadow: 4px 4px 0 var(--text);
  }
  .theme-lemon .btn-primary:hover { background: #FFF5CC; transform: translate(-1px, -1px); box-shadow: 6px 6px 0 var(--text); }
  .theme-lemon .btn-primary:active { transform: translate(4px, 4px); box-shadow: 0 0 0 var(--text); }
  .theme-rose .btn-primary {
    border: none; border-radius: 999px; color: white;
    background: linear-gradient(135deg, #e8456b, #c2185b);
    box-shadow: 0 4px 15px rgba(232, 69, 107, 0.3);
  }
  .theme-rose .btn-primary:hover { box-shadow: 0 6px 20px rgba(232, 69, 107, 0.4); transform: translateY(-1px); }
  
  .btn-ghost {
    display: inline-block; background: var(--card);
    font-family: var(--font-body); font-size: 1.2rem;
    padding: 14px 36px; cursor: pointer; color: var(--text-light);
    transition: all 0.15s ease; white-space: nowrap;
  }
  .theme-lemon .btn-ghost {
    border: 2.5px solid var(--text);
    border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px;
    box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.15);
  }
  .theme-rose .btn-ghost {
    border: 2px solid #e8456b; border-radius: 999px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
  
  /* ── FLOATING BG ── */
  .bg-floats { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
  :deep(.bg-float) { position: absolute; opacity: 0.12; animation: floatUp linear infinite; }
  :deep(.bg-float svg) { display: block; transition: opacity 0.5s ease; }
  @keyframes floatUp { 0% { transform: translateY(110vh) rotate(0deg); opacity: 0; } 10% { opacity: 0.12; } 90% { opacity: 0.12; } 100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; } }
  @keyframes floatDown { 0% { transform: translateY(-10vh) rotate(0deg); opacity: 0; } 10% { opacity: 0.15; } 90% { opacity: 0.15; } 100% { transform: translateY(110vh) rotate(360deg); opacity: 0; } }
  
  /* ── THEME PICKER ── */
  .theme-picker { display: flex; gap: 12px; margin: 20px 0 8px; justify-content: center; }
  .theme-option {
    width: 80px; height: 80px; border-radius: 16px; cursor: pointer;
    border: 3px solid transparent; position: relative;
    transition: all 0.2s ease; display: flex; flex-direction: column;
    align-items: center; justify-content: center; gap: 4px;
  }
  .theme-option span { font-size: 2rem; }
  .theme-option small { font-family: var(--font-caption); font-size: 0.8rem; color: var(--text-light); }
  .theme-option.opt-rose { background: linear-gradient(135deg, #fff5f7, #fce4ec); }
  .theme-option.opt-lemon { background: linear-gradient(135deg, #E0EFD5, #FCEFA6); }
  .theme-option.selected { border-color: var(--text); box-shadow: 3px 3px 0 var(--text); transform: scale(1.05); }
  .theme-option:not(.selected):hover { transform: scale(1.03); }
  
  /* ── SETUP ── */
  .setup-card h2 { font-family: var(--font-head); font-size: 1.6rem; color: var(--text); margin-bottom: 4px; }
  .setup-card .setup-sub { color: var(--text-light); font-size: 1rem; margin-bottom: 16px; }
  .setup-card label { display: block; text-align: left; font-family: var(--font-caption); font-size: 1.2rem; color: var(--text-light); margin-bottom: 4px; margin-top: 14px; }
  .setup-card input { width: 100%; padding: 12px 16px; border: none; border-bottom: 2px dashed var(--text); font-family: var(--font-body); font-size: 1.15rem; color: var(--text); outline: none; background: transparent; }
  .setup-card input:focus { border-bottom-style: solid; background: rgba(0, 0, 0, 0.03); }
  .setup-card input::placeholder { color: #aaa; }
  .btn-start { margin-top: 24px; width: 100%; }
  .link-result { display: none; margin-top: 20px; text-align: center; }
  .link-result.show { display: block; animation: cardDrop 0.4s ease both; }
  .generated-link { background: rgba(0, 0, 0, 0.04); border: 2px dashed var(--text); border-radius: 8px; padding: 12px 14px; font-size: 0.8rem; font-family: monospace; color: var(--text); word-break: break-all; margin-bottom: 12px; text-align: left; line-height: 1.4; }
  .link-actions { display: flex; gap: 8px; }
  .link-actions .btn-primary { flex: 1; font-size: 1rem; padding: 10px; text-align: center; }
  .link-hint { margin-top: 14px; font-size: 0.9rem; color: #999; }
  .btn-preview { margin-top: 10px; background: transparent; border: none; color: var(--accent); font-family: var(--font-body); font-size: 1rem; cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }
  
  /* ── QUESTION ── */
  .question-content { position: relative; z-index: 10; text-align: center; animation: cardDrop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
  .bear-emoji { font-size: 5rem; display: block; margin-bottom: 12px; animation: bearBounce 2s ease-in-out infinite; }
  @keyframes bearBounce { 0%, 100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-10px) rotate(3deg); } }
  .question-content h1 {
    font-family: var(--font-head);
    font-size: clamp(1.8rem, 5.5vw, 3rem);
    color: var(--text); margin-bottom: 4px; line-height: 1.2;
    transition: color 0.5s ease;
  }
  .theme-lemon .question-content h1 { transform: rotate(-2deg); }
  .sender-tag { font-family: var(--font-caption); font-size: clamp(1.2rem, 3vw, 1.6rem); color: var(--text-light); margin-bottom: 32px; opacity: 0; animation: cardDrop 0.6s 0.4s ease both; }
  .button-row { display: flex; align-items: center; justify-content: center; gap: 16px; }
  .btn-yes-q { z-index: 15; position: relative; transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
  .btn-no-q { z-index: 15; transition: left 0.4s cubic-bezier(0.25, 1, 0.5, 1), top 0.4s cubic-bezier(0.25, 1, 0.5, 1), transform 0.25s ease, opacity 0.25s ease; }
  
  .guilt-counter { position: fixed; top: 20px; left: 50%; transform: translateX(-50%); z-index: 20; background: var(--card); border: 2px solid var(--text); padding: 8px 18px; box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.1); display: none; align-items: center; gap: 8px; font-family: var(--font-caption); font-size: 1.1rem; color: var(--text); white-space: nowrap; }
  .theme-lemon .guilt-counter { border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; }
  .theme-rose .guilt-counter { border-radius: 999px; border-color: #e8456b; }
  .guilt-counter.show { display: flex; }
  .guilt-heart { font-size: 1.3rem; display: inline-block; }
  .guilt-heart.cracking { animation: heartCrack 0.4s ease; }
  @keyframes heartCrack { 0% { transform: scale(1); } 30% { transform: scale(1.4); } 60% { transform: scale(0.8); } 100% { transform: scale(1); } }
  
  .desperate-msg { position: fixed; bottom: 36px; left: 50%; transform: translateX(-50%); z-index: 20; font-family: var(--font-caption); font-size: clamp(1rem, 3vw, 1.4rem); color: var(--accent); white-space: nowrap; opacity: 0; pointer-events: none; }
  .desperate-msg.show { opacity: 1; animation: desperatePop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
  @keyframes desperatePop { 0% { transform: translateX(-50%) scale(0.7); } 60% { transform: translateX(-50%) scale(1.15); } 100% { transform: translateX(-50%) scale(1); } }
  
  .vignette { position: fixed; inset: 0; pointer-events: none; z-index: 1; transition: background 1s ease; }
  .vignette.stormy { background: radial-gradient(ellipse at center, transparent 30%, rgba(30, 20, 10, 0.35) 100%); }
  
  /* ── FAKEOUT ── */
  .screen:has(.fakeout-content) { background: #1c1a14; z-index: 40; }
  .fakeout-content { text-align: center; animation: fakeoutFade 1.5s ease both; }
  @keyframes fakeoutFade { 0% { opacity: 0; } 40% { opacity: 1; } }
  .fakeout-emoji { font-size: 4rem; margin-bottom: 12px; display: block; }
  .fakeout-text { font-family: var(--font-head); font-size: clamp(1.4rem, 4vw, 2rem); color: #8a7a50; line-height: 1.4; }
  .fakeout-dots { margin-top: 16px; font-size: 1.5rem; color: #6a5a30; letter-spacing: 8px; animation: dotPulse 1.5s ease-in-out infinite; }
  @keyframes dotPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
  .sike-content { text-align: center; display: none; }
  .sike-content.active { display: block; animation: sikeEntry 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
  @keyframes sikeEntry { 0% { opacity: 0; transform: scale(0.3) rotate(-10deg); } 100% { opacity: 1; transform: scale(1) rotate(0); } }
  .sike-emoji { font-size: 5rem; display: block; margin-bottom: 8px; }
  .sike-text { font-family: var(--font-head); font-size: clamp(1.8rem, 5vw, 2.8rem); margin-bottom: 12px; }
  .theme-lemon .sike-text { color: #FCEFA6; }
  .theme-rose .sike-text { color: #ff6b8a; }
  .sike-sub { color: #b0a070; font-family: var(--font-body); font-size: 1.1rem; margin-bottom: 32px; }
  .btn-sike-yes { padding: 20px 70px; font-family: var(--font-head); font-size: 1.5rem; cursor: pointer; animation: megaPulse 1.2s ease-in-out infinite alternate; }
  .theme-lemon .btn-sike-yes { border: 2.5px solid var(--text); border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; background: var(--primary); color: var(--text); box-shadow: 4px 4px 0 var(--text); }
  .theme-rose .btn-sike-yes { border: none; border-radius: 999px; background: linear-gradient(135deg, #e8456b, #c2185b); color: white; box-shadow: 0 4px 20px rgba(232, 69, 107, 0.4); }
  @keyframes megaPulse { 0% { transform: scale(1); } 100% { transform: scale(1.06); } }
  
  /* ── CELEBRATION ── */
  .celeb-screen { z-index: 50; overflow-y: auto; }
  .theme-lemon .celeb-screen { background: #E0EFD5; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E"); }
  .theme-rose .celeb-screen { background: linear-gradient(180deg, #fff5f7, #fce4ec); }
  
  .celeb-badge {
    background: var(--card); padding: 40px 36px;
    max-width: 380px; width: 100%; text-align: center;
    position: relative; animation: cardDrop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }
  .theme-lemon .celeb-badge { border: 2.5px solid var(--text); border-radius: 2px 255px 3px 25px / 255px 5px 225px 3px; box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.1); transform: rotate(-1deg); }
  .theme-rose .celeb-badge { border: none; border-radius: 28px; box-shadow: 0 12px 50px rgba(194, 24, 92, 0.12); }
  
  .celeb-emoji { font-size: 3.5rem; display: block; animation: celebSpin 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both; }
  @keyframes celebSpin { 0% { transform: scale(0) rotate(-30deg); } 60% { transform: scale(1.2) rotate(10deg); } 100% { transform: scale(1) rotate(0); } }
  .celeb-label { font-family: var(--font-caption); font-size: 1rem; color: var(--accent); margin-top: 10px; opacity: 0; animation: cardDrop 0.5s 0.2s ease both; }
  .celeb-names { font-family: var(--font-head); font-size: 1.6rem; color: var(--text); margin-top: 16px; line-height: 1.3; opacity: 0; animation: cardDrop 0.5s 0.35s ease both; }
  .celeb-names .amp { font-family: var(--font-caption); color: var(--accent); font-size: 1.4rem; }
  .celeb-date { font-family: var(--font-body); font-size: 1rem; color: var(--text-light); margin-top: 8px; opacity: 0; animation: cardDrop 0.5s 0.5s ease both; }
  .celeb-hearts-row { font-size: 1.3rem; letter-spacing: 6px; margin-top: 14px; opacity: 0; animation: cardDrop 0.5s 0.6s ease both, heartsGlow 1.5s 1.1s ease-in-out infinite alternate; }
  @keyframes heartsGlow { 0% { transform: scale(1); } 100% { transform: scale(1.08); } }
  .celeb-status {
    display: inline-block; font-family: var(--font-head); font-size: 0.8rem;
    padding: 6px 16px; margin-top: 16px; opacity: 0;
    animation: cardDrop 0.5s 0.7s ease both;
  }
  .theme-lemon .celeb-status { background: var(--primary); border: 2px solid var(--text); border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; box-shadow: 2px 2px 0 var(--text); color: var(--text); }
  .theme-rose .celeb-status { background: linear-gradient(135deg, #e8456b, #c2185b); border: none; border-radius: 999px; color: white; box-shadow: 0 3px 10px rgba(232, 69, 107, 0.2); }
  
  .share-row { display: flex; flex-direction: column; gap: 8px; margin-top: 20px; opacity: 0; animation: cardDrop 0.5s 0.85s ease both; }
  .share-row-inner { display: flex; gap: 8px; }
  .btn-share-c {
    flex: 1; padding: 10px 14px; background: var(--card); color: var(--text);
    font-family: var(--font-body); font-size: 0.95rem; cursor: pointer;
  }
  .theme-lemon .btn-share-c { border: 2px solid var(--text); border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; box-shadow: 2px 2px 0 var(--text); }
  .theme-lemon .btn-share-c:hover { background: var(--primary); }
  .theme-lemon .btn-share-c.primary { background: var(--primary); }
  .theme-rose .btn-share-c { border: 2px solid #e8456b; border-radius: 999px; }
  .theme-rose .btn-share-c:hover { background: #fce4ec; }
  .theme-rose .btn-share-c.primary { background: linear-gradient(135deg, #e8456b, #c2185b); color: white; border: none; }
  
  .toast { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(20px); padding: 12px 24px; font-family: var(--font-head); font-size: 0.9rem; z-index: 100; opacity: 0; transition: all 0.3s ease; pointer-events: none; }
  .theme-lemon .toast { background: var(--text); color: var(--primary); border-radius: 255px 15px 225px 15px / 15px 225px 15px 255px; }
  .theme-rose .toast { background: #c2185b; color: white; border-radius: 999px; }
  .toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
  
  .confetti-canvas { position: fixed; inset: 0; z-index: 55; pointer-events: none; }
  .save-canvas { position: fixed; top: -9999px; left: -9999px; }
  </style>