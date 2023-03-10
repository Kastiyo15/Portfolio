// Variables
const minus_btn = document.getElementById('minus');
const plus_btn = document.getElementById('plus');
const reset_btn = document.getElementById('reset');
const counter = document.getElementById('counter');

let buffer = 0;


// Functions
function buttonClick(value) {
  switch (value) {
    case 'Reset':
      reset();
      break;
    case '+':
      plus();
      break;
    case '-':
      minus();
      break;
  }
}

function minus() {
  buffer--;
  setCounter();
}

function plus() {
  buffer++;
  setCounter();
}

function reset() {
  buffer = 0;
  setCounter();
}

function setCounter() {
  counter.innerText = buffer;
}

function init() {
  document.querySelector('.buttons').addEventListener('click', function (event) {
    buttonClick(event.target.innerText);
  });
}

init();