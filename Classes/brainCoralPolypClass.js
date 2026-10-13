class BrainCoral {
    constructor(x, y, imgSrc) {
        this.x = x;
        this.y = y;

        this.img = new Image();
        this.img.src = imgSrc;

        this.width = 400;
        this.height = 400;
        this.flipped = false;
        this.state = "stop"; 
        this.selected = false;
		
		this.health = 100;
		this.zooPlanktonUpkeep = 1;
		this.algaeUpkeep = 1;
		this.calciumCarbonateProduction = 0.01;
		this.zooplanktonStored = 0;
		this.algaeStored = 0;
		this.phytoplanktonStored = 0;
		this.calciumCarbonateStored = 0;
		this.zooPlanktonStorageCap = 200;
		this.phytoplanktonStorageCap = 200;
		this.algaeStorageCap = 200;
		this.calciumCarbonateStorageCap = 20;
		
		this.isAlive = true;
		
		this.timerId = null;  // Store the interval ID
		
    }


    draw() {
        canvasContext.save();
        canvasContext.drawImage(this.img, this.x, this.y, this.width, this.height);
        canvasContext.restore();

        if (this.selected) {
            canvasContext.lineWidth = 10;
            canvasContext.strokeStyle = "Yellow";
            canvasContext.strokeRect(this.x + 50, this.y + 140, this.width - 100, this.height - 150);
            console.log("Selected Brain Coral!");
			selectText="Brain Coral";
			healthTextUI="Health"+this.health;
			drawBuyBrainCoralPolypUI();
        }
    }

    findState() {
        switch (this.state) {
            case "live":
                this.live();
                break;
			case "stop":
                this.stop();
                break;
				
        }
    }

	live() {
		// Consume resources every second
		if (zooPlankton >= this.zooPlanktonUpkeep && algae >= this.algaeUpkeep) {
			zooPlankton -= this.zooPlanktonUpkeep;
			algae -= this.algaeUpkeep;
			calciumCarbonate += this.calciumCarbonateProduction;
		} else {
			//console.log("Not enough resources for Brain Coral at", this.x, this.y);
		}
		this.stop();
	
	}

	stop() {
		//console.log("not consuming");
		this.state="live";
		// Use an arrow function to maintain the correct `this` context
		this.timerId = setInterval(() => {
			this.findState();  // This will call `findState` with the correct context
		}, 1000);
	}
}