
class AnemoneSelectedCondition extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
		if(actor.currGatheringActor instanceof Anemone){
			return "success";
		}
		return "failure"
	}
}
class AnemoneBeingPlacedCondition extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
		if(actor.isPlacingAnemone){
			console.log("AnemoneBeingPlacedCondition")
			return "success";
		}
		return "failure"
	}
}
class OverLimestoneCondition extends BTNode {
    tick(blackboard) {
        const actor = blackboard.actor;
        
        // Check if actor is over limestone RIGHT NOW
        const isOverLimestone = checkActorOverLimestone(actor);
        
        if (isOverLimestone) {
            console.log("✅ Over limestone!");
            return "success";
        } else {
            console.log("❌ Not over limestone!");
            actor.currStateText = "Cancelled: Anemone Must be\non Limestone!";
            actor.isPlacingAnemone = false; // Cancel the placement
            return "failure";
        }
    }
}
class EnoughCoralCapacityCondition extends BTNode {
    tick(blackboard) {
        const actor = blackboard.actor;
        
        const currentUsage = resourceData.coralCapacity.total || 0;
        const maxCapacity = resourceData.coralCapacity.totalCapacity || 0;
        
        // If maxCapacity is 0 or undefined, something is wrong
        if (maxCapacity <= 0) {
            console.warn("⚠️ Coral capacity not initialized!");
            actor.currStateText = "Error: Coral Capacity Not Set!";
            return "failure";
        }
        
        // Check if we have room
        if (currentUsage < maxCapacity) {
            console.log(`✅ Coral capacity available: ${currentUsage}/${maxCapacity}`);
			//actor.currStateText="Not Enough Coral Capacity"
            return "success";
        } else {
            console.log(`❌ Coral capacity full: ${currentUsage}/${maxCapacity}`);
            actor.currStateText = `Cancelled: Coral Capacity\nFull!${currentUsage}/${maxCapacity}`;
            
            // Cancel any related actions
            actor.isPlacingAnemone = false;
            actor.isPickUpAnemoneActive = false;
            
            return "failure";
        }
    }
}
// Helper function
function checkActorOverLimestone(actor) {
    // Check if the actor's center is over any limestone rock
    const centerX = actor.x + actor.width / 2;
    const centerY = actor.y + actor.height / 2;
    
    return calciumCarbonateArray.some(rock => 
        centerX > rock.x && centerX < rock.x + rock.width &&
        centerY > rock.y && centerY < rock.y + rock.height
    );
}




class FindAnemone extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;

    let targetAnemone;
	
      targetAnemone = actor.currGatheringActor;
	  console.log("target Anemone",targetAnemone)
	if (!(targetAnemone instanceof Anemone)) {
		console.warn("Must Choose Anemone");
		return "failure"
	}
    actor.currGatheringActor = targetAnemone;
    blackboard.currStateText = "Looking for Anemone";
	
    return "success";
  }
}

// begin gather

class MoveToAnemone extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
	const target = actor.currGatheringActor;

	let result = moveToPosition(actor,target,7)

      actor.currStateText = "Moving to Anemone";
      actor.isMoving=true;
	  return result;
  }
}

class PickUpAnemoneAnim extends BTNode { 
  constructor() {
    super();
    this.progress = 0;
    this.duration = 1000;
    this.progressBar = new ProgressBarComponent(this.duration, "purple");
  }

  tick(blackboard) {
	
    const actor = blackboard.actor;
	const target= actor.currGatheringActor;

    actor.currStateText = "Picking Up Anemone";
	actor.isMoving=false
	//target.isPlaceAnemoneOnCrabActive=false;
	


    if (this.progress === 0) {
      actor.speedX = 0;
      actor.speedY = 0;
      this.progress = this.duration;
    }

    this.progressBar.update(this.progress);
    this.progressBar.draw(actor.x, actor.y);
    this.progress--;

    if (this.progress <= 0) {
		// attach to actor function 
		
		target.isAttached=true;
		target.attachedHermit=actor
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


class PutDownAnemoneAnim extends BTNode { 
    constructor() {
        super();
        this.progress = 0;
        this.duration = 1000;
        this.progressBar = new ProgressBarComponent(this.duration, "purple");
    }

    tick(blackboard) {
        const actor = blackboard.actor;
        
        // ✅ Use .find() - returns the anemone or undefined
        const anemone = anemoneArray.find(a => a.attachedHermit === actor);
        
        // If no anemone found, fail gracefully
        if (!anemone) {
            console.warn("No attached anemone found for actor!");
            actor.currStateText = "Error: No Anemone to Place!";
            this.reset();
            return "failure";
        }

        actor.currStateText = "Putting Down Anemone";
        actor.isMoving = false;

        if (this.progress === 0) {
            actor.speedX = 0;
            actor.speedY = 0;
            this.progress = this.duration;
        }

        this.progressBar.update(this.progress);
        this.progressBar.draw(actor.x, actor.y);
        this.progress--;

        if (this.progress <= 0) {
            // Detach anemone from actor
            actor.isPlacingAnemone = false;
            anemone.isAttached = false;
            anemone.attachedHermit = null;
			anemone.y+=25;
            
            console.log("✅ Anemone placed!");
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