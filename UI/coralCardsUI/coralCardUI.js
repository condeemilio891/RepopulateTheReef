
const prevCoralIcon=new Image();
prevCoralIcon.src="Pics/upArrow.png"
const nextCoralIcon=new Image();
nextCoralIcon.src="Pics/downArrow.png";

const nextPopPageIcon=new Image();
nextPopPageIcon.src="Pics/rightArrow.png"

const prevPopPageIcon=new Image();
prevPopPageIcon.src="Pics/leftArrow.png"

let currentIterationShowing=0// this will show 0-5, 1 will show 1-6, 
const CARDS_PER_PAGE = 5;

let currentPageShowing=0;
const WORKERCARDS_PER_PAGE=8;




const upArrow = {
    x: 10,        // offsetX (left)
    y: 100,        // offsetY (top)
    width: 400,    // button width (larger than icon to allow centering)
    height: 40,
    iconWidth: 32,    // actual icon size (smaller than button)
    iconHeight: 32,
    isClicked: false
};

const downArrow = {
    x: 10,
    y: 670,       // adjust based on your layout
    width: 400,
    height: 40,
    iconWidth: 32,
    iconHeight: 32,
    isClicked: false
};

const rightArrow={
	x:380,
	y:500,
	width:30,
	height:200,
	iconWidth:25,
	iconHeight:32,
	isClicked: false,
}
const leftArrow={
	x:10,
	y:500,
	width:30,
	height:200,
	iconWidth:25,
	iconHeight:32,
	isClicked: false,
}
function initCoralCards(offsetX, offsetY, reducedWidth) {
    coralCardArray = [];
    let crabsArray = PCArray.filter(actor => actor instanceof Crab);
	let hermitCrabArray=PCArray.filter(actor=> actor instanceof HermitCrab);
    let coralAndCrabsArray = [...coralArray, ...crabsArray,...hermitCrabArray];
    console.log(coralAndCrabsArray);

    for (let i = 0; i < coralAndCrabsArray.length; i++) {
        const entity = coralAndCrabsArray[i];         
        let cardY = offsetY + 45 + (100 * i);
        let iterationMove = currentIterationShowing * 100;
        let result = cardY - iterationMove;

        // Safely get image source (handle if entity.img or entity.img.src is missing)
        let imgSrc = entity.img?.src;
        if (!imgSrc && entity.portrait?.src) imgSrc = entity.portrait.src; // fallback for crabs
        if (!imgSrc) imgSrc = "default.png"; // fallback

        const card = new UICard(imgSrc, offsetX, result, reducedWidth - 20, 120, entity.name, entity);
        coralCardArray.push(card);
        entity.cardDrawn = true; // mark so you don't create again
    }
}

// drawButton found in utils FYI 
function drawUpArrow() {
    drawButton(uiCanvasContext, upArrow, prevCoralIcon);
}

function drawDownArrow() {
    drawButton(uiCanvasContext, downArrow, nextCoralIcon);
}

function drawRightArrow() {
    drawButton(uiCanvasContext, rightArrow, nextPopPageIcon);
}

function drawLeftArrow() {
    drawButton(uiCanvasContext, leftArrow, prevPopPageIcon);
}

// coral cards logic make own 
function drawAllCoralCards() {
	if(actorSelected || saveGameMenuToggled || objectivesMenuToggled || evolutionMenuToggled || researchMenuToggled ) return;
	

	const startIndex = currentIterationShowing ;
    const endIndex = Math.min(startIndex + CARDS_PER_PAGE, coralCardArray.length);
	
	drawUpArrow();
	drawDownArrow();
	
    for (let i = startIndex; i <endIndex ; i++) {
        coralCardArray[i].draw();
    }
	
	//coralCardArray.forEach(card=>card.draw());
}

function selectCoralCard(evt) {
    // Get canvas coordinates from event
    const { x: mouseXUI, y: mouseYUI } = getUICanvasCoords(evt);
    
    let found = false;
    if (mouseYUI > 650) return;
    if (actorSelected || saveGameMenuToggled || objectivesMenuToggled || evolutionMenuToggled) return;
    
    if (actorSelected === null) {
        const startIndex = currentIterationShowing;
        const endIndex = Math.min(startIndex + CARDS_PER_PAGE, coralCardArray.length);
        
        for (let i = startIndex; i < endIndex; i++) {
            const card = coralCardArray[i];
            if (mouseXUI > card.x && mouseXUI < card.x + card.width &&
                mouseYUI > card.y && mouseYUI < card.y + card.height) {
                
                coralArray.forEach(coral => (coral.selected = false));
                card.actor.selected = true;
                actorSelected = card.actor;
                snapToSelActor();
                found = true;
                break; // stop loop once found
            }
        }
        
        if (!found) {
            actorSelected = null;
            selectText = getNumberOfCorals() + " Corals";
        }
    }
}


function handleSelectPrevAndNextCoral(evt) {
    if (actorSelected) return;
    const { x: mouseXUI, y: mouseYUI } = getUICanvasCoords(evt);
    
    if (mouseXUI >= upArrow.x && mouseXUI <= upArrow.x + upArrow.width &&
        mouseYUI >= upArrow.y && mouseYUI <= upArrow.y + upArrow.height) {
        
        upArrow.isClicked = true;
        setTimeout(() => { upArrow.isClicked = false; }, 150);
        
        if (currentIterationShowing > 0) {
            currentIterationShowing--;
        }
        initCoralCards(offsetX, offsetY, reducedWidth);
        drawAllCoralCards();
        return;
    }
    
    if (mouseXUI >= downArrow.x && mouseXUI <= downArrow.x + downArrow.width &&
        mouseYUI >= downArrow.y && mouseYUI <= downArrow.y + downArrow.height) {
        
        downArrow.isClicked = true;
        setTimeout(() => { downArrow.isClicked = false; }, 150); 
        
        const maxIteration = Math.ceil(coralCardArray.length / CARDS_PER_PAGE) + 1;
        if (currentIterationShowing < maxIteration) {
            currentIterationShowing++;
        }
        initCoralCards(offsetX, offsetY, reducedWidth);
        drawAllCoralCards();
        return;
    }
}

function handleSelectPrevAndNextWorkerPage(evt) {

	if(actorSelected instanceof BrainCoral|| actorSelected instanceof FingerCoral||actorSelected instanceof OrganPipeCoral|| actorSelected instanceof Anemone){
		const { x: mouseXUI, y: mouseYUI } = getUICanvasCoords(evt);
		
		if (mouseXUI >= leftArrow.x && mouseXUI <= leftArrow.x + leftArrow.width &&
			mouseYUI >= leftArrow.y && mouseYUI <= leftArrow.y + leftArrow.height) {
			leftArrow.isClicked = true;
			setTimeout(() => { leftArrow.isClicked = false; }, 150); 
			if(currentPageShowing>0){
				currentPageShowing--
			}
			return
		}
		
		
		if (mouseXUI >= rightArrow.x && mouseXUI <= rightArrow.x + rightArrow.width &&
			mouseYUI >= rightArrow.y && mouseYUI <= rightArrow.y + rightArrow.height) {
			rightArrow.isClicked = true;
			setTimeout(() => { rightArrow.isClicked = false; }, 150);
			const maxIteration = 2;
			if (currentPageShowing < maxIteration) {
				currentPageShowing++;			
			}
			return
		}
	}
}






// worker cards 
//Images 
let clownfishCardImage= new Image();
clownfishCardImage.src="Pics/clownfish.png"

let mantisShrimpCardImage=new Image();
mantisShrimpCardImage.src="Pics/mantisShrimp.png"

let seahorseCardImage=new Image();
seahorseCardImage.src="Pics/seahorseSwim0.png"


// positions for worker cards 	
let UICardXArr=[70,200,330,70,200,330];
let UICardYArr=[550,550,550,650,650,650];

let UICardXArrSmall=[90,170,250,330,  90,170,250,330,       410,490,570,650,410,490,570,650,    730,810,890,970,730,810,890,970];
let UICardYArrSmall=[550,550,550,550, 650,650,650,650,      550,550,550,550,650,650,650,650,    550,550,550,550,650,650,650,650];
// worker card logic
function drawWorkerCard(cardImage, cardUIX, cardUIY, size) {
    uiCanvasContext.save();

    let squareSize = (size === "large") ? (UIRadius * 1.5) : (UIRadius * 2);
    let squareX = (cardUIX - UIRadius)-(currentPageShowing*320);
    let squareY = cardUIY - UIRadius;

    // Create square clipping path
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.clip();

    // Fill background
    uiCanvasContext.fillStyle = "black";
    uiCanvasContext.fillRect(0, 0, canvas.width, canvas.height);

    // --- Draw the image centred inside the square ---
    // Desired image width/height (you can adjust these)
    let imageWidth = 80;   // tweak as needed
    let imageHeight = 80;

    // Centre the image inside the square
    let imageX = squareX + (squareSize - imageWidth) / 2;
    let imageY = squareY + (squareSize - imageHeight) / 2;

    // Apply shadow effect (optional)
    let shadowOffset = clownfishImageUIHovered ? 3 : 6;
    uiCanvasContext.shadowColor = 'rgba(0, 0, 0, 0.6)';
    uiCanvasContext.shadowBlur = 10;
    uiCanvasContext.shadowOffsetX = shadowOffset;
    uiCanvasContext.shadowOffsetY = shadowOffset;

    uiCanvasContext.drawImage(cardImage, imageX, imageY, imageWidth, imageHeight);

    // Reset shadow
    uiCanvasContext.shadowColor = 'transparent';
    uiCanvasContext.shadowBlur = 0;
    uiCanvasContext.shadowOffsetX = 0;
    uiCanvasContext.shadowOffsetY = 0;

    uiCanvasContext.restore();

    // Draw square outline
    uiCanvasContext.beginPath();
    uiCanvasContext.rect(squareX, squareY, squareSize, squareSize);
    uiCanvasContext.strokeStyle = "orange";
    uiCanvasContext.lineWidth = 4;
    uiCanvasContext.stroke();
}

function drawWorkerCards(building,size){
	let i =0;
	for(let pop of building.popArray){
		if(size==="large"||size==="medium"){
			drawWorkerCard(pop.portrait,UICardXArrSmall[i], UICardYArrSmall[i],size);
			i++
			drawRightArrow();
			drawLeftArrow();
		}
		else{
			drawWorkerCard(pop.portrait,UICardXArr[i], UICardYArr[i],size);
			i++
		}
	}
}

function drawSelectedCard(actor){
	
	if(actor.selected){	
			drawWorkerCard(actor.portrait,UICardXArr[actor.id],UICardYArr[actor.id]);
			
		}	
}


// sel the actor
function handleSelectCard(evt, buildingType) {
    // Get canvas coordinates from event (0..420, 0..800)
    const { x: mouseXUI, y: mouseYUI } = getUICanvasCoords(evt);
    
    // Hard exit if clicking on UI panel edge (adjust as needed)
    if (mouseXUI >= 349) return;

    // Choose card layout based on actor size
    let cardXArr, cardYArr;
    if (actorSelected?.size === "large") {
        cardXArr = UICardXArrSmall;
        cardYArr = UICardYArrSmall;
    } else {
        cardXArr = UICardXArr;
        cardYArr = UICardYArr;
    }

    // Loop through card positions
    for (let i = 0; i < cardXArr.length; i++) {
        // Apply page shifting (each page moves cards by 320px in UI canvas space)
        let adjustedX = cardXArr[i] - (currentPageShowing * 320);
        
        // Calculate distance in canvas drawing coordinates
        let distance = Math.sqrt(
            (mouseXUI - adjustedX) ** 2 +
            (mouseYUI - cardYArr[i]) ** 2
        );

        // If click within radius and conditions are met
        if (distance < UIRadius && actorSelected && actorSelected instanceof buildingType) {
            if (i < actorSelected.popArray.length) {
                // Select the child actor
                actorSelected = actorSelected.popArray[i];
                actorSelected.selected = true;
                snapToSelActor();

                // Deselect all other actors of the same type
                if (buildingType === Anemone) {
                    anemoneArray.forEach(anemone => anemone.selected = false);
                } else if (buildingType === BrainCoral) {
                    brainCoralArray.forEach(coral => coral.selected = false);
                } else if (buildingType === OrganPipeCoral) {
                    organPipeCoralArray.forEach(coral => coral.selected = false);
                } 
            }
            break;
        }
    }
}