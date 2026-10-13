class BrainCoral {
    constructor(x, y,size) {
		this.name="Brain Coral"
        this.x = x;
        this.y = y;
		this.cardDrawn=false;
		this.radius=2000;
		this.type="Brain Coral";// for alert txt 

        this.img = new Image();
        this.img.src = "Pics/PlaceMenuIcons/genericCoral.png";
		
        this.width = 300;
        this.height = 200;
        this.flipped = false;
        this.state = "live"; 
        this.selected = false;
		


		this.planktonUpkeep = .25;
		this.algaeUpkeep = .25;
		this.calciumCarbonateProduction = 2;
		this.planktonStorageCap = 2000;
		this.algaeStorageCap = 2000;
		this.calciumCarbonateStorageCap = 50;
		this.nextLvl=3000;
		this.popLimit=24;

		//rehydrate
		this.size="large"
		this.health = 100;
		this.hunger = 100;
		this.temperature=100;
		this.planktonStored = 150;
		this.algaeStored = 150;
		this.calciumCarbonateStored = 0;
		this.ammonia=250;
		this.nitrogen=0;
		this.growth=1000;
		this.createCalciumCarbonateCounter=37;
		this.maxCreateCalciumCarbonateCounter=40;
				//attributes 
		this.attributeIcon1=new Image();
		this.attributeIcon1.src="./Pics/AttributeIcons/rustyCoralAttribute1.png";
		this.attributeIcon2=new Image();
		this.attributeIcon2.src="./Pics/AttributeIcons/nutrientRecyclingIcon.png";
		
		this.isAlive = true;
		
		this.timerId = null;  // Store the interval ID
		

		this.popArray=[];
		this.calciumCarbonateArray=[];
		//this.popArrayTier2=[]; should I add an arr for each type would help compiler and saving?
		
		
		
		//UI Images // we might need to make these global. 
		this.retreatIcon = new Image();
		this.retreatIcon.src = "./Pics/returnArrow.png";
		this.buyShrimp=new Image();
		this.buyShrimp.src="SpriteSheets/Shrimp/Idle/shrimp0.png"
		this.buyDamselfish= new Image();
		this.buyDamselfish.src="SpriteSheets/Damselfish/DamselfishSwim/damselfishSwim0.png"
		
    }


	draw() {

		if (this.selected) {
			actorSelected = this;
			drawBorder(actorSelected,performance.now() * 0.001)
			this.createRadiusDebug();
			selectText = "Brain Coral "+ this.size.charAt(0).toUpperCase() + this.size.slice(1);
			drawSelectedActorProfilePic(this.img);
			
			drawHealthIcon(this.health);
			drawHungerIcon(this.hunger);
			drawThermometerIcon(this.temperature);
			drawCalciumCarbonateIcon(this.calciumCarbonateStored);
			//infobox 
			drawDietIcon("filterFeeder");
			drawAttributeIcon1(this.attributeIcon1,"HardCoral","white");
			drawAttributeIcon2(this.attributeIcon1,"Reef Builder","white");
			drawAttributeIcon3(this.attributeIcon2, "nutrientRecycling", "white");
			
			drawUpkeep1Text("Algae Stored " + parseInt(this.algaeStored), "#2CFF05");
			drawUpkeep2Text("Plankton Stored " + parseInt(this.planktonStored), "#FF13F0");

			drawStat1Text("Nitrogen "+this.nitrogen.toString());
			drawStat2Text("Ammonia " + this.ammonia.toString());
			drawStat3Text("Calcium Production "+ this.calciumCarbonateProduction.toString());
			drawStat4Text("Pops "+this.popArray.length.toString() +"/"+this.popLimit.toString());
			
			// buy icons 
			drawOutlierIcon(70,250,this.buyShrimp,"blue",isBuyButtonHovered1);
			drawOutlierIcon(70,350,this.buyDamselfish,"red",isBuyButtonHovered2);
			
			drawUIOutlinerButtons(outlinerButtonsX,outlinerButtonsY,outlinerButtonWidth,this.buyShrimp,this.img);
			
			if(UIOutlinerButtonsState==="pop"){
				drawWorkerCards(this,this.size);
			}
			else if(UIOutlinerButtonsState=="growth"){
				drawGrowthProgressBar(this.growth,this.nextLvl,this.growth.toString()+"/"+this.nextLvl.toString());
				drawProductionProgressBar(this.createCalciumCarbonateCounter, this.maxCreateCalciumCarbonateCounter, "LimeStone: "+this.createCalciumCarbonateCounter+"/"+this.maxCreateCalciumCarbonateCounter);
			}
			else if(UIOutlinerButtonsState==="info"){
				drawOutlinerDietIcon("filterFeeder");
				drawOutlinerIcon1(this.attributeIcon1,"Heat Resistant Algae\nExpels Algae at 90°F","black");
				drawOutlinerIcon2(this.attributeIcon2,"Creates Calcium Carbonate","black");
				drawOutlinerIcon3(this.attributeIcon2,"Converts Ammonia to Tissue","black");
				drawOutlinerIcon4(this.attributeIcon2,"Fertilizes Plants in Radius","black");
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
	
	
	live(){
		this.planktonStored-=this.planktonUpkeep;
		this.algaeStored-=this.algaeUpkeep;
		if(this.createCalciumCarbonateCounter>=this.maxCreateCalciumCarbonateCounter){
			this.createCalciumCarbonate();
			this.createCalciumCarbonate();
			this.calciumCarbonateStored++;
			this.createCalciumCarbonateCounter=0
		}
		this.eatAmmonia();
		this.createCalciumCarbonateCounter++;
		this.feedAmmoniaToSeaweed();
		this.feedAmmoniaToSeagrass();
		this.feedNitrogenToSeaweed();
		this.feedNitrogenToSeagrass();

	}
	createCalciumCarbonate(){
		if(this.planktonStored>=10){
			let randomXOffset=this.x+Math.random()*180+1
			let calciumCarbonate= new CalciumCarbonate(randomXOffset,this.y+180);
			// lets make 2 or 3 at a time for a large 
			this.calciumCarbonateArray.push(calciumCarbonate);
		}else{
			console.log("not enough plankton to create CC!")
		}
	}
	createRadiusDebug() {
		canvasContext.save();
		canvasContext.globalAlpha = 0.15;    // Set global alpha for reduced opacity
		canvasContext.beginPath();
		canvasContext.arc(this.x +this.width/2, this.y+this.height/2, this.radius, 0, 2 * Math.PI);
		canvasContext.fillStyle="blue"
		canvasContext.fill();
		canvasContext.globalAlpha = 1;
		canvasContext.stroke();
		canvasContext.restore();
	}
	
	eatAmmonia(){
		if(this.ammonia>10){
			this.ammonia-=2;
			this.growth++
		}
	}

	feedAmmoniaToSeagrass() { // I should do this the other way.  but nah Added Nitrogen
		if (this.ammonia < 80) return;
		getAllActorsInRadius(this, seagrassArray).forEach(seagrass => {
			if(this.ammonia<=0) return;
			this.ammonia -= 2;
			seagrass.ammonia+=2;
		});
	}
	feedNitrogenToSeagrass() { // I should do this the other way.  but nah Added Nitrogen
		if (this.nitrogen < 80) return;
		getAllActorsInRadius(this, seagrassArray).forEach(seagrass => {
			if(this.nitrogen<=0) return;
			
			this.nitrogen-= 2;
			seagrass.nitrogen+=2;
		});
	}
	feedAmmoniaToSeaweed() { // I should do this the other way.  but nah 
		if (this.ammonia < 80) return;
		getAllActorsInRadius(this, seaweedArray).forEach(seaweed => {
			if(this.ammonia<=0) return;
			this.ammonia -= 2;
			seaweed.ammonia+=2;
		});
	}
	feedNitrogenToSeaweed() { // I should do this the other way.  but nah Added Nitrogen
		if (this.nitrogen < 80) return;
		getAllActorsInRadius(this, seaweedArray).forEach(seaweed => {
			if(this.nitrogen<=0) return;
			this.nitrogen-= 2;
			seaweed.nitrogen+=2;
		});
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
		const newCoral = new BrainCoral(data.x, data.y,data.size);
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
					case 'Shrimp':
						return Shrimp.fromData(popData, newCoral);
					case 'Damselfish':
						return Damselfish.fromData(popData, newCoral);
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