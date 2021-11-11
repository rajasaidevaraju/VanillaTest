document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
  const firstTouch = evt.touches[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  /*most significant*/
  //console.log("xDown " + xDown);
  //console.log("xUp " + xUp);
  if (xDiff > 8) {
    console.log("right swipe");
    movePages(1);
    /* right swipe */
  } else if (xDiff < -8) {
    console.log("left swipe");
    movePages(-1);
    /* left swipe */
  }

  /* reset values */
  xDown = null;
  yDown = null;
}
