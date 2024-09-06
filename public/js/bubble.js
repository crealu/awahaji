// let body = document.querySelector('body');
let startBtn = document.querySelector('.start-btn');
let beginBtn = document.querySelector('.begin-btn');
let regenerateBtn = document.querySelector('.regenerate-btn');
let practiceBtn = document.querySelector('.practice-btn');
let yomiInput = document.querySelector('.the-input');
let practiceInput = document.querySelector('.practice-input');
let modal = document.querySelector('.the-modal');
let modalInner = document.querySelector('.modal-inner');
const canvas = document.querySelector('.the-canvas');
const context = canvas.getContext('2d');

const tolerance = 50;
const bubbleY = 300;
const radius = 4;
let allKanji = [];
let kanjis = [];
let particles = [];
let readings = [];
let answered = [];
let frame;
let finished = false;

let activeReading;
let active;
let currentClass = 'modal-reading';

const colors = [
  '#fbab56',  // orange
  '#45f5a5',  // green
  '#7bcdff',  // blue
  '#d277ff',  // purple
  '#f5ff77',  // yellow
  '#ff7777'   // red
];

// randomIntFromRange(tolerance, canvas.width - tolerance);
// (async function() {
//   await fetch('https://kanji-data.herokuapp.com/n5Kanji')
//     .then(res => res.json())
//     .then(data => { allKanji = data.kanji.n5 })
//     .catch(err => { throw err })

//   console.log(allKanji);
// })();

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
  // displayStats();
}

function displayStats() {
  console.log('kanjis: ', kanjis)
  console.log('answered: ', answered)
  console.log('readings: ', readings)
}

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

function restyleReadings() {
  practiceInput.value = '';
  let allReadings = document.getElementsByClassName('modal-reading');
  for (r of allReadings) {
    r.classList.remove('active-reading');
  }
}

function matchOneKana(yomi) {
  for (k of kana) {
    if (yomi == k[1]) {
      return k[0];
    }
  }
}

function matchCombination(yomi) {
  for (let i = 71; i < kana.length; i++) {
    if (yomi == kana[i][1]) {
      return kana[i][0];
    }
  }
}

function containsSmall(yomi) {
  return yomi.includes('ゃ') ||
         yomi.includes('ゅ') ||
         yomi.includes('ょ')
}

function parseReadings() {
  let i = 0;
  for (reading of readings) {
    let full = reading[1];
    let rom = '';
    let subRom = ''
    if (containsSmall(full)) {
      subRom = full.slice(0, 2);
      rom += matchCombination(subRom);
      if (full[2]) {
        rom += matchOneKana(full[2]);
      }
    } else {
      for (r of reading[1]) {
        rom += matchOneKana(r);
      }
    }

    reading.push(rom);
    let romajiP = document.getElementsByClassName('modal-romaji')[i];
    romajiP.textContent = rom;
    i++;
  }
}

function practice(n) {
  practiceInput.style.opacity = '1';
  practiceInput.focus();
  parseReadings();
  active = 0;
  activeReading = document.getElementsByClassName(currentClass)[active];
  activeReading.classList.add('active-reading');
}

function resetSequence() {
  active = 0;
  currentClass = 'modal-kanji';
  activeItem = document.getElementsByClassName(currentClass)[active];
  activeItem.classList.add('active-reading');
}

function handleInput(event) {
  const inp = event.target.value;
  const red = readings[active][2];
  if (inp == red) {
    restyleReadings();
    let activeRomaji = document.getElementsByClassName('modal-romaji')[active]
    activeRomaji.style.opacity = '1';
    if (active != readings.length - 1) {
      active++;
      activeReading = document.getElementsByClassName(currentClass)[active];
      activeReading.classList.add('active-reading');
    } else {
      resetSequence();
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

function displayKanji() {
  clear(modalInner);
  for (let i = 0; i < kanjis.length; i++) {
    let kanjiP = document.createElement('p');
    let readingP = document.createElement('p');
    let romajiP = document.createElement('p');
    readingP.classList.add('modal-reading');
    romajiP.classList.add('modal-romaji');
    kanjiP.classList.add('modal-kanji');
    kanjiP.innerHTML = kanjis[i].self;
    readingP.innerHTML = kanjis[i].yomi;
    modalInner.appendChild(readingP);
    modalInner.appendChild(romajiP);
    modalInner.appendChild(kanjiP);
  }
  modal.style.display = 'block';
}

function startGame() {
  startBtn.style.display = 'none';
  modal.style.display = 'block';
  modal.style.opacity = '1';
  displayKanji();
}

function beginGame() {
  modal.style.opacity = '0';
  yomiInput.style.display = 'block';
  canvas.style.display = 'block';
  canvas.style.top = '0px';
  canvas.style.position = 'absolute';
  animate();
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

beginBtn.addEventListener('click', beginGame)
startBtn.addEventListener('click', startGame);
regenerateBtn.addEventListener('click', regenerate);
practiceBtn.addEventListener('click', practice);
yomiInput.addEventListener('input', readInput);
practiceInput.addEventListener('input', handleInput);
window.addEventListener('keydown', quitGame);
window.addEventListener('load', loadGame);