let growthProgressBar; // Declare outside functions

function initGrowthProgressBar() {
  // Initialize once (positioned below "Growth" text)
  growthProgressBar = new CanvasProgressBar(
    uiCanvasContext,
    100,
    "green",
    25,   // x-position (left-aligned)
    535,  // y-position (below text)
    350,  // width
    15    // height
  );
}

function drawGrowthProgressBar(totalAmmonia, maxValue, growthText) {
  // Draw static text
  uiCanvasContext.fillStyle = "White";
  uiCanvasContext.font = "27px Arial";
  uiCanvasContext.fillText("Growth "+growthText, 212, 525);
  
  // Update and draw progress bar
  growthProgressBar.update(totalAmmonia,maxValue); // Pass current value
  growthProgressBar.draw();
}

function drawDetachProgressBar(totalAmmonia, maxValue, growthText) {
  // Draw static text
  uiCanvasContext.fillStyle = "White";
  uiCanvasContext.font = "27px Arial";
  uiCanvasContext.fillText("Detach From Hermit "+growthText, 212, 525);
  
  // Update and draw progress bar
  growthProgressBar.update(totalAmmonia,maxValue); // Pass current value
  growthProgressBar.draw();
}