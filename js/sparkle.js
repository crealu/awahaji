class Sparkle {
  constructor(x, y) {
    this.star = document.getElementById('star');
    this.size = randomInt(20);
    this.tolerance = 30;
    this.x = x;
    this.y = y;
    this.setup()
  }

  setup() {
    const x0 = this.x + this.tolerance;
    const x1 = this.x - this.tolerance;
    const y0 = this.y + this.tolerance;
    const y1 = this.y - this.tolerance;
    this.x = randomInt(x0, x1);
    this.y = randomInt(y0, y1);
  }

  draw() {
    context.drawImage(this.star, this.x, this.y, this.size, this.size);
  }

  update() {
    this.draw();
  }
}