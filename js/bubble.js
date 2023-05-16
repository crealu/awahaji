// let body = document.querySelector('body');
let startBtn = document.querySelector('.start-btn');
let yomiInput = document.querySelector('.the-input');
const canvas = document.querySelector('.the-canvas');
const context = canvas.getContext('2d');

const tolerance = 50;
const bubbleY = 150;
const radius = 4;
// randomIntFromRange(tolerance, canvas.width - tolerance);

let kanjis = [];
let particles = [];
let frame;

const colors = [
  '#fbab56',  // orange
  '#45f5a5',  // green
  '#7bcdff',  // blue
  '#d277ff',  // purple
  '#f5ff77'   // yellow
];

function makeSparkle(spx, spy) {
  for (var s = 0; s <= 10; s++) {
    let sparkle = new Sparkle(spx, spy);
    sparkle.setup();
    let i = 0;
    let delay = Math.random();
    let id = setInterval(frame, 100);
    function frame() {
      i++;
      if (i >= delay * 3) {
        sparkle.update();
      }
    }
  }
}

function addKanji(x, y, color) {
  let randomNumber = randomInt(80);
  let kanjiText = arrN5[randomNumber].kanji;
  let onYomi = arrN5[randomNumber].on;
  let theYomi = filterYomi(onYomi);
  kanjis.push(new Kanji(x, y, kanjiText, theYomi, color));
}

function addParticles(x, y, color) {
  let particleGroup = [];
  for (let i = 0; i < 4; i++) {
    particleGroup.push(new Particle(x, y, radius, color));
  }
  particles.push(particleGroup);
}

function initObjects() {
  for (let b = 0; b < 5; b++) {
    const bubbleX = b * 150 + 50; 
    const color = randomColor(colors);
    addKanji(bubbleX, bubbleY, color);
    addParticles(bubbleX, bubbleY, color);
  }
}

function styleCanvas() {
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.font = '40px serif';
}

function drawGame() {
  context.fillStyle = 'rgba(0, 0, 0, 0.05)';
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let p = 0; p < particles.length; p++) {
    for (let a = 0; a < particles[p].length; a++) {
      particles[p][a].update();
    }
  }

  for (let i = 0; i < kanjis.length; i++) {
    kanjis[i].update();
  }
}

function animate() {
  drawGame();
  frame = requestAnimationFrame(animate);
}

function startGame() {
  yomiInput.style.display = 'block';
  startBtn.style.display = 'none';
  canvas.style.display = 'block';
  canvas.style.top = '0px';
  canvas.style.position = 'absolute';
  animate();
}

function readInput() {
  for (let i = 0; i < kanjis.length; i++) {
    if (yomiInput.value == kanjis[i].yomi) {
      kanjis[i].pop = true;
      particles[i].forEach(pg => { pg.pop = true; });
      makeSparkle(kanjis[i].x, kanjis[i].y);
      kanjis.splice(i, 1);
      particles.splice(i, 1);
      yomiInput.value = '';
    }
  }
}

function quitGame(event) {
  if (event.key == 'q') {
    window.cancelAnimationFrame(frame);
  }
}

function loadGame() {
  initObjects();
  styleCanvas();
}

startBtn.addEventListener('click', startGame);
yomiInput.addEventListener('input', readInput);
window.addEventListener('keydown', quitGame);
window.addEventListener('load', loadGame);