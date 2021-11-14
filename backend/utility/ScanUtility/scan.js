const platform = require("./platform");
const { promises: fs } = require("fs");
const { getVideoDurationInSeconds } = require("get-video-duration");
const path = require("path");
async function scanFolders() {
  let baseFolder = platform.getRootPath();
  let result = await getFilesAndStats(baseFolder);
  return result;
}

async function getFilesAndStats(sourceFolder) {
  if (
    sourceFolder.includes("$RECYCLE.BIN") ||
    sourceFolder.includes("System Volume Information")
  ) {
    return [];
  }
  const entries = await fs.readdir(sourceFolder, { withFileTypes: true });
  const files = await Promise.all(
    entries
      .filter((file) => !file.isDirectory() && file.name.includes(".mp4"))
      .map(async (file) => {
        let obj = {
          title: file.name,
          absolutePath: path.join(sourceFolder, file.name),
        };
        let stat = await fs.stat(obj.absolutePath);
        //size is in bytes. converting to mega bytes
        obj.size = (stat.size / (1024 * 1024)).toFixed(2);

        obj.createdDate = stat.birthtimeMs == 0 ? stat.mtime : stat.birthtime;

        obj.createdDate = obj.createdDate.toISOString().split("T")[0];
        //return results in seconds
        let seconds = await getVideoDurationInSeconds(obj.absolutePath);
        let minutes = Math.floor(seconds / 60);
        seconds = Math.floor(((seconds / 60) % 10) * 60);
        //keep only first 2 digits in seconds
        seconds = (seconds + "").substr(0, 2);
        obj.duration = minutes + ":" + seconds;
        return obj;
      })
  );
  const folders = entries.filter((folder) => folder.isDirectory());
  for (const folder of folders) {
    files.push(
      ...(await getFilesAndStats(path.join(sourceFolder, folder.name)))
    );
  }
  return files;
}
module.exports = { scanFolders };
