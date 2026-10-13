class FingerCoral {
    constructor(x, y, size) {
		
		this.name="Finger Coral"
        this.x = x;
        this.y = y;
		this.cardDrawn=false;
	
		
		this.size=size;
		this.img=new Image;
		this.img.src="Pics/PlaceMenuIcons/fingerCoral.png"; // for the coral card


        this.width = 200;
        this.height = 200;
		this.radius=1000;
        this.flipped = false;
        this.state = "live"; 
        this.selected = false;
		
		//attributes 
		this.attributeIcon1=new Image();
		this.attributeIcon1.src="./Pics/AttributeIcons/rustyCoralAttribute1.png";
		//stats calculated by level
		this.planktonUpkeep = 2;
		this.algaeUpkeep = 2;
		this.calciumCarbonateProduction = 2;
		this.planktonStorageCap = 2000;
		this.seaweedStorageCap = 2000;
		this.algaeStorageCap = 2000;
		this.calciumCarbonateStorageCap = 2000;
		
		this.nextLvl=100;
		//rehydrate these 
		this.health = 100;
		this.hunger = 100;
		this.planktonStored = 200;
		this.algaeStored = 100;
		this.ammonia=100;// we will have to combine this with the whole reef for sure.
		this.nitrogen=0;
		this.growth=2;
		this.calciumCarbonateStored = 0;
		this.createCalciumCarbonateCounter=0;
		
		this.popLimit=3;	
		this.popArray=[];

		
		this.calciumCarbonateArray=[];
		
		this.maxCreateCalciumCarbonateCounter=0;		
		
		
		
		//buy icons
		this.buyYellowTang= new Image();
		this.buyYellowTang.src="SpriteSheets/YellowTang/yellowTang.png";
		this.buyMantisShrimp= new Image();
		this.buyMantisShrimp.src="SpriteSheets/Mantis/Idle/mantis0.png";
		

    }

    draw() {


        let imgToDraw = this.img;
		

        // Draw Outline if Selected
        if (this.selected) {
            canvasContext.lineWidth = 3;
            canvasContext.strokeStyle = "white";
            canvasContext.strokeRect(this.x - 2, this.y - 2, this.width + 4, this.height + 4);
			actorSelected=this;
			selectText="FingerCoral" +" " + this.size.charAt(0).toUpperCase() + this.size.slice(1);
			drawSelectedActorProfilePic(imgToDraw);
			drawHealthIcon(this.health);
			drawHungerIcon(this.hunger);
			drawPlanktonStoredIcon(this.planktonStored);
			drawAlgaeStoredIcon(this.algaeStored);
			drawThermometerIcon(this.temperature);
			drawCalciumCarbonateIcon(this.calciumCarbonateStored);
			
			drawDietIcon("filterFeeder");
			drawAttributeIcon1(this.attributeIcon1,"Soft Coral","white");
			drawAttributeIcon2(this.attributeIcon1,"Heat-Resistant Algae","white");
			
			drawUpkeep1Text("Algae Upkeep "+this.algaeUpkeep,"#2CFF05");
			drawUpkeep2Text("Plankton Upkeep "+this.planktonUpkeep,"#FF13F0");
			
			drawStat3Text("Total Ammonia "+this.ammonia.toString());
			drawStat4Text("Pops "+this.popArray.length.toString()+" / "+ this.popLimit.toString());
			//
			drawOutlierIcon(70,250,this.buyYellowTang,"yellow",isBuyButtonHovered1);
			drawOutlierIcon(70,350,this.buyMantisShrimp,"blue",isBuyButtonHovered2);
			
			drawUIOutlinerButtons(outlinerButtonsX,outlinerButtonsY,outlinerButtonWidth,this.buySeahorse,this.img,);
			
			if(UIOutlinerButtonsState==="pop"){
				drawWorkerCards(this,this.size);
			}
			else if(UIOutlinerButtonsState=="growth"){
				drawGrowthProgressBar(this.growth,this.nextLvl,this.growth.toString()+"/"+this.nextLvl.toString());
				drawProductionProgressBar(this.createCalciumCarbonateCounter, this.maxCreateCalciumCarbonateCounter, "LimeStone: "+this.createCalciumCarbonateCounter+"/"+this.maxCreateCalciumCarbonateCounter);
			}
			else if(UIOutlinerButtonsState==="info"){
				drawOutlinerDietIcon("filterFeeder");
				drawOutlinerIcon1(this.attributeIcon1,"Hard Coral","blue");
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
		this.createCalciumCarbonateCounter++;
		this.planktonStored-=this.planktonUpkeep;
		
		this.eatAmmonia();
		this.feedAmmoniaToSeaweed();
		this.feedAmmoniaToSeagrass();
	}
	
	createCalciumCarbonate(){
		if(this.planktonStored>=10){
			let randomXOffset=this.x+Math.random()*180+1
			let calciumCarbonate= new CalciumCarbonate(randomXOffset,this.y+180);
			this.planktonStored-=10;
			this.calciumCarbonateArray.push(calciumCarbonate);
			console.log("CC created CC Arr: ",this.calciumCarbonateArray);
		}else{
			console.log("not enough plankton to create CC!")
		}
	}
	
	
	eatAmmonia(){
		if(this.ammonia>10){
			this.ammonia-=5;
			this.growth++;
		}
	}
	feedAmmoniaToSeaweed() { // I should do this the other way. 
		if (this.ammonia < 75) return;

		getAllActorsInRadius(this, seaweedArray).forEach(seaweed => {
			this.ammonia += seaweed.ammoniaProduction;
			// Find by ID (more reliable than index)
			const original = seaweedArray.find(s => s.id === seaweed.id);
			if (original) original.growth++;
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
			this.width = 150;
			this.height = 150;
			this.img.src="Pics/PlaceMenuIcons/fingerCoralTiny.png"
			this.radius=500;
			this.planktonUpkeep=1;
			this.algaeUpkeep=0;
			this.nextLvl=50;
			this.popLimit=3
			this.createCalciumCarbonateCounter=1;
			this.maxCreateCalciumCarbonateCounter=20;	
		}
		else if(this.size==="small"){
			this.width = 150;
			this.height = 150;
			this.img.src="Pics/PlaceMenuIcons/fingerCoralSmall.png"
			this.radius=750;
			this.planktonUpkeep=1;
			this.algaeUpkeep=0;
			this.nextLvl=50;
			this.popLimit=6
			this.createCalciumCarbonateCounter=1;
			this.maxCreateCalciumCarbonateCounter=20;	
		}
		else if(this.size==="medium"){
			this.width = 200;
			this.height = 200;
			this.img.src="Pics/PlaceMenuIcons/fingerCoral.png"
			this.radius=1000;
			this.planktonUpkeep=2;
			this.algaeUpkeep=0;
			this.nextLvl=150;
			this.popLimit=12;
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

}
