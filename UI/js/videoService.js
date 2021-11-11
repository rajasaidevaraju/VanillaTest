var uiData = {};
var currentPage = 0;
var videoDataList = [];
function requestVideoList() {
  fetch(config.serverPath + config.getAllVideosPath)
    .then((response) => response.json())
    .then((videoData) => {
      videoDataList = videoData;
      render();
    });
}

function createVideoUi(data) {
  if (uiData[data.id] != null) {
    return uiData[data.id];
  }

  let uiElement = document.createElement("div");
  uiElement.classList.add("basicButton");
  uiElement.classList.add("videoSection");
  uiElement.onclick = () => openNewTab(data.id);
  let image = document.createElement("img");
  image.src = "./image/notAvail.jpg";
  image.width = config.imageWidth;
  image.height = config.imageHeight;
  image.alt = "sample image";
  let text = document.createElement("p");
  text.textContent = data.id;
  text.style = "word-wrap: break-word ;font-weight:bold";

  uiElement.appendChild(image);
  uiElement.appendChild(text);
  return uiElement;
}

function openNewTab(id) {
  //let url = config.serverPath + config.getVideoPath + id;
  let url = config.serverPath + config.getVideoPagePath + id;
  let win = window.open(url, "_blank");
  win.focus();
}
