const config = require("./../config.json");
const fs = require("fs");
const Path = require("path");
function setThumbnail(id, imageData) {
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

function getThumbnail(id) {
  let filePath = Path.join(config.thumbnailFolderPath, id);
  let defaultThumbnailPath = Path.join(
    config.thumbnailFolderPath,
    config.defaultThumbnail
  );
  return new Promise((resolve, reject) => {
    fs.promises
      .access(filePath)
      .then(() => {
        resolve(fs.createReadStream(filePath));
        //resolve(fs.createReadStream(defaultThumbnailPath));
      })
      .catch(() => {
        resolve(fs.createReadStream(defaultThumbnailPath));
      });
  });
}
module.exports = { setThumbnail, getThumbnail };
