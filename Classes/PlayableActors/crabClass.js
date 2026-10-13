class Crab {
    constructor(x, y) {
        this.id=0;
		this.spawnPointX=x;
		this.spawnPointY=y;
		this.x = x;
        this.y = y;
		this.rotation=0;
        this.speedX = 2;
        this.speedY = 2;
		this.maxSpeedX=2.3;
		this.maxSpeedY=2.2;
		this.radius=200;
		this.name="Crab "
		this.diet="filterfeeder"// though we are tier 2 so eat more??? 

		this.img = crabImage;
        this.img.src = "SpriteSheets/Crab/idle/crabIdle0.png";
        
		this.targetX = 0; 
        this.targetY = 0;
        this.distanceToTarget = 0;
        this.unitVectorX = 0;
        this.unitVectorY = 0;
      

        this.width = 125;
        this.height =125;
        this.flipped = false;
        this.state = "autoPilot";  
		this.currStateText="";
		this.selected=false;
		this.multipleSelected=false // do we need for this class
		
        this.hasAlgae = false;
		this.hasPlankton=false;
		this.isGathering=false; 
		this.currGatheringActor=null;
		this.isGatherActive=false;

		this.type="Crab"// saving
		
		// rehydrate
		this.health=100;
		this.hunger=55;
		this.stamina = 200;
		this.algae=0;
		this.plankton=0;
		this.algaeCap=30;
		this.planktonCap=30;
		this.toxinRes=.5;
		
		
		
		this.gatherRate=5;
		this.carryingCapacity=10;
		this.attackDmg=10;
		this.defence=5;
		this.ammoniaProduction=4;
		
		this.isAttackingActive=false;
		this.attackTarget=null;
		
		//attributes
		this.attributeIcon1=new Image();
		this.attributeIcon1.src="./Pics/AttributeIcons/clownfishAttribute1.png";
		this.attributeIcon2=new Image();
		this.attributeIcon2.src="./Pics/AttributeIcons/CrabAttribute2.png";
		this.attributeIcon3=new Image();
		this.attributeIcon3.src="./Pics/AttributeIcons/heatResistantIcon.png";
		this.attributeIcon4=new Image();
		this.attributeIcon4.src="./Pics/AttributeIcons/CrabAttribute1.png";
		// animations
		this.isMoving=false;
		this.isEating=false;
		this.isResting=false;
		this.isAlive=true;
		this.isDying=false;
		this.isAttacking=false;
		this.isGathering=false;
		this.eatTime=500;
		this.restTime=5000;
		this.gatherTime=300;
		this.currentFrame = 0;
		this.frameCounter = 0;
		this.animationSpeed = 20; // Higher = slower animation
		//portrait 
		this.portrait=new Image(); 
		this.portrait.src="SpriteSheets/Crab/idle/crabIdle0.png";
		//this.home=home;
		// blank img hidden 
		this.isHidden=false;
		this.calciumCarbonateArray=[];
		//AI
		this.isAutoPilotActive=true;
		this.autoPilotTree=null;
		this.blackboard={
			actor:this,
			targetSeaweed:null,
			targetPosition:null,
			targetCoral:null,
			rotation:null,
			currStateText:null,
		};
		this.initBehaviorTree(); // start running the behvior tree. 
    }
		initBehaviorTree() {
		  // 1. Tasks 
		   
			
		const attackActions = new Selector([
			
				new Sequence([
					new HasAttackTargetCondition(),
					new MoveAndRotateToAttackTargetAction(),
					new AttackTargetAnim() 
				]),
				
				new Sequence([
					new DetectEnemy()			
				])
		]);
		const gatherRocks = new Sequence([
				new RocksSelectedCondition(),
				new FindRocks(),
				new MoveToRocks(),
				new GatherLimestoneFromRocksAnim(),
		
		]);
		const returnRocks = new Sequence([
				new CoralSelectedCondition(),
				new LocateHardCoral(),
				new MoveToCoral(),
			
		
		]);
		const gatherFromSeaweed = new Sequence([
				new SeaweedSelectedCondition(),
				new MoveToSeaweed(),
				new GatherFromSeaweedAnim()
				
		])
		const gatherFromSeagrass = new Sequence([
				new SeagrassSelectedCondition(),
				new MoveToSeagrass(),
				new GatherFromSeagrassAnim(),
		])
		const returnResources = new Sequence([
			new CoralSelectedCondition(),
			new LocateHardCoral(),
			new MoveToCoral(),
			new Selector([           
				new UnloadAlgaeAnim(),
				new UnloadPlanktonAnim(),
				new UnloadRocksAnim()
			])
		]);

		  const wanderActions = new Sequence([
			new FindRandomLocationAction(),
			new MoveAndRotateToLocationAction()
		  ]);
		  
		  const consumeCarcassActions = new Sequence([
			new FindCarcass(),
			new MoveToCarcass(),
			new GatherPlanktonFromCarcassAnim(),
			new ReturnHomeGatherPlankton()
			
		    ]);

		  // 3. Tree Structure 
		  const root = new Selector([
		  	attackActions,
			gatherRocks,
			gatherFromSeaweed,
			gatherFromSeagrass,
			returnResources,
			
			
			//consumeCarcassActions,
			//wanderActions       // Fallback to wandering
		  ]);

		  // 4. Create tree 
		  this.autoPilotTree = new BehaviorTree(
			root, 
			this.blackboard
		  );
		}
				
	//RENDER!!! 
    draw() {
		
		canvasContext.save();

		let imgToDraw = this.portrait;

		if (this.isDying) {
			// Dying animation – plays fully even if moving or idle
			imgToDraw = crabDeathImgArray[this.currentFrame];
			// When last frame reached, mark as dead but stop moving the frame index
			if (this.currentFrame === crabDeathImgArray.length - 1) {
				this.isDying = false;
				this.isAlive = false;
				// Optionally freeze on last frame
			}
		} 
		else if (!this.isAlive) {
			// Dead – just show the last death frame
			imgToDraw = crabDeathImgArray[crabDeathImgArray.length - 1];
			this.currStateText = "Dead";
			this.state = "dead";
		}
		else if (this.isMoving) {
			this.isGathering=false;
			this.animationSpeed=7;
			imgToDraw = crabWalkImgArray[this.currentFrame];
		}
		else if (this.isAttacking||this.isGathering){
			this.animationSpeed=4;
			imgToDraw= crabAttackImgArray[this.currentFrame];
		}
		else { // not moving, alive, not dying
			this.animationSpeed=20;
			imgToDraw = crabIdleImgArray[this.currentFrame];
		}
/* 		if (this.hasAlgae) {
			imgToDraw = this.portrait;
		}
		else if (this.hasPlankton) {
			imgToDraw = this.portrait;
		}
		else if (this.isEating){ // refactor to draw plankton if carring plankton 
			imgToDraw=this.portrait;
		}
		else if(this.isResting){
			imgToDraw=this.blankImg;
		}else if(this.isHidden){
			imgToDraw=this.blankImg;
		} */

		const centerX = this.x + this.width/2;
		const centerY = this.y + this.height/2;

		canvasContext.translate(centerX, centerY);
		
		// Apply flip before rotation
		if (this.flipped) {
			canvasContext.scale(-1, 1);
		}
		
		// no rotate for crab
		//canvasContext.rotate(this.rotation * Math.PI / 180);

		// Draw centered image
			this.portrait=imgToDraw
			canvasContext.drawImage(
					imgToDraw,
					-this.width/2,
					-this.height/2,
					this.width,
					this.height
				);



		canvasContext.restore();
		      // Draw Outline if Selected
        if (this.selected) {
			actorSelected=this;
			drawBorder(actorSelected,performance.now() * 0.001)
			
			
					selectText="Crab "+this.id.toString();
					drawSelectedActorProfilePic(this.portrait);
					drawCurrStateText(this.currStateText);
					drawHealthIcon(this.health);
					drawHungerIcon(this.hunger);
					drawStaminaIcon(this.stamina);
					//infobox 
					drawDietIcon("filterFeeder");
					drawAttributeIcon1(this.attributeIcon1,"Communication","white");
					drawAttributeIcon2(this.attributeIcon2,"Mucus Coating","white");
					
					drawUpkeep1Text("Algae "+this.algae+"/"+this.algaeCap,"#0BDA51");
					drawUpkeep2Text("Plankton "+this.plankton+"/"+this.planktonCap,"#FF13F0");
					drawUpkeep3Text("Limestone "+this.calciumCarbonateArray.length+"/"+this.carryingCapacity,"#FFF1E7");
					
					
					drawStat1Text("Gather Rate "+this.gatherRate.toString());
					drawStat2Text("Attack Dmg "+ this.attackDmg.toString());
					drawStat3Text("Toxin Res -50%");
					drawStat4Text("Ammonia "+this.ammoniaProduction.toString())

					//draw command UI icons
					drawGatherResources();
					drawGatherRocks();
					drawAttackUIIcon();
					//drawCallSchoolUI();
					//drawAutoPilotUI();
					
					//info 
					drawOutlinerDietIcon("filterFeeder");
					drawOutlinerIcon1(this.attributeIcon2,"Mucus Coating: Nematocysts (Jellyfish)\nResistance +50% Can Hide in Anemone","#550000");
					drawOutlinerIcon2(this.attributeIcon1,"Crush Rocks: Collects Limestone from\nRocks Brings Them Back to Coral","#550000");
					drawOutlinerIcon3(this.attributeIcon3,"Nomad: Stores Resources in Any Coral\nCan Hide in Any Coral","#550000");
					drawOutlinerIcon4(this.attributeIcon4,"Gathers at Sponge, Seaweed, Seagrass","#550000");
				
				
			}
			
        }
		

	//state Machine
    findState() {
        switch (this.state) {
			case "autoPilot":
				  this.autoPilotTree.update();
				  
				  break;
			case "reset": 
				//reset tree 
				this.autoPilotTree.root.reset();
				console.log("tree Reset");
				this.state="autoPilot";
				break
			case "move":
				this.currStateText="Moving To Position";
				this.autoPilotTree.root.reset();
				this.moveTo();
				break;
            case "stop":
				this.currStateText="Stopped";
                this.stop();
                break;
			case "death":
				break;
			
        }
    }
	
	produceAmmonia(){
		console.log("PUT PRODUCE AMMONIA IN CRAB")
	}
	applyDamage(enemy){
		if(enemy.health<=0){
			this.attackTarget=null;
			this.state="autoPilot";
			return;
		}
		enemy.health-=this.attackDmg;
		enemy.attackTarget=this;
		console.log("damage applied to ", this.attackTarget);
	}
	
	handleDeath(){
		if(this.isDying||!this.isAlive){
			return
		}
		if(this.health<=0){
			this.health=0// clamp baby
			this.isDying=true;
		}
	}

    stop() {
		this.isMoving=false;
        this.speedX=0;
		this.speedY=0;
		
	
    }
	handleHunger(){
		this.hunger-=0;
	}
	

    rest() {
        this.speedX = 0;
        this.speedY = 0;

        if (this.stamina >= 500) {
            this.stamina = 1000;
            this.state = "gatherSeaweed";
            console.log("Fish is swimming again!");
        }
    }

    moveTo() {
		this.animationSpeed=7;
		this.isMoving=true;
		moveToClickedPosition(this,this.targetX,this.targetY);
    }
	
	
	
			//Save And Load
	toData() {
		return{
			type:this.type,
			x:this.x,
			y:this.y,
			health:this.health,
			hunger:this.hunger,
			//currGatheringActor:this.currGatheringActor, // creates a circ ref!!
			algae:this.algae,
			plankton:this.plankton,
			algaeCap:this.algaeCap,
			planktonCap:this.planktonCap,
			calciumCarbonateData: this.calciumCarbonateArray.map(cc => ({
				x: cc.x,
				y: cc.y
			}))
		}
	}
	
    static fromData(data,home) {
		const newPlayableChar = new Crab(data.x, data.y);
		newPlayableChar.type=data.type;
		newPlayableChar.health=data.health;
		newPlayableChar.hunger=data.hunger;
		newPlayableChar.algae=data.algae;
		newPlayableChar.plankton=data.plankton;
		newPlayableChar.algaeCap=data.algaeCap;
		newPlayableChar.planktonCap=data.planktonCap;
		newPlayableChar.state="reset";
		    // Reconstruct the calcium carbonate array from saved data
		if (data.calciumCarbonateData && Array.isArray(data.calciumCarbonateData)) {
			newPlayableChar.calciumCarbonateArray = data.calciumCarbonateData.map(ccData => 
				new CalciumCarbonate(ccData.x, ccData.y)
			);
		} else {
			newPlayableChar.calciumCarbonateArray = [];
		}
		
		return newPlayableChar;
		
	}	

}
