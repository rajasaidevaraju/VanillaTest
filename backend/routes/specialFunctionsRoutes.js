const specialFunctionsController = require("./../controller/specialFunctionsController");
const routes = [
  {
    method: "POST",
    url: "/setThumbnail",
    handler: specialFunctionsController.setThumbnail,
  },
  {
    method: "GET",
    url: "/getThumbnail",
    handler: specialFunctionsController.getThumbnail,
  },
];
module.exports = routes;
