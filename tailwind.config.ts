import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    minHeight: {
      "4/6-screen": "66.666667vh",
    },
    extend: {
      maxWidth: {
        "8xl": "1400px",
      },
    },
  },
  plugins: [],
};
export default config;
