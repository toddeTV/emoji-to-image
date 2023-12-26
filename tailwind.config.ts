import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
import { primaryColor } from "./config/tailwindcss";

export default <Partial<Config>>{
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Roboto", "Helvetica", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        primary: primaryColor,
      },
    },
  },
  plugins: [
    // require("@tailwindcss/typography"),
    // require("@tailwindcss/aspect-ratio"),
  ],
};
