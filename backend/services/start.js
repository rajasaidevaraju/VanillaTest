var os = require("os");

function onStart(port) {
  var interfaces = os.networkInterfaces();
  var addresses = [];
  for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
      var address = interfaces[k][k2];
      if (address.family === "IPv4" && !address.internal) {
        console.log("Node Running at : http://" + address.address + ":" + port);
      }
    }
  }
}

module.exports.onStart = onStart;
