class UICard {
    constructor(imgSrc, x, y, width, height, title = "",actor) {
        this.imgSrc = imgSrc;       
        this.x = x;                 
        this.y = y;                 
        this.width = width;        
        this.height = height;     
        this.image = new Image();   
        this.image.src = imgSrc;    
        this.imgWidth = 100;       
        this.imgHeight = 100;       
        this.title = title;         
		this.isHovered=false;
		this.actor=actor;
    }

	drawBackground(color = "#7EFF00", borderColor = "#000000",hoverColor="white") {
		// Draw the background rectangle for the card
		
		drawUIRectangle(this.x, this.y, this.width, this.height, this.isHovered ? hoverColor :color);

		// Draw the border for the background
		uiCanvasContext.strokeStyle = this.isHovered ? hoverColor : borderColor;

		uiCanvasContext.lineWidth = 4; // Border thickness
		uiCanvasContext.strokeRect(this.x, this.y, this.width, this.height);
	}


   drawImage(borderColor = "#000000") {
	    uiCanvasContext.save();
		
		const imgX = this.x; 
		const imgY = this.y; 

		uiCanvasContext.drawImage(this.image, imgX, imgY, this.imgWidth, this.imgHeight);
		
		
		uiCanvasContext.restore();

		
   }
    drawText() {
        const textX = this.x + this.imgWidth + (this.width - this.imgWidth) / 2; // Center the text horizontally after the image
        const textY = this.y + this.height/4

        uiCanvasContext.fillStyle = "black"; // Text color
        uiCanvasContext.font = "20px Arial"; // Font style
        uiCanvasContext.textAlign = "center"; // Center the text horizontally
        uiCanvasContext.textBaseline = "middle"; // Center the text vertically
        uiCanvasContext.fillText(this.title, textX, textY); // Draw the title
    }

    draw() {
        this.drawBackground(); 
        this.drawImage();      
        this.drawText();       
    }
}