const thumbnailService = require("./../services/thumbnailService");
function setThumbnail(request, response) {
  let id = request.query.id;
  let data = request.body.replace(/^data:image\/\w+;base64,/, "");
  var imageData = Buffer.from(data, "base64");
  if (id == null) {
    response.code(400).send({ message: "video id is not provided" });
  } else {
    thumbnailService
      .setThumbnail(id, imageData)
      .then((result) => {
        response.send({ message: result.message, filePath: result.filePath });
      })
      .catch((error) => {
        console.log(error);
        response
          .code(500)
          .send({ message: "oops! some issue occured in server" });
      });
  }
}

module.exports = { setThumbnail };
