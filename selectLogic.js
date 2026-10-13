let savedCurrActor=null;
function selectEvents(evt){
	
	let prevActorSelected=setPrevActorSelected();
	selectTidemill(evt);
	selectSandBattery(evt);
	selectSolarPanel(evt)
	selectSeaweed(evt);
	selectSeagrass(evt);
	selectRocks(evt);
	selectSponge(evt);
	selectOrganPipeCoral(evt);
	selectAnemone(evt);
	selectBrainCoral(evt);
	selectFingerCoral(evt);

	selectJellyfish(evt);
	selectPlayableCharacters(evt); //priority
	
	//handle find prev
	
	cancelCommand();
}

function setPrevActorSelected() {
  // Return immediately if we have a selection
  if (actorSelected !== null) return actorSelected;

  
  return null;
}
function saveCurrActorSelected(){
	if(actorSelected!==null)return actorSelected;
	
	return null;
}

function deselectAllOtherActors() {
  [
     brainCoralArray, PCArray,
    organPipeCoralArray, anemoneArray, 
    spongeArray, seaweedArray, seagrassArray, jellyfishArray,rocksArray,tidemillArray,sandBatteryArray
  ].flat().forEach(a => {
    if (a !== actorSelected) {
      a.selected = false;
      a.multipleSelected = false; 
    }
  });
}

function cancelCommand(){
	//for now we have hermit 
	PCArray.forEach(actor=>{
		if(actor instanceof HermitCrab){
			actor.isPickUpAnemoneActive=false;
			actor.currStateText="";
			
			uiCanvas.style.cursor = "default";
			canvas.style.cursor = "default";
		}
		else if(actor instanceof Crab){
			actor.isGatherActive=false;
			actor.currStateText="";
			
			uiCanvas.style.cursor = "default";
			canvas.style.cursor = "default";			
		}
	})
}

 




function selectActor(evt, array, actorType) {
    let found = false;
	
    array.forEach(actor => {
        if (mouseX > actor.x && mouseX < actor.x + actor.width &&
            mouseY > actor.y && mouseY < actor.y + actor.height) {
			actorSelected=null;
            array.forEach(a => a.selected = false); // Deselect all
            actor.selected = true;  // Select this actor
            actorSelected = actor; // Set actorSelected
			savedCurrActor=saveCurrActorSelected();
			deselectAllOtherActors();
            found = true;
            //restoreUICanvas();
        }
    });

    if (!found) {
        array.forEach(a => a.selected = false);
		
        actorSelected = null;
        
		selectText = "Corals " + getNumberOfCorals();
		saveGameMenuToggled=false;
		saveIcon.src="Pics/uiIcons/saveIcon.png";
		objectivesMenuToggled=false;
		objectivesIcon.src="Pics/uiIcons/objectivesIcon.png";
		evolutionMenuToggled=false;
		evolutionIcon.src="Pics/uiIcons/evolutionIcon.png";
    }
}


 //attacking 
 
function setAttackTargets(savedCurrActor) {
	[PCArray].flat().forEach(actor=>{ // replace with PC array? 
		if(actor.isAttackingActive){
			actor.attackTarget=savedCurrActor;
			actor.isAttackingActive=false;
			//actor.isAttackingUIActive=false;
			actor.state="reset";
		}
	})
}



function selectPlayableCharacters(evt){
	selectActor(evt,PCArray,"PlayableChars");
/* 		if(actorSelected instanceof Fish){
		playSound(selectClownfishSound, {
		  volume: 0.8,         // 0.0 to 1.0
		  playbackRate: 1.2    // Speed multiplier
		});
	} */
}


function selectFingerCoral(evt){
	selectActor(evt,fingerCoralArray,"FingerCoral");
}
function selectAnemone(evt) {
    selectActor(evt, anemoneArray, "Anemone");
}

function selectOrganPipeCoral(evt){
	selectActor(evt,organPipeCoralArray,"OrganPipeCoral");
}

function selectSeaweed(evt){
	selectActor(evt,seaweedArray,"Seaweed");
}
function selectSeagrass(evt){
	selectActor(evt,seagrassArray,"Seagrass");
}
function selectKrill(evt){
	selectActor(evt,krillArray,"Krill");
}

function selectBrainCoral(evt){
	selectActor(evt,brainCoralArray,"BrainCoral");
	
}
function selectSponge(evt){
	selectActor(evt,spongeArray,"Sponge");
}
function selectJellyfish(evt){

	//check to see if any of the current actors are on attack mode?? 
	selectActor(evt,jellyfishArray,"Jellyfish")
	

}
function selectRocks(evt){
	selectActor(evt,rocksArray,"Rocks");
}

function selectTidemill(evt){
	selectActor(evt,tidemillArray,"Tidemill");
}

function selectSandBattery(evt){
	selectActor(evt,sandBatteryArray,"SandBattery");
}

function selectSolarPanel(evt){
	selectActor(evt,solarPanelArray,"SolarPanel")
}