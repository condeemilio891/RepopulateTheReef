let pixiWorld=null;
let pixiApp=null;

let isGameLoaded=false;

let canvas, canvasContext;
let gameRunning = false;
let uiCanvas;
let uiCanvasContext;
let resourceCanvas;
let resourceCanvasContext;

const BASE_CSS_WIDTH = 420; // for resizeUI


let actorSelected=null; // Make this a stack so user can go to prev actor :) 


//Outliner Menus
let saveGameMenuToggled=false;
let objectivesMenuToggled=false;
let evolutionMenuToggled=false;
let researchMenuToggled=false;

// mouse pos
let mouseX = 0;
let mouseY = 0;

let mouseXUI=0;
let mouseYUI=0;

let mouseXUIResource=0;
let mouseYUIResource;
let countdown = 5;

//ARRAYSSS

let actorsArray=[];
let PCArray=[];


let calciumCarbonateArray=[];
let coralArray=[];
let placeCoralArray=[];
let coralCardArray=[];
let organPipeCoralArray=[];
let brainCoralArray=[];
let anemoneArray=[];
let fingerCoralArray=[];

let seaweedArray=[]; 
let seagrassArray=[];
let spongeArray=[];
let rocksArray=[];
let krillArray=[];
//enemies
let jellyfishArray=[];
let barracudaArray=[];
//UI
let UIOutlinerCardArray=[];

let saveCards = [];

//particles 
let particlesArray=[];
//buildings 

let tidemillArray=[]; // gen to buildings?
let sandBatteryArray=[];
let solarPanelArray=[];



let bleachedCoralArray=[];


// UI VARIABLES 


//place Menu
let togglePlaceCoralMenu=false; 



// UI Icons GLOBAL 

let healthIcon=new Image();
healthIcon.src="./Pics/uiIcons/heartIcon.png";

let hungerIcon=new Image();
hungerIcon.src="./Pics/uiIcons/stomachIcon.png";

let staminaIcon=new Image();
staminaIcon.src="./Pics/uiIcons/batteryIcon.png";

let planktonStoredIcon=new Image();
planktonStoredIcon.src="./Pics/uiIcons/planktonStoredIcon.png"

let algaeStoredIcon=new Image();
algaeStoredIcon.src="./Pics/uiIcons/algaeStoredIcon.png"

let thermometerIcon=new Image();
thermometerIcon.src="./Pics/uiIcons/thermometerIcon.png"




// diet Icons
let carnivoreIcon=new Image();
carnivoreIcon.src= "./Pics/attributeIcons/carnivoreIcon.png";
let herbavoreIcon=new Image();
herbavoreIcon.src= "./Pics/attributeIcons/herbavoreIcon.png";
let omnivoreIcon=new Image();
omnivoreIcon.src= "./Pics/attributeIcons/omnivoreIcon.png";
let filterFeederIcon=new Image();
filterFeederIcon.src="./Pics/attributeIcons/filterFeederIcon.png";
let producerIcon= new Image();
producerIcon.src="./Pics/attributeIcons/producerIcon.png";



// check coral for is active 

let activePlaceImage = new Image();
let isPlaceImageActive = false;
let babyAnemoneImage= new Image();
babyAnemoneImage.src="Pics/PlaceMenuIcons/anemoneSmall.png";



//ui hover events refactor this 
let clownfishImageUIHovered=false;
let mantisShrimpImageUIHovered = false;
let seahorseUIHovered=false;
let brainCoralPolypUIHovered=false;







const limestoneImage = new Image();
    limestoneImage.src = "./Pics/calciumCarb.png";







function gameStart() {
	
		loadSeaweed();
		loadSeagrass();
		loadSponges();
		loadBrainCoral();
		loadOrganPipeCoral();
		
		loadTidemill();//test cpuC
		loadSandBattery()//test cpu
		loadSolarPanel()//test cpu 
		loadRocks();
		
		loadCalciumCarbonate(750);
		populateAnimArrays();
		initPixiApp();
		initPIXIImages();
		
		drawPixiApp();

		loadCrab();
		
		//UI
		//place menu ui 
		drawPlaceMenuUI();
		drawPlaceMenuUIEnergyBuildings();
		//Resource UI
		drawResourceBanner();
		resizeResourceBanner();
		// uiCanvasContext
		initCoralCards(offsetX, offsetY, reducedWidth)
		//progress bars
		initGrowthProgressBar();
		initProductionProgressBar();
		initOverheatingProgressBar();
		initSaveLoadCards(offsetX, offsetY, reducedWidth);
		//init buttons 
		initializeUIOutlinerButtons()
		// 
		calculateResources()
		selectText = getNumberOfCorals()+ " Corals";
		drawSelectedUnitText();
		
		// init notifications
		setupNotificationCanvas()
		resizeNotificationCanvas();
		

}

let gameLoopStarted=false;
function gameLoop() {
	if (!gameRunning) return;
	
	if(!gameLoopStarted){
		gameLoopStarted=true;
		gameMinuteInterval = setInterval(gameMinute, gameClock.tickMin);
		gameTickInterval= setInterval(gameTick, gameClock.tick);

	}
	updateAll();
	requestAnimationFrame(gameLoop);
	
}


window.onload = function() {
	document.addEventListener('contextmenu', function (event) { // prevents right click menu!! 
		event.preventDefault(); 
		return false;
	});
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
	uiCanvas=document.getElementById("uiCanvas");
	uiCanvasContext= uiCanvas.getContext("2d");
	resourceCanvas = document.getElementById('resourceCanvas');
	resourceCanvasContext=resourceCanvas.getContext('2d');
		gameStart();
		
      if (!gameRunning) { // ensure only one game is running.
        gameRunning = true;
        gameLoop();
    }
	resourceCanvas.addEventListener("mousemove",(evt)=>handleHoverEventsResourceUI(evt))
	uiCanvas.addEventListener('mousemove',(evt)=> handleHoverEventsUI(evt));
	canvas.addEventListener('mousemove', (evt) => handleHoverEvents(evt));
	uiCanvas.addEventListener('click', (evt) => handleUIClickEvents(evt));
	window.addEventListener('keydown',cancelBuilding);
	window.addEventListener('resize',(evt)=> getUICanvasCoords(evt));
	window.addEventListener('resize',(evt)=> resizeResourceBanner(evt));
	window.addEventListener('resize',(evt)=> resizeBulmaMenu(evt));
	window.addEventListener('resize', resizeNotificationCanvas);
	//window.addEventListener('keydown',saveTest);
	//window.addEventListener('keydown', loadTest);
	window.addEventListener('keydown', (event) => {
		const key = event.key;
		if (["w","s","a","d","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(key)) {
			event.preventDefault(); // prevent default arrow key scrolling
			scrollPage(key);
		}
	});
	
	canvas.addEventListener('mousedown', (evt) => {
		if (evt.button === 0) { 
			selectEvents(evt);
			executeSpawnCoral(evt);
			
		}
		if(evt.button ===2){// 2 = Right mouse button
			executeCommand(evt);
			cancelBuilding(evt);
		}
	});
	
};
function updateAll() {

	const viewLeft = window.scrollX;
	const viewTop = window.scrollY;
	const viewRight = viewLeft + window.innerWidth;
	const viewBottom = viewTop + window.innerHeight;

	canvasContext.clearRect(0, 0, canvas.width, canvas.height);
	clearUICanvas();
	
	//check mouse over refactor to all
	isMouseOverCalcium = checkMouseOverCalcium();
	isMouseCloseToCoral= isCoralWithinRange(mouseX,mouseY);

	//drawTestLevel();

	drawUIOutliner();
	resizeUIPanel();


	drawSponges();
	drawCorals();
	for(let coral of coralArray){
		if(coral instanceof Anemone){
			coral.updatePixiAnemone();
			coral.checkIfAttached();
		}
	}
	drawRocks();
	drawJellyfish();
	drawBarracuda();
	
	drawPlayableChars();
	for (let pop of PCArray) {
	if (pop instanceof HermitCrab) {
		pop.updatePixiCrab();		// <-- This handles frameCounter + texture + position
		}
    }

	drawSeaweedAndSeaGrass();

	drawParticles();
	drawTidemill();
	drawSandBattery();
	drawSolarPanel()
	//drawBleachedCoral()
	//Notifications
	drawNotifications(notifCtx);
	// handle Preview Spawns
	checkIfBuildingOrCoralIsActive()
	//checkIfEnergyBuildingIsActive();
	
	

	if(isPlaceImageActive){
		previewPlaceCoral(activePlaceImage);	
	}
	if(actorSelected instanceof HermitCrab){
		if(actorSelected.isPutDownAnemoneActive){
			previewPlaceCoral(babyAnemoneImage);
		}
	}
	
	

}




function checkIfBuildingOrCoralIsActive() {
  // Priority: energy building over coral (or vice versa – your choice)
  const activeEnergy = placeMenuComponentsArrayEnergyBuildings.find(b => b.isActive === true);
  const activeCoral = placeMenuComponentsArray.find(c => c.isActive === true);

  let activeComponent = null;
  
  if (activeEnergy) {
    activeComponent = activeEnergy;
  } else if (activeCoral) {
    activeComponent = activeCoral;
  }

  if (activeComponent) {
    activePlaceImage.src = activeComponent.imagePath;
    isPlaceImageActive = true;
    return true;
  } else {
    isPlaceImageActive = false;
    return false;
  }
}

function makeAllInactive() {
  // Loop through all components and deactivate them
  let anyDeactivated = false;
  for (let component of placeMenuComponentsArray) {
    if (component.isActive === true) {
      console.log("Deactivating coral:", component.type);
      component.isActive = false;
      anyDeactivated = true;
    }
  }
  for (let component of placeMenuComponentsArrayEnergyBuildings) {
    if (component.isActive === true) {
      console.log("Deactivating Building:", component.type);
      component.isActive = false;
      anyDeactivated = true;
    }
  }
  
  if (anyDeactivated) {
    isPlaceImageActive = false;
    activePlaceImage.src = ""; // clear the active image
  }
}

function updateMousePos(evt) {
    // Mouse on main canvas
    let rect = canvas.getBoundingClientRect();
    mouseX = evt.clientX - rect.left;
    mouseY = evt.clientY - rect.top;
    
/*     // Mouse on Pixi canvas
    let pixiCanvasRect = pixiApp.view.getBoundingClientRect();
    let pixiMouseX = evt.clientX - pixiCanvasRect.left;   // fix here
    let pixiMouseY = evt.clientY - pixiCanvasRect.top;    // fix here
    
    console.log("Main canvas mouse:", mouseX, mouseY);
    console.log("Pixi canvas mouse:", pixiMouseX, pixiMouseY); */
}
function handleHoverEvents(evt) {
    updateMousePos(evt);
	alertTextHoverEvents(evt);
	

}
function handleHoverEventsUI(evt){
	updateMousePosUI(evt);
	//handleHoverInfoButtons(evt);// depricated
	handleBuyImageHoverUI1(evt);
	handleBuyImageHoverUI2(evt);
	handleAbilityIcon1(evt)
	selectCoralCardHover(evt);
	saveIconHover(evt);
	updateSaveCardHover(evt);
	objectivesIconHover(evt);
	//evolutions
	evolutionIconHover(evt);
	epigenticIconsHover(evt)

	
}

function updateMousePosUI(evt){
	let uiRect=uiCanvas.getBoundingClientRect();
	mouseXUI=evt.clientX - uiRect.left;
	mouseYUI= evt.clientY - uiRect.top;
}

function handleUIClickEvents(evt){
	//coral menu toggle 
	
	// spawn events 
	handleClownfishClickUI(evt);
	handleShrimpClickUI(evt);
	handleSeahorseClickUI(evt);
	handleDamselfishClickUI(evt);
	handlePistolShrimpClickUI(evt);
	handleYellowTangClickUI(evt);
	//autoPilot
	triggerAutoPilot(evt);
	// toggle commands 
	triggerCallSchool(evt);
	triggerPickUpPutDownAnemone(evt)//uiCommandCont
	triggerGather(evt);//uiCommandCont
	triggerGatherRocks(evt)
	//coralCards and workers
	selectCoralCard(evt);
	handleSelectPrevAndNextCoral(evt);
	handleSelectPrevAndNextWorkerPage(evt)
	// select single units via cards 
	handleSelectCard(evt, Anemone);// workers
	handleSelectCard(evt, BrainCoral);
	handleSelectCard(evt, OrganPipeCoral);

	
	//outliner buttons 
	handleOutlinerButtonClick(evt);
	//toggle Save Menu 
	toggleSaveGameMenu(evt);
	selectSaveAndLoadCard(evt);
	//toggle Objectives Evolution menu
	toggleObjectivesMenu(evt);
	toggleEvolutionMenu(evt);
	//research 
	toggleResearchMenu(evt);
	
}

function handleHoverEventsResourceUI(evt){
	updateMousePosUIResource(evt);
	checkResourceHover(mouseXUIResource, mouseYUIResource)
}

function updateMousePosUIResource(evt){
	let uiRect=resourceCanvas.getBoundingClientRect();
	mouseXUIResource=evt.clientX-uiRect.left;
	mouseYUIResource=evt.clientY-uiRect.top;
	
}

function clearCanvas() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}
function clearUICanvas(){
	uiCanvasContext.clearRect(0,0,uiCanvas.width,uiCanvas.height);
}

	

//camera

function scrollPage(key, speed = 50) {
    switch (key) {
		case "W":
        case "w":
        case "ArrowUp":
            window.scrollBy(0, -speed); // Scroll up
            break;
		case "S":
        case "s":
        case "ArrowDown":
            window.scrollBy(0, speed); // Scroll down
            break;
		case "A":
        case "a":
        case "ArrowLeft":
            window.scrollBy(-speed, 0); // Scroll left
            break;
		case "D":
        case "d":
        case "ArrowRight":
            window.scrollBy(speed, 0); // Scroll right
            break;
    }
}

function snapToSelActor(){
	
	
	if(!actorSelected) return; 
	

		// Scroll so the actor is centered in the viewport
		window.scrollTo({
			left: actorSelected.x-700,
			top: actorSelected.y-700,
			behavior: 'smooth'
		});
	
}


function cancelBuilding(evt){
	if(evt.key==="c" || evt.button ===2){
		
		if(isPlaceImageActive){
			makeAllInactive();
		}

	}
}

