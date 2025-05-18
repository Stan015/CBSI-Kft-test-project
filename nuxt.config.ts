import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "%s - NoteCards",
      meta: [
        {
          name: "description",
          content: "A small SPA (single-page app) for notes.",
        },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
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
  components: [
    "~/components",
    { path: "~/components/ui/", pathPrefix: false },
    { path: "~/components/ui/skeletons", pathPrefix: false },
  ],
});
