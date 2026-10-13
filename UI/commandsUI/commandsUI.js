const moveIconUIX=50;
const moveIconUIY=200;
let moveIcon= new Image();
moveIcon.src="Pics/move.png";



const autoPilotIconUIX=140;
const autoPilotIconUIY=200;
let autoPilotIcon= new Image();
autoPilotIcon.src="Pics/brain.png"

let gatherSeaweedIconUIX=50;
let gatherSeaweedIconUIY=300;
let gatherSeaweedIcon = new Image();
gatherSeaweedIcon.src="Pics/gatherSeaweed.png"

let gatherPlanktonIconUIX=140;
let gatherPlanktonIconUIY=300;
let gatherPlanktonIcon= new Image();
gatherPlanktonIcon.src="Pics/krill.png"


let returnSeaweedIconUIX=100;
let returnSeaweedIconUIY=300;
let returnSeaweedIcon= new Image();
returnSeaweedIcon.src="Pics/returnArrow.png"

let digForPlanktonIconX=50;
let digForPlanktonIconY=300;
let digForPlanktonIcon= new Image();
digForPlanktonIcon.src="Pics/digIcon.png"


let patrolIconUIX=140;
let patrolIconUIY=300;
let patrolIcon= new Image(); 
patrolIcon.src="Pics/patrol.png";

const cloneSelfUIX=70;
const cloneSelfUIY=400;
let cloneSelfIcon= new Image();
cloneSelfIcon.src="SpriteSheets/BabyAnemone/Idle/anemone0.png"

const krillFarmIconUIX=70
const krillFarmIconUIY=400;
let krillFarmIcon= new Image();
krillFarmIcon.src="Pics/shrimp.png";

const callSchoolUIX=50;
const callSchoolUIY=400;
let callSchoolIcon=new Image();
callSchoolIcon.src="Pics/AttributeIcons/clownfishAttribute1.png";

const ability1UIX=50;
const ability1UIY=200;

const ability2UIX =50;
const ability2UIY=300;

const attackAbilityUIX=50;
const attackAbilityUIY=400;

const hideAbilityUIX=155;
const hideAbilityUIY=400;


const shootBubbleIcon= new Image();
shootBubbleIcon.src="Pics/AttributeIcons/pistolShrimpAttribute1.png"

const detachAnemoneIcon= new Image();
detachAnemoneIcon.src= "Pics/AttributeIcons/hermitCrabAttribute1.png"

const pickUpAnemoneIcon= new Image();
pickUpAnemoneIcon.src="Pics/AttributeIcons/hermitCrabAttribute2.png"
//crab 
const gatherResourcesIcon =new Image(); // only crab has img :(
gatherResourcesIcon.src="Pics/AttributeIcons/crabAttribute1.png"

const gatherRocksIcon= new Image();
gatherRocksIcon.src="Pics/AttributeIcons/crabAttribute2.png";

const crabAttackAbilityIcon = new Image();
crabAttackAbilityIcon.src="Pics/AttributeIcons/crabAttackIcon.png";

//Seahorse
const seahorseGatherFromSeaweedIcon = new Image();
seahorseGatherFromSeaweedIcon.src="Pics/AttributeIcons/seahorseGather.png";

const gatherFromSeagrassIcon=new Image();
gatherFromSeagrassIcon.src="Pics/AttributeIcons/gatherResourcesFromSeagrass.png";
///CLOWNFISH
const clownfishGatherIcon= new Image();
clownfishGatherIcon.src="Pics/AttributeIcons/clownfishGather.png";

const clownfishGatherFromSpongeIcon= new Image();
clownfishGatherFromSpongeIcon.src="Pics/AttributeIcons/clownfishGatherFromSponge.png"

const clownfishHideIcon = new Image();
clownfishHideIcon.src="Pics/AttributeIcons/clownfishHideInAnemone.png";

const layLimestoneIcon = new Image();
layLimestoneIcon.src="Pics/AttributeIcons/spreadLimestone.png"
// helper function 
function drawUIIcon(icon, x, y, isActive) {
    // Calculate square dimensions
    const squareSize = UIRadius * 1.5;
    const halfSize = squareSize / 2;
    
    // Save canvas state before clipping
    uiCanvasContext.save();

    // Create centered square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(x - halfSize, y - halfSize, squareSize, squareSize);
    uiCanvasContext.clip();

    // Calculate scaled dimensions for image (stretch to fill square)
    const imageAspectRatio = icon.width / icon.height;
    let drawWidth = squareSize;
    let drawHeight = squareSize;

    // Optional: Maintain aspect ratio (uncomment if preferred)
    // if (imageAspectRatio > 1) {
    //     drawHeight = squareSize / imageAspectRatio;
    // } else {
    //     drawWidth = squareSize * imageAspectRatio;
    // }

    // Draw image centered and stretched to square
    uiCanvasContext.drawImage(
        icon,
        x - halfSize,          // target X
        y - halfSize,           // target Y
        drawWidth,              // target width
        drawHeight              // target height
    );

    // Restore canvas to remove clipping path
    uiCanvasContext.restore();

    // Draw the square outline
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(x - halfSize, y - halfSize, squareSize, squareSize);
    uiCanvasContext.strokeStyle = isActive ? "#39FF14" : "white";
    uiCanvasContext.lineWidth = 4;
    uiCanvasContext.stroke();
}

function drawMoveUI() {    
	drawUIIcon(moveIcon,moveIconUIX,moveIconUIY,isMoveActive);
}

function drawAttackUIIcon(){
	if(actorSelected instanceof Crab){
		drawUIIcon(crabAttackAbilityIcon,attackAbilityUIX,attackAbilityUIY)
	}
}

function drawPatrolUI() {
   drawUIIcon(patrolIcon,patrolIconUIX,patrolIconUIY,isPatrolActive);
}


function drawShootBubbleUI(){
	drawUIIcon(shootBubbleIcon,ability1UIX,ability1UIY,isShootBubbleActive)
}
function drawAutoPilotUI(){
	if(actorSelected!=null){
		drawUIIcon(autoPilotIcon,autoPilotIconUIX,autoPilotIconUIY,actorSelected.isAutoPilotActive);
	}
	
}



function drawGatherSeaweedUI() {
    drawUIIcon(gatherSeaweedIcon,gatherSeaweedIconUIX,gatherSeaweedIconUIY,isGatherSeaweedActive);
}

function drawGatherPlanktonUI() {
 drawUIIcon(gatherPlanktonIcon,gatherPlanktonIconUIX,gatherPlanktonIconUIY,isGatherPlanktonActive);
}

function drawDigUI(){
	drawUIIcon(digForPlanktonIcon,digForPlanktonIconX,digForPlanktonIconY,isDigForPlanktonActive);
}
//hermit Crab 
function drawDetachAnemone(){
	drawUIIcon(detachAnemoneIcon,ability1UIX,ability1UIY)
}
function drawPickUpAnemone(){
	drawUIIcon(pickUpAnemoneIcon,ability2UIX,ability2UIY)
}
//crab Abilities
function drawGatherResources(){
	drawUIIcon(gatherResourcesIcon,ability1UIX,ability1UIY)
}
function drawGatherRocks(){
	drawUIIcon(gatherRocksIcon,ability2UIX,ability2UIY)
}
//mysid Shrimp 
function drawGatherFromSeagrass(){
	drawUIIcon(gatherFromSeagrassIcon,ability1UIX,ability1UIY);
}
function drawLayLimestone(){
	drawUIIcon(layLimestoneIcon,ability2UIX,ability2UIY);
}
//Seahorse
function drawSeahorseGatherFromSeaweed(){
	drawUIIcon(seahorseGatherFromSeaweedIcon,ability1UIX,ability1UIY);
}
//clownfish 
function drawClownfishGather(){
	drawUIIcon(clownfishGatherIcon,ability1UIX,ability1UIY);
}
function drawClownfishGatherFromSponge(){
	drawUIIcon(clownfishGatherFromSpongeIcon,ability2UIX,ability2UIY);
}

function drawClownfishHideInAnemone(){
	drawUIIcon(clownfishHideIcon,hideAbilityUIX,hideAbilityUIY);
}
function drawCallSchoolUI(){
	drawUIIcon(callSchoolIcon,callSchoolUIX,callSchoolUIY);
}