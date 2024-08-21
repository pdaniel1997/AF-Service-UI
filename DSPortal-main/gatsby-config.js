const projectPathPrefix =
  process.env.CI_PROJECT_NAME || "gatsby"

module.exports = {
  // Use CI_PROJECT_NAME variable as pathPrefix, edit/comment if you want to use a custom domain.
  // pathPrefix: `/${projectPathPrefix}`,
  pathPrefix: ``,
  siteMetadata: {
    title: `ADCP Developer Service Desk`,
    description: `ADCP Developer Service Desk - Self Help`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        // The unique name for each instance
        name: `templates`,
        ignore: [`**/\.*`],
        // Path to the directory
        path: `${__dirname}/dev-support-templates/`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
