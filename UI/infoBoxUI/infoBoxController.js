

function handleInfoBoxClick(evt) {
  const rect = uiCanvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;

  infoBoxButtons.positions.forEach((pos, i) => {
    if (clickX > pos.x && 
        clickX < pos.x + infoBoxButtons.width &&
        clickY > pos.y &&
        clickY < pos.y + infoBoxButtons.height) {
          
      // Update button state
      infoBoxButtons.items[i].color = "darkgreen";
      
      // Update info box state
      infoBoxState = infoBoxButtons.items[i].id;
      
      // Add your button-specific logic here
      console.log("Clicked:", infoBoxState);
    }
  });
}
function handleHoverInfoButtons(evt){
	const rect = uiCanvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  hoveredButton = infoBoxButtons.positions.findIndex(pos => 
    mouseX > pos.x && 
    mouseX < pos.x + infoBoxButtons.width &&
    mouseY > pos.y && 
    mouseY < pos.y + infoBoxButtons.height
	)
	//console.log("h"+hoveredButton)
}
function resetInfoBox() {
  infoBoxState = "storage";
  infoBoxButtons.items.forEach(btn => btn.color = "green");
}