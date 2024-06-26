import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/trpr02_AppWeb/',
  title: "trpr02",
  description: "Travail pratique 2",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'Revues', link: '/matis-bergeron1' }
    ],

    sidebar: [
      {
        text: 'Documentation',
        items: [
          { text: 'Thomas Dion - Semaine 1', link: '/thomas-dion1' },
          { text: 'Matis Bergeron - Semaine 1', link: '/matis-bergeron1' },
          { text: 'Thomas Dion - Semaine 2', link: '/thomas-dion2' },
          { text: 'Matis Bergeron - Semaine 2', link: '/matis-bergeron2' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
