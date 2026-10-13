//save btn
let saveIconUIX=35;
let saveIconUIY=35;
let saveIcon= new Image();
saveIcon.src="Pics/uiIcons/saveIcon.png"

function drawSaveButton() {
    // Calculate square dimensions based on UIRadius
    const squareSize = UIRadius *1.5;
    const halfSize = squareSize / 2;
    
    // Save canvas state before clipping
    uiCanvasContext.save();

    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(
        saveIconUIX - halfSize,
        saveIconUIY - halfSize,
        squareSize,
        squareSize
    );
    uiCanvasContext.clip();

    // Draw image centered in the square
    uiCanvasContext.drawImage(
        saveIcon,
        saveIconUIX - halfSize,  // x position
        saveIconUIY - halfSize,  // y position
        squareSize,              // width
        squareSize               // height
    );

    // Restore canvas state
    uiCanvasContext.restore();

    // Draw square outline (outer border)
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(
        saveIconUIX - halfSize,
        saveIconUIY - halfSize,
        squareSize,
        squareSize
    );
    uiCanvasContext.strokeStyle = "black";
    uiCanvasContext.lineWidth = 4;
    uiCanvasContext.stroke();
}


function initSaveLoadCards(offsetX, offsetY, reducedWidth) {
    saveCards = [
        new SaveCard(offsetX, offsetY, reducedWidth, 100, "Save Game 1","Pics/uiIcons/saveIconActive.png"),
        new SaveCard(offsetX, offsetY+200, reducedWidth, 100, "Load Game 1","Pics/uiIcons/load.png")
    ];
}

function drawSaveLoadCards() {
    if (!saveGameMenuToggled) return;
    if (actorSelected) return;
    saveCards.forEach(card => card.draw());
}
