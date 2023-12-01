// https://nuxt.com/docs/api/configuration/nuxt-config

const API_URL = `${process.env.BUILD_API_BASE_URL || "http://127.0.0.1:8083"}/api/v1`;

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
  runtimeConfig: {
    public: {
      apiBase: API_URL // can be overridden by NUXT_PUBLIC_API_BASE environment variable
    },
    private: {
      chatbot: {
        url: "",
        secret: ""
      }
    }
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
    baseURL: ` ${API_URL}/auth`,
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
              background: "#bdb7b2",
              surface: "#FFFFFF",
              "surface-primary": "#ffedef",
              primary: "#fcdc40",
              "primary-darken-1": "#ff7383",
              "primary-darken-2": "#ff8492",
              "primary-darken-3": "#ffdce0",
              "primary-darken-4": "#ff5064",
              "primary-darken-5": "#ff5064",
              "primary-lighten-3": "#ff8492",
              secondary: "#6f6763",
              "secondary-lighten-1": "#827a75",
              "secondary-lighten-2": "#958d88",
              "secondary-lighten-3": "#a39c97",
              "secondary-lighten-4": "#b1aaa6",
              "secondary-lighten-5": "#bdb7b2",
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
  css: ["vuetify/lib/styles/main.sass"]
});
