// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: true,
  // devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@sidebase/nuxt-auth",
    "@nuxtjs/i18n",
    "vuetify-nuxt-module",
    "@vueuse/nuxt",
    "dayjs-nuxt"
  ],
  experimental: {
    inlineSSRStyles: false
  },
  auth: {
    provider: {
      type: "local",
      pages: { login: "/login" },

      endpoints: {
        signIn: { path: "/login", method: "post" },
        signOut: { path: "/logout", method: "post" },
        signUp: { path: "/register", method: "post" },
        getSession: { path: "/session", method: "get" }
      },
      sessionDataType: {
        id: "string",
        email: "string",
        role: "ADMIN | USER"
      }
    },
    session: {
      enableRefreshPeriodically: 600000, // 10 minutes
      enableRefreshOnWindowFocus: true
    },
    baseURL: "http://127.0.0.1:8083/api/auth",
    isEnabled: true

    // Whether to periodically refresh the session. Change this to `true` for a refresh every seconds or set this to a number like `5000` for a refresh every 5000 milliseconds (aka: 5 seconds)    enableSessionRefreshPeriodically: false,    // Whether to refresh the session whenever a window focus event happens, i.e, when your user refocuses the window. Set this to `false` to turn this off    enableSessionRefreshOnWindowFocus: true,
  },
  dayjs: {
    locales: ["en", "de"],
    plugins: ["relativeTime", "timezone"],
    defaultLocale: "en"
  },

  i18n: {
    locales: [
      {
        code: "en",
        iso: "en",
        file: "en.json",
        name: "English",
        dir: "ltr"
      },
      {
        code: "de",
        iso: "de",
        file: "de.json",
        name: "Deutsch",
        dir: "ltr"
      }
    ],
    lazy: true,
    strategy: "no_prefix",
    detectBrowserLanguage: false,
    // put your json files in this folder or configure your own path
    langDir: "locales/",
    defaultLocale: "de",
    types: "composition",
    pages: undefined,
    dynamicRouteParams: false,
    skipSettingLocaleOnNavigate: true,
    // debug: true,
    // Vue configuration file, you can move it to the root folder
    vueI18n: "./i18n.config.ts"
  },
  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      // @TODO: list all vuetify options
      theme: {
        defaultTheme: "light",
        themes: {
          light: {
            dark: false,
            colors: {
              background: "#dddddd",
              surface: "#FFFFFF",
              "surface-primary": "#ffedef",
              primary: "#ff5064",
              "primary-darken-1": "#ff7383",
              "primary-darken-2": "#ff8492",
              "primary-darken-3": "#ffdce0",
              "primary-darken-4": "#ff5064",
              "primary-darken-5": "#ff5064",
              "primary-lighten-3": "#ff8492",
              secondary: "#fde162",
              "secondary-darken-1": "#caae2f",
              "secondary-darken-2": "#b09415",
              "secondary-darken-3": "#4a2e00",
              "secondary-darken-4": "#311500",
              "secondary-darken-5": "#180000",
              error: "#a33a3a",
              info: "#ff5064",
              success: "#4f9045",
              warning: "#f5cc5b"
            }
          }
        }
      }
    },

    moduleOptions: {
      /* nuxt-vuetify module options */

      styles: { configFile: "/assets/main.scss" } // true | 'none' | 'expose' | 'sass' | { configFile: string },
    }
  },
  css: ["vuetify/lib/styles/main.sass"],

  vite: {
    server: {
      proxy: {
        "/api/": {
          target: "http://127.0.0.0:8083/",
          ws: true
        }
      }
    }
  }
});
