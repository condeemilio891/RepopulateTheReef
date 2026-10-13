function toggleSaveGameMenu(evt){
	if(actorSelected===null){
		const { x: mouseXUI, y: mouseYUI } = getUICanvasCoords(evt);
		const halfSize = UIRadius / 2;
		if (mouseXUI > saveIconUIX - halfSize && mouseXUI < saveIconUIX + halfSize &&
			mouseYUI > saveIconUIY - halfSize && mouseYUI < saveIconUIY + halfSize) {
				if(!saveGameMenuToggled){
					saveGameMenuToggled=true
					saveIcon.src = "Pics/uiIcons/saveIconActive.png";
					selectText="Save"
					
					objectivesMenuToggled=false;
					objectivesIcon.src="Pics/uiIcons/objectivesIcon.png"
					evolutionMenuToggled=false;
					evolutionIcon.src="Pics/uiIcons/evolutionIcon.png"
					researchMenuToggled=false;
					researchMenuIcon.src="Pics/uiIcons/researchIcon.png";
				}else{
					saveGameMenuToggled=false;
					saveIcon.src="Pics/uiIcons/saveIcon.png";
					selectText ="Corals" 
				}				
		}
	}
}
function selectSaveAndLoadCard(evt) {
	
    if (!saveGameMenuToggled || actorSelected !== null) return;
    const { x: mouseXUI, y: mouseYUI } = getUICanvasCoords(evt);
    saveCards.forEach(card => {
       
        if (mouseXUI > card.x && mouseXUI < card.x + card.width &&
            mouseYUI > card.y && mouseYUI < card.y + card.height){
				if(card.title==="Save Game 1"){
					saveGameState();
				}else{
					loadGameState()
				}
		}
    });
    

}
/* TO DO

let actorsArray=[]; pcArr+ jelly? lets not use it for now maybe we can depricate? 

let coralArray=[]; let me try to not save this as well see what gets affected calculations seem to work well 
let placeCoralArray=[];
let jellyfishArray=[]; still maybe just keep in gamestart and dont clear */  

function saveToLocalStorage(){
    const gameState = {
		calciumCarbonate: calciumCarbonateArray.map(cc=> cc.toData()),
		seaweed: seaweedArray.map(s=>s.toData()),
		seagrass: seagrassArray.map(s=>s.toData()),
		sponges: spongeArray.map(s=>s.toData()),
		
		pipeCoral:organPipeCoralArray.map(c=>c.toData()),
		brainCoral:brainCoralArray.map(c=>c.toData()),
		anemone:anemoneArray.map(a=>a.toData()),
		crabs: PCArray.flatMap(a => a instanceof Crab ? [a.toData()] : [])
    };
	localStorage.setItem('myGameSave', JSON.stringify(gameState));
    console.log('Game saved!');
	alertText="Game Saved";

}



function loadFromLocalStorage() {
	document.querySelectorAll('progress.progress').forEach(bar => bar.remove());
    const saved = localStorage.getItem('myGameSave');
    if (!saved) return;
    
    const gameState = JSON.parse(saved);
    
    // Clear existing array and repopulate
    calciumCarbonateArray=[];
    gameState.calciumCarbonate.forEach(data => {
        calciumCarbonateArray.push(CalciumCarbonate.fromData(data));
    });
	//seagrass 
	seagrassArray=[];
	gameState.seagrass.forEach(data=>{
		seagrassArray.push(Seagrass.fromData(data));
	})
	//seaweed 
	seaweedArray=[];
	gameState.seaweed.forEach(data=>{
		seaweedArray.push(Seaweed.fromData(data));
	})
    //sponge
	spongeArray=[];
	gameState.sponges.forEach(data=>{
		spongeArray.push(Sponge.fromData(data));
	})
	
	
	//corals 
	//PipeCoral
	organPipeCoralArray=[];
	gameState.pipeCoral.forEach(data=>{
		const coral = OrganPipeCoral.fromData(data,null);// dont need it but lets keep it consist
		coral.setLevelStats();
		organPipeCoralArray.push(coral);
	})
	//Brain Coral 
	brainCoralArray=[];
    gameState.brainCoral.forEach(data => {
        const coral = BrainCoral.fromData(data, null); // second param not used inside
		// make a set level stats 
        brainCoralArray.push(coral);
    });
	//anemone 
	anemoneArray=[];
	gameState.anemone.forEach(data =>{
		const coral = Anemone.fromData(data,null);
		coral.setLevelStats();
		anemoneArray.push(coral);
	})
	

	// recreate actors 
	PCArray=[];
	const tempPCArrayBrainCoral= brainCoralArray.flatMap(coral => coral.popArray);
	const tempPCArrayPipeCoral = organPipeCoralArray.flatMap(coral => coral.popArray);
	const tempPCArrayAnemone= anemoneArray.flatMap(coral=>coral.popArray);
	
	
	PCArray = [
		...gameState.crabs.map(data => Crab.fromData(data, null)),  // crabs first
		...tempPCArrayBrainCoral,
		...tempPCArrayPipeCoral,
		...tempPCArrayAnemone
	];
	
	//recreate coral UI 
	const tempCoralArray=[...brainCoralArray,...anemoneArray, ...organPipeCoralArray];
	coralArray=[];// Draw CC relies on Coral[0] to be first coral so we need to save first coral and load it first.
	coralArray=[...tempCoralArray];
	
	initCoralCards(offsetX, offsetY, reducedWidth);
	pixiDrawSprites();
    console.log('Game loaded!', coralArray);
	alertText="Game Loaded";
}


function saveGameState(){
		if(!saveGameMenuToggled){
			console.log("save Menu NOt toggled")
			return
		}
		saveToLocalStorage();
}

function loadGameState(){
	if(!saveGameMenuToggled){
			console.log("save Menu NOt toggled")
			return		
	}
	loadFromLocalStorage();
}


function saveTest(evt){
	
	if(evt.key==="p"){
		if(!saveGameMenuToggled){
			console.log("save Menu NOt toggled")
			return
		}
		saveToLocalStorage();
	}
}

function loadTest(evt){
		if(evt.key==="l"){
		if(!saveGameMenuToggled){
			console.log("save Menu NOt toggled")
			return
		}
		loadFromLocalStorage();
		
	}
}