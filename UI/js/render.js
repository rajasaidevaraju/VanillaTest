function render() {
  let items = videoDataList.length;
  handlePageChangeForButton();
  cleanMainPage();
  let start = currentPage * config.itemsPerPage;
  let end = start + config.itemsPerPage - 1;
  if (end >= items) {
    end = items - 1;
  }

  while (start <= end) {
    let uiElement = createVideoUi(videoDataList[start]);
    document.getElementById("root").appendChild(uiElement);
    start++;
  }
}

function handlePageChangeForButton() {
  let maxPage = Math.ceil(videoDataList.length / config.itemsPerPage) - 1;
  if (currentPage == 0) {
    document.getElementById("previous").disabled = true;
  } else {
    document.getElementById("previous").disabled = false;
  }
  if (currentPage == maxPage) {
    document.getElementById("next").disabled = true;
  } else {
    document.getElementById("next").disabled = false;
  }
}

function cleanMainPage() {
  const myNode = document.getElementById("root");
  while (myNode.lastElementChild) {
    myNode.removeChild(myNode.lastElementChild);
  }
}
