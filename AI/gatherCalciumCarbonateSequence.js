
class RocksSelectedCondition extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
		if(actor.currGatheringActor instanceof Rocks){
			console.log("Rocks Selected Condition HIt")
			actor.currStateText="Rocks Selected"
			return "success"
		}
		return "failure"
	}
}

class CoralSelectedCondition extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
		if(actor.currGatheringActor instanceof BrainCoral || actor.currGatheringActor instanceof OrganPipeCoral || actor.currGatheringActor instanceof FingerCoral){
			console.log("BrainCoral Selected Condition HIt")
			
			return "success"
		}
		return "failure"
	}
}






class FindRocks extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;

    let targetRocks;

    if (actor.currGatheringActor && actor.currGatheringActor instanceof Rocks) {
      targetRocks = actor.currGatheringActor;
    } else {
      const rocksInRange = getAllActorsInRadius(actor, rocksArray);
      if (rocksInRange.length === 0) {
        return "failure";
      }
      // Filter out sponges that are being used
      const availableRocks = rocksInRange.filter(rocks => !rocks.beingUsed);
      if (availableRocks.length === 0) {
        return "failure";
      }
      const randomIndex = Math.floor(Math.random() * availableRocks.length);
      targetRocks = availableRocks[randomIndex];
    }

    actor.currGatheringActor = targetRocks;
    blackboard.currStateText = "Moving to Rocks";
    return "success";
  }
}


class MoveToRocks extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
    const target = actor.currGatheringActor;
    
	
      actor.currGathering = true;
	  actor.currStateText = "Moving to Rock"
      target.beingUsed=true;
	  const result = moveToPosition(actor, target, target.width+20);
	  
	  return result;
     
  }
}

class GatherLimestoneFromRocksAnim extends BTNode {
  constructor() {
    super();
    this.gatherProgress = 0;
    this.initialGatherTime = 750; //gather SPeed? 
	this.progressBar = new ProgressBarComponent(750,"orange");
  }

  tick(blackboard) {
    const actor = blackboard.actor;
	
	if(actor.calciumCarbonateArray.length>=actor.carryingCapacity){
		actor.currStateText="Carrying Capacity Exceeded\nRight Click On Coral To\nReturn Limestone";
		actor.isGathering=false;
		this.reset();
		return "failure";//
	}
	if(actor.currGatheringActor.calciumCarbonate<=0){
		actor.currStateText="LimeStone Depleted\nRight Click On Coral To\nReturn Limestone";
		actor.isGathering=false;
		this.reset();
		return "failure";
	}
	
	actor.currStateText = "Gathering Limestone"
	actor.isGathering=true;
    if (this.gatherProgress === 0) {
      actor.speedX = 0;
      actor.speedY = 0;
      this.gatherProgress = this.initialGatherTime; // Use local value, not actor.gatherTime
    }
	// Update progress bar
    this.progressBar.update(this.gatherProgress);
	this.progressBar.draw(actor.x, actor.y);// draw function
    
    // Draw relative to actor position (even when hidden)
    if (this.gatherProgress > 0) {
      this.progressBar.draw(actor.x, actor.y);
    }
    this.gatherProgress--;

    if (this.gatherProgress <= 0) {
		
		//let i =actor.carryingCapacity; // upgrade use this to do 2 or 3 at a time 
		//while (i>0){
			let newCC = new CalciumCarbonate(actor.x,actor.y)
			actor.calciumCarbonateArray.push(newCC);
			//i--
		//}
      
      actor.currGatheringActor.consumeCalciumCarbonate(actor);
      actor.speedX = actor.maxSpeedX; 
      actor.speedY = actor.maxSpeedY;
	  console.log("ccArrayCarry: ", actor.calciumCarbonateArray);
	  actor.isGathering=false;
      this.reset();
      return "success";
    }

    return "running";
  }

  reset() {
    super.reset();
	
	this.progressBar.hide();
    this.gatherProgress = 0; // Reset progress for next use
  }
}

class LocateHardCoral extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;

    let targetCoral;
	if(targetCoral instanceof BrainCoral||targetCoral instanceof OrganPipeCoral || targetCoral instanceof FingerCoral){
	    actor.currGatheringActor = targetCoral;
		blackboard.currStateText = "Moving to Coral";
		return "success";	
	}else{
		const coralInRange = getAllActorsInRadius(actor, coralArray);// if this works exclude soft coral anemone
		  if (coralInRange.length === 0) {
			return "failure";
		  }
		  targetCoral=coralInRange
	}

	
	

    actor.currGatheringActor = targetCoral;
	console.log("currGatheringActor ", actor.currGatheringActor)
    blackboard.currStateText = "Moving to Coral";
    return "success";
  }
}

class MoveToCoral extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
    let target = actor.currGatheringActor; // this is returning array but why
    
    // If target is an array, take the first element (or handle accordingly)
    if (Array.isArray(target)) {
      target = target[0];
    }
    
    console.log("targetX ", target?.x);
    console.log("targetY ", target?.y);
    
    if (!target) return "failure";
    actor.currStateText = "Moving to Coral";
    const result = moveToPosition(actor, target, target.width || 300);
    return result;
  }
}

class UnloadRocksAnim extends BTNode {
  constructor() {
    super();
    this.gatherProgress = 0;
    this.initialGatherTime = 250; // frames to unload
    this.progressBar = new ProgressBarComponent(250, "green");
  }

  tick(blackboard) {
    const actor = blackboard.actor;
    const coral = actor.currGatheringActor;

    if (!coral) {
      console.warn("UnloadRocksAnim: no target");
      return "failure";
    }

    if (actor.calciumCarbonateArray.length <= 0) {
      actor.currStateText = "No Limestone to Unload";
      //this.reset();
	  actor.isGathering=false;
      return "failure";
    }

    actor.currStateText = "Unloading Limestone";
	actor.isGathering=true;
    // Start progress bar
    if (this.gatherProgress === 0) {
      actor.speedX = 0;
      actor.speedY = 0;
      this.gatherProgress = this.initialGatherTime;
    }

    // Update and draw progress bar
    this.progressBar.update(this.gatherProgress);
    this.progressBar.draw(actor.x, actor.y);

    this.gatherProgress--;

    // Still unloading
    if (this.gatherProgress > 0) {
      return "running";
    }

    while(actor.calciumCarbonateArray.length>0){
    let poppedStone = actor.calciumCarbonateArray.pop();
		console.log("poppedStone ", poppedStone);

		// Get real coral (in case it's an array)
		let realCoral = coral;
		if (Array.isArray(realCoral)) realCoral = realCoral[0];
		if (!realCoral) {
		  console.warn("UnloadRocksAnim: no valid coral");
		  return "failure";
		}

		const minX = realCoral.x;
		const maxX = realCoral.x + realCoral.width;
		poppedStone.x = minX + Math.random() * (maxX - minX);
		poppedStone.y=realCoral.y+realCoral.height;
		realCoral.calciumCarbonateArray.push(poppedStone);

		// Optional: call consume method if needed
	/*     if (typeof realCoral.consumeCalciumCarbonate === 'function') {
		  realCoral.consumeCalciumCarbonate(actor);
		} */

		console.log("ccArrayCarry: ", actor.calciumCarbonateArray);
		return "running";
	}
    // Restore movement speed
    actor.speedX = actor.maxSpeedX || 3;
    actor.speedY = actor.maxSpeedY || 3;

    this.reset();
    return "success";
  }

  reset() {
    super.reset();
    if (this.progressBar) this.progressBar.hide();
    this.gatherProgress = 0;
  }
}