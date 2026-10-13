

let UIOutlinerButtonsState="info";

const UIOutlinerButtons = {
  width: 130,
  height: 25,
  spacing: 2,
  verticalOffset: 10,
  items: [
    { id: "pop", color: "yellow", originalColor:"yellow" },
    { id: "growth", color: "green", originalColor:"green"  },
    { id: "info", color: "blue", originalColor:"blue"  }
  ],
  positions: [] // Will store {x, y} for each button
};

function initializeUIOutlinerButtons(initialState = "info") {
  UIOutlinerButtonsState = initialState;
  // Reset all buttons to original colors first
  UIOutlinerButtons.items.forEach(item => {
    item.color = item.originalColor;
  });
  // Then highlight the active one
  const activeButton = UIOutlinerButtons.items.find(item => item.id === initialState);
  if (activeButton) activeButton.color = "white";
}

function drawUIOutlinerButtons(parentX, parentY, parentWidth,popImg,growthImg) {
	
	
  // Calculate positions
  const totalWidth = (UIOutlinerButtons.width) + (2 * UIOutlinerButtons.spacing);
  const startX = parentX + (parentWidth - totalWidth) / 2;
  const y = parentY + UIOutlinerButtons.verticalOffset;

  // Store positions for click detection
  UIOutlinerButtons.positions = UIOutlinerButtons.items.map((_, i) => ({
    x: startX + i * (UIOutlinerButtons.width + UIOutlinerButtons.spacing),
    y: y
  }));

  // Draw buttons and images
  UIOutlinerButtons.positions.forEach((pos, i) => {
    // Draw button background
    drawUIRectangle(
      pos.x,
      pos.y,
      UIOutlinerButtons.width,
      UIOutlinerButtons.height,
      UIOutlinerButtons.items[i].color
    );

    // Get corresponding image for this button
    let buttonImage;
    switch(UIOutlinerButtons.items[i].id) {
      case "pop":
        buttonImage = popImg;
        break;
      case "growth":
        buttonImage = growthImg ;
        break;
      case "info":
        buttonImage = infoImg;
        break;
    }

    // Center image on button (adjust 20,20 to your image size)
    if (buttonImage) {
		const imgSize = (hoveredButton === i) ? 24 : 20; 
      const imgX = pos.x + (UIOutlinerButtons.width - 20) / 2; // Center horizontally
      const imgY = pos.y + (UIOutlinerButtons.height - 20) / 2; // Center vertically
      uiCanvasContext.drawImage(buttonImage, imgX, imgY, 20, 20); // Draw image at 20x20 size
    }
  });
}