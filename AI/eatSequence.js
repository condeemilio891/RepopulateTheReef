//conditional nodes

class IsHungryCondition extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
		if(actor.hunger<50){
			console.log("Is Hungry Condition hit")
			return "success"
		}
		return "failure"
	}
}

class IsHungryORIsBeingAttackedCondition extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
		if(actor.hunger<50){
		
			return "success"
		}
		if(actor.attackTarget){
			console.log("Conditional HIt")
			return "success"
		}
		return "failure"
	}
}



// decorator
class LockActionDecoratorEat extends BTNode {
  constructor(child) {
    super();
    this.children = [child];
    this.locked = false;
  }

  tick(blackboard) {
	  const actor = blackboard.actor;
	 // check for attack while locked 
	 
	if(actor.attackTarget){
		this.locked=false;
		this.children[0].reset();
		return "failure"; // move selector down
	}
    if (this.locked) {
      const result = this.children[0].tick(blackboard);
      if (result !== 'running') this.locked = false;
      return result;
    }
    return 'failure';
  }

  reset() {
    super.reset();
    this.locked = false;
    this.children[0].reset();
  }
}

class EatAction extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
	const home = actor.home;
    
    // Guard clause for invalid home
    if (!actor.home) return "failure";
	
	actor.currStateText = "Eating";

  }
}

class EatAnim extends BTNode {
  constructor() {
    super();
    this.eatingProgress = 0;
  }

  tick(blackboard) {
    const actor = blackboard.actor;
    if (this.eatingProgress === 0) {
      // Initialize eating
      actor.isEating = true;
      actor.speedX = 0;
      actor.speedY = 0;
      actor.animationSpeed = 20;
      this.eatingProgress = actor.eatTime; // Total eating duration
    }

    // Decrement progress
    this.eatingProgress--;

    // Update actor state
    actor.eatTime = this.eatingProgress;

    if (this.eatingProgress <= 0) {     // should I check if home has enough food?
      // Reset state
      actor.isEating = false;
      actor.animationSpeed = 3;
	  actor.hunger=100;
	  if(actor.diet==="filterFeeder"){
		  actor.home.planktonStored-=2;
		  actor.home.algaeStored-=2;		  
	  }
	  else if(actor.diet==="omnivore"){
		  actor.home.planktonStored-=5;
		  actor.home.algaeStored-=5;		  
	  }
	  else if(actor.diet==="carnivore"){
		  actor.home.planktonStored-=10;
		  	  
	  }
	  else if(actor.diet==="herbivore"){
		  
		  actor.home.algaeStored-=10;		  
	  }else{
		  console.warn("error: diet not found")
	  }
      this.reset();
      return 'success';
    }

    return 'running';
  }

  reset() {
    super.reset();
    this.eatingProgress = 0;
  }
}