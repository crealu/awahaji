function clear(d) {
  while (d.firstChild) {
    d.removeChild(d.firstChild);
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
