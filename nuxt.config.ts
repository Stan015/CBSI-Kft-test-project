import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ['~/assets/css/global.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  modules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      'Lexend+Deca': [100, 300, 400, 500, 700],
    },
  },
});