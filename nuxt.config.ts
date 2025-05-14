import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/global.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["@nuxtjs/google-fonts", "@pinia/nuxt"],
  googleFonts: {
    families: {
      "Lexend+Deca": [100, 300, 400, 500, 700],
    },
  },
  components: ["~/components", { path: "~/components/ui/", pathPrefix: false }],
});
