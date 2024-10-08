const title = document.querySelector('.bubble-title');
const startBtn = document.querySelector('.start-btn');
const practiceBtn = document.querySelector('.practice-btn');
const practiceInput = document.querySelector('.practice-input');
const modal = document.querySelector('.the-modal');
const modalInner = document.querySelector('.modal-inner');
const theScore = document.querySelector('.score');
const theKanjiEl = document.querySelector('.kanji');
const theStreak = document.querySelector('.streak-bar');
const streakText = document.querySelector('.streak');
const fx1 = document.getElementsByClassName('fx-audio')[0];

let theKanji = [];
let readings = [];
let activeReading;
let active;
let currentClass = 'modal-reading';
let limit = 5;
let count = 0;
let round = 0;
let newReadings = [];
let shaders = [];
let theSentences = [];
let indices = [];
let currentIndex = 0;
let exIdcs = []
let max = 6;

let score = 0;
let hinting = false;
let addition = 10;
let streak = 0;
let factor = 1;

function KanjiBox(ka, k, o, km, ex) {
  this.kanji = ka;
  this.kun = k;
  this.on = o;
  this.meaning = km;
  this.examples = ex;
}

async function fetchKanji() {
  let level = 'n5';
  // await fetch(`https://kanji-data.herokuapp.com/${level}Kanji`)
  await fetch('/allKanji')
    .then(res => res.json())
    .then(data => {
      data.kanji[level].forEach(k => {
        let ka = k.kanji[0]
        let kun = k.kanji[1]
        let on = k.kanji[2]
        let me = k.kanji[3]
        let ex = k.examples;
        theKanji.push(new KanjiBox(ka, kun, on, me, ex))
      });

      // console.log(theKanji);
      kanjis = reorder(theKanji);
      addAllKanji(kanjis);
    })
}

async function fetchSentences() {
  await fetch('/n5sent')
    .then(res => res.json())
    .then(data => {
      theSentences = data;
      // console.log(theSentences);
    })
    .catch(err => { console.log(err) })
}

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

function reorder(kan) {
  let a = [];
  let b = [];
  let r = randomInt(0, kan.length);

  while (b.length < kan.length) {
    if (!a.includes(r)) {
      a.push(r);
      b.push(kan[r]);
      indices.push(r);
      continue;
    }
    r = randomInt(0, kan.length);
  }

  console.log(indices);
  console.log(b);

  return b;
}

function addAllKanji(kan) {
  for (let i = 0; i < max; i++) {
    let kanjiText = kan[i].kanji;
    // let yomi = kan[i].kun;
    let oneYomi = filterYomi(kan[i]);
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

function hasSmall(yomi) {
  return yomi.includes('ゃ') || yomi.includes('ゅ') || yomi.includes('ょ')
}

function hasSmallTsu(yomi) {
  return yomi.includes('っ');
}

function countOccurrences(str, char) {
  let count = 0;
  let indexes = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      indexes.push(i);
      count++;
    }
  }
  return indexes;
}

function findSmall(yomi) {
  let ya = yomi.indexOf('ゃ')
  let yu = yomi.indexOf('ゅ')
  let yo = yomi.indexOf('ょ')

  return [ya, yu, yo].filter(y => y != -1);
}

function concatRomaji(start, reading, sti, romaji) {
  for (let i = start; i < reading.length; i++) {
    let match = matchOneKana(reading[i]);

    if (i == sti) {
      match = match[0] + match;
    }

    romaji += match;
  }
  return romaji
}

function buildExampleRomaji(reading) {
  let romaji = '';
  let yoon = '';
  let smallTsuIndex = null;

  if (hasSmallTsu(reading)) {
    smallTsuIndex = reading.indexOf('っ');
    reading = reading.split('っ').join('');
  }

  if (hasSmall(reading)) {
    let idx = findSmall(reading) - 1;
    console.log(idx);
    if (idx == 0) {
      yoon = reading.slice(idx, idx + 2);
      reading = reading.replace(yoon, '');

      romaji += matchCombination(yoon);
      romaji = concatRomaji(0, reading, smallTsuIndex, romaji);
    } else if (idx + 1 == reading.length - 1) {
      yoon = reading.slice(idx, idx + 2);
      reading = reading.replace(yoon, '');

      romaji = concatRomaji(0, reading, smallTsuIndex, romaji);
      yoon = matchCombination(yoon);

      if (smallTsuIndex == idx) {
        yoon = yoon[0] + yoon;
      }

      romaji += yoon;
    } else {
      for (let i = 0; i < idx; i++) {
        let match = matchOneKana(reading[i]);

        if (i == smallTsuIndex) {
          match = match[0] + match;
        }

        romaji += match;
      }

      yoon = reading.slice(idx, idx + 2);
      romaji += matchCombination(yoon);

      romaji = concatRomaji(idx + 2, reading, smallTsuIndex, romaji);
    }
  } else {
    romaji = concatRomaji(0, reading, smallTsuIndex, romaji);
  }

  return romaji;
}

function buildRomaji(reading) {
  let romaji = '';
  let subRom = '';
  if (hasSmall(reading)) {
    let loc = reading.indexOf()
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

function filterYomi(kanji) {
  return kanji.kun == '' 
       ? kanji.on.includes(',') ? kanji.on.split(',')[0] : kanji.on
       : kanji.kun.includes(',') ? kanji.kun.split(',')[0] : kanji.kun;
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
  hiting = true;
  addition -= 3;
  event.target.nextSibling.style.opacity = '1';
}

function handleMouseLeave(event) {
  hinting = false;
  event.target.nextSibling.style.opacity = '0';
}

function resetActive(className) {
  let ar = document.getElementsByClassName('active-reading')[0];
  // ar.style.animationPlayState = 'running';
  // ar.classList.add('flash');

  let activeKanji = document.getElementsByClassName('modal-kanji')[active]
  let activeRomaji = document.getElementsByClassName('modal-romaji')[active]
  activeRomaji.style.opacity = '1';
  activeKanji.style.opacity = '1';
  practiceInput.value = '';

  setTimeout(() => {
    ar.classList.remove('active-reading');
  }, 500)
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
  let ex = null;

  for (let e = 0; e < examples.length; e++) {
    if (examples[e][1].includes(reading) && examples[e][0].length == 2) {
      exIdcs.push(e);
      ex = examples[e]
    }
  }

  if (ex == null) {
    exIdcs.push(0);
    ex = examples[0];
  }

  return ex;
}

function fillExamples() {
  let modalReading = document.getElementsByClassName('modal-reading');
  let modalKanji = document.getElementsByClassName('modal-kanji');
  let modalRomaji = document.getElementsByClassName('modal-romaji');

  for (let i = 0; i < max; i++) {
    modalKanji[i].style.opacity = '0';
    modalRomaji[i].style.opacity = '0';
  }

  setTimeout(() => {
    for (let i = 0; i < max; i++) {
      let exs = matchExample(readings[i][1], kanjis[i].examples);
      let romex = buildExampleRomaji(exs[1]);

      // modalKanji[i].textContent = exs[0];
      modalKanji[i].textContent = exs[0];
      modalReading[i].textContent = exs[1];
      modalRomaji[i].textContent = exs[2];

      newReadings.push([i, exs[1], romex]);
    }

    console.log(newReadings);
    readings = newReadings;

    console.log(readings);
  }, 500)
}

function matchSentence(i) {
  return theSentences[indices[i]][exIdcs[i]];
}

function fillSentences() {
  let modalReading = document.getElementsByClassName('modal-reading');
  let modalKanji = document.getElementsByClassName('modal-kanji');
  let modalRomaji = document.getElementsByClassName('modal-romaji');

  modalInner.classList.add('modal-inner-sent');
  modalInner.classList.remove('modal-inner');

  for (let i = 0; i < max; i++) {
    modalKanji[i].style.opacity = '0';
    modalRomaji[i].style.opacity = '0';
  }

  setTimeout(() => {
    newReadings = [];
    for (let i = 0; i < max; i++) {
      let sent = matchSentence(i);
      console.log(sent);
      // console.log(sent, readings[i][0]);
      // console.log(sent, readings[i][2]);
      let romex = sent.r.split(' ').join('');
      let sentex = sent.j.replace('。', '')

      // modalKanji[i].textContent = exs[0];
      modalKanji[i].textContent = romex;
      modalReading[i].textContent = sentex;
      modalRomaji[i].textContent = sent.e;

      newReadings.push([i, sentex, romex]);
    }

    readings = newReadings;

    console.log(readings);
  }, 500)
}

let triggerAnimation = false;

function handleInput(event) {
  const inp = event.target.value;
  const red = readings[active][2];

  if (inp.includes('q')) {
    practiceInput.value = inp.replace('q', '');
    return;
  }

  console.log(inp, red);

  if (inp == red) {
    playAudio(8);
    // if (active != 0) {
    //   shaders[active-1].pause();
    // }
    // triggerAnimation = true;
    resetActive(currentClass);
    if (active % limit != 0 || active == limit - 5) {
      active++;
      activeReading = document.getElementsByClassName(currentClass)[active];
      activeReading.classList.add('active-reading');
    } else {
      if (currentClass == 'modal-reading') {
        reselectColumn('modal-kanji', active - 5);
        hideReadingAndRomaji();
        active -= 5;
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

    if (addition == 10) {
      streak++;
    }

    writeScore();
    addition = 10;

    console.log(active);
  }
}

function displayKanji() {
  clear(modalInner);
  for (let i = 0; i < max; i++) {
    let kanjiP = document.createElement('p');
    let readingP = document.createElement('p');
    let romajiP = document.createElement('p');
    // let readingP = document.createElement('canvas');
    // let shaderSetup = new ShaderSetup(readingP, vs, fs);
    // shaders.push(shaderSetup);
    readingP.classList.add('modal-reading');
    romajiP.classList.add('modal-romaji');
    kanjiP.classList.add('modal-kanji');
    kanjiP.innerHTML = kanjis[i].kanji;
    readingP.innerHTML = filterYomi(kanjis[i]);
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
  // fillExamples();
}

function writeScore() {
  console.log(score);
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
    factor = 1;
  }

  score += addition * factor;
  theStreak.style.width = (streak * 5) + 'px';
  theScore.textContent = score;
  theKanjiEl.textContent = count;
}

function updateStreak() {
  theStreak.style.width = '0px';
  streakText.innerHTML = '';
  factor = 1;
  playAudio(1);
}

function handleKeyDown(event) {
  if (event.key == 'q') {
    if (currentClass == 'modal-kanji') {
      if (activeReading.nextSibling.style.opacity == '1') {
        activeReading.nextSibling.style.opacity = '0';
      } else {
        activeReading.nextSibling.style.opacity = '1';
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

let whole;
let start = 0.0
let fin = 50

function render() {
  start += 0.01;

  if (start >= fin) {
    whole = window.cancelAnimationFrame(render);
  }

  if (triggerAnimation) {
    shaders[active-1].render();
  }

  whole = window.requestAnimationFrame(render);
}

// render();

function loadResources() {
  fetchKanji();
  fetchSentences();
  render();
}

startBtn.addEventListener('click', startGame);
practiceBtn.addEventListener('click', practice);
practiceInput.addEventListener('input', handleInput);
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('load', loadResources);