let epigeneticsText = "Phosphorylation and Methylation are dynamic\n" +
    "Switches that regulate protein function and\n" +
    "Gene expression, allowing an organism to\n" +
    "Change within its lifetime without altering its DNA.";
    
	
let evolutionIconUIX=315;
let evolutionIconUIY=35;
let evolutionIcon= new Image();
evolutionIcon.src="Pics/uiIcons/evolutionIcon.png";

let biotoxinIcon=new Image();
biotoxinIcon.src= "Pics/epigeneticIcons/biotoxinResIcon.png"
let epigeneticIcon1UIX=120;
let epigeneticIcon1UIY=250;

let clickCommunicationIcon=new Image();
clickCommunicationIcon.src="Pics/epigeneticIcons/clickCommunication.png";
let epigeneticIcon2UIX=200;
let epigeneticIcon2UIY=250;






function drawEvolutionButton() {
    // Calculate square dimensions based on UIRadius
	
    const squareSize = UIRadius *1.5;
    const halfSize = squareSize / 2;
    
    // Save canvas state before clipping
    uiCanvasContext.save();

    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(
        evolutionIconUIX - halfSize,
        evolutionIconUIY - halfSize,
        squareSize,
        squareSize
    );
    uiCanvasContext.clip();

    // Draw image centered in the square
    uiCanvasContext.drawImage(
        evolutionIcon,
        evolutionIconUIX - halfSize,  // x position
        evolutionIconUIY - halfSize,  // y position
        squareSize,              // width
        squareSize               // height
    );

    // Restore canvas state
    uiCanvasContext.restore();

    // Draw square outline (outer border)
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(
        evolutionIconUIX - halfSize,
        evolutionIconUIY - halfSize,
        squareSize,
        squareSize
    );
}


function toggleEvolutionMenu(evt){
	const { x: mouseXUI, y: mouseYUI } = getUICanvasCoords(evt);
	if(actorSelected===null){
		const halfSize = UIRadius / 2;
		if (mouseXUI > evolutionIconUIX - halfSize && mouseXUI < evolutionIconUIX + halfSize &&
			mouseYUI > evolutionIconUIY - halfSize && mouseYUI < evolutionIconUIY + halfSize) {
				if(!evolutionMenuToggled){
					evolutionMenuToggled=true
					evolutionIcon.src = "Pics/uiIcons/evolutionIconActive.png";
					selectText = "Epigenetic\nUpgrades";
					// make savegame and others false 
					saveGameMenuToggled=false;
					objectivesMenuToggled=false;
					saveIcon.src ="Pics/uiIcons/saveIcon.png"
					objectivesIcon.src="Pics/uiIcons/objectivesIcon.png";
					researchMenuToggled=false;
					researchMenuIcon.src="Pics/uiIcons/researchIcon.png";
				}else{
					evolutionMenuToggled=false;
					evolutionIcon.src="Pics/uiIcons/evolutionIcon.png";
					selectText ="Corals" 
				}				
		}
	}
}



function drawEvolutionText() {
    if(actorSelected) return;
    
	if(!evolutionMenuToggled) return;
	
    let padding = 0;
    const x = 15;  
    const y = 125;  

    uiCanvasContext.textAlign = "left";   
    uiCanvasContext.textBaseline = "middle"; 
    uiCanvasContext.fillStyle = "gold";
    uiCanvasContext.font = "18px Arial";
    
	

    // Draw the text
    drawMultilineText(uiCanvasContext, epigeneticsText , x, y, 25);// utils

}


function drawBiotoxinResUpgrade() {
	
	if(actorSelected) return;
    
	if(!evolutionMenuToggled) return;
    // Calculate square dimensions based on UIRadius
	
    const squareSize = UIRadius *1.5;
    const halfSize = squareSize / 2;
    
    // Save canvas state before clipping
    uiCanvasContext.save();

    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(
        epigeneticIcon1UIX - halfSize,
        epigeneticIcon1UIY - halfSize,
        squareSize,
        squareSize
    );
    uiCanvasContext.clip();

    // Draw image centered in the square
    uiCanvasContext.drawImage(
        biotoxinIcon,
        epigeneticIcon1UIX - halfSize,  // x position
        epigeneticIcon1UIY - halfSize,  // y position
        squareSize,              // width
        squareSize               // height
    );

    // Restore canvas state
    uiCanvasContext.restore();

    // Draw square outline (outer border)
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(
        epigeneticIcon1UIX - halfSize,
        epigeneticIcon1UIY - halfSize,
        squareSize,
        squareSize
    );
    uiCanvasContext.strokeStyle = "white";
    uiCanvasContext.lineWidth = 4;
    uiCanvasContext.stroke();
}

function drawClickCommunicationUpgrade() {
	
	if(actorSelected) return;
    
	if(!evolutionMenuToggled) return;
    // Calculate square dimensions based on UIRadius
	
    const squareSize = UIRadius *1.5;
    const halfSize = squareSize / 2;
    
    // Save canvas state before clipping
    uiCanvasContext.save();

    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(
        epigeneticIcon2UIX - halfSize,
        epigeneticIcon2UIY - halfSize,
        squareSize,
        squareSize
    );
    uiCanvasContext.clip();

    // Draw image centered in the square
    uiCanvasContext.drawImage(
        clickCommunicationIcon,
        epigeneticIcon2UIX - halfSize,  // x position
        epigeneticIcon2UIY - halfSize,  // y position
        squareSize,              // width
        squareSize               // height
    );

    // Restore canvas state
    uiCanvasContext.restore();

    // Draw square outline (outer border)
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(
        epigeneticIcon2UIX - halfSize,
        epigeneticIcon2UIY - halfSize,
        squareSize,
        squareSize
    );
    uiCanvasContext.strokeStyle = "white";
    uiCanvasContext.lineWidth = 4;
    uiCanvasContext.stroke();
}