const luxon = require("luxon");

var DateTime = luxon.DateTime;
let d = DateTime.local();
let today = d.toISODate();

module.exports = function(api, options) {
  api.createPages(({ createPage }) => {
    createPage({
      path: "/",
      component: "./src/templates/Resources.vue",
      context: {
        today: today,
      },
    });
    createPage({
      path: "/jobs",
      component: "./src/templates/Gigs.vue",
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
};
