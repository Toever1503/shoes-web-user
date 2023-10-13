// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  plugins: [
    { src: '@/plugins/ant-ui.ts', mode: 'client', ssr: false }
  ],
  nitro: {
    preset: 'node-server'
  },
  builder: "vite",
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith('a-'),
    },
  },

  tailwindcss: {
    config: {
      
    }
  }

})
