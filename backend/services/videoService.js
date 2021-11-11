const config = require("./../config.json");
const fs = require("fs");
const Path = require("path");
function getAllVideos() {
  return new Promise((resolve, reject) => {
    fs.promises
      .readdir(config.videoFolderPath)
      .then((fileNames) => {
        var fileNamesList = [];
        fileNamesList = fileNames
          .map(function (fileName) {
            return {
              title: fileName,
              time: fs
                .statSync(config.videoFolderPath + "/" + fileName)
                .mtime.getTime(),
              id: fileName,
            };
          })
          .sort(function (a, b) {
            return b.time - a.time;
          })
          .filter(function (e) {
            return (
              e.title.indexOf(".mp4") !== -1 || e.title.indexOf(".mkv") !== -1
            );
          });
        resolve({ fileNamesList: fileNamesList });
      })
      .catch((error) => {
        reject({ error: error });
      });
  });
}

function getVideo(id, request) {
  let filePath = Path.join(config.videoFolderPath, id);
  return new Promise((resolve, reject) => {
    fs.promises
      .access(filePath)
      .then(() => {
        const stat = fs.statSync(filePath);
        const fileSize = stat.size;
        const range = request.headers.range;
        if (range) {
          const parts = range.replace(/bytes=/, "").split("-");
          const start = parseInt(parts[0], 10);
          const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

          const chunksize = end - start + 1;
          const head = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": "video/mp4",
          };
          resolve({ status: 206, head, filePath, start, end });
        } else {
          const head = {
            "Content-Length": fileSize,
            "Content-Type": "video/mp4",
          };
          resolve({ status: 200, head, filePath });
        }
      })
      .catch(() => {
        reject({ message: "video with the id does not exist", not: true });
      });
  });
}

module.exports = { getAllVideos, getVideo };
