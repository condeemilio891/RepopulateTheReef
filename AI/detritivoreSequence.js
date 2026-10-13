
1// borrow home need plankton decortator. 


class FindCarcass extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
    const acceptableRadius = 5000;

    // Filter jellyArray for dead jellyfish within radius
    const nearbyCarcasses = jellyfishArray.filter(jelly => 
      jelly.state==="dead" && Math.hypot(actor.x - jelly.x, actor.y - jelly.y) < acceptableRadius
    );

    // Optional: shuffle to avoid bias
    this.shuffleArray(nearbyCarcasses);

    if (nearbyCarcasses.length > 0) {
      // Choose one (random or closest – here random after shuffle)
      const targetCarcass = nearbyCarcasses[0]; // first after shuffle
      
      // Store target 

		actor.currGatheringActor=targetCarcass;

      return 'success';
    }

    return 'failure';
  }

  // Helper shuffle (same as in FindSponge)
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}



class MoveToCarcass extends BTNode{
	
	tick(blackboard){
		const actor =blackboard.actor;
		
		actor.currStateText="moving to carcass";
		const target=actor.currGatheringActor;
		
		const result = moveToPosition(actor,target,7)
		return result
    }
    

}

class GatherPlanktonFromCarcassAnim extends BTNode {
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


// use anim from gather for now? 