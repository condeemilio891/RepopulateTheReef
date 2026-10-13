


class MoveToPlayerActor extends BTNode {
  tick(blackboard) {
    const actor = blackboard.actor;
	const targetPlayerActor= blackboard.targetPlayerActor;

	 actor.currStateText = "Moving to player actor" // make this say the target name maybe template literal?  

      const dx = targetPlayerActor.x - actor.x;
      const dy = targetPlayerActor.y - actor.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= 0) return "failure";

      
      actor.flipped = dx < 0;

      // 2. Movement calculations
      const directionX = dx / distance;
      const directionY = dy / distance;
      
      actor.speedX = 3 * directionX; // Remove Math.abs()
      actor.speedY = 3 * directionY;
      
      actor.x += actor.speedX;
      actor.y += actor.speedY;

      // 3. Rotation
      const absDx = Math.abs(dx);
      actor.rotation = Math.atan2(dy, absDx) * (180 / Math.PI);

      if (distance < 7) {
       
        return "success";
      }

      return "running"; // keep going
    }
    
    //return "failure";
 
}
