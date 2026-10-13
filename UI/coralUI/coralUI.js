
function drawOutlierIcon(x, y, pic, outlineColor, isHovered) {
    uiCanvasContext.save();
    
    const squareSize = UIRadius * 2;
    const squareX = x - UIRadius;
    const squareY = y - UIRadius;
    
    // Clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.clip();
    
    // Fill background based on hover state
    uiCanvasContext.fillStyle = isHovered ? "rgba(255,255,255,0.3)" : "black";
    uiCanvasContext.fillRect(squareX, squareY, squareSize, squareSize);
    
    // Draw the image
    uiCanvasContext.drawImage(pic, squareX, squareY, squareSize, squareSize);
    
    uiCanvasContext.restore();
    
    // Outline
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.strokeStyle = outlineColor;
    uiCanvasContext.lineWidth = 4;
    uiCanvasContext.stroke();
}