class HasAttackTargetCondition extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
		if(actor.attackTarget){
			console.log("Has Attack Target");
			return "success"
		}
		return "failure"
	}
}


//decorators maybe just make a bunch of conditions 

class CheckForAttackTargetDecorator extends BTNode {
  constructor(child) {
    super();
    this.children = [child];	// Decorator wraps a single child
	this.enemies=[];// for now just use jelly but you need to generalize 
  }

  tick(blackboard) {
    const actor = blackboard.actor;
		
		if(actor.attackTarget){
			if(actor.attackTarget.health<=0){
				return 'failure';
			}
			if(actor.attackTarget.isHiding){
				console.log("target is hiding");
				return 'failure';
			}
		}
		if(actor.attackTarget !== null){
			
			return this.children[0].tick(blackboard);
		}

    // Condition failed: abort child
   // this.children[0].reset(); // I dont think we need to reset just return fail to
    return 'failure';
  }
}




class IsBeingAttackedDecorator extends BTNode{
	constructor(child){
		super();
		this.children=[child];
	}
	tick(blackboard){
		const actor=blackboard.actor;
		if(actor.attackTarget!==null){// abstract to other creatures
			return this.children[0].tick(blackboard);
		}
		//console.log("decorator failure")
		return "failure";
	}
}




//for AI 

class DetectPlayerActors extends BTNode { 
  tick(blackboard) {
    const actor = blackboard.actor;
	// combine all player actors
	
	const playerActors = [...PCArray];
	
	
    // get Nearby player actors 

		const nearbyPlayerActors = getAllActorsInRadius(actor, playerActors);
		if(nearbyPlayerActors.length<=0) return "failure";
		// Sort by closest first
		nearbyPlayerActors.sort((a, b) => {
		  const distA = Math.hypot(actor.x - a.x, actor.y - a.y);
		  const distB = Math.hypot(actor.x - b.x, actor.y - b.y);
		  return distA - distB;   // positive if a is farther, negative if closer
		});

		// Now the first element is the closest
			const closestPlayer = nearbyPlayerActors[0];
			actor.currStateText="Enemy Detected."
			actor.attackTarget = closestPlayer;
		    if(actor.attackTarget.isHiding){
				actor.attackTarget=null;
				return "failure";
			} 
			if(!actor.attackTarget.isAlive){
				actor.attackTarget=null;
				return "failure";
			}
		  return 'success';
		}
		
}


// for Player char 

class DetectEnemy extends BTNode { 
  tick(blackboard) {
    const actor = blackboard.actor;
    if(actor.attackTarget){
		return "success";
	}
	// combine all Enemies
	
	const enemies = [...jellyfishArray];
	
	
    // get Nearby player actors 

		const nearbyPlayerActors = getAllActorsInRadius(actor, enemies);
		if(nearbyPlayerActors.length<=0) return "failure";
		// Sort by closest first
		nearbyPlayerActors.sort((a, b) => {
		  const distA = Math.hypot(actor.x - a.x, actor.y - a.y);
		  const distB = Math.hypot(actor.x - b.x, actor.y - b.y);
		  return distA - distB;   // positive if a is farther, negative if closer
		});

		// Now the first element is the closest
			const closestEnemy = nearbyPlayerActors[0];
			actor.currStateText="Enemy Detected."
			actor.attackTarget = closestEnemy;

			if(!actor.attackTarget.isAlive){
				actor.attackTarget=null;
				return "failure";
			}
		  return 'success';
		}
		
}
 


class MoveAndRotateToAttackTargetAction extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
    const attackTarget=actor.attackTarget;
    const speed = actor.maxSpeedX;
	
	
	actor.currStateText="Targeting "+ attackTarget.name;
	
	if(!attackTarget){
		return "failure"
	}
	if(attackTarget.isHiding){
		actor.speedX=actor.maxSpeedX;
		actor.speedY=actor.maxSpeedY;
		actor.attackTarget=null;
		return "failure"
	}
	const result = moveToPosition(actor, attackTarget,20);
		if(result=="success"){
			attackTarget.attackTarget=actor;
			return result;
		}
	return result;
  }
}

class AttackTargetAnim extends BTNode {
  constructor() {
    super();
    this.attackProgress = 0;
    this.initialGatherTime = 10; // attack speed?? 
	this.progressBar = new ProgressBarComponent(50,"red");
  }

  tick(blackboard) {

    const actor = blackboard.actor;
	if(!actor.attackTarget){
		return "failure";
	}
	
	createNotification(warningImg, actor.attackTarget.name+ " Is Being Attacked By "+actor.name, priority = "normal");
	
	actor.currStateText = "Attacking " + actor.attackTarget.name;
	
	alertText= actor.attackTarget.name+ " is Being Attacked!"
	
	actor.isAttacking=true;

    if (this.attackProgress === 0) {
      actor.speedX = 0;
      actor.speedY = 0;
      this.attackProgress = this.initialGatherTime; // Use local value, not actor.gatherTime
    }
	// Update progress bar
    this.progressBar.update(this.attackProgress);
	this.progressBar.draw(actor.x, actor.y);// draw function
    
    // Draw relative to actor position (even when hidden)
    if (this.attackProgress > 0) {
      this.progressBar.draw(actor.x, actor.y);
    }
    this.attackProgress--;
	
	if(actor.attackTarget.isDying|| actor.health<=0||!actor.attackTarget.isAlive){
		actor.attackTarget=null;
		actor.isAttacking=false;
		this.reset();
		return "failure";
	}
	

    if (this.attackProgress <= 0) {
	
	 
      actor.applyDamage(actor.attackTarget);//attack damage and enemy as params
		actor.isAttacking=false	  
		//actor.attackTarget.state="reset";
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
    this.attackProgress = 0; // Reset progress for next use
  }
}

class MoveAndRotateToFireProjectileAction extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
    const attackTarget=actor.attackTarget;
    const speed = actor.maxSpeedX;
	
	
	actor.currStateText="Targeting "+ attackTarget.name;
	
	if(!attackTarget){
		return "failure"
	}
	if(attackTarget.isHiding){
		actor.speedX=actor.maxSpeedX;
		actor.speedY=actor.maxSpeedY;
		actor.attackTarget=null;
		return "failure"
	}
	const result = moveToPosition(actor, attackTarget,150);
		if(result=="success"){
			attackTarget.attackTarget=actor;

			return result;
		}
	return result;
  }
}

class AttackTargetAnimProjectile extends BTNode {
  constructor() {
    super();
    this.attackProgress = 0;
    this.initialGatherTime = 10; // attack speed?? 
	this.progressBar = new ProgressBarComponent(20,"red");
  }

  tick(blackboard) {
    const actor = blackboard.actor;
	
	actor.currStateText = "Attacking " + actor.attackTarget.name;
	
	alertText= actor.attackTarget.name+ " is Being Attacked!"
	
	
	if(!actor.attackTarget){
		return "failure";
	}
    if (this.attackProgress === 0) {
      actor.speedX = 0;
      actor.speedY = 0;
      this.attackProgress = this.initialGatherTime; // Use local value, not actor.gatherTime
	  
    }
	// Update progress bar
    this.progressBar.update(this.attackProgress);
	this.progressBar.draw(actor.x, actor.y);// draw function
    
    // Draw relative to actor position (even when hidden)
    if (this.attackProgress > 0) {
      this.progressBar.draw(actor.x, actor.y);
    }
    this.attackProgress--;
	
	if(actor.attackTarget.isDying|| actor.health<=0||!actor.attackTarget.isAlive){
		actor.attackTarget=null;
		return "failure";
	}
	

    if (this.attackProgress <= 0) {
	
		spawnBubbleProjectile(actor.x,actor.y,bubbleImg)
		spawnBubbleProjectile(actor.attackTarget.x,actor.attackTarget.y,bubbleImg)
      actor.applyDamage(actor.attackTarget);//attack damage and enemy as params
			  
		//actor.attackTarget.state="reset";
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
    this.attackProgress = 0; // Reset progress for next use
  }
}