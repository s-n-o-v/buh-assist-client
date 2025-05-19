import { defineNuxtConfig, NuxtConfig } from 'nuxt/config';
import Aura from '@primeuix/themes/aura';

// https://nuxt.com/docs/api/configuration/nuxt-config
const config: NuxtConfig = ({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  ssr: true,
  modules: [
    '@nuxtjs/eslint-module',
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  imports: {
    dirs: ["composables"],
  },
  runtimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL,
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
});

export default defineNuxtConfig(config);
