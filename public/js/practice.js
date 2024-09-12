const title = document.querySelector('.bubble-title');
const dashboard = document.querySelector('.dash');
const startBtn = document.querySelector('.start-btn');
const practiceBtn = document.querySelector('.practice-btn');
const practiceInput = document.querySelector('.practice-input');
const theScore = document.querySelector('.score');
const theKanji = document.querySelector('.kanji');
const theStreak = document.querySelector('.streak-bar');
const streakText = document.querySelector('.streak');
const modal = document.querySelector('.the-modal');
const modalInner = document.querySelector('.modal-inner');
const fx1 = document.getElementsByClassName('fx-audio')[0];

// let kanjis = [];
let readings = [];
let activeReading;
let active;
let currentClass = 'modal-reading';
let limit = 6;
let score = 0;
let hinting = false;
let addition = 10;
let streak = 0;
let factor = 1;
let count = 0;

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

function filterYomi(yomi) {
  return yomi.includes(',') ? yomi.split(',')[0] : yomi;
}

function clear(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
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
  let subRom = '';
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
  hinting = true;
  addition -= 3;
  event.target.nextSibling.style.opacity = '1';
}

function handleMouseLeave(event) {
  hinting = false;
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

function handleInput(event) {
  const inp = event.target.value;
  const red = readings[active][2];

  if (inp.includes('q')) {
    practiceInput.value = inp.replace('q', '');
    return;
  }

  if (inp == red) {
    playAudio(0);

    if (active == readings.length - 1) {
      console.log('finished');
      return;
    }
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
        playAudio(6);
      } else {
        modalInner.scroll({ top: ((active + 1) * 57), behavior: 'smooth' });
        reselectColumn('modal-reading', active + 1);
        showModalReading();
        limit += 7;
        active++;
        playAudio(7);
      }
    }

    if (currentClass == 'modal-kanji') {
      count++;
    }

    if (addition == 10) {
      streak++;
    }

    writeScore();
    addition = 10;
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
  startBtn.style.opacity = '0';
  title.style.opacity = '0';
  modal.style.display = 'block';
  dashboard.style.display = 'block';

  setInterval(() => {
    startBtn.style.display = 'none';
    title.style.display = 'none';
    modal.style.opacity = '1';
    dashboard.style.opacity = '1';
  }, 500);

  displayKanji();
}

function writeScore() {
  if (streak == 5) {
    streakText.innerHTML = '2x';
    factor = 2;
  } else if (streak == 10) {
    streakText.innerHTML = '3x';
    factor = 3;
  } else if (streak == 15) {
    streakText.innerHTML = '4x';
    factor = 4;
  } else if (streak == 20) {
    streakText.innerHTML = '5x';
    factor = 5;
  } else if (streak == 0) {
    streakText.innerHTMl = '';
    facgor = 1;
  }

  score += addition * factor;
  theStreak.style.width = (streak * 5) + 'px';
  theScore.textContent = score;
  theKanji.textContent = count;
}

function updateStreak() {
  theStreak.style.width = '0px';
  streakText.innerHTML = '';
  factor = 1;
  playAudio(1);
}

function quitGame(event) {
  if (event.key == 'q') {
    if (currentClass == 'modal-kanji') {
      streak = 0;
      if (activeReading.nextSibling.style.opacity == '1') {
        activeReading.nextSibling.style.opacity = '0';
        hinting = false;
        if (addition != 0) {
          addition -= 5;
        }
        writeScore();
      } else {
        activeReading.nextSibling.style.opacity = '1';
        hinting = true;
      }
    }
  }

  if (event.key == 'Backspace') {
    if (addition != 0) {
      addition--;
    }

    playAudio(1);

    streak = 0;
    updateStreak();  
  }
}

startBtn.addEventListener('click', startGame);
practiceBtn.addEventListener('click', practice);
practiceInput.addEventListener('input', handleInput);
window.addEventListener('keydown', quitGame);
window.addEventListener('load', addAllKanji);