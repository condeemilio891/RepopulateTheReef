// commands Maybe try using closure to encapsulate 
// 
let isMoveActive=false;
let isPatrolActive=false;
let isDigForPlanktonActive=false;
let isShootBubbleActive=false;



function executeCommand(evt){ // call this before the sel events
	setTargetAndAttack(evt);
	setTargetMove(evt); // desel currGatherActor
	 
	if(actorSelected instanceof Shrimp){
		selectTargetGatherSeagrass(evt);
	}
	else if(actorSelected instanceof Fish|| actorSelected instanceof Seahorse){
		selectTargetGatherSeaweed(evt);
	}
	else if(actorSelected instanceof Crab){
		selectTargetGatherRocks(evt);
		selectTargetCoral(evt);
		selectTargetGatherSeaweed(evt);
		selectTargetGatherSeagrass(evt);
		//setAttackTargets(savedCurrActor);
	}
	else if(actorSelected instanceof HermitCrab){
		selectTargetAnemone(evt);
	}

}
// refactor?? 
// Autopilot
function triggerAutoPilot(evt){
	 let rect = uiCanvas.getBoundingClientRect();
    let clickX = evt.clientX - rect.left;
    let clickY = evt.clientY - rect.top;

    
    let distance = Math.sqrt((clickX - autoPilotIconUIX) ** 2 + (clickY - autoPilotIconUIY) ** 2);
	// perhaps create a temp array for all the actors of choice? 
    if (distance < UIRadius && actorSelected instanceof Fish||distance < UIRadius && actorSelected instanceof Shrimp||distance < UIRadius && actorSelected instanceof Seahorse) {
        actorSelected.isAutoPilotActive=true;
		actorSelected.currStateText="Auto Pilot";
		actorSelected.state="autoPilot"; // change to auto 
		
		actorSelected.isCallSchoolActive=false;
		
    }
}


function triggerGather(evt) {
    let rect = uiCanvas.getBoundingClientRect();

    // 1. Get raw CSS pixel coordinates
    let cssX = evt.clientX - rect.left;
    let cssY = evt.clientY - rect.top;

    // 2. Calculate scale factors between CSS display and canvas buffer
    const scaleX = uiCanvas.width / rect.width;   // e.g., 750 / 600 = 1.25
    const scaleY = uiCanvas.height / rect.height;

    // 3. Convert to canvas internal coordinates
    let clickX = cssX * scaleX;
    let clickY = cssY * scaleY;

    // 4. Now use these scaled coordinates for hit-testing
    const squareSize = UIRadius * 1.5;
    const halfSize = squareSize / 2;
   // Crab Gather!!!
    if (clickX >= ability1UIX - halfSize && clickX <= ability1UIX + halfSize &&
        clickY >= ability1UIY - halfSize && clickY <= ability1UIY + halfSize && actorSelected instanceof Crab) {


		actorSelected.isGatherActive=true; // should I just AXE this? just do for hermit and then have a cancel Yea?? 
		actorSelected.isMoving=false;//?? Should I stop movement?? It doesnt matter we trigger the function..... 
        actorSelected.currStateText = "Right Click on Seaweed\nSeagrass To Gather\nResources";
        
	    // Or "crosshair" or "grab"
		canvas.style.cursor = "grab"; // Or "crosshair" or "grab"
    }
	else if (clickX >= ability1UIX - halfSize && clickX <= ability1UIX + halfSize &&
        clickY >= ability1UIY - halfSize && clickY <= ability1UIY + halfSize && actorSelected instanceof Seahorse) {
			
        actorSelected.currStateText = "Right Click on Seaweed\nTo Gather Resources";

		canvas.style.cursor = "grab"; // Or "crosshair" or "grab"
    }	
	else if (clickX >= ability1UIX - halfSize && clickX <= ability1UIX + halfSize &&
        clickY >= ability1UIY - halfSize && clickY <= ability1UIY + halfSize && actorSelected instanceof Fish) {
			
			
        actorSelected.currStateText = "Right Click on Seaweed\nTo Gather Resources";
		canvas.style.cursor = "grab"; // Or "crosshair" or "grab"
    }
	else if (clickX >= ability1UIX - halfSize && clickX <= ability1UIX + halfSize &&
        clickY >= ability1UIY - halfSize && clickY <= ability1UIY + halfSize && actorSelected instanceof Shrimp) {
			
			
        actorSelected.currStateText = "Right Click on SeaGrass\nTo Gather Resources";
		canvas.style.cursor = "grab"; // Or "crosshair" or "grab"
    }
}
function triggerGatherRocks(evt) {
    let rect = uiCanvas.getBoundingClientRect();

    // 1. Get raw CSS pixel coordinates
    let cssX = evt.clientX - rect.left;
    let cssY = evt.clientY - rect.top;

    // 2. Calculate scale factors between CSS display and canvas buffer
    const scaleX = uiCanvas.width / rect.width;   // e.g., 750 / 600 = 1.25
    const scaleY = uiCanvas.height / rect.height;

    // 3. Convert to canvas internal coordinates
    let clickX = cssX * scaleX;
    let clickY = cssY * scaleY;

    // 4. Now use these scaled coordinates for hit-testing
    const squareSize = UIRadius * 1.5;
    const halfSize = squareSize / 2;

    if (clickX >= ability2UIX - halfSize && clickX <= ability2UIX + halfSize &&
        clickY >= ability2UIY - halfSize && clickY <= ability2UIY + halfSize && actorSelected instanceof Crab) {
			
		actorSelected.isGatherActive=true;
		actorSelected.isMoving=false;
        actorSelected.currStateText = "Right Click on Rocks To\nGather Limestone";
        
	    
		canvas.style.cursor = "grab"; // Or "crosshair" or "grab"
    }
}

function triggerPickUpPutDownAnemone(evt) {
    let rect = uiCanvas.getBoundingClientRect();

    // 1. Get raw CSS pixel coordinates
    let cssX = evt.clientX - rect.left;
    let cssY = evt.clientY - rect.top;

    // 2. Calculate scale factors between CSS display and canvas buffer
    const scaleX = uiCanvas.width / rect.width;   // e.g., 750 / 600 = 1.25
    const scaleY = uiCanvas.height / rect.height;

    // 3. Convert to canvas internal coordinates
    let clickX = cssX * scaleX;
    let clickY = cssY * scaleY;

    // 4. Now use these scaled coordinates for hit-testing
    const squareSize = UIRadius * 1.5;
    const halfSize = squareSize / 2;

    if (clickX >= ability1UIX - halfSize && clickX <= ability1UIX + halfSize &&
        clickY >= ability1UIY - halfSize && clickY <= ability1UIY + halfSize && actorSelected instanceof HermitCrab) {

		
		actorSelected.isPickUpAnemoneActive=true;
		actorSelected.isPutDownAnemoneActive=false;
        actorSelected.currStateText = "Right Click to Choose a\nTiny Anemone To Pick Up";
        
	    uiCanvas.style.cursor = "grab"; // Or "crosshair" or "grab"
		canvas.style.cursor = "grab"; // Or "crosshair" or "grab"
    }    
	else if (clickX >= ability2UIX - halfSize && clickX <= ability2UIX + halfSize &&
        clickY >= ability2UIY - halfSize && clickY <= ability2UIY + halfSize && actorSelected instanceof HermitCrab) {


		actorSelected.isPutDownAnemoneActive=true;
		actorSelected.isPickUpAnemoneActive=false;
        actorSelected.currStateText = "Right Click on Limestone\nTo Place Tiny Anemone";
        
	    uiCanvas.style.cursor = "grab"; // Or "crosshair" or "grab"
		canvas.style.cursor = "grab"; // Or "crosshair" or "grab"
    }
}


function triggerCallSchool(evt) {
    let rect = uiCanvas.getBoundingClientRect();

    // 1. Get raw CSS pixel coordinates
    let cssX = evt.clientX - rect.left;
    let cssY = evt.clientY - rect.top;

    // 2. Calculate scale factors between CSS display and canvas buffer
    const scaleX = uiCanvas.width / rect.width;   // e.g., 750 / 600 = 1.25
    const scaleY = uiCanvas.height / rect.height;

    // 3. Convert to canvas internal coordinates
    let clickX = cssX * scaleX;
    let clickY = cssY * scaleY;

    // 4. Now use these scaled coordinates for hit-testing
    const squareSize = UIRadius * 1.5;
    const halfSize = squareSize / 2;

    if (clickX >= callSchoolUIX - halfSize && clickX <= callSchoolUIX + halfSize &&
        clickY >= callSchoolUIY - halfSize && clickY <= callSchoolUIY + halfSize)  {

		
		actorSelected.isCallSchoolActive=true;
		PCArray.forEach((a) => {
			if(!(a instanceof Fish)) return
			a.selected = true;
			a.multipleSelected = true;
		});
    
        
    }    
}





// Execute commands 
function setTargetMove(evt) {
    console.log("set Targ Move");

    // 1. Create an array of ALL selected actors
    const selectedActors = PCArray.filter(actor => actor.selected);

    // Optional: If no actors are selected, stop here
    if (selectedActors.length === 0) return;

    // Capture target position once (same for all)
    const rect = gameCanvas.getBoundingClientRect();
    const targetX = evt.clientX - rect.left;
    const targetY = evt.clientY - rect.top;

    // 2. Loop through the selected actors and apply logic to EACH one
    selectedActors.forEach(actor => {
        // --- Logic Block Start ---
        
        // Check if this specific actor is allowed to move
        if (actor instanceof HermitCrab) {
            if (actor.isPickUpAnemoneActive || actor.isPutDownAnemoneActive) {
                return; // Skip this specific actor, continue to next
            }
        }
        
        if (actor instanceof Crab) {
            if (actor.isGatherActive) {
                actor.isGatherActive = false;
                // Decide: Do you want to skip moving this actor, or move them anyway?
                // If you want to cancel the command entirely for this actor:
				// We have to clear curr gathering actor 
				actor.currGatheringActor=null;
				
                return; 
            }
        }

        // Apply movement data to this specific actor
        actor.targetX = targetX;
        actor.targetY = targetY;
        actor.state = "move";
        actor.currGatheringActor = null;
        
        // --- Logic Block End ---
    });

    // Lets try to remove GLobal flag?? 
    isMoveActive = false; 
}   
function selectTargetPatrol(evt){
	
	
	if(isPatrolActive&&actorSelected instanceof Shrimp){
		actorSelected.setTargetAndPatrol(mouseX,mouseY);
		isPatrolActive=false;
	}
}
function setTargetAndAttack(evt){
	const selectedActors = PCArray.filter(actor => actor.selected);
	
	if (selectedActors.length === 0) return;
	
	
	selectedActors.forEach(actor=>{
			if(actor.selected){

			actor.isAttackingActive=true;
			actor.state ="reset";
		}	
	})
}

function selectTargetGatherRocks(evt) {
    if (actorSelected) {

        // Check if the click is on any Seaweed instance
        for (let i = 0; i < rocksArray.length; i++) {
            if (
                mouseX > rocksArray[i].x && mouseX < rocksArray[i].x + rocksArray[i].width &&
                mouseY > rocksArray[i].y && mouseY < rocksArray[i].y + rocksArray[i].height) {
				let currRocks=rocksArray[i];
                actorSelected.resourceI = i; 
				actorSelected.currGatheringActor=currRocks;
				actorSelected.currStateText="Moving To Rocks";
				//actorSelected.state="reset";
                
                break; 
            }else{
				//isGatherseagrassActive=false;
			}
        }
    }
}
function selectTargetCoral(evt) {
    if (actorSelected) {

        // Check if the click is on any Seaweed instance
        for (let i = 0; i < coralArray.length; i++) {
            if (
                mouseX > coralArray[i].x && mouseX < coralArray[i].x + coralArray[i].width &&
                mouseY > coralArray[i].y && mouseY < coralArray[i].y + coralArray[i].height) {
				let currTarget=coralArray[i];
                actorSelected.resourceI = i; 
				actorSelected.currGatheringActor=currTarget;
				actorSelected.currStateText="Moving To BrainCoral";
				//actorSelected.state="reset";
                
                break; 
            }else{
				//isGatherseagrassActive=false;
			}
        }
    }
}
function selectTargetAnemone(evt) {
    if (actorSelected && actorSelected.isPickUpAnemoneActive) {
        // Check if the click is on any Anemone instance
        for (let i = 0; i < anemoneArray.length; i++) {
            if (
                mouseX > anemoneArray[i].x && mouseX < anemoneArray[i].x + anemoneArray[i].width &&
                mouseY > anemoneArray[i].y && mouseY < anemoneArray[i].y + anemoneArray[i].height) { //should we only accept tiny?? 
				let currTarget=anemoneArray[i];
				actorSelected.currGatheringActor=currTarget;
				actorSelected.currStateText="Moving To Tiny Anemone";
				actorSelected.isPickUpAnemoneActive=false;
				uiCanvas.style.cursor = "default"; 
				canvas.style.cursor = "default";
                break; 
            }else{
				actorSelected.currStateText="Cancelled: Must Right Click on\nTiny Anemone To Pick up\nLeft Click to Cancel";
				actorSelected.isPickUpAnemoneActive=false;
			}
        }
    }
	else if (actorSelected && actorSelected.isPutDownAnemoneActive) {
        let isMouseOverLimestone=checkMouseOverCalcium();
        
            if (isMouseOverLimestone) { //should we only accept tiny?? 
				actorSelected.isPutDownAnemoneActive=false;
				actorSelected.isPlacingAnemone=true;
				setTargetMove(evt);
				
				uiCanvas.style.cursor = "default"; 
				canvas.style.cursor = "default";
            
            }else{
				actorSelected.currStateText="Cancelled: Must Place On\nLimeStone Must Have\nEnough Coral Capacity";
				actorSelected.isPutDownAnemoneActive=false;
			}
        }
    
}
function selectTargetGatherSeaweed(evt) {
    if (actorSelected) {// edit because not it wont work without is gather active? 

        // Check if the click is on any Seaweed instance
        for (let i = 0; i < seaweedArray.length; i++) {
            if (
                mouseX > seaweedArray[i].x && mouseX < seaweedArray[i].x + seaweedArray[i].width &&
                mouseY > seaweedArray[i].y && mouseY < seaweedArray[i].y + seaweedArray[i].height) {
				let currSeaweed=seaweedArray[i];
                actorSelected.resourceI = i; 
				actorSelected.currGatheringActor=currSeaweed;
				actorSelected.currStateText="Moving To Seaweed";
				actorSelected.state="reset";
				actorSelected.isGatherActive=false;
				uiCanvas.style.cursor = "default"; 
				canvas.style.cursor = "default";				
                break; // Exit loop after selecting a seaweed
            }else{
				actorSelected.currStateText="Must Right Click on\nSeaweed or Seagrass"
			}
        }
    }
}


function selectTargetGatherSeagrass(evt) {
    if (actorSelected) {

        // Check if the click is on any Seaweed instance
        for (let i = 0; i < seagrassArray.length; i++) {
            if (
                mouseX > seagrassArray[i].x && mouseX < seagrassArray[i].x + seagrassArray[i].width &&
                mouseY > seagrassArray[i].y && mouseY < seagrassArray[i].y + seagrassArray[i].height) {
				let currSeagrass=seagrassArray[i];
                actorSelected.resourceI = i; 
				actorSelected.currGatheringActor=currSeagrass;
				actorSelected.currStateText="Moving To SeaGrass";
				actorSelected.state="reset";
				actorSelected.isGatherActive=false;
				uiCanvas.style.cursor = "default"; 
				canvas.style.cursor = "default";					

                break; // Exit loop after selecting a seagrass
            }else{
				actorSelected.currStateText="Must Right Click on\nSeaweed or Seagrass";
			}
        }
    }
}
