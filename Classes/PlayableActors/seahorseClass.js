class Seahorse {
    constructor(x, y, home) {
        this.id=home.popArray?.length ?? 0;
		this.x = x;
        this.y = y;
		this.rotation=0;
        this.speedX = 1.5;
        this.speedY = 1.5;
		this.maxSpeedX=1.5;
		this.maxSpeedY=1.5;
		this.radius=2000;
		this.name="Seahorse"+this.id;
		this.diet="carnivore";
        
		this.targetX = 0;
        this.targetY = 0;
        this.distanceToTarget = 0;
        this.unitVectorX = 0;
        this.unitVectorY = 0;
       
		this.resourceI=0;

        this.width = 80;
        this.height = 80;
        this.flipped = false;
        this.state = "autoPilot";  
		this.currStateText="";
		this.selected=false;
		this.isDying=false;
		this.isAlive=true;
		
        this.hasAlgae = false;// this may not ever happen just keep for now 
		this.hasPlankton=false;
		this.isGathering=false; 
		this.currGatheringActor=null;
		this.attackTarget=null;
		this.type="Seahorse"


		this.gatherRate=15;
		this.ammoniaProduction=3;
		this.attackDmg=10;
		this.defence=15;
		this.percentHuntingChance=75;
		
		
		// rehydrate 
		this.health=100;
		this.hunger=52;
		this.stamina = 1000;
		//commands
		this.isAttackingUIActive=false;
		this.isAttackingActive=false;
		
		//portrait;
		this.portrait=seahorseSwimImgArray[0]; 

		//attribute Icon 1 
		this.attributeIcon1=new Image();
		this.attributeIcon1.src="./Pics/AttributeIcons/seahorseAttribute1.png";
		this.attributeIcon2=new Image();
		this.attributeIcon2.src="./Pics/AttributeIcons/seahorseAttribute2.png";
		// animations
		this.isEating=false;
		this.isResting=false;
		this.currentFrame = 0;
		this.frameCounter = 0;
		this.animationSpeed = 3; // Higher = slower animation
		this.eatTime=500;
		this.restTime=5000;
		this.gatherTime=1000;
		this.home=home;
		 
		 
		//AI
		this.isAutoPilotActive=false;
		this.autoPilotTree=null;
		this.blackboard={
			actor:this,
			targetSeaweed:null,
			targetPosition:null,
			rotation:null,
			currStateText:null,
		};
		this.initBehaviorTree(); // start running the behvior tree. 
		
		
		
    }
	//AI and behavior 
	initBehaviorTree() {
		  // 1. Tasks 
		  const eatingActions = new Sequence([
			new IsHungryCondition(),
			new EatAction(),
			new EatAnim()
		  ]);
		  const sleepingActions= new Sequence([
			new ReturnHomeRest(),
            new Rest()			
		  ])
		  const huntForPlanktonActions =new Selector([
			new Sequence([
				new HasResourceCondition(),
				new ReturnHomeGatherSeaweed()
			]),
			new Sequence([
				new FindSeaweed(),
				new MoveToSeaweed(),
				new GatherFromSeaweedAnim(),
				new ReturnHomeGatherSeaweed()
			])
		  ]) 
		  const wanderActions = new Sequence([
			new FindRandomLocationAction(),
			new MoveAndRotateToLocationAction()
		  ]);
			
		const attackActions = new Sequence([
			new MoveAndRotateToAttackTargetAction(),
			new AttackTargetAnim() 
		
		])
		  // 2. Decorators 
		  const conditionalHuntForPlankton = new HomeNeedsPlanktonDecorator(huntForPlanktonActions);
		  const lockedEating = new LockActionDecoratorEat(eatingActions);
		  const lockedResting= new LockActionDecoratorSleep(sleepingActions);
		  
		  const conditionalAttack= new CheckForAttackTargetDecorator(attackActions);
		  const conditionalDefend= new IsBeingAttackedDecorator(attackActions);
		  // 3. Tree Structure 
		  const root = new Selector([
			//conditionalDefend,
			eatingActions,
			//lockedResting,
			//conditionalAttack, // if eating or sleeping wont attack.
			huntForPlanktonActions,
			//conditionalDefend,			
			//wanderActions       // Fallback to wandering
		  ]);

		  // 4. Create tree 
		  this.autoPilotTree = new BehaviorTree(
			root, 
			this.blackboard
		  );
		}
		// Rendering
    draw() {
        canvasContext.save();
		this.handleDeath();
        
		let imgToDraw = seahorseSwimImgArray[this.currentFrame];
		if (this.hasAlgae) {
			imgToDraw = seahorseSwimImgArrayAlgae[this.currentFrame];
		}
		if (this.hasPlankton) {
			imgToDraw = seahorseSwimImgArrayPlankton[this.currentFrame];
		}
		if (this.isEating){
			imgToDraw= seahorseEatImgArray[this.currentFrame];
		}
		if(this.isDying){
			if(this.currentFrame>=seahorseDeathImgArray.length-1){// change back to length
				 this.isDying=false;
				 this.isAlive=false;
			 }
			imgToDraw=seahorseDeathImgArray[this.currentFrame];
		}
		if(!this.isAlive){
			imgToDraw=seahorseDeathImgArray[seahorseDeathImgArray.length-1];
			this.state="dead";
		}

        if (this.flipped) {
            canvasContext.translate(this.x + this.width, this.y);
            canvasContext.scale(-1, 1);
            canvasContext.drawImage(imgToDraw, 0, 0, this.width, this.height);
        } else {
            canvasContext.drawImage(imgToDraw, this.x, this.y, this.width, this.height);
        }

        canvasContext.restore();
		
		   if (this.selected) {
			actorSelected=this;
			drawBorder(actorSelected,performance.now() * 0.001)
			selectText="Seahorse "+this.id.toString();
			drawSelectedActorProfilePic(imgToDraw);
			drawCurrStateText(this.currStateText);
			drawHealthIcon(this.health.toString());
			drawHungerIcon(this.hunger.toString());
			drawStaminaIcon(this.stamina.toString());
			//stats 
			drawDietIcon(this.diet);
			drawAttributeIcon1(this.attributeIcon1," Opposable tail","white");
			drawAttributeIcon2(this.attributeIcon2," Bone Armor","white");
			drawStat1Text("Gather Rate "+this.gatherRate.toString());
			drawStat2Text("Attack Dmg "+ this.attackDmg.toString());
			drawStat3Text("Defence "+ this.defence.toString());
			drawStat4Text("Ammonia "+this.ammoniaProduction.toString())
			
			//UI commands
			drawSeahorseGatherFromSeaweed()
			//drawAutoPilotUI();
			//drawAttackIcon(this.attributeIcon1);
			//info
		
			drawOutlinerDietIcon(this.diet);
			drawOutlinerIcon1(this.attributeIcon1,"Opposable Tail: helps hunting","black");
			drawOutlinerIcon2(this.attributeIcon2,"BoneArmor: Defence +10 Crushing Dmg","black");
			drawOutlinerIcon3(this.attributeIcon1,"Chromatophores: Camo","black");

			
        }
    }
	


    findState() {
        switch (this.state) {
			case "autoPilot":
				// BT run 
				
				this.currStateText=this.blackboard.currStateText;
				this.autoPilotTree.update();
				break;
			case "reset": 
				//reset tree 
				this.autoPilotTree.root.reset();
				this.state="autoPilot";
				break
			case "dead":
				this.currStateText="Dead";
				this.autoPilotTree.root.reset();
				this.speedX=0;
				this.speedY=0;
				break;
			case "move":
				this.currStateText="Moving To Target";
				this.autoPilotTree.root.reset();
				this.moveTo();
				break;
            case "swim":
                this.swim();
                break;
            case "rest":
                this.rest();
                break;
			case "gatherPlankton":
				this.speedX=3;
				this.speedY=3;
                this.gatherPlankton();
                break;
			case "gatherSeaweed":
				this.speedX=3;
				this.speedY=3;
				this.gatherSeaweed();
				break;
			case "returnToCoral":
                this.returnToCoral();
                break;
			case "entangled":
				this.rotation=90;
				this.speedX=0;
				this.speedY=0;
				this.currStateText="entangled"
				break;

        }
    }
	
	produceAmmonia(){
		this.home.ammonia+=this.ammoniaProduction;
	}
	applyDamage(enemy){
		if(enemy.health<=0){
			attackTarget=null;
			this.state="autoPilot";
			return;
		}
		enemy.health-=this.attackDmg;
		enemy.attackTarget=this;
	}
	handleDeath(){
		if(this.isDying||!this.isAlive){
			return
		}
		if(this.health<=0){
			this.health=0// clamp baby
			this.home.population--
			this.isDying=true;
		}
	}
	handleHunger(){
		this.hunger-=2;
	}	

	moveTo() {
		moveToClickedPosition(this,this.targetX,this.targetY);
    }

    rest() {
        this.speedX = 0;
        this.speedY = 0;
        this.stamina++;

        if (this.stamina >= 500) {
            this.stamina = 1000;
            this.state = "swim";
            console.log("Fish is swimming again!");
        }
    }
	
	gatherSeaweed() {
	
		if (!this.hasAlgae&&this.currGatheringActor.alive) {
			this.flipped=true;
			this.currGathering="seaweed";
			// Calculate direction towards algae
			let dx = (this.currGatheringActor.x) - this.x;
			let dy = (this.currGatheringActor.y) - this.y;
			let distance = Math.sqrt(dx * dx + dy * dy);

			// Avoid division by zero
			if (distance > 0) {
				// Normalize direction and ensure movement is always towards seaweed
				let directionX = dx / distance;
				let directionY = dy / distance;
				
				if(directionX<0){
					this.flipped=true;
				}else{
					this.flipped=false
				}
				// Apply absolute speed to ensure forward movement
				this.x += Math.abs(this.speedX) * directionX;
				this.y += Math.abs(this.speedY) * directionY;
				const absDx = Math.abs(dx);
				this.rotation = Math.atan2(dy, absDx) * (180 / Math.PI);
			}

			// Stop if close enough
			if (distance < 150) {
				this.x = this.currGatheringActor.x;
				this.y = this.currGatheringActor.y;
				this.hasAlgae = true;
				this.currGatheringActor.consume();
				this.state="returnToCoral";
			}
		}
	}
	gatherPlankton() {
		if (!this.hasAlgae) {
			this.flipped=true;
			this.currGathering="plankton";
			// Calculate direction towards algae
			let dx = (krillX+150) - this.x;
			let dy = (krillY+150) - this.y;
			let distance = Math.sqrt(dx * dx + dy * dy);

			// Avoid division by zero
			if (distance > 0) {
				// Normalize direction and ensure movement is always towards algae
				let directionX = dx / distance;
				let directionY = dy / distance;

				// Apply absolute speed to ensure forward movement
				this.x += Math.abs(this.speedX) * directionX;
				this.y += Math.abs(this.speedY) * directionY;
				const absDx = Math.abs(dx);
				this.rotation = Math.atan2(dy, absDx) * (180 / Math.PI);
			}

			// Stop if close enough
			if (distance < 10) {
				this.x = krillX;
				this.y = krillY;
				this.hasPlankton = true;
				this.state="returnToCoral";
			}
		}
	}
	
	returnToCoral(){
		this.flipped=false; // this depends where home is 
		let dx = (this.home.x+150) - this.x;
        let dy = (this.home.y+150) - this.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        //this.x += dx * 0.03;
        //this.y += dy * 0.03;
				// Avoid division by zero
		if (dist > 0) {
				// Normalize direction and ensure movement is always towards algae
			let directionX = dx / dist;
			let directionY = dy / dist;
				// Apply absolute speed to ensure forward movement
			this.x += Math.abs(this.speedX) * directionX;
			this.y += Math.abs(this.speedY) * directionY;
			const absDx = Math.abs(dx);
			this.rotation = Math.atan2(dy, absDx) * (180 / Math.PI);
		}

        if (dist < 10) {  // Reset at coral
			if(this.currGathering ==="seaweed"){
				this.home.algaeStored+=10;
				this.hasAlgae=false;
				this.state = "gatherSeaweed";  // Resume swimming
			}
			else if(this.currGathering==="plankton"){
				this.home.planktonStored+=10;
				this.hasPlankton=false;
				this.state= "gatherPlankton";
			}else{
				this.state="stop";
			}
		}
	}
	

	
		//Save And Load
	toData() {
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
		const newPlayableChar = new Seahorse(data.x, data.y,home);
		newPlayableChar.type=data.type;
		newPlayableChar.health=data.health;
		newPlayableChar.hunger=data.hunger;
		newPlayableChar.stamina=data.stamina;
		newPlayableChar.state="reset";

		
		return newPlayableChar;
		
	}	
	
}
