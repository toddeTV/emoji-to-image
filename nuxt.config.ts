import { version } from "./package.json";
import { nuxtConfig as tailwindcssNuxtConfig } from "./config/tailwind-css";
import { nuxtConfig as uiNuxtConfig } from "./config/nuxt-ui";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  spaLoadingTemplate: false,

  modules: ["@nuxt/ui"],

  runtimeConfig: {
    // [private] `.env` variables that are only available in SSR on server and will not be shipped to client
    port: "",

    // [public] `.env` variables that will be shipped to the client
    public: {
      version: `v${version}`, // not a `.env` variable, is loaded from `/package.json`
    },
  },

  css: ["~/assets/styles/main.css"],

  tailwindcss: tailwindcssNuxtConfig,
  ui: uiNuxtConfig,

  devServer: {
    https: false,
  },

  devtools: {
    enabled: true,
  },
});
