let algaeStoredUIX= 300;
let algaeStoredUIY= 330;


let planktonStoredUIX= 300;
let planktonStoredUIY= 360;


let seaweedStoredUIX=300;
let seaweedStoredUIY=250;
let seaweedStoredTextUI="";
let seaweedStoredCapTextUI="";

let algaeLeftUIX= 300;
let algaeLeftUIY= 300;
let algaeLeftText= "";

let planktonLeftUIX= 300;
let planktonLeftUIY= 350;
let planktonLeftText= "";

let calciumCarbonateStoredUIX=300;
let calciumCarbonateStoredUIY=400;
let calciumCarbonateLeftText="";





function drawCalciumCarbonateLeft(){
	uiCanvasContext.fillStyle="white";
	uiCanvasContext.font = "20px Arial";
	uiCanvasContext.fillText(calciumCarbonateLeftText,calciumCarbonateStoredUIX,calciumCarbonateStoredUIY);
}


function drawSelectedUnitStorage(algaeStoredText,algaeStoredCapText,planktonStoredText,planktonStoredCapText){
	
	uiCanvasContext.fillStyle = "gold";  // Text color
    uiCanvasContext.font = "15px Arial";
    uiCanvasContext.fillText(" "+algaeStoredText+algaeStoredCapText,algaeStoredUIX,algaeStoredUIY);
	
	 uiCanvasContext.fillStyle = "gold";  // Text color
    uiCanvasContext.font = "15px Arial";
    uiCanvasContext.fillText(" "+planktonStoredText+planktonStoredCapText,planktonStoredUIX,planktonStoredUIY);
	
	
}


function drawAlgaeLeft(){
	
	 uiCanvasContext.fillStyle = "#39FF14";  // Text color
    
    uiCanvasContext.fillText(algaeLeftText,algaeLeftUIX,algaeLeftUIY);
}


function drawPlanktonLeft(){
	
	 uiCanvasContext.fillStyle = "orange";  // Text color
    uiCanvasContext.font = "20px Arial";
    uiCanvasContext.fillText(planktonLeftText,planktonLeftUIX,planktonLeftUIY);
}

