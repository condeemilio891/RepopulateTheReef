class OrganPipeCoral {
    constructor(x, y, size) {
		this.name="Pipe Coral"
        this.x = x;
        this.y = y;
		this.cardDrawn=false;
	
		this.temperature=0;
		this.heatTolerance=85;// change to 85
		this.size=size;
		this.img=new Image;
		this.img.src="Pics/PlaceMenuIcons/pipeCoralMediumStill.png"; 
		this.overheatingCounter=0;
		this.overheatingTolerance=5;
		this.overheating=false;
		this.bleaching=false;
		this.healthStatus="";

        this.width = 200;
        this.height = 200;
		this.radius=1000;
        this.flipped = false;
        this.state = "live"; 
        this.selected = false;
		this.currStateText="Ideal Temp";
		
		//attributes 
		this.attributeIcon1=new Image();
		this.attributeIcon1.src="./Pics/AttributeIcons/rustyCoralAttribute1.png";
		//stats calculated by level
		this.planktonUpkeep = this.popArray?.length ?? 0;// plankton upkeep should be calculated by pop
		this.algaeUpkeep = 0;
		this.calciumCarbonateProduction = 2;
		this.planktonStorageCap = 2000;
		this.algaeStorageCap = 2000;
		this.calciumCarbonateStorageCap = 2000;
		
		this.nextLvl=100;
		//rehydrate these 
		this.health = 100;
		this.hunger = 100;
		this.planktonStored = 250;
		this.algaeStored = 250;
		this.ammonia=100;// we will have to combine this with the whole reef for sure.
		this.nitrogen=0;
		this.growth=2;
		this.calciumCarbonateStored = 0;
		this.createCalciumCarbonateCounter=0;
		
		this.popLimit=3;	
		this.popArray=[];

		
		this.calciumCarbonateArray=[];
		
		this.maxCreateCalciumCarbonateCounter=0;		
		
		
		
		//ui image make global and delets 
		this.buySeahorse=new Image();
		this.buySeahorse.src="Pics/seahorseSwim0.png"
		this.buyPistolShrimp= new Image();
		this.buyPistolShrimp.src="SpriteSheets/PistolShrimp/Idle/pistolShrimp0.png";
    }

    draw() {
        let imgToDraw = this.img;
        //canvasContext.drawImage(imgToDraw, this.x, this.y, this.width, this.height);

        // Draw Outline if Selected
        if (this.selected) {
			this.createRadiusDebug();
			selectText="Pillar Coral" +" " + this.size.charAt(0).toUpperCase() + this.size.slice(1);
			actorSelected=this;
			drawCurrStateText(this.currStateText);
			drawSelectedActorProfilePic(imgToDraw);
			drawHealthIcon(this.health);
			drawHungerIcon(this.hunger);

			drawThermometerIcon(this.heatTolerance);
			drawCalciumCarbonateIcon(this.calciumCarbonateStored);
			//infobox
			drawDietIcon("filterFeeder");
			drawAttributeIcon1(this.attributeIcon1,"Hard Coral","white");
			drawAttributeIcon2(this.attributeIcon1,"Heat-Resistant Algae","white");
			
			drawUpkeep1Text("Algae Stored "+this.algaeStored,"#2CFF05");
			drawUpkeep2Text("Plankton Stored "+this.planktonStored,"#FF13F0");
			drawUpkeep3Text("Health "+this.healthStatus,"red");
			
			drawStat1Text("Nitrogen "+this.nitrogen.toString());
			drawStat2Text("Ammonia " + this.ammonia.toString());
			drawStat3Text("CC production "+ this.calciumCarbonateProduction.toString());
			drawStat4Text("Pops "+this.popArray.length.toString() +"/"+this.popLimit.toString());
			//buy Icons 
			drawOutlierIcon(70,250,this.buySeahorse,"blue",isBuyButtonHovered1);
			drawOutlierIcon(70,350,this.buyPistolShrimp,"blue",isBuyButtonHovered2);
			
			drawUIOutlinerButtons(outlinerButtonsX,outlinerButtonsY,outlinerButtonWidth,this.buySeahorse,this.img,);
			
			if(UIOutlinerButtonsState==="pop"){
				drawWorkerCards(this,this.size);
			}
			else if(UIOutlinerButtonsState=="growth"){
				drawGrowthProgressBar(this.growth,this.nextLvl,this.growth.toString()+"/"+this.nextLvl.toString());
				drawProductionProgressBar(this.createCalciumCarbonateCounter, this.maxCreateCalciumCarbonateCounter, "LimeStone: "+this.createCalciumCarbonateCounter+"/"+this.maxCreateCalciumCarbonateCounter);
				drawOverheatingProgressBar(this.overheatingCounter, this.overheatingTolerance, "Overheating "+ this.overheatingCounter + "/" + this.overheatingTolerance);
			}
			else if(UIOutlinerButtonsState==="info"){
				drawOutlinerDietIcon("coral");
				drawOutlinerIcon1(this.attributeIcon1,"Does Not Produce LimeStone\n Or Grow if Bleaching","blue");
				drawOutlinerIcon2(this.attributeIcon1,"Heat Resistant Algae","blue");
				drawOutlinerIcon3(this.attributeIcon1,"Create Calcium Carbonate","blue");
			}			
			
        }
    }
	
	findState() {
        switch (this.state) {
            case "live":
                this.live();
                break;
			case "stop":
                this.stop();
                break;
				
        }
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
	live(){
		if(this.growth>=this.nextLvl){
			this.levelUp();
		}
		if(this.createCalciumCarbonateCounter>=this.maxCreateCalciumCarbonateCounter){
			this.createCalciumCarbonate();
			this.calciumCarbonateStored++;
			this.createCalciumCarbonateCounter=0
		}
		this.increaseCalciumCarbonateCounter()
		this.eatAmmonia();
		this.feedAmmoniaToSeaweed();
		this.feedAmmoniaToSeagrass();
		this.handleHunger();
		this.handleEating();
		this.getTemperature();
		this.checkOverheating();
	}
	increaseCalciumCarbonateCounter(){
		if(this.bleaching) return; 
		if(this.planktonStored<10) return;
		
		this.createCalciumCarbonateCounter++;
		this.planktonStored-=this.planktonUpkeep; // this is just upkeep?
	}
	createCalciumCarbonate(){ 
			let randomXOffset=this.x+Math.random()*180+1
			let calciumCarbonate= new CalciumCarbonate(randomXOffset,this.y+this.height);
			this.planktonStored-=10;
			this.calciumCarbonateArray.push(calciumCarbonate);
			console.log("CC created CC Arr: ",this.calciumCarbonateArray);
	}
	getTemperature() {
		this.temperature= resourceData.temperature.total;
	}
	checkOverheating(){
		if(this.temperature>this.heatTolerance){
			this.overheatingCounter++
			alertText=this.name+ " is Starting to Overheat";
		}
		else if(this.temperature<=this.heatTolerance){
			this.overheatingCounter--
			if(this.overheatingCounter<=0){
				this.overheatingCounter=0
			}
		}
		if(this.overheatingCounter>=this.overheatingTolerance){
			alertText=this.name+ " is Expelling Algae!"
			this.overheatingCounter=this.overheatingTolerance;
			this.overheating=true
		}else{
			this.overheating=false;
		}
		if(this.overheating){
			if(this.algaeStored<=0){
				this.algaeStored=0;
			}else{			
				this.algaeStored-=10;
			}
		}
		
	}
	eatAmmonia(){
		if(this.bleaching) return;
		if(this.ammonia>10){
			this.ammonia-=5;
			this.growth++;
		}
	}
	feedAmmoniaToSeaweed() { // I should do this the other way.  but nah 
		if (this.ammonia < 80) return;
		getAllActorsInRadius(this, seaweedArray).forEach(seaweed => {
			this.ammonia -= 2;
			seaweed.ammonia+=2;
		});
	}
	handleHunger() {
		if (this.algaeStored <= 100) {
			createNotification(warningImg, this.name+ " Is BLEACHING Bring Algae To "+this.name+ " To Heal", priority = "normal");
			// Critical: bleaching
			this.hunger -= 10;
			this.currStateText = "Bleaching: Raise Algae\nLevels To 100 To Restore\nGrowth and Production";
			this.bleaching = true;
			this.healthStatus="Bleaching";
		} else if (this.algaeStored <= 200) {
			// Low but not critical
			this.hunger -= 5;
			this.currStateText = "Low Algae: Struggling to Produce Energy\nGets Hungry Faster";
			this.bleaching = false;
			this.healthStatus="Low Algae";
		} else {
			// Healthy amount
			this.currStateText="Healthy: Algae is Producing Energy For\nCoral Geets Hungry Less"
			this.hunger -= 1;
			this.bleaching = false;
			this.healthStatus= "Healthy";
		}
		if (this.hunger <= 0) {
			createNotification(warningImg, this.name+ " Is Starving and Losing Health Bring Plankton to " +this.name, priority = "normal");
			this.health -= 10;
			this.currStateText = "Starving: Out Of Plankton And Algae\nVital Signs Critical";
			this.hunger = 0;
			this.healthStatus= "Critical"
		}
	}
	handleEating(){
		if(this.planktonStored<=10) return
		if(this.hunger<50){
			this.planktonStored-=10;
			this.hunger=100;
		}
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
			this.width = 150;
			this.height = 150;
			this.img.src="Pics/PlaceMenuIcons/pipeCoralTiny.png"
			this.radius=750;
			this.nextLvl=50;
			this.popLimit=3
			this.createCalciumCarbonateCounter=1;
			this.maxCreateCalciumCarbonateCounter=20;
		}
		if(this.size==="small"){
			this.width = 150;
			this.height = 250;
			this.img.src="Pics/PlaceMenuIcons/pipeCoralSmall.png"
			this.radius=1000;
			this.nextLvl=400;
			this.popLimit=6
			this.createCalciumCarbonateCounter=1;
			this.maxCreateCalciumCarbonateCounter=20;	
		}
		else if(this.size==="medium"){
			this.width = 300;
			this.height = 300;
			this.img.src="Pics/PlaceMenuIcons/pipeCoralMediumStill.png"
			this.radius=1500;
			this.nextLvl=1000;
			this.popLimit=15;
			this.createCalciumCarbonateCounter=1;
			this.maxCreateCalciumCarbonateCounter=15;				
		}
		redrawRocksAndCoral()
	}
	levelUp(){
		if(this.size==="tiny"){
			this.size="small";
			this.setLevelStats();
		}
		else if(this.size==="small"){
			this.size="medium";
			this.setLevelStats();
		}
	}
	
	//Save And Load

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
		const newCoral = new OrganPipeCoral(data.x, data.y,data.size);
		newCoral.health=data.health;
		newCoral.hunger=data.hunger;
		newCoral.temperature=data.temperature
		newCoral.algaeStored=data.algaeStored;
		newCoral.planktonStored=data.planktonStored;
		newCoral.nitrogen=data.nitrogen;
		newCoral.ammonia=data.ammonia;
		newCoral.calciumCarbonateStored=data.calciumCarbonateStored;
		newCoral.growth=data.growth;
		newCoral.calciumCarbonateCounter=data.calciumCarbonateCounter;
			
		if (data.popArray && Array.isArray(data.popArray)) {
			newCoral.popArray = data.popArray.map(popData => {
				switch (popData.type) {
					case 'Seahorse':
						return Seahorse.fromData(popData, newCoral);
					case 'PistolShrimp':
						return PistolShrimp.fromData(popData, newCoral);
					// add other types as needed
					default:
						console.warn(`Unknown pop type: ${popData.type}`);
						return null;
				}
			}).filter(p => p !== null); // remove any nulls
		} else {
			newCoral.popArray = [];
		}
		return newCoral;
		
	}	
	

}