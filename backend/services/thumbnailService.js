const config = require("./../config.json");
const fs = require("fs");
const Path = require("path");
function setThumbnail(id, imageData) {
  id = id.replace(".mp4", ".jpeg");
  let filePath = Path.join(config.thumbnailFolderPath, id);
  return new Promise((resolve, reject) => {
    fs.promises
      .writeFile(filePath, imageData, { flag: "w" })
      .then(() => {
        resolve({ message: "file create successfully", filePath });
      })
      .catch((err) => {
        reject({
          message: "could not create thumbnail file for video " + id,
          error: err,
        });
      });
  });
}

module.exports = { setThumbnail };
