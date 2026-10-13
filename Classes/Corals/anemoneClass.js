class Anemone {
    constructor(x, y, size) {
		this.name="Sea Anemone";
        this.x = x;
        this.y = y;
		this.cardDrawn=false;
		this.radius=2000;
		this.isAlive=true;
		this.type="Sea Anemone";// for alert txt 

		this.size=size;
		this.img=new Image;
		this.img.src="Pics/PlaceMenuIcons/anemone.png"; 

        this.width = 300;
        this.height = 300;
        this.flipped = false;
        this.state = "live"; 
        this.selected = false;
		this.currStateText="";
		this.isAttached=false;
		this.attachedHermit=null;
		
		//attributes 
		this.attributeIcon1=new Image();
		this.attributeIcon1.src="./Pics/AttributeIcons/anemoneAttribute1.png";
		this.attributeIcon2=new Image();
		this.attributeIcon2.src="./Pics/AttributeIcons/mutualismIcon.png";
		this.attributeIcon3=new Image();
		this.attributeIcon3.src="./Pics/AttributeIcons/ultravioletIcon.png";
		//stats
		this.health = 100;
		this.hunger = 100;
		this.temperature=80;
		this.planktonUpkeep = this.popArray?.length ?? 0;// plankton upkeep should be calculated by pop
		this.algaeUpkeep =    this.popArray?.length ?? 0;

		this.planktonStored = 300;
		this.algaeStored = 300;
		this.planktonStorageCap = 2000;
		this.algaeStorageCap = 2000;
		this.attackDmg=20;
		this.growth=20;
		this.nextLvl=250;
		this.popLimit = 6;
	

		this.popArray=[];
		this.ammonia=1000;
		this.nitrogen=0;
		
		// animations
		this.currentFrame = 0;
		this.frameCounter = 0;
		this.animationSpeed = 30; // Higher = slower animation
		
		// UI Icons 
		this.buyClownfish=new Image(); 
		this.buyClownfish.src="Pics/clownfishIso.jpg";
		this.buyBrainCoralPolypImg= new Image();
		this.buyBrainCoralPolypImg.src="Pics/brainCoralPolyp.png";
		
		// 🔥 CREATE THE PIXI SPRITE ONCE
        const texture = this.getTextureForSize(this.size);
        this.pixiSprite = new PIXI.Sprite(texture);
        this.pixiSprite.anchor.set(0.5, 0.5);
        this.pixiSprite.x = this.x + this.width / 2;
        this.pixiSprite.y = this.y + this.height / 2;
        this.pixiSprite.width = this.width;
        this.pixiSprite.height = this.height;
        
        // Add to pixiWorld (or a container layer!)
        pixiWorld.addChild(this.pixiSprite);
    }

    draw() {
		let imgToDraw=this.img;
		

        // Draw Outline if Selected
        if (this.selected) {
			actorSelected = this;
			this.createRadiusDebug();
            //StatsUI variables 
			
			selectText = "Anemone "  + this.size.charAt(0).toUpperCase() + this.size.slice(1);	
			drawSelectedActorProfilePic(imgToDraw);
			drawCurrStateText(this.currStateText);
			drawHealthIcon(this.health);
			drawHungerIcon(this.hunger);
			drawThermometerIcon(this.temperature);

			//infoBox
			drawDietIcon("filterFeeder");
			drawAttributeIcon1(this.attributeIcon1,"Venomous Sting","white");
			drawAttributeIcon2(this.attributeIcon2,"Mutialism","white");
			drawAttributeIcon3(this.attributeIcon3,"Ultraviolet","white");
			drawAttributeIcon4(this.attributeIcon2,"Mobile","white");
			
			drawUpkeep1Text("Algae Stored "+this.algaeStored,"#2CFF05");
			drawUpkeep2Text("Plankton Stored "+this.planktonStored,"#FF13F0");
			drawStat2Text("Ammonia "+ this.ammonia.toString());
			drawStat3Text("Dmg "+ this.attackDmg.toString());
			drawStat4Text("Pops "+this.popArray.length.toString()+" / "+ this.popLimit.toString());
			
			
			
			//buy Icons 
			drawOutlierIcon(70,250,this.buyClownfish,"blue",isBuyButtonHovered1);
			
			drawUIOutlinerButtons(outlinerButtonsX,outlinerButtonsY,outlinerButtonWidth,this.buyClownfish,this.img);
			
			if(UIOutlinerButtonsState==="pop"){
				drawWorkerCards(this,this.size);
			}
			else if(UIOutlinerButtonsState=="growth"){
				drawGrowthProgressBar(this.growth,this.nextLvl,this.growth.toString()+"/"+this.nextLvl.toString());
			}
			else if(UIOutlinerButtonsState==="info"){
				drawOutlinerDietIcon("filterFeeder");
				drawOutlinerIcon1(this.attributeIcon1,"Venomous Sting","black");
				drawOutlinerIcon2(this.attributeIcon2,"Phoresy: Can Ride On Hermit\nCrabs to Travel to Another Location ","Black");
				drawOutlinerIcon3(this.attributeIcon2,"Venomous Sting: Uses Nematocysts\nTo Damage Enemys","#550000");
				drawOutlinerIcon4(this.attributeIcon2,"Ultraviolet: Absorbs Harmful UV\nTurns it Into Energy");
			}
			  
        }
    }
	updatePixiAnemone() {
		// 1. Update texture if size changed
		const targetTexture = this.getTextureForSize(this.size);
		if (this.pixiSprite.texture !== targetTexture) {
			this.pixiSprite.texture = targetTexture;
		}

		// 2. Update position
		this.pixiSprite.x = this.x + this.width / 2;
		this.pixiSprite.y = this.y + this.height / 2;

		// 3. Update size (if it changed)
		this.pixiSprite.width = this.width;
		this.pixiSprite.height = this.height;

		// 4. Update flip
		const absScaleX = Math.abs(this.pixiSprite.scale.x);
		const absScaleY = Math.abs(this.pixiSprite.scale.y);
		this.pixiSprite.scale.x = absScaleX * (this.flipped ? -1 : 1);
		this.pixiSprite.scale.y = absScaleY;
	}
	createRadiusDebug() {
		canvasContext.save();
		canvasContext.globalAlpha = 0.1;    // Set global alpha for reduced opacity
		canvasContext.beginPath();
		canvasContext.arc(this.x +this.width/2, this.y+this.height/2, this.radius, 0, 2 * Math.PI);
		canvasContext.fillStyle="blue"
		canvasContext.fill();
		canvasContext.globalAlpha = 1;
		canvasContext.stroke();
		canvasContext.restore();
	}
    getTextureForSize(size) {
        switch(size) {
            case "tiny": return anemoneTinyTexture;
            case "small": return anemoneSmallTexture;
            case "medium": return anemoneMediumTexture;
            case "large": return anemoneLargeTexture;
            default: return anemoneTinyTexture;
        }
    }
	
	findState() {
        switch (this.state) {
            case "live":
                this.live();
                break;
        }
    }
	checkIfAttached(){
		if(this.isAttached){
			this.attachToHermitCrab(this.attachedHermit);
		}
	}
	attachToHermitCrab(hermit){
		this.x=hermit.x-45;
		this.y=hermit.y-140;
		
	}
	live(){

		if(this.growth>=this.nextLvl){
			this.levelUp();
		}
		if(this.planktonStored<this.planktonUpkeep){
			this.hunger-=10;
			alertText="Anemone Is Hungry"
		}
		if(this.algaeStored<this.algaeUpkeep){
			this.hunger-=5;
			alertText="Anemone Is Hungry"
		}
		if(this.hunger<=0){
			this.health-=10;
		}
		this.planktonStored-=this.planktonUpkeep;
		this.algaeStored-=this.algaeUpkeep;
		this.eatAmmonia();
		this.feedAmmoniaToSeaweed();
		this.feedAmmoniaToSeagrass();
		if(this.health<=0){
			this.isAlive=false;
		}
	}
	

	
	eatAmmonia(){
		if(this.ammonia>10){
			this.ammonia-=2;
			this.growth++
		}
	}
	feedAmmoniaToSeaweed() { // I should do this the other way.  but nah 
		if (this.ammonia < 80) return;
		getAllActorsInRadius(this, seaweedArray).forEach(seaweed => {
			this.ammonia -= 2;
			seaweed.ammonia+=2;
		});
	}
	
	
	feedAmmoniaToSeagrass() { // I should do this the other way.  but nah 
		if (this.ammonia < 100) return;
		getAllActorsInRadius(this, seagrassArray).forEach(seagrass => {
			this.ammonia -= 2;
			seagrass.ammonia+=2;
		});
	}

	
	setLevelStats(){
		if(this.size==="tiny"){
			this.img.src= "Pics/PlaceMenuIcons/anemoneSmall.png" // this is for the Coral Cards coralUI.js
			this.width = 250;
			this.height = 250;
			this.radius=750;
			this.nextLvl=700;
			this.popLimit=3

		}
		if(this.size==="small"){
			this.img.src= "Pics/PlaceMenuIcons/anemone.png"; // this is for the Coral Cards coralUI.js
			this.width = 250;
			this.height = 250;
			this.radius=1000;
			this.nextLvl=1000;
			this.popLimit=6

		}
		else if(this.size==="medium"){
			this.img.src="Pics/PlaceMenuIcons/anemoneLarge.png"; // this is for the Coral Cards coralUI.js
			this.width = 200;
			this.height = 200;
			this.radius=1500;
			this.nextLvl=2000;
			this.popLimit=12;
				
		}
		else if(this.size==="large"){
			this.img.src= "Pics/PlaceMenuIcons/anemoneLarge.png"; // this is for the Coral Cards coralUI.js
			this.width = 350;
			this.height = 350;
			this.radius=2000;
			this.growth=1000;
			this.nextLvl=4000;
			this.popLimit=24;

		}else{
			console.warn("non of these levels were hit size is: "+ this.size);
		}
	}
	levelUp(){
		if(this.size==="tiny"){
			this.size="small";
			this.setLevelStats();
			return;
		}
		else if(this.size==="small"){
			this.size="medium";
			this.setLevelStats();
			return
		}else if(this.size==="medium"){
			this.size="large";
			this.setLevelStats();
			return
		}else{
			console.log("ReachedMAX level")
		}
	}

	//save an load 
	toData() {
		const tempPopArray=this.popArray.map(pop => pop.toData());
		return{
			x:this.x,
			y:this.y,
			size:this.size,
			health:this.health,
			hunger:this.hunger,
			temperature:this.temperature,
			algaeStored:this.algaeStored,
			planktonStored:this.planktonStored,
			nitrogen:this.nitrogen,
			ammonia:this.ammonia,
			calciumCarbonateStored:this.calciumCarbonateStored,
			growth:this.growth,
			calciumCarbonateCounter:this.calciumCarbonateCounter,
			popArray: tempPopArray
		}
	}
	
    static fromData(data,homeParam) {
		const newCoral = new Anemone(data.x, data.y,data.size);
		newCoral.health=data.health;
		newCoral.hunger=data.hunger;
		newCoral.temperature=data.temperature
		newCoral.algaeStored=data.algaeStored;
		newCoral.planktonStored=data.planktonStored;
		newCoral.nitrogen=data.nitrogen;
		newCoral.ammonia=data.ammonia;
		newCoral.growth=data.growth;
			
		if (data.popArray && Array.isArray(data.popArray)) {
			newCoral.popArray = data.popArray.map(fishData => 
				Fish.fromData(fishData, newCoral)   // pass the brain coral as home
			);
		} else {
			newCoral.popArray = [];
		}
		return newCoral;
		
	}	
	
	
	
}
