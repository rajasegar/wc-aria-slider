(function() {

console.log('hello world');

document.addEventListener('update-red', (event) => {
  let red = JSON.parse(event.detail).value;
  let green = Number(document.querySelector('#greenSlider').getAttribute('value'));
  let blue = Number(document.querySelector('#blueSlider').getAttribute('value'));
  updateColorBox(red, green,blue);
});

document.addEventListener('update-green', (event) => {
  let green = JSON.parse(event.detail).value;
  let red = Number(document.querySelector('#redSlider').getAttribute('value'));
  let blue = Number(document.querySelector('#blueSlider').getAttribute('value'));
  updateColorBox(red, green,blue);
});
document.addEventListener('update-blue', (event) => {
  let blue = JSON.parse(event.detail).value;
  let red = Number(document.querySelector('#redSlider').getAttribute('value'));
  let green = Number(document.querySelector('#greenSlider').getAttribute('value'));
  updateColorBox(red, green,blue);
});

function updateColorBox(r,g,b) {
  let $colorbox = document.getElementById('color-box');
  let rgb = `rgb(${r}, ${g}, ${b});`
  $colorbox.setAttribute('style', `background: rgb(${r}, ${g}, ${b});`);
  updateTextBox('idColorValueRgb',rgb);
  let hex = getColorHex(r,g,b);
  updateTextBox('idColorValueHex',hex);
}

function updateTextBox(id, val) {
  let $text = document.getElementById(id);
  $text.value = val;
}


function getColorHex(r,g,b) {
  var rx = parseInt(r).toString(16);
  var gx = parseInt(g).toString(16);
  var bx = parseInt(b).toString(16);

  if (rx.length === 1) {
    rx = '0' + rx;
  }
  if (gx.length === 1) {
    gx = '0' + gx;
  }
  if (bx.length === 1) {
    bx = '0' + bx;
  }

  return '#' + rx + gx + bx;
}

}());
