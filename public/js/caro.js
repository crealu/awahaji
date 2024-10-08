const title = document.querySelector('.bubble-title');
const startBtn = document.querySelector('.start-btn');
const practiceBtn = document.querySelector('.practice-btn');
const practiceInput = document.querySelector('.practice-input');
const modal = document.querySelector('.the-modal');
const modalInner = document.querySelector('.modal-inner');
const activeSlide = document.querySelector('.active-slide');

const bars = document.getElementsByClassName('bar');
const activeBar = document.querySelector('.active-bar');

let activeSlideNumber = 0;

let readings = [];
let activeReading;
let active;
let currentClass = 'modal-reading';
let limit = 6;
let count = 0;
let round = 0;
let newReadings = [];
let shaders = [];
let theKanji = [];
let theSentences = [];
let indices = [];
let currentIndex = 0;
let exIdcs = []
let max = 6;

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
    // let romajiP = document.getElementsByClassName('slide-question')[i];
    // romajiP.textContent = romaji;
    i++;
  }
}

function practice(n) {
  // activeSlide.classList.remove('active-slide');
  // activeSlideNumber++;
  // document.getElementsByClassName('slide')[activeSlideNumber].classList.add('active-slide');
  practiceInput.style.opacity = '1';
  practiceInput.focus();
  parseReadings();
  active = 0;
  activeReading = document.getElementsByClassName(currentClass)[active];
  // activeReading.classList.add('active-reading');
  practiceBtn.style.display = 'none';
}

function handleMouseOver(event) {
  event.target.nextSibling.style.opacity = '1';
}

function handleMouseLeave(event) {
  event.target.nextSibling.style.opacity = '0';
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
  let answers = document.getElementsByClassName('slide-answer');
  let questions = document.getElementsByClassName('slide-question');

  setTimeout(() => {
    for (let i = 0; i < max; i++) {
      let exs = matchExample(readings[i][1], kanjis[i].examples);
      let romex = buildExampleRomaji(exs[1]);

      // modalKanji[i].textContent = exs[0];
      answers[i].textContent = exs[0];
      questions[i].textContent = exs[1];
      // modalRomaji[i].textContent = exs[2];

      newReadings.push([i, exs[1], romex]);
    }

    readings = newReadings;
  }, 500)
}

function matchSentence(i) {
  return theSentences[indices[i]][exIdcs[i]];
}

function fillSentences() {
  let answers = document.getElementsByClassName('slide-answer');
  let questions = document.getElementsByClassName('slide-question');
  newReadings = [];

  setTimeout(() => {
    for (let i = 0; i < max; i++) {
      let sent = matchSentence(i);
      let romex = ''; 
      let sentex = '';
      let engex = '';

      if (sent != undefined) {
        romex = sent.r.split(' ').join('');
        sentex = sent.j.replace('。', '');
        engex = sent.e;
      }

      console.log(romex, sentex, engex);

      answers[i].textContent = romex;
      questions[i].textContent = sentex;
      // slides[i].querySelector('slide-answer').textContent = engex;

      newReadings.push([i, sentex, romex]);
    }

    readings = newReadings;

    console.log(readings);
  }, 500)
}

let triggerAnimation = false;

function resetActive() {
  let activeSlide = document.getElementsByClassName('active-slide')[0];
  let slideAnswer = document.getElementsByClassName('slide-answer')[active];
  slideAnswer.style.opacity = '1';

  if (active != limit - 1) {
    let nextSlide = document.getElementsByClassName('slide')[active + 1];
    setTimeout(() => {
      activeSlide.style.animation = 'psah 0.5s ease 0s forwards';
      setTimeout(() => {
        activeSlide.style.display = 'none';
        nextSlide.style.display = 'flex';
        nextSlide.style.animation = 'nsar 0.5s ease 0s forwards';
        nextSlide.classList.add('active-slide');
        activeSlide.classList.remove('active-slide');
      }, 500)
    }, 500)
  } else {
    setTimeout(() => {
      activeSlide.style.animation = 'psah 0.5s ease 0s forwards';
    }, 500);
  }

  practiceInput.value = '';
}

function resetSlides() {
  let activeSlide = document.getElementsByClassName('active-slide')[0];
  let slides = document.getElementsByClassName('slide');
  let answers = document.getElementsByClassName('slide-answer');
  activeSlide.classList.remove('active-slide');

  for (let s = 0; s < slides.length; s++) {
    slides[s].style.opacity = '0';
    slides[s].style.animation = null;
    answers[s].style.opacity = '0';
  }

  slides[5].style.display = 'none';
  slides[0].classList.add('active-slide');
  slides[0].style.display = 'flex';
  setTimeout(() => {
    slides[0].style.opacity = '1';
  }, 500);
  practiceInput.value = '';
}

function restyleBars(a) {
  for (let i = 0; i < bars.length; i++) {
    if (i <= a) {
      bars[i].classList.add('completed-bar');
    }
  }

  if (a + 1 != bars.length) {
    bars[a + 1].classList.add('active-bar');
  }
}

function refreshBars() {
  for (let i = 0; i < bars.length; i++) {
    bars[i].classList.remove('completed-bar')
    bars[i].classList.remove('active-bar')
  }

  bars[0].classList.add('active-bar');
}

function swapContent() {
  let answers = document.getElementsByClassName('slide-answer');
  let questions = document.getElementsByClassName('slide-question');

  for (let i = 0; i < questions.length; i++) {
    let temp = questions[i].textContent;
    questions[i].textContent = answers[i].textContent;
    answers[i].textContent = temp;
  }
}

function handleInput(event) {
  const inp = event.target.value;
  const red = readings[active][2];

  if (inp.includes('q')) {
    practiceInput.value = inp.replace('q', '');
    return;
  }

  console.log(inp, red);

  if (inp == red) {
    // if (active != 0) {
    //   shaders[active-1].pause();
    // }
    // triggerAnimation = true;

    // process success
    resetActive();
    let a0 = active;


    // update active
    active++;

    if (active < limit) {
      setTimeout(() => { restyleBars(a0); }, 500)
    }

    // adjust for new active
    if (active == limit) {
      round++;
      setTimeout(() => { 
        restyleBars(a0);
        setTimeout(() => {
          resetSlides();
          if (round == 2) {
            fillExamples()
          } else if (round == 4) {
            fillSentences();
          } else {
            swapContent();
          }
          refreshBars(0);
          console.log(active);
        }, 500)
       }, 500)
      active = 0;
    } 
  }
}

function createSlides() {
  let slide = document.getElementsByClassName('slide')[0];
  for (let i = 0; i < max; i++) {
    let clone = slide.cloneNode(true);
    clone.children[0].textContent = kanjis[i].kanji;
    clone.children[1].textContent = filterYomi(kanjis[i]);
    if (i == 0) {
      clone.classList.add('active-slide');
    }
    modalInner.appendChild(clone);
  }
  modalInner.removeChild(slide);
}

function startGame() {
  startBtn.style.display = 'none';
  modal.style.display = 'block';
  modal.style.opacity = '1';
  createSlides();
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
}

function slideCaroNew() {
  let slides = document.getElementsByClassName('slide');
  let slideCount = slides.length - 1;
  let theSlide = document.getElementsByClassName('slide-number')[0];
  let slideNumber = theSlide.dataset.slidenum;

  let currentSlide = slides[slideNumber];
  nextNumber = parseInt(slideNumber) + 1;
  let nextSlide = slides[nextNumber];

  currentSlide.style.animation = 'psah 0.5s ease 0s forwards';
  switchDisplay(currentSlide, nextSlide);
  nextSlide.style.animation = 'nsar 0.5s ease 0s forwards';
  theSlide.dataset.slidenum = nextNumber;
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

render();

function loadResources() {
  fetchKanji();
  fetchSentences();
}

startBtn.addEventListener('click', startGame);
practiceBtn.addEventListener('click', practice);
practiceInput.addEventListener('input', handleInput);
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('load', loadResources);