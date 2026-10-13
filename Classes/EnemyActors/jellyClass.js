class Jellyfish {
    constructor(x, y) {
		this.spawnPointX=x;
		this.spawnPointY=y;
        this.x = x;
        this.y = y;
		this.speedX=1.2;
		this.speedY=1;
		this.maxSpeedX=1.2
		this.maxSpeedY=1;
		this.radius=8000;
		this.name="Jellyfish"

        this.img = new Image();
        this.img.src = "./SpriteSheets/Jellyfish/jellyIdle0.png";

        this.width = 100;
        this.height = 100;
        this.flipped = false;
        this.state = "auto"; 
		
		this.attackTarget=null;
		//this.targetPlayerCharacter=null; 
		this.isDying=false;
		this.isAlive=true;
		this.currStateText="";
        this.selected = false;
		this.currGathering=""
		this.currGatheringActor=null;
		this.gatherRate=1;
		
		this.health=100;
		this.stamina=100;
		this.hunger=50;
		this.percentHuntingChance=25;
		this.plankton=5000;
		this.attackDmg=10;
		this.poisenChance=.25;
		this.entangleChange=.99;

		this.currentFrame = 0;
		this.frameCounter = 0;
		this.animationSpeed = 7; // Higher = slower animation
		
		//attributes 
		this.attributeIcon1=new Image();
		this.attributeIcon1.src="./Pics/AttributeIcons/anemoneAttribute1.png";
		
		//AI
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
		
		  const wanderActions = new Sequence([
			new FindRandomLocationAction(),
			new MoveAndRotateToLocationAction(),
			 
		  ]);
		  const attackActions= new Selector([
		  
		  new Sequence([
			new IsHungryCondition(),
			new DetectPlayerActors(),
			new MoveAndRotateToAttackTargetAction(),
			new AttackTargetAnim()		  
		  
		  ]),
		  new Sequence([
			new HasAttackTargetCondition(),
			new MoveAndRotateToAttackTargetAction(),
			new AttackTargetAnim()
		  ])

		  ]);
		  // 2. Decorators 
		const conditionalAttack = new CheckForAttackTargetDecorator(attackActions);
		const conditionalDefend = new IsBeingAttackedDecorator(attackActions);
		  // 3. Tree Structure 
		  const root = new Selector([
			//conditionalDefend,
			attackActions,
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
		this.handleDeath()// check if dead
		 let imgToDraw=jellyfishImgArray[this.currentFrame];
		 if(this.isDying){
			if(this.currentFrame===jellyfishDeathImgArray.length-1){// change back to length
				 this.isDying=false;
				 this.isAlive=false;
			 }
			 imgToDraw=jellyfishDeathImgArray[this.currentFrame];
		 }
		 else if(!this.isAlive){
			 this.currStateText="Dead";
			 imgToDraw=jellyfishDeathImgArray[jellyfishDeathImgArray.length-1];
			 this.isAlive=false;
			 this.state="dead";
		 }
		 
		  canvasContext.drawImage(imgToDraw, this.x, this.y, this.width, this.height);

		  canvasContext.restore();

        // Draw Outline if Selected
        if (this.selected) {
            canvasContext.lineWidth = 3;
            canvasContext.strokeStyle = "red";
            canvasContext.strokeRect(this.x - 2, this.y - 2, this.width + 4, this.height + 4);
			actorSelected=this;
			selectText="JellyFish";
			drawSelectedActorProfilePic(imgToDraw);
			drawCurrStateText(this.currStateText);
			drawHealthIcon(this.health.toString());
			drawHungerIcon(this.hunger.toString());
			drawPlanktonStoredIcon(this.plankton.toString());
			//stats 
			drawDietIcon("carnivore");
			drawAttributeIcon1(this.attributeIcon1,"Venomous Sting","white");
		}
		// please refactor autopilot 
		if(this.isAlive){
			this.findState();
		}
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
	handleHunger(){
		this.hunger-=1;
	}
	applyDamage(enemy){
		
		if(enemy.health<=0){
			enemy.attackTarget=null;
			enemy.handleDeath();
			this.hunger=100;
			this.attackTarget=null;
			this.state="reset";
			return;
		}
		if(enemy instanceof Crab || enemy instanceof Fish){
			alertText="Toxin Res"
			enemy.health-= (this.attackDmg*enemy.toxinRes)
		}else{
			enemy.health-=this.attackDmg;
		}
		enemy.attackTarget=this;
		enemy.x = this.x + (this.width/2) - (enemy.width/2);
		enemy.y = this.y + (this.height/2) - (enemy.height/2);
		console.log("damage applied to ", this.attackTarget);
	}
/* 	applyDamage(enemy){		
		
		enemy.health-=this.attackDmg;
		enemy.attackTarget=this;
		//this.poisenEnemy(enemy);
		this.entangleEnemy();
	} */
/* 	poisenEnemy(enemy){
		if(Math.random()<this.poisenChance){
			this.applyDamage(enemy);
			console.log('\x1b[36m%s\x1b[0m',"poisen Damage applied")
		}
	}
	 */
	 
	 entangleEnemy(enemy){
		 //if(Math.random()<this.entangleChange){
			 if(enemy instanceof Seahorse){    /// generalize this please make a player char array?
				 enemy.state="entangled";
				 this.applyDamage(enemy);
				 console.log('\x1b[36m%s\x1b[0m',"Entangled applied")
				 // should I apply like enmy.x and enemy.y is below jelly?
			 }
		 //}
	 }
	consumePlankton(actor){
		this.plankton-=25;
	}
	
	    findState() {
        switch (this.state) {
			case "auto":
				// BT run 
				this.currStateText=this.blackboard.currStateText;
				this.autoPilotTree.update();
				break;
			case "reset": 
				//reset tree 
				this.autoPilotTree.root.reset();
				this.state="auto";
				break
			case "dead": 
				this.currStateText="Dead";
				
				break;
        }
    }

	

}