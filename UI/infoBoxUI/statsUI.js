let stat1TextUIX=  300
let stat1TextUIY= 360;


let stat2TextUIX= 300;
let stat2TextUIY= 390;


let stat3TextUIX= 300;
let stat3TextUIY= 420;

let stat4TextUIX= 300;
let stat4TextUIY= 450;


function drawUpkeep1Text(upkeep1Text,textColor){
	
	uiCanvasContext.textAlign = "center";
	 uiCanvasContext.fillStyle = textColor;  // Text color
    uiCanvasContext.font = "20px Arial";
    uiCanvasContext.fillText(" "+upkeep1Text,300,260);	

}

function drawUpkeep2Text(upkeep2Text,textColor){
	uiCanvasContext.textAlign = "center";
	 uiCanvasContext.fillStyle = textColor;  // Text color
    uiCanvasContext.font = "20px Arial";
    uiCanvasContext.fillText(" "+upkeep2Text,300,290);		
}

function drawUpkeep3Text(upkeep2Text,textColor){
	uiCanvasContext.textAlign = "center";
	 uiCanvasContext.fillStyle = textColor;  // Text color
    uiCanvasContext.font = "20px Arial";
    uiCanvasContext.fillText(" "+upkeep2Text,300,320);		
}
// texts maybe add Icons 
function drawStat1Text(stat1Text){
	
	uiCanvasContext.textAlign = "center";
	 uiCanvasContext.fillStyle = "gold";  // Text color
    uiCanvasContext.font = "20px Arial";
    uiCanvasContext.fillText(" "+stat1Text,stat1TextUIX,stat1TextUIY);
}
function drawStat2Text(stat2Text){
	uiCanvasContext.textAlign = "center";
	uiCanvasContext.fillStyle = "pink";  // Text color
    uiCanvasContext.font = "20px Arial";
    uiCanvasContext.fillText(" "+stat2Text,stat2TextUIX,stat2TextUIY);
	
}

function drawStat3Text(stat3Text){
	uiCanvasContext.textAlign = "center";
	uiCanvasContext.fillStyle="#F2EBE3";// bone color
	uiCanvasContext.font="20px Arial";
	uiCanvasContext.fillText(" "+stat3Text,stat3TextUIX,stat3TextUIY);
}

function drawStat4Text(stat4Text){
	uiCanvasContext.textAlign = "center";
		uiCanvasContext.fillStyle="#F2EBE3";// bone color
	uiCanvasContext.font="20px Arial";
	uiCanvasContext.fillText(" "+stat4Text,stat4TextUIX,stat4TextUIY);
}

// diet 

function drawDietIcon(dietType){
	
	// Save canvas state before clipping
    uiCanvasContext.save();
	
	let dietIcon= null; 
	let dietText=""
	let textColor="white";
	
	if(dietType==="carnivore"){
		dietIcon=carnivoreIcon;
		dietText="Carnivore";
		textColor="#FF1493"
	}
	else if(dietType==="herbivore"){
		dietIcon=herbivoreIcon;
		dietText="Herbivore";
		fillColor="green"
	}else if(dietType==="omnivore"){
		dietIcon=omnivoreIcon;
		dietText="Omnivore";
	}else if(dietType==="producer"){
		dietIcon=producerIcon
		dietText="Producer";
	}else if(dietType==="decomposer"){
		//dietIcon=decomposerIcon;
		dietText="Decomposer";
	}else if(dietType="filterFeeder"){
		dietIcon=filterFeederIcon;
		dietText="Filter Feeder"
	}

    // Define square dimensions
    const squareSize = UIRadius*.8;
    const squareX = 205;
    const squareY = 180;

    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.clip();

    // Set fill color based on hover state
    uiCanvasContext.fillStyle = "black";
    uiCanvasContext.fillRect(squareX, squareY, squareSize, squareSize);

    // Draw the mantis shrimp image on top
    uiCanvasContext.drawImage(dietIcon, squareX, squareY, squareSize, squareSize);

    // Restore canvas to remove clipping path
    uiCanvasContext.restore();

    // Draw the square outline (outer border)
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.strokeStyle = "white";  // Square color
    uiCanvasContext.lineWidth = 2;  // Square thickness
    uiCanvasContext.stroke();
	
/* 	// description 
	const textWidth = uiCanvasContext.measureText(dietText).width;
	const textX= 300;
	const textY= squareY+(squareSize/2);

	uiCanvasContext.fillStyle=textColor;
	uiCanvasContext.font="18px Arial";
	uiCanvasContext.fillText(" "+ dietText,textX,textY); */
	
}

// refactor into array perhaps make responsive if greater than 4 shrink the UI radius???? 
function drawAttributeIcon1(attributeIcon1,attributeText1,textColor){
	
	
	 // Save canvas state before clipping
    uiCanvasContext.save();

    // Define square dimensions
    const squareSize = UIRadius*.8;
    const squareX = 245;
    const squareY = 180;

    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.clip();

    // Set fill color based on hover state
    uiCanvasContext.fillStyle = "black";
    uiCanvasContext.fillRect(squareX, squareY, squareSize, squareSize);

    // Draw the mantis shrimp image on top
    uiCanvasContext.drawImage(attributeIcon1, squareX, squareY, squareSize, squareSize);

    // Restore canvas to remove clipping path
    uiCanvasContext.restore();

    // Draw the square outline (outer border)
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.strokeStyle = "white";  // Square color
    uiCanvasContext.lineWidth = 2;  // Square thickness
    uiCanvasContext.stroke();
	

}

function drawAttributeIcon2(attributeIcon2,attributeText2,textColor){
	
	
	 // Save canvas state before clipping
    uiCanvasContext.save();

    // Define square dimensions
    const squareSize = UIRadius*.8;
    const squareX = 275;
    const squareY = 180;

    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.clip();

    // Set fill color based on hover state
    uiCanvasContext.fillStyle = "black";
    uiCanvasContext.fillRect(squareX, squareY, squareSize, squareSize);

    // Draw the mantis shrimp image on top
    uiCanvasContext.drawImage(attributeIcon2, squareX, squareY, squareSize, squareSize);

    // Restore canvas to remove clipping path
    uiCanvasContext.restore();

    // Draw the square outline (outer border)
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.strokeStyle = "white";  // Square color
    uiCanvasContext.lineWidth = 2;  // Square thickness
    uiCanvasContext.stroke();
	
}
function drawAttributeIcon3(attributeIcon3,attributeText3,textColor){
	
	
	 // Save canvas state before clipping
    uiCanvasContext.save();

    // Define square dimensions
    const squareSize = UIRadius*.8;
    const squareX = 315;
    const squareY = 180;

    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.clip();

    // Set fill color based on hover state
    uiCanvasContext.fillStyle = "black";
    uiCanvasContext.fillRect(squareX, squareY, squareSize, squareSize);

    // Draw the mantis shrimp image on top
    uiCanvasContext.drawImage(attributeIcon3, squareX, squareY, squareSize, squareSize);

    // Restore canvas to remove clipping path
    uiCanvasContext.restore();

    // Draw the square outline (outer border)
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.strokeStyle = "white";  // Square color
    uiCanvasContext.lineWidth = 2;  // Square thickness
    uiCanvasContext.stroke();
	
}
function drawAttributeIcon4(attributeIcon4,attributeText4,textColor){
	
	
	 // Save canvas state before clipping
    uiCanvasContext.save();

    // Define square dimensions
    const squareSize = UIRadius*.8;
    const squareX = 355;
    const squareY = 180;

    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.clip();

    // Set fill color based on hover state
    uiCanvasContext.fillStyle = "black";
    uiCanvasContext.fillRect(squareX, squareY, squareSize, squareSize);

    // Draw the mantis shrimp image on top
    uiCanvasContext.drawImage(attributeIcon4, squareX, squareY, squareSize, squareSize);

    // Restore canvas to remove clipping path
    uiCanvasContext.restore();

    // Draw the square outline (outer border)
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.strokeStyle = "white";  // Square color
    uiCanvasContext.lineWidth = 2;  // Square thickness
    uiCanvasContext.stroke();
}
