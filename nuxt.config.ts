// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: ["nuxt-gtag", "@nuxtjs/seo", "@nuxtjs/tailwindcss", "nuxt-og-image"],
  ogImage: {
    zeroRuntime: true,
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
  nitro: {
    prerender: {
      autoSubfolderIndex: false,
      crawlLinks: true,
      routes: ["/", "/links"],
    },
  },
  site: {
    url: "https://koha.wtf",
    name: "Koha",
    description: "DevRel Engineer ✦ Builder 🌵",
    defaultLocale: "en",
  },
  seo: {
    title: "Koha",
    description: "DevRel Engineer ✦ Builder 🌵",
    redirectToCanonicalSiteUrl: true,
    meta: {
      keywords: "Creative Engineer,DevRel, Sofware Engineer, Builder, Web3 , AI, Technologist, Developer Relations, Developer Experience, Developer Advocacy, Developer Marketing",
      twitterCreator: "@kohawithstuff",
      twitterSite: "@kohawithstuff",
      twitterTitle: "Koha",
      twitterDescription: "DevRel Engineer ✦ Builder 🌵",
      twitterCard: "summary_large_image",
      twitterUrl: "https://x.com/@kohawithstuff",
    }
  },
});