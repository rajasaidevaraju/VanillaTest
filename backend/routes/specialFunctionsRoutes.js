const specialFunctionsController = require("./../controller/specialFunctionsController");
const routes = [
  {
    method: "POST",
    url: "/setThumbnail",
    handler: specialFunctionsController.setThumbnail,
  },
];
module.exports = routes;
