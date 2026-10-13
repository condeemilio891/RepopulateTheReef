let selectText="";


let subText = " Coral Capacity " 

let alertText="W,A,S,D to Pan Camera, 'B' for Build Menu\n'C' for Corals";


let currStateTextUIX=(UIRadius*3)+15;
let currStateTextUIY=120; 


let selectedTextUIY=25;


    const reducedWidth = uiCanvas.width * 0.95; 
    const reducedHeight = uiCanvas.height * 0.75;
    const offsetX = (uiCanvas.width - reducedWidth) / 2; 
    const offsetY = (uiCanvas.height - reducedHeight) / 2; 

   const outlinerButtonsY=(uiCanvas.height - reducedHeight) * 2.3; 
   const outlinerButtonsX=(uiCanvas.width -reducedWidth)/4;
   const outlinerButtonWidth=uiCanvas.width/3






function drawUIOutliner() {
	
	
	// uiCanvasContext.clearRect(0, 0, uiCanvas.width, uiCanvas.height);// clear again if we need to. 
	
    // Calculate new dimensions
    
	if(objectivesMenuToggled || evolutionMenuToggled || researchMenuToggled){
		drawUIRectangle(offsetX, offsetY, reducedWidth, reducedHeight, "Black")
	
	}else{
		drawEmeraldUIRectangle(offsetX, offsetY, reducedWidth, reducedHeight, "#006992");		
	}
	drawAllCoralCards() ;
	drawSelectedUnitText();
	drawSubtitleText();
	drawAlertText();
	drawInfoBox();
	drawTime();
	//saving
	drawSaveButton();
	drawSaveLoadCards();
	//objectives
	drawObjectivesButton();
	drawObjectivesText1();
	drawObjectivesText2();
	drawObjectivesText3();
	drawObjectivesText4();
	drawObjectivesText5();
	//Evolution
	if(actorSelected===null){
		drawEvolutionButton();
		drawEvolutionText();
		drawResearchMenuButton();
	}
	//EpigeneticIcons
	drawBiotoxinResUpgrade();
	drawClickCommunicationUpgrade();
	//Research Menu 

	drawResearchText();
}


function drawUIRectangle(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
    uiCanvasContext.fillStyle = fillColor;
    uiCanvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}


function drawEmeraldUIRectangle(topLeftX, topLeftY, boxWidth, boxHeight) {
    // Calculate center position (top center)
    const centerX = topLeftX + boxWidth / 2;
    const centerY = topLeftY/ 2;

    // Create radial gradient
    const gradient = uiCanvasContext.createRadialGradient(
        centerX, centerY, 0,               // Start circle (top center, 0 radius)
        centerX, centerY, boxHeight/1.3,  // End circle (larger radius)
    );
    
    // Add color stops (emerald green to black)
    gradient.addColorStop(0.05, '#000000');    
	gradient.addColorStop(0.12, '#0A5E2A');    
	gradient.addColorStop(0.5, '#50C878');    
    gradient.addColorStop(0.85,'#0A5E2A');  
    gradient.addColorStop(1, '#000000');     // Pure black

    // Apply gradient and draw rectangle
    uiCanvasContext.fillStyle = gradient;
    uiCanvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}



function drawSelectedUnitText() {
	let padding = 150;  // distance from right edge
	if(selectText===""){
		padding=175;
		selectText = getNumberOfCorals()+" Corals";
	}
   
    const x = padding;  
    const y = selectedTextUIY;  

    uiCanvasContext.textAlign = "left";   
    uiCanvasContext.textBaseline = "middle"; 
    uiCanvasContext.fillStyle = "gold";
    uiCanvasContext.font = "25px Arial";
   
	drawMultilineText(uiCanvasContext, selectText, x, y, 25);// utils
}

function getNumberOfCorals() {
	if (!resourceData?.coralCapacity) return;
    for (const resource in resourceData) {
        if (resource === "coralCapacity") {
            const resourceInfo = resourceData[resource];
            
			return resourceInfo.total
        }
    }
	
}


function drawSubtitleText() {
    if (actorSelected) return;
    
	if(saveGameMenuToggled||objectivesMenuToggled) return;
	
	let coralCapacity=0;
    let padding = 210;
    const x = padding;  
    const y = 85;  
	for(const resource in resourceData){
		if(resource==="coralCapacity"){
			const resourceInfo=resourceData[resource]
			coralCapacity=resourceInfo.totalCapacity
		}
	}

    uiCanvasContext.textAlign = "center";   
    uiCanvasContext.textBaseline = "middle"; 
    uiCanvasContext.fillStyle = "gold";
    uiCanvasContext.font = "22px Arial";
    
    // Build the full string
    const fullText = coralCapacity + (subText ?? "") ; // just in case null; // 
    
    // Draw the text
	if(evolutionMenuToggled){
		uiCanvasContext.fillText("Change Gene Expression", x, y);
		return// to avoid Icon draw
	}
	else if(researchMenuToggled){
		uiCanvasContext.fillText("Choose Research", x, y);
		return
	}
	else{
		uiCanvasContext.fillText(fullText, x, y);
	}
    
    
    // Measure the text width in pixels
    const textWidth = uiCanvasContext.measureText(fullText).width;
    
    // Position icon right after the text (add a small gap, e.g., 5px)
    const iconX = x + textWidth -45;
    const iconY = y - 15; // adjust to vertically center icon relative to text (icon is 50x50, text is ~17px)
	
    uiCanvasContext.drawImage(coralCapacityIcon, iconX, iconY, 30, 30);
}






function drawAlertText() {
	let padding = 20;  // distance from right edge
   
    const x = padding;  
    const y = 730;  

    uiCanvasContext.textAlign = "left";   
    uiCanvasContext.textBaseline = "middle"; 
    uiCanvasContext.fillStyle = "white";
    uiCanvasContext.font = "20px Arial";
	drawMultilineText(uiCanvasContext, alertText, x, y,18);
   
}








function drawCurrStateText(stateText){
	uiCanvasContext.textAlign = "left"; 
	
    uiCanvasContext.font = "22px Arial";
	drawMultilineText(uiCanvasContext, stateText, currStateTextUIX, currStateTextUIY, 25);
}


function drawSelectedActorProfilePic(profilePic){
	
	
	 // Save canvas state before clipping
    uiCanvasContext.save();

    // Define square dimensions
    const squareSize = UIRadius * 3;
    const squareX = 50 - UIRadius;
    const squareY = 50 - UIRadius;

    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.clip();

    // Set fill color based on hover state
    uiCanvasContext.fillStyle = "black";
    uiCanvasContext.fillRect(squareX, squareY, squareSize, squareSize);

    // Draw the mantis shrimp image on top
    uiCanvasContext.drawImage(profilePic, squareX, squareY, squareSize, squareSize);

    // Restore canvas to remove clipping path
    uiCanvasContext.restore();

    // Draw the square outline (outer border)
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.strokeStyle = "white";  // Square color
    uiCanvasContext.lineWidth = 4;  // Square thickness
    uiCanvasContext.stroke();
}


// Health, stamina and hunger icons 



function drawHealthIcon(healthText){
	
	
	 // Save canvas state before clipping
    uiCanvasContext.save();

    // Define square dimensions
    const squareSize = UIRadius/1.1;
    const squareX = 150;
    const squareY = 40;
	const centerTextX=squareX+20;
	const centerTextY=squareY+20;

	

    
    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.clip();

    // Set fill color based on hover state
   // uiCanvasContext.fillStyle = "black";
   // uiCanvasContext.fillRect(squareX, squareY, squareSize, squareSize);

    
	uiCanvasContext.textAlign = "center";
    uiCanvasContext.drawImage(healthIcon, squareX, squareY, squareSize, squareSize);
	uiCanvasContext.fillStyle = "white";
	uiCanvasContext.font = "15px Arial";
	uiCanvasContext.fillText(healthText, centerTextX, centerTextY);

    // Restore canvas to remove clipping path
    uiCanvasContext.restore();

}

function drawHungerIcon(hungerText){
	
	
	 // Save canvas state before clipping
    uiCanvasContext.save();

    // Define square dimensions
    const squareSize = UIRadius/1.1;
    const squareX = 200;
    const squareY = 40;
	const centerTextX=squareX+20;
	const centerTextY=squareY+20;
    
    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.clip();

    // Set fill color based on hover state
    //uiCanvasContext.fillStyle = "#000000";
    //uiCanvasContext.fillRect(squareX, squareY, squareSize, squareSize);

    // Draw the mantis shrimp image on top
	uiCanvasContext.textAlign = "center";
    uiCanvasContext.drawImage(hungerIcon, squareX, squareY, squareSize, squareSize);
	uiCanvasContext.fillStyle = "white";
	uiCanvasContext.font = "15px Arial";
	uiCanvasContext.fillText(hungerText, centerTextX, centerTextY);

    // Restore canvas to remove clipping path
    uiCanvasContext.restore();

}

function drawStaminaIcon(staminaText){
	
	
	 // Save canvas state before clipping
    uiCanvasContext.save();

    // Define square dimensions
    const squareSize = UIRadius;
    const squareX = 350;
    const squareY = 50;
	const centerTextX=squareX+20;
	const centerTextY=squareY+25;
    
    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.clip();

    // Set fill color based on hover state
    uiCanvasContext.fillStyle = "#000000";
    uiCanvasContext.fillRect(squareX, squareY, squareSize, squareSize);

    // Draw the mantis shrimp image on top
	uiCanvasContext.textAlign = "center";
    uiCanvasContext.drawImage(staminaIcon, squareX, squareY, squareSize, squareSize);
	uiCanvasContext.fillStyle = "white";
	uiCanvasContext.font = "15px Arial";
	uiCanvasContext.fillText(staminaText, centerTextX, centerTextY);

    // Restore canvas to remove clipping path
    uiCanvasContext.restore();

}

function drawPlanktonStoredIcon(planktonStoredText){
	
	
	 // Save canvas state before clipping
    uiCanvasContext.save();

    // Define square dimensions
    const squareSize = UIRadius/1.1;
    const squareX = 275;
    const squareY = 45;
	const centerTextX=squareX+15;
	const centerTextY=squareY+20;
    
    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.clip();

    // Set fill color based on hover state
    uiCanvasContext.fillStyle = "#000000";
    uiCanvasContext.fillRect(squareX, squareY, squareSize, squareSize);

    // Draw the mantis shrimp image on top
	uiCanvasContext.textAlign = "center";
    uiCanvasContext.drawImage(planktonStoredIcon, squareX, squareY, squareSize, squareSize);
	uiCanvasContext.fillStyle = "white";
	uiCanvasContext.font = "20px Arial";
	uiCanvasContext.fillText(planktonStoredText, centerTextX, centerTextY);

    // Restore canvas to remove clipping path
    uiCanvasContext.restore();

}

function drawAlgaeStoredIcon(algaeStoredText){
	
	
	 // Save canvas state before clipping
    uiCanvasContext.save();

    // Define square dimensions
    const squareSize = UIRadius/1.1;
    const squareX = 340;
    const squareY = 50;
	const centerTextX=squareX+30;
	const centerTextY=squareY+25;
    
    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.clip();

    // Set fill color based on hover state
    uiCanvasContext.fillStyle = "black";
    uiCanvasContext.fillRect(squareX, squareY, squareSize, squareSize);

    // Draw the mantis shrimp image on top
	uiCanvasContext.textAlign = "center";
    uiCanvasContext.drawImage(algaeStoredIcon, squareX, squareY, squareSize, squareSize);
	uiCanvasContext.fillStyle = "white";
	uiCanvasContext.font = "20px Arial";
	uiCanvasContext.fillText(algaeStoredText, centerTextX, centerTextY);

    // Restore canvas to remove clipping path
    uiCanvasContext.restore();

}


function drawThermometerIcon(tempText){
	
	
	 // Save canvas state before clipping
    uiCanvasContext.save();

    // Define square dimensions
    const squareSize = UIRadius/1.1;
    const squareX = 250;
    const squareY = 40;
	const centerTextX=squareX+20;
	const centerTextY=squareY+20;
    
    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.clip();

    // Set fill color based on hover state
    //uiCanvasContext.fillStyle = "black";
  //  uiCanvasContext.fillRect(squareX, squareY, squareSize, squareSize);

    // Draw the mantis shrimp image on top
	uiCanvasContext.textAlign = "center";
    uiCanvasContext.drawImage(thermometerIcon, squareX, squareY, squareSize, squareSize);
	uiCanvasContext.fillStyle = "white";
	uiCanvasContext.font = "15px Arial";
	uiCanvasContext.fillText(tempText, centerTextX, centerTextY);

    // Restore canvas to remove clipping path
    uiCanvasContext.restore();

}

function drawCalciumCarbonateIcon(carbText){
		 // Save canvas state before clipping
    uiCanvasContext.save();

    // Define square dimensions
    const squareSize = UIRadius/1.1;
    const squareX = 375;
    const squareY = 40;
	const centerTextX=squareX+15;
	const centerTextY=squareY+20;
    
    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.clip();

    // Set fill color based on hover state
    uiCanvasContext.fillStyle = "black";
    uiCanvasContext.fillRect(squareX, squareY, squareSize, squareSize);

    // Draw the mantis shrimp image on top
	uiCanvasContext.textAlign = "center";
    uiCanvasContext.drawImage(rockSmallImage, squareX, squareY, squareSize, squareSize);
	uiCanvasContext.fillStyle = "white";
	uiCanvasContext.font = "22px Arial";
	uiCanvasContext.fillText(carbText, centerTextX, centerTextY);

    // Restore canvas to remove clipping path
    uiCanvasContext.restore();
}





