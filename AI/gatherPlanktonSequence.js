//selectors 

class HasResourceCondition extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
		if(actor.hasPlankton || actor.hasCalciumCarbonate||actor.hasAlgae){
			return "success"
		}
		return "failure"
	}
}


// decorator 
class HomeNeedsPlanktonDecorator extends BTNode { //
  constructor(child) {
    super();
    this.children = [child];
    this.childRunning = false; // track if child is active
  }

  tick(blackboard) {

    const actor = blackboard.actor;
	//we will need all the resources maybe I just OR it 
    // --- INTERRUPT CONDITION (hostile detected) ---
    if (actor.attackTarget && actor.attackTarget.isAlive) {
      if (this.childRunning) {
        // Abort the running child
        this.children[0].reset();
        this.childRunning = false;
      }
      return 'failure'; // let selector try other branches (e.g., flee)
    }

    // --- CHILD IS ALREADY RUNNING ---
    if (this.childRunning) {
      const result = this.children[0].tick(blackboard);
      if (result !== 'running') {
        this.childRunning = false; // child finished
      }
      return result;
    }

    // --- TRY TO START CHILD (condition check) ---
    if (actor.home.planktonStored <= actor.home.planktonStorageCap) {
      blackboard.currStateText = "Gathering Plankton";
      const result = this.children[0].tick(blackboard);
      if (result === 'running') {
        this.childRunning = true;
      }
      return result;
    }
	

    return 'failure';
  }

  reset() {
    super.reset();
    this.childRunning = false;
    this.children[0].reset();
  }
}

class FindSponge extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;

    let targetSponge;

    if (actor.currGatheringActor && actor.currGatheringActor instanceof Sponge) {
      targetSponge = actor.currGatheringActor;
    } else {
      const spongeInRange = getAllActorsInRadius(actor, spongeArray);
      if (spongeInRange.length === 0) {
        return "failure";
      }
      // Filter out sponges that are being used
      const availableSponges = spongeInRange.filter(sponge => !sponge.beingUsed);
      if (availableSponges.length === 0) {
        return "failure";
      }
      const randomIndex = Math.floor(Math.random() * availableSponges.length);
      targetSponge = availableSponges[randomIndex];
    }

    actor.currGatheringActor = targetSponge;
    blackboard.currStateText = "Moving to Sponge";
    return "success";
  }
}

// begin gather

class MoveToSponge extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
    const target = actor.currGatheringActor;
    if (actor.hasPlankton) return "failure"; 
	
		actor.hasAlgae = actor.hasAlgae ? false : false;
      actor.currGathering = true;
	  actor.currStateText = "Moving to Sponge"
      target.beingUsed=true;
	  const result = moveToPosition(actor, target, 7);
	  
	  return result;
     
  }
}


class GatherPlanktonFromSpongeAnim extends BTNode {
  constructor() {
    super();
    this.gatherProgress = 0;
    this.initialGatherTime = 300; 
	this.progressBar = new ProgressBarComponent(300,"orange");
  }

  tick(blackboard) {
    const actor = blackboard.actor;
	actor.currStateText = "Gathering Plankton"
	
    if (this.gatherProgress === 0) {
      actor.speedX = 0;
      actor.speedY = 0;
	  actor.isHidden=true;
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
      actor.hasPlankton = true;
      actor.currGatheringActor.consumePlankton();
      actor.speedX = 3;
      actor.speedY = 3;
	  actor.isHidden=false;
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



class ReturnHomeGatherPlankton extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
	const home = actor.home;
    actor.currStateText = "Returning Plankton"
    // Guard clause for invalid home
    if (!home) return "failure";
	
	const result = moveToPosition(actor, home, 20);
	
	if(result==="success"){
		actor.home.planktonStored += actor.gatherRate;
      actor.hasPlankton = false;
	  actor.currGatheringActor.beingUsed=false;
      actor.x = home.x; // Snap to exact position  SHOULD I NULL OUT CURR GATHERING ACTOR?
      actor.y = home.y;
	}
	
    return result;

    
  }
}