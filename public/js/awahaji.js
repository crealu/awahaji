// let body = document.querySelector('body');
let startBtn = document.querySelector('.start-btn');
let beginBtn = document.querySelector('.begin-btn');
let regenerateBtn = document.querySelector('.regenerate-btn');
let yomiInput = document.querySelector('.the-input');
let modal = document.querySelector('.the-modal');
let modalInner = document.querySelector('.modal-inner');
const canvas = document.querySelector('.the-canvas');
const context = canvas.getContext('2d');

class AwaHaji {
  constructor(allKanji) {
    self.arrN5 = allKanji;
    self.kanjis = [];
    self.particles = [];
    self.readings = [];
    self.ansered = [];
    self.finished = false;
    self.frame;
    self.movedBubble;
    self.colors = [
      '#fbab56',  // orange
      '#45f5a5',  // green
      '#7bcdff',  // blue
      '#d277ff',  // purple
      '#f5ff77',  // yellow
      '#ff7777'   // red
    ];
  }

  addKanji() {
    let randomNumber = randomInt(80);
    let kanjiText = self.arrN5[randomNumber].kanji;
    let onYomi = self.arrN5[randomNumber].on;
    let theYomi = filterYomi(onYomi);
    while (self.readings.includes(theYomi)) {
      randomNumber = randomInt(80);
      kanjiText = self.arrN5[randomNumber].kanji;
      onYomi = self.arrN5[randomNumber].on;
      theYomi = filterYomi(onYomi);
    }
    readings.push([readings.length, theYomi]);
    kanjis.push(new Kanji(x, y, kanjiText, theYomi, color));
  }

  createBubble() {
    let bubble = document.createElement('div');
    bubble.classList.add('the-bubble');
    bubble.classList.add('out-of-sling');
    bubble.setAttribute('draggable', 'true');
    bubble.innerHTML = 'あ';
    bubble.addEventListener('dragstart', dragstartHandler);
    bubble.addEventListener('touchstart', touchstartHandler);
    bubble.addEventListener('touchmove', touchmoveHandler);
    bubble.addEventListener('touchend', touchendHandler);

    let sling = document.createElement('div');
    sling.classList.add('the-sling');
    sling.setAttribute('droppable', 'true');
    sling.addEventListener('dragover', dragoverHandler);
    sling.addEventListener('drop', dropHandler);
    // sling.addEventListener('touchend', dropHandler);

    document.body.appendChild(bubble);
    document.body.appendChild(sling);
  }


}

const tolerance = 50;
const bubbleY = 300;
const radius = 4;
// randomIntFromRange(tolerance, canvas.width - tolerance);

let kanjis = [];
let particles = [];
let readings = [];
let answered = [];
let frame;
let finished = false;

const colors = [
  '#fbab56',  // orange
  '#45f5a5',  // green
  '#7bcdff',  // blue
  '#d277ff',  // purple
  '#f5ff77',  // yellow
  '#ff7777'   // red
];

function makeSparkle(spx, spy) {
  for (var s = 0; s <= 10; s++) {
    let sparkle = new Sparkle(spx, spy);
    let i = 0;
    let delay = Math.random();
    let id = setInterval(frame, 100);
    function frame() {
      i++;
      if (i >= delay * 3) {
        sparkle.update(context);
      }
    }
  }
}

// setup
function addKanji(x, y, color) {
  let randomNumber = randomInt(80);
  let kanjiText = arrN5[randomNumber].kanji;
  let onYomi = arrN5[randomNumber].on;
  let theYomi = filterYomi(onYomi);
  while (readings.includes(theYomi)) {
    randomNumber = randomInt(80);
    kanjiText = arrN5[randomNumber].kanji;
    onYomi = arrN5[randomNumber].on;
    theYomi = filterYomi(onYomi);
  }
  readings.push([readings.length, theYomi]);
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
  let start = window.innerWidth / 2 - (2 * 150) + 50;
  let end = start + 500;
  for (let bubbleX = start; bubbleX <= end; bubbleX += 100) {
    const color = randomColor(colors);
    colors.splice(colors.indexOf(color), 1);
    addKanji(bubbleX, bubbleY, color);
    addParticles(bubbleX, bubbleY, color);
  }
  displayStats();
  createBubble();
}

let movedBubble;

function dragstartHandler(event) {
  movedBubble = event.target;
  event.dataTransfer.dropEffect = 'move';
  console.log('drag started')
}

function dragoverHandler(event) {
  event.preventDefault();
  event.target.background = 'red';
}

function dropHandler(event) {
  event.preventDefault();
  if (event.target.className == 'the-sling') {
    movedBubble.classList.add('in-sling');
    movedBubble.classList.remove('out-of-sling');
    console.log(movedBubble.textContent);
    event.target.appendChild(movedBubble);
  }
}

function touchstartHandler(event) {
  event.preventDefault();
  event.target.style.background = 'blue';
  document.body.innerHTML += touchLocation.pageX;
  movedBubble = event.target;
  movedBubble.style.left = touchLocation.pageX + 'px';
  movedBubble.style.top = touchLocation.pageY + 'px';
  document.body.innerHTML += movedBubble.style.left;
}

function touchmoveHandler(event) {
  event.preventDefault();
  let touchLocation = event.touches[0];
  movedBubble.style.left = touchLocation.pageX + `px`;
  movedBubble.style.top = touchLocation.pageY + `px`;
}

function touchendHandler(event) {
  event.preventDefault();
  let x = parseInt(movedBubble.style.left);
  let y = parseInt(movedBubble.style.top);

  if (x > 156) {
    movedBubble.style.background = 'red';
  } else if (x < 50) {
    movedBubble.style.background = 'yellow';
  }

  document.body.innerHTML += movedBubble.style.left;
}

function displayStats() {
  console.log('kanjis: ', kanjis)
  console.log('answered: ', answered)
  console.log('readings: ', readings)
}

function displayKanji() {
  clear(modalInner);
  for (let i = 0; i < kanjis.length; i++) {
    let kanjiP = document.createElement('p');
    let readingP = document.createElement('p');
    readingP.classList.add('modal-reading');
    kanjiP.innerHTML = kanjis[i].self;
    readingP.innerHTML = kanjis[i].yomi;
    modalInner.appendChild(kanjiP);
    modalInner.appendChild(readingP);
  }
  modal.style.display = 'block';
}

function startGame() {
  startBtn.style.display = 'none';
  // modal.style.display = 'block';
  modal.style.opacity = '1';
  displayKanji();
}

function beginGame() {
  // modal.style.opacity = '0';
  // yomiInput.style.display = 'block';
  // canvas.style.display = 'block';
  // canvas.style.top = '0px';
  // canvas.style.position = 'absolute';
  // animate();
}

function regenerate() {
  kanjis = [];
  particles = [];
  readings = []
  initObjects();
  displayKanji();
}

function styleCanvas() {
  canvas.style.width = window.innerWidth + 'px';
  canvas.style.height = window.innerHeight + 'px';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.font = '40px serif';
}

function loadGame() {
  initObjects();
  styleCanvas();
}

function quitGame(event) {
  if (event.key == 'q') {
    window.cancelAnimationFrame(frame);
  }
}

// gameplay
function readInput() {
  for (let i = 0; i < readings.length; i++) {
    if (yomiInput.value == readings[i][1]) {
      kanjis[readings[i][0]].pop = true;
      answered.push(readings[i][0]);
      console.log('splicing ' + readings[i][0]);
      readings.splice(i, 1);
      yomiInput.value = '';
      // particles.splice(i, 1);
      // particles[i].forEach(pg => { pg.pop = true; });
      // particles[i].forEach(particle => {
      //   particle.disperse(context);
      // });
      setTimeout(() => {
        displayStats()
        // kanjis.splice(i, 1);
        // particles.splice(i, 1);
        // yomiInput.value = '';
      }, 100)
    }
  }
}

function drawGame() {
  context.fillStyle = 'rgba(0, 0, 0, 0.05)';
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let p = 0; p < particles.length; p++) {
    for (let a = 0; a < particles[p].length; a++) {
      if (answered.includes(p)) {
        particles[p][a].disperse(context);
        particles[p][a].pop = true;
      } else {
        particles[p][a].update(context);
      }
    }
  }

  for (let i = 0; i < kanjis.length; i++) {
    kanjis[i].update(context);
  }
}

function animate() {
  if (answered.length == 6) {
    setTimeout(() => {
      window.cancelAnimationFrame(animate);
      console.log('finished');
      finished = true;
    }, 1000);
    if (finished) {
      return;
    }
  }
  if (!finished) {
    drawGame();
    frame = requestAnimationFrame(animate);
  }
}



beginBtn.addEventListener('click', beginGame)
startBtn.addEventListener('click', startGame);
regenerateBtn.addEventListener('click', regenerate);
yomiInput.addEventListener('input', readInput);
window.addEventListener('keydown', quitGame);
window.addEventListener('load', loadGame);