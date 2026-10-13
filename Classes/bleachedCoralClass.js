class BleachedCoral {
    constructor(x, y) {
        this.name = "Bleached Coral";
        this.x = x;
        this.y = y;
        this.img = new Image();
		this.img.src="Pics/bleachedCoral.png"
        this.width = 205;
        this.height = 205;
        this.targeted = false;
        this.targetedBy = null;

    }

	draw() {//old draw function
        let imgToDraw = this.img;

            canvasContext.drawImage(imgToDraw, this.x, this.y, this.width, this.height);
			
			if (this.selected) {
			actorSelected = this;
			drawBorder(actorSelected,performance.now() * 0.001)
			this.createRadiusDebug();
			selectText = "Bleahed Coral "
			drawSelectedActorProfilePic(this.img);
			
			
			
			drawOutlinerIcon1(this.attributeIcon1,"Bleached: Less Algae Cap \nExpels Algae More Often","black");
			drawOutlinerIcon2(this.attributeIcon2,"Energy Depleation: Lack of Algae\nLeads to Increased Hunger ","black");
			drawOutlinerIcon3(this.attributeIcon2,"Weakened: Less ","black");
			drawOutlinerIcon4(this.attributeIcon2,"Fertilizes Plants in Radius","black");
			
		}
    }


    toData() {
        return { x: this.x, y: this.y };
    }

    static fromData(data) {
        return new CalciumCarbonate(data.x, data.y);
    }
}