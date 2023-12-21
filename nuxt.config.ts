// https://nuxt.com/docs/api/configuration/nuxt-config

const API_URL = `${process.env.BUILD_API_BASE_URL || "http://127.0.0.1:8083"}/api/v1`;

export default defineNuxtConfig({
  ssr: true,
  devServer: {
    port: 5000
  },
  // devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxtjs/i18n", "vuetify-nuxt-module", "@vueuse/nuxt", "dayjs-nuxt"],
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
              "surface-primary": "#fffceb",
              primary: "#fcdc40",
              "primary-lighten-3": "#fdea8c",
              "primary-lighten-2": "#fef1b2",
              "primary-lighten-1": "#fffceb",
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
