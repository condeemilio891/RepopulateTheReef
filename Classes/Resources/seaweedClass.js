class Seaweed {
    constructor(x, y, width,height) {
        this.id=seaweedArray.length;
		this.x = x;
        this.y = y;
		this.name="Seaweed";
        this.width = width;
        this.height = height;
        this.flipped = false;
        this.state = "stop"; 
        this.selected = false;
		this.photosynthesizing=true;
		this.currStateText="";
		this.isDying=false;
		this.isFertilized=false;
		
		this.alive=true;
		this.beingUsed=false;
		
		this.health=100;// rehydrate this 

		this.algaeProduction=2;
		this.planktonProduction=2;
		this.algaeCapacity=2000;
		this.planktonCapacity=1000;

		this.planktonProductionCounter=0;
		this.planktonProductionCounterMax=30;

		this.nextLvl=200;
		
		// rehydrate;
		this.algae=1000;
		this.plankton=400;
		this.growth=50;
		this.nitrogen=0;
		this.ammonia=0;

		//attributes 
		this.attributeIcon1=new Image();
		this.attributeIcon1.src="./Pics/AttributeIcons/nutrientRecyclingIcon.png";
		//animations
		this.currentFrame = 0;
		this.frameCounter = 0;
		this.animationSpeed = Math.floor(Math.random() * (20 + 1)) + 10;; // Higher = slower animation
    }

    draw() {

		if(this.algae>0){
			let imgToDraw = seaweedImgArray[0];
		
            //canvasContext.drawImage(imgToDraw, this.x, this.y, this.width, this.height);

        // Draw Outline if Selected
			if (this.selected){
				
				actorSelected=this;
				drawBorder(actorSelected,performance.now() * 0.001);
				selectText="SeaWeed "+this.id.toString();
				drawSelectedActorProfilePic(imgToDraw);
				drawAlgaeStoredIcon(this.algae);
				drawPlanktonStoredIcon(this.plankton);
				drawCurrStateText(this.currStateText);
				//stats
				drawDietIcon("producer");
				drawAttributeIcon1(this.attributeIcon1,"Ammonia Uptake","white");
				drawAttributeIcon2(this.attributeIcon1, "Nitrogen Uptake","white");
				
				
				
				
				
				drawUpkeep1Text("Algae Production "+this.algaeProduction.toString(),"#2CFF05");
				drawUpkeep2Text("Plankton ↑ "+this.planktonProduction.toString(),"#FF13F0");
				
				drawStat1Text("Algae Cap "+this.algaeCapacity.toString());
				drawStat2Text("Plankton Cap "+this.planktonCapacity.toString());		
				drawStat3Text("Nitrogen ← "+Math.abs(this.nitrogen).toString());
				drawStat4Text("Ammonia ← "+Math.abs(this.ammonia).toString());
				// 
				drawUIOutlinerButtons(outlinerButtonsX,outlinerButtonsY,outlinerButtonWidth,this.attributeIcon1,this.attributeIcon1);
				
				if(UIOutlinerButtonsState==="pop"){
					//drawWorkerCards(this);
				}
				else if(UIOutlinerButtonsState=="growth"){
					drawGrowthProgressBar(this.growth,this.nextLvl,this.growth.toString()+"/"+this.nextLvl.toString());
					drawProductionProgressBar(this.planktonProductionCounter, this.planktonProductionCounterMax, "Plankton Production: "+this.planktonProductionCounter+"/"+this.planktonProductionCounterMax);					
				}
				else if(UIOutlinerButtonsState==="info"){
					drawOutlinerDietIcon("producer");
					drawOutlinerIcon1(this.attributeIcon1,"Converts Ammonia to Tissue","black");
					drawOutlinerIcon2(this.attributeIcon1,"Plankton Breeding Grounds","black");
					drawOutlinerIcon3(this.attributeIcon1,"Nitrogen Boosts Plankton Production","black");
					drawOutlinerIcon4(this.attributeIcon1,"Exceeding Cap is Toxic","black");
				}
				
				
			}
		}else{
			this.alive=false;
		}
    }
	
	consumeAlgae(actor){
		this.algae-=actor.gatherRate;
	}
	consumePlankton(actor){
		this.plankton-=actor.gatherRate;
	}
	live(){
		this.grow();
		this.producePlankton();
		this.produceAmmonia()


	}
	producePlankton(){
		
		if(this.planktonProductionCounter>=this.planktonProductionCounterMax){
			
			if(this.algae>this.plankton){
				
				this.algae-=Math.floor(this.plankton/2)
				this.planktonProduction=40
			
			}else{
				this.planktonProduction=0;
				
			}
			
			this.plankton+=this.planktonProduction;
			this.planktonProductionCounter=0;
			
		}
		this.planktonProductionCounter++;

	}
	produceAmmonia(){
		if(this.plankton>this.planktonCapacity){
			this.ammonia+=5;
			this.algae-=5;
			this.health-=0.25;
			this.currStateText="Toxic Ammonia Levels";
			this.isDying=true;
			return
		}else if(this.plankton>this.planktonCapacity/2){
			this.ammonia+=2
		}else if(this.plankton>this.planktonCapacity/4){
			this.ammonia+=1;
		}
		this.isDying=false
	}
	grow(){
		
		if(this.algae>this.algaeCapacity){
			this.photosynthesizing=false;
			this.currStateText="Toxic Algae levels can't Photosythesize"
			this.isDying=true;
		}else{
			this.currStateText="PhotoSynthesis"
			this.photosynthesizing=true;
			this.isDying=false;
		}
		
		if(!this.photosynthesizing){
			this.currStateText="Toxic Algae Levels"
			this.algae++;
			this.health-=.25;
			return
		}
		if(this.ammonia>10 && this.nitrogen>10 ){
			this.nitrogen--;
			this.growth++;
			this.planktonProductionCounter++
			this.algaeProduction=10
			this.currStateText="Nitrogen Boost"
			this.isFertilized=true;
		}
		else if(this.ammonia>10){
			this.ammonia--;
			this.growth++;
			this.algaeProduction=4;
			this.isFertilized=true;
		}else{
			this.algaeProduction=1;
			this.currStateText="Not fertilized";
			this.isFertilized=false;
		}

		this.algae+=this.algaeProduction;
	}
		 // loading and saving
	toData() {
		return{
			x:this.x,
			y:this.y,
			width: this.width,
			height: this.height,
			algae:this.algae,
			plankton:this.plankton,
			nitrogen:this.nitrogen,
			ammonia: this.ammonia,
			growth:this.growth,
			planktonProductionCounter:this.planktonProductionCounter,
		}
	}
	
    static fromData(data) {
		const newSeaweed = new Seaweed(data.x, data.y,data.width,data.height);
		newSeaweed.algae=data.algae;
		newSeaweed.plankton=data.plankton;
		newSeaweed.nitrogen=data.nitrogen;
		newSeaweed.ammonia.ammonia;
		newSeaweed.growth=data.growth;
		newSeaweed.planktonProduction=data.planktonProductionCounter;
		return newSeaweed;
		
	}

}