class Rocks{
    constructor(x, y, width,height,size) {
        this.x = x;
        this.y = y;
		this.name="Rocks ";
		

        this.width = width;
        this.height = height;
        this.selected = false;
		this.radius= 100;
		
		this.img=rockMediumImage;
	
		
		//rehydrate
		this.size=size;
		this.calciumCarbonate=0;
    }

    draw() {
			let imgToDraw =this.img;
        //canvasContext.drawImage(imgToDraw, this.x, this.y, this.width, this.height);
			
			if (this.selected){ 
				
				actorSelected=this;
				drawBorder(actorSelected,performance.now() * 0.001)
				drawCalciumCarbonateIcon(this.calciumCarbonate)
				selectText="Rocks "+this.size;
				drawSelectedActorProfilePic(imgToDraw);
				drawStat1Text("Limestone "+Math.abs(this.calciumCarbonate).toString());
			
		}
    }
	
	createRadiusDebug() {
		canvasContext.save();
		canvasContext.globalAlpha = 0.1;    // Set global alpha for reduced opacity
		canvasContext.beginPath();
		canvasContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		canvasContext.fillStyle="blue"
		canvasContext.fill();
		canvasContext.globalAlpha = 1;
		canvasContext.stroke();
		canvasContext.restore();
	}
	
	consumeCalciumCarbonate(actor){
		if(this.calciumCarbonate<=0){
			alertText="No More Limestone"
			return;
		} 
		if(actor){
			this.calciumCarbonate-=1
		}else{
			console.warn("no actors found")
		}
		
	}
	selectStone(size){
		if(size==="tiny"){
			this.size=size;
			this.calciumCarbonate=5;
			this.img=rockTinyImage;
			this.height=75
			this.width=75;
		}
		else if(size ==="small"){
			this.size=size;
			this.calciumCarbonate=10;
			this.img=rockSmallImage;
			this.height=100;
			this.width=100;
		}
		else if(size==="medium"){
			this.size=size;
			this.calciumCarbonate=25;
			this.img=rockMediumImage;
			this.height=75;
			this.width=225;
			
		}
		else if(size==="large"){
			this.size=size;
			this.calciumCarbonate=80;
			this.img=rockLargeImage;
			this.width=170;
			this.height=170
		}
	}
	
		 // loading and saving
	toData() {
		return{
			x:this.x,
			y:this.y,
			width: this.width,
			height: this.height,
			size: this.size,
			calciumCarbonate:this.calciumCarbonate
		}
	}
	
    static fromData(data) {
		const newRocks = new Rocks(data.x, data.y,data.width,data.height,data.size);
		newRocks.calciumCarbonate=data.calciumCarbonate;

		return newRocks;
		
	}	
	
}