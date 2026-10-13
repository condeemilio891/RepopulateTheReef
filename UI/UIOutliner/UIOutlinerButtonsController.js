

function handleOutlinerButtonClick(evt) {
  // Convert event to canvas drawing coordinates
  const { x: clickX, y: clickY } = getUICanvasCoords(evt);
  
  let clickedIndex = -1;

  // Find which button was clicked
  UIOutlinerButtons.positions.forEach((pos, i) => {
    if (clickX > pos.x && 
        clickX < pos.x + UIOutlinerButtons.width &&
        clickY > pos.y &&
        clickY < pos.y + UIOutlinerButtons.height) {
      clickedIndex = i;
    }
  });
  
  // Only proceed if a button was actually clicked
  if (clickedIndex !== -1) {
    // Reset all buttons to their original colors
	// default is info so make info selected 
    UIOutlinerButtons.items.forEach((item) => {
      item.color = item.originalColor || item.color;
    });

    // Highlight the clicked button
    const clickedItem = UIOutlinerButtons.items[clickedIndex];
    clickedItem.color = "white";

    // Update state
    UIOutlinerButtonsState = clickedItem.id;
    console.log("Clicked:", UIOutlinerButtonsState);
  }
  // If clicked outside, do nothing – keep current selection
}

/* function handleHoverInfoButtons(evt){
	const rect = uiCanvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  hoveredButton = UIOutlinerButtons.positions.findIndex(pos => 
    mouseX > pos.x && 
    mouseX < pos.x + UIOutlinerButtons.width &&
    mouseY > pos.y && 
    mouseY < pos.y + UIOutlinerButtons.height
	)
	//console.log("h"+hoveredButton)
} */

