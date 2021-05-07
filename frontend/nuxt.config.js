export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "food-search-nuxt",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios

  axios: {
    proxy: true,
  },
  proxy: {
    "/api": {
      target: "http://webservice.recruit.co.jp/hotpepper",
      pathRewrite: { "^/api": "" },
    },
    "/categories": {
      target: "https://note.com/api/v2/categories",
      pathRewrite: { "^/categories": "" },
    },
    "/ping": {
      target: "http://localhost:5000/ping",
      pathRewrite: { "^/ping": "" },
    },
    "/tasks": {
      target: "http://localhost:5000/tasks",
      pathRewrite: { "^/tasks": "" },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  env: {
    apikey: "7b8f718b6e0d5acb",
  },
};
