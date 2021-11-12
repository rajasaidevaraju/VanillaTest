function movePages(margin) {
  let maxPage = Math.ceil(videoDataList.length / config.itemsPerPage) - 1;
  if (margin < 0 && currentPage == 0) {
    return;
  }
  if (margin > 0 && currentPage == maxPage) {
    return;
  }
  currentPage = currentPage + margin;
  render(margin);
}
