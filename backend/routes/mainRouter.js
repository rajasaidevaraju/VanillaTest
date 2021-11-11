const mainController = require("./../controller/mainController");

const routes = [
  {
    method: "GET",
    url: "/api/getAllVideos",
    handler: mainController.getAllVideos,
  },
  {
    method: "GET",
    url: "/api/getVideo",
    handler: mainController.getVideo,
  },
  {
    method: "GET",
    url: "/api/getFileData",
    handler: mainController.getFileData,
  },
  {
    method: "GET",
    url: "/getVideoPage",
    handler: mainController.getVideoPage,
  },
];

module.exports = routes;
