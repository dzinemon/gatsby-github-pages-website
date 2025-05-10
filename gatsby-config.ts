import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Gatsby Github Pages Website`,
    siteUrl: `https://www.yourdomain.tld`
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  // Prefix for GitHub Pages deployment
  pathPrefix: "/gatsby-github-pages-website",
  plugins: ["gatsby-plugin-postcss", "gatsby-plugin-image", "gatsby-plugin-sitemap", "gatsby-transformer-remark", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "tools",
      "path": "./src/content/tools/"
    },
    __key: "tools"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "videos",
      "path": "./src/content/videos/"
    },
    __key: "videos"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "lessons",
      "path": "./src/content/lessons/"
    },
    __key: "lessons"
  }]
};

export default config;
