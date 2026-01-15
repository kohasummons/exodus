<script setup lang="ts">
import oneIcon from '~/assets/images/one.png'
import twoIcon from '~/assets/images/two.png'
import threeIcon from '~/assets/images/three.png'

defineOgImage({
  component: 'Bio',
  props: {
    name: 'Joshua Omobola',
    bio: 'DevRel Engineer & AI Educator',
  },
})

useSeoMeta({
  title: 'Joshua Omobola',
  description: 'DevRel Engineer & AI Educator',
  ogTitle: 'Joshua Omobola',
  ogDescription: 'DevRel Engineer & AI Educator',
  twitterTitle: 'Joshua Omobola',
  twitterDescription: 'DevRel Engineer & AI Educator',
  twitterCard: 'summary_large_image',
  twitterCreator: '@kohawithstuff',
  twitterSite: '@kohawithstuff',
})

const links = [
  {
    href: 'https://joshuaomobola.gumroad.com/l/aios',
    title: 'Get my free Prompt Bank',
    desc: 'Ready-to-use prompts to help you get started with AI.',
    icon: twoIcon,
  },
  {
    href: 'https://koha.wtf',
    title: 'Book a 1:1 Call With Me',
    desc: 'Available to help you with your AI projects.',
    icon: oneIcon,
  },
  {
    href: 'https://attentionfactory.io',
    title: 'Attention Factory*',
    desc: 'Swiss Army Knife for Mordern Brands',
    icon: threeIcon,
  }
]
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-6 font-sans relative max-sm:p-0 max-sm:items-start">
    <!-- Fixed background -->
    <div class="fixed inset-0 z-0 pointer-events-none">
      <img src="https://framerusercontent.com/images/mtxquOUwbPjOKdEoG496Zv8CEs.jpg" alt=""
        class="w-full h-full object-cover" />
    </div>

    <div
      class="relative z-10 w-full max-w-[696px] bg-[rgba(13,13,13,0.9)] backdrop-blur-[50px] rounded-3xl p-12 flex flex-col items-center gap-3 max-sm:max-w-full max-sm:px-6 max-sm:py-12 max-sm:rounded-none max-sm:min-h-screen">
      <!-- Avatar -->
      <div>
        <img src="~/assets/images/shot.png" alt="Joshua Omobola"
          class="w-32 h-32 rounded-full object-cover grayscale" />
      </div>

      <!-- Name with verified badge -->
      <h1 class="text-4xl font-bold text-white m-0 flex items-center gap-2 max-sm:text-[28px]">
        Joshua Omobola
        <img src="~/assets/icons/check.svg" alt="Verified" class="w-[30px] h-[30px] shrink-0" />
      </h1>

      <!-- Bio -->
      <p class="text-base leading-relaxed text-white/70 text-center m-0 max-w-[540px]">
        DevRel Engineer & AI Educator
      </p>

      <!-- Links -->
      <div class="w-full flex flex-col gap-3 mt-3">
        <a v-for="link in links" :key="link.href" :href="link.href" target="_blank" rel="noopener noreferrer"
          class="flex items-center gap-3 p-2 bg-white/5 rounded-xl no-underline transition-all duration-500 will-change-transform hover:bg-black/10 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:scale-[1.02]">
          <div class="w-[60px] h-[60px] rounded-lg overflow-hidden shrink-0 max-sm:w-12 max-sm:h-12">
            <img :src="link.icon" :alt="link.title" class="w-full h-full object-cover" />
          </div>
          <div class="flex-1 flex flex-col gap-0.5 min-w-0">
            <span class="text-[15px] font-semibold text-white max-sm:text-sm">{{ link.title }}</span>
            <span class="text-sm text-white/50 max-sm:text-[13px]">{{ link.desc }}</span>
          </div>
          <svg class="w-5 h-5 text-white/30 shrink-0 mr-2" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </a>
      </div>

      <!-- Home link -->
      <NuxtLink to="/" class="text-white/30 text-sm hover:text-white/60 transition-colors mt-4 focus-visible:outline-none focus-visible:text-white/60 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm">
        <span class="text-white/30">✦</span> Koha <span class="text-white/30">✦</span>
      </NuxtLink>
    </div>
  </div>
</template>
