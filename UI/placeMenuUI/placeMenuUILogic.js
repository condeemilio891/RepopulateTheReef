
function executeSpawnCoral(evt){
	
	placeBrainCoral(evt);
	placeAnemone(evt);
	placePipeCoral(evt);
	placeFingerCoral(evt);
	initCoralCards(offsetX, offsetY, reducedWidth);
	selectText = getNumberOfCorals()+ " Corals";
	drawSelectedUnitText();
	//place buildings maybe refactor l8r
	placeSolarPanel(evt);
	placeTideMill(evt);
	placeSandBattery(evt);
}



function previewPlaceCoral(placeImage){

	canvasContext.save();
	let scale=1;
	placeImage.width=200;
	placeImage.height=200;

	canvasContext.drawImage(placeImage,
	 mouseX - (placeImage.width * scale)/2,
    mouseY - (placeImage.height * scale)/2,
    placeImage.width * scale,
    placeImage.height * scale
	)
	
	canvasContext.restore();

}

function spawnSolarPanel(){
	let newSolarPanel = new SolarPanel(mouseX-100,mouseY-100);
	solarPanelArray.push(newSolarPanel);
}

function spawnTidemill(){
	let newTidemill = new Tidemill(mouseX-100,mouseY-100);
	tidemillArray.push(newTidemill);
}

function spawnSandbattery(){
	let newSandBattery = new SandBattery(mouseX-100,mouseY-75);
	sandBatteryArray.push(newSandBattery);	
}

function spawnBrainCoral(){		

	let newBrainCoral = new BrainCoral(mouseX-100,mouseY-75,coralImg.src);
		coralArray.push(newBrainCoral);
		brainCoralArray.push(newBrainCoral);
}	
		
		
function spawnAnemone(size){		
					let newAnemone = new Anemone(mouseX-100,mouseY-75,size);
					newAnemone.setLevelStats();
					coralArray.push(newAnemone);
					anemoneArray.push(newAnemone);
					let newClownfish= new Fish(newAnemone.x,newAnemone.y,newAnemone);
					PCArray.push(newClownfish);
					newAnemone.popArray.push(newClownfish);
					

}
function spawnOrganPipeCoral(size){		

					let newOrganPipeCoral = new OrganPipeCoral(mouseX-100,mouseY-75,size);
					newOrganPipeCoral.setLevelStats();
					coralArray.push(newOrganPipeCoral);
					organPipeCoralArray.push(newOrganPipeCoral);
					
					let newSeahorse = new Seahorse(newOrganPipeCoral.x,newOrganPipeCoral.y,newOrganPipeCoral);
					PCArray.push(newSeahorse);
					newOrganPipeCoral.popArray.push(newSeahorse);
					

}	

function spawnFingerCoral(size){

			let newFingerCoral = new FingerCoral(mouseX-100,mouseY-75,size);
			newFingerCoral.setLevelStats();
			coralArray.push(newFingerCoral);
			fingerCoralArray.push(newFingerCoral);
			
			

}	


// helper to get the active coral  make sure only one can be a at a time 

function getActiveCoralComponent() {
	
  return placeMenuComponentsArray.find(c => c.isActive === true);
}

function getActiveEnergyBuildingComponent(){
	return placeMenuComponentsArrayEnergyBuildings.find(b => b.isActive === true);
}

function placeBrainCoral(evt) {
  const activeComp = getActiveCoralComponent();
  if (!activeComp || activeComp.type !== 'brainCoral') return; // wrong coral or nothing active

  if (!isMouseOverCalcium) {
    alertText = "Must Be Placed On Substrate";
    return;
  }
  if (isMouseCloseToCoral) {
    alertText = "Too Close to another building";
    return;
  }
  if (resourceData.coralCapacity.total >= resourceData.coralCapacity.totalCapacity) {
    alertText = "Coral Cap Exceeded! Right Click to Cancel";
    return;
  }
  
  // All checks passed – spawn

  spawnBrainCoral(); // you might need to pass size if multiple sizes
  activeComp.decreaseQuantity();
  activeComp.makeInactive(); // or set isActive = false
}


function placeAnemone(evt) {
  const activeComp = getActiveCoralComponent();
   console.log("activeComp----->",activeComp)
  if (!activeComp) return;
  
 
	  // Check if it's any anemone type
	  const validTypes = ['smallAnemone', 'anemone', 'largeAnemone'];
	  if (!validTypes.includes(activeComp.type)) return;
	  
	  // Same placement conditions
	  if (!isMouseOverCalcium) {
		alertText = "Must Be Placed On Substrate";
		return;
	  }
	  if (isMouseCloseToCoral) {
		alertText = "Too Close to another building";
		return;
	  }
	  if (resourceData.coralCapacity.total >= resourceData.coralCapacity.totalCapacity) {
		alertText = "Coral Cap Exceeded! Right Click to Cancel";
		return;
	  }
	  
	  // Determine size from component type
	  let size = 'medium'; // default
	  if (activeComp.type === 'smallAnemone') size = 'tiny';
	  else if (activeComp.type === 'largeAnemone') size = 'large';
    console.log("spawn anemone!!!!!!!!!")
	  spawnAnemone(size);
	  activeComp.decreaseQuantity();
	  activeComp.makeInactive();
	  redrawRocksAndCoral();
}

function placeAnemoneOnHermit(evt) {
  // check if place isPlaceAnemoneOnCrabActive
  if (!isPlaceAnemoneOnCrabActive) return;
  
}



function placePipeCoral(evt){
  const activeComp = getActiveCoralComponent();
  if (!activeComp) return;
  
	  // Check if it's any anemone type
	  const validTypes = ['smallPipeCoral', 'mediumPipeCoral'];
	  if (!validTypes.includes(activeComp.type)) return;
	  
	  // Same placement conditions
	  if (!isMouseOverCalcium) {
		alertText = "Must Be Placed On Substrate";
		return;
	  }
	  if (isMouseCloseToCoral) {
		alertText = "Too Close to another building";
		return;
	  }
	  if (resourceData.coralCapacity.total >= resourceData.coralCapacity.totalCapacity) {
		alertText = "Coral Cap Exceeded! Right Click to Cancel";
		return;
	  }
	  
	  // Determine size from component type
	 let size = (activeComp.type === 'smallPipeCoral') ? 'tiny' : 'medium';
  
	  spawnOrganPipeCoral(size);
	  activeComp.decreaseQuantity();
	  activeComp.makeInactive();
	  redrawRocksAndCoral()
	  
}

function placeFingerCoral(evt){
  const activeComp = getActiveCoralComponent();
  if (!activeComp) return;
  
  const validTypes = ['smallFingerCoral', 'fingerCoral'];
  if (!validTypes.includes(activeComp.type)) return;
  
  	  // Same placement conditions
	  if (!isMouseOverCalcium) {
		alertText = "Must Be Placed On Substrate";
		return;
	  }
	  if (isMouseCloseToCoral) {
		alertText = "Too Close to another building";
		return;
	  }
	  if (resourceData.coralCapacity.total >= resourceData.coralCapacity.totalCapacity) {
		alertText = "Coral Cap Exceeded! Right Click to Cancel";
		return;
	  }
	  
	  	 let size = (activeComp.type === 'smallFingerCoral') ? 'tiny' : 'medium';
  
	  spawnFingerCoral(size);
	  activeComp.decreaseQuantity();
	  activeComp.makeInactive();
	  redrawRocksAndCoral();
	  
}


function placeSolarPanel(){
	const activeComp=getActiveEnergyBuildingComponent();
	if(!activeComp) return; 
	
	if(activeComp.type!="solarPanel") return;
	
	spawnSolarPanel();
	activeComp.decreaseQuantity();
	activeComp.makeInactive();
}

function placeTideMill(){
	const activeComp=getActiveEnergyBuildingComponent();
	if(!activeComp) return; 
	
	if(activeComp.type!="tideMill") return;
	
	spawnTidemill();
	activeComp.decreaseQuantity();
	activeComp.makeInactive();
}

function placeSandBattery(){
	const activeComp=getActiveEnergyBuildingComponent();
	if(!activeComp) return; 
	
	if(activeComp.type!="sandBattery") return;
	
	spawnSandbattery();
	activeComp.decreaseQuantity();
	activeComp.makeInactive();
}



//event listeners 

document.querySelector('.coralContainer').addEventListener('click', (e) => {
  if (e.target.classList.contains('coral-image')) {
    // Find the clicked figure element
    const figure = e.target.closest('.coral-component');
    if (!figure) return;

    // Find the corresponding CoralComponent instance in the array
    const clickedComponent = placeMenuComponentsArray.find(c => c.element === figure);
    if (!clickedComponent) return;

    // Only allow activation if quantity > 0
    if (clickedComponent.quantity > 0) {
      // Deactivate all components
      placeMenuComponentsArray.forEach(comp => {
        if (comp.isActive) comp.isActive = false;
      });
      // Activate the clicked one
      clickedComponent.isActive = true;
      alertText= `Activated: ${clickedComponent.type}`;
    } else {
      alertText = `No ${clickedComponent.type} left!`;
    }
    
    console.log(placeMenuComponentsArray.filter(c => c.isActive));
  }
});

document.querySelector('.energyBuildingContainer').addEventListener('click', (e) => {
  if (e.target.classList.contains('coral-image')) {
    // Find the clicked figure element
    const figure = e.target.closest('.coral-component');
    if (!figure){
		console.log("no figure");
		return;
	}
    // Find the corresponding CoralComponent instance in the array
    const clickedComponent = placeMenuComponentsArrayEnergyBuildings.find(c => c.element === figure);
    if (!clickedComponent) return;

    // Only allow activation if quantity > 0
    if (clickedComponent.quantity > 0) {
      // Deactivate all components
      placeMenuComponentsArrayEnergyBuildings.forEach(comp => {
        if (comp.isActive) comp.isActive = false;
      });
      // Activate the clicked one
      clickedComponent.isActive = true;
      console.log(`Activated: ${clickedComponent.type}`);
    } else {
      alertText = `No ${clickedComponent.type} left!`;
    }
    
    console.log(placeMenuComponentsArrayEnergyBuildings.filter(c => c.isActive));
  }
});