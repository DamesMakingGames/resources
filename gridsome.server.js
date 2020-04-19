const fs = require("fs");
const path = require("path");
const pick = require("lodash.pick");
const slugify = require("slugify");
const { pathPrefix } = require("./gridsome.config");
const luxon = require("luxon");

var DateTime = luxon.DateTime;
let d = DateTime.local();
let today = d.toISODate();
const axios = require("axios");

module.exports = function(api, options) {
  api.createPages(({ createPage }) => {
    createPage({
      path: "/",
      component: "./src/templates/Covid.vue",
      context: {
        today: today,
      },
    });
    createPage({
      path: "/gigs",
      component: "./src/templates/Gigs.vue",
      context: {
        today: today,
      },
    });
    createPage({
      path: "/tools",
      component: "./src/templates/Tools.vue",
      context: {
        today: today,
      },
    });
  });
  api.loadSource(async (store) => {
    const resourceCollection = store.addCollection("CovidResource");
    const topicCollection = store.addCollection("Topic");
    const gigsCollection = store.addCollection("Gig");
    resourceCollection.addReference("topicList", "Topic");

    const covid19Data = await axios({
      method: "GET",
      url: `https://api.airtable.com/v0/${
        process.env.airtable_base_id
      }/COVID-19?api_key=${process.env.airtable_api_key}`,
    }).then((result) => {
      for (const item of result.data.records) {
        let topic = item.fields.Topics;
        let topicList = topic.map(function(topic) {
          return topic;
        });
        resourceCollection.addNode({
          ...item.fields,
          topicList: topicList,
        });
      }
    });
    const topicData = await axios({
      method: "GET",
      url: `https://api.airtable.com/v0/${
        process.env.airtable_base_id
      }/Topics?api_key=${process.env.airtable_api_key}`,
    }).then((result) => {
      for (const item of result.data.records) {
        topicCollection.addNode({
          ...item.fields,
          slug: slugify(item.fields.Name),
        });
      }
    });
    const gigsData = await axios({
      method: "GET",
      url: `https://api.airtable.com/v0/${
        process.env.airtable_base_id
      }/Gigs?api_key=${process.env.airtable_api_key}`,
    }).then((result) => {
      for (const item of result.data.records) {
        gigsCollection.addNode({
          ...item.fields,
        });
      }
    });

    const cleanedPathPrefix = `${
      pathPrefix
        ? ["", ...pathPrefix.split("/").filter((dir) => dir.length)].join("/")
        : ""
    }`;

    store.addMetadata("pathPrefix", cleanedPathPrefix);
  });

  api.beforeBuild(({ config, store }) => {
    const { collection } = store.getCollection("CovidResource");

    const resourcesc19 = collection.data.map((resource) => {
      return pick(resource, ["Name", "URL", "Notes"]);
    });

    const output = {
      dir: "./static",
      name: "search.json",
      ...options.output,
    };

    const outputPath = path.resolve(process.cwd(), output.dir);
    const outputPathExists = fs.existsSync(outputPath);
    const fileName = output.name.endsWith(".json")
      ? output.name
      : `${output.name}.json`;

    if (outputPathExists) {
      fs.writeFileSync(
        path.resolve(process.cwd(), output.dir, fileName),
        JSON.stringify(resourcesc19)
      );
    } else {
      fs.mkdirSync(outputPath);
      fs.writeFileSync(
        path.resolve(process.cwd(), output.dir, fileName),
        JSON.stringify(resourcesc19)
      );
    }
  });
};
