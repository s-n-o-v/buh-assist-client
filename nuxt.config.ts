import Aura from '@primeuix/themes/aura';
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@nuxt/eslint',
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
  ],
  imports: {
    dirs: ["composables"],
  },
  runtimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL,
    public: {
      // locals
    },
  },
  css: [
    '~/assets/tailwind.css',
    '~/assets/styles.scss',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  primevue: {
    usePrimeVue: true,
    autoImport: false,
    options: {
      ripple: true,
      // inputVariant: 'filled',
      theme: {
        preset: Aura,
        options: {
          // prefix: 'p',
          darkModeSelector: '.app-dark',
          cssLayer: false
        }
      }
    },
  },
})