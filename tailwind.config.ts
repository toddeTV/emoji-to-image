import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
import { primaryColor } from "./config/tailwind-css";

export default <Partial<Config>>{
  darkMode: "class",
  theme: {
    // fontFamily: {
    // },
    extend: {
      fontFamily: {
        sans: ["Roboto", "Helvetica", ...defaultTheme.fontFamily.sans],
        // sans: ["DM Sans", "DM Sans fallback", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        //TODO better only use one that can do both
        prim: primaryColor, // needed for color `primary` in `/config/nuxt-ui.ts` and for real color usage
        primary: primaryColor, // needed only for VSCode in order to show the color when using `primary` from `/config/nuxt-ui.ts`
      },
    },
  },
  plugins: [
    // require("@tailwindcss/typography"),
    // require("@tailwindcss/aspect-ratio"),
  ],
};
