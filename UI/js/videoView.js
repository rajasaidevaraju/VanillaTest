function loadVideoAndData() {
  loadVideo();
  //loadData();
}

function loadVideo() {
  let source = document.createElement("source");
  let id = getVideoId();
  source.src = config.serverPath + config.getVideoPath + id;
  source.type = "video/mp4";
  document.getElementById("video").appendChild(source);
}

function loadData() {
  let id = getVideoId();
  fetch(config.serverPath + config.getFileData + id)
    .then((response) => response.json())
    .then((videoData) => {
      console.log(videoData);
    });
}
function getVideoId() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  return params.id;
}

function captureScreenShot() {
  let video = document.getElementById("video");
  let canvas = document.createElement("canvas");
  canvas.width = 150;
  canvas.height = 150;
  let ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  let dataURI = canvas.toDataURL("image/jpeg");
  sendImage(dataURI);
}

function sendImage(imageData) {
  let id = getVideoId();
  path = config.serverPath + config.setThumbnail + id;
  fetch(path, {
    method: "POST",
    body: imageData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}
