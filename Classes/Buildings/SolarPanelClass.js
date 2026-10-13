class SolarPanel {
    constructor(x, y) {
        this.x = x;
        this.y = y;
		this.name="Solar Panel ";
		

        this.width = 200;
        this.height = 300;
        this.selected = false;
		this.radius= 350;
		this.powerProduction=5;
		this.totalGridPower=0;
		

		this.attributeIcon1=new Image();
		this.attributeIcon1.src="./Pics/AttributeIcons/mutualismIcon.png";	
		this.attributeIcon2=new Image();
		this.attributeIcon2.src="./Pics/AttributeIcons/nutrientRecyclingIcon.png"
		
		
		
		//animations
		this.currentFrame = 0;
		this.frameCounter = 0;
		this.animationSpeed =3; // Higher = slower animation
    }

    draw() {
			let imgToDraw =solarPanelImage;	
            canvasContext.drawImage(imgToDraw, this.x, this.y, this.width, this.height);
        // Draw Outline if Selected
			if (this.selected){     
				actorSelected=this;
				//drawBorder(actorSelected,performance.now() * 0.001);
				selectText="Solar Panel";
				drawSelectedActorProfilePic(imgToDraw);
				this.createRadiusDebug();
				
				drawStat1Text("Power Production "+this.powerProduction);
				drawStat2Text("Total Grid Power " +this.totalGridPower);
				//drawStat3Text("Toxin Res -50%");
				//drawStat4Text("Ammonia "+this.ammoniaProduction.toString())
				
				drawOutlinerIcon1(this.attributeIcon2,"Only Collects Energy During Daytime \nDoesn't Work During Algae Blooms","#550000");
				//drawOutlinerIcon2(this.attributeIcon1,"Crush Rocks: Collects Limestone from\nRocks Brings Them Back to Coral","#550000");
				///drawOutlinerIcon3(this.attributeIcon2,"Nomad: Stores Resources in Any Coral\nCan Hide in Any Coral","#550000");
				//drawOutlinerIcon4(this.attributeIcon2,"Gathers at Sponge, Seaweed, Seagrass","#550000");

			}
	}
    
	
	createRadiusDebug() {
		canvasContext.save();
		canvasContext.globalAlpha = 0.15;    // Set global alpha for reduced opacity
		canvasContext.beginPath();
		canvasContext.arc(this.x +this.width/2, this.y+this.height/2, this.radius, 0, 2 * Math.PI);
		canvasContext.fillStyle="yellow"
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