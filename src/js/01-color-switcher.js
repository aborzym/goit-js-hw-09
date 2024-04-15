function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
stopBtn.setAttribute('disabled', '');
let interval;

startBtn.addEventListener('click', (_ev) => {
  interval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.setAttribute('disabled', 'disabled');
  stopBtn.removeAttribute('disabled');
});

stopBtn.addEventListener('click', () => {
  clearInterval(interval);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', '');
});
