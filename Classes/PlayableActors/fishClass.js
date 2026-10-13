class Fish {
    constructor(x, y,home) {
        this.id=home.popArray?.length ?? 0;
		this.x = x;
        this.y = y;
		this.rotation=0;
        this.speedX = 4.8;
        this.speedY = 4.5;
		this.maxSpeedX=4.8;
		this.maxSpeedY=4.5;
		this.radius=2000;
		this.name="Clownfish "+this.id;
		this.diet="omnivore";
        
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
		this.multipleSelected=false
		
        this.hasAlgae = false;
		this.hasPlankton=false;
		this.isGathering=false; 
		this.currGatheringActor=null;
		
		
		
		this.type="Clownfish"
		this.health=100;
		this.hunger=55;
		this.stamina = 200;
		this.gatherRate=10;
		this.attackDmg=5;
		this.defence=5;
		this.ammoniaProduction=2;
		this.toxinRes=.25;
		
		this.isAttackingActive=false;
		this.attackTarget=null;
		
		//attributes
		this.attributeIcon1=new Image();
		this.attributeIcon1.src="./Pics/AttributeIcons/clownfishAttribute1.png";
		this.attributeIcon2=new Image();
		this.attributeIcon2.src="./Pics/AttributeIcons/clownfishAttribute2.png";
		// animations
		this.isEating=false;
		this.isResting=false;
		this.eatTime=500;
		this.restTime=5000;
		this.gatherTime=300;
		this.currentFrame = 0;
		this.frameCounter = 0;
		this.animationSpeed = 3; // Higher = slower animation
		//portrait 
		this.portrait=new Image(); 
		this.portrait.src="./SpriteSheets/Clownfish/ClownfishSwim/clownfishSwim0.png";
		this.home=home;
		// blank img hidden 
		this.blankImg= new Image();
		this.blankImg.src="./Pics/blank.png"
		this.isHidden=false;
		//AI
		this.isAutoPilotActive=true;
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
		initBehaviorTree() {
		  // 1. Tasks 
		   const fleeSequence = new Sequence([
				new DetectHostileActors(),
				new ReturnHomeHide(),
				new HideUntilSafe()
				
			]);
			
		const attackActions = new Selector([
			
				new Sequence([
					new HasAttackTargetCondition(),
					new MoveAndRotateToAttackTargetAction(),
					new AttackTargetAnim() 
				]),
				
				new Sequence([
					new DetectEnemy()			
				])
		])
		  const eatingActions = new Sequence([
			new IsHungryCondition(),
			new EatAction(),
			new EatAnim()
		  ]);
		  const sleepingActions= new Sequence([
			new ReturnHomeRest(),
            new Rest()			
		  ])
		  const gatherSeaweedActions = new Selector([
		  
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

		  ]);
		  const gatherPlanktonActions=new Sequence([
		     new FindSponge(),
			new MoveToSponge(),
			new GatherPlanktonFromSpongeAnim(),
			new ReturnHomeGatherPlankton()
		  ]);

		  const wanderActions = new Sequence([
			new FindRandomLocationAction(),
			new MoveAndRotateToLocationAction()
		  ]);

		  // 2. Decorators 
		  
		  const conditionalGatherPlankton= new HomeNeedsPlanktonDecorator(gatherPlanktonActions);
		  const lockedEating = new LockActionDecoratorEat(eatingActions);
		  const lockedResting= new LockActionDecoratorSleep(sleepingActions);
		  
		  // 3. Tree Structure 
		  const root = new Selector([
			attackActions,
			//fleeSequence,
			eatingActions,
			//lockedResting,
			gatherPlanktonActions,
			gatherSeaweedActions,
			//fleeSequence,
			wanderActions       // Fallback to wandering
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

		let imgToDraw = clownfishSwimImgArray[this.currentFrame];
		if(this.isHiding){
			imgToDraw=blankImage;
		}
		else if (this.hasAlgae) {
			imgToDraw = clownfishSwimImgArrayAlgae[this.currentFrame];
		}
		else if (this.hasPlankton) {
			imgToDraw = clownfishSwimImgArrayPlankton[this.currentFrame];
		}
		else if (this.isEating){ // refactor to draw plankton if carring plankton 
			imgToDraw=clownfishEatImgArrayAlgae[this.currentFrame];
		}
		else if(this.isResting){
			imgToDraw=this.blankImg;
		}else if(this.isHidden){
			imgToDraw=this.blankImg;
		}

		const centerX = this.x + this.width/2;
		const centerY = this.y + this.height/2;

		canvasContext.translate(centerX, centerY);
		
		// Apply flip before rotation
		if (this.flipped) {
			canvasContext.scale(-1, 1);
		}
		
		// Apply rotation
		canvasContext.rotate(this.rotation * Math.PI / 180);

		// Draw centered image
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
			
					selectText="Clownfish "+this.id.toString();
					drawSelectedActorProfilePic(imgToDraw);
					this.multipleSelected ?drawCurrStateText("School Selected: Right Click To Attack") : drawCurrStateText(this.currStateText);
					drawHealthIcon(this.health);
					drawHungerIcon(this.hunger);
					drawStaminaIcon(this.stamina);
					//infobox 
					drawDietIcon("omnivore");
					drawAttributeIcon1(this.attributeIcon1,"Communication","white");
					drawAttributeIcon2(this.attributeIcon2,"Mucus Coating","white");
					drawStat1Text("Gather Rate "+this.gatherRate.toString());
					drawStat2Text("Attack Dmg "+ this.attackDmg.toString());
					drawStat3Text("Biotoxin Res "+ this.toxinRes);
					drawStat4Text("Ammonia "+this.ammoniaProduction.toString())

					//draw command UI icons
					drawClownfishGather();
					drawClownfishGatherFromSponge();
					drawClownfishHideInAnemone();
					drawCallSchoolUI();
					//drawCallSchoolUI();
					//drawAutoPilotUI();
					
					//info 
					
					drawOutlinerDietIcon("omnivore");
					drawOutlinerIcon1(this.attributeIcon1,"Click Communication: Clownfish Converse\nUsing Clicking: Can Select 2 Clownfish", "black");
					drawOutlinerIcon2(this.attributeIcon1,"Collects Algae From Seaweed\nCollects Plankton From Sponge","black");
					drawOutlinerIcon3(this.attributeIcon2,"Mucas Coating: Immune to Anemone\nResist Jellyfish Nematocysts","black");
				
				
			}
			
        }
		

	//state Machine
    findState() {
        switch (this.state) {
			case "autoPilot":
				// BT run 
				//console.log(this.autoPilotTree)
				this.currStateText="Auto"
				this.autoPilotTree.update()
				break;
			case "reset": 
				//reset tree 
				this.autoPilotTree.root.reset();
				console.log("tree Reset");
				this.state="autoPilot";
				break
			case "move":
				this.currStateText="Moving To Position"
				this.autoPilotTree.root.reset();
				this.moveTo();
				break;
            case "stop":
				this.currStateText="Stopped";
                this.stop();
                break;
			case "eatSeaweed":
				this.currStateText="Eating Seaweed";
				this.speedX=1;
				this.speedY=1;
				this.eatSeaweed();
				break;
            case "rest":
                this.rest();
                break;
			case "gatherSeaweed":
				this.speedX=3;
				this.speedY=3;
				this.currStateText="Gathering Seaweed";
                this.gatherSeaweed();
                break;
			case "gatherPlankton":
				this.speedX=3;
				this.speedY=3;
				this.currStateText="Gathering Plankton";
				this.gatherPlankton();
				break;
			case "returnToAnemone":
				this.speedX=3;
				this.speedY=3;
				this.currStateText="Returning home";
                this.returnToAnemone();
                break;
			case "callSchool":
				console.log("callSchool");
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
		console.log("damage applied to ", this.attackTarget);
	}

    stop() {
        this.speedX=0;
		this.speedY=0;
	
    }
	handleHunger(){
		this.hunger-=2;
	}
	
	
	
	
	
	eatSeaweed() {
		if (this.isEating) return; // Prevent duplicate triggers
		this.isEating = true;
		this.hasAlgae = false;

		// Animation frame loop
		const animate = () => {
		  if (this.eatTime > 0) {
			this.animationSpeed=20;
			this.eatTime--;
			requestAnimationFrame(animate); // Continue the loop
		  } else {
			this.resetEatingState();
		  }
		};

		requestAnimationFrame(animate);
	}

	resetEatingState() {
		this.eatTime = 500;
		this.hasAlgae = false;
		this.hunger = 100;
		this.isEating = false;
		this.animationSpeed=3;
		this.state = "gatherSeaweed";
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
	
	gatherSeaweed() {
		if (!this.hasAlgae&&this.currGatheringActor.alive) {
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
				this.currGatheringActor.consume();// decrease seaweed from building 
				
				this.state="returnToAnemone";
				
			}
		}
	}
	gatherPlankton() {
		if (!this.hasAlgae) {
			this.flipped=true;
			this.currGathering="plankton";
			// Calculate direction towards algae
			let dx = (krillArray[0].x+150) - this.x;// make dynamic
			let dy = (krillArray[0].y+150) - this.y;
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
				this.x = krillArray[0].x;// make dynamic
				this.y = krillArray[0].y;
				this.hasPlankton = true;
				this.state="returnToAnemone";
			}
		}
	}
	
	returnToAnemone(){
		
		this.flipped=false;
		if(this.hunger<=50){
			this.state="eatSeaweed"
		}
		let dx = (this.home.x+150) - this.x;// refactor this to be the instance of home anemone();// use . home  
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
	
	
	setTargetAndMove(targetX, targetY) {
        this.targetX = targetX;
        this.targetY = targetY;
        console.log(`Target set: (${this.targetX}, ${this.targetY})`);
        this.state = "moveTo";
    }
    moveTo() {
		moveToClickedPosition(this,this.targetX,this.targetY);
    }
	
	handleHungerAndStamina(){
		if(this.state==="rest"){
			this.stamina++;
		}
		if(this.state==="eat"){
			this.hunger++
		}else{
			this.hunger--;
			this.stamina--;
		}
		
	}
	
	
	
	
	
	
	
			//Save And Load
	toData() {
		return{
			x:this.x,
			y:this.y,
			health:this.health,
			hunger:this.hunger,
			stamina:this.stamina,
			
		}
	}
	
    static fromData(data,home) {
		const newPlayableChar = new Fish(data.x, data.y,home);
		newPlayableChar.health=data.health;
		newPlayableChar.hunger=data.hunger;
		newPlayableChar.stamina=data.stamina;
		newPlayableChar.state="reset";

		
		return newPlayableChar;
		
	}	
	


}
