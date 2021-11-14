const videoService = require("./../services/videoService");
const fileService = require("./../services/fileService");
const dbUtils = require("./../utility/DBUtility");
const config = require("./../config.json");
const fs = require("fs");
function getAllVideos(request, response) {
  dbUtils
    .getAllVideos()
    .then((result) => {
      response.send(result);
    })
    .catch((error) => {
      console.log(error);
      response
        .code(500)
        .send({ message: "oops! some issue occured in server" });
    });
}

function getVideo(request, response) {
  let id = request.query.id;
  if (id == null) {
    response.code(400).send({ message: "video id is not provided" });
  } else {
    dbUtils
      .getAbsolutePathForID(id)
      .then((filePath) => {
        videoService.getVideo(filePath, request).then((result) => {
          if (result.status == 200) {
            response.raw.writeHead(200, result.head);
            fs.createReadStream(result.filePath).pipe(response.raw);
          } else if (result.status == 206) {
            response.raw.writeHead(206, result.head);
            fs.createReadStream(result.filePath, {
              start: result.start,
              end: result.end,
            }).pipe(response.raw);
          }
        });
      })
      .catch((error) => {
        if (error.not) {
          response.code(404).send({ message: error.message });
        } else {
          console.log(error);
          response
            .code(500)
            .send({ message: "oops! some issue occured in server" });
        }
      });
  }
}

function getFileData(request, response) {
  //currently, id is video title or name
  let id = request.query.id;
  if (id == null) {
    response.code(400).send({ message: "file id is not provided" });
  } else {
    fileService
      .getFileData(id)
      .then()
      .catch((error) => {});
  }
}

function getVideoPage(request, response) {
  response.sendFile("videoPage.html");
}
module.exports = { getAllVideos, getVideo, getVideoPage, getFileData };
