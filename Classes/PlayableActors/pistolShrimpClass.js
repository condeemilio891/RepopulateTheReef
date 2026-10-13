class PistolShrimp {
    constructor(x, y,home) {
		this.id = home.popArray.length;
        this.x = x;
        this.y = y;
		this.rotation=0;
        this.speedX = 3;
        this.speedY = 3;
		this.maxSpeedX=3;
		this.maxSpeedY=3;
		this.radius= 1500;
		this.name="Pistol Shrimp "+this.id;
		this.diet="carnivore"
		
		
        
		this.targetX = 0;
        this.targetY = 0;
        this.distanceToTarget = 0;
        this.unitVectorX = 0;
        this.unitVectorY = 0;
       
		this.resourceI=0;

        this.width = 100;
        this.height = 100;
        this.flipped = false;
        this.state = "autoPilot";  
		this.currStateText="";
		this.selected=false;	

		this.isCurrGathering=false; 
		this.currGatheringActor=null;
		this.attackTarget=null;
		
	

		this.type="PistolShrimp";
		this.home=home;
		this.isAlive=true;
		this.gatherRate=10;
		this.attackDmg=10;
		this.defence=20;
		this.ammoniaProduction=5;
		
		
		this.health=180;		
		this.hunger=100;
		this.stamina = 1000;		
		
		// animations
		this.isEating=false;
		this.isResting=false;
		this.isHiding=false;
		this.isCollectingCalciumCarbonateAnim=false;
		this.isDying=false;
        this.hasPlankton = false;
		this.hasCalciumCarbonate=false;
		this.hasAlgae = false;
		this.eatTime=500;
		this.restTime=5000;
		this.gatherTime=1000;
		this.currentFrame = 0;
		this.frameCounter = 0;
		this.animationSpeed = 3; // Higher = slower animation


		this.attributeIcon1=new Image();
		this.attributeIcon1.src="./Pics/AttributeIcons/pistolShrimpAttribute1.png";
		this.attributeIcon2=new Image();
		this.attributeIcon2.src="./Pics/AttributeIcons/mantisShrimpAttribute2.png";
		
		//Rendering
		this.portrait=new Image(); 
		this.portrait.src="SpriteSheets/PistolShrimp/Idle/pistolShrimp0.png";

		//AI
		this.isAutoPilotActive=true;
		this.autoPilotTree=null;
		this.blackboard={
			actor:this,
			targetDigPosition:null,
			targetPosition:null,
			rotation:null,
			currStateText:null,
			currGatheringTarget:null,
			holding:null
		};
		this.initBehaviorTree(); // start running the behvior tree. 
		

    }
	
	
	initBehaviorTree() {


		 // 1. Tasks 
		 // maybe for bigger predators 
		const detectHostiles= new DetectHostileActors();
		  

		const eatingActions = new Sequence([
				new IsHungryCondition(),
				new EatAction(),
				new EatAnim()
		  ]);
		const sleepingActions= new Sequence([
			new ReturnHomeRest(),
            new Rest()			
		  ])

		const attackActions = new Selector([ // make a pistol shrimp function
			
				new Sequence([
					new HasAttackTargetCondition(),
					new MoveAndRotateToFireProjectileAction(),
					new AttackTargetAnimProjectile()
				]),
				
				new Sequence([
					new DetectEnemy()			
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

		
		const spreadCalciumCarbonateActions= new Selector([
				new Sequence([
					new HasResourceCondition(),
					new DetectEmptyAdjacentSpace(),
					new MoveToEmptyAdjacentSpace()
				]),
				new Sequence([
					new FindCalciumCarbonate(),
					new MoveToCalciumCarbonate(),
					new PickUpCalciumCarbonateAnim(),
					new DetectEmptyAdjacentSpace(),
					new MoveToEmptyAdjacentSpace()			
				])
		])
		  // 2. Decorators 
		  const lockedEating = new LockActionDecoratorEat(eatingActions);
		  const lockedResting= new LockActionDecoratorSleep(sleepingActions);
		  const conditionalSpreadCalciumCarbonate= new SpreadCalciumDecorator(spreadCalciumCarbonateActions);
		  // 3. Tree Structure 
		  const root = new Selector([
			//detectHostiles,
			attackActions,
			spreadCalciumCarbonateActions,
			consumeCarcassActions,
			wanderActions       // Fallback to wandering
		  ]);

		  // 4. Create tree 
		  this.autoPilotTree = new BehaviorTree(
			root, 
			this.blackboard
		  );
		}


	
    draw() {
        canvasContext.save();
		
        let imgToDraw = pistolShrimpWalkImgArray[this.currentFrame];


/* 		if(!this.isAlive){
			imgToDraw= shrimpDeadImg;
		}
		else if(this.isEating){
			imgToDraw=shrimpEatingImgArray[this.currentFrame];
		}
		else if(this.isHiding){
			imgToDraw=blankImage;
		}
		else if(this.hasCalciumCarbonate){
			imgToDraw=shrimpImgArrayCalciumCarbonate[this.currentFrame];
		}
		
		
		else{
			imgToDraw = shrimpImgArray[this.currentFrame];
		}
		 */
		if(imgToDraw){
			
			canvasContext.drawImage(imgToDraw, this.x, this.y, this.width, this.height);
        }
        canvasContext.restore();

        // Draw Outline if Selected
        if (this.selected) {
			actorSelected=this;
			drawBorder(actorSelected,performance.now() * 0.001)
			selectText="Pistol Shrimp "+this.id;
			drawSelectedActorProfilePic(imgToDraw);
			drawCurrStateText(this.currStateText);
			//icons
			drawHealthIcon(this.health);
			drawHungerIcon(this.hunger);
			drawStaminaIcon(this.stamina);	
			
			//stats 
			drawDietIcon("carnivore");
			drawAttributeIcon1(this.attributeIcon1,"Hexnocular Vision","white");
			drawAttributeIcon2(this.attributeIcon2,"Bullet-time Punch","white");
			drawStat1Text("Gather Rate "+this.gatherRate.toString());
			drawStat2Text("Attack Dmg "+ this.attackDmg.toString());
			drawStat3Text("Defence "+ this.defence.toString());
			drawStat4Text("Ammonia "+this.ammoniaProduction.toString())	
			//Commands UI
			//drawMoveUI();
			drawShootBubbleUI()
			
			//info
			
				drawOutlinerDietIcon(this.diet);
				drawOutlinerIcon1(this.attributeIcon1,"Can Fire a Cavitation Bubble- Stun Ability","black");
				drawOutlinerIcon2(this.attributeIcon2,"Click Communication- Call School Ability","black");
				drawOutlinerIcon3(this.attributeIcon1,"Burrow Builder- Spread Carbonate Ability","black");
				drawOutlinerIcon4(this.attributeIcon1,"Temperature Resistant","black");
				
			
			
			
        }
    }
	//state and behaviors
    findState() {
		//console.log("speed ", this.speedX, "speedY", this.speedY);
        switch (this.state) {
			case "autoPilot":
				// BT run 

				this.autoPilotTree.update()
				break;
			case "reset": 
				//reset tree 
				this.autoPilotTree.root.reset();
				
				this.state="autoPilot";
				break
			case "dead": 
				this.currStateText="Dead";
				this.speedX=0;
				this.speedY=0;
				this.autoPilotTree.root.reset();

				break;
            case "stop":
                this.stop();
                break;
            case "move":
				this.currStateText="Moving to Position"
				this.autoPilotTree.root.reset();
                this.moveTo();
                break;
			case "patrol":
				this.patrolTo();
				break;	
			
		}
	}
	produceAmmonia(){
		this.home.ammonia+=this.ammoniaProduction;
	}
	handleHunger(){
		this.hunger-=.25;
	}
		
	   

    moveTo() {
		moveToClickedPosition(this,this.targetX,this.targetY);
		
		
    }
	
	handleDeath(){
		if(this.isDying||!this.isAlive){
			return
		}
		if(this.health<=0){
			this.health=0// clamp baby
			//this.isDying=true; lets do is not alive because I dont have an animation for this 
			this.isAlive=false; 
			this.home.population-=1;
			this.state="dead";
		}
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


		//Save And Load
	toData() {
		//this.state="reset";
		return{
			type:this.type,
			x:this.x,
			y:this.y,
			health:this.health,
			hunger:this.hunger,
			stamina:this.stamina,
			
		}
		
	}
	
    static fromData(data,home) {
		const newPlayableChar = new PistolShrimp(data.x, data.y,home);
		newPlayableChar.type=data.type
		newPlayableChar.health=data.health;
		newPlayableChar.hunger=data.hunger;
		newPlayableChar.stamina=data.stamina;

		
		return newPlayableChar;
		
	}	
	
	
}




