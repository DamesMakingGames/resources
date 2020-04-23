const postcssNested = require("postcss-nested");
const tailwind = require("tailwindcss");
const purgecss = require("@fullhuman/postcss-purgecss");
const postcssPlugins = [tailwind(), postcssNested];
require("dotenv").config();

if (process.env.NODE_ENV === "production") postcssPlugins.push(purgecss());

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
