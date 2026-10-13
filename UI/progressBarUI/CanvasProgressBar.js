class CanvasProgressBar {
  constructor(context, maxValue, color, x, y, width = 300, height = 30) {
    this.context = context;
    this.maxValue = maxValue;
    this.currentValue = maxValue;
    this.color = color;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  update(current,maxValue) {
    this.currentValue = current;
	this.maxValue= maxValue;

  }

  draw() {
    const ctx = this.context;
    const progressWidth = (this.currentValue / this.maxValue) * this.width;

    // Draw background
    ctx.fillStyle = "#444";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Draw progress
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, progressWidth, this.height);

    // Draw border
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}