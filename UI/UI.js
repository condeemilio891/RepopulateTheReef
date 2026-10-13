
let UIRadius=45;

function drawRectangle(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}


function drawSelectedUnitHungerBar(actorSelected){
	 const barWidth = 150;
    const barHeight = 10;
    const hungerBarX = hungerTextUIX;
    const hungerBarY = hungerTextUIY+10;
	
	    // Background Bar (Empty)
    uiCanvasContext.fillStyle = "grey";
    uiCanvasContext.fillRect(hungerBarX, hungerBarY, barWidth, barHeight);
	
	    // Fill (Hunger)
    const fillWidth = (actorSelected.hunger / 100) * barWidth;
    uiCanvasContext.fillStyle = actorSelected.hunger > 20 ? "yellow" : "red";  // Red if hunger is low
    uiCanvasContext.fillRect(hungerBarX, hungerBarY, fillWidth, barHeight);
	
	// Border
    uiCanvasContext.strokeStyle = "white";
    uiCanvasContext.strokeRect(hungerBarX, hungerBarY, barWidth, barHeight);
}

function drawSelectedUnitHealthBar(actorSelected){
	 const barWidth = 150;
    const barHeight = 10;
    const healthBarX = healthTextUIX;
    const healthBarY = healthTextUIY+10;
	
	    // Background Bar (Empty)
    uiCanvasContext.fillStyle = "grey";
    uiCanvasContext.fillRect(healthBarX, healthBarY, barWidth, barHeight);
	
	    // Fill (health)
    const fillWidth = (actorSelected.health / 100) * barWidth;
    uiCanvasContext.fillStyle = actorSelected.health > 20 ? "green" : "red";  // Red if health is low
    uiCanvasContext.fillRect(healthBarX, healthBarY, fillWidth, barHeight);
	
	// Border
    uiCanvasContext.strokeStyle = "white";
    uiCanvasContext.strokeRect(healthBarX, healthBarY, barWidth, barHeight);
}

function drawSelectedUnitStaminaBar(actorSelected){
	 const barWidth = 150;
    const barHeight = 10;
    const staminaBarX = staminaTextUIX;
    const staminaBarY = staminaTextUIY+10;
	
	    // Background Bar (Empty)
    uiCanvasContext.fillStyle = "grey";
    uiCanvasContext.fillRect(staminaBarX, staminaBarY, barWidth, barHeight);
	
	    // Fill (stamina)
    const fillWidth = (actorSelected.stamina / 1000) * barWidth;
    uiCanvasContext.fillStyle = actorSelected.stamina > 20 ? "green" : "red";  // Red if stamina is low
    uiCanvasContext.fillRect(staminaBarX, staminaBarY, fillWidth, barHeight);
	
	// Border
    uiCanvasContext.strokeStyle = "white";
    uiCanvasContext.strokeRect(staminaBarX, staminaBarY, barWidth, barHeight);
}
























function drawHungerBar(actorSelected) {
    const barWidth = 150;
    const barHeight = 20;
    const barX = actorSelected.x + actorSelected.width / 2 - barWidth / 2;
    const barY = actorSelected.y + actorSelected.height -50;
    
    // Background Bar (Empty)
    canvasContext.fillStyle = "grey";
    canvasContext.fillRect(barX, barY, barWidth, barHeight);
    
    // Fill (Hunger)
    const fillWidth = (actorSelected.hunger / 100) * barWidth;
    canvasContext.fillStyle = actorSelected.hunger > 20 ? "green" : "red";  // Red if hunger is low
    canvasContext.fillRect(barX, barY, fillWidth, barHeight);
    
    // Border
    canvasContext.strokeStyle = "white";
    canvasContext.strokeRect(barX, barY, barWidth, barHeight);
}

function drawHealthBar(actorSelected) {
    const barWidth = 150;
    const barHeight = 20;
    const barX = actorSelected.x + actorSelected.width / 2 - barWidth / 2;
    const barY = actorSelected.y + actorSelected.height + 10;
    
    // Background Bar (Empty)
    canvasContext.fillStyle = "grey";
    canvasContext.fillRect(barX, barY, barWidth, barHeight);
    
    // Fill (Hunger)
    const fillWidth = (actorSelected.health / 100) * barWidth;
    canvasContext.fillStyle = actorSelected.health > 20 ? "green" : "red";  // Red if hunger is low
    canvasContext.fillRect(barX, barY, fillWidth, barHeight);
    
    // Border
    canvasContext.strokeStyle = "white";
    canvasContext.strokeRect(barX, barY, barWidth, barHeight);
}
