const canvas = document.querySelector('#my-canvas');
const c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let yomiInp = document.getElementsByClassName('the-input')[0];

const mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
}

window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

const colors = [
  '#fbab56', // orange
  '#45f5a5', // green
  '#7bcdff', // blue
  '#d277ff', // purple
  '#f5ff77' // yellow
];

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min * 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function randomSpeed() {
  const speeds = [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08];
  return speeds[randomIntFromRange(1, 4)];
}

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

  draw(lastPoint, c) {
    c.beginPath();
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.stroke()
    c.closePath();
  }

  update() {
    const lastPoint = {
      x: this.x,
      y: this.y
    }

    this.radians += this.velocity;

    this.x = this.sx + Math.cos(this.radians) * this.dfc;
    this.y = this.sy + Math.sin(this.radians) * this.dfc;
    (!this.pop)? this.draw(lastPoint, c): null;
  }
}

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
    c.fillStyle = this.color;
    c.fillText(this.self, this.x, this.y);
  }

  update() {
    (!this.pop)? this.draw(): null;
  }
}

class Sparkle {
  constructor(x, y) {
    this.star = document.getElementById('star');
    this.size = randomInt(20);
    this.x = x;
    this.y = y;
  }

  draw() {

    c.drawImage(
      this.star,
      this.x,
      this.y,
      this.size,
      this.size
    );

  }

  update() {
    this.draw();
  }
}

function makeSparkle(spx, spy) {
  var sparkX = spx;
  var sparkY = spy;
  var tol = 30;
  for (var s = 0; s <= 10; s++) {
    let spark = new Sparkle(
      randomInt(sparkX+tol, sparkX-tol),
      randomInt(sparkY+tol, sparkY-tol)
    );
    let i = 0;
    let delay = Math.random();
    function frame() {
      i++;
      console.log(i);
      if (i >= delay*3) {
        spark.update();
        console.log('drew it');
        clearInterval(id);
      }
    }
    let id = setInterval(frame, 100);
  }
}

let particles, kanjis;
function init() {
  particles = [];
  kanjis = [];
  const tolerance = 50;
  c.font = '40px serif';

  for (let b = 0; b < 5; b++) {
    const bubbleX = randomIntFromRange(tolerance, canvas.width-tolerance);
    const bubbleY = randomIntFromRange(tolerance, canvas.height-tolerance);

    let randomNumber = randomInt(80);
    let kanjiText = arrN5[randomNumber].kanji;
    let kanjiYomi = arrN5[randomNumber].on;
    let oneYomi = filterYomi(kanjiYomi);

    let theColor = randomColor(colors);

    kanjis.push(new Kanji(kanjiText, bubbleX, bubbleY, theColor));
    kanjis[b].yomi = oneYomi;
    let particleGroup = [];
    for (let i = 0; i < 4; i++) {
      //const radius = (Math.random() * 6) * 1;
      const radius = 4;
      particleGroup.push(new Particle(bubbleX, bubbleY, radius, theColor));
    }
    particles.push(particleGroup);
  }
  console.log(kanjis);
}

function getInput() {
  for (var i = 0; i < kanjis.length; i++) {
    if (yomiInp.value == kanjis[i].yomi) {
      kanjis[i].pop = true;
      console.log(particles[i]);
      particles[i].forEach( pg => {
        pg.pop = true;
      });
      makeSparkle(kanjis[i].x, kanjis[i].y);
      kanjis.splice(i, 1);
      particles.splice(i, 1);
      //bubblePop(inp.value);
      yomiInp.value = '';
    }
  }
}

var finish;
function animate() {
  finish = requestAnimationFrame(animate);
  c.fillStyle = 'rgba(0, 0, 0, 0.05)';
  c.fillRect(0, 0, canvas.width, canvas.height);
  //c.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(pg => {
    pg.forEach(particle => {
      particle.update();
    });
  });

  kanjis.forEach(kanji => {
    kanji.update();
  });
}

init();

window.addEventListener('keydown', (event) => {
  event.key == '6' ? makeSparkle(): null;
  event.key == '8' ? window.cancelAnimationFrame(finish): null;
});

let startBtn = document.querySelector('.start-btn')
startBtn.addEventListener('click', (event) => {
  yomiInp.style.display = 'block';
  let docBod = document.querySelector('body');
  docBod.removeChild(document.querySelector('.start-btn'));
  animate();
  //startGame();
});

//animate();
