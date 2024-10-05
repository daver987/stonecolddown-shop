export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  // Get all the pages, components, composables and plugins from the parent theme
  extends: ['./woonuxt_base'],

  modules: ['@nuxt/ui', '@nuxt/fonts', '@vueuse/nuxt', '@nuxtjs/cloudinary'],
  components: [{ path: './components', pathPrefix: false }],
  css: ['~/assets/css/main.css'],
  colorMode: {
    preference: 'dark',
  },

  /**
   * Depending on your servers capabilities, you may need to adjust the following settings.
   * It will affect the build time but also increase the reliability of the build process.
   * If you have a server with a lot of memory and CPU, you can remove the following settings.
   * @property {number} concurrency - How many pages to prerender at once
   * @property {number} interval - How long to wait between prerendering pages
   * @property {boolean} failOnError - This stops the build from failing but the page will not be statically generated
   */
  nitro: {
    prerender: {
      concurrency: 10,
      interval: 1000,
      failOnError: false,
    },
    experimental: {
      asyncContext: true,
    },
  },

  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in',
    },
  },

  fonts: {
    defaults: {
      weights: ['300', '400', '500', '600'],
    },
    families: [{ name: 'Lato', provider: 'google' }],
  },

  tailwindcss: { viewer: false },
  compatibilityDate: '2024-07-04',

  devtools: {
    enabled: true,
  },
})