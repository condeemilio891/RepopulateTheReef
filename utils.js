function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}


function resizeUIPanel() {
    const zoom = window.devicePixelRatio;  // 1.0 = 100% zoom, 1.25 = 125% zoom
    // To keep physical size constant, CSS size = BASE / zoom
    const newCssWidth = BASE_CSS_WIDTH / zoom;
    uiCanvas.style.width = newCssWidth + 'px';
    uiCanvas.style.height = (800 / 420 * newCssWidth) + 'px'; // maintain aspect ratio
    
    // Also need to scale drawing coordinates if you draw anything dynamic
    // But your canvas drawing buffer stays 420x800, so everything drawn will be
    // scaled automatically by the browser – that's fine for UI.
}
function getUICanvasCoords(evt) {
    const rect = uiCanvas.getBoundingClientRect();
    const scaleX = uiCanvas.width / rect.width;   // e.g., 420 / actual CSS width
    const scaleY = uiCanvas.height / rect.height; // e.g., 800 / actual CSS height
    return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY
    };
}

function resizeBulmaMenu() {
    const zoom = window.devicePixelRatio || 1;
    const scale = 1 / zoom;
    const arrowWrapper = document.querySelector('.arrow-dpi-wrapper');
    const coralWrapperDiv = document.getElementById('coral-menu-wrapper');
	const energyBuildingWrapperDiv=document.getElementById("energyBuilding-menu-wrapper");
    if (arrowWrapper) {
        arrowWrapper.style.transformOrigin = 'bottom right';
        arrowWrapper.style.transform = `scale(${scale})`;
    }
    if (coralWrapperDiv) {
        coralWrapperDiv.style.transformOrigin = 'bottom left';
        coralWrapperDiv.style.transform = `scale(${scale})`;
    }
	if(energyBuildingWrapperDiv){
		energyBuildingWrapperDiv.style.transformOrigin="bottom left";
		energyBuildingWrapperDiv.style.transform = `scale(${scale})`;
	}
}

// ----------------------------------------------------------------------
//

function drawMultilineText(ctx, text, x, y, lineHeight,textColor="white") {
    ctx.fillStyle = textColor;   // set text color to white
    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], x, y + i * lineHeight);
    }
}
function getResourceCanvasCoords(clientX, clientY) {
    const rect = resourceCanvas.getBoundingClientRect();
    const scaleX = resourceCanvas.width / rect.width;   // logical width / CSS width
    const scaleY = resourceCanvas.height / rect.height; // logical height / CSS height
    return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
    };
}

function getAllActorsInRadius(actor,targetArray) {
    let tempArray = [];
    const radiusSquared = actor.radius * actor.radius;  // Pre-calculate squared radius for efficiency
    
	if(!targetArray){
		return tempArray;
	}
	
    targetArray.forEach(target => {
        // Calculate distance between actor and seaweed
        const dx = actor.x - target.x;
        const dy = actor.y - target.y;
        const distanceSquared = dx*dx + dy*dy;
        
        // Check if seaweed is within radius
        if (distanceSquared <= radiusSquared) {
            tempArray.push(target);
        }
    });
    
    return tempArray;
}

function moveToPosition(actor, target, arrivalDist = 7) {
  if (!target) return "failure";

  const dx = target.x - actor.x;
  let dy;   // declare here
  
  if (target instanceof Seaweed || target instanceof Seagrass) {
    dy = (target.y + target.height/1.4) - actor.y;
  } else {
    dy = target.y - actor.y;
  }
  
  const distance = Math.hypot(dx, dy);
  
  if (distance <= arrivalDist) return "success";
  if (distance === 0) return "failure";

  actor.flipped = dx < 0;
  actor.rotation = Math.atan2(dy, Math.abs(dx)) * (180 / Math.PI);

  const moveX = (dx / distance) * actor.maxSpeedX;
  const moveY = (dy / distance) * actor.maxSpeedY;
  actor.x += moveX;
  actor.y += moveY;

  return "running";
}
function moveToClickedPosition(actor, targetX, targetY) {
    const dx = targetX - actor.x;
    const dy = targetY - actor.y;
    const distance = Math.hypot(dx, dy);
	actor.isMoving=true
    if (distance <= 10) {
		if(actor.isMoving){ 
			actor.isMoving=false;
		}
        actor.state = "autoPilot";
        // Optionally clear target coordinates
        delete actor.targetX;
        delete actor.targetY;
        return;
    }

    if (distance === 0) return;

    actor.flipped = dx < 0;
    actor.rotation = Math.atan2(dy, Math.abs(dx)) * (180 / Math.PI);

    const moveX = (dx / distance) * actor.maxSpeedX;
    const moveY = (dy / distance) * actor.maxSpeedY;
    actor.x += moveX;
    actor.y += moveY;
}

function isOverlappingWithAny(actor, actorArray, excludeSelf = true) {
  for (let other of actorArray) {
    if (excludeSelf && actor === other) continue;


    // rectangle collision (requires width/height)
	if (actor.width !== undefined && actor.height !== undefined &&
             other.width !== undefined && other.height !== undefined) {
      if (actor.x < other.x + other.width &&
          actor.x + actor.width > other.x &&
          actor.y < other.y + other.height &&
          actor.y + actor.height > other.y) {
        return true;
      }
    }
  }
  return false;
}


// draw button 
function drawButton(ctx, btn, iconImage) {
    if (btn.isClicked) {
        ctx.fillStyle = "#4CAF50";
        ctx.fillRect(btn.x, btn.y, btn.width, btn.height);
    } else {
        ctx.fillStyle = "black";
        ctx.fillRect(btn.x, btn.y, btn.width, btn.height);
    }
    
    ctx.strokeStyle = "white";
    ctx.strokeRect(btn.x, btn.y, btn.width, btn.height);
    
    const iconX = btn.x + (btn.width - btn.iconWidth) / 2;
    const iconY = btn.y + (btn.height - btn.iconHeight) / 2;
    ctx.drawImage(iconImage, iconX, iconY, btn.iconWidth, btn.iconHeight);
}


function drawBorder(actor, angleRadians) {
    const centerX = actor.x + actor.width / 2;
    const centerY = actor.y + actor.height / 2;
    const radius = Math.max(actor.width, actor.height) / 2 + 50; // distance of gradient ends

    // Compute start and end points on the circle
    const startX = centerX + Math.cos(angleRadians) * radius;
    const startY = centerY + Math.sin(angleRadians) * radius;
    const endX = centerX - Math.cos(angleRadians) * radius;
    const endY = centerY - Math.sin(angleRadians) * radius;

    const gradient = canvasContext.createLinearGradient(startX, startY, endX, endY);
    gradient.addColorStop(0, "rgba(0,255,255,0.8)");   // cyan
    gradient.addColorStop(0.5, "rgba(255,255,255,0.9)"); // white
    gradient.addColorStop(1, "rgba(100,200,255,0.8)");   // light blue

    canvasContext.strokeStyle = gradient;
    canvasContext.lineWidth = 8;
    canvasContext.strokeRect(actor.x - 2, actor.y - 2, actor.width + 4, actor.height + 4);
}
