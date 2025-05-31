// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["nuxt-gtag", "@nuxtjs/seo", "@nuxtjs/tailwindcss"],
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