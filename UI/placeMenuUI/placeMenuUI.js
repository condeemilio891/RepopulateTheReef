const arrowContainer = document.querySelector('.placeArrowContainer');
const hiddenSection = document.querySelector('.is-hidden');

const coralContainer = document.querySelector('.coralContainer');
const coralWrapper = document.getElementById('coral-menu-wrapper');

const energyBuildingContainer = document.querySelector('.energyBuildingContainer');
const energyBuildingWrapper = document.getElementById('energyBuilding-menu-wrapper');


let placeMenuComponentsArray=[];
let placeMenuComponentsArrayEnergyBuildings=[]
	
let currentOpenMenu = null; 

const coralData = { 
	
	smallAnemone:{
	  imagePath:"./Pics/PlaceMenuIcons/anemoneSmall.png",
	  type:"smallAnemone",
	  quantity:1,
	  isActive:false,	  
	},
	anemone:{
	  imagePath:"./Pics/PlaceMenuIcons/anemone.png",
	  type:"anemone",
	  quantity:1,
	  isActive:false,
	},
	largeAnemone:{
	  imagePath:"./Pics/PlaceMenuIcons/anemoneLarge.png",
	  type:"largeAnemone",
	  quantity:1,
	  isActive:false,
	},
  smallPipeCoral:{
	imagePath: './Pics/PlaceMenuIcons/pipeCoralTiny.png',
    type: 'smallPipeCoral',
	quantity:2,
	isActive:false,
  },  
  pipecoral: {
    imagePath: './Pics/PlaceMenuIcons/pipeCoralMediumStill.png',
    type: 'mediumPipeCoral',
	quantity:1,
	isActive:false,
  },
  fingercoral:{
	  imagePath: "SpriteSheets/FingerCoral/fingerCoral0.png",
	  type: "fingerCoral",
	  quantity:1,
	  isActive:false,
  },
  smallFingerCoral:{
	  imagePath: "Pics/PlaceMenuIcons/fingerCoralTiny.png",
	  type: "smallFingerCoral",
	  quantity:1,
	isActive:false,	  
  },
    braincoral: {
    imagePath: './Pics/PlaceMenuIcons/genericCoral.png',
    type: 'brainCoral',
	quantity: 0,
	isActive:false,
  }
/*   staghorncoral: {
	imagePath: './Pics/PlaceMenuIcons/staghornCoral.png',
    type: 'StaghornCoral',
	quantity:0
  } */
};

const buildingData = { 
	
	tideMill:{
	  imagePath:"./SpriteSheets/TideMill/Tidemill0.png",
	  type:"tideMill",
	  cost:100,
	  quantity: 10,
	  isActive:false,	  
	},

	solarPanel:{
		imagePath:"./Pics/PlaceMenuIcons/solarPanel.png",
		type:"solarPanel",
		cost: 50,
		quantity:10,
		isActive:false,
	},
	sandBattery:{
	  imagePath:"./SpriteSheets/SandBattery/battery_25x50px1.png",
	  type:"sandBattery",
	  cost:200,
	  quantity: 10,
	  isActive:false,
	}
}


function drawPlaceMenuUI() {
    const coralContainer = document.querySelector('.coralContainer');
    coralContainer.innerHTML = ''; // Clear existing content

    // 1. Create and append the title (absolutely positioned, so it doesn't affect flex layout)
    const title = document.createElement('h1');
    title.className = 'coral-menu-title';
    // Use currentOpenMenu to decide text, but default to "Corals"
    title.textContent = (currentOpenMenu === 'coral') ? 'Corals' : 'Corals';
    coralContainer.appendChild(title);

    // 2. Append all coral components (they will sit in the flex row below/around the absolute title)
    Object.entries(coralData).forEach(([key, coral]) => {
        const coralComponent = new CoralComponent(
            coral.imagePath,
            coral.type,
            coral.quantity,
            coral.isActive
        );
        coralContainer.appendChild(coralComponent.element);
        placeMenuComponentsArray.push(coralComponent);
    });
}

function drawPlaceMenuUIEnergyBuildings() {
    const energyContainer = document.querySelector('.energyBuildingContainer');
    energyContainer.innerHTML = '';

    const title = document.createElement('h1');
    title.className = 'coral-menu-title'; // reuse same class
    title.textContent = (currentOpenMenu === 'energy') ? 'Energy Buildings' : 'Energy Buildings';
    energyContainer.appendChild(title);

    Object.entries(buildingData).forEach(([key, building]) => {
        const buildingComponent = new BuildingComponent(
            building.imagePath,
            building.type,
            building.quantity || 1,
            building.cost,
            building.isActive
        );
        energyContainer.appendChild(buildingComponent.element);
        placeMenuComponentsArrayEnergyBuildings.push(buildingComponent);
    });
}

function closeAllMenus() {
    coralWrapper.classList.add('is-hidden');
    energyBuildingWrapper.classList.add('is-hidden');
    arrowContainer.classList.remove('rotated');
    currentOpenMenu = null;
}

function openCoralMenu() {
    if (currentOpenMenu === 'coral') return; // already open
    closeAllMenus();
    coralWrapper.classList.remove('is-hidden');
    arrowContainer.classList.add('rotated');
    currentOpenMenu = 'coral';
}

function openEnergyMenu() {
    if (currentOpenMenu === 'energy') return;
    closeAllMenus();
    energyBuildingWrapper.classList.remove('is-hidden');
    arrowContainer.classList.add('rotated');
    currentOpenMenu = 'energy';
}
function arrowClickHandler() {
    if (currentOpenMenu) {
        closeAllMenus();
    } else {
        // default: open coral? or last used? We'll open coral as default.
        openCoralMenu();
    }
}


// Click handler
arrowContainer.addEventListener('click', arrowClickHandler);

// Keyboard handler 
window.addEventListener('keydown', (event) => {
    if (event.key === 'c' || event.key === 'C') {
        event.preventDefault();
        if (currentOpenMenu === 'coral') {
            closeAllMenus();          // close coral if it's open
        } else {
            openCoralMenu();          // open coral (closes any other via openCoralMenu)
        }
    } else if (event.key === 'b' || event.key === 'B') {
        event.preventDefault();
        if (currentOpenMenu === 'energy') {
            closeAllMenus();
        } else {
            openEnergyMenu();
        }
    }
});



