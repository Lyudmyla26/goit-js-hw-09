const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
// console.log(btnStart);
let timerId = null;
btnStart.addEventListener('click', onClick);
btnStop.addEventListener('click', offClick);
function onClick(event) {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStart.setAttribute('disabled', 'true');
}
function offClick(event) {
  clearInterval(timerId);
  btnStart.removeAttribute('disabled');
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
