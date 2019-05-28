module.exports = {
  base: './',
  title: '@gridy/core',
  description: 'TypeScript grid library for server and browser',
  head: [
    ['link', {
      rel: 'stylesheet',
      href: `https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons`
    }]
  ],
  themeConfig: {
    search: false,
    repo: 'vuejs/vuepress',
    lastUpdated: 'Last Updated',
    nav:
      [
        { text: 'Home', link: '/' },
        { text: 'Grids', link: '/grids/' },
        { text: 'Selection', link: '/selection/' },
        { text: 'Paths', link: '/paths/' },
        { text: 'Search', link: '/search/' },
        { text: 'Interactive', link: '/interactive/' }
      ]
  }
}
