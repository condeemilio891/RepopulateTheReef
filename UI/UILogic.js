const fontSizeCache = new Map();




function getFontSizeForText(ctx, text, maxWidth, startSize = 30, minSize =14, step = 2) {
  // Check cache first
  const cacheKey = text + maxWidth + startSize;
  if (fontSizeCache.has(cacheKey)) {
    return fontSizeCache.get(cacheKey);
  }

  let fontSize = startSize;
  let textWidth;

  do {
    ctx.font = `${fontSize}px Arial`;
    textWidth = ctx.measureText(text).width;
    if ((textWidth+75) > maxWidth) {
      fontSize -= step;
    } else {
      break;
    }
  } while (fontSize >= minSize);

  fontSizeCache.set(cacheKey, fontSize);
  return fontSize;
}


function minimizeUICanvas() {
    if (!isMinimized) {
        isMinimized = true;
        showUI = false;
        
        // Animate sliding out
        uiCanvas.style.transition = 'transform 0.3s ease-in-out';
        uiCanvas.style.transform = 'translateX(300px)';
        
        console.log("UI minimized");
    }
}

function restoreUICanvas() {
    if (isMinimized) {
        isMinimized = false;
        showUI = true;
        
        // Animate sliding back
        uiCanvas.style.transition = 'transform 0.3s ease-in-out';
        uiCanvas.style.transform = 'translateX(0)';
        
        console.log("UI restored");
    }
}

function handleMinimize(evt){
	 
    
    const rect = uiCanvas.getBoundingClientRect();
    const clickX = evt.clientX - rect.left;
    const clickY = evt.clientY - rect.top;
    
    // Check if click is within minimize button area
    const distance = Math.sqrt(
        Math.pow(clickX - minimizeUIX, 2) +
        Math.pow(clickY - minimizeUIY, 2)
    );
    
    if (distance < minimizeButtonSize) {
		if(!isMinimized){
			minimizeUICanvas();
			minimizeUIX=40;
		}else{
			restoreUICanvas();
			minimizeUIX=400;
		}
		
    }
}



	
function handleHoverUI(evt) {
    let radius = 45;

    let clownfishDistance = Math.sqrt((mouseXUI - buyClownfishUIX) ** 2 + (mouseYUI - buyClownfishUIY) ** 2);
    let mantisShrimpDistance = Math.sqrt((mouseXUI - buyMantisShrimpUIX) ** 2 + (mouseYUI - buyMantisShrimpUIY) ** 2);
    let seahorseDistance = Math.sqrt((mouseXUI - buySeahorseUIX) ** 2 + (mouseYUI - buySeahorseUIY) ** 2);
	let brainCoralPolypDistance = Math.sqrt((mouseXUI - buyBrainCoralPolypUIX) ** 2 + (mouseYUI - buyBrainCoralPolypUIY) ** 2);

    switch (true) {
        case clownfishDistance < radius:
            uiCanvas.style.cursor = 'pointer';
            clownfishImageUIHovered = true;
            mantisShrimpImageUIHovered = false;
            seahorseUIHovered = false;
			hoverText="Eats zooplankton gathers algae heals coral"
            break;
        case mantisShrimpDistance < radius:
            uiCanvas.style.cursor = 'pointer';
            mantisShrimpImageUIHovered = true;
            clownfishImageUIHovered = false;
            seahorseUIHovered = false;
			brainCoralPolypUIHovered=false;
            hoverText = "Protects colony, eats krill.";
            break;
        case seahorseDistance < radius:
            uiCanvas.style.cursor = 'pointer';
            seahorseUIHovered = true;
            clownfishImageUIHovered = false;
            mantisShrimpImageUIHovered = false;
			brainCoralPolypUIHovered=false;
            hoverText = "Gathers zooplankton and eats them too.";
            console.log("seahorseHover");
            break;
		case brainCoralPolypDistance<radius && actorSelected !== null:
			uiCanvas.style.cursor = 'pointer';
            seahorseUIHovered = false;
            clownfishImageUIHovered = false;
            mantisShrimpImageUIHovered = false;
			brainCoralPolypUIHovered=true;
            hoverText = "Grows into a sea anemeny or brain coral";
			break;
        default:
            uiCanvas.style.cursor = 'default';
            clownfishImageUIHovered = false;
            mantisShrimpImageUIHovered = false;
            seahorseUIHovered = false;
			brainCoralPolypUIHovered=false;
			hoverText="";
    }
}
	
