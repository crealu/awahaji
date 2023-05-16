class Kanji {
  constructor(x, y, kanji, yomi, color) {
    this.x = x - 23;
    this.y = y + 16;
    this.self = kanji;
    this.yomi = yomi;
    this.color = color;
    this.pop = false;
  }

  draw() {
    context.fillStyle = this.color;
    context.fillText(this.self, this.x, this.y);
  }

  update() {
    if (!this.pop) {
      this.draw();
    }
  }
}