let config = require("../../config.json");
function getRootPath() {
  let platform = process.platform;
  if (platform === "linux") {
    return config.linuxRootPath;
  } else {
    return config.windowsRootPath;
  }
}

module.exports = { getRootPath };
