
// figure out image loaders please 

let blankImage= new Image();
blankImage.src="Pics/blank.png";

let rockTinyImage= new Image();
rockTinyImage.src="SpriteSheets/Rocks/RockTiny.png";

let rockSmallImage=new Image();
rockSmallImage.src="SpriteSheets/Rocks/RockSmall.png";

let rockMediumImage = new Image();
rockMediumImage.src="SpriteSheets/Rocks/RockMedium.png";

let rockLargeImage =new Image();
rockLargeImage.src="SpriteSheets/Rocks/RockLarge.png";

let crabImage =new Image();
crabImage.src="SpriteSheets/Crab/idle/crabIdle0.png"

let bleachedCoralImage= new Image();
bleachedCoralImage.src= "Pics/bleachedCoral.png"


let solarPanelImage=new Image();
solarPanelImage.src= "./Pics/PlaceMenuIcons/solarPanel.png"

//PIXI GLOBAL VARS 

let limestoneTexture = null;
let displacementTexture=null;


let pipeCoralTinyTexture=null;
let pipeCoralSmallTexture=null;
let pipeCoralMediumTexture=null;

let fingerCoralTinyTexture=null;
let fingerCoralSmallTexture=null;
let fingerCoralMediumTexture=null;

let anemoneTinyTexture=null;
let anemoneSmallTexture=null;
let anemoneMediumTexture=null;
let anemoneLargeTexture=null;

let rockTinyTexture=null;
let rockSmallTexture=null;
let rockMediumTexture=null;
let rockLargeTexture=null;
	
function initPixiApp(){	
		// Get the current device pixel ratio (changes with zoom)
		const dpr = window.devicePixelRatio

    // Create Pixi app
	 pixiApp = new PIXI.Application({
		width: canvas.width,       // Set logical width to match physical pixels
		height: canvas.height,     // Set logical height to match physical pixels
		transparent: true,
		resolution: .375,  		
		autoDensity: false,              
		antialias: true
	});
	PIXI.settings.RESOLUTION = 1;
	pixiApp.view.style.position = 'absolute';
	pixiApp.view.style.top = '0';
	pixiApp.view.style.left = '0';
	pixiApp.view.style.width = `${canvas.width}px`;   // Scale the CSS back down
	pixiApp.view.style.height = `${canvas.height}px`; // Scale the CSS back down
	pixiApp.view.style.zIndex = '-1';
	document.body.appendChild(pixiApp.view);
}
function drawPixiApp(){
    // Load background map
    const mapImage = new Image();
    mapImage.src = "Levels/sandLevel300by400.png";
	
    mapImage.onload = () => {
        const texture = PIXI.Texture.from(mapImage);
        const mapSprite = new PIXI.Sprite(texture);
        mapSprite.width = canvas.width;
        mapSprite.height = canvas.height;
        pixiApp.stage.addChild(mapSprite);
		pixiWorld = new PIXI.Container();
		pixiWorld.width=canvas.width;
		pixiWorld.height=canvas.height;

		pixiApp.stage.addChild(pixiWorld);
		// DEBUG: Add a colored rectangle to visualize the container's position and size
/* 	const debugRect = new PIXI.Graphics();
	debugRect.beginFill(0xff00ff, 0.5); // magenta, half transparent
	debugRect.drawRect(0, 0, 200, 200);  // 200x200 square at container's origin
	debugRect.endFill();
	pixiWorld.addChild(debugRect); */
		
		PIXI.Assets.load("./Pics/calciumCarb.png").then(texture => {
		limestoneTexture = texture;
		pixiDrawSprites()
		addDisplacementEffect()
				

		}).catch(err => console.error(err));
	
	}
}
function pixiDrawSprites(){
		redrawRocksAndCoral(); // initial draw
			
}

function initPIXIImages() {
    const loaders = [];

    // Pipe Coral
    loaders.push(PIXI.Assets.load("Pics/PlaceMenuIcons/pipeCoralTiny.png")
        .then(texture => pipeCoralTinyTexture = texture)
        .catch(err => console.error("pipeCoralTiny.png failed:", err)));

    loaders.push(PIXI.Assets.load("Pics/PlaceMenuIcons/pipeCoralSmall.png")
        .then(texture => pipeCoralSmallTexture = texture)
        .catch(err => console.error("pipeCoralSmall.png failed:", err)));

    loaders.push(PIXI.Assets.load("Pics/PlaceMenuIcons/pipeCoralMediumStill.png")
        .then(texture => pipeCoralMediumTexture = texture)
        .catch(err => console.error("pipeCoralMediumStill.png failed:", err)));

    // Finger Coral
    loaders.push(PIXI.Assets.load("Pics/PlaceMenuIcons/fingerCoralTiny.png")
        .then(texture => fingerCoralTinyTexture = texture)
        .catch(err => console.error("fingerCoralTiny.png failed:", err)));

    loaders.push(PIXI.Assets.load("Pics/PlaceMenuIcons/fingerCoralSmall.png")
        .then(texture => fingerCoralSmallTexture = texture)
        .catch(err => console.error("fingerCoralSmall.png failed:", err)));

    loaders.push(PIXI.Assets.load("Pics/PlaceMenuIcons/fingerCoral.png")
        .then(texture => fingerCoralMediumTexture = texture)
        .catch(err => console.error("fingerCoral.png failed:", err)));

    // Anemone
    loaders.push(PIXI.Assets.load("Pics/PlaceMenuIcons/anemoneSmall.png")
        .then(texture => anemoneTinyTexture = texture)
        .catch(err => console.error("anemoneSmall.png failed:", err)));

    loaders.push(PIXI.Assets.load("Pics/PlaceMenuIcons/anemone.png")
        .then(texture => anemoneSmallTexture = texture)
        .catch(err => console.error("anemone.png failed:", err)));

    loaders.push(PIXI.Assets.load("SpriteSheets/Anemone/Idle/anemone0.png")
        .then(texture => {
            anemoneMediumTexture = texture;
            anemoneLargeTexture = texture;
        })
        .catch(err => console.error("anemone0.png failed:", err)));

    // Rocks
    loaders.push(PIXI.Assets.load("SpriteSheets/Rocks/RockTiny.png")
        .then(texture => rockTinyTexture = texture)
        .catch(err => console.error("RockTiny.png failed:", err)));

    loaders.push(PIXI.Assets.load("SpriteSheets/Rocks/RockSmall.png")
        .then(texture => rockSmallTexture = texture)
        .catch(err => console.error("RockSmall.png failed:", err)));

    loaders.push(PIXI.Assets.load("SpriteSheets/Rocks/RockMedium.png")
        .then(texture => rockMediumTexture = texture)
        .catch(err => console.error("RockMedium.png failed:", err)));

    loaders.push(PIXI.Assets.load("SpriteSheets/Rocks/RockLarge.png")
        .then(texture => rockLargeTexture = texture)
        .catch(err => console.error("RockLarge.png failed:", err)));

    // Return a promise that resolves when all loads finish (even if some fail)
    return Promise.allSettled(loaders);
}

function addDisplacementEffect(){
			
		PIXI.Assets.load("./Textures/bumpMap0.jpg").then(texture=>{
	displacementTexture=texture;
	const displacementSprite=PIXI.Sprite.from(displacementTexture);
	displacementSprite.height=canvas.height;
	displacementSprite.width=(canvas.width*2);
	pixiWorld.addChild(displacementSprite);
	let speed = 1.5;
	let direction = 1;        // 1 = moving right, -1 = moving left
	const maxX = displacementSprite.width; 
	const minX = 0;            // lower bound

	pixiApp.ticker.add(() => {
		// Move
		displacementSprite.x += speed * direction;
		
		// Reverse direction if hitting either boundary
		if (displacementSprite.x >= maxX) {
			displacementSprite.x = maxX;   // clamp
			direction = -1;                // now go left
		} else if (displacementSprite.x <= minX) {
			displacementSprite.x = minX;   // clamp
			direction = 1;                 // now go right
		}
	});

	const displacementFilter = new PIXI.DisplacementFilter(displacementSprite);
	pixiApp.stage.filters = [displacementFilter];
	//displacementSprite.texture.source.addressMode = PIXI.DEPRECATED_WRAP_MODES.REPEAT;
	
});
	
}

function redrawRocksAndCoral() {
    // Remove existing rocks
    for (let i = pixiWorld.children.length - 1; i >= 0; i--) {
        const child = pixiWorld.children[i];
        if (child.texture === limestoneTexture) {
            pixiWorld.removeChild(child);
        }
    }

    // Add all your environment stuff
    calciumCarbonateArray.forEach(rockData => {
        const rock = new PIXI.Sprite(limestoneTexture);
        rock.x = rockData.x;
        rock.y = rockData.y;
        pixiWorld.addChild(rock);
    });
    
    drawPixiBrainCoral(); 
    drawPixiPipeCoral();
    drawPixiFingerCoral();
    //drawPixiAnemone(); anemone managed in the update loop.
    drawPixiSeagrass();
    drawPixiSeaweed();
    drawPixiSponge();
    drawPixiRocks();
    

    // 🔥 NEW: Bring all Hermit Crabs to the top!
    for (let pop of PCArray) {
        if (pop instanceof HermitCrab && pop.pixiSprite) {
            // Move to the highest index (top of the display list)
            pixiWorld.setChildIndex(pop.pixiSprite, pixiWorld.children.length - 1);
        }
    }
	for(let coral of coralArray){
		if(coral instanceof Anemone){
			pixiWorld.setChildIndex(coral.pixiSprite, pixiWorld.children.length - 1);
		}
	}
}
function drawPixiSeagrass(){
	

	PIXI.Assets.load("./SpriteSheets/Seagrass/seagrass0.png").then(texture=>{
		
		for (let i = pixiWorld.children.length - 1; i >= 0; i--) {
			const child = pixiWorld.children[i];
			if (child.texture === texture) {   // matches the rock texture
				pixiWorld.removeChild(child);
			}
		}
	
		seagrassArray.forEach(data =>{
			const seagrass =new PIXI.Sprite(texture);
			seagrass.x=data.x;
			seagrass.y=data.y;
			seagrass.height=data.height;
			seagrass.width=data.width;
			pixiWorld.addChild(seagrass)
		})
	});
}

function drawPixiSeaweed(){
	PIXI.Assets.load("./SpriteSheets/Seaweed/seaweed0.png").then(texture=>{

		for (let i = pixiWorld.children.length - 1; i >= 0; i--) {
			const child = pixiWorld.children[i];
			if (child.texture === texture) {   // matches the rock texture
				pixiWorld.removeChild(child);
			}
		}
		seaweedArray.forEach(data=>{
			const seaweed=new PIXI.Sprite(texture);
			seaweed.x=data.x;
			seaweed.y=data.y;
			seaweed.height=data.height;
			seaweed.width=data.width;
			pixiWorld.addChild(seaweed);
		})
		
	})
}

function drawPixiSponge(){
	PIXI.Assets.load("./SpriteSheets/Sponge/sponge0.png").then(texture=>{
		
		for (let i = pixiWorld.children.length - 1; i >= 0; i--) {
			const child = pixiWorld.children[i];
			if (child.texture === texture) {   // matches the rock texture
				pixiWorld.removeChild(child);
			}
		}
		spongeArray.forEach(data=>{
			const sponge=new PIXI.Sprite(texture);
			sponge.x=data.x;
			sponge.y=data.y;
			sponge.height=data.height;
			sponge.width=data.width;
			pixiWorld.addChild(sponge);
		})
	})	
}
function drawPixiBrainCoral(){
		PIXI.Assets.load("./Pics/PlaceMenuIcons/genericCoral.png").then(texture=>{
			
		//remove all existing  
		for (let i = pixiWorld.children.length - 1; i >= 0; i--) {
			const child = pixiWorld.children[i];
			if (child.texture === texture) {   // matches the rock texture
				pixiWorld.removeChild(child);
			}
		}
		//redraw them
		brainCoralArray.forEach(data=>{
			const coral=new PIXI.Sprite(texture);
			coral.x=data.x;
			coral.y=data.y;
			coral.height=data.height;
			coral.width=data.width;
			pixiWorld.addChild(coral);
		})
	})
}
function drawPixiPipeCoral(){
			//remove all existing  
		for (let i = pixiWorld.children.length - 1; i >= 0; i--) {
			const child = pixiWorld.children[i];
			if (child.texture === pipeCoralTinyTexture ||child.texture === pipeCoralSmallTexture|| child.texture === pipeCoralMediumTexture) {   // matches the rock texture
				pixiWorld.removeChild(child);
			}
		}
		// redraw according to lvl
		
		organPipeCoralArray.forEach(data=>{
			if(data.size==="tiny"){
				const coral= new PIXI.Sprite(pipeCoralTinyTexture);
				coral.x=data.x;
				coral.y=data.y;
				coral.height=data.height;
				coral.width=data.width;
				pixiWorld.addChild(coral);
				console.log("tiny Drawn");
			}
			else if(data.size==="small"){
				const coral= new PIXI.Sprite(pipeCoralSmallTexture);
				coral.x=data.x;
				coral.y=data.y;
				coral.height=data.height;
				coral.width=data.width;
				pixiWorld.addChild(coral);
			}
			else if(data.size==="medium"){
				const coral= new PIXI.Sprite(pipeCoralMediumTexture);
				coral.x=data.x;
				coral.y=data.y;
				coral.height=data.height;
				coral.width=data.width;
				pixiWorld.addChild(coral);
			}else{
				console.warn("no condition hit")
			}
			
		})
}
function drawPixiFingerCoral(){
			//remove all existing  
		for (let i = pixiWorld.children.length - 1; i >= 0; i--) {
			const child = pixiWorld.children[i];
			if (child.texture === fingerCoralTinyTexture ||child.texture === fingerCoralSmallTexture|| child.texture === fingerCoralMediumTexture) {   // matches the rock texture
				pixiWorld.removeChild(child);
			}
		}
		// redraw according to lvl
		
		fingerCoralArray.forEach(data=>{
			if(data.size==="tiny"){
				const coral= new PIXI.Sprite(fingerCoralTinyTexture);
				coral.x=data.x;
				coral.y=data.y;
				coral.height=data.height;
				coral.width=data.width;
				pixiWorld.addChild(coral);
				console.log("tiny Drawn");
			}
			else if(data.size==="small"){
				const coral= new PIXI.Sprite(fingerCoralSmallTexture);
				coral.x=data.x;
				coral.y=data.y;
				coral.height=data.height;
				coral.width=data.width;
				pixiWorld.addChild(coral);
			}
			else if(data.size==="medium"){
				const coral= new PIXI.Sprite(fingerCoralMediumTexture);
				coral.x=data.x;
				coral.y=data.y;
				coral.height=data.height;
				coral.width=data.width;
				pixiWorld.addChild(coral);
			}else{
				console.warn("no condition hit")
			}
			
		})
}
function drawPixiAnemone(){
			//remove all existing  
		for (let i = pixiWorld.children.length - 1; i >= 0; i--) {
			const child = pixiWorld.children[i];
			if (child.texture === anemoneTinyTexture ||child.texture === anemoneSmallTexture|| child.texture === anemoneMediumTexture || child.texture === anemoneLargeTexture) {   // matches the rock texture
				pixiWorld.removeChild(child);
			}
		}
		// redraw according to lvl
		
		anemoneArray.forEach(data=>{
			if(data.size==="tiny"){
				const coral= new PIXI.Sprite(anemoneTinyTexture);
				coral.x=data.x;
				coral.y=data.y;
				coral.height=data.height;
				coral.width=data.width;
				pixiWorld.addChild(coral);
				console.log("tiny Drawn");
			}
			else if(data.size==="small"){
				const coral= new PIXI.Sprite(anemoneSmallTexture);
				coral.x=data.x;
				coral.y=data.y;
				coral.height=data.height;
				coral.width=data.width;
				pixiWorld.addChild(coral);
			}
			else if(data.size==="medium"){
				const coral= new PIXI.Sprite(anemoneMediumTexture);
				coral.x=data.x;
				coral.y=data.y;
				coral.height=data.height;
				coral.width=data.width;
				pixiWorld.addChild(coral);
			}
			else if(data.size==="large"){
				const coral= new PIXI.Sprite(anemoneLargeTexture);
				coral.x=data.x;
				coral.y=data.y;
				coral.height=data.height;
				coral.width=data.width;
				pixiWorld.addChild(coral);
			}
			else{
				console.warn("no condition hit")
			}
			
		})
}
function drawPixiRocks(){
			//remove all existing  
			if(!pixiWorld){
				console.warn("noPixiWorld")
				return
			}
		for (let i = pixiWorld.children.length - 1; i >= 0; i--) {
			const child = pixiWorld.children[i];
			if (child.texture === rockTinyTexture ||child.texture === rockSmallTexture|| child.texture === rockMediumTexture || child.texture === rockLargeTexture) {   // matches the rock texture
				pixiWorld.removeChild(child);
			}
		}
		// redraw according to lvl
		
		rocksArray.forEach(data=>{
			if(data.size==="tiny"){
				const rock= new PIXI.Sprite(rockTinyTexture);
				rock.x=data.x;
				rock.y=data.y;
				rock.height=data.height;
				rock.width=data.width;
				pixiWorld.addChild(rock);
			}
			else if(data.size==="small"){
				const rock= new PIXI.Sprite(rockSmallTexture);
				rock.x=data.x;
				rock.y=data.y;
				rock.height=data.height;
				rock.width=data.width;
				pixiWorld.addChild(rock);
			}
			else if(data.size==="medium"){
				const rock= new PIXI.Sprite(rockMediumTexture);
				rock.x=data.x;
				rock.y=data.y;
				rock.height=data.height;
				rock.width=data.width;
				pixiWorld.addChild(rock);
			}
			else if(data.size==="large"){
				const rock= new PIXI.Sprite(rockLargeTexture);
				rock.x=data.x;
				rock.y=data.y;
				rock.height=data.height;
				rock.width=data.width;
				pixiWorld.addChild(rock);
			}
			else{
				console.warn("no condition hit")
			}
			
		})
}

function drawPlayableChars() {
    for (let pop of PCArray) {
        
        pop.frameCounter++;
        
        if (pop instanceof Shrimp) {
            if (pop.frameCounter > pop.animationSpeed) {
                pop.currentFrame = (pop.currentFrame + 1) % shrimpImgArray.length;
                pop.frameCounter = 0;
            }
        }
        else if (pop instanceof Seahorse) {
            if (pop.frameCounter > pop.animationSpeed) {
                pop.currentFrame = (pop.currentFrame + 1) % seahorseSwimImgArray.length;
                pop.frameCounter = 0;
            }
        }
        else if (pop instanceof Fish) {
            if (pop.frameCounter > pop.animationSpeed) {
                pop.currentFrame = (pop.currentFrame + 1) % clownfishSwimImgArray.length;
                pop.frameCounter = 0;
            }

        }
		else if(pop instanceof Crab){
				
				if (pop.frameCounter > pop.animationSpeed) {
						pop.currentFrame = (pop.currentFrame + 1) % crabWalkImgArray.length;
						pop.frameCounter = 0;
					}				
			}
		else if(pop instanceof PistolShrimp){
				if (pop.frameCounter > pop.animationSpeed) {
						pop.currentFrame = (pop.currentFrame + 1) % pistolShrimpWalkImgArray.length;
						pop.frameCounter = 0;
					}				
		}
        pop.draw();
        pop.findState();
    }
}

function drawCorals(){
	
	for (let coral of brainCoralArray) {
         coral.draw();

		for(let calcium of coral.calciumCarbonateArray){
			calcium.draw();
		}
    }
		 for (let anemone of anemoneArray){
		 anemone.draw();
		 anemone.frameCounter++;
		 if(anemone instanceof Anemone){
			 if (anemone.frameCounter > anemone.animationSpeed) {
					anemone.currentFrame = (anemone.currentFrame + 1) % anemoneIdleImgArray.length;
					anemone.frameCounter = 0;
				}
		 }else if(anemone instanceof BabyAnemone){
			 if (anemone.frameCounter > anemone.animationSpeed) {
					anemone.currentFrame = (anemone.currentFrame + 1) % babyAnemoneIdleImgArray.length;
					anemone.frameCounter = 0;
				}
		 }

	 }
	 for(let pipe of organPipeCoralArray){
		 pipe.draw();
		for(let calcium of pipe.calciumCarbonateArray){
			calcium.draw();
		}
	 }
	 
	 for(let coral of fingerCoralArray){
		 coral.draw();
		 
	 }
	 
}

function drawSeaweedAndSeaGrass(){
	for (let seaweed of seaweedArray){
		 seaweed.draw();
	 }	 

	for(let seagrass of seagrassArray){
		seagrass.draw();
	}
	 
}


function drawCalciumCarbonate(viewLeft,viewTop,viewRight,viewBottom){
		for (let cc of calciumCarbonateArray){
		
		if (cc.x + cc.width < viewLeft || cc.x > viewRight ||
			cc.y + cc.height < viewTop || cc.y > viewBottom) {
			continue;
		}
		cc.draw();
	} 
}

function drawRocks(){
	for (let rocks of rocksArray){
		rocks.draw();
	}
}

function drawSponges(){
	 for(let sponge of spongeArray){

/* 	 sponge.frameCounter++;
	 if(sponge.frameCounter>sponge.animationSpeed){
		sponge.currentFrame=(sponge.currentFrame+1)%spongeImgArray.length;
		sponge.frameCounter=0;
	 } */
	 sponge.draw();
	}
}
//enemies 
function drawJellyfish(){
		 for(let jelly of jellyfishArray){
		 jelly.frameCounter++;
		 if(jelly.frameCounter>jelly.animationSpeed){
			 jelly.currentFrame=(jelly.currentFrame+1)%jellyfishImgArray.length;
			 jelly.frameCounter=0;
		 }
		 jelly.draw();
	 }
}
function drawBarracuda(){
		 for(let actor of barracudaArray){
		 actor.frameCounter++;
		 if(actor.frameCounter>actor.animationSpeed){
			 actor.currentFrame=(actor.currentFrame+1)%barracudaSwimImgArray.length;
			 actor.frameCounter=0;
		 }
		 actor.draw();
	 }
	 
}


function drawParticles(){
	
	for(let i =0;i<particlesArray.length;i++){
		let particle=particlesArray[i];
		particle.update();
		particle.draw();
		if(!particle.active) particlesArray.splice(i,1);
	}

}
function drawBleachedCoral(){
	for(let coral of bleachedCoralArray){
		coral.draw();
	}
}

function drawTidemill(){
	for(let building of tidemillArray){
		 building.frameCounter++;
		 if(building.frameCounter>building.animationSpeed){
			 building.currentFrame=(building.currentFrame+1)%tidemillImgArray.length;
			 building.frameCounter=0;
		 }
		 building.draw();
	}
}


function drawSandBattery() {
    for (let building of sandBatteryArray) {
        building.frameCounter++;
        if (building.frameCounter >= building.animationSpeed) {
            building.currentFrame = (building.currentFrame + 1) % sandBatteryImgArray.length;
            building.frameCounter = 0;
        }
        building.draw();
    }
}

function drawSolarPanel(){
	for(let building of solarPanelArray){
		building.draw();
	}
}