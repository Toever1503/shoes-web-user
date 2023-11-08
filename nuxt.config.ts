// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@ant-design-vue/nuxt',
    'nuxt-swiper',
    'dayjs-nuxt',
    '@pinia/nuxt',
  ],
  plugins: [
    { src: '@/plugins/ant-ui.ts', mode: 'client', ssr: false },
    { src: '@/plugins/Utils.ts', mode: 'client', ssr: false },
  ],

  nitro: {
    // preset: 'node-server',
    // preset: 'firebase',
  },
  builder: "vite",
  ssr: false,

  vue: {
  },
  antd: {
    // Options
  },
  dayjs: {
    locales: ['vi'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'vi',
    defaultTimezone: 'Asia/Ho_Chi_Minh',
  },

  //head
  app: {
    head: {
      link: [
        { rel: 'stylesheet', integrity: 'sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css', crossorigin: 'anonymous', referrerpolicy: 'no-referrer' }
      ]
    }
  }
})