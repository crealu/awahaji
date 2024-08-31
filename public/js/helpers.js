function randomInt(max, min) {
  if (min) {
    return Math.floor(Math.random() * (max - min) + min);
  } else {
    return Math.floor(Math.random() * max);
  }
}

function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min * 1) + min);
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)];
}

function randomSpeed() {
  const speeds = [0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08];
  return speeds[randomIntFromRange(1, 4)];
}

function clear(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function filterYomi(yomi) {
  return yomi.includes(',') ? yomi.split(',')[0] : yomi;
}

function getStyle(element, property) {
  return getComputedStyle(element).getPropertyValue(property) 
}

