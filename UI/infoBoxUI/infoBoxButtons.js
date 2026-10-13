
let infoBoxState="storage";


let hoveredButton=null;

let statsImg=new Image();
statsImg.src="Pics/heart.png";

let storageImg=new Image();
storageImg.src="Pics/storageRack.png";

let infoImg=new Image();
infoImg.src="Pics/info.png";

const infoBoxButtons = {
  width: 70,
  height: 25,
  spacing: 2,
  verticalOffset: 10,
  items: [
    { id: "stats", color: "green" },
    { id: "storage", color: "green" },
    { id: "info", color: "green" }
  ],
  positions: [] // Will store {x, y} for each button
};


function drawInfoButtons(parentX, parentY, parentWidth) {
  // Calculate positions
  const totalWidth = (3 * infoBoxButtons.width) + (2 * infoBoxButtons.spacing);
  const startX = parentX + (parentWidth - totalWidth) / 2;
  const y = parentY + infoBoxButtons.verticalOffset;

  // Store positions for click detection
  infoBoxButtons.positions = infoBoxButtons.items.map((_, i) => ({
    x: startX + i * (infoBoxButtons.width + infoBoxButtons.spacing),
    y: y
  }));

  // Draw buttons and images
  infoBoxButtons.positions.forEach((pos, i) => {
    // Draw button background
    drawUIRectangle(
      pos.x,
      pos.y,
      infoBoxButtons.width,
      infoBoxButtons.height,
      infoBoxButtons.items[i].color
    );

    // Get corresponding image for this button
    let buttonImage;
    switch(infoBoxButtons.items[i].id) {
      case "stats":
        buttonImage = statsImg;
        break;
      case "storage":
        buttonImage = storageImg;
        break;
      case "info":
        buttonImage = infoImg;
        break;
    }

    // Center image on button (adjust 20,20 to your image size)
    if (buttonImage) {
		const imgSize = (hoveredButton === i) ? 24 : 20; 
      const imgX = pos.x + (infoBoxButtons.width - 20) / 2; // Center horizontally
      const imgY = pos.y + (infoBoxButtons.height - 20) / 2; // Center vertically
      uiCanvasContext.drawImage(buttonImage, imgX, imgY, 20, 20); // Draw image at 20x20 size
    }
  });
}