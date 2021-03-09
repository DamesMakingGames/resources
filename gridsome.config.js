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
    {
      use: "@gridsome/source-airtable",
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        base: process.env.AIRTABLE_BASE_ID,
        tableName: "Resources", // required

        tables: [
          {
            name: "Resources",
            typeName: "Resource",
            select: {
              view: "viw1OAwyVvoltzX4t",
            },
            links: [
              {
                fieldName: "Type",
                typeName: "Type",
              },
              {
                fieldName: "Category",
                typeName: "Category",
              },
            ],
          },
          {
            name: "Types",
            typeName: "Type",
            links: [
              {
                fieldName: "Category",
                typeName: "Category",
              },
            ],
          },
          {
            name: "Categories",
            typeName: "Category",
            links: [
              {
                fieldName: "Type",
                typeName: "Type",
              },
            ],
          },
          {
            name: "Jobs",
            typeName: "Gig",
          },
        ],
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
