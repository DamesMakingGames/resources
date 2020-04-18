const postcssNested = require("postcss-nested");
const tailwind = require("tailwindcss");
const purgecss = require("@fullhuman/postcss-purgecss");
const postcssPlugins = [tailwind(), postcssNested];
require("dotenv").config();

if (process.env.NODE_ENV === "production") postcssPlugins.push(purgecss());

module.exports = {
  cacheBusting: false,

  siteName: "DMG Community Resources",
  siteDescription: "DMG community resources",
  siteUrl: "https://resources.dmg.to",

  plugins: [
    {
      use: "@gridsome/source-airtable",
      options: {
        apiKey: process.env.airtable_api_key,
        baseId: process.env.airtable_base_id,
        tableName: "COVID-19",
        typeName: "CovidResource",
        select: {},
      },
    },
  ],

  transformers: {
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      anchorClassName: "icon icon-link",
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
