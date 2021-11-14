const config = require("./../config.json");
const fs = require("fs");
const Path = require("path");
const dbUtil = require("./../utility/DBUtility");

function getVideo(filePath, request) {
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
        reject({
          message: "video with the id does not exist in file system",
          not: true,
        });
      });
  });
}

module.exports = { getVideo };
