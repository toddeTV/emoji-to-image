import type { AppConfigInput, NuxtConfig } from "@nuxt/schema";

export const nuxtConfig: NuxtConfig["ui"] = {
  global: true,
  icons: ["ph"], // preloaded, when `UIcon` without `dynamic` is used (or e.g. inside a button icon)
  // icons: {
  //   dynamic: true,
  // },
  safelistColors: ["prim"],
};

export const appConfig: AppConfigInput["ui"] = {
  primary: "prim",
  gray: "cool",
};
