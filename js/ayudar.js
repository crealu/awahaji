const doc = {
  gsv: (e, s) => { return getComputedStyle(e).getPropertyValue(s) }
}

function clear(d) {
  while (d.firstChild) {
    d.removeChild(d.firstChild);
  }
}

function randomInt(max, min) {
  if (min) {
    return Math.floor(Math.random() * (max - min) + min);
  } else {
      return Math.floor(Math.random() * max);
  }
}

function filterYomi(yomi) {
  let cleanYomi;
  if (yomi.includes(',')) {
    let splitYomi = yomi.split(',');
    cleanYomi = splitYomi[0];
    console.log(splitYomi);
  } else {
    cleanYomi = yomi;
  }
  return cleanYomi;
}
