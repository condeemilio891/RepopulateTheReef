class Sponge {
    constructor(x, y, width,height) {
        this.x = x;
        this.y = y;
		this.name="Sponge ";
		

        this.width = width;
        this.height = height;
        this.selected = false;
		this.radius= 1000;
		this.alive=true;


		this.planktonProductionCounter=0;
		this.planktonProductionCounterMax=10;
		this.nextLvl=200;
		this.planktonProduction=5;
		this.ammoniaProduction=-50;
		this.nitrogenProduction=25;
		
		this.beingUsed=false;

		this.attributeIcon1=new Image();
		this.attributeIcon1.src="./Pics/AttributeIcons/mutualismIcon.png";	
		this.attributeIcon2=new Image();
		this.attributeIcon2.src="./Pics/AttributeIcons/nutrientRecyclingIcon.png"
		
		//rehydrate
		this.plankton=2000;
		this.growth=100;
		this.health=100;
		this.nitrogen=2000;
		this.ammonia=1000;
		
		
		//animations
		this.currentFrame = 0;
		this.frameCounter = 0;
		this.animationSpeed =15; // Higher = slower animation
    }

    draw() {
		if(this.plankton>0){
			let imgToDraw =spongeImgArray[0];	
            //canvasContext.drawImage(imgToDraw, this.x, this.y, this.width, this.height);
        // Draw Outline if Selected
			if (this.selected){     
				actorSelected=this;
				drawBorder(actorSelected,performance.now() * 0.001);
				selectText="Sponge";
				drawSelectedActorProfilePic(imgToDraw);
				drawHealthIcon(this.health);
				drawPlanktonStoredIcon(this.plankton);
				//stats 
				drawAttributeIcon1(this.attributeIcon2,"Conveerts Ammonia To Nitrogen","white");
				drawAttributeIcon2(this.attributeIcon2, "Attracts Plankton", "white");
				drawAttributeIcon3(this.attributeIcon2, "Reduces Ammonia", "white");
				drawDietIcon("filterFeeder");
				
				drawStat1Text("Nitrogen "+this.nitrogen.toString());
				drawStat2Text("Ammonia "+this.ammonia.toString());
				
				this.createRadiusDebug();
				//buttons
				drawUIOutlinerButtons(outlinerButtonsX,outlinerButtonsY,outlinerButtonWidth,this.attributeIcon1,this.attributeIcon1);
				
				if(UIOutlinerButtonsState==="pop"){
					//drawWorkerCards(this);
				}
				else if(UIOutlinerButtonsState=="growth"){
					drawGrowthProgressBar(this.growth,this.nextLvl,this.growth.toString()+"/"+this.nextLvl.toString());
					drawProductionProgressBar(this.planktonProductionCounter, this.planktonProductionCounterMax, "Plankton Production: "+this.planktonProductionCounter+"/"+this.planktonProductionCounterMax);
				}
				else if(UIOutlinerButtonsState==="info"){
					drawOutlinerDietIcon("filterFeeder");
					drawOutlinerIcon1(this.attributeIcon1,"Converts Ammonia To Nitrogen","black");
					drawOutlinerIcon2(this.attributeIcon2,"Attracts Plankton","black");
					drawOutlinerIcon3(this.attributeIcon2,"Produces Ammonia","black");
					drawOutlinerIcon4(this.attributeIcon2,"Fertilizes with Nitrogen", "black");
				}
			}
		}else{
			this.alive=false;
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
	
	
	live(){
		
		
		
		if(this.ammonia>400){
			this.ammonia-=10
			this.nitrogen+=5;
		}else{
			this.ammonia+=5;
		}
		if(this.planktonProductionCounter===this.planktonProductionCounterMax){
			this.plankton+=this.planktonProduction;
			this.planktonProductionCounter=0;
			
		}
		this.feedAmmoniaToSeagrass();
		this.feedNitrogenToSeagrass();
		this.feedAmmoniaToSeaweed();
		this.feedNitrogenToSeaweed();
		this.planktonProductionCounter++;
	}
	
	feedAmmoniaToSeagrass() { 
		if (this.ammonia < 100) return;
		getAllActorsInRadius(this, seagrassArray).forEach(seagrass => {
			this.ammonia -= 2;
			seagrass.ammonia+=2;
		});
	}
	feedNitrogenToSeagrass(){
		if(this.nitrogen<100) return;
		getAllActorsInRadius(this,seagrassArray).forEach(seagrass=>{
			this.nitrogen-=2;
			seagrass.nitrogen+=2;
		})
	}
		feedAmmoniaToSeaweed() { 
		if (this.ammonia < 100) return;
		getAllActorsInRadius(this, seaweedArray).forEach(seaweed => {
			this.ammonia -= 2;
			seaweed.ammonia+=2;
		});
	}
	feedNitrogenToSeaweed(){
		if(this.nitrogen<100) return;
		getAllActorsInRadius(this,seaweedArray).forEach(seaweed=>{
			this.nitrogen-=2;
			seaweed.nitrogen+=2;
		})
	}
	consumePlankton(){
		this.plankton-=10// gather rate for fish
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