// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss'],
  vite: {
    server: {
      watch: {
        usePolling: true,
      },
    },
  },
});