class Particle {
  constructor(x, y, radius, color) {
    this.sx = x;
    this.sy = y;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * Math.PI * 2;
    this.velocity = randomSpeed();
    this.distanceFromCenter = {
      x: randomIntFromRange(30, 60),
      y: randomIntFromRange(30, 60)
    };
    this.dfc = randomIntFromRange(30, 50);
    this.lastMouse = {
      x: x,
      y: y
    }
    this.pop = false;
  }

  draw(lastPoint, canvas) {
    canvas.beginPath();
    canvas.strokeStyle = this.color;
    canvas.lineWidth = this.radius;
    canvas.moveTo(lastPoint.x, lastPoint.y);
    canvas.lineTo(this.x, this.y);
    canvas.stroke()
    canvas.closePath();
  }

  update() {
    const lastPoint = {
      x: this.x,
      y: this.y
    }

    this.radians += this.velocity;
    this.x = this.sx + Math.cos(this.radians) * this.dfc;
    this.y = this.sy + Math.sin(this.radians) * this.dfc;
    
    if (!this.pop) {
      this.draw(lastPoint, canvas);
    }
    // (!this.pop)? this.draw(lastPoint, c): null;
  }
}