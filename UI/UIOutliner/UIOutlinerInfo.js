

// diet 

function drawOutlinerDietIcon(dietType) {
    uiCanvasContext.save();

    let dietIcon = null;
    let dietText = "";
    let textColor = "white";

    if (dietType === "carnivore") {
        dietIcon = carnivoreIcon;
        dietText = "Carnivore: Consumes Meat\nBonus Hunting and Damaging";
        textColor = "#FF1493";
    } else if (dietType === "herbivore") {
        dietIcon = herbivoreIcon;
        dietText = "Herbivore: Consume Plants\nBonus Gathering Algae";
    } else if (dietType === "omnivore") {
        dietIcon = omnivoreIcon;
        dietText = "Omnivore: Consumes Plants and Animals\n Can Gather or Hunt";
    } else if (dietType === "producer") {
        dietIcon = producerIcon;
        dietText = "Producer: Can Create its Own Energy\n Starves During Algae Blooms";
    } else if (dietType === "decomposer") {
        // dietIcon = decomposerIcon;
        dietText = "Decomposer: Can Collect Food From\nDead Animals";
    } else if (dietType === "filterFeeder") {
        dietIcon = filterFeederIcon;
        dietText = "Filter Feeder: Does not Consume Homes\nResources Spends More Time Feeding";
    } else if (dietType === "coral") {
        dietIcon = filterFeederIcon;
        dietText = "Coral: Uses Algae to Create Energy\nWithout Algae Eats Plankton";
    } else {
        console.warn("dietType Not Found!");
    }

    // ----- Icon square (unchanged) -----
    const squareSize = UIRadius *.9 ;
    const squareX = 25;
    const squareY = 500;

    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.clip();
    uiCanvasContext.fillStyle = "black";
    uiCanvasContext.fillRect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.drawImage(dietIcon, squareX, squareY, squareSize, squareSize);
    uiCanvasContext.restore();

    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.strokeStyle = "white";
    uiCanvasContext.lineWidth = 2;
    uiCanvasContext.stroke();

    // ----- Text block with its own white border -----
    const margin = 15;               // gap between icon and text box
    const padding = 6;               // inner padding inside the text border
    const lineHeight = 20;
    const fontSize = 18;
    uiCanvasContext.font = `${fontSize}px Arial`;
    uiCanvasContext.textAlign = "left";
    uiCanvasContext.textBaseline = "top";  // easier for bounding box

    // Split text into lines
    const lines = dietText.split('\n');
    
    // Measure max line width
    let maxLineWidth = 0;
    for (let line of lines) {
        const metrics = uiCanvasContext.measureText(line);
        const width = metrics.width;
        if (width > maxLineWidth) maxLineWidth = width;
    }
    
    const textBlockWidth = maxLineWidth + padding * 2;
    const textBlockHeight = lines.length * lineHeight + padding * 2;
    
    // Position: start right after icon + margin
    const textBoxX = squareX + squareSize + margin;
    const textBoxY = squareY;   // align top with icon (you can adjust)
    
    // Draw white border (frame) around the text block
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(textBoxX, textBoxY, textBlockWidth, textBlockHeight);
    uiCanvasContext.strokeStyle = "white";
    uiCanvasContext.lineWidth = 1.5;   // fine border
    uiCanvasContext.stroke();
    
    // Draw the text inside (with padding)
    const textStartX = textBoxX + padding;
    const textStartY = textBoxY + padding;
    for (let i = 0; i < lines.length; i++) {
        uiCanvasContext.fillStyle = "white";
        uiCanvasContext.fillText(lines[i], textStartX, textStartY + i * lineHeight);
    }
    
    // Optional: if you want different text color for carnivore, add that logic inside the loop
    // e.g., if (dietType === "carnivore") uiCanvasContext.fillStyle = "#FF1493";
}

// refactor into array perhaps make responsive if greater than 4 shrink the UI radius???? 
function drawOutlinerIcon1(outlinerIcon1,outlinerText1,textColor){
	
	
	 // Save canvas state before clipping
    uiCanvasContext.save();

    // Define square dimensions
    const squareSize = UIRadius*.8;
    const squareX = 25;
    const squareY = 560;

    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.clip();

    // Set fill color based on hover state
    uiCanvasContext.fillStyle = "black";
    uiCanvasContext.fillRect(squareX, squareY, squareSize, squareSize);

    // Draw the mantis shrimp image on top
    uiCanvasContext.drawImage(outlinerIcon1, squareX, squareY, squareSize, squareSize);

    // Restore canvas to remove clipping path
    uiCanvasContext.restore();

    // Draw the square outline (outer border)
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.strokeStyle = "white";  // Square color
    uiCanvasContext.lineWidth = 2;  // Square thickness
    uiCanvasContext.stroke();
	

	// description 
	const margin = 15;
	const textX = squareX + squareSize + margin;
	const textY = squareY + (squareSize / 4) 
	const maxWidth = uiCanvas.width - (squareX+ margin) ;
	
	
    uiCanvasContext.textAlign = "left";
    uiCanvasContext.textBaseline = "middle";
	uiCanvasContext.fillStyle = textColor;
	drawMultilineText(uiCanvasContext,outlinerText1, textX, textY,18);
}

function drawOutlinerIcon2(outlinerIcon2,outlinerText2,textColor){
	
	
	 // Save canvas state before clipping
    uiCanvasContext.save();

    // Define square dimensions
    const squareSize = UIRadius*.8;
    const squareX = 25;
    const squareY = 600;

    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.clip();

    // Set fill color based on hover state
    uiCanvasContext.fillStyle = "black";
    uiCanvasContext.fillRect(squareX, squareY, squareSize, squareSize);

    // Draw the mantis shrimp image on top
    uiCanvasContext.drawImage(outlinerIcon2, squareX, squareY, squareSize, squareSize);

    // Restore canvas to remove clipping path
    uiCanvasContext.restore();

    // Draw the square outline (outer border)
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.strokeStyle = "white";  // Square color
    uiCanvasContext.lineWidth = 2;  // Square thickness
    uiCanvasContext.stroke();
	
	// description 
	const margin = 15;
	const textX = squareX + squareSize + margin;
	const textY = squareY + (squareSize / 4) 
	const maxWidth = uiCanvas.width - (squareX+ margin) ;
	

    uiCanvasContext.textAlign = "left";
    uiCanvasContext.textBaseline = "middle";
	uiCanvasContext.fillStyle = textColor;
	
	drawMultilineText(uiCanvasContext,outlinerText2, textX, textY,18);
}
function drawOutlinerIcon3(outlinerIcon3,outlinerText3,textColor){
	
	
	 // Save canvas state before clipping
    uiCanvasContext.save();

    // Define square dimensions
    const squareSize = UIRadius*.8;
    const squareX = 25;
    const squareY = 640;

    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.clip();

    // Set fill color based on hover state
    uiCanvasContext.fillStyle = "black";
    uiCanvasContext.fillRect(squareX, squareY, squareSize, squareSize);

    // Draw the mantis shrimp image on top
    uiCanvasContext.drawImage(outlinerIcon3, squareX, squareY, squareSize, squareSize);

    // Restore canvas to remove clipping path
    uiCanvasContext.restore();

    // Draw the square outline (outer border)
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.strokeStyle = "white";  // Square color
    uiCanvasContext.lineWidth = 2;  // Square thickness
    uiCanvasContext.stroke();
	
	// description 
	const margin = 15;
	const textX = squareX + squareSize + margin;
	const textY = squareY + (squareSize / 4) 
	const maxWidth = uiCanvas.width - (squareX+ margin) ;


    uiCanvasContext.textAlign = "left";
    uiCanvasContext.textBaseline = "middle";
	uiCanvasContext.fillStyle = textColor;

	drawMultilineText(uiCanvasContext,outlinerText3, textX, textY,18);
}
function drawOutlinerIcon4(outlinerIcon4,outlinerText4,textColor){
	
	
	 // Save canvas state before clipping
    uiCanvasContext.save();

    // Define square dimensions
    const squareSize = UIRadius*.8;
    const squareX = 25;
    const squareY = 679;

    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.clip();

    // Set fill color based on hover state
    uiCanvasContext.fillStyle = "black";
    uiCanvasContext.fillRect(squareX, squareY, squareSize, squareSize);

    // Draw the mantis shrimp image on top
    uiCanvasContext.drawImage(outlinerIcon4, squareX, squareY, squareSize, squareSize);

    // Restore canvas to remove clipping path
    uiCanvasContext.restore();

    // Draw the square outline (outer border)
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.strokeStyle = "white";  // Square color
    uiCanvasContext.lineWidth = 2;  // Square thickness
    uiCanvasContext.stroke();
	//description
	const margin = 15;
	const textX = squareX + squareSize + margin;
	const textY = squareY + (squareSize / 4) 
	const maxWidth = uiCanvas.width - (squareX+ margin) ;
	

    uiCanvasContext.textAlign = "left";
    uiCanvasContext.textBaseline = "middle";
	uiCanvasContext.fillStyle = textColor;
	
	drawMultilineText(uiCanvasContext,outlinerText4, textX, textY,18);
}
