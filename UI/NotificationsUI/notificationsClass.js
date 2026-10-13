class Notification {
    constructor(notificationImage, notificationText, priority = "normal") {
        this.image = notificationImage;
        this.text = notificationText;
        this.priority = priority;
        this.x = 50;           // Left margin for first notification
        this.y = 10;           // Top margin
        this.width = 320;      // Width per notification
        this.height = 80;      // Height per notification
        this.spacing = 15;     // Gap between notifications
        this.lifetime = 4000;
        this.createdAt = Date.now();
        this.alpha = 1;
        this.isVisible = true;
    }

    draw(ctx, index) {
        if (!this.isVisible) return;
        
        // Stack from left to right
        const x = this.x + index * (this.width + this.spacing);
        const y = this.y;
        
        ctx.save();
        ctx.globalAlpha = this.alpha;
        
        // Background with rounded corners
        const radius = 8;
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 8;
        ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
        
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + this.width - radius, y);
        ctx.quadraticCurveTo(x + this.width, y, x + this.width, y + radius);
        ctx.lineTo(x + this.width, y + this.height - radius);
        ctx.quadraticCurveTo(x + this.width, y + this.height, x + this.width - radius, y + this.height);
        ctx.lineTo(x + radius, y + this.height);
        ctx.quadraticCurveTo(x, y + this.height, x, y + this.height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
        
        // Priority-based border color
        let borderColor = "rgba(255,255,255,0.2)";
        if (this.priority === "high") {
            borderColor = "rgba(255, 50, 50, 0.6)";
        } else if (this.priority === "normal") {
            borderColor = "rgba(50, 150, 255, 0.6)";
        } else if (this.priority === "low") {
            borderColor = "rgba(50, 255, 50, 0.6)";
        }
        
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Icon
        if (this.image) {
            ctx.drawImage(this.image, x + 10, y + 20, 40, 40);
        }
        
        // Text
        ctx.fillStyle = "white";
        ctx.font = "14px Arial, sans-serif";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        
        const textX = this.image ? x + 60 : x + 15;
        const textY = y + 20;
        const maxWidth = this.width - (this.image ? 80 : 30);
        const lineHeight = 18;
        
        // Wrap text
        const words = this.text.split(' ');
        let line = '';
        let currentY = textY;
        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && i > 0) {
                ctx.fillText(line, textX, currentY);
                line = words[i] + ' ';
                currentY += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, textX, currentY);
        
        ctx.restore();
    }

    isExpired() {
        return Date.now() - this.createdAt > this.lifetime;
    }
}