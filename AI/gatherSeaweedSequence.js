class SeaweedSelectedCondition extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
		if(actor.currGatheringActor instanceof Seaweed){
			actor.isMoving=true;
			
			return "success"
		}
		return "failure"
	}
}



class FindSeaweed extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;

    let targetSeaweed;
	
    if (actor.currGatheringActor && actor.currGatheringActor instanceof Seaweed) {
      targetSeaweed = actor.currGatheringActor;
    } else {
      const seaweedInRange = getAllActorsInRadius(actor, seaweedArray);
	  
      if (seaweedInRange.length === 0) {
        return "failure";
      }
      const randomIndex = Math.floor(Math.random() * seaweedInRange.length);
      targetSeaweed = seaweedInRange[randomIndex];
    }
	
    actor.currGatheringActor = targetSeaweed;
    blackboard.currStateText = "Looking for seaweed";
	
    return "success";
  }
}

// begin gather

class MoveToSeaweed extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
	const target = actor.currGatheringActor;
    //if (actor.hasAlgae && !actor instanceof Crab ) return "failure"

	let result = moveToPosition(actor,target,7)
	actor.hasPlankton = false;
      actor.currGathering = true;
      actor.currStateText = "Moving to Seaweed";
      actor.isMoving=true;
	  return result;
		
	
  }
}

class GatherFromSeaweedAnim extends BTNode {
  constructor() {
    super();
    this.progress = 0;
    this.duration = 300;
    this.progressBar = new ProgressBarComponent(this.duration, "green");
  }

  tick(blackboard) {
    const actor = blackboard.actor;
    actor.currStateText = "Gathering Resources";
	actor.isMoving=false;
	actor.isGathering=true;
    // Interrupt if attacked
    if (actor.attackTarget) {
      this.reset();
      return "failure";
    }
	
    // Stop if both resources are full
    if (actor?.plankton >= actor?.planktonCap && actor?.algae >= actor?.algaeCap) {
      actor.currStateText = "Capacity Full Right Click On\nCoral To Return Resources";
	  actor.isGathering=false;
	  actor.currGatheringActor=null;
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
      
	        if(actor instanceof Seahorse){ // or any carnivore
			  actor.hasPlankton=true;
			  actor.currGatheringActor.consumePlankton(actor);
			}else{
					if (Math.random() < 0.5) {
						if(actor instanceof Crab){
							if(actor.plankton<=actor.planktonCap){
								actor.plankton+=actor.gatherRate;
								
								if(actor.plankton>=actor.planktonCap){
									actor.plankton=actor.planktonCap
									actor.isGathering=false;
									return "success"
								}
							}
						}
						actor.hasPlankton = true;
						console.log("currGatheringActor: ",actor.currGatheringActor);
						actor.currGatheringActor.consumePlankton(actor);
				} else {
						if(actor instanceof Crab){
							if(actor.algae<=actor.algaeCap){
								actor.algae+=actor.gatherRate;
								
								if(actor.algae>=actor.algaeCap){
									actor.algae=actor.algaeCap;
									actor.isGathering=false;
									return "success";
								}
							}
						}
						actor.hasAlgae = true;
						console.log("currGatheringActor: ",actor.currGatheringActor);
						actor.currGatheringActor.consumeAlgae(actor);
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


class HuntPlanktonAnim extends BTNode { // save for carnivore
  constructor() {
    super();
    this.progress = 0;
    this.duration = 500;
    this.progressBar = new ProgressBarComponent(this.duration, "orange");
  }

  tick(blackboard) {
    const actor = blackboard.actor;
    actor.currStateText = "Hunting for Plankton";

    // Interrupt if attacked (optional)
    // if (actor.attackTarget) { this.reset(); return "failure"; }

    if (this.progress === 0) {
      actor.speedX = 0;
      actor.speedY = 0;
      this.progress = this.duration;
    }

    this.progressBar.update(this.progress);
    this.progressBar.draw(actor.x, actor.y);
    this.progress--;

    if (this.progress <= 0) {
      // Hunting chance
      const success = Math.random() * 100 <= actor.percentHuntingChance;
      if (success) {
        actor.hasPlankton = true;
        actor.currGatheringActor.consumePlankton(actor);
        actor.speedX = 3;
        actor.speedY = 3;
        this.reset();
        return "success";
      } else {
        // Hunt failed – actor gives up and can try something else
        actor.speedX = 3;
        actor.speedY = 3;
        this.reset();
        return "failure";   // NOT "running" – prevents infinite loop
      }
    }
    return "running";
  }

  reset() {
    super.reset();
    this.progressBar.hide();
    this.progress = 0;
  }
}

class ReturnHomeGatherSeaweed extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
	const home = actor.home;
    actor.currStateText = "Returning Seaweed";

/*     // Interrupt if attacked
    if (actor.attackTarget) {
      return "failure";  // let selector go to flee
    } */

    //if (!actor.home) return "failure";

	
	const result= moveToPosition(actor,home,5);
	
    if (result === "success") {
		if(actor.hasAlgae){
			actor.home.algaeStored += actor.gatherRate;
			actor.hasAlgae = false;
		}
		else if(actor.hasPlankton){
			actor.home.planktonStored += actor.gatherRate;
			actor.hasPlankton=false
		}
		else{
			console.warn("Not Carrying Algae or Plankton")
		}

      actor.x = home.x;
      actor.y = home.y;
      
    }
	
	return result;

  }
}
class UnloadAlgaeAnim extends BTNode {
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

    if (actor.algae <= 0) {
      actor.currStateText = "No Algae to Unload";
      //this.reset();
	  actor.isGathering=false;
      return "failure";
    }

    actor.currStateText = "Unloading Algae";
	actor.isGathering=true //maybe get a returning anim or loop it backwards? 
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

    while(actor.algae>0){

		// Get real coral (in case it's an array)
		let realCoral = coral;
		if (Array.isArray(realCoral)) realCoral = realCoral[0];
		if (!realCoral) {
		  console.warn("UnloadRocksAnim: no valid coral");
		  return "failure";
		}
		realCoral.algaeStored+=actor.gatherRate;
		actor.algae-=actor.gatherRate;
		alertText="Algae Unloaded"
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

class UnloadPlanktonAnim extends BTNode {
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

    if (actor.plankton <= 0) {
      actor.currStateText = "No Plankton to Unload";
      //this.reset();
	  actor.isGathering=false;
      return "failure";
    }

    actor.currStateText = "Unloading Plankton";
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

    while(actor.plankton>0){

		// Get real coral (in case it's an array)
		let realCoral = coral;
		if (Array.isArray(realCoral)) realCoral = realCoral[0];
		if (!realCoral) {
		  console.warn("UnloadRocksAnim: no valid coral");
		  return "failure";
		}
		realCoral.planktonStored+=actor.gatherRate;
		actor.plankton-=actor.gatherRate;
		alertText="Plankton Unloaded"
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