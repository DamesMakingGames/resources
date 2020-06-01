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
      component: "./src/templates/BlackCommunities.vue",
      context: {
        today: today,
      },
    });
    createPage({
      path: "/covid-19",
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
    createPage({
      path: "/reading-lists",
      component: "./src/templates/ReadingLists.vue",
      context: {
        today: today,
      },
    });
  });
  api.loadSource(async (store) => {
    const blackCommunitiesCollection = store.addCollection("BlackCommunities");

    const resourceCollection = store.addCollection("CovidResource");
    resourceCollection.addReference("topicList", "Topic");

    const gigsCollection = store.addCollection("Gig");

    const toolsCollection = store.addCollection("Tools");
    toolsCollection.addReference("toolTypeList", "ToolType");

    const topicCollection = store.addCollection("Topic");
    const toolTypeCollection = store.addCollection("ToolType");

    const covid19Data = await axios({
      method: "GET",
      url: `https://api.airtable.com/v0/${
        process.env.airtable_base_id
      }/COVID-19?api_key=${
        process.env.airtable_api_key
      }&view=viw5GiVdKoC7tPv3w`,
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
    const toolsData = await axios({
      method: "GET",
      url: `https://api.airtable.com/v0/${
        process.env.airtable_base_id
      }/Tools?api_key=${process.env.airtable_api_key}&view=viwTkF7VKpuoIRcrS`,
    }).then((result) => {
      for (const item of result.data.records) {
        let toolType = item.fields.Type;
        let toolTypeList = toolType.map(function(toolType) {
          return toolType;
        });
        toolsCollection.addNode({
          ...item.fields,
          toolTypeList: toolTypeList,
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
    const toolTypeData = await axios({
      method: "GET",
      url: `https://api.airtable.com/v0/${
        process.env.airtable_base_id
      }/Tool%20Types?api_key=${process.env.airtable_api_key}`,
    }).then((result) => {
      for (const item of result.data.records) {
        toolTypeCollection.addNode({
          ...item.fields,
          id: item.id,
          slug: slugify(item.fields.Name),
        });
      }
    });
    const gigsData = await axios({
      method: "GET",
      url: `https://api.airtable.com/v0/${
        process.env.airtable_base_id
      }/Gigs?api_key=${process.env.airtable_api_key}&view=viwFhgFnXRezJh662`,
    }).then((result) => {
      for (const item of result.data.records) {
        gigsCollection.addNode({
          ...item.fields,
        });
      }
    });
    const blackCommunitiesData = await axios({
      method: "GET",
      url: `https://api.airtable.com/v0/${
        process.env.airtable_base_id
      }/BLM?api_key=${process.env.airtable_api_key}&view=viwJqFUatVr9yro3a`,
    }).then((result) => {
      for (const item of result.data.records) {
        blackCommunitiesCollection.addNode({
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
