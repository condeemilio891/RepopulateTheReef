let bubbleImg= new Image();
bubbleImg.src="Pics/particles/bubble2.png";

let expelAlgaeImg= new Image();
expelAlgaeImg.src="Pics/particles/algaeExpel.png";

function spawnBubbles(img){
	let bubble= new Particle(mouseX,mouseY,img);
	particlesArray.push(bubble)
}

function spawnBubbleAtActor(actor){
	let amount =1
		while(amount>=0){
		

		let bubble = new Particle(actor.x, actor.y, bubbleImg);
		bubble.friction = .7;
		bubble.gravity = 0;
		bubble.decay = .1;
		bubble.life=20;
		bubble.vx=Math.random()*3;
		bubble.vy=(Math.random() * 1.2 +2) *-1;
		particlesArray.push(bubble);
		amount--;
	}
	
}


function expelAlgaeEffect(actor){
	
		let amount =1
		while(amount>=0){
		

		let bubble = new Particle(actor.x, actor.y, expelAlgaeImg);
		bubble.height=actor.height;
		bubble.width=actor.width;
		bubble.friction = .7;
		bubble.gravity = 0;
		bubble.decay = .1;
		bubble.life=5;
		bubble.vx=Math.random()*3;
		bubble.vy=(Math.random() * 1.2 +2) *-1;
		particlesArray.push(bubble);
		amount--;
	}
	
}

function createExpelAlgaeEffect(){
	//eventually gen to all coral 
	organPipeCoralArray.forEach(coral=>{
		if(coral.overheating){
			expelAlgaeEffect(coral);
		}
	})
}
function createBubbleEffectAtActors(){
	const randomPC = PCArray[Math.floor(Math.random() * PCArray.length)];
	spawnBubbleAtActor(randomPC);
	const randomSponge0=spongeArray[Math.floor(Math.random() * spongeArray.length)]
	const randomSponge1=spongeArray[Math.floor(Math.random() * spongeArray.length)]
	spawnBubbleAtActor(randomSponge0);
	spawnBubbleAtActor(randomSponge1);
	
	
	const randomSeaweed0=seaweedArray[Math.floor(Math.random() * seaweedArray.length)]
	const randomSeaweed1=seaweedArray[Math.floor(Math.random() * seaweedArray.length)]
	spawnBubbleAtActor(randomSeaweed0);
	spawnBubbleAtActor(randomSeaweed1);
	
	
	const randomSeagrass0=seagrassArray[Math.floor(Math.random() * seagrassArray.length)]
	const randomSeagrass1=seagrassArray[Math.floor(Math.random() * seagrassArray.length)]
	spawnBubbleAtActor(randomSeagrass0);
	spawnBubbleAtActor(randomSeagrass0);
}

function spawnBubbleProjectile(x,y,img){
	let amount=3
	while(amount>=0){
		

		let bullet = new Particle(x, y, img);
		bullet.friction = 1.0;
		bullet.gravity = 0;
		bullet.decay = .1;
		bullet.life=20;
		bullet.vx=(Math.random() - 0.5) * 20;
		bullet.vy=(Math.random() - 0.5) * 20;
		particlesArray.push(bullet);
		amount--;
	}
}


function handleSpawnBubble(evt){
	//spawnBubbles(bubbleImg);
	spawnBubbleProjectile(mouseX,mouseY,bubbleImg)
}


