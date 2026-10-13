class HermitCrab {
    constructor(x, y) {
        this.id=0;
		this.spawnPointX=x;
		this.spawnPointY=y;
		this.x = x;
        this.y = y;
		this.rotation=0;
        this.speedX = 2;
        this.speedY = 2;
		this.maxSpeedX=2.8;
		this.maxSpeedY=2.5;
		this.radius=200;
		this.name="Hermit Crab"
		this.diet="filterfeeder"// though we are tier 2 so eat more??? 

		this.img = new Image();
        this.img.src = "SpriteSheets/HermitCrab/idle/hermitCrabIdle5.png";
        
		this.targetX = 0; 
        this.targetY = 0;
        this.distanceToTarget = 0;
        this.unitVectorX = 0;
        this.unitVectorY = 0;
      

        this.width = 175;
        this.height =175;
        this.flipped = false;
        this.state = "autoPilot";  
		this.currStateText="";
		this.selected=false;
		this.multipleSelected=false // do we need for this class
		
        this.hasAlgae = false;
		this.hasPlankton=false;
		this.isGathering=false; 
		this.currGatheringActor=null;
		this.isPickUpAnemoneActive=false;
		this.isPickUpAnemoneActive=false;
		this.isPlacingAnemone=false;

		this.type="HermitCrab"// saving
		
		// rehydrate
		this.health=100;
		this.hunger=55;
		this.stamina = 200;
		this.toxinRes=.5;
		
		
		this.ammonia=3;
		this.nitrogen=0;
		
		
		this.defence=5;
		this.ammoniaProduction=4;
		
		this.isAttackingActive=false;
		this.attackTarget=null;
		
		//attributes
		this.attributeIcon1=new Image();
		this.attributeIcon1.src="./Pics/AttributeIcons/clownfishAttribute1.png";
		this.attributeIcon2=new Image();
		this.attributeIcon2.src="./Pics/AttributeIcons/clownfishAttribute2.png";
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
		this.portrait.src="SpriteSheets/HermitCrab/idle/hermitCrabIdle0.png";
		
		this.buyClownfish=new Image(); 
		this.buyClownfish.src="Pics/clownfishIso.jpg";
		//this.home=home;
		// blank img hidden 
		this.isHidden=false;
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

	//PIXI REFACTOR 
		this.pixiSprite = new PIXI.Sprite(hermitCrabIdleTextures[0]);
        
        // Center the anchor (matches your canvas translate(centerX, centerY))
        this.pixiSprite.anchor.set(0.5, 0.5);
        
        // Set initial size (match your canvas width/height)
        this.pixiSprite.width = this.width;
        this.pixiSprite.height = this.height;
		
		pixiWorld.addChild(this.pixiSprite);
		
    }
	
	initBehaviorTree() {
		  // 1. Tasks 
		    
		  const consumeCarcassActions = new Sequence([
			new FindCarcass(),
			new MoveToCarcass(),
			new GatherPlanktonFromCarcassAnim(),
			new ReturnHomeGatherPlankton()
			
		    ]);
			const pickUpAnemone = new Sequence([
				new AnemoneSelectedCondition(),
				new FindAnemone(),
				new MoveToAnemone(),
				new PickUpAnemoneAnim()
		
		]);		
			const putDownAnemone = new Sequence([
				new AnemoneBeingPlacedCondition(),
				new OverLimestoneCondition(),
				new EnoughCoralCapacityCondition,
				new PutDownAnemoneAnim()
		
		]);			

		  // 3. Tree Structure 
		  const root = new Selector([
			pickUpAnemone,
			putDownAnemone
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
		
		      // Draw Outline if Selected
        if (this.selected) {
			actorSelected=this;
			drawBorder(actorSelected,performance.now() * 0.001)
			
			
			selectText="Hermit Crab";
			drawSelectedActorProfilePic(this.portrait);
			drawCurrStateText(this.currStateText);
			drawHealthIcon(this.health);
			drawHungerIcon(this.hunger);

			//infobox 
			drawDietIcon("filterFeeder");
			drawAttributeIcon1(this.attributeIcon1,"Communication","white");
			drawAttributeIcon2(this.attributeIcon2,"Mucus Coating","white");
			

			drawStat1Text("Dmg WE dont attack");
			drawStat2Text("Toxin Res -50%");
			drawStat3Text("Ammonia "+this.ammoniaProduction.toString())
			drawStat4Text("NO POPS MOVE TO ANEMONE");
			
			//commands
			drawDetachAnemone();
			drawPickUpAnemone();
			
	
				drawOutlinerDietIcon("filterFeeder");
				drawOutlinerIcon1(this.attributeIcon2,"Anemone Host: Can use Tiny Anemone\nFor Defense");
				drawOutlinerIcon2(this.attributeIcon1,"Clownfish Controller: Carries anemone\non Back Clownfish Follow","#550000");
				drawOutlinerIcon3(this.attributeIcon2,"Camo: Can Hide In Shell.","#550000");
				drawOutlinerIcon4(this.attributeIcon2,"");
				
			

		}
    }
	// Inside your HermitCrab class, or in your main update function:
   updatePixiCrab() {
    // 1. Update the frame index (using YOUR EXISTING logic!)
    if (this.isDying) {
        // Handle death animation if you move that to Pixi later
        // For now, just freeze or skip.
        return;
    }

    // Your exact speed logic
    if (this.isMoving) {
        this.animationSpeed = 15;
        // Loop through walk frames
        if (this.frameCounter > this.animationSpeed) {
            this.currentFrame = (this.currentFrame + 1) % hermitCrabWalkTextures.length;
            this.frameCounter = 0;
        } else {
            this.frameCounter++;
        }
        // Apply the walk texture
        this.pixiSprite.texture = hermitCrabWalkTextures[this.currentFrame];
		 this.portrait= hermitCrabWalkImgArray[this.currentFrame]
        
    } else {
        // Idle state 
        //this.animationSpeed = 70;
        // IMPORTANT: IDLE IS HARDCODE FOR 4 change to loop anim
        this.pixiSprite.texture = hermitCrabIdleTextures[4];
        
        // add a looping idle 
/*         if (this.frameCounter > this.animationSpeed) {
            this.currentFrame = (this.currentFrame + 1) % hermitCrabIdleTextures.length;
            this.frameCounter = 0;
        } else {
            this.frameCounter++;
        } */
        //this.pixiSprite.texture = hermitCrabIdleTextures[this.currentFrame];
    }

    // 2. Update POSITION (center-based, matching your canvas translation)
    this.pixiSprite.x = this.x + this.width / 2;
    this.pixiSprite.y = this.y + this.height / 2;

	// 3. Update FLIP (Preserves the 175x175 size!)
	// Store the absolute scale (positive number) so we don't lose the sizing
	const absScaleX = Math.abs(this.pixiSprite.scale.x);
	const absScaleY = Math.abs(this.pixiSprite.scale.y);

	// Apply flip to X, keep Y the same
	this.pixiSprite.scale.x = absScaleX * (this.flipped ? -1 : 1);
	this.pixiSprite.scale.y = absScaleY; // Y never flips, just stays positive

    // 4. (Optional) If you use rotation:
		//this.pixiSprite.rotation = this.rotation * Math.PI / 180;
	}
		

	//state Machine
    findState() {
        switch (this.state) {
			case "autoPilot":
				// BT run 
				//console.log(this.autoPilotTree)
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
	live(){

		this.eatPlankton();

		if(this.health<=0){
			this.isAlive=false;
		}
	}

	eatPlankton(){
		if(this.planktonStored>10){
			this.planktonStored-=3;
			this.anemoneGrowth+=2;
		}
	}
	produceAmmonia(){
		console.log("crab class produce todo")
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
		this.animationSpeed=10;
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
