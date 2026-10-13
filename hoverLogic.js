
let isMouseCloseToCoral=false; 
let isBuyButtonHovered1 = false;
let isBuyButtonHovered2 = false;

function isCoralWithinRange(mouseX, mouseY) {
  for (let coral of coralArray) {
    const dx = mouseX - (coral.x+coral.width/2);
    const dy = mouseY - (coral.y+coral.height/2);
    if (Math.hypot(dx, dy) <= 200) {
		 //console.log("Coral in the way!")
      return true;
    }
  }
 
  return false;
}
function isCoralWithin200pxRect(mouseX, mouseY) {
  for (let coral of coralArray) {
    if (Math.abs(mouseX - coral.x) <= 200 && Math.abs(mouseY - coral.y) <= 200) {
      return true;
    }
  }
  return false;
}

function checkMouseOverCalcium() {
    for (let actor of calciumCarbonateArray) {
        // Check if mouse is within the object's bounds
        if (mouseX >= actor.x && mouseX <= actor.x + actor.width &&
            mouseY >= actor.y && mouseY <= actor.y + actor.height) {
			isMouseOverCalcium=true;

            return true;
        }
    }
	
	//console.log("Must place over calcium");
    return false;
}


function isMouseOverActor(evt, array) {
    const found = array.some(actor => {
        if (mouseX > actor.x && mouseX < actor.x + actor.width &&
            mouseY > actor.y && mouseY < actor.y + actor.height) {
			canvas.style.cursor = "pointer";
            alertText = "Left Click to select " +actor.name;
            return true;
        }
		canvas.style.cursor = "default";	
        return false;
    });
    return found;
}

function alertTextHoverEvents(evt){
	updateCursorAndAlert(evt)
}

function updateCursorAndAlert(evt) {
    // 1. First, check what entity the mouse is over
    let hoveredEntity = null;
    let hoveredType = null;

    // Check all entity arrays (order doesn't matter anymore)
    const allEntities = [...PCArray, ...coralArray, ...spongeArray, ...seaweedArray, ...seagrassArray, ...rocksArray, ...jellyfishArray];
    
    for (let entity of allEntities) {
        if (mouseX > entity.x && mouseX < entity.x + entity.width &&
            mouseY > entity.y && mouseY < entity.y + entity.height) {
            hoveredEntity = entity;
            // Determine type for alert text
            if (entity instanceof Crab || entity instanceof Fish || entity instanceof Seahorse || entity instanceof HermitCrab) {
                hoveredType = "character";
            } else if (entity instanceof Anemone) {
                hoveredType = "anemone";
            } else if (entity.constructor.name === "Rocks") {
                hoveredType = "rock";
            } else if (entity.constructor.name === "Seaweed") {
                hoveredType = "seaweed";
            } else if (entity.constructor.name === "Seagrass") {
                hoveredType = "seagrass";
            } else if (entity.constructor.name === "Sponge") {
                hoveredType = "sponge";
            } else if (entity instanceof OrganPipeCoral || entity instanceof BrainCoral || entity instanceof FingerCoral) {
                hoveredType = "coral";
            } else if (entity.constructor.name === "Jellyfish") {
                hoveredType = "jellyfish";
            }
            break; // Found something, stop searching
        }
    }

    // 2. Set cursor and alert text based on state
    let cursor = "default";
    let alertMsg = "";

    if (actorSelected === null) {
        // No actor selected → show "pointer" on any hoverable entity
        if (hoveredEntity) {
            cursor = "pointer";
            alertMsg = `Left Click to select ${hoveredEntity.name || "this"}`;
        } else {
            cursor = "default";
            alertMsg = "";
        }
    } else {
        // Actor is selected → check interaction rules
        const selected = actorSelected;

        // Seaweed Actors 
        if ((selected instanceof Crab || selected instanceof Fish || selected instanceof Seahorse) &&
            hoveredType === "seaweed") {
            cursor = "grab";
            alertMsg = "Right Click to Gather From Seaweed\nLeft Click to Select Seaweed";
        }
        // Seagrass Actors
        else if ((selected instanceof Crab || selected instanceof Shrimp) && hoveredType === "seagrass") {
            cursor = "grab";
            alertMsg = "Right Click to Gather From Seagrass\nLeft Click to Select Seagrass";
        }
		//Sponge Actors
		else if((selected instanceof Fish) && hoveredType==="sponge"){
			cursor="grab"
			alertMsg="Right Click to Gather From Sponge\n Left Click to Select Sponge";
		}
        // Crab Rules 
        else if ((selected instanceof Crab )&& hoveredType === "rock") {
            cursor = "grab";
            alertMsg = "Right Click to Gather Limestone From Rocks\nLeft Click to Select Rocks";
        }
		else if((selected instanceof Crab) && hoveredType==="coral"){
			cursor="grab";
			alertMsg="Right Click to Return Resources to Coral"
		}
		else if((selected instanceof Crab) && hoveredType==="anemone"){
			cursor="grab";
			alertMsg="Right Click to Return Resources to Anemone"
		}
        // One for hermit and anemone yea? I think we might need to revise the logic in commandsCont
        else if (selected instanceof HermitCrab && selected.isPickUpAnemoneActive && hoveredType === "anemone") {
            const isTiny = hoveredEntity.size === "tiny";
            cursor = isTiny ? "grab" : "not-allowed";
            alertMsg = isTiny ? "Right Click to Pick Up Tiny Anemone" : "Must be a TINY Anemone!";
        }
        // Default: no interaction, show pointer if hovering a character
        else if (hoveredType) {
            cursor = "pointer";
            alertMsg = `Left Click to select ${hoveredEntity.name}`;
        }
		else {
            cursor = "default";
            alertMsg = `Right Click to Move ${selected.name}`;
        }
    }

    // 3. Apply cursor and alert text
    canvas.style.cursor = cursor;
    alertText = alertMsg;
}







// UI Buy Fish 
function handleBuyImageHoverUI1(evt) {
    const { x: clickX, y: clickY } = getUICanvasCoords(evt);
    
    let distance = Math.sqrt((clickX - buyMantisShrimpUIX) ** 2 + (clickY - buyMantisShrimpUIY) ** 2);
    
    if (distance < UIRadius) {
        isBuyButtonHovered1 = true;
        if (actorSelected instanceof BrainCoral) {
            alertText = "Buy Shrimp for 25 Plankton 25 Algae";
        } else if (actorSelected instanceof Anemone) {
            alertText = "Buy Clownfish for 75 Plankton 75 Algae";
        } else if (actorSelected instanceof OrganPipeCoral) {
            alertText = "Buy Seahorse for 125 plankton";
        }
    } else {
        isBuyButtonHovered1 = false;
        // Other alertText conditions (outside hover)
        if (actorSelected instanceof BrainCoral || actorSelected instanceof Anemone || actorSelected instanceof OrganPipeCoral) {
            alertText = "Tab Selected " + UIOutlinerButtonsState.charAt(0).toUpperCase() + UIOutlinerButtonsState.slice(1);
        }
    }
}

function handleBuyImageHoverUI2(evt){
	
const { x: clickX, y: clickY } = getUICanvasCoords(evt);
    

	let distance = Math.sqrt((clickX - outlinerIcon2X) ** 2 + (clickY - outlinerIcon2Y) ** 2);
	// If click inside the circle, spawn a fish
	
    if (distance < UIRadius  ) {
		isBuyButtonHovered2=true
		if(actorSelected instanceof BrainCoral){
			alertText="Damselfish 250 Algae 250 Plankton 4 Corals";
		}
		if(actorSelected instanceof OrganPipeCoral){
			alertText="Pistol Shrimp "
		}
	}else{
		isBuyButtonHovered2=false;
	}
	
}

//UI Commands

function handleAbilityIcon1(evt){
	
	const { x: clickX, y: clickY } = getUICanvasCoords(evt);
    

	let distance1 = Math.sqrt((clickX - ability1UIX) ** 2 + (clickY - ability1UIY) ** 2);
	let distance2 = Math.sqrt((clickX - ability2UIX) ** 2 + (clickY - ability2UIY) ** 2);
	let distance3 = Math.sqrt((clickX - 50) ** 2 + (clickY - 400) ** 2);
	let hideDistance= Math.sqrt((clickX - 155) ** 2 + (clickY - 400) ** 2);
    if (distance1 < UIRadius) {
		if(actorSelected instanceof Crab){
			alertText="Crab Can Gather From Seaweed, Seagrass\nReturns Resources To Any Coral";
			console.log("called")			
		}
		else if(actorSelected instanceof Shrimp){
			alertText="Shrimp Gathers Resources From Seagrass\nReturns Resources To Home Coral";
		}
		else if(actorSelected instanceof Seahorse){
			alertText="Seahorse Gathers Plankton\nFrom Seaweed Returns Resources To Home Coral";
		}
		else if(actorSelected instanceof Fish){
			alertText="ClownFish Gathers Resources\nFrom Seaweed Returns Resources To Home Coral";
		}
		else if(actorSelected instanceof HermitCrab){
			alertText="Can Pick Up a Tiny Anemone"
		}
	
	}
	else if(distance2<UIRadius){
		if(actorSelected instanceof Crab){
			alertText="Crab Can Gather LimeStone From Rocks\nLimestones Increase Coral Capacity\nWhen Spread"
		}
		else if(actorSelected instanceof Shrimp){
			alertText="Mysid Shrimp can Spread Limestone\n Increasing Coral Capacity";
		}
		else if(actorSelected instanceof Fish){
			alertText="ClownFish Gathers Resources From Sponge\nReturns Resources To Home Coral";
		}
		else if(actorSelected instanceof HermitCrab){
			alertText="Can Place Tiny Anemone on LimeStone"
		}
	}
	else if(distance3<UIRadius){
		if(actorSelected instanceof Crab){
			alertText="Crab Can Attack Enemy Targets\nRight Click to Attack"// should user be allowed to attack friendlies?
		}
		else if(actorSelected instanceof Shrimp){
			alertText="Mysid Shrimp can Spread Limestone\n Increasing Coral Capacity";
		}
		else if(actorSelected instanceof Fish){
			alertText="ClownFish Only Attacks In Groups\nCall School Then Right Click\nTo Attack";
		}
		else if(actorSelected instanceof HermitCrab){
			alertText="Can Place Tiny Anemone on LimeStone"
		}
	}
	else if(hideDistance<UIRadius){
		if(actorSelected instanceof Fish){
			alertText="Click to Hide Anemone";
		}
	}
	
	
}




function selectCoralCardHover(evt){
	const { x: mouseXUI, y: mouseYUI } = getUICanvasCoords(evt);
	if(actorSelected===null){
		coralCardArray.forEach(card=>{
			if (mouseXUI > card.x && mouseXUI < card.x + card.width &&
				mouseYUI > card.y && mouseYUI < card.y + card.height){
					
					card.isHovered=true;
					card.draw();
				}else{
					card.isHovered=false;
					card.draw();
				}
			
		});
	}
}


//saving 
function saveIconHover(evt){
	
	if(saveGameMenuToggled){
		return
	}
	const { x: mouseXUI, y: mouseYUI } = getUICanvasCoords(evt);
	if(actorSelected===null){
		const halfSize = UIRadius / 2;
		if (mouseXUI > saveIconUIX - halfSize && mouseXUI < saveIconUIX + halfSize &&
			mouseYUI > saveIconUIY - halfSize && mouseYUI < saveIconUIY + halfSize) {
			saveIcon.src = "Pics/uiIcons/saveIconActive.png";
			alertText="Open Save Game Menu";
		} else {
			saveIcon.src = "Pics/uiIcons/saveIcon.png";
		}
		
	}
}
function updateSaveCardHover(evt) {
    if (!saveGameMenuToggled || actorSelected !== null) return;
    const { x: mouseXUI, y: mouseYUI } = getUICanvasCoords(evt);
    let anyHovered = false;
    saveCards.forEach(card => {
        const wasHovered = card.isHovered;
        const isHovered = (mouseXUI > card.x && mouseXUI < card.x + card.width &&
                           mouseYUI > card.y && mouseYUI < card.y + card.height);
        card.isHovered = isHovered;
        if (isHovered){
			anyHovered = true;
			alertText=card.title==="Save Game 1" ? "Saves To Local Storage": "Loads From Local Storage";
		} 
		
    });
    
    if (anyHovered) {
        
    }
}

//objectives 

function objectivesIconHover(evt){
	
	if(objectivesMenuToggled){
		return
	}
	const { x: mouseXUI, y: mouseYUI } = getUICanvasCoords(evt);
	if(actorSelected===null){
		const halfSize = UIRadius / 2;
		if (mouseXUI > objectivesIconUIX - halfSize && mouseXUI < objectivesIconUIX + halfSize &&
			mouseYUI > objectivesIconUIY - halfSize && mouseYUI < objectivesIconUIY + halfSize) {
			objectivesIcon.src = "Pics/uiIcons/objectivesIconActive.png";
			alertText="Open Objectives";
		} else {
			objectivesIcon.src = "Pics/uiIcons/objectivesIcon.png";
		}
		
	}
}

// epigetics 
function evolutionIconHover(evt){
	
	if(evolutionMenuToggled){
		return
	}
	const { x: mouseXUI, y: mouseYUI } = getUICanvasCoords(evt);
	if(actorSelected===null){
		const halfSize = UIRadius / 2;
		if (mouseXUI > evolutionIconUIX - halfSize && mouseXUI < evolutionIconUIX + halfSize &&
			mouseYUI > evolutionIconUIY - halfSize && mouseYUI < evolutionIconUIY + halfSize) {
			evolutionIcon.src = "Pics/uiIcons/evolutionIconActive.png";
			alertText="Open Epigenetic Menu";
		} else {
			evolutionIcon.src = "Pics/uiIcons/evolutionIcon.png";
		}
		
	}
}

/* let evolutionIconUIX=315;
let evolutionIconUIY=35;
let evolutionIcon= new Image();
evolutionIcon.src="Pics/uiIcons/evolutionIcon.png";

let biotoxinIcon=new Image();
biotoxinIcon.src= "Pics/epigeneticIcons/biotoxinResIcon.png"
let epigeneticIcon1UIX=120;
let epigeneticIcon1UIY=250; */
function epigenticIconsHover(evt){
    if(!evolutionMenuToggled){
		return
	}
		const { x: mouseXUI, y: mouseYUI } = getUICanvasCoords(evt);
	if(actorSelected===null){
		const halfSize = UIRadius / 2;
		if (mouseXUI > epigeneticIcon1UIX - halfSize && mouseXUI < epigeneticIcon1UIX + halfSize &&
			mouseYUI > epigeneticIcon1UIY - halfSize && mouseYUI < epigeneticIcon1UIY + halfSize) {
			epigeneticsText="Mucus Coating: Damselfish, Clownfish and Crabs \nGain 25% additional resistance to nematocysts\nThe stinging cells of Jellyfish"
			alertText="Upgrade Mucus Coating";
			
		}else if(mouseXUI > epigeneticIcon2UIX - halfSize && mouseXUI < epigeneticIcon2UIX + halfSize &&
			mouseYUI > epigeneticIcon2UIY - halfSize && mouseYUI < epigeneticIcon2UIY + halfSize){
				epigeneticsText="Click Communication: Crabs, Clownfish\nDamselfish Pistol Shrimp and Yellow Tang\nCommunicate Better\nBonus to the Amount of Fish in a Control Group"
				alertText="Upgrade Click Communication";
			}
		else{
			epigeneticsText = "Phosphorylation and Methylation are dynamic\n" +
			"Switches that regulate protein function and\n" +
			"Gene expression, allowing an organism to\n" +
			"Change within its lifetime without altering its DNA.";
		}
		
	}
}
