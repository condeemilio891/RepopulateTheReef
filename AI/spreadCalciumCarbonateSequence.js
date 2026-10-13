class SpreadCalciumDecorator extends BTNode {
  constructor(child) {
    super();
    this.children = [child];
  }
  
  tick(blackboard) {
    const actor = blackboard.actor;
    const home = actor.home;
    
    // Check home storage
    if (home.calciumCarbonateStored < 1) {
		this.children[0].reset();
      return 'failure';
	  
    }
    
    // Check for available calcium
    const availableCalcium = home.calciumCarbonateArray.some(cc => !cc.targeted);
    
    if (availableCalcium) {
      blackboard.currStateText = "Spreading Calcium";
      return this.children[0].tick(blackboard); // tick s working ! 
    }
   // this.children[0].reset(); 
  //  return 'failure';
  return this.children[0].tick(blackboard); // use both for now weird
  }
  
  reset() {
    this.children[0].reset();
  }
}




class FindCalciumCarbonate extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
    const home = actor.home;
    const localArray = home.calciumCarbonateArray;

	if(!home){
		console.warn("Invalid home");
		return "failure";
	}
	if(!localArray){
		console.warn("noLocalArray")
		
	}
    
    const neighborCorals = getAllActorsInRadius(home, organPipeCoralArray) ?? []; // use ?? to guard 

    // Safely collect all calcium carbonate arrays from neighbors, then flatten
    const neighborCCArray = neighborCorals?.flatMap(coral => coral.calciumCarbonateArray) ?? [];

    // Choose target array: combine local and neighbor arrays if neighbors have any
    const targetArray = neighborCCArray.length > 0
      ? [...localArray, ...neighborCCArray]
      : localArray;

    const targetCC = targetArray.find(cc => !cc.targeted);

    if (!targetCC) {
      return 'failure';
    }

    targetCC.targeted = true;
    targetCC.targetedBy = actor.id;

    blackboard.currGatheringTarget = targetCC;
    return 'success';
  }
}

class MoveToCalciumCarbonate extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
    const targetCC = blackboard.currGatheringTarget;
        
		
	if (Array.isArray(targetCC)) {
      targetCC = targetCC[0];
    }
    if (!targetCC) {
      return "failure";
    }
    
    // Simply delegate to the working utility function
    return moveToPosition(actor, targetCC, 10);
  }
}


class PickUpCalciumCarbonateAnim extends BTNode {
	constructor(){
		super();
		this.gatherProgress=0;
		this.initialGatherTime=150;
		this.progressBar= new ProgressBarComponent(150,"white");
	}
	tick(blackboard) {
		const actor = blackboard.actor;
		const home = actor.home;
		const targetCC = blackboard.currGatheringTarget;

		if (this.gatherProgress === 0) {
			actor.speedX = 0;
			actor.speedY = 0;
			actor.isGatheringCalciumCarbonateAnim = true;
			this.gatherProgress = this.initialGatherTime;
		}

		this.progressBar.update(this.gatherProgress);
		this.progressBar.draw(actor.x, actor.y);
		this.gatherProgress--;

		// ----- COMPLETION CHECK -----
		if (this.gatherProgress <= 0) {
			// Gathering finished
			actor.hasCalciumCarbonate = true;
			actor.isGatheringCalciumCarbonateAnim = false;
			actor.speedX = 3;
			actor.speedY = 3;

			// Remove the correct calcium carbonate
			let removedCC = null;
			let index = home.calciumCarbonateArray.indexOf(targetCC);
			if (index !== -1) {
				const removedArray = home.calciumCarbonateArray.splice(index, 1);
				removedCC = removedArray[0];
			} else {
				const neighbors = getAllActorsInRadius(home, organPipeCoralArray) ?? [];
				for (const coral of neighbors) {
					index = coral.calciumCarbonateArray.indexOf(targetCC);
					if (index !== -1) {
						removedCC = coral.calciumCarbonateArray.splice(index, 1)[0];
						break;
					}
				}
			}

			actor.currGatheringActor = removedCC;
			this.reset();

			return "success";   // ✅ Completion → success
		}

		// ----- STILL GATHERING -----
		return "running";       // ✅ Progress > 0 → running
	}
	reset() {
    super.reset();
	this.progressBar.hide();
    this.gatherProgress = 0; 
  }
}

class DetectEmptyAdjacentSpace extends BTNode {
    constructor() {
        super();
        this.CC_WIDTH = 25;
        this.CC_HEIGHT = 25;
    }

    tick(blackboard) {
        const actor = blackboard.actor;
        const home = actor.home;
        
        // Get the position of the CC that was just grabbed
        const currHeldCC = actor.currGatheringActor;
        if (!currHeldCC) {
            
            return 'failure';
        }
        
        // Get all existing CC positions
        const occupiedPositions = new Set();
        for (const cc of calciumCarbonateArray) {
            occupiedPositions.add(`${cc.x},${cc.y}`);
        }
        
        // Calculate potential adjacent positions (up, down, left, right)
        const potentialPositions = [
            { x: currHeldCC.x - this.CC_WIDTH, y: currHeldCC.y },  // Left
            { x: currHeldCC.x + this.CC_WIDTH, y: currHeldCC.y },  // Right
            { x: currHeldCC.x, y: currHeldCC.y - this.CC_HEIGHT }, // Up
            { x: currHeldCC.x, y: currHeldCC.y + this.CC_HEIGHT }  // Down
        ];
        
        // Find the first unoccupied position
        for (const pos of potentialPositions) {
            const posKey = `${pos.x},${pos.y}`;
            
            if (!occupiedPositions.has(posKey)) {
                blackboard.targetPosition = { x: pos.x, y: pos.y };
                
                return 'success';
            }
        }
        
        // If no adjacent space found, find any empty space near home coral
        return this.findFallbackPosition(blackboard, home, occupiedPositions);
    }
    
    findFallbackPosition(blackboard, home, occupiedPositions) {
        // Search in expanding rings around the home coral
        const maxRadius = 300;
        const step = 25;
        
        for (let radius = step; radius <= maxRadius; radius += step) {
            // Check positions in a circle around the coral
            for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
                const x = Math.round((home.x + Math.cos(angle) * radius) / step) * step;
                const y = Math.round((home.y + Math.sin(angle) * radius) / step) * step;
                const posKey = `${x},${y}`;
                
                if (!occupiedPositions.has(posKey)) {
                    blackboard.targetPosition = { x, y };
                    
                    return 'success';
                }
            }
        }
        
      
        return 'failure';
    }
}

class MoveToEmptyAdjacentSpace extends BTNode{
	tick(blackboard){
		const actor=blackboard.actor;
		const targetX=blackboard.targetPosition.x
		const targetY=blackboard.targetPosition.y;
		const dx = targetX - actor.x;
		const dy = targetY - actor.y;
		const distance = Math.sqrt(dx*dx + dy*dy);
		
		
		
				// Handle arrival
		if (distance < 5) {
		  
		loadCalciumCarbonate(calciumCarbonateArray.length+50);
		PIXI.Assets.load("./Pics/calciumCarb.png").then(texture => {
		limestoneTexture = texture;
		redrawRocksAndCoral(pixiWorld,limestoneTexture); 
		}).catch(err => console.error(err));
		  actor.hasCalciumCarbonate=false;
		  return "success";
		}
		
		// Handle zero distance case
		if (distance <= 0) {
		  
		  return "failure";
		}
		
		// Set movement direction
		actor.flipped = dx < 0;
		
		// Calculate normalized direction
		const directionX = dx/distance;
		const directionY = dy/distance;
		
		// Apply movement (fixed speed assignment)
		const moveSpeed = 3;
		actor.x += directionX * moveSpeed;
		actor.y += directionY * moveSpeed;
		
		// Calculate rotation
		actor.rotation = Math.atan2(dy, dx) * (180/Math.PI);
		
		
		return "running";
	}
	
}