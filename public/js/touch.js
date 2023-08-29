let sling = document.getElementsByClassName('the-sling')[0];
let activeScope = 0;

(function() {
  console.log('hey');
})()

let kanjis = ['雨', '九', '元'];
let readings = ['あめ', 'きゅう', 'もと'];
let colors = [
  '#fbab56',  // orange
  '#45f5a5',  // green
  '#d277ff'   // purple
];

let x0;
let y0;

let leftStylings = [];
let activeBubble = 0;

function touchstartHandler(event) {
  event.preventDefault();
  activeBubble = event.target.dataset['bubble-number'];
  event.target.style.background = colors[activeScope];
  let touchLocation = event.touches[0];
  movedBubble = event.target;
  movedBubble.style.left = touchLocation.pageX + 'px';
  movedBubble.style.top = touchLocation.pageY + 'px';
  x0 = movedBubble.getBoundingClientRect().left;
  y0 = movedBubble.getBoundingClientRect().top;
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

  const slingSize = parseInt(window.getComputedStyle(sling).getPropertyValue('width'));
  const slingLeft = sling.getBoundingClientRect().left;
  const slingRight = slingLeft + slingSize;
  const slingTop = sling.getBoundingClientRect().top;
  const slingBottom = slingTop + slingSize;

  let inSling = x > slingLeft && x < slingRight && y > slingTop && y < slingBottom;
  // movedBubble.style.transform = 'translate(0, 0)';

  if (inSling) {
    // movedBubble.style.background = 'green';
    movedBubble.style.bottom = 'calc(0vh - 50)';
    movedBubble.style.transform = 'translate(5px, 5px)';
    movedBubble.style.transition = '0.5s ease';
    launch();
  } 

  // let touchLocation = event.targetTouches[0];
  // let sd = { 
  //   type: 'end',
  //   touchX: touchLocation.x,
  //   touchY: touchLocation.y,
  //   elx: x,
  //   ely: y
  // };
  // fetch('/testdrop', {
  //   method: 'post',
  //   headers: {'Content-Type': 'application/json'},
  //   body: JSON.stringify(sd),
  // })
  // .then(res => { return res.json() })
  // .then(data => { console.log(data); })
  // .catch(err => { return console.log(err) });
}

// document.addEventListener('touchstart', touchstartHandler);
// document.addEventListener('touchend', touchendHandler);

function createBubble() {
  for (let i = 0; i < readings.length; i++) {
    let bubble = document.createElement('div');
    bubble.classList.add('the-bubble');
    let leftStyling = (i+1) * (window.innerWidth/4);
    leftStylings.push(leftStyling);
    bubble.style.left = leftStyling + 'px';
    bubble.setAttribute('draggable', 'true');
    bubble.textContent = readings[i];
    bubble.addEventListener('touchstart', touchstartHandler);
    bubble.addEventListener('touchmove', touchmoveHandler);
    bubble.addEventListener('touchend', touchendHandler);
    document.body.appendChild(bubble);
  }
}

function createTargets() {
  for (let i = 0; i < kanjis.length; i++) {
    let target = document.createElement('div');
    target.classList.add('bubble-target');
    target.textContent = kanjis[i];
    target.style.border = '1px solid ' + colors[i];
    target.style.color = colors[i];
    target.style.left = (i+1) * (window.innerWidth/4) + 'px';
    target.setAttribute('data-yomi', readings[i]);
    document.body.getElementsByClassName('all-targets')[0].appendChild(target);
  }
}

function updateActiveScope(event) {
  let scopes = document.getElementsByClassName('scope');
  for (let i = 0; i < scopes.length; i++) {
    scopes[i].classList.remove('active-scope');
  }
  event.target.classList.add('active-scope');
  let scopeNumber = parseInt(event.target.dataset['scope-number']);
  sling.style.border = '2px solid ' + colors[scopeNumber];
  if (scopeNumber == 0) {
    sling.style.transform = 'rotate(-' + 90 + 'deg)';
  } else if (scopeNumber == 1) {
    sling.style.transform = 'rotate(-' + 210 + 'deg)';
  } else if (scopeNumber == 2) {
    sling.style.transform = 'rotate(' + 30 + 'deg)';
  }
  activeScope = scopeNumber;
}

function createScope() {
  const angleIncrement = (2 * Math.PI) / colors.length;
  const radius = 40;
  const rotationAngle = activeScope === 0 ? Math.PI / 2 : 0;
  for (let i = 0; i < colors.length; i++) {
    let scope = document.createElement('div');
    scope.classList.add('scope');
    const angle = angleIncrement * i;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    const rotationAngle = i == activeScope ? Math.PI / 2 : 0;
    scope.style.transform = `translate(${x}px, ${y}px) rotate(${rotationAngle}rad)`;
    scope.style.background = colors[i];
    scope.setAttribute('data-scope-number', i);
    scope.addEventListener('click', updateActiveScope);
    sling.appendChild(scope);
  }
  sling.style.transform = 'rotate(-90deg)';

  document.getElementsByClassName('scope')[activeScope].classList.add('active-scope');
}

function launch() {
  let activeTarget = document.getElementsByClassName('bubble-target')[activeScope];
  let targetLeft = activeTarget.getBoundingClientRect().left;
  let targetTop = activeTarget.getBoundingClientRect().top;
  movedBubble.style.top = targetTop + 'px';
  movedBubble.style.left = targetLeft + 'px';


  setTimeout(() => {
    if (movedBubble.textContent == activeTarget.dataset['yomi']) {
      activeTarget.style.opacity = '0';
      movedBubble.style.opacity = '0';      
      activeTarget.style.transform = 'scale(1.5)';
      movedBubble.style.transform = 'translate(5px, 5px) scale(1.5)';      
    } else {
      movedBubble.style.background = 'gray';
      let id = setInterval(frame, 250);
      let i = 0;
      function frame() {
        i++;
        if ( i >= 1 && i < 2) {
          movedBubble.style.opacity = '0';
          movedBubble.style.transition = '0s'; 
        } else if (i >= 2 && i < 3) {
          movedBubble.style.background = 'none';
          movedBubble.style.left = x0 + 'px';
          movedBubble.style.top = '75vh';
          movedBubble.style.transform = 'translate(5px, 0)';
          movedBubble.style.transition = '0.25s ease'; 
        } else if (i >= 3 && i < 4) {
          movedBubble.style.opacity = '1';
        } else {
          movedBubble.style.transition = '0s'; 
          clearInterval(id);
        }
      }
      // movedBubble.style.bottom = 'calc(20vh - 60px)';
    }
  }, 500)
}

function initLoad() {
  createBubble();
  createTargets();
  createScope();
}

window.onload = initLoad();