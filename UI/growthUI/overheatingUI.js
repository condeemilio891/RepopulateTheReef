let overheatingProgressBar; // Declare outside functions

function initOverheatingProgressBar() {
  // Initialize once (positioned below "Growth" text)
  overheatingProgressBar = new CanvasProgressBar(
    uiCanvasContext,
    100,
    "red",
    25,   // x-position (left-aligned)
    650,  // y-position (below text)
    350,  // width
    10    // height
  );
}

function drawOverheatingProgressBar(totalResource, maxValue, overheatingText) {
  // Draw static text
  uiCanvasContext.fillStyle = "White";
  uiCanvasContext.font = "24px Arial";
  uiCanvasContext.fillText(overheatingText, 212, 625); // use CC for now
  
  // Update and draw progress bar
  overheatingProgressBar.update(totalResource,maxValue); // Pass current value
  overheatingProgressBar.draw();
}