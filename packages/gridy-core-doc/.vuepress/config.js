module.exports = {
  base: '/gridys/core/',
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
    repo: 'darosh/gridys',
    nav:
      [
        { text: 'Home', link: '/' },
        { text: 'Grids', link: '/grids/' },
        { text: 'Selection', link: '/selection/' },
        { text: 'Paths', link: '/paths/' },
        { text: 'Search', link: '/search/' },
        { text: 'Interactive', link: '/interactive/' },
        { text: 'API', link: 'https://darosh.github.io/gridys/core-api/' }
      ]
  }
}
