// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss", "nuxt-gtag"],
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
});
