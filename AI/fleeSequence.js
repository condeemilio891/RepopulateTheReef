class DetectHostileActors extends BTNode { 
  tick(blackboard) {
    const actor = blackboard.actor;
    const acceptableRadius = 750;

	// combine all player actors
	
	const hostileActors = [...jellyfishArray];
	
	
    // get Nearby player actors 
    const nearbyHostileActors = hostileActors.filter(hostileActor => {
      const dx = actor.x - hostileActor.x;
      const dy = actor.y - hostileActor.y;
      return Math.hypot(dx, dy) < acceptableRadius; 
    });



    if (nearbyHostileActors.length > 0) {

		actor.attackTarget=nearbyHostileActors[0];
		if(!actor.attackTarget.isAlive){
			actor.attackTarget=null;
			return 'failure'
		}
		console.log("hostileActor detected")
		return 'success';
	  }else{
		  actor.attackTarget=null;
	  }
    
    return 'failure';
  }

  
}

class ReturnHomeHide extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
   const home = actor.home; 

   actor.currStateText="Running Away"
   
    // Guard clause for invalid home
   // if (!actor.home) return "failure";
	//if (!actor.attackTarget) return "failure";
    
	const result = moveToPosition(actor, home, 15);
	
	
	console.log(result)

	return result;
  }
}




class HideUntilSafe extends BTNode {
  constructor(hideDuration = 500) {
    super();
    this.hideDuration = hideDuration;
    this.hideProgress = 0;
    this.progressBar = new ProgressBarComponent(hideDuration, "blue");
  }

  tick(blackboard) {
    const actor = blackboard.actor;
	
	actor.currStateText="Hiding"
    // Start hiding if not already doing so
    if (this.hideProgress === 0) {
      actor.speedX = 0;
      actor.speedY = 0;
      actor.isHiding = true;
      actor.currStateText = "hiding";
      this.hideProgress = this.hideDuration;
    }

    // Update and draw progress bar
    this.progressBar.update(this.hideProgress);
    this.progressBar.draw(actor.x, actor.y);

    this.hideProgress--;

    // Check if hiding is complete
    if (this.hideProgress <= 0) {
      // Reset actor state
      actor.isHiding = false;
      actor.speedX = 3;
      actor.speedY = 3;
      actor.currStateText = "idle";
      this.reset();
      return "success";
    }

    return "running";
  }

  reset() {
    super.reset();
    this.hideProgress = 0;
    this.progressBar.hide();
  }
}