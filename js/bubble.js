let docBod = document.querySelector('body');
let startBtn = document.querySelector('.start-btn');
let yomiInput = document.getElementsByClassName('the-input')[0];
const canvasHere = document.querySelector('#canvas-here');
const canvas = canvasHere.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = { 
  x: window.innerWidth / 2, 
  y: window.innerHeight / 2 
};

const doc = { 
  gsv: (e, s) => { 
    return getComputedStyle(e).getPropertyValue(s) 
  }
};

const colors = [
  '#fbab56',  // orange
  '#45f5a5',  // green
  '#7bcdff',  // blue
  '#d277ff',  // purple
  '#f5ff77'   // yellow
];

function makeSparkle(spx, spy) {
  // var sparkX = spx;
  // var sparkY = spy;
  // var tol = 30;
  for (var s = 0; s <= 10; s++) {
    let sparkle = new Sparkle(spx, spy);
    sparkle.setup();
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
  canvas.font = '40px serif';

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
    if (yomiInpupt.value == kanjis[i].yomi) {
      kanjis[i].pop = true;
      console.log(particles[i]);
      particles[i].forEach( pg => {
        pg.pop = true;
      });
      makeSparkle(kanjis[i].x, kanjis[i].y);
      kanjis.splice(i, 1);
      particles.splice(i, 1);
      //bubblePop(inp.value);
      yomiInput.value = '';
    }
  }
}

init();

let finish;
function animate() {
  finish = requestAnimationFrame(animate);
  canvas.fillStyle = 'rgba(0, 0, 0, 0.05)';
  canvas.fillRect(0, 0, canvas.width, canvas.height);
  //c.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(pg => {
    pg.forEach(particle => {
      particle.update();
    });
  });

  kanjis.forEach(kanji => { kanji.update(); });
}


startBtn.addEventListener('click', (event) => {
  yomiInput.style.display = 'block';
  docBod.removeChild(document.querySelector('.start-btn'));
  animate();
  //startGame();
});

window.addEventListener('keydown', (event) => {
  event.key == '6' ? makeSparkle(): null;
  event.key == '8' ? window.cancelAnimationFrame(finish): null;
});

window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});


//animate();
