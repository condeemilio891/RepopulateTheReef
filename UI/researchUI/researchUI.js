
	
let researchMenuIconUIX=385;
let researchMenuIconUIY=35;
let researchMenuIcon= new Image();
researchMenuIcon.src="Pics/uiIcons/researchIcon.png";





function drawResearchMenuButton() {
    // Calculate square dimensions based on UIRadius
	
    const squareSize = UIRadius *1.5;
    const halfSize = squareSize / 2;
    
    // Save canvas state before clipping
    uiCanvasContext.save();

    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(
        researchMenuIconUIX - halfSize,
        researchMenuIconUIY - halfSize,
        squareSize,
        squareSize
    );
    uiCanvasContext.clip();

    // Draw image centered in the square
    uiCanvasContext.drawImage(
        researchMenuIcon,
        researchMenuIconUIX - halfSize,  // x position
        researchMenuIconUIY - halfSize,  // y position
        squareSize,              // width
        squareSize               // height
    );

    // Restore canvas state
    uiCanvasContext.restore();

    // Draw square outline (outer border)
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(
        researchMenuIconUIX - halfSize,
        researchMenuIconUIY - halfSize,
        squareSize,
        squareSize
    );
}

function drawResearchText() {
    if(actorSelected) return;
    
	if(!researchMenuToggled) return;
	
    let padding = 0;
    const x = 15;  
    const y = 125;  

    uiCanvasContext.textAlign = "left";   
    uiCanvasContext.textBaseline = "middle"; 
    uiCanvasContext.fillStyle = "gold";
    uiCanvasContext.font = "18px Arial";
    
	

    // Draw the text
    drawMultilineText(uiCanvasContext, "researchText" , x, y, 25);// utils

}

function toggleResearchMenu(evt){
	const { x: mouseXUI, y: mouseYUI } = getUICanvasCoords(evt);
	if(actorSelected===null){
		const halfSize = UIRadius / 2;
		if (mouseXUI > researchMenuIconUIX - halfSize && mouseXUI < researchMenuIconUIX + halfSize &&
			mouseYUI > researchMenuIconUIY - halfSize && mouseYUI < researchMenuIconUIY + halfSize) {
				if(!researchMenuToggled){
					researchMenuToggled=true
					researchMenuIcon.src = "Pics/uiIcons/researchIconActive.png";
					selectText = "Research";
					// make savegame and others false 
					saveGameMenuToggled=false;
					objectivesMenuToggled=false;
					saveIcon.src ="Pics/uiIcons/saveIcon.png"
					objectivesIcon.src="Pics/uiIcons/objectivesIcon.png";
					evolutionIcon.src = "Pics/uiIcons/evolutionIcon.png";
					evolutionMenuToggled=false;
				}else{
					researchMenuToggled=false;
					researchMenuIcon.src="Pics/uiIcons/researchIcon.png";
					selectText ="Corals" 
				}				
		}
	}
}


