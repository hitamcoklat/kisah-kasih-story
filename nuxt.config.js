export default {
  ssr: false, // Disable Server Side rendering
  telemetry: false,
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Kisah',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
      { hid: 'description', name: 'description', content: 'Kisah. Merupakan sebuah platform baca, berasal dari kumpulan2 artikel/tulisan yang ada di internet dan dikumpulkan dengan metoda scrapping.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~plugins/vue-infinite-scroll.js', ssr: false }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'nuxt-svg-loader',
    'vue-social-sharing/nuxt'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // vendor: ['vue-infinite-scroll']
  },
  env: {
    apiURL: 'https://api-vercel.hitamcoklat.vercel.app'
  },

  pwa: {
    manifest: {
      "name": "Kisah App",
      "lang": "en",
      "start_url": "/?standalone=true",
      "display": "standalone",      
      "short_name": "Kisah App",
      "description": "Kisah. Merupakan sebuah platform baca, berasal dari kumpulan2 artikel/tulisan yang ada di internet dan dikumpulkan dengan metoda scrapping.",      
      "icons": [
        {
          "src": "/_nuxt/icons/icon_64x64.5f6a36.png",
          "sizes": "64x64",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "/_nuxt/icons/icon_120x120.5f6a36.png",
          "sizes": "120x120",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "/_nuxt/icons/icon_144x144.5f6a36.png",
          "sizes": "144x144",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "/_nuxt/icons/icon_152x152.5f6a36.png",
          "sizes": "152x152",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "/_nuxt/icons/icon_192x192.5f6a36.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "/_nuxt/icons/icon_384x384.5f6a36.png",
          "sizes": "384x384",
          "type": "image/png",
          "purpose": "any maskable"
        },
        {
          "src": "/_nuxt/icons/icon_512x512.5f6a36.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "any maskable"
        }
      ],      
    }
  }  

}
