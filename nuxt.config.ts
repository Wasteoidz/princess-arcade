// nuxt.config.ts
export default defineNuxtConfig({

  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/eslint',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-11-01',

  // 🟢 Simply turn on the built-in styler right here
  eslint: {
    config: {
      stylistic: true,
    },
  },
})
