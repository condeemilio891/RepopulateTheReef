function drawDarkEmeraldUIRectangle(topLeftX, topLeftY, boxWidth, boxHeight) {
    // Calculate center position (top center)
    const centerX = topLeftX + boxWidth / 2;
    const centerY = topLeftY;

    // Create radial gradient
    const gradient = uiCanvasContext.createRadialGradient(
        centerX, centerY, 0,               // Start circle (top center, 0 radius)
        centerX, centerY, boxHeight * 1.5,  // End circle (larger radius)
    );
    
    // Add color stops (emerald green to black)
    gradient.addColorStop(0, '#50C878');    // Vibrant emerald green
    gradient.addColorStop(0.01, '#0A5E2A');  // Dark forest green
    gradient.addColorStop(.45, '#000000');     // Pure black

    // Apply gradient and draw rectangle
    uiCanvasContext.fillStyle = gradient;
    uiCanvasContext.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}


// this will be if we want buttons 
function drawInfoBoxCoral() {
  let infoBoxUIX = 200;
  let infoBoxUIY = 175;
  let infoBoxH = 300;
  let infoBoxW = 200;

	if(actorSelected){
		// Draw box 
		drawDarkEmeraldUIRectangle(infoBoxUIX, infoBoxUIY, infoBoxW, infoBoxH, "blue");
	  
		// Draw buttons
		drawInfoButtons(infoBoxUIX, infoBoxUIY, infoBoxW);
	}
	
}

function drawInfoBox() {
  let infoBoxUIX = 200;
  let infoBoxUIY = 175;
  let infoBoxH = 300;
  let infoBoxW = 200;

	if(actorSelected){
		// Draw box 
		drawDarkEmeraldUIRectangle(infoBoxUIX, infoBoxUIY, infoBoxW, infoBoxH, "blue");
	}
	
}


function drawSelectedInfoBoxStateCoral(){
	
	
	 if(infoBoxState==="stats"){

		}
	if(infoBoxState==="storage"){
			drawAlgaeLeft();
			drawPlanktonLeft();
			drawCalciumCarbonateLeft();
			
	}
	
}

function drawSelectedInfoBocStateActor(){
	 if(infoBoxState==="stats"){

		}
	if(infoBoxState==="storage"){
			drawAlgaeLeft();
			drawPlanktonLeft();
	}
	
}

