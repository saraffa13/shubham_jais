import darkModePlugin from "./postcss-dark-mode.mjs";

const config = {
  plugins: [
    ["@tailwindcss/postcss", {}],
    darkModePlugin,
  ],
};

export default config;
