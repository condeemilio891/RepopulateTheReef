class Damselfish {
    constructor(x, y,home) {
        this.id=home.popArray.length;
		this.x = x;
        this.y = y;
		this.rotation=0;
        this.speedX = 4.8;
        this.speedY = 4.5;
		this.maxSpeedX=4.8;
		this.maxSpeedY=4.5;
		this.radius=1000;
		this.name="Damselfish "+this.id;
		this.diet="omnivore"// though we are tier 2 so eat more??? 
        
		this.targetX = 0; //depricated
        this.targetY = 0;
        this.distanceToTarget = 0;
        this.unitVectorX = 0;
        this.unitVectorY = 0;
       
		this.resourceI=0; // ?? 

        this.width = 200;
        this.height = 200;
        this.flipped = false;
        this.state = "autoPilot";  
		this.currStateText="";
		this.selected=false;
		this.multipleSelected=false
		
        this.hasAlgae = false;
		this.hasPlankton=false;
		this.isGathering=false; 
		this.currGatheringActor=null;
		
		
		
		this.type="Damselfish"// do we need type? 
		
		// rehydrate
		this.health=100;
		this.hunger=55;
		this.stamina = 200;
		
		
		this.gatherRate=10;
		this.attackDmg=5;
		this.defence=5;
		this.ammoniaProduction=2;
		
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
		this.portrait.src="./SpriteSheets/Damselfish/DamselfishSwim/damselfishSwim0.png";
		this.home=home;
		// blank img hidden 
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

		  // 2. Decorators 

		  
		  // 3. Tree Structure 
		  const root = new Selector([
		  	attackActions,
			consumeCarcassActions,
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

		let imgToDraw = this.portrait;
		if (this.hasAlgae) {
			imgToDraw = this.portrait;
		}
		else if (this.hasPlankton) {
			imgToDraw = this.portrait;
		}
		else if (this.isEating){ // refactor to draw plankton if carring plankton 
			imgToDraw=this.portrait;
		}
		else if(this.isResting){
			imgToDraw=blankImage;
		}else if(this.isHidden){
			imgToDraw=blankImage;
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
			
			
					selectText="Damselfish "+this.id.toString();
					drawSelectedActorProfilePic(imgToDraw);
					drawCurrStateText(this.currStateText);
					drawHealthIcon(this.health);
					drawHungerIcon(this.hunger);
					drawStaminaIcon(this.stamina);
					//infobox 
					drawDietIcon("omnivore");
					drawAttributeIcon1(this.attributeIcon1,"Communication","white");
					drawAttributeIcon2(this.attributeIcon2,"Mucus Coating","white");
					drawStat1Text("Gather Rate "+this.gatherRate.toString());
					drawStat2Text("Attack Dmg "+ this.attackDmg.toString());
					drawStat3Text("Poison defence "+ this.defence.toString()+" Poison -75%");
					drawStat4Text("Ammonia "+this.ammoniaProduction.toString())

					//draw command UI icons
					
					//drawCallSchoolUI();
					//drawAutoPilotUI();
					
					//info 
					drawOutlinerDietIcon("omnivore");
					drawOutlinerIcon1(this.attributeIcon1,"Territorial, Defends Shrimp From Predators","black");
					drawOutlinerIcon2(this.attributeIcon1,"Can collect Resources from Carcass","black");
					drawOutlinerIcon3(this.attributeIcon2,"Mucas Coating: Immune to Anemone\nResist Jellyfish Nematocysts","black");
					drawOutlinerIcon4(this.attributeIcon2,"Eats Coral","black");
				
				
			}
			
        }
		

	//state Machine
    findState() {
        switch (this.state) {
			case "autoPilot":
				// BT run 
				//console.log(this.autoPilotTree)
				this.currStateText="Protecting Shrimp"
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
        }
    }
	
	produceAmmonia(){
		this.home.ammonia+=this.ammoniaProduction;
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

    stop() {
        this.speedX=0;
		this.speedY=0;
	
    }
	handleHunger(){
		this.hunger-=2;
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
			stamina:this.stamina,
			
		}
	}
	
    static fromData(data,home) {
		const newPlayableChar = new Damselfish(data.x, data.y,home);
		newPlayableChar.type=data.type;
		newPlayableChar.health=data.health;
		newPlayableChar.hunger=data.hunger;
		newPlayableChar.stamina=data.stamina;
		newPlayableChar.state="reset";

		
		return newPlayableChar;
		
	}	

}
