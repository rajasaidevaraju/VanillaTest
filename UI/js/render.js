function render(margin) {
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
  document.getElementById("main").scrollTop = 0;
  handleAnimation(margin);
}

function handleAnimation(margin) {
  let element = document.getElementById("root");
  cleanAnimation(element);
  if (margin > 0) {
    element.classList.add("root--moveLeft");
  } else if (margin < 0) {
    element.classList.add("root--moveRight");
  }
}
function cleanAnimation(element) {
  element.onanimationend = () => {
    element.classList.remove("root--moveLeft");
    element.classList.remove("root--moveRight");
  };
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
