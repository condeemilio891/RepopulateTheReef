// keep track of dimension just in case we need to make a grid again.
let tileW = 32;
let tileH = 32;
let tileGap = 0.0;
let cols = 1000;
let rows = 500;

let coralX=4300;
let coralY=2200;

let pipeCoralX=800;
let pipeCoralY=150;


let krillX= 300;
let krillY= 1100;

let anemoneX=4000;
let anemoneY=2100;

let sandPic= new Image();
 sandPic.src = "Pics/sandTexture.png"; 
 
let limestonePic = new Image();
limestonePic.src="Pics/limestone.png"


function drawTestLevel() {
    if (!map.complete) return;
    const vx = window.scrollX;
    const vy = window.scrollY;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    canvasContext.drawImage(map, vx, vy, vw, vh, vx, vy, vw, vh);
}



function loadBrainCoral(){
	
	let newBrainCoral = new BrainCoral(coralX,coralY,"large");
		brainCoralArray.push(newBrainCoral);
		coralArray.push(newBrainCoral);
		
	let shrimpCount=4;
	while(shrimpCount>=0){
		let newShrimp = new Shrimp(coralX,coralY,newBrainCoral);
		PCArray.push(newShrimp);
		newBrainCoral.popArray.push(newShrimp);
		shrimpCount--
	}

		
	
	
}
function loadOrganPipeCoral(){

	let newOrganPipeCoral= new OrganPipeCoral((coralX+350),(coralY-350),"small");
		
		
		organPipeCoralArray.push(newOrganPipeCoral);
		coralArray.push(newOrganPipeCoral);
		// maybe push with lower temp an health 
}
function drawWater() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let x = col * (tileW + tileGap);
            let y = row * (tileH + tileGap);
            drawRectangle(x, y, 32, 32, "blue");
        }
    }
}

function drawSand() {
    let startRow = 5; // Start drawing sand at row 5



        for (let row = startRow; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                let x = col * (tileW + tileGap);
                let y = row * (tileH + tileGap);
                canvasContext.drawImage(sandPic, x, y, tileW, tileH);
	
            }
        }
    
}
function loadCalciumCarbonate(amount) {
	
    const CC_W = 25;
    const CC_H = 25;
    const homeCoral = coralArray[0];
    
    // Spacing factor – smaller than 1 packs them tighter (1.2 means 20% overlap/packing)
    const spacingFactor = 1.2;
    const itemW = CC_W / spacingFactor;
    const itemH = CC_H / spacingFactor;
    
    // Grid dimensions
    const gridCols = Math.ceil(Math.sqrt(amount));
    const gridRows = Math.ceil(amount / gridCols);
    
    // Total width and height of the packed grid
    const totalGridW = gridCols * itemW;
    const totalGridH = gridRows * itemH;
    
    // Center the grid inside the coral
    const startX = homeCoral.x + (homeCoral.width - totalGridW) / 2;
    const startY = homeCoral.y + (homeCoral.height - totalGridH) / 2;
    
    calciumCarbonateArray = [];
    
    for(let row = 0, count = 0; row < gridRows && count < amount; row++) {
        for(let col = 0; col < gridCols && count < amount; col++, count++) {
            const x = startX + col * itemW;
            const y = startY + row * itemH;
            calciumCarbonateArray.push(new CalciumCarbonate(x, y));
        }
    }
}
/* function loadRocksRandom() {
    const rockImage = new Image();
    rockImage.src = "./Pics/calciumCarb.png";
    
    rockImage.onload = () => {
        const rockTexture = PIXI.Texture.from(rockImage);
        const rockCount = 30;
        
        for (let i = 0; i < rockCount; i++) {
            const rock = new PIXI.Sprite(rockTexture);
            // Random position within canvas, but avoid edges
            rock.x = Math.random() * (canvas.width - 50) + 25;
            rock.y = Math.random() * (canvas.height - 50) + 25;
            // Optional: random scale and rotation
            rock.scale.set(0.8 + Math.random() * 0.7);
            rock.rotation = Math.random() * Math.PI * 2;
            pixiApp.stage.addChild(rock);
        }
    };
} */



function loadSeaweed() {
  const COUNT = 100;           // Number of seaweeds
  const MAX_Y = 1800;
  const MIN_Y =15;
  const MAX_X = 9600;
  const MIN_X = 400;
  const BASE_WIDTH = 50;      // Smallest width
  const BASE_HEIGHT = 95;    // Smallest height

  for (let i = 0; i < COUNT; i++) {
    // Randomize Y position and calculate scale ratio
    const y = MIN_Y+ Math.floor(Math.random() * (MAX_Y + 1));
    //const scaleRatio = y / (MAX_Y / 2); // Scale based on Y position

    // Calculate dimensions
    const width = BASE_WIDTH + BASE_WIDTH * 1;
    const height = BASE_HEIGHT + BASE_HEIGHT * 1;

    // Randomize X position (ensure it stays within canvas)
    const x = MIN_X + Math.floor(Math.random() * (MAX_X - width));

    // Create and store the seaweed
    seaweedArray.push(new Seaweed(x, y, width, height));
  }
}
function loadSeagrass() {
  const COUNT = 50;           // Number of seaweeds
  const MAX_Y = 9400;
  const MIN_Y = 0;
  const MAX_X = 4000; 
  const MIN_X= 100;
  const BASE_WIDTH = 100;      // Smallest width
  const BASE_HEIGHT = 45;    // Smallest height

  for (let i = 0; i < COUNT; i++) {
    // Randomize Y position and calculate scale ratio
    const y = MIN_Y+ Math.floor(Math.random() * (MAX_Y + 1));
    //const scaleRatio = y / (MAX_Y / 2); // Scale based on Y position

    // Calculate dimensions
    const width = BASE_WIDTH + BASE_WIDTH;
    const height = BASE_HEIGHT + BASE_HEIGHT;

    // Randomize X position (ensure it stays within canvas)
    const x = MIN_X+Math.floor(Math.random() * (MAX_X - width));

    // Create and store the seaweed
    seagrassArray.push(new Seagrass(x, y, width, height));
  }
}

function loadRocks() {
  const COUNT = 40;           // Number of seaweeds
  const MAX_Y = 5000;
  const MIN_Y = 200;
  const MAX_X = 7000; 
  const MIN_X= 5000;
  const BASE_WIDTH = 100;      // Smallest width
  const BASE_HEIGHT = 45;    // Smallest height

  for (let i = 0; i < COUNT; i++) {
    // Randomize Y position and calculate scale ratio
    const y = MIN_Y+ Math.floor(Math.random() * (MAX_Y + 1));
    //const scaleRatio = y / (MAX_Y / 2); // Scale based on Y position

    // Calculate dimensions
    const width = BASE_WIDTH + BASE_WIDTH;
    const height = BASE_HEIGHT + BASE_HEIGHT;

    // Randomize X position (ensure it stays within canvas)
    const x = MIN_X+Math.floor(Math.random() * (MAX_X - width));
	
	
    let size;
	if (i < 20) {
		size = "tiny";
	} else if (i < 30) {        // 20-29
		size = "small";
	} else if (i < 38) {        // 30-37
		size = "medium";
	} else {                    // 38-39
		size = "large";
	}
    // Create and store the seaweed
	
	let newRock = new Rocks(x, y, width, height,size)
	newRock.selectStone(size)
    rocksArray.push(newRock);
	
  }
  console.log(rocksArray)
}

function loadSponges(){
	
	spongeArray.push(new Sponge(3800,800,150,200));
	spongeArray.push(new Sponge(6500,750,150,200));

	//spongeArray.push(new Sponge(4500,400,150,200));
	spongeArray.push(new Sponge(1800,900,150,200));
	spongeArray.push(new Sponge(700,3000,150,200));
	spongeArray.push(new Sponge(1800,4100,150,200));
	spongeArray.push(new Sponge(1000,5000,150,200));
	
	spongeArray.push(new Sponge(1400,6200,150,200));
	spongeArray.push(new Sponge(800,7000,150,200));
	spongeArray.push(new Sponge(800,8000,150,200));
}

function loadJellyfish(){
	const COUNT =5; 
	let y=25;
	for(let i=0;i<COUNT;i++){
		y+=(800*(i+1))
		let newJelly= new Jellyfish(25,y);
		newJelly.hunger=Math.floor(Math.random() * (100 - 75 + 1)) + 75;
		jellyfishArray.push(newJelly);
		
	}
}

function loadBarracuda(){
	let newBarracuda= new Barracuda(250,250);
	barracudaArray.push(newBarracuda);
}

function loadCrab(){
	PCArray.push(new Crab(5000,2222));
}

function loadHermitCrab(){
	
	let firstHermitCrab=new HermitCrab(6500,2000)
	PCArray.push(firstHermitCrab);
	
	let newAnemone = new Anemone(6500,2000,"tiny");
	newAnemone.setLevelStats();
	newAnemone.isAttached=true;
	newAnemone.attachedHermit=firstHermitCrab;
	anemoneArray.push(newAnemone);
	coralArray.push(newAnemone);
	
	let firstClownfish = new Fish(6500,2000,newAnemone);
	//let secondClownfish = new Fish(6500,200,firstHermitCrab);
		PCArray.push(firstClownfish);
		//PCArray.push(secondClownfish);
		newAnemone.popArray.push(firstClownfish);
		//newAnemone.popArray.push(secondClownfish);
}



function loadBleachedCoral(){
	
	let x=6500;
	let y=2000;
	
	
	bleachedCoralArray.push(new BleachedCoral(x,y));
	console.log("BCARR ",bleachedCoralArray)
}

function loadTidemill(){
	
	let x=6000;
	let y=3000;
	let count=3;
	for(let i=0;i<count;i++){
		let xPos=x+(i*88)
		tidemillArray.push(new Tidemill(xPos,y));
	}
}

function loadSandBattery(){
    let x=6350;
	let y=3000;
	
	sandBatteryArray.push(new SandBattery(x,y));
	
}
function loadSolarPanel(){
	let x=7500;
	let y=3000;
	
	solarPanelArray.push(new SolarPanel(x,y))
}