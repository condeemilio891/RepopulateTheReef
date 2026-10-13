class CalciumCarbonate {
    constructor(x, y) {
        this.name = "calciumCarbonate";
        this.x = x;
        this.y = y;
        this.img = limestoneImage;
        this.width = 25;
        this.height = 25;
        this.targeted = false;
        this.targetedBy = null;

    }

	draw() {//old draw function
        let imgToDraw = this.img;

            canvasContext.drawImage(imgToDraw, this.x, this.y, this.width, this.height);
    }


    toData() {
        return { x: this.x, y: this.y };
    }

    static fromData(data) {
        return new CalciumCarbonate(data.x, data.y);
    }
}