let gameClock = {
    hours: 6,
    minutes: 0,
    dayLength: 24, // 24-hour cycle
    tickMin: 3000,  // 1 second per tick 
	tick:500,
    dayPhase: "Day",  // Track if it's day or night
	day:1,
	monthLength:10,
	month:1, // lets make months like 10  days
	season: "summer",
	moonCycle: "halfMoon"
};

let gameTimeUIX=15;
let gameTimeUIY=790;
let gameTimeText=`${gameClock.hours}:${gameClock.minutes < 10 ? '0' : ''}${gameClock.minutes} - ${gameClock.dayPhase}`;
let gameMinuteInterval;
let gameTickInterval;

let redrawBug=false; // redraws rocks gpu

let warningImg= new Image();
warningImg.src="Pics/warning.png"

function gameTick(){

	calculateResources();
	updateAllEnergyGrids();
	drawResourceBanner();
	
	removeDeadActorsInPlace(PCArray);
	removeResourcesInPlace(rocksArray);
	
}

function gameMinute() {
	
    gameClock.minutes ++; 
	
    // Handle hour rollover
    if (gameClock.minutes >= 60) {
        gameClock.minutes = 0;
        gameClock.hours++;

        // Handle day/night transitions
        if (gameClock.hours >= gameClock.dayLength) {
            gameClock.hours = 0;
			gameClock.day++
        }
        updateDayNightCycle();
		updateMonth();
    }
	gameTimeText = `${getMonth()} ${gameClock.hours}:${gameClock.minutes < 10 ? '0' : ''}${gameClock.minutes} -  - ${gameClock.season} - ${gameClock.moonCycle} - ${gameClock.dayPhase}`;
    //console.log(`Time: ${gameClock.hours}:${gameClock.minutes < 10 ? '0' : ''}${gameClock.minutes} - ${gameClock.dayPhase}`);
	
	for (let playerActor of PCArray){
		playerActor.produceAmmonia();
		//playerActor.handleHungerAndStamina();
		playerActor.handleHunger();
		if(playerActor instanceof HermitCrab){
			playerActor.live();
		}
	}
	for (let coral of brainCoralArray) {
		coral.findState();
    }
	for (let anemone of anemoneArray){
		anemone.findState();
		//anemone.feedAmmoniaToSeaweed();
	}
	for(let pipe of organPipeCoralArray){
		pipe.findState();
		
	}
	
	for(let sponge of spongeArray){
		sponge.live();
	}
	for(let jelly of jellyfishArray){
		jelly.handleHunger();
	}
	for(seagrass of seagrassArray){
		seagrass.live();
	}
	for(seaweed of seaweedArray){
		seaweed.live();
	}
	handleBatteryEnergyAccumulation()
	console.log("actorSelected: ", actorSelected);
	//console.log("coralCardArr: ", coralCardArray)


  
	if(gameClock.minutes%3===0){
		addDisplacementEffect();
	}
	if(gameClock.minutes%4===0){
		calculateTemperature()
		
	}
	//Effects
	createBubbleEffectAtActors();
	createExpelAlgaeEffect();
	//Bug fix maybe implement a loading screen?? 
	//LOADING LOADING LOADING
	if(!redrawBug){
		updateMoonCycle();
		gameClock.season = getSeason();
		drawPixiRocks();
		calculateTemperature();
		for(let sickCoral of organPipeCoralArray){
			sickCoral.setLevelStats();
			sickCoral.algaeStored=40;
			//let newSeahorse= new Seahorse(sickCoral.x,sickCoral.y,sickCoral);
			//sickCoral.popArray.push(newSeahorse)
		}
		loadJellyfish();
		loadBarracuda();
		loadHermitCrab()
		redrawBug=true;
		isGameLoaded=true;
		
		// NOTIFICATIONS STUFF to test
		createNotification(warningImg, "No Research Assigned Choose Research", priority = "normal");
		createNotification(warningImg, "No Adaptations Chosen Choose An Adaptation", priority = "normal");

	}
	
	
}

function updateDayNightCycle() {
    if (gameClock.hours >= 6 && gameClock.hours < 20) {
        gameClock.dayPhase = "Day";		
    } else {
        gameClock.dayPhase = "Night";
    }

    // Trigger visual/environmental changes
    console.log(`It's now ${gameClock.dayPhase}`);
}

function updateMonth() {
  if (gameClock.day >= gameClock.monthLength) {
    gameClock.month++;
    gameClock.day = 1;
    
    // Wrap around after December
    if (gameClock.month > 12) {
      gameClock.month = 1;
    }
    
    // Update season based on the new month
    gameClock.season = getSeason();
  }
  updateMoonCycle();
}
function getSeason() {
  const month = gameClock.month;
  let season = "";
  
  if (month === 12 || month === 1 || month === 2) {
    season = "Winter";
  } else if (month >= 3 && month <= 5) {
    season = "Spring";
  } else if (month >= 6 && month <= 8) {
    season = "Summer";
  } else if (month >= 9 && month <= 11) {
    season = "Fall";
  } else {
    season = "Invalid month";
  }
  
  return season;
}
function getMonth() {
  let month = "";
  switch (gameClock.month) {
    case 1:
      month = "January";
      break;
    case 2:
      month = "February";
      break;
    case 3:
      month = "March";
      break;
    case 4:
      month = "April";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "June";
      break;
    case 7:
      month = "July";
      break;
    case 8:
      month = "August";
      break;
    case 9:
      month = "September";
      break;
    case 10:
      month = "October";
      break;
    case 11:
      month = "November";
      break;
    case 12:
      month = "December";
      break;
    default:
      month = "Invalid month";
  }
  return month;
}



function updateMoonCycle() {
  const monthDay = gameClock.day; // 1 to 10
  if (monthDay === 1) {
    gameClock.moonCycle = "🌑 New Moon";
  } else if (monthDay === 2 || monthDay === 3) {
    gameClock.moonCycle = "🌒 Waxing Crescent";
  } else if (monthDay === 4 || monthDay === 5) {
    gameClock.moonCycle = "🌓 First Quarter";
  } else if (monthDay === 6 || monthDay === 7) {
    gameClock.moonCycle = "🌔 Waxing Gibbous";
  } else if (monthDay === 8) {
    gameClock.moonCycle = "🌕 Full Moon";
  } else if (monthDay === 9 || monthDay === 10) {
    gameClock.moonCycle = "🌖 Waning Gibbous";
  } 
	updateTidemills()
}

function drawTime(){
	
	uiCanvasContext.textAlign="left"
	uiCanvasContext.fillStyle = "white";  // Text color
    uiCanvasContext.font = "19px Arial";
   
	drawMultilineText(uiCanvasContext, gameTimeText, gameTimeUIX, gameTimeUIY, 20)
}

function removeDeadActorsInPlace(actors) {
  for (let i = actors.length - 1; i >= 0; i--) {
    const actor = actors[i];
    if (actor.state === "dead") {
		
		if (actor.home && actor.home.popArray) {
		  const popArray = actor.home.popArray;
		  const popIndex = popArray.indexOf(actor);
		  if (popIndex !== -1) {
			popArray.splice(popIndex, 1);
		  } else {
			console.warn(`Dead actor ${actor.id} not found in its home.popArray`, actor);
		  }
		}


      // Remove from the input array
      actors.splice(i, 1);
      actor.selected = false;
      alertText= actor.name +" has Died!"
	  
    }
  }
}

function removeResourcesInPlace(resources) {
  for (let i = resources.length - 1; i >= 0; i--) {
    const resource = resources[i];
    if (resource.calciumCarbonate<=0) { // make algae one as well
		
		if (resource.home && resource.home.popArray) {
		  const popArray = resource.home.popArray;
		  const popIndex = popArray.indexOf(resource);
		  if (popIndex !== -1) {
			popArray.splice(popIndex, 1);
		  } else {
			console.warn(`Dead resource ${resource.id} not found in its home.popArray`, resource);
		  }
		}


      // Remove from the input array
      resources.splice(i, 1);
      resource.selected = false;
      alertText= resource.name +" Depleted"
	  
	  drawPixiRocks();
    }
  }
}



function calculateTemperature() {
    // Base temperature ranges by season (in Fahrenheit)
	
    let baseMin, baseMax;
    
    switch (gameClock.season) {
        case "Summer":
            baseMin = 82;
            baseMax = 92;
            break;
        case "Winter":
            baseMin = 72;
            baseMax = 78;
            break;
        case "Spring":
			baseMin = 78;
			baseMax = 85
        case "Fall":
            baseMin = 77;
            baseMax = 83;
            break;
        default:
            baseMin = 77;
            baseMax = 83;
    }
    
    // Adjust for day/night
    let minTemp, maxTemp;
    if (gameClock.dayPhase === "Day") {
        // Day: +2°F to +4°F above base
        minTemp = baseMin + 2;
        maxTemp = baseMax + 4;
    } else {
        // Night: -2°F to 0°F relative to base (slightly cooler)
        minTemp = baseMin - 2;
        maxTemp = baseMax;
    }
    
    // Clamp to realistic reef temperatures (optional, prevents extreme values)
   minTemp = Math.min(Math.max(minTemp, 68), 92);
   maxTemp = Math.min(Math.max(maxTemp, 70), 94);
    
    // Generate random temperature with 1 decimal place
    const newTemp = (Math.random() * (maxTemp - minTemp) + minTemp).toFixed(1);
    
    // Convert to number and store
    resourceData.temperature.total = parseFloat(newTemp);
    
    // Optional: redraw the banner so the change appears immediately
    // drawResourceBanner();
}

function updateAllEnergyGrids() {
    const allBuildings = [...tidemillArray, ...solarPanelArray];
    
    // Helper: check if two buildings are connected (distance ≤ either one's radius)
    const areConnected = (b1, b2) => {
        if (b1 === b2) return true;
        const dx = (b1.x + b1.width/2) - (b2.x + b2.width/2);
        const dy = (b1.y + b1.height/2) - (b2.y + b2.height/2);
        const dist = Math.hypot(dx, dy);
        return dist <= b1.radius || dist <= b2.radius;
    };
    
    const visited = new Set();
    
    for (const start of allBuildings) {
        if (visited.has(start)) continue;
        
        // BFS to find one connected component
        const queue = [start];
        const component = [];
        
        while (queue.length) {
            const current = queue.shift();
            if (visited.has(current)) continue; //Prevent loops skip if already processed
            visited.add(current); // mark visited
            component.push(current);
            
            for (const other of allBuildings) {
                if (!visited.has(other) && areConnected(current, other)) { 
                    queue.push(other);
                }
            }
        }
        
        // Sum power of the component and assign to each building
        const total = component.reduce((sum, b) => sum + b.powerProduction, 0);
        for (const b of component) {
            b.totalGridPower = total;
        }
    }
}

function handleBatteryEnergyAccumulation(){
	for(let building of sandBatteryArray){
		building.acumulatePower();
	}
}

function updateTidemills(){
	for(let building of tidemillArray){
		building.tidalForce=getTidalForce();
		building.powerProduction=building.tidalForce *2 
	}
}

function getTidalForce() {
  const phase = gameClock.moonCycle;
  let tidalForce = 0;
  
  if (phase.includes("New Moon")) {
    tidalForce = 2;   // lowest tidal pull
  } else if (phase.includes("Waxing Crescent")) {
    tidalForce = 4;
  } else if (phase.includes("First Quarter")) {
    tidalForce = 6;
  } else if (phase.includes("Waxing Gibbous")) {
    tidalForce = 8;
  } else if (phase.includes("Full Moon")) {
    tidalForce = 10;  // strongest
  } else if (phase.includes("Waning Gibbous")) {
    tidalForce = 8;   // decreasing
  } else {
    tidalForce = 5;   // fallback
  }
  
  return tidalForce;
}