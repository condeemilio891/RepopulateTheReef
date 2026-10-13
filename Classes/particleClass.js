class Particle {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;

        // Size (make it variable)
        this.width = 50;
        this.height = 50;
        
        // --- Add these ---
        // Motion
        this.vx = (Math.random() - 0.5) * 4;   // velocity x
        this.vy = (Math.random() - 0.5) * 4;   // velocity y
        
        // Physics
        this.gravity = 0.1;
        this.friction = 0.98;
        
        // Life
        this.life = 1.0;        // 1 = full, 0 = dead
        this.decay = 0.01;      // life lost per frame
        this.active = true;
        
        // Visual variety
        this.rotation = 0;
        this.rotSpeed = (Math.random() - 0.5) * 0.05;
        this.alpha = 1.0;
        this.scale = 0.5 + Math.random() * 1.0;
    }
    
    update() {
        // Apply physics
        this.vx *= this.friction;
        this.vy += this.gravity;
        
        // Move
        this.x += this.vx;
        this.y += this.vy;
        
        // Rotation
        this.rotation += this.rotSpeed;
        
        // Age
        this.life -= this.decay;
        this.alpha = this.life;    // fade out
        
        if (this.life <= 0) {
            this.active = false;
        }
    }
    
    draw() {   // pass canvas context explicitly
        canvasContext.save();
        canvasContext.globalAlpha = this.alpha;
        canvasContext.translate(this.x + this.width/2, this.y + this.height/2);
        canvasContext.rotate(this.rotation);
        canvasContext.scale(this.scale, this.scale);
        canvasContext.drawImage(this.img, -this.width/2, -this.height/2, this.width, this.height);
        canvasContext.restore();
    }
}