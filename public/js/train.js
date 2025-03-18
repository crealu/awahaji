let stations = [
  {
    "駅名": "東京",
    "よみがな": "とうきょう",
    "意味": "日本の首都を表す"
  },
  {
    "駅名": "有楽町",
    "よみがな": "ゆうらくちょう",
    "意味": "「有楽」は徳川家康の弟・有楽斎に由来"
  },
  {
    "駅名": "新橋",
    "よみがな": "しんばし",
    "意味": "「新しい橋」という意味"
  },
  {
    "駅名": "浜松町",
    "よみがな": "はままつちょう",
    "意味": "海沿いの「浜」と「松」のある町"
  },
  {
    "駅名": "田町",
    "よみがな": "たまち",
    "意味": "昔の田んぼが広がる地域の名残"
  },
  {
    "駅名": "品川",
    "よみがな": "しながわ",
    "意味": "「品川」は河川の名前が由来"
  },
  {
    "駅名": "大崎",
    "よみがな": "おおさき",
    "意味": "「崎」は岬を意味する"
  },
  {
    "駅名": "五反田",
    "よみがな": "ごたんだ",
    "意味": "「五反の田んぼ」が由来"
  },
  {
    "駅名": "目黒",
    "よみがな": "めぐろ",
    "意味": "目黒川の名前が由来"
  },
  {
    "駅名": "恵比寿",
    "よみがな": "えびす",
    "意味": "ビールブランド「ヱビス」に由来"
  },
  {
    "駅名": "渋谷",
    "よみがな": "しぶや",
    "意味": "「渋い谷」が語源"
  },
  {
    "駅名": "原宿",
    "よみがな": "はらじゅく",
    "意味": "「原っぱの宿場町」"
  },
  {
    "駅名": "代々木",
    "よみがな": "よよぎ",
    "意味": "「代々続く木々」に由来"
  },
  {
    "駅名": "新宿",
    "よみがな": "しんじゅく",
    "意味": "「新しい宿場町」"
  },
  {
    "駅名": "新大久保",
    "よみがな": "しんおおくぼ",
    "意味": "「大きな窪地」に新しく作られた町"
  },
  {
    "駅名": "高田馬場",
    "よみがな": "たかだのばば",
    "意味": "「高田氏の馬場」に由来"
  },
  {
    "駅名": "目白",
    "よみがな": "めじろ",
    "意味": "「白い馬（目白馬）」が由来"
  },
  {
    "駅名": "池袋",
    "よみがな": "いけぶくろ",
    "意味": "「池が多い場所」"
  },
  {
    "駅名": "大塚",
    "よみがな": "おおつか",
    "意味": "「大きな塚（丘）」が由来"
  },
  {
    "駅名": "巣鴨",
    "よみがな": "すがも",
    "意味": "「鴨が住む巣」に由来"
  },
  {
    "駅名": "駒込",
    "よみがな": "こまごめ",
    "意味": "「駒（馬）が込む」地名"
  },
  {
    "駅名": "田端",
    "よみがな": "たばた",
    "意味": "「田んぼの端（はた）」"
  },
  {
    "駅名": "西日暮里",
    "よみがな": "にしにっぽり",
    "意味": "「日暮らしの里」の西"
  },
  {
    "駅名": "日暮里",
    "よみがな": "にっぽり",
    "意味": "「日が暮れるまで過ごす里」"
  },
  {
    "駅名": "鶯谷",
    "よみがな": "うぐいすだに",
    "意味": "「鶯（うぐいす）が多い谷」"
  },
  {
    "駅名": "上野",
    "よみがな": "うえの",
    "意味": "「上の方にある土地」"
  },
  {
    "駅名": "御徒町",
    "よみがな": "おかちまち",
    "意味": "「御徒（武士の歩兵）の町」"
  },
  {
    "駅名": "秋葉原",
    "よみがな": "あきはばら",
    "意味": "「秋葉神社」が由来"
  },
  {
    "駅名": "神田",
    "よみがな": "かんだ",
    "意味": "「神の田んぼ」"
  }
]

const rollBtn = document.getElementsByClassName('game-btn')[0];
let circles = document.getElementsByTagName('circle');
let colors = ['#7FC342', '#a6c888', '#5a6550', '#4b8516', '#7fff0a'];

function expandCircles() {
  for (let c = 0; c < circles.length; c++) {
    setTimeout(() => {
      circles[c].setAttribute('r', '10');
    }, 100 * c);
  }
}

// Query DOM Elements
const svg = document.querySelector('.yamanote-line');
const fuse = svg.querySelector('.fuse');

// Create an object that gsap can animate
const val = { distance: 0 };
// Create a tween
function startTween() {
  gsap.to(val, {
  // Animate from distance 0 to the total distance
  distance: fuse.getTotalLength(),
  // Loop the animation
  repeat: -1,
  // Wait 1sec before repeating
  repeatDelay: 1,
  // Make the animation lasts 5 seconds
  duration: 5,
  // Function call on each frame of the animation
  onUpdate: () => {
    // Query a point at the new distance value
    const point = fuse.getPointAtLength(val.distance);
    createParticle(point);
  }
  });
}

function createParticle(point) {
  // Create a new circle element
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  // Prepend the element to the SVG
  svg.prepend(circle);
  // Set the coordinates of that circle
  circle.setAttribute('cx', point.x);
  circle.setAttribute('cy', point.y);
  // Define a random radius for each circle
  circle.setAttribute('r', (Math.random() * 10) + 0.2);
  // Define a random color
  circle.setAttribute('fill', gsap.utils.random(colors));
  
  // Animate the circle
  gsap.to(circle, {
    // Random cx based on its current position
    cx: '+=random(-30,30)',
    // Random cy based on its current position
    cy: '+=random(-30,30)',
    // Fade out
    opacity: 0,
    // Random duration for each circle
    duration: 'random(1, 3)',
    // Prevent gsap from rounding the cx & cy values
    autoRound: false,
    // Once the animation is complete
    onComplete: () => {
      // Remove the SVG element from its parent
      svg.removeChild(circle);
    }
  });
}

/* Animate the fuse to reduce it */
fuse.setAttribute('stroke-dasharray', fuse.getTotalLength());
fuse.setAttribute('stroke-dashoffset', fuse.getTotalLength() * 2);

function toFuse() {
  gsap.to(fuse, {
    strokeDashoffset: fuse.getTotalLength(),
    duration: 5,
    repeat: -1,
    // Wait 1sec before repeating
    repeatDelay: 0
  });
}

function animatePath() {
  gsap.to("#the-line", {
    duration: 2,
    attr: { d: "M315 292l-6 19-12 13-7 15 v5l1 15" },
    ease: "power2.out"
  });
}

rollBtn.addEventListener('click', (event) => {
  startTween();
  toFuse();
})

window.addEventListener('keydown', (event) => {
  if (event.key == 't') {
    startTween();
    toFuse();
  }
})

// animatePath();
