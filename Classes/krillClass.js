class Krill {
    constructor(x, y) {
        this.x = x;
        this.y = y;
		this.costSeaweed=100;
		this.building=true;
		this.built=false;
		this.buildTime=500;
		this.maxBuildTime=this.buildTime;

        this.img = new Image();
        this.img.src = "./Pics/krill.png";

        this.width = 400;
        this.height = 200;
        this.flipped = false;
        this.state = "stop"; 
        this.selected = false;
		
		this.planktonLeft=200;
		this.opacity=1;

    }

    draw() {
       
		canvasContext.save();

		  if (this.building) {
			// Calculate opacity inversely to buildTime
			this.opacity = 1 - (this.buildTime / this.maxBuildTime);
			
			// Force completion when buildTime hits 0
			if (this.buildTime <= 0) {
			  this.building = false;
			  this.opacity = 1;
			}
		  }

		  // ALWAYS draw the image, but use opacity to fade it in
		  canvasContext.globalAlpha = this.opacity;
		  canvasContext.drawImage(this.img, this.x, this.y, this.width, this.height);

		  canvasContext.restore();

        // Draw Outline if Selected
        if (this.selected) {
			actorSelected=this;
            canvasContext.lineWidth = 3;
            canvasContext.strokeStyle = "white";
            canvasContext.strokeRect(this.x - 2, this.y - 2, this.width + 4, this.height + 4);
			if(!this.built){
				selectText="Building Krill Farm"
			}else{
				selectText="Krill Farm";		
				drawPlanktonLeft();
				planktonLeftText="Plankton Left: "+this.planktonLeft;
			}
		}
    }

}