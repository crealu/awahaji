const title = document.querySelector('.bubble-title');
const startBtn = document.querySelector('.start-btn');
const practiceBtn = document.querySelector('.practice-btn');
const practiceInput = document.querySelector('.practice-input');
const modal = document.querySelector('.the-modal');
const modalInner = document.querySelector('.modal-inner');

let readings = [];
let activeReading;
let active;
let currentClass = 'modal-reading';
let limit = 6;
let count = 0;
let round = 0;

function randomInt(max, min) {
  if (min) {
    return Math.floor(Math.random() * (max - min) + min);
  } else {
    return Math.floor(Math.random() * max);
  }
}

function playAudio(time) {
  fx1.currentTime = time;
  fx1.play();
  setTimeout(() => { fx1.pause(); }, 500)
}

function reorder() {
  let a = [];
  let b = [];
  let r = randomInt(0, arrN5.length);

  while (b.length < arrN5.length) {
    if (!a.includes(r)) {
      a.push(r);
      b.push(arrN5[r]);
      continue;
    }
    r = randomInt(0, arrN5.length);
  }

  return b;
}

let kanjis = reorder();

function addAllKanji() {
  for (let i = 0; i < kanjis.length; i++) {
    let kanjiText = kanjis[i].kanji;
    let yomi = kanjis[i].on;
    let oneYomi = filterYomi(yomi);
    readings.push([readings.length, oneYomi]);
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
  return yomi.includes('ゃ') || yomi.includes('ゅ') || yomi.includes('ょ')
}

function buildRomaji(reading) {
  let romaji = '';
  let subRom = ''
  if (containsSmall(reading)) {
    subRom = reading.slice(0, 2);
    romaji += matchCombination(subRom);
    if (reading[2]) {
      romaji += matchOneKana(reading[2]);
    }
  } else {
    for (r of reading) {
      romaji += matchOneKana(r);
    }
  }
  return romaji;
}

function clear(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function filterYomi(yomi) {
  return yomi.includes(',') ? yomi.split(',')[0] : yomi;
}

function parseReadings() {
  let i = 0;
  for (reading of readings) {
    let romaji = buildRomaji(reading[1])
    reading.push(romaji);
    let romajiP = document.getElementsByClassName('modal-romaji')[i];
    romajiP.textContent = romaji;
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

function handleMouseOver(event) {
  event.target.nextSibling.style.opacity = '1';
}

function handleMouseLeave(event) {
  event.target.nextSibling.style.opacity = '0';
}

function resetActive(className) {
  practiceInput.value = '';

  let ar = document.getElementsByClassName('active-reading')[0];
  ar.classList.remove('active-reading');

  let activeKanji = document.getElementsByClassName('modal-kanji')[active]
  let activeRomaji = document.getElementsByClassName('modal-romaji')[active]
  activeRomaji.style.opacity = '1';
  activeKanji.style.opacity = '1';
}

function reselectColumn(newCurrent, newActive) {
  currentClass = newCurrent;
  activeReading = document.getElementsByClassName(currentClass)[newActive];
  activeReading.classList.add('active-reading');
}

function hideReadingAndRomaji() {
  let modalReading = document.getElementsByClassName('modal-reading');
  let modalRomaji = document.getElementsByClassName('modal-romaji');
  let modalKanji = document.getElementsByClassName('modal-kanji');

  for (let m = 0; m < modalRomaji.length; m++) {
    modalRomaji[m].style.opacity = '0';
    modalReading[m].style.opacity = '0';
    modalKanji[m].addEventListener('mouseover', handleMouseOver)
    modalKanji[m].addEventListener('mouseleave', handleMouseLeave)
  }
}

function showModalReading() {
  let modalReading = document.getElementsByClassName('modal-reading');
  let modalRomaji = document.getElementsByClassName('modal-romaji');
  let modalKanji = document.getElementsByClassName('modal-kanji');

  for (let m = 0; m < modalRomaji.length; m++) {
    modalRomaji[m].style.opacity = '0';
    modalReading[m].style.opacity = '1';
    modalKanji[m].removeEventListener('mouseover', handleMouseOver)
    modalKanji[m].removeEventListener('mouseleave', handleMouseLeave)
  }
}

function matchExample(reading, examples) {
  for (let e = 0; e < examples.length; e++) {
    if (examples[e][1].includes(reading) && examples[e][0].length == 2) {
      return examples[e];
    }
  }
}

let newReadings = [];

function fillExamples() {
  let modalReading = document.getElementsByClassName('modal-reading');
  let modalKanji = document.getElementsByClassName('modal-kanji');
  let modalRomaji = document.getElementsByClassName('modal-romaji');

  for (let i = 0; i < 7; i++) {
    modalKanji[i].style.opacity = '0';
    modalRomaji[i].style.opacity = '0';
  }

  setTimeout(() => {
    for (let i = 0; i < 7; i++) {
      let exs = matchExample(readings[i][1], kanjis[i].examples);
      let romex = buildRomaji(exs[1]);

      // modalKanji[i].textContent = exs[0];
      modalKanji[i].textContent = exs[0];
      modalReading[i].textContent = exs[1];
      modalRomaji[i].textContent = exs[2];

      newReadings.push([i, exs[1], romex]);
    }

    readings = newReadings;
  }, 500)
}

function handleInput(event) {
  const inp = event.target.value;
  const red = readings[active][2];

  if (inp.includes('q')) {
    practiceInput.value = inp.replace('q', '');
    return;
  }

  if (inp == red) {
    resetActive(currentClass);
    if (active % limit != 0 || active == limit - 6) {
      active++;
      activeReading = document.getElementsByClassName(currentClass)[active];
      activeReading.classList.add('active-reading');
    } else {
      if (currentClass == 'modal-reading') {
        reselectColumn('modal-kanji', active - 6);
        hideReadingAndRomaji();
        active -= 6;
      } else {
        if (round == 0) {
          fillExamples();
        } else if (round == 1) {
          fillSentences();
        } else {
          console.log('wrap it up');
        }

        setTimeout(() => {
          showModalReading();
          reselectColumn('modal-reading', 0);
          active = 0;
        }, 500)

        round++;
      }
    }

    console.log(active);
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
    kanjiP.innerHTML = kanjis[i].kanji;
    readingP.innerHTML = filterYomi(kanjis[i].on);
    modalInner.appendChild(kanjiP);
    modalInner.appendChild(readingP);
    modalInner.appendChild(romajiP);
  }
  modal.style.display = 'block';
}

function startGame() {
  startBtn.style.display = 'none';
  modal.style.display = 'block';
  modal.style.opacity = '1';
  title.style.display = 'none';

  displayKanji();
}

function quitGame(event) {
  if (event.key == 'q') {

  }
  if (event.key == 'q') {
    window.cancelAnimationFrame(frame);
  }
}

startBtn.addEventListener('click', startGame);
practiceBtn.addEventListener('click', practice);
practiceInput.addEventListener('input', handleInput);
window.addEventListener('keydown', quitGame);
window.addEventListener('load', addAllKanji);