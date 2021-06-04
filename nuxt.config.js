export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Signin demo",
    htmlAttrs: {
      lang: "en"
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["element-ui/lib/theme-chalk/index.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "@/plugins/element-ui",
    { src: "~/plugins/localStorage.client.js" }
  ],
  mode: "spa",

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios"
    //"@nuxtjs/auth"
  ],

  // auth: {
  //   redirect: {
  //     login: "/signin",
  //     logout: "/signout",
  //     home: "/home"
  //   },
  //   strategies: {
  //     local: {
  //       token: {
  //         property: "accessToken",
  //         required: true
  //       },
  //       user: {
  //         property: false
  //       },
  //       endpoints: {
  //         login: { url: "/signin", method: "post" }
  //       }
  //     }
  //   }
  // },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: "http://localhost:9000",
    headers: { "content-type": "application/json" }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/]
  }
};
