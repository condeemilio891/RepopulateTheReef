let fertilizedIcon= new Image();
fertilizedIcon.src="./Pics/resourceBannerIcons/growthIcon.png";

let planktonGrowthIcon= new Image();
planktonGrowthIcon.src="./Pics/resourceBannerIcons/planktonGrowthIcon.png"
let substrateIcon= new Image();
substrateIcon.src="./Pics/resourceBannerIcons/substrateIcon.png";

let nitrogenIcon = new Image();
nitrogenIcon.src="./Pics/resourceBannerIcons/nitrogenIcon.png";

let ammoniaIcon = new Image();
ammoniaIcon.src="./Pics/resourceBannerIcons/ammoniaIcon.png";

let moneyIcon = new Image();
moneyIcon.src="./Pics/resourceBannerIcons/moneyIcon.png";

let populationIcon = new Image();
populationIcon.src="./SpriteSheets/Clownfish/ClownfishSwim/clownfishSwim0.png";

let coralCapacityIcon= new Image();
coralCapacityIcon.src="./Pics/AttributeIcons/rustyCoralAttribute1.png"

let researchIcon=new Image();
researchIcon.src="./Pics/resourceBannerIcons/researchIcon.png"

let powerIcon=new Image();
powerIcon.src="./Pics/resourceBannerIcons/powerIcon.png"

let temperatureIcon = new Image();
temperatureIcon.src="./Pics/resourceBannerIcons/thermometerIcon.png"

// data for resource banner 


const resourceData={
	power:{
		total:0,
		icon:powerIcon,
		x:1250,
		y:0,
		text:"Total Power Production"
	},
	temperature:{
		total:83,
		icon:temperatureIcon,
		x:0,
		y:0,
		text:"Water Temperature"
	},
	growth: {
		total:0,
		totalCapacity:0,
        icon: fertilizedIcon,
        x: 0,
        y: 0,
		text:"Number Of Plants Growing"
    },
	plankton: {
		total:0,
        icon: planktonGrowthIcon,
		totalCapacity:0,
        x: 125,
        y: 0,
		text:"Number of Plants Producing Zooplankton"
    },


	ammonia: {
		total:0,
        icon: ammoniaIcon,
        x: 400,
        y: 0,
		text:"Ammonia in Reef"
    },
	nitrogen: {
		total:0,
        icon: nitrogenIcon,
        x: 500,
        y: 0,
		text:"Nitrogen in Reef"
    },
	
	substrate: {
		total:0,
        icon: substrateIcon,
        x: 800,
        y: 0,
		text:"Substrate Planted"
    },
	population: {
		total:0,
		totalCapacity:0,
		icon: populationIcon,
		x:900,
		y:0,
		text:"Population"
	},
	coralCapacity:{
		total: 0, 
		totalCapacity:0,
		icon: coralCapacityIcon, 
		x: 1000,
		y:0,
		text:"Coral Capacity"
	},
	money: {
		total:10000,
        icon: moneyIcon,
        x: 1250,
        y: 0,
		text:"Money"
    },

	research:{
		total:0,
        icon: researchIcon,
        x: 1150,
        y: 0,
		text:"Research"
	}

}

// ----------------------------------------------------------------------
// 1. Fixed logical dimensions (choose values that suit your layout)
const RESOURCE_BANNER_LOGICAL_WIDTH = 1400;
const RESOURCE_BANNER_LOGICAL_HEIGHT = 30;

// Store icon positions in logical coordinates (set once after computing layout)
let resourceIconPositions = {}; // key => { x, y, width, height }

// ----------------------------------------------------------------------
// 2. Resize function – adjusts CSS size based on devicePixelRatio
function resizeResourceBanner() {
    const zoom = window.devicePixelRatio || 1;
    // CSS size = logical size / zoom
    const cssWidth = RESOURCE_BANNER_LOGICAL_WIDTH / zoom;
    const cssHeight = RESOURCE_BANNER_LOGICAL_HEIGHT / zoom;
    
    resourceCanvas.style.width = `${cssWidth}px`;
    resourceCanvas.style.height = `${cssHeight}px`;
    
    // The canvas drawing buffer stays at logical width/height
    // No need to redraw content here – just resize the element
}

// ----------------------------------------------------------------------
// 3. Draw the banner using logical coordinates
function drawResourceBanner() {
    // Ensure canvas buffer matches logical dimensions
    resourceCanvas.width = RESOURCE_BANNER_LOGICAL_WIDTH;
    resourceCanvas.height = RESOURCE_BANNER_LOGICAL_HEIGHT;
    
    // Clear background (optional)
    resourceCanvasContext.clearRect(0, 0, resourceCanvas.width, resourceCanvas.height);
    
    // Draw icons and text (using logical coordinates)
    drawResourceBannerIconsLogical();
    //drawResourceBannerTextLogical();
}

function drawResourceBannerIconsLogical() {
    const iconSize = 24;
    let currentX = 10;
    
    // Clear and reset positions
    resourceIconPositions = {};
    
    for (let resource in resourceData) {
        const info = resourceData[resource];
        
        // Draw icon
        if (info.icon) {
            resourceCanvasContext.drawImage(info.icon, currentX, 3, iconSize, iconSize);
        }
        
        // Build display text
        let displayText;
        if (["coralCapacity", "population", "growth", "plankton"].includes(resource)) {
            displayText = `${info.total}/${info.totalCapacity}`;
        } else {
            displayText = info.total;
        }
        
        // Draw text
        resourceCanvasContext.fillStyle = "#ffffff";
        resourceCanvasContext.font = "22px Arial";
        const textX = currentX + iconSize + 5;
        const textY = 20;
        resourceCanvasContext.fillText(displayText, textX, textY);
        
        // Measure text width
        const textWidth = resourceCanvasContext.measureText(displayText).width;
        
        // Store hit area covering both icon and text
        const hitWidth = iconSize + 5 + textWidth;
        resourceIconPositions[resource] = {
            x: currentX,
            y: 3,
            width: hitWidth,
            height: iconSize
        };
        
        // Advance to next item (add extra spacing)
        currentX += hitWidth + 50;
    }
}


// ----------------------------------------------------------------------
// 4. Hover detection using mapped coordinates
function checkResourceHover(mouseX, mouseY) {
    const { x: logicalX, y: logicalY } = getResourceCanvasCoords(mouseX, mouseY);

    const X_OFFSET = 150;   
    const adjustedX = logicalX + X_OFFSET;
    
    for (const [key, rect] of Object.entries(resourceIconPositions)) {
        if (adjustedX >= rect.x && adjustedX <= rect.x + rect.width &&
            logicalY >= rect.y && logicalY <= rect.y + rect.height) {
            alertText = resourceData[key].text;
            return;
        }
    }
}

function calculateResources(){
	
	
	calculateTotalPlantsGrowing();
	calculateTotalPlantsProducingPlankton();
	
	
	
	calculateTotalAmmonia();
	calculateTotalNitrogen();

	
	calculateTotalSubstrate();
	calculateTotalPopulation();
	calculateTotalCoral();
	
	
}


function calculateTotalPlantsGrowing(){
	let tempTotal=0;
	let tempTotalCapacity=0;
	let tempResourceArray=[...seaweedArray,...seagrassArray]
	for(const resource in resourceData){
		const resourceInfo = resourceData[resource];
		if(resource === "growth"){
			tempResourceArray.forEach(seaweed=>{
				if(seaweed.isFertilized){
					tempTotal++;
					resourceInfo.total=tempTotal;					
				}
				tempTotalCapacity=tempResourceArray.length;
				resourceInfo.totalCapacity=tempTotalCapacity
			})
		}
	}
}

function calculateTotalPlantsProducingPlankton(){
	let tempTotal=0;
	let tempTotalCapacity=0;
	let tempResourceArray=[...seaweedArray,...seagrassArray]
	for(const resource in resourceData){
		const resourceInfo = resourceData[resource];
		if(resource == "plankton"){
			tempResourceArray.forEach(resource=>{
				if( resource.algae>resource.plankton){
					tempTotal+=1;
					resourceInfo.total=tempTotal;
				}
				tempTotalCapacity=tempResourceArray.length;
				resourceInfo.totalCapacity=tempTotalCapacity;
				
			})
		}
	}
}


function calculateTotalAmmonia() {
	let tempTotal=0;
    // Loop through each resource in resourceData
    for (const resource in resourceData) {
        const resourceInfo = resourceData[resource];
        if (resource === "ammonia") {  // Correctly check if current resource is ammonia
            coralArray.forEach(coral => {
				tempTotal+=coral.ammonia;
                resourceInfo.total = tempTotal;
            });
        }
    }
}function calculateTotalNitrogen() {
	let tempTotal=0;
    // Loop through each resource in resourceData
    for (const resource in resourceData) {
        const resourceInfo = resourceData[resource];
        if (resource === "nitrogen") {  // im going to use sponge for now but maybe I give to reef? from sponge?
            spongeArray.forEach(sponge => {
				tempTotal+=sponge.nitrogen;
                resourceInfo.total = tempTotal;
            });
        }
    }
}


function calculateTotalSubstrate(){
	let tempTotal=0;
	for(const resource in resourceData){
		const resourceInfo = resourceData[resource];
		if(resource==="substrate"){ 
			tempTotal+=calciumCarbonateArray.length/50;
			resourceInfo.total=tempTotal;
			
			
		}
	}
}

function calculateTotalPopulation(){
	let tempTotalPop=0;
	let tempTotalCap=0;
	for(const resource in resourceData){
		const resourceInfo=resourceData[resource];
		if(resource==="population"){
			coralArray.forEach(coral=>{
				tempTotalPop+=coral.popArray.length;
				resourceInfo.total=tempTotalPop;
				tempTotalCap+=coral.popLimit;
				resourceInfo.totalCapacity=tempTotalCap
			})
		}
	}
}

function calculateTotalCoral() {
    let tempTotalPop = 0;
    let tempTotalCapacity = 0;
    for (const resource in resourceData) {
        if (resource === "coralCapacity") {
            const resourceInfo = resourceData[resource];
            const length = calciumCarbonateArray.length;
			
            const base = 700;
            const factor = 1.2;       // exponential growth factor
            const maxLevel = 15;

            // Find current level based on cumulative requirements
            let level = 1;
            while (level <= maxLevel) {
                const required = base * (Math.pow(factor, level) - 1) / (factor - 1);
                if (length < required) break;
                level++;
            }
            const cappedLevel = Math.min(level, maxLevel);

            resourceInfo.total = coralArray.length;
			anemoneArray.forEach(anemone=>{
				if(anemone.isAttached){
					resourceInfo.total--
				}
			})
            resourceInfo.totalCapacity = cappedLevel;

            if (cappedLevel < maxLevel) {
                const nextRequired = base * (Math.pow(factor, cappedLevel + 1) - 1) / (factor - 1);
                const nextThreshold = nextRequired;  // total needed for next level
                CCNeededText = nextThreshold - length;
            } else {
                CCNeededText = "Max Cap";
            }
        }
    }
}