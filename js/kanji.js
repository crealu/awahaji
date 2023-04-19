class Kanji {
  constructor(kanji, x, y, color) {
    this.self = kanji;
    this.x = x - 23;
    this.y = y + 16;
    this.color = color;
    this.yomi = '';
    this.pop = false;
  }

  draw() {
    canvas.fillStyle = this.color;
    canvas.fillText(this.self, this.x, this.y);
  }

  update() {
    // (!this.pop)? this.draw(): null;
    if (!this.pop) {
      this.draw();
    }
  }
}