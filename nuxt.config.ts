// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@ant-design-vue/nuxt'
  ],
  plugins: [
    { src: '@/plugins/ant-ui.ts', mode: 'client', ssr: false }
  ],

  nitro: {
    // preset: 'node-server',
    preset: 'firebase',
  },
  builder: "vite",
  ssr: false,

  vue: {
  },
  antd:{
    // Options
  }
})
