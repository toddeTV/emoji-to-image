import type { NuxtConfig } from "@nuxt/schema";

const weight500 = "#ff7f07";

export const primaryColor = {
  DEFAULT: weight500,
  50: "#fff8ec",
  100: "#fff0d2",
  200: "#ffdda4",
  300: "#ffc36b",
  400: "#ff9e2f",
  500: weight500,
  600: "#f96300",
  700: "#c64600",
  800: "#a33a09",
  900: "#83310b",
  950: "#471603",
};

export const nuxtConfig: NuxtConfig["tailwindcss"] = {
  viewer: false, //TODO bind to prov vs dev
  exposeConfig: true,
  cssPath: false, // don't import '~/assets/css/tailwind.css' automatically (instead we use the `css` part in `nuxt.config.ts`)
};
