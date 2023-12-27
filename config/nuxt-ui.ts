import type { AppConfigInput, NuxtConfig } from "@nuxt/schema";

export const nuxtConfig: NuxtConfig["ui"] = {
  global: true,
  // icons: ["ph"],
  // icons: {
  //   dynamic: true,
  // },
  safelistColors: ["prim"],
};

export const appConfig: AppConfigInput["ui"] = {
  primary: "prim",
  gray: "cool",
};
