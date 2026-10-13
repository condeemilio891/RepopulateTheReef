class FindRandomLocationAction extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
    const radius = 2500; // should I make a location radius for actor yesss 
    let validPoint = false;
    let targetX, targetY;
	
	blackboard.currStateText = "Looking for loc";
  
    const canvasWidth = canvas.width;   // example width
    const canvasHeight = canvas.height;  // example height
     
      
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.sqrt(Math.random()) * radius;

      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      if (actor.home) {
        targetX = actor.home.x + dx;
        targetY = actor.home.y + dy;
      } else {
        targetX = actor.spawnPointX + dx;
        targetY = actor.spawnPointY + dy;
      }

      if (targetX >= 0 && targetX <= canvasWidth && targetY >= 0 && targetY <= canvasHeight) {
        validPoint = true;
      }
   // }

    if (validPoint) {
      blackboard.targetPosition = { x: targetX, y: targetY };
    } else {
      // Fallback to home/spawn point if no valid point found
      if (actor.home) {
        blackboard.targetPosition = { x: actor.home.x, y: actor.home.y };
      } else {
        blackboard.targetPosition = { x: actor.spawnPointX, y: actor.spawnPointY };
      }
    }

    return 'success';
  }
}

class MoveAndRotateToLocationAction extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
    if (actor.attackTarget) return "failure";

    const target = blackboard.targetPosition;
    if (!target) return "failure";

    // Set flip based on target position relative to actor
    actor.flipped = (target.x < actor.x);   // true = move left → face left

    // (or if you want to also consider Y for up/down, you'd need separate vertical flip)

    const result = moveToPosition(actor, target, 30);
    return result;
  }
}