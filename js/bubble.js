let body = document.querySelector('body');
let startBtn = document.querySelector('.start-btn');
let yomiInput = document.getElementsByClassName('the-input')[0];
const canvas = document.getElementById('the-canvas');
const context = canvas.getContext('2d');

canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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

let particles, kanjis;
function init() {
  particles = [];
  kanjis = [];
  const tolerance = 50;
  context.font = '40px serif';

  for (let b = 0; b < 5; b++) {
    const bubbleX = randomIntFromRange(tolerance, canvas.width - tolerance);
    const bubbleY = randomIntFromRange(tolerance, canvas.height - tolerance);

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

init();

let frame;
function animate() {
  frame = requestAnimationFrame(animate);
  // draw background
  context.fillStyle = 'rgba(0, 0, 0, 0.05)';
  context.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach(pg => {
    pg.forEach(particle => {
      particle.update();
    });
  });

  kanjis.forEach(kanji => { kanji.update(); });
}


startBtn.addEventListener('click', (event) => {
  yomiInput.style.display = 'block';
  startBtn.style.display = 'none';
  canvas.style.display = 'block';
  animate();
  //startGame();
});

window.addEventListener('keydown', (event) => {
  if (event.key == '6') {
    makeSparkle();
  }

  if (event.key == '8') {
    window.cancelAnimationFrame(frame);
  }
});

