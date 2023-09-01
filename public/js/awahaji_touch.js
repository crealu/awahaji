
const ORANGE = '#fbab56';
const GREEN = '#45f5a5';
const PURPLE = '#d277ff';

class Awahaji {
  constructor() {
    this.leftStylings = [];
    this.activeBubble = 0;
    this.activeScope = 0;
    this.kanjis = ['雨', '九', '元'];
    this.readings = ['あめ', 'きゅう', 'もと'];
    this.colors = ['#fbab56',  '#45f5a5', '#d277ff'];
    this.x0;
    this.y0;
    this.movedBubble;

    this.touchstartHandler = this.touchstartHandler.bind(this);
    this.touchmoveHandler = this.touchmoveHandler.bind(this);
    this.touchendHandler = this.touchendHandler.bind(this);
    this.updateActiveScope = this.updateActiveScope.bind(this);
  }

  touchstartHandler(event) {
    event.preventDefault();
    this.activeBubble = parseInt(event.target.dataset['bubble-number']);
    let touchLocation = event.touches[0];
    this.movedBubble = event.target;
    this.movedBubble.style.left = touchLocation.pageX + 'px';
    this.movedBubble.style.top = touchLocation.pageY + 'px';
    this.x0 = this.movedBubble.getBoundingClientRect().left;
    this.y0 = this.movedBubble.getBoundingClientRect().top;
  }

  touchmoveHandler(event) {
    event.preventDefault();
    let touchLocation = event.touches[0];
    this.movedBubble.style.left = touchLocation.pageX + `px`;
    this.movedBubble.style.top = touchLocation.pageY + `px`;
  }

  touchendHandler(event) {
    event.preventDefault();
    let x = parseInt(this.movedBubble.style.left);
    let y = parseInt(this.movedBubble.style.top);
    let sling = document.getElementsByClassName('the-sling')[0];

    const slingSize = parseInt(window.getComputedStyle(sling).getPropertyValue('width'));
    const slingLeft = sling.getBoundingClientRect().left;
    const slingRight = slingLeft + slingSize;
    const slingTop = sling.getBoundingClientRect().top;
    const slingBottom = slingTop + slingSize;

    let inSling = x > slingLeft && x < slingRight && y > slingTop && y < slingBottom;
    // movedBubble.style.transform = 'translate(0, 0)';

    if (inSling) {
      // movedBubble.style.background = 'green';
      this.movedBubble.style.bottom = 'calc(0vh - 50)';
      this.movedBubble.style.transform = 'translate(5px, 5px)';
      this.movedBubble.style.transition = '0.5s ease';
      this.movedBubble.style.background = this.colors[this.activeScope];

      this.launch();
    } else {
      this.movedBubble.style.transition = '0.25s ease';
      this.movedBubble.style.left = this.leftStylings[this.activeBubble] + 'px';
      this.movedBubble.style.top = '75vh';
      this.movedBubble.style.background = 'none';
      setTimeout(() => {
        this.movedBubble.style.transition = '0s ease';
      }, 250)
    }
  }

  createBubbles() {
    for (let i = 0; i < this.readings.length; i++) {
      let bubble = document.createElement('div');
      bubble.classList.add('the-bubble');
      let leftStyling = (i+1) * (window.innerWidth/4);
      this.leftStylings.push(leftStyling);
      bubble.style.left = leftStyling + 'px';
      bubble.setAttribute('draggable', 'true');
      bubble.textContent = this.readings[i];
      bubble.addEventListener('touchstart', this.touchstartHandler);
      bubble.addEventListener('touchmove', this.touchmoveHandler);
      bubble.addEventListener('touchend', this.touchendHandler);
      document.body.appendChild(bubble);
    }
  }

  createTargets() {
    for (let i = 0; i < this.kanjis.length; i++) {
      let target = document.createElement('div');
      target.classList.add('bubble-target');
      target.textContent = this.kanjis[i];
      target.style.border = '1px solid ' + this.colors[i];
      target.style.color = this.colors[i];
      target.style.left = (i+1) * (window.innerWidth/4) + 'px';
      target.setAttribute('data-yomi', this.readings[i]);
      document.body.getElementsByClassName('all-targets')[0].appendChild(target);
    }
  }

  createScopes() {
    let sling = document.getElementsByClassName('the-sling')[0];

    const angleIncrement = (2 * Math.PI) / this.colors.length;
    const radius = 40;
    const rotationAngle = this.activeScope === 0 ? Math.PI / 2 : 0;
    for (let i = 0; i < this.colors.length; i++) {
      let scope = document.createElement('div');
      scope.classList.add('scope');
      const angle = angleIncrement * i;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);
      const rotationAngle = i == this.activeScope ? Math.PI / 2 : 0;
      scope.style.transform = `translate(${x}px, ${y}px) rotate(${rotationAngle}rad)`;
      scope.style.background = this.colors[i];
      scope.setAttribute('data-scope-number', i);
      scope.addEventListener('click', this.updateActiveScope);
      sling.appendChild(scope);
    }
    sling.style.transform = 'rotate(-90deg)';
    sling.style.border = '2px solid ' + this.colors[this.activeScope];
    document.getElementsByClassName('scope')[this.activeScope].classList.add('active-scope');
  }


  updateActiveScope(event) {
    let scopes = document.getElementsByClassName('scope');
    for (let i = 0; i < scopes.length; i++) {
      scopes[i].classList.remove('active-scope');
    }
    event.target.classList.add('active-scope');
    // console.dir(event.target.attributes['data-scope-number'].value);
    let scopeNumber = parseInt(event.target.attributes['data-scope-number'].value);
    this.rotateScopes(scopeNumber);
    console.log(this);
    // sling.style.border = '2px solid ' + this.colors[scopeNumber];
    // if (scopeNumber == 0) {
    //   sling.style.transform = 'rotate(-' + 90 + 'deg)';
    // } else if (scopeNumber == 1) {
    //   sling.style.transform = 'rotate(-' + 210 + 'deg)';
    // } else if (scopeNumber == 2) {
    //   sling.style.transform = 'rotate(' + 30 + 'deg)';
    // }
    // this.activeScope = scopeNumber;
  }

  rotateScopes(scopeNumber) {
    let sling = document.getElementsByClassName('the-sling')[0];
    sling.style.border = '2px solid ' + this.colors[scopeNumber];
    if (scopeNumber == 0) {
      sling.style.transform = 'rotate(-' + 90 + 'deg)';
    } else if (scopeNumber == 1) {
      sling.style.transform = 'rotate(-' + 210 + 'deg)';
    } else if (scopeNumber == 2) {
      sling.style.transform = 'rotate(' + 30 + 'deg)';
    }
    this.activeScope = scopeNumber;
  }

  setNextScope(scopeNumber) {
    if (scopeNumber == 2) {
      this.rotateScopes(0);
    } else {
      this.rotateScopes(scopeNumber++);
    }
  }

  launch() {
    let activeTarget = document.getElementsByClassName('bubble-target')[this.activeScope];
    let targetLeft = activeTarget.getBoundingClientRect().left;
    let targetTop = activeTarget.getBoundingClientRect().top;
    this.movedBubble.style.top = targetTop + 'px';
    this.movedBubble.style.left = targetLeft + 'px';

    setTimeout(() => {
      if (this.movedBubble.textContent == activeTarget.dataset['yomi']) {
        activeTarget.style.opacity = '0';
        activeTarget.style.transform = 'scale(1.5)';
        this.movedBubble.style.opacity = '0';      
        this.movedBubble.style.transform = 'translate(5px, 5px) scale(1.5)';
        this.setNextScope(this.activeScope); 
      } else {
        this.movedBubble.style.background = 'gray';
        // this.movedBubble.style.opacity = '0';
        // this.movedBubble.style.left = this.leftStylings[this.activeBubble] + 'px';
        // this.movedBubble.style.top = '75vh';
        // this.movedBubble.style.animation = '1s ease 0.5s 1 forwards back';
        // this.movedBubble.style.transition = '0s';
        let i = 0;

        setInterval(() => {
          i++;
          if (i >= 1 && i < 2) {
            this.movedBubble.style.opacity = '0';
            this.movedBubble.style.transition = '0s'; 
          } else if (i >= 2 && i < 3) {
            this.movedBubble.style.background = 'none';
            this.movedBubble.style.left = this.x0 + 'px';
            this.movedBubble.style.top = '75vh';
            this.movedBubble.style.transform = 'translate(5px, 0)';
            this.movedBubble.style.transition = '0.25s ease'; 
          } else if (i >= 3 && i < 4) {
            this.movedBubble.style.opacity = '1';
          } else {
            this.movedBubble.style.transition = '0s'; 
            clearInterval(id);
          }
        }, 250)
        // let i = 0;
        // function frame() {
        //   i++;
        //   if (i >= 1 && i < 2) {
        //     this.movedBubble.style.opacity = '0';
        //     this.movedBubble.style.transition = '0s'; 
        //   } else if (i >= 2 && i < 3) {
        //     this.movedBubble.style.background = 'none';
        //     this.movedBubble.style.left = this.x0 + 'px';
        //     this.movedBubble.style.top = '75vh';
        //     this.movedBubble.style.transform = 'translate(5px, 0)';
        //     this.movedBubble.style.transition = '0.25s ease'; 
        //   } else if (i >= 3 && i < 4) {
        //     this.movedBubble.style.opacity = '1';
        //   } else {
        //     this.movedBubble.style.transition = '0s'; 
        //     clearInterval(id);
        //   }
        // }
        // frame();
        // movedBubble.style.bottom = 'calc(20vh - 60px)';
      }
    }, 500)
  }
}


// let allKanji;
// let awahaji;
// (async function() {
//   await fetch('https://kanji-data.herokuapp.com/n5Kanji')
//     .then(res => res.json())
//     .then(data => { 
//       awahaji = new AwahajiTouch(data.kanaji.n5);
//       awahaji.createBubble();
//       awahaji.createScopes();
//       awahaji.createTargets();
//       console.log(data) 
//     })
//     .catch(err => { throw err })
// })()

// let leftStylings = [];
// let activeBubble = 0;
// let activeScope = 0;
// let kanjis = ['雨', '九', '元'];
// let readings = ['あめ', 'きゅう', 'もと'];
// let colors = [
//   '#fbab56',  // orange
//   '#45f5a5',  // green
//   '#d277ff'   // purple
// ];

// let x0;
// let y0;





// function touchstartHandler(event) {
//   event.preventDefault();
//   activeBubble = event.target.dataset['bubble-number'];
//   event.target.style.background = colors[activeScope];
//   let touchLocation = event.touches[0];
//   movedBubble = event.target;
//   movedBubble.style.left = touchLocation.pageX + 'px';
//   movedBubble.style.top = touchLocation.pageY + 'px';
//   x0 = movedBubble.getBoundingClientRect().left;
//   y0 = movedBubble.getBoundingClientRect().top;
// }

// function touchmoveHandler(event) {
//   event.preventDefault();
//   let touchLocation = event.touches[0];
//   movedBubble.style.left = touchLocation.pageX + `px`;
//   movedBubble.style.top = touchLocation.pageY + `px`;
// }

// function touchendHandler(event) {
//   event.preventDefault();
//   let x = parseInt(movedBubble.style.left);
//   let y = parseInt(movedBubble.style.top);

//   const slingSize = parseInt(window.getComputedStyle(sling).getPropertyValue('width'));
//   const slingLeft = sling.getBoundingClientRect().left;
//   const slingRight = slingLeft + slingSize;
//   const slingTop = sling.getBoundingClientRect().top;
//   const slingBottom = slingTop + slingSize;

//   let inSling = x > slingLeft && x < slingRight && y > slingTop && y < slingBottom;
//   // movedBubble.style.transform = 'translate(0, 0)';

//   if (inSling) {
//     // movedBubble.style.background = 'green';
//     movedBubble.style.bottom = 'calc(0vh - 50)';
//     movedBubble.style.transform = 'translate(5px, 5px)';
//     movedBubble.style.transition = '0.5s ease';
//     launch();
//   } 
// }

// document.addEventListener('touchstart', touchstartHandler);
// document.addEventListener('touchend', touchendHandler);

// function createBubble() {
//   for (let i = 0; i < readings.length; i++) {
//     let bubble = document.createElement('div');
//     bubble.classList.add('the-bubble');
//     let leftStyling = (i+1) * (window.innerWidth/4);
//     leftStylings.push(leftStyling);
//     bubble.style.left = leftStyling + 'px';
//     bubble.setAttribute('draggable', 'true');
//     bubble.textContent = readings[i];
//     bubble.addEventListener('touchstart', touchstartHandler);
//     bubble.addEventListener('touchmove', touchmoveHandler);
//     bubble.addEventListener('touchend', touchendHandler);
//     document.body.appendChild(bubble);
//   }
// }

// function createTargets() {
//   for (let i = 0; i < kanjis.length; i++) {
//     let target = document.createElement('div');
//     target.classList.add('bubble-target');
//     target.textContent = kanjis[i];
//     target.style.border = '1px solid ' + colors[i];
//     target.style.color = colors[i];
//     target.style.left = (i+1) * (window.innerWidth/4) + 'px';
//     target.setAttribute('data-yomi', readings[i]);
//     document.body.getElementsByClassName('all-targets')[0].appendChild(target);
//   }
// }

// function createScope() {
//   const angleIncrement = (2 * Math.PI) / colors.length;
//   const radius = 40;
//   const rotationAngle = activeScope === 0 ? Math.PI / 2 : 0;
//   for (let i = 0; i < colors.length; i++) {
//     let scope = document.createElement('div');
//     scope.classList.add('scope');
//     const angle = angleIncrement * i;
//     const x = radius * Math.cos(angle);
//     const y = radius * Math.sin(angle);
//     const rotationAngle = i == activeScope ? Math.PI / 2 : 0;
//     scope.style.transform = `translate(${x}px, ${y}px) rotate(${rotationAngle}rad)`;
//     scope.style.background = colors[i];
//     scope.setAttribute('data-scope-number', i);
//     scope.addEventListener('click', updateActiveScope);
//     sling.appendChild(scope);
//   }
//   sling.style.transform = 'rotate(-90deg)';

//   document.getElementsByClassName('scope')[activeScope].classList.add('active-scope');
// }

// function updateActiveScope(event) {
//   let scopes = document.getElementsByClassName('scope');
//   for (let i = 0; i < scopes.length; i++) {
//     scopes[i].classList.remove('active-scope');
//   }
//   event.target.classList.add('active-scope');
//   let scopeNumber = parseInt(event.target.dataset['scope-number']);
//   sling.style.border = '2px solid ' + colors[scopeNumber];
//   if (scopeNumber == 0) {
//     sling.style.transform = 'rotate(-' + 90 + 'deg)';
//   } else if (scopeNumber == 1) {
//     sling.style.transform = 'rotate(-' + 210 + 'deg)';
//   } else if (scopeNumber == 2) {
//     sling.style.transform = 'rotate(' + 30 + 'deg)';
//   }
//   activeScope = scopeNumber;
// }



// function launch() {
//   let activeTarget = document.getElementsByClassName('bubble-target')[activeScope];
//   let targetLeft = activeTarget.getBoundingClientRect().left;
//   let targetTop = activeTarget.getBoundingClientRect().top;
//   movedBubble.style.top = targetTop + 'px';
//   movedBubble.style.left = targetLeft + 'px';


//   setTimeout(() => {
//     if (movedBubble.textContent == activeTarget.dataset['yomi']) {
//       activeTarget.style.opacity = '0';
//       movedBubble.style.opacity = '0';      
//       activeTarget.style.transform = 'scale(1.5)';
//       movedBubble.style.transform = 'translate(5px, 5px) scale(1.5)';      
//     } else {
//       movedBubble.style.background = 'gray';
//       let id = setInterval(frame, 250);
//       let i = 0;
//       function frame() {
//         i++;
//         if ( i >= 1 && i < 2) {
//           movedBubble.style.opacity = '0';
//           movedBubble.style.transition = '0s'; 
//         } else if (i >= 2 && i < 3) {
//           movedBubble.style.background = 'none';
//           movedBubble.style.left = x0 + 'px';
//           movedBubble.style.top = '75vh';
//           movedBubble.style.transform = 'translate(5px, 0)';
//           movedBubble.style.transition = '0.25s ease'; 
//         } else if (i >= 3 && i < 4) {
//           movedBubble.style.opacity = '1';
//         } else {
//           movedBubble.style.transition = '0s'; 
//           clearInterval(id);
//         }
//       }
//       // movedBubble.style.bottom = 'calc(20vh - 60px)';
//     }
//   }, 500)
// }

let awahaji = new Awahaji();
function initGame() {
  awahaji.createBubbles();
  awahaji.createScopes();
  awahaji.createTargets();
}

window.onload = initGame();
