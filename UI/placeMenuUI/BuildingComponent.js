class BuildingComponent {  //generalize to building comp? 
  constructor(imagePath, type, quantity, cost ,isActive) {
    this.imagePath = imagePath;
    this.type = type;
    this.quantity = quantity;
	this.cost = cost 
	this.isActive=isActive
    this.element = this.#createComponent();
	this.counterElement = this.element.querySelector('.coral-counter');
  }

	#createComponent() {
		const figure = document.createElement('figure');
		figure.className = 'image is-128x128 coral-component';
		figure.style.position = 'relative'; // ensure absolute positioning works inside

		const img = document.createElement('img');
		img.className = 'is-rounded coral-image'; // reuse
		img.src = this.imagePath;
		img.dataset.buildingType = this.type;

		const counter = document.createElement('div');
		counter.className = 'coral-counter'; // reusing
		counter.textContent = this.quantity;

		const costDiv = document.createElement('div');
		costDiv.className = 'building-cost';
		costDiv.textContent = `$${this.cost}`;

		const title = document.createElement('div');
		title.className="coral-title"; // should I just reuse? 
		title.textContent= this.type;
		// optional: convert camelCase to spaced words
		title.textContent = this.type.replace(/([A-Z])/g, ' $1').trim();
		
		figure.appendChild(img);
		figure.appendChild(counter);
		figure.appendChild(costDiv);   // 👈 append cost
		figure.appendChild(title);
		return figure;
	}
  
  decreaseQuantity(){
	  this.quantity = Math.max(this.quantity - 1, 0); //prevents negatives 
    this.counterElement.textContent = this.quantity; // 🚨 Update DOM here
  }

  makeInactive(){
	  this.isActive=false;
  }
}