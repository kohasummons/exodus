import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  theme: {
    extend: {
      colors: {
        "grey-100": "#FAFAFA",
        "grey-200": "#0000004D",
      },
      fontFamily: {
        "pp-supply-mono": ["var(--font-pp-supply-mono)", ...fontFamily.mono],
      },
    },
  },
};
