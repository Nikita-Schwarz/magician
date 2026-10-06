import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
				compatibilityDate: '2025-07-15',
				devtools: { enabled: true },
				css: ['./app/assets/css/main.css'],

				vite: {
								plugins: [tailwindcss()],
				},

				app: {
								head: {
												title: 'Ромарио', // default fallback title
												htmlAttrs: {
																lang: 'ru',
												},
												link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
								},
				},

				modules: ['@nuxt/image', 'nuxt-swiper', '@pinia/nuxt', 'nuxt-lucide-icons'],
});