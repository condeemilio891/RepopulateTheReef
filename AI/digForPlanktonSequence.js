// CRAB
class SeagrassSelectedCondition extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
		if(actor.currGatheringActor instanceof Seagrass){
			console.log("Seagrass Selected Condition HIt")
			
			return "success"
		}
		return "failure"
	}
}
class MoveToSeagrass extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
	const target = actor.currGatheringActor;
    if (actor.hasAlgae && !actor instanceof Crab ) return "failure"
    
	let result = moveToPosition(actor,target,7)
	actor.hasPlankton = false;
      actor.currGathering = true;
      actor.currStateText = "Moving to Seaweed";
      
	  return result;
		
	
  }
}
class GatherFromSeagrassAnim extends BTNode {
  constructor() {
    super();
    this.progress = 0;
    this.duration = 300;
    this.progressBar = new ProgressBarComponent(this.duration, "green");
  }

  tick(blackboard) {
    const actor = blackboard.actor;
    actor.currStateText = "Gathering From Seagrass";
    actor.isMoving = false;
    actor.isGathering = true;

    // Interrupt if attacked
    if (actor.attackTarget) {
      this.reset();
      return "failure";
    }

    // Stop if both resources are full
    if (actor?.plankton >= actor?.planktonCap && actor?.algae >= actor?.algaeCap) {
      actor.currStateText = "Capacity Full Right Click On\nCoral To Return Resources";
	  actor.isGathering=false;
      return "failure";
    }

    if (this.progress === 0) {
      actor.speedX = 0;
      actor.speedY = 0;
      this.progress = this.duration;
    }

    this.progressBar.update(this.progress);
    this.progressBar.draw(actor.x, actor.y);
    this.progress--;

    if (this.progress <= 0) {
      if (actor instanceof Seahorse) {  // or any specific type you want to handle first
        actor.hasPlankton = true;
        actor.currGatheringActor.consumePlankton(actor);
      } 
	  else if(actor instanceof Crab){
		  let gatherPlankton = false;
		  const planktonFull = actor.plankton >= actor.planktonCap;
		  const algaeFull   = actor.algae >= actor.algaeCap;

		  if (planktonFull && !algaeFull) {
			gatherPlankton = false;           // 100% algae
		  } else if (algaeFull && !planktonFull) {
			gatherPlankton = true;            // 100% plankton
		  } else {
			// both not full (or both full, but that's already blocked above)
			gatherPlankton = Math.random() < 0.5;
		  }

		  // Apply the chosen gathering
		  if (gatherPlankton) {
			let newPlankton = actor.plankton + actor.gatherRate;
			if (newPlankton > actor.planktonCap) newPlankton = actor.planktonCap;
			actor.plankton = newPlankton;
			//actor.hasPlankton = true;          // if needed by other systems But dont need for crab
			actor.currGatheringActor.consumePlankton(actor)
			console.log(`${actor.constructor.name} gathered plankton → ${actor.plankton}/${actor.planktonCap}`);
		  } else {
			let newAlgae = actor.algae + actor.gatherRate;
			if (newAlgae > actor.algaeCap) newAlgae = actor.algaeCap;
			actor.algae = newAlgae;
			//actor.hasAlgae = true; // dont need for crab 
			 actor.currGatheringActor.consumeAlgae(actor);
			console.log(`${actor.constructor.name} gathered algae → ${actor.algae}/${actor.algaeCap}`);
		  }
 
	  }

      actor.speedX = 3;
      actor.speedY = 3;
      this.reset();
      return "success";
    }
    return "running";
  }

  reset() {
    super.reset();
    this.progressBar.hide();
    this.progress = 0;
  }
}

//SHRIMP
class FindSeagrassLocation extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
    
    
    let targetSeagrass;  // declare outside scope silly boi 

    if (actor.currGatheringActor && actor.currGatheringActor instanceof Seagrass) {
      targetSeagrass = actor.currGatheringActor;
    } else {
      const seagrassInRange = getAllActorsInRadius(actor, seagrassArray);
      if (seagrassInRange.length === 0) {
        return "failure";
      }
      const randomIndex = Math.floor(Math.random() * seagrassInRange.length);
      targetSeagrass = seagrassInRange[randomIndex];
	  
	  if(targetSeagrass.beingUsed) return "failure"
	  
	  actor.currGatheringActor=targetSeagrass;
	  targetSeagrass.beingUsed=true;
    }
    
    // Now targetSeagrass is defined
    blackboard.targetDigPosition = {
      x: targetSeagrass.x,
      y: targetSeagrass.y,
      width: 3,
      height: 2
    };
    
    blackboard.currStateText = "Moving to Seagrass";
    return "success";
  }
}
class MoveAndRotateToDigLocationAction extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
    const target = blackboard.targetDigPosition;

    // Calculate direction vector
    const dx = target.x - actor.x;
    const dy = target.y - actor.y;
    const distance = Math.sqrt(dx*dx + dy*dy);
	
	
	actor.currStateText="Moving to seagrass"
	
	const result = moveToPosition(actor, target, 3, 7);
    return result;

  }
}

// begin gather


class DigForResourcesAnim extends BTNode {
  constructor() {
    super();
    this.progress = 0;
    this.duration = 1000;
    this.progressBar = new ProgressBarComponent(this.duration, "orange");
  }

  tick(blackboard) {
    const actor = blackboard.actor;
    actor.currStateText = "Gathering Resources";

    // Optional: interrupt if attacked (add if needed)
    // if (actor.attackTarget) { this.reset(); return "failure"; }

    if (this.progress === 0) {
      actor.speedX = 0;
      actor.speedY = 0;
      actor.isHidden = true;
      this.progress = this.duration;
    }

    this.progressBar.update(this.progress);
    this.progressBar.draw(actor.x, actor.y);
    this.progress--;

    if(this.progress <= 0) {
		// 50/50 chance
		if (Math.random() < 0.5) {
			actor.hasPlankton = true;
			console.log("currGatheringActor: ",actor.currGatheringActor);
			actor.currGatheringActor.consumePlankton(actor);
		} else {
			actor.hasAlgae = true;
			console.log("currGatheringActor: ",actor.currGatheringActor);
			actor.currGatheringActor.consumeAlgae(actor);
		}
      actor.speedX = 3;
      actor.speedY = 3;
      actor.isHidden = false;
	  actor.currGatheringActor.beingUsed=false;
      this.reset();
      return "success";
    }
    return "running";
  }

  reset() {
    super.reset();
    this.progressBar.hide();
    this.progress = 0;
  }
}

 // dont forget to add this as well 
 

class ReturnHomeDig extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
	
	
	const result = moveToPosition(actor, actor.home, 15);
	actor.currStateText="returning Home";
	   if (result === "success") {
		   
		if(actor.hasPlankton){
			actor.home.planktonStored += actor.gatherRate;
			actor.hasPlankton=false;
		}
		else if(actor.hasAlgae){
			actor.home.algaeStored+=actor.gatherRate;
			actor.hasAlgae=false;
			
		}
		actor.currGatheringActor=null;
		actor.x=actor.home.x;
		actor.y=actor.home.y;
	   }
	return result;
  }
}