class SandBattery{
    constructor(x, y) {
        this.x = x;
        this.y = y;
		this.name="SandBattery ";
		

        this.width = 200;
        this.height = 200;
        this.selected = false;
		this.radius= 350;
		this.powerStored=5;
		this.powerCap=10000;
		
		

		this.attributeIcon1=new Image();
		this.attributeIcon1.src="./Pics/AttributeIcons/mutualismIcon.png";	
		this.attributeIcon2=new Image();
		this.attributeIcon2.src="./Pics/AttributeIcons/nutrientRecyclingIcon.png"
		
		
		
		//animations
		this.currentFrame = 0;
		this.frameCounter = 0;
		this.animationSpeed =10; // Higher = slower animation
    }

    draw() {
			
			let imgToDraw =sandBatteryImgArray[this.currentFrame];	
            canvasContext.drawImage(imgToDraw, this.x, this.y, this.width, this.height);
        // Draw Outline if Selected
			if (this.selected){     
				actorSelected=this;
				//drawBorder(actorSelected,performance.now() * 0.001);
				selectText="Sand Battery";
				drawSelectedActorProfilePic(imgToDraw);
				this.createRadiusDebug();
				
				drawStat1Text("Power Stored "+this.powerStored);
				drawStat2Text("Power Cap "+ this.powerCap);
				//drawStat3Text("Toxin Res -50%");
				//drawStat4Text("Ammonia "+this.ammoniaProduction.toString())
				
				
				
				drawOutlinerIcon1(this.attributeIcon2,"Stores Power by Heating Sand","#550000");
				drawOutlinerIcon2(this.attributeIcon1,"Malfunction heats water around it","#550000");
				///drawOutlinerIcon3(this.attributeIcon2,"Nomad: Stores Resources in Any Coral\nCan Hide in Any Coral","#550000");
				//drawOutlinerIcon4(this.attributeIcon2,"Gathers at Sponge, Seaweed, Seagrass","#550000");
				
			}
	}
    
	acumulatePower(){
		
		if(this.powerStored>=this.powerCap) return;
		//if another SolarPanel or Tidemill is within the this.radius
		// add this.powerProductrtion to this.TotalGridPower
		// the others should reflect as well 
		
		const tidemillsInRadius=getAllActorsInRadius(this,tidemillArray);
		const solarPanelsInRadius=getAllActorsInRadius(this,solarPanelArray);
		
		let energyBuildingsInRadius=[...tidemillsInRadius,...solarPanelsInRadius];
		
		if(energyBuildingsInRadius.length===0) return; 
		
		let energyBuilding=energyBuildingsInRadius[0]
		
		this.powerStored+=energyBuilding.totalGridPower;

	}
	
	createRadiusDebug() {
		canvasContext.save();
		canvasContext.globalAlpha = 0.15;    // Set global alpha for reduced opacity
		canvasContext.beginPath();
		canvasContext.arc(this.x +this.width/2, this.y+this.height/2, this.radius, 0, 2 * Math.PI);
		canvasContext.fillStyle="green"
		canvasContext.fill();
		canvasContext.globalAlpha = 1;
		canvasContext.stroke();
		canvasContext.restore();
	}
	
	

	
		 // loading and saving
	toData() {
		return{
			x:this.x,
			y:this.y,
			width: this.width,
			height: this.height,
			health:this.health,
			plankton:this.plankton,
			nitrogen:this.nitrogen,
			ammonia:this.ammonia,
			growth:this.growth,
			planktonProductionCounter:this.planktonProductionCounter
		}
	}
	
    static fromData(data) {
		const newSponge = new Sponge(data.x, data.y,data.width,data.height);
		newSponge.health=data.health;
		newSponge.plankton=data.plankton;
		newSponge.nitrogen=data.nitrogen;
		newSponge.ammonia=data.ammonia;
		newSponge.growth=data.growth;
		newSponge.planktonProductionCounter=data.planktonProductionCounter;
		return newSponge;
		
	}	
	
}