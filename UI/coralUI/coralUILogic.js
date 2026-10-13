	
let buyClownfishUIX=70;
let buyClownfishUIY=250;

let buyMantisShrimpUIX=70;
let buyMantisShrimpUIY=250;

let buySeahorseUIX=70;
let buySeahorseUIY=250;

let buyBrainCoralPolypUIX= 70;
let buyBrainCoralPolypUIY=350;

let outlinerIcon1X=70;
let outlinerIcon1Y=250;

let outlinerIcon2X=70;
let outlinerIcon2Y=350;



function spawnCreature({
  name,
  requiredAlgae,
  requiredPlankton,
  CreatureClass,
  posXOffset = () => actorSelected.x + Math.random() * 40 + 40,
  posYOffset = () => actorSelected.y - 100,
  hungerMin = 60,
  hungerMax = 100,
}) {
  // Population check first (consistent)
  if (actorSelected.popArray.length >= actorSelected.popLimit) {
    alertText = "Pop Limit Exceeded";
    return false;
  }

  // Resource validation
  if (actorSelected.algaeStored < requiredAlgae) {
    alertText = `Not Enough Algae (need ${requiredAlgae})`;
    return false;
  }
  if (actorSelected.planktonStored < requiredPlankton) {
    alertText = `Not Enough Plankton (need ${requiredPlankton})`;
    return false;
  }

  // Deduct & create
  actorSelected.algaeStored -= requiredAlgae;
  actorSelected.planktonStored -= requiredPlankton;

  const posX = posXOffset();
  const posY = posYOffset();
  const creature = new CreatureClass(posX, posY, actorSelected);
  creature.hunger = Math.floor(Math.random() * (hungerMax - hungerMin + 1)) + hungerMin;

  PCArray.push(creature);
  actorSelected.popArray.push(creature);
  return true;
}


function spawnShrimp() {
	spawnCreature({
		requiredAlgae:25,
		requiredPlankton:25,
		CreatureClass: Shrimp,
		posXOffset: () => actorSelected.x + Math.random() * 80 + 20,
	})
}
function spawnDamselFish() {
	if (resourceData.coralCapacity.total < 4) {
		alertText = "Need at least 4 coral";
		return;
	}
	const hasDamselfish = actorSelected.popArray.some(creature => creature instanceof Damselfish);
	if(hasDamselfish){
		alertText="Only One Damselfish Per Brain Coral";
		return;
	}
	spawnCreature({
		requiredAlgae:200,
		requiredPlankton:200,
		CreatureClass: Damselfish,
		posXOffset: () => actorSelected.x + Math.random() * 80 + 20,
	})
}

function spawnSeahorse() {
	spawnCreature({
		requiredAlgae:0,
		requiredPlankton:150,
		CreatureClass: Seahorse,
		posXOffset: () => actorSelected.x + Math.random() * 80 + 20,
	})
}
function spawnClownfish() {
  spawnCreature({
    requiredAlgae: 75,
    requiredPlankton: 75,
    CreatureClass: Fish,
    posXOffset: () => actorSelected.x + Math.random() * 80 + 20,
  });
}
function spawnPistolShrimp() {
  spawnCreature({
    requiredAlgae: 0,
    requiredPlankton: 75,
    CreatureClass: PistolShrimp,
    posXOffset: () => actorSelected.x + Math.random() * 80 + 20,
  });
}
function spawnYellowTang(){
	  spawnCreature({
    requiredAlgae: 0,
    requiredPlankton:0,
    CreatureClass: YellowTang,
    posXOffset: () => actorSelected.x + Math.random() * 80 + 20,
  });
}

function handleShrimpClickUI(evt){
	
	const { x: canvasX, y: canvasY } = getUICanvasCoords(evt);
    
	const distance = Math.sqrt((canvasX - outlinerIcon1X) ** 2 + (canvasY - outlinerIcon1Y) ** 2);
	// If click inside the circle, spawn a fish
	
    if (distance < UIRadius&& actorSelected instanceof BrainCoral ) {
        spawnShrimp();
    }
}

function handleDamselfishClickUI(evt){

	const { x: canvasX, y: canvasY } = getUICanvasCoords(evt);
    
	const distance = Math.sqrt((canvasX - outlinerIcon2X) ** 2 + (canvasY - outlinerIcon2Y) ** 2);
	// If click inside the circle, spawn a fish
	
    if (distance < UIRadius&& actorSelected instanceof BrainCoral ) {
        spawnDamselFish();
    }
}

function handleSeahorseClickUI(evt){
	
	const { x: canvasX, y: canvasY } = getUICanvasCoords(evt);
    
	const distance = Math.sqrt((canvasX - outlinerIcon1X) ** 2 + (canvasY - outlinerIcon1Y) ** 2);
	// If click inside the circle, spawn a fish
      if (distance < UIRadius && actorSelected && actorSelected instanceof OrganPipeCoral) {
            spawnSeahorse();
            
        } 

        
 }
 function handlePistolShrimpClickUI(evt){
	
	const { x: canvasX, y: canvasY } = getUICanvasCoords(evt);
    
	const distance = Math.sqrt((canvasX - outlinerIcon2X) ** 2 + (canvasY - outlinerIcon2Y) ** 2);
	// If click inside the circle, spawn a fish
      if (distance < UIRadius && actorSelected && actorSelected instanceof OrganPipeCoral) {
            spawnPistolShrimp();
            console.log("Pistol Shrimp added. Population: ", actorSelected.popArray.length);
        } 

        
 }
function handleClownfishClickUI(evt) {
	
	
	const { x: canvasX, y: canvasY } = getUICanvasCoords(evt);
    
	const distance = Math.sqrt((canvasX - outlinerIcon1X) ** 2 + (canvasY - outlinerIcon1Y) ** 2);

    // Check if the click is within the UI radius and an anemone is selected
    if (distance < UIRadius && actorSelected && actorSelected instanceof Anemone) {
        if (actorSelected.popArray.length < actorSelected.popLimit) {
            spawnClownfish();
           
        } else {
            console.log("Clownfish population limit: "+actorSelected.popArray.length);
			hoverText="Clownfish Population Reached"
        }

        // Redraw to reflect changes
       // drawWorkerCardArrAnemone();
    }
}
function handleYellowTangClickUI(evt){
	
	const { x: canvasX, y: canvasY } = getUICanvasCoords(evt);
    
	const distance = Math.sqrt((canvasX - outlinerIcon1X) ** 2 + (canvasY - outlinerIcon1Y) ** 2);

    // Check if the click is within the UI radius and an anemone is selected
    if (distance < UIRadius && actorSelected && actorSelected instanceof FingerCoral) {
        if (actorSelected.popArray.length < actorSelected.popLimit) {
            spawnYellowTang();
           
        } else {
            console.log("Population Limit "+actorSelected.popArray.length);
			hoverText="Population Reached" // 
        }

        // Redraw to reflect changes
       // drawWorkerCardArrAnemone();
    }
}