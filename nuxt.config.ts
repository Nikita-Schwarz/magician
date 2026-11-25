import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      pbUrl: process.env.NUXT_PUBLIC_PB_URL || 'http://127.0.0.1:8090',
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      title: 'Ромарио',
      htmlAttrs: {
        lang: 'ru',
      },
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  modules: ['@nuxt/image', 'nuxt-swiper', '@pinia/nuxt', 'nuxt-lucide-icons'],
});
