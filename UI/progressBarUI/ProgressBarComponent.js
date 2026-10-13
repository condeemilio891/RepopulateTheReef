class ProgressBarComponent {
  constructor(maxValue,color, width = 70, height = 10) {
    this.maxValue = maxValue;
    this.currentValue = maxValue;
	this.color=color;
    
    // Create Bulma-styled progress element
    this.element = document.createElement('progress');
	this.element.className = `progress ${this.getColorClass()} is-medium`;
    this.element.max = maxValue;
    this.element.value = maxValue;
    
     this.container = document.querySelector('div[style*="position: relative"]'); 
    
    // Style positioning
    this.element.style.position = 'absolute';
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.zIndex = 20; // Higher than canvas z-index
    this.element.style.pointerEvents = 'none'; // Prevent blocking canvas clicks
    
    this.container.appendChild(this.element); // Append to container instead of body
  }

  update(current) {
    this.currentValue = current;
    this.element.value = this.maxValue - current; 
  }

   draw(x,y) {
    this.element.style.display = 'block';
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y - 10}px`; // Position above target
  }

  hide() {
    this.element.style.display = 'none';
  }

  destroy() {
    this.element.remove();
  }

  getColorClass() {
    return {
      green: 'is-success',
      orange: 'is-warning',
      red: 'is-danger',
      blue: 'is-info'
    }[this.color] || 'is-primary'; // default to primary
 }
   reset() {
    this.currentValue = this.maxValue;
    this.element.value = this.maxValue;
    this.hide();
  }
  
}

