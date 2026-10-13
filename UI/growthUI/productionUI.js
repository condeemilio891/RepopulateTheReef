let productionProgressBar; // Declare outside functions

function initProductionProgressBar() {
  // Initialize once (positioned below "Growth" text)
  productionProgressBar = new CanvasProgressBar(
    uiCanvasContext,
    100,
    "pink",
    25,   // x-position (left-aligned)
    590,  // y-position (below text)
    350,  // width
    15    // height
  );
}

function drawProductionProgressBar(totalResource, maxValue, productionText) {
  // Draw static text
  uiCanvasContext.fillStyle = "White";
  uiCanvasContext.font = "27px Arial";
  uiCanvasContext.fillText(productionText, 212, 575); // use CC for now
  
  // Update and draw progress bar
  productionProgressBar.update(totalResource,maxValue); // Pass current value
  productionProgressBar.draw();
}