class LockActionDecoratorSleep extends BTNode {
  constructor(child) {
    super();
    this.children = [child];
    this.locked = false;
  }

  tick(blackboard) {
	  const actor = blackboard.actor;
	 // check for attack while locked 
	 
	if(this.locked && this.isBeingAttacked(actor)){
		this.locked=false;
		this.children[0].reset();
		return "failure"; // move selector down
	}
    if (this.locked) {
      const result = this.children[0].tick(blackboard);
      if (result !== 'running') this.locked = false;
      return result;
    }

    const shouldStart = blackboard.actor.stamina <= 20;
    if (shouldStart) {
      this.locked = true;
	  blackboard.currStateText="Resting";
      return this.children[0].tick(blackboard);
    }
    return 'failure';
  }

  reset() {
    super.reset();
    this.locked = false;
    this.children[0].reset();
  }
}

class ReturnHomeRest extends BTNode {
  tick(blackboard) {
	  
    const actor = blackboard.actor;
    
    // Guard clause for invalid home
    if (!actor.home) return "failure";

     const dx = actor.home.x - actor.x;
    const dy = actor.home.y - actor.y;
    const distance = Math.hypot(dx, dy);

    // Check arrival first
    if (distance < 10) {
     actor.x = actor.home.x;
      actor.y = actor.home.y
      return "success";
    }

    // Handle movement
    if (distance > 0) {
      const directionX = dx / distance;
      const directionY = dy / distance;

      actor.speedX = 3 * directionX;
      actor.speedY = 3 * directionY;
      
      actor.x += actor.speedX;
      actor.y += actor.speedY;

      // Update rotation
      actor.flipped = dx < 0;
      const absDx = Math.abs(dx);
      actor.rotation = Math.atan2(dy, absDx) * (180 / Math.PI);
    }

    // Return running until we arrive
    return "running";
  }
}

class Rest extends BTNode {
  constructor() {
    super();
    this.restingProgress = 0;
  }

  tick(blackboard) {
    const actor = blackboard.actor;
    
    if (this.restingProgress === 0) {
      // Initialize resting
      actor.isResting = true;
      actor.hasAlgae = false;
      actor.speedX = 0;
      actor.speedY = 0;
      actor.animationSpeed = 20;
      this.restingProgress = actor.restTime; // Total eating duration
    }

    // Decrement progress
    this.restingProgress--;

    // Update actor state
    actor.restTime = this.restingProgress;
	console.log(this.restingProgress)
    if (this.restingProgress <= 0) {
      // Reset state
      actor.isResting = false;
      actor.animationSpeed = 3;
	  actor.stamina=100;
	  actor.hunger=100;
      this.reset();
      return 'success';
    }

    return 'running';
  }

  reset() {
    super.reset();
    this.restingProgress = 0;
  }
}