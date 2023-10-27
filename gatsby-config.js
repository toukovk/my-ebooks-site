/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `My ebooks`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `ebooks`,
        path: `${__dirname}/data/`,
      },
    },
    `gatsby-transformer-csv`,
  ],
}
