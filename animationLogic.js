  //clownfish
let clownfishSwimImgArray=[];
let clownfishSwimImgArrayAlgae=[];
let clownfishSwimImgArrayPlankton=[];
let clownfishEatImgArrayAlgae=[];
   // seahorse 
let seahorseSwimImgArray=[];
let seahorseSwimImgArrayAlgae=[];
let seahorseSwimImgArrayPlankton=[];
let seahorseEatImgArray=[];
let seahorseDeathImgArray=[];
// shrimp
let shrimpImgArray=[];
let shrimpImgArrayPlankton=[];
let shrimpImgArrayCalciumCarbonate=[];

let shrimpEatingImgArray=[];

let shrimpDeadImg=new Image();
	shrimpDeadImg.src="SpriteSheets/Shrimp/Death/shrimpDeath5.png";
let shrimpWithSeagrassImg= new Image();
	shrimpWithSeagrassImg.src="SpriteSheets/Shrimp/WithSeagrass/shrimpWithSeagrass0.png";
//crab
let crabIdleImgArray=[];
let crabWalkImgArray=[];
let crabDeathImgArray=[];
let crabAttackImgArray=[];

//hermitcrab 
let hermitCrabIdleImgArray=[];
let hermitCrabWalkImgArray=[];



// pistol shrimp 

let pistolShrimpWalkImgArray=[];
//anemone
let anemoneIdleImgArray=[];
let babyAnemoneIdleImgArray=[];
// seaweed
let seaweedImgArray=[];
// seagrass
let seagrassImgArray=[];
// Jellyfish 
let jellyfishImgArray=[];
let jellyfishDeathImgArray=[];
//barracuda
let barracudaSwimImgArray=[];
//sponge 
let spongeImgArray=[];

// krill 
let krillImgArray=[];


//tidemill 
let tidemillImgArray=[];

//sandbattery 
let sandBatteryImgArray=[];


// switching to pixiJS REEEEFACTTOOOOOR THIIIIIS 
let hermitCrabIdleTextures = [];
let hermitCrabWalkTextures = [];

function populateAnimArrays(){
	populateClownfishAnimationArrays();
		populateSeahorseAnimationArrays();
		populateSeahorseDeathArray();
		populateAnemoneImgArray();
		//populateBabyAnemoneImgArray();
		populateSeaweedImgArray();
		populateSeagrassImgArray();
		populateJellyfishImgArray();
		populateJellyfishDeathImgArray();
		populateSpongeImgArray();
		populateKrillImgArray();
		populateShrimpImgArray();
		populateShrimpImgArrayPlankton();
		populateShrimpImgArrayCalciumCarbonate();
		populateShrimpEatingImgArray();
		//crab
		populateCrabIdleImgArray();
		populateCrabWalkImgArray();
		populateCrabDeathImgArray();
		populateCrabAttackImgArray();
		//pistolShrimp
		populatePistolShrimpImgArray();
		//hermit
		populateHermitCrabIdleImgArray();
		populateHermitCrabWalkImgArray();
		//tidemill 
		populateTidemillImgArray();
		//SandBattery
		populateSandBatteryArray()
		//Barracuda 
		populateBarracudaSwimImgArray();
		//PIXI REFACTOR 
		
		loadHermitCrabTextures()
		
}


function populateClownfishAnimationArrays(){
	//populate clownfish 
	// swim
	let clownfishSwimpic0=new Image();
	let clownfishSwimpic1=new Image();
	let clownfishSwimpic2=new Image();
	let clownfishSwimpic3=new Image();
	let clownfishSwimpic4=new Image();
	clownfishSwimpic0.src="SpriteSheets/Clownfish/ClownfishSwim/clownfishSwim0.png";
	clownfishSwimpic1.src="SpriteSheets/Clownfish/ClownfishSwim/clownfishSwim1.png"
	clownfishSwimpic2.src="SpriteSheets/Clownfish/ClownfishSwim/clownfishSwim2.png";
	clownfishSwimpic3.src="SpriteSheets/Clownfish/ClownfishSwim/clownfishSwim3.png"
	clownfishSwimpic4.src="SpriteSheets/Clownfish/ClownfishSwim/clownfishSwim4.png";
	clownfishSwimImgArray.push(clownfishSwimpic0);
	clownfishSwimImgArray.push(clownfishSwimpic1);
	clownfishSwimImgArray.push(clownfishSwimpic2);
	clownfishSwimImgArray.push(clownfishSwimpic3);
	clownfishSwimImgArray.push(clownfishSwimpic4);
	
	let clownfishSwimAlgaepic0=new Image();
	let clownfishSwimAlgaepic1=new Image();
	let clownfishSwimAlgaepic2=new Image();
	let clownfishSwimAlgaepic3=new Image();
	let clownfishSwimAlgaepic4=new Image();
	
	clownfishSwimAlgaepic0.src="SpriteSheets/Clownfish/ClownfishSwimAlgae/clownfishSwim0Algae.png"
	clownfishSwimAlgaepic1.src="SpriteSheets/Clownfish/ClownfishSwimAlgae/clownfishSwim1Algae.png"
	clownfishSwimAlgaepic2.src="SpriteSheets/Clownfish/ClownfishSwimAlgae/clownfishSwim2Algae.png"
	clownfishSwimAlgaepic3.src="SpriteSheets/Clownfish/ClownfishSwimAlgae/clownfishSwim3Algae.png"
	clownfishSwimAlgaepic4.src="SpriteSheets/Clownfish/ClownfishSwimAlgae/clownfishSwim4Algae.png"
	
	clownfishSwimImgArrayAlgae.push(clownfishSwimAlgaepic0);
	clownfishSwimImgArrayAlgae.push(clownfishSwimAlgaepic1);
	clownfishSwimImgArrayAlgae.push(clownfishSwimAlgaepic2);
	clownfishSwimImgArrayAlgae.push(clownfishSwimAlgaepic3);
	clownfishSwimImgArrayAlgae.push(clownfishSwimAlgaepic4);
	
	let clownfishSwimPlanktonpic0=new Image();
	let clownfishSwimPlanktonpic1=new Image();
	let clownfishSwimPlanktonpic2=new Image();
	let clownfishSwimPlanktonpic3=new Image();
	let clownfishSwimPlanktonpic4=new Image();
	
	clownfishSwimPlanktonpic0.src="SpriteSheets/Clownfish/ClownfishSwimPlankton/clownfishSwim0Plankton.png"
	clownfishSwimPlanktonpic1.src="SpriteSheets/Clownfish/ClownfishSwimPlankton/clownfishSwim1Plankton.png"
	clownfishSwimPlanktonpic2.src="SpriteSheets/Clownfish/ClownfishSwimPlankton/clownfishSwim2Plankton.png"
	clownfishSwimPlanktonpic3.src="SpriteSheets/Clownfish/ClownfishSwimPlankton/clownfishSwim3Plankton.png"
	clownfishSwimPlanktonpic4.src="SpriteSheets/Clownfish/ClownfishSwimPlankton/clownfishSwim4Plankton.png"
	
	clownfishSwimImgArrayPlankton.push(clownfishSwimPlanktonpic0);
	clownfishSwimImgArrayPlankton.push(clownfishSwimPlanktonpic1);
	clownfishSwimImgArrayPlankton.push(clownfishSwimPlanktonpic2);
	clownfishSwimImgArrayPlankton.push(clownfishSwimPlanktonpic3);
	clownfishSwimImgArrayPlankton.push(clownfishSwimPlanktonpic4);
	// eating animations
	
	let clownfishEatSeaweedPic0=new Image();
	let clownfishEatSeaweedPic1=new Image();
	let clownfishEatSeaweedPic2=new Image();
	let clownfishEatSeaweedPic3=new Image();
	let clownfishEatSeaweedPic4=new Image();
	
	clownfishEatSeaweedPic0.src="SpriteSheets/Clownfish/ClownfishEat/clownfishEat0Seaweed.png";
	clownfishEatSeaweedPic1.src="SpriteSheets/Clownfish/ClownfishEat/clownfishEat1Seaweed.png";
	clownfishEatSeaweedPic2.src="SpriteSheets/Clownfish/ClownfishEat/clownfishEat2Seaweed.png";
	clownfishEatSeaweedPic3.src="SpriteSheets/Clownfish/ClownfishEat/clownfishEat3Seaweed.png";
	clownfishEatSeaweedPic4.src="SpriteSheets/Clownfish/ClownfishEat/clownfishEat4Seaweed.png";
	
	clownfishEatImgArrayAlgae.push(clownfishEatSeaweedPic0);
	clownfishEatImgArrayAlgae.push(clownfishEatSeaweedPic1);
	clownfishEatImgArrayAlgae.push(clownfishEatSeaweedPic2);
	clownfishEatImgArrayAlgae.push(clownfishEatSeaweedPic3);
	clownfishEatImgArrayAlgae.push(clownfishEatSeaweedPic4);
	
}

function populateSeahorseAnimationArrays(){
	let seahorseSwim0=new Image();
	let seahorseSwim1=new Image();
	let seahorseSwim2=new Image();
	let seahorseSwim3=new Image();
	let seahorseSwim4=new Image();
	let seahorseSwim5=new Image();
	//
	let seahorseSwimWithSeaweed0=new Image();
	let seahorseSwimWithSeaweed1=new Image();
	let seahorseSwimWithSeaweed2=new Image();
	let seahorseSwimWithSeaweed3=new Image();
	let seahorseSwimWithSeaweed4=new Image();
	let seahorseSwimWithSeaweed5=new Image();
	//
	let seahorseSwimWithPlankton0=new Image();
	let seahorseSwimWithPlankton1=new Image();
	let seahorseSwimWithPlankton2=new Image();
	let seahorseSwimWithPlankton3=new Image();
	let seahorseSwimWithPlankton4=new Image();
	let seahorseSwimWithPlankton5=new Image();
	//
	let seahorseEat0=new Image();
	let seahorseEat1=new Image();
	let seahorseEat2=new Image();
	let seahorseEat3=new Image();
	let seahorseEat4=new Image();
	let seahorseEat5=new Image();
	
	
	seahorseSwim0.src="SpriteSheets/Seahorse/SeahorseSwim/seahorseSwim0.png";
	seahorseSwim1.src="SpriteSheets/Seahorse/SeahorseSwim/seahorseSwim1.png";
	seahorseSwim2.src="SpriteSheets/Seahorse/SeahorseSwim/seahorseSwim2.png";
	seahorseSwim3.src="SpriteSheets/Seahorse/SeahorseSwim/seahorseSwim3.png";
	seahorseSwim4.src="SpriteSheets/Seahorse/SeahorseSwim/seahorseSwim4.png";
	seahorseSwim5.src="SpriteSheets/Seahorse/SeahorseSwim/seahorseSwim5.png";
	
	seahorseSwimWithSeaweed0.src="SpriteSheets/Seahorse/SeahorseSwimWithSeaweed/seahorseSwimWithSeaweed0.png";
	seahorseSwimWithSeaweed1.src="SpriteSheets/Seahorse/SeahorseSwimWithSeaweed/seahorseSwimWithSeaweed1.png";
	seahorseSwimWithSeaweed2.src="SpriteSheets/Seahorse/SeahorseSwimWithSeaweed/seahorseSwimWithSeaweed2.png";
	seahorseSwimWithSeaweed3.src="SpriteSheets/Seahorse/SeahorseSwimWithSeaweed/seahorseSwimWithSeaweed3.png";
	seahorseSwimWithSeaweed4.src="SpriteSheets/Seahorse/SeahorseSwimWithSeaweed/seahorseSwimWithSeaweed4.png";
	seahorseSwimWithSeaweed5.src="SpriteSheets/Seahorse/SeahorseSwimWithSeaweed/seahorseSwimWithSeaweed5.png";
	
	seahorseSwimWithPlankton0.src="SpriteSheets/Seahorse/SeahorseSwimWithPlankton/seahorseSwimWithPlankton0.png";
	seahorseSwimWithPlankton1.src="SpriteSheets/Seahorse/SeahorseSwimWithPlankton/seahorseSwimWithPlankton1.png";
	seahorseSwimWithPlankton2.src="SpriteSheets/Seahorse/SeahorseSwimWithPlankton/seahorseSwimWithPlankton2.png";
	seahorseSwimWithPlankton3.src="SpriteSheets/Seahorse/SeahorseSwimWithPlankton/seahorseSwimWithPlankton3.png";
	seahorseSwimWithPlankton4.src="SpriteSheets/Seahorse/SeahorseSwimWithPlankton/seahorseSwimWithPlankton4.png";
	seahorseSwimWithPlankton5.src="SpriteSheets/Seahorse/SeahorseSwimWithPlankton/seahorseSwimWithPlankton5.png";
	
	seahorseEat0.src="SpriteSheets/Seahorse/SeahorseEat/seahorseEat0.png";
	seahorseEat1.src="SpriteSheets/Seahorse/SeahorseEat/seahorseEat1.png";
	seahorseEat2.src="SpriteSheets/Seahorse/SeahorseEat/seahorseEat2.png";
	seahorseEat3.src="SpriteSheets/Seahorse/SeahorseEat/seahorseEat3.png";
	seahorseEat4.src="SpriteSheets/Seahorse/SeahorseEat/seahorseEat4.png";
	seahorseEat5.src="SpriteSheets/Seahorse/SeahorseEat/seahorseEat5.png";
	
	seahorseSwimImgArray.push(seahorseSwim0);
	seahorseSwimImgArray.push(seahorseSwim1);
	seahorseSwimImgArray.push(seahorseSwim2);
	seahorseSwimImgArray.push(seahorseSwim3);
	seahorseSwimImgArray.push(seahorseSwim4);
	seahorseSwimImgArray.push(seahorseSwim5);
	
	seahorseSwimImgArrayAlgae.push(seahorseSwimWithSeaweed0);
	seahorseSwimImgArrayAlgae.push(seahorseSwimWithSeaweed1);
	seahorseSwimImgArrayAlgae.push(seahorseSwimWithSeaweed2);
	seahorseSwimImgArrayAlgae.push(seahorseSwimWithSeaweed3);
	seahorseSwimImgArrayAlgae.push(seahorseSwimWithSeaweed4);
	seahorseSwimImgArrayAlgae.push(seahorseSwimWithSeaweed5);
	
	seahorseSwimImgArrayPlankton.push(seahorseSwimWithPlankton0);
	seahorseSwimImgArrayPlankton.push(seahorseSwimWithPlankton1);
	seahorseSwimImgArrayPlankton.push(seahorseSwimWithPlankton2);
	seahorseSwimImgArrayPlankton.push(seahorseSwimWithPlankton3);
	seahorseSwimImgArrayPlankton.push(seahorseSwimWithPlankton4);
	seahorseSwimImgArrayPlankton.push(seahorseSwimWithPlankton5);
	
	//eating anim
	seahorseEatImgArray.push(seahorseEat0);
	seahorseEatImgArray.push(seahorseEat1);
	seahorseEatImgArray.push(seahorseEat2);
	seahorseEatImgArray.push(seahorseEat3);
	seahorseEatImgArray.push(seahorseEat4);
	seahorseEatImgArray.push(seahorseEat5);
	
	
	
}

function populateSeahorseDeathArray(){
	let seahorseImg0=new Image();
	let seahorseImg1=new Image();
	let seahorseImg2=new Image();
	let seahorseImg3=new Image();
	let seahorseImg4=new Image();
	let seahorseImg5=new Image();
	
	seahorseImg0.src="SpriteSheets/Seahorse/SeahorseDeath/seahorseDeath0.png";
	seahorseImg1.src="SpriteSheets/Seahorse/SeahorseDeath/seahorseDeath1.png";
	seahorseImg2.src="SpriteSheets/Seahorse/SeahorseDeath/seahorseDeath2.png";
	seahorseImg3.src="SpriteSheets/Seahorse/SeahorseDeath/seahorseDeath3.png";
	seahorseImg4.src="SpriteSheets/Seahorse/SeahorseDeath/seahorseDeath4.png";
	seahorseImg5.src="SpriteSheets/Seahorse/SeahorseDeath/seahorseDeath5.png";
	
	seahorseDeathImgArray.push(seahorseImg0);
	seahorseDeathImgArray.push(seahorseImg1);
	seahorseDeathImgArray.push(seahorseImg2);
	seahorseDeathImgArray.push(seahorseImg3);
	seahorseDeathImgArray.push(seahorseImg4);
	seahorseDeathImgArray.push(seahorseImg5);	
}
function populateAnemoneImgArray(){
	
	let anemoneImg0=new Image();
	let anemoneImg1=new Image();
	let anemoneImg2=new Image();
	let anemoneImg3=new Image();
	let anemoneImg4=new Image();
	let anemoneImg5=new Image();
	let anemoneImg6=new Image();
	let anemoneImg7=new Image();
	
	anemoneImg0.src="SpriteSheets/Anemone/Idle/anemone0.png";
	anemoneImg1.src="SpriteSheets/Anemone/Idle/anemone1.png";
	anemoneImg2.src="SpriteSheets/Anemone/Idle/anemone2.png";
	anemoneImg3.src="SpriteSheets/Anemone/Idle/anemone3.png";
	anemoneImg4.src="SpriteSheets/Anemone/Idle/anemone4.png";
	anemoneImg5.src="SpriteSheets/Anemone/Idle/anemone5.png";
	anemoneImg6.src="SpriteSheets/Anemone/Idle/anemone6.png";
	anemoneImg7.src="SpriteSheets/Anemone/Idle/anemone7.png";
	
	anemoneIdleImgArray.push(anemoneImg0);
	anemoneIdleImgArray.push(anemoneImg1);
	anemoneIdleImgArray.push(anemoneImg2);
	anemoneIdleImgArray.push(anemoneImg3);
	anemoneIdleImgArray.push(anemoneImg4);
	anemoneIdleImgArray.push(anemoneImg5);
	anemoneIdleImgArray.push(anemoneImg6);
	anemoneIdleImgArray.push(anemoneImg7);
}

function populateBabyAnemoneImgArray(){
	let anemoneImg0=new Image();
	let anemoneImg1=new Image();
	let anemoneImg2=new Image();
	let anemoneImg3=new Image();
	let anemoneImg4=new Image();
	let anemoneImg5=new Image();

	
	anemoneImg0.src="SpriteSheets/BabyAnemone/Idle/anemone0.png";
	anemoneImg1.src="SpriteSheets/BabyAnemone/Idle/anemone1.png";
	anemoneImg2.src="SpriteSheets/BabyAnemone/Idle/anemone2.png";
	anemoneImg3.src="SpriteSheets/BabyAnemone/Idle/anemone3.png";
	anemoneImg4.src="SpriteSheets/BabyAnemone/Idle/anemone4.png";
	anemoneImg5.src="SpriteSheets/BabyAnemone/Idle/anemone5.png";

	
	babyAnemoneIdleImgArray.push(anemoneImg0);
	babyAnemoneIdleImgArray.push(anemoneImg1);
	babyAnemoneIdleImgArray.push(anemoneImg2);
	babyAnemoneIdleImgArray.push(anemoneImg3);
	babyAnemoneIdleImgArray.push(anemoneImg4);
	babyAnemoneIdleImgArray.push(anemoneImg5);


}

function populateSeaweedImgArray(){
	
	let seaweedImg0=new Image();
	let seaweedImg1=new Image();
	let seaweedImg2=new Image();
	let seaweedImg3=new Image();
	let seaweedImg4=new Image();
	let seaweedImg5=new Image();
	let seaweedImg6=new Image();
	let seaweedImg7=new Image();

	
	seaweedImg0.src="SpriteSheets/Seaweed/seaweed0.png";
	seaweedImg1.src="SpriteSheets/Seaweed/seaweed1.png";
	seaweedImg2.src="SpriteSheets/Seaweed/seaweed2.png";
	seaweedImg3.src="SpriteSheets/Seaweed/seaweed3.png";
	seaweedImg4.src="SpriteSheets/Seaweed/seaweed4.png";
	seaweedImg5.src="SpriteSheets/Seaweed/seaweed5.png";
	seaweedImg6.src="SpriteSheets/Seaweed/seaweed6.png";
	seaweedImg7.src="SpriteSheets/Seaweed/seaweed7.png";
	
	seaweedImgArray.push(seaweedImg0);
	seaweedImgArray.push(seaweedImg1);
	seaweedImgArray.push(seaweedImg2);
	seaweedImgArray.push(seaweedImg3);
	seaweedImgArray.push(seaweedImg4);
	seaweedImgArray.push(seaweedImg5);
	seaweedImgArray.push(seaweedImg6);
	seaweedImgArray.push(seaweedImg7);
}
function populateSeagrassImgArray(){
	
	let seagrassImg0=new Image();
	let seagrassImg1=new Image();
	let seagrassImg2=new Image();
/* 	let seagrassImg3=new Image();
	let seagrassImg4=new Image();
	let seagrassImg5=new Image();
	let seagrassImg6=new Image();
	let seagrassImg7=new Image(); */

	
	seagrassImg0.src="SpriteSheets/Seagrass/seagrass0.png";
	seagrassImg1.src="SpriteSheets/Seagrass/seagrass1.png";
	seagrassImg2.src="SpriteSheets/Seagrass/seagrass2.png";
/* 	seagrassImg3.src="SpriteSheets/Seagrass/seagrass3.png";
	seagrassImg4.src="SpriteSheets/Seagrass/seagrass4.png";
	seagrassImg5.src="SpriteSheets/Seagrass/seagrass5.png";
	seagrassImg6.src="SpriteSheets/Seagrass/seagrass6.png";
	seagrassImg7.src="SpriteSheets/Seagrass/seagrass7.png"; */
	
	seagrassImgArray.push(seagrassImg0);
	seagrassImgArray.push(seagrassImg1);
	seagrassImgArray.push(seagrassImg2);
/* 	seagrassImgArray.push(seagrassImg3);
	seagrassImgArray.push(seagrassImg4);
	seagrassImgArray.push(seagrassImg5);
	seagrassImgArray.push(seagrassImg6);
	seagrassImgArray.push(seagrassImg7); */
}

function populateJellyfishImgArray(){
	
	let jellyImg0= new Image();
	let jellyImg1= new Image();
	let jellyImg2= new Image();
	let jellyImg3= new Image();
	let jellyImg4= new Image();
	let jellyImg5= new Image();
	
	jellyImg0.src="SpriteSheets/Jellyfish/jellyIdle0.png"
	jellyImg1.src="SpriteSheets/Jellyfish/jellyIdle1.png"
	jellyImg2.src="SpriteSheets/Jellyfish/jellyIdle2.png"
	jellyImg3.src="SpriteSheets/Jellyfish/jellyIdle3.png"
	jellyImg4.src="SpriteSheets/Jellyfish/jellyIdle4.png"
	jellyImg5.src="SpriteSheets/Jellyfish/jellyIdle5.png"
	
	jellyfishImgArray.push(jellyImg0);
	jellyfishImgArray.push(jellyImg1);
	jellyfishImgArray.push(jellyImg2);
	jellyfishImgArray.push(jellyImg3);
	jellyfishImgArray.push(jellyImg4);
	jellyfishImgArray.push(jellyImg5);
	
	
}
function populateJellyfishDeathImgArray(){
	let jellyImg0= new Image();
	let jellyImg1= new Image();
	let jellyImg2= new Image();
	let jellyImg3= new Image();
	let jellyImg4= new Image();
	let jellyImg5= new Image();
	
	jellyImg0.src="SpriteSheets/Jellyfish/JellyfishDeath/jellyDeath0.png"
	jellyImg1.src="SpriteSheets/Jellyfish/JellyfishDeath/jellyDeath1.png"
	jellyImg2.src="SpriteSheets/Jellyfish/JellyfishDeath/jellyDeath2.png"
	jellyImg3.src="SpriteSheets/Jellyfish/JellyfishDeath/jellyDeath3.png"
	jellyImg4.src="SpriteSheets/Jellyfish/JellyfishDeath/jellyDeath4.png"
	jellyImg5.src="SpriteSheets/Jellyfish/JellyfishDeath/jellyDeath5.png"
	
	jellyfishDeathImgArray.push(jellyImg0);
	jellyfishDeathImgArray.push(jellyImg1);
	jellyfishDeathImgArray.push(jellyImg2);
	jellyfishDeathImgArray.push(jellyImg3);
	jellyfishDeathImgArray.push(jellyImg4);
	jellyfishDeathImgArray.push(jellyImg5);
}

function populateSpongeImgArray(){
	let spongeImg0=new Image();
	let spongeImg1=new Image();
	let spongeImg2=new Image();
	let spongeImg3=new Image();
	let spongeImg4=new Image();
	let spongeImg5=new Image();
	
	spongeImg0.src="SpriteSheets/Sponge/sponge0.png";
	spongeImg1.src="SpriteSheets/Sponge/sponge1.png";
	spongeImg2.src="SpriteSheets/Sponge/sponge2.png";
	spongeImg3.src="SpriteSheets/Sponge/sponge3.png";
	spongeImg4.src="SpriteSheets/Sponge/sponge4.png";
	spongeImg5.src="SpriteSheets/Sponge/sponge5.png";
	
	spongeImgArray.push(spongeImg0);
	spongeImgArray.push(spongeImg1);
	spongeImgArray.push(spongeImg2);
	spongeImgArray.push(spongeImg3);
	spongeImgArray.push(spongeImg4);
	spongeImgArray.push(spongeImg5);
	
}

function populateKrillImgArray(){
	
	let krillImg0 =new Image();
	let krillImg1 =new Image();
	let krillImg2 =new Image();
	let krillImg3 =new Image();
	let krillImg4 =new Image();
	let krillImg5 =new Image();
	
	krillImg0.src="SpriteSheets/Krill/krill0.png";
	krillImg1.src="SpriteSheets/Krill/krill1.png";
	krillImg2.src="SpriteSheets/Krill/krill2.png";
	krillImg3.src="SpriteSheets/Krill/krill3.png";
	krillImg4.src="SpriteSheets/Krill/krill4.png";
	krillImg5.src="SpriteSheets/Krill/krill5.png";
	
	krillImgArray.push(krillImg0);
	krillImgArray.push(krillImg1);
	krillImgArray.push(krillImg2);
	krillImgArray.push(krillImg3);
	krillImgArray.push(krillImg4);
	krillImgArray.push(krillImg5);
	
}

function populateShrimpImgArray(){
	
	let shrimpImg0 =new Image();
	let shrimpImg1 =new Image();
	let shrimpImg2 =new Image();
	let shrimpImg3 =new Image();
	let shrimpImg4 =new Image();
	let shrimpImg5 =new Image();
	
	shrimpImg0.src="SpriteSheets/Shrimp/Idle/shrimp0.png";
	shrimpImg1.src="SpriteSheets/Shrimp/Idle/shrimp1.png";
	shrimpImg2.src="SpriteSheets/Shrimp/Idle/shrimp2.png";
	shrimpImg3.src="SpriteSheets/Shrimp/Idle/shrimp3.png";
	shrimpImg4.src="SpriteSheets/Shrimp/Idle/shrimp4.png";
	shrimpImg5.src="SpriteSheets/Shrimp/Idle/shrimp5.png";
	
	shrimpImgArray.push(shrimpImg0);
	shrimpImgArray.push(shrimpImg1);
	shrimpImgArray.push(shrimpImg2);
	shrimpImgArray.push(shrimpImg3);
	shrimpImgArray.push(shrimpImg4);
	shrimpImgArray.push(shrimpImg5);
	
}

function populateShrimpImgArrayPlankton(){
	
	let shrimpImg0 =new Image();
	let shrimpImg1 =new Image();
	let shrimpImg2 =new Image();
	let shrimpImg3 =new Image();
	let shrimpImg4 =new Image();
	let shrimpImg5 =new Image();
	
	shrimpImg0.src="SpriteSheets/Shrimp/WithPlankton/shrimpWithPlankton0.png";
	shrimpImg1.src="SpriteSheets/Shrimp/WithPlankton/shrimpWithPlankton1.png";
	shrimpImg2.src="SpriteSheets/Shrimp/WithPlankton/shrimpWithPlankton2.png";
	shrimpImg3.src="SpriteSheets/Shrimp/WithPlankton/shrimpWithPlankton3.png";
	shrimpImg4.src="SpriteSheets/Shrimp/WithPlankton/shrimpWithPlankton4.png";
	shrimpImg5.src="SpriteSheets/Shrimp/WithPlankton/shrimpWithPlankton5.png";
	
	shrimpImgArrayPlankton.push(shrimpImg0);
	shrimpImgArrayPlankton.push(shrimpImg1);
	shrimpImgArrayPlankton.push(shrimpImg2);
	shrimpImgArrayPlankton.push(shrimpImg3);
	shrimpImgArrayPlankton.push(shrimpImg4);
	shrimpImgArrayPlankton.push(shrimpImg5);
	
}

function populateShrimpImgArrayCalciumCarbonate(){
	
	let shrimpImg0 =new Image();
	let shrimpImg1 =new Image();
	let shrimpImg2 =new Image();
	let shrimpImg3 =new Image();
	let shrimpImg4 =new Image();
	let shrimpImg5 =new Image();
	
	shrimpImg0.src="SpriteSheets/Shrimp/WithCalciumCarbonate/shrimpWithCC0.png";
	shrimpImg1.src="SpriteSheets/Shrimp/WithCalciumCarbonate/shrimpWithCC1.png";
	shrimpImg2.src="SpriteSheets/Shrimp/WithCalciumCarbonate/shrimpWithCC2.png";
	shrimpImg3.src="SpriteSheets/Shrimp/WithCalciumCarbonate/shrimpWithCC3.png";
	shrimpImg4.src="SpriteSheets/Shrimp/WithCalciumCarbonate/shrimpWithCC4.png";
	shrimpImg5.src="SpriteSheets/Shrimp/WithCalciumCarbonate/shrimpWithCC5.png";
	
	shrimpImgArrayCalciumCarbonate.push(shrimpImg0);
	shrimpImgArrayCalciumCarbonate.push(shrimpImg1);
	shrimpImgArrayCalciumCarbonate.push(shrimpImg2);
	shrimpImgArrayCalciumCarbonate.push(shrimpImg3);
	shrimpImgArrayCalciumCarbonate.push(shrimpImg4);
	shrimpImgArrayCalciumCarbonate.push(shrimpImg5);
	
}

function populateShrimpEatingImgArray(){
	let shrimpImg0 =new Image();
	let shrimpImg1 =new Image();
	let shrimpImg2 =new Image();
	let shrimpImg3 =new Image();
	let shrimpImg4 =new Image();
	let shrimpImg5 =new Image();
	
	shrimpImg0.src="SpriteSheets/Shrimp/Eating/shrimpEating0.png";
	shrimpImg1.src="SpriteSheets/Shrimp/Eating/shrimpEating1.png";
	shrimpImg2.src="SpriteSheets/Shrimp/Eating/shrimpEating2.png";
	shrimpImg3.src="SpriteSheets/Shrimp/Eating/shrimpEating3.png";
	shrimpImg4.src="SpriteSheets/Shrimp/Eating/shrimpEating4.png";
	shrimpImg5.src="SpriteSheets/Shrimp/Eating/shrimpEating5.png";
	
	shrimpEatingImgArray.push(shrimpImg0);
	shrimpEatingImgArray.push(shrimpImg1);
	shrimpEatingImgArray.push(shrimpImg2);
	shrimpEatingImgArray.push(shrimpImg3);
	shrimpEatingImgArray.push(shrimpImg4);
	shrimpEatingImgArray.push(shrimpImg5);
}

function populateCrabIdleImgArray(){
	
	let crabImg0 =new Image();
	let crabImg1 =new Image();
	let crabImg2 =new Image();
	let crabImg3 =new Image();
	let crabImg4 =new Image();
	let crabImg5 =new Image();	

	
	crabImg0.src="SpriteSheets/Crab/idle/crabIdle0.png";
	crabImg1.src="SpriteSheets/Crab/idle/crabIdle1.png";
	crabImg2.src="SpriteSheets/Crab/idle/crabIdle2.png";
	crabImg3.src="SpriteSheets/Crab/idle/crabIdle3.png";
	crabImg4.src="SpriteSheets/Crab/idle/crabIdle2.png";
	crabImg5.src="SpriteSheets/Crab/idle/crabIdle3.png";

	crabIdleImgArray.push(crabImg0);
	crabIdleImgArray.push(crabImg1);
	crabIdleImgArray.push(crabImg2);
	crabIdleImgArray.push(crabImg3);
	crabIdleImgArray.push(crabImg4);
	crabIdleImgArray.push(crabImg5);

}

function populateCrabWalkImgArray(){
	
	let crabImg0 =new Image();
	let crabImg1 =new Image();
	let crabImg2 =new Image();
	let crabImg3 =new Image();
	let crabImg4 =new Image();
	let crabImg5 =new Image();
	//let crabImg6 =new Image();
	//let crabImg7 =new Image();	

	
	crabImg0.src="SpriteSheets/Crab/walk/crabWalk0.png";
	crabImg1.src="SpriteSheets/Crab/walk/crabWalk1.png";
	crabImg2.src="SpriteSheets/Crab/walk/crabWalk2.png";
	crabImg3.src="SpriteSheets/Crab/walk/crabWalk3.png";
	crabImg4.src="SpriteSheets/Crab/walk/crabWalk4.png";
	crabImg5.src="SpriteSheets/Crab/walk/crabWalk5.png";
	//crabImg6.src="SpriteSheets/Crab/walk/crabWalk6.png";
	//crabImg7.src="SpriteSheets/Crab/walk/crabWalk7.png";

	crabWalkImgArray.push(crabImg0);
	crabWalkImgArray.push(crabImg1);
	crabWalkImgArray.push(crabImg2);
	crabWalkImgArray.push(crabImg3);
	crabWalkImgArray.push(crabImg4);
	crabWalkImgArray.push(crabImg5);
	//crabWalkImgArray.push(crabImg6);
	//crabWalkImgArray.push(crabImg7);

}

function populateCrabDeathImgArray(){
	
	let crabImg0 =new Image();
	let crabImg1 =new Image();
	let crabImg2 =new Image();
	let crabImg3 =new Image();
	let crabImg4 =new Image();
	let crabImg5 =new Image();
	//let crabImg6 =new Image();
	//let crabImg7 =new Image();	

	
	crabImg0.src="SpriteSheets/Crab/death/crabDeath0.png";
	crabImg1.src="SpriteSheets/Crab/death/crabDeath1.png";
	crabImg2.src="SpriteSheets/Crab/death/crabDeath2.png";
	crabImg3.src="SpriteSheets/Crab/death/crabDeath3.png";
	crabImg4.src="SpriteSheets/Crab/death/crabDeath4.png";
	crabImg5.src="SpriteSheets/Crab/death/crabDeath5.png";
	//crabImg6.src="SpriteSheets/Crab/walk/crabWalk6.png";
	//crabImg7.src="SpriteSheets/Crab/walk/crabWalk7.png";

	crabDeathImgArray.push(crabImg0);
	crabDeathImgArray.push(crabImg1);
	crabDeathImgArray.push(crabImg2);
	crabDeathImgArray.push(crabImg3);
	crabDeathImgArray.push(crabImg4);
	crabDeathImgArray.push(crabImg5);
	//crabWalkImgArray.push(crabImg6);
	//crabWalkImgArray.push(crabImg7);

}

function populateCrabDeathImgArray(){
	
	let crabImg0 =new Image();
	let crabImg1 =new Image();
	let crabImg2 =new Image();
	let crabImg3 =new Image();
	let crabImg4 =new Image();
	let crabImg5 =new Image();
	//let crabImg6 =new Image();
	//let crabImg7 =new Image();	

	
	crabImg0.src="SpriteSheets/Crab/death/crabDeath0.png";
	crabImg1.src="SpriteSheets/Crab/death/crabDeath1.png";
	crabImg2.src="SpriteSheets/Crab/death/crabDeath2.png";
	crabImg3.src="SpriteSheets/Crab/death/crabDeath3.png";
	crabImg4.src="SpriteSheets/Crab/death/crabDeath4.png";
	crabImg5.src="SpriteSheets/Crab/death/crabDeath5.png";
	//crabImg6.src="SpriteSheets/Crab/walk/crabWalk6.png";
	//crabImg7.src="SpriteSheets/Crab/walk/crabWalk7.png";

	crabDeathImgArray.push(crabImg0);
	crabDeathImgArray.push(crabImg1);
	crabDeathImgArray.push(crabImg2);
	crabDeathImgArray.push(crabImg3);
	crabDeathImgArray.push(crabImg4);
	crabDeathImgArray.push(crabImg5);
	//crabWalkImgArray.push(crabImg6);
	//crabWalkImgArray.push(crabImg7);

}

function populateCrabAttackImgArray(){
	
	let crabImg0 =new Image();
	let crabImg1 =new Image();
	let crabImg2 =new Image();
	let crabImg3 =new Image();
	let crabImg4 =new Image();
	let crabImg5 =new Image();
	//let crabImg6 =new Image();
	//let crabImg7 =new Image();	

	
	crabImg0.src="SpriteSheets/Crab/attack/crabAttack0.png";
	crabImg1.src="SpriteSheets/Crab/attack/crabAttack1.png";
	crabImg2.src="SpriteSheets/Crab/attack/crabAttack2.png";
	crabImg3.src="SpriteSheets/Crab/attack/crabAttack3.png";
	crabImg4.src="SpriteSheets/Crab/attack/crabAttack4.png";
	crabImg5.src="SpriteSheets/Crab/attack/crabAttack5.png";
	//crabImg6.src="SpriteSheets/Crab/walk/crabWalk6.png";
	//crabImg7.src="SpriteSheets/Crab/walk/crabWalk7.png";

	crabAttackImgArray.push(crabImg0);
	crabAttackImgArray.push(crabImg1);
	crabAttackImgArray.push(crabImg2);
	crabAttackImgArray.push(crabImg3);
	crabAttackImgArray.push(crabImg4);
	crabAttackImgArray.push(crabImg5);
	//crabWalkImgArray.push(crabImg6);
	//crabWalkImgArray.push(crabImg7);

}

///HERMIT CRAB

function populateHermitCrabIdleImgArray(){
	
	let crabImg0 =new Image();
	let crabImg1 =new Image();
	let crabImg2 =new Image();
	let crabImg3 =new Image();
	let crabImg4 =new Image();
	let crabImg5 =new Image();	

	
	crabImg0.src="SpriteSheets/HermitCrab/idle/hermitCrabIdle0.png";
	crabImg1.src="SpriteSheets/HermitCrab/idle/hermitCrabIdle1.png";
	crabImg2.src="SpriteSheets/HermitCrab/idle/hermitCrabIdle2.png";
	crabImg3.src="SpriteSheets/HermitCrab/idle/hermitCrabIdle3.png";
	crabImg4.src="SpriteSheets/HermitCrab/idle/hermitCrabIdle4.png";
	crabImg5.src="SpriteSheets/HermitCrab/idle/hermitCrabIdle5.png";

	hermitCrabIdleImgArray.push(crabImg0);
	hermitCrabIdleImgArray.push(crabImg1);
	hermitCrabIdleImgArray.push(crabImg2);
	hermitCrabIdleImgArray.push(crabImg3);
	hermitCrabIdleImgArray.push(crabImg4);
	hermitCrabIdleImgArray.push(crabImg5);

}

function populateHermitCrabWalkImgArray(){
	
	let crabImg0 =new Image();
	let crabImg1 =new Image();
	let crabImg2 =new Image();
	let crabImg3 =new Image();
	let crabImg4 =new Image();
	let crabImg5 =new Image();


	
	crabImg0.src="SpriteSheets/HermitCrab/walk/hermitCrabWalk0.png";
	crabImg1.src="SpriteSheets/HermitCrab/walk/hermitCrabWalk1.png";
	crabImg2.src="SpriteSheets/HermitCrab/walk/hermitCrabWalk2.png";
	crabImg3.src="SpriteSheets/HermitCrab/walk/hermitCrabWalk3.png";
	crabImg4.src="SpriteSheets/HermitCrab/walk/hermitCrabWalk4.png";
	crabImg5.src="SpriteSheets/HermitCrab/walk/hermitCrabWalk5.png";


	hermitCrabWalkImgArray.push(crabImg0);
	hermitCrabWalkImgArray.push(crabImg1);
	hermitCrabWalkImgArray.push(crabImg2);
	hermitCrabWalkImgArray.push(crabImg3);
	hermitCrabWalkImgArray.push(crabImg4);
	hermitCrabWalkImgArray.push(crabImg5);

}




// tidemill 

function populateTidemillImgArray(){
	
	let tidemillImg0 =new Image();
	let tidemillImg1 =new Image();
	let tidemillImg2 =new Image();
	let tidemillImg3 =new Image();
	let tidemillImg4 =new Image();
	let tidemillImg5 =new Image();
	let tidemillImg6 =new Image();
	let tidemillImg7 =new Image();
	let tidemillImg8 =new Image();


	
	tidemillImg0.src="SpriteSheets/Tidemill/Tidemill0.png"
	tidemillImg1.src="SpriteSheets/Tidemill/Tidemill1.png"
	tidemillImg2.src="SpriteSheets/Tidemill/Tidemill2.png"
	tidemillImg3.src="SpriteSheets/Tidemill/Tidemill3.png"
	tidemillImg4.src="SpriteSheets/Tidemill/Tidemill4.png"
	tidemillImg5.src="SpriteSheets/Tidemill/Tidemill5.png"
	tidemillImg6.src="SpriteSheets/Tidemill/Tidemill6.png"
	tidemillImg7.src="SpriteSheets/Tidemill/Tidemill7.png"
	tidemillImg8.src="SpriteSheets/Tidemill/Tidemill8.png"
	


	tidemillImgArray.push(tidemillImg0);
	tidemillImgArray.push(tidemillImg1);
	tidemillImgArray.push(tidemillImg2);
	tidemillImgArray.push(tidemillImg3);
	tidemillImgArray.push(tidemillImg4);
	tidemillImgArray.push(tidemillImg5);
	tidemillImgArray.push(tidemillImg6);
	tidemillImgArray.push(tidemillImg7);
	tidemillImgArray.push(tidemillImg8);
	

}

function populateSandBatteryArray() {
    for (let i = 1; i <= 60; i++) {
        const img = new Image();
        
        img.src = `SpriteSheets/SandBattery/battery_25x50px${i}.png`;
        sandBatteryImgArray.push(img);
    }
	console.log("should get 60", sandBatteryImgArray)
}

//pistol shrimp 

function populatePistolShrimpImgArray(){
	for(let i=0;i<=6;i++){
		const img = new Image();
		
		img.src =`SpriteSheets/PistolShrimp/Idle/pistolShrimp${i}.png`;
		pistolShrimpWalkImgArray.push(img);
	}
	console.log("pistolShrimp Populated")
}

// barracuda 

function populateBarracudaSwimImgArray(){
		for(let i=1;i<=5;i++){
		const img = new Image();
		
		img.src =`SpriteSheets/Barracuda/Swim/${i}.png`;
		barracudaSwimImgArray.push(img);
	}
	console.log("barracudaImgArr",barracudaSwimImgArray)
}


///PIXI JS TEXTURE REFACTOR 

async function loadHermitCrabTextures() {
    const idleCount = 6; // 0 to 5
    const walkCount = 6; // adjust if you have more/less

    // Load Idle Frames
    for (let i = 0; i < idleCount; i++) {
        const path = `SpriteSheets/HermitCrab/idle/hermitCrabIdle${i}.png`;
        const texture = await PIXI.Assets.load(path).catch(err => console.error(`Failed idle ${i}:`, err));
        if (texture) hermitCrabIdleTextures.push(texture);
    }

    // Load Walk Frames
    for (let i = 0; i < walkCount; i++) {
        const path = `SpriteSheets/HermitCrab/walk/hermitCrabWalk${i}.png`; // guessing the path
        const texture = await PIXI.Assets.load(path).catch(err => console.error(`Failed walk ${i}:`, err));
        if (texture) hermitCrabWalkTextures.push(texture);
    }
}