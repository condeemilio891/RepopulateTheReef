
let CCNeededText=0
//Objectives Btn
let objectivesIconUIX=100;
let objectivesIconUIY=35;
let objectivesIcon= new Image();
objectivesIcon.src="Pics/uiIcons/objectivesIcon.png";

function drawObjectivesButton() {
    // Calculate square dimensions based on UIRadius
    const squareSize = UIRadius *1.5;
    const halfSize = squareSize / 2;
    
    // Save canvas state before clipping
    uiCanvasContext.save();

    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(
        objectivesIconUIX - halfSize,
        objectivesIconUIY - halfSize,
        squareSize,
        squareSize
    );
    uiCanvasContext.clip();

    // Draw image centered in the square
    uiCanvasContext.drawImage(
        objectivesIcon,
        objectivesIconUIX - halfSize,  // x position
        objectivesIconUIY - halfSize,  // y position
        squareSize,              // width
        squareSize               // height
    );

    // Restore canvas state
    uiCanvasContext.restore();

    // Draw square outline (outer border)
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(
        objectivesIconUIX - halfSize,
        objectivesIconUIY - halfSize,
        squareSize,
        squareSize
    );
    uiCanvasContext.strokeStyle = "black";
    uiCanvasContext.lineWidth = 4;
    uiCanvasContext.stroke();
}


function toggleObjectivesMenu(evt){
	const { x: mouseXUI, y: mouseYUI } = getUICanvasCoords(evt);
	if(actorSelected===null){
		const halfSize = UIRadius / 2;
		if (mouseXUI > objectivesIconUIX - halfSize && mouseXUI < objectivesIconUIX + halfSize &&
			mouseYUI > objectivesIconUIY - halfSize && mouseYUI < objectivesIconUIY + halfSize) {
				if(!objectivesMenuToggled){
					objectivesMenuToggled=true
					objectivesIcon.src = "Pics/uiIcons/objectivesIconActive.png";
					selectText="Objectives"
					// make savegame and others false 
					saveGameMenuToggled=false;
					saveIcon.src ="Pics/uiIcons/saveIcon.png"
					evolutionMenuToggled=false;
					evolutionIcon.src="Pics/uiIcons/evolutionIcon.png"
					researchMenuToggled=false;
					researchMenuIcon.src="Pics/uiIcons/researchIcon.png";
				}else{
					objectivesMenuToggled=false;
					objectivesIcon.src="Pics/uiIcons/objectivesIcon.png";
					selectText ="Corals" 
				}				
		}
	}
}




function drawObjectivesText1() {
    if (actorSelected) return;
    
	if(!objectivesMenuToggled) return;
	
    let padding = 0;
    const x = 15;  
    const y = 125;  

    uiCanvasContext.textAlign = "left";   
    uiCanvasContext.textBaseline = "middle"; 
    uiCanvasContext.fillStyle = "gold";
    uiCanvasContext.font = "22px Arial";
    
    
    // Draw the text
	drawMultilineText(uiCanvasContext, "Do Not Let Coral Brain Coral Die", x, y, 30);

	const fullText = "Lay " + (parseInt(CCNeededText/50 ?? "")) + (" Limestone To Increase\nCoral Capacity" ?? ""); // just in case null;
	
	drawMultilineText(uiCanvasContext, fullText, x, 200, 30)
	
}

function drawObjectivesText2() {
    if (actorSelected) return;
    
	if(!objectivesMenuToggled) return;
	
    let padding = 0;
    const x = 15;  
    const y = 325;  

    uiCanvasContext.textAlign = "left";   
    uiCanvasContext.textBaseline = "middle"; 
    uiCanvasContext.fillStyle = "gold";
    uiCanvasContext.font = "22px Arial";
    
    // Build the full string
    const fullText = "Stop Pipe Coral From Bleaching\nHint: Use Crab to Collect Algae"
    
    // Draw the text
    drawMultilineText(uiCanvasContext, fullText, x, y, 30)
    uiCanvasContext.fillStyle="pink";
	uiCanvasContext.fillText("Reward: Tiny Pipe Coral",x,385);
}


function drawObjectivesText3() {
    if (actorSelected) return;
    
	if(!objectivesMenuToggled) return;
	
    let padding = 0;
    const x = 15;  
    const y = 425;  

    uiCanvasContext.textAlign = "left";   
    uiCanvasContext.textBaseline = "middle"; 
    uiCanvasContext.fillStyle = "gold";
    uiCanvasContext.font = "22px Arial";
    
    // Build the full string
    const fullText = "Spawn Damselfish To Protect Shrimp"
    
    // Draw the text
    uiCanvasContext.fillText(fullText, x, y);
    uiCanvasContext.fillStyle="pink";
	uiCanvasContext.fillText("Reward: +500 Research",x,455);
    
}


function drawObjectivesText4() {
    if (actorSelected) return;
    
	if(!objectivesMenuToggled) return;
	
    let padding = 0;
    const x = 15;  
    const y = 525;  

    uiCanvasContext.textAlign = "left";   
    uiCanvasContext.textBaseline = "middle"; 
    uiCanvasContext.fillStyle = "gold";
    uiCanvasContext.font = "22px Arial";

    
    // Build the full string
   
    
    // Draw the text
    uiCanvasContext.fillText("Grow and Plant Anemone From Hermit Crab", x, y);
    
    uiCanvasContext.fillStyle="pink";
	uiCanvasContext.fillText("Reward: One Free Tiny Coral",x,555);

}

function drawObjectivesText5() {
    if (actorSelected) return;
    
	if(!objectivesMenuToggled) return;
	
    let padding = 0;
    const x = 15;  
    const y = 625;  

    uiCanvasContext.textAlign = "left";   
    uiCanvasContext.textBaseline = "middle"; 
    uiCanvasContext.fillStyle = "gold";
    uiCanvasContext.font = "22px Arial";

    
    // Build the full string
   
    
    // Draw the text
    uiCanvasContext.fillText("Undergow 3 Evolutions", x, y);
    
    uiCanvasContext.fillStyle="pink";
	uiCanvasContext.fillText("Reward: One Free Tiny Coral",x,655);

}