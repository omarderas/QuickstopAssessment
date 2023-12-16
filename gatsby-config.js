
module.exports = {
  siteMetadata: {
    title: `Quickstop Assessment`,
    description: `Using a JavaScript frontend framework of your choice, or vanilla JavaScript, create a single-page
    application that obtains the employers and job titles used in our Loan Management system.`,
    author: `jose Urbina`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/quickstop-main.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
