const postcssNested = require("postcss-nested");
const tailwind = require("tailwindcss");
const postcssPlugins = [tailwind(), postcssNested];
require("dotenv").config();

module.exports = {
  siteName: "DMG Community Resources",
  siteDescription: "DMG community resources",
  siteUrl: "https://resources.dmg.to",
  cacheBusting: false,

  plugins: [
    {
      use: "gridsome-plugin-gtm",
      options: {
        id: `GTM-${process.env.gtm_id}`,
        enabled: true,
        debug: true,
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        typeName: "ReadingList",
        path: "./content/reading-list/*.md",
      },
    },
  ],
  templates: {
    ReadingList: "/reading-list/:slug",
  },

  transformers: {
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: postcssPlugins,
      },
    },
  },
};
