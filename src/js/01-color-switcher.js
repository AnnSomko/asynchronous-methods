const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
let timerId = null;

startBtn.addEventListener("click", onBtnStart);
stopBtn.addEventListener("click", onBtnStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onBtnStart(e) {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
}

function onBtnStop(e) {
  clearInterval(timerId);
  startBtn.disabled = false;
}
