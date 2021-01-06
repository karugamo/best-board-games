module.exports = {
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/Layout.tsx`)
      }
    }
  ],
  siteMetadata: {
    siteUrl: 'https://best-board.games'
  }
}
