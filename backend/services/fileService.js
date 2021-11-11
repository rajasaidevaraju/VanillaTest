const config = require("./../config.json");
function getFileData(id) {
  let filePath = Path.join(config.videoFolderPath, id);
  return new Promise((resolve, reject) => {
    fs.promises.access(filePath).then(() => {
      const stat = fs.statSync(filePath);
      const fileSize = stat.size;
      resolve(fileSize);
    });
  });
}

module.exports = { getFileData };
