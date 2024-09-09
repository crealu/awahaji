const startBtn = document.querySelector('.start-btn');
const practiceBtn = document.querySelector('.practice-btn');
const practiceInput = document.querySelector('.practice-input');
const modal = document.querySelector('.the-modal');
const modalInner = document.querySelector('.modal-inner');

let kanjis = [];
let readings = [];
let activeReading;
let active;
let currentClass = 'modal-reading';
let limit = 6;
let count = 0;

function addAllKanji() {
  for (let i = 0; i < arrN5.length; i++) {
    let kanjiText = arrN5[i].kanji;
    let yomi = arrN5[i].on;
    let oneYomi = filterYomi(yomi);
    readings.push([readings.length, oneYomi]);
    kanjis.push(new Kanji(0, 0, kanjiText, oneYomi, '#ff7777'));
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

function handleInput(event) {
  const inp = event.target.value;
  const red = readings[active][2];

  if (inp == red) {
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
      } else {
        modalInner.scroll({ top: ((active + 1) * 57), behavior: 'smooth' });
        reselectColumn('modal-reading', active + 1);
        showModalReading();
        limit += 7;
        active++;
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
    kanjiP.innerHTML = kanjis[i].self;
    readingP.innerHTML = kanjis[i].yomi;
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
  displayKanji();
}

function quitGame(event) {
  if (event.key == 'q') {
    window.cancelAnimationFrame(frame);
  }
}

startBtn.addEventListener('click', startGame);
practiceBtn.addEventListener('click', practice);
practiceInput.addEventListener('input', handleInput);
window.addEventListener('keydown', quitGame);
window.addEventListener('load', addAllKanji);