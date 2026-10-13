class ResourcesNearDecorator extends BTNode { // add seagrass or make it into more specifi\c node 
  tick(blackboard) {
    const actor = blackboard.actor;
    const acceptableRadius = 1000;
    
    const nearbySeaweeds = seaweedArray.filter(seaweed => {
      const dx = actor.x - seaweed.x;
      const dy = actor.y - seaweed.y;
      return Math.hypot(dx, dy) < acceptableRadius;
    });

    return nearbySeaweeds.length === 0 ? 'success' : 'failure';
  }
}


class GrazePlanktonAnim extends BTNode{
	constructor(){
		super();
		this.huntProgress=0;
		this.initialHuntTime=1000;
		this.progressBar=new ProgressBarComponent(1000,"orange");
	}
	
	tick(blackboard){
		const actor = blackboard.actor;
		
		
		actor.currStateText = "Grazing" //+currGatheringActor??
		if(this.huntProgress===0){
		  actor.speedX = 0;
		  actor.speedY = 0;
		  this.huntProgress = this.initialHuntTime; // Use local value, not actor.gatherTime
		}
		// Update progress bar
		this.progressBar.update(this.huntProgress);
		this.progressBar.draw(actor.x, actor.y);// draw function
		
	    if (this.huntProgress > 0) {
      this.progressBar.draw(actor.x, actor.y);
    }
    this.huntProgress--;

    if (this.huntProgress <= 0) {
		let huntingSuccess=false; 
		if(Math.floor(Math.random() * 100) + 1 > 100 - actor.percentHuntingChance){
			actor.hasPlankton = true;
			actor.currGatheringActor.consumePlankton(actor);
			actor.speedX = 3;
			actor.speedY = 3;
			actor.hunger+=1;
			return "running";
			this.reset();
		}else{
			console.log("Grazing Failed ");
			return "running";
			this.reset();
			}
		}
		return "running";
	}
	  reset() {
    super.reset();
	this.progressBar.hide();
    this.gatherProgress = 0; // Reset progress for next use
  }
}