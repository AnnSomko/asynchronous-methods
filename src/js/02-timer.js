import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix';

const dataDays = document.querySelector('span[data-days]');
const dataHours = document.querySelector('span[data-hours]');
const dataMinutes = document.querySelector('span[data-minutes]');
const dataSeconds = document.querySelector('span[data-seconds]');
const startBtn = document.querySelector('button');
startBtn.disabled = true;
var selectedDate = null;
let timerId = null;

startBtn.addEventListener('click', onTimerStart);

function onTimerStart() {
  timerId = setInterval(() => {
    let time = new Date().getTime();
    let deltaTime = selectedDate - time;
    if (deltaTime < 0) {
      clearInterval(timerId);
    } else {
      let convertedDeltaTime = convertMs(deltaTime);
      updateClockFace(convertedDeltaTime);
    }
  }, 1000);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0].getTime();

    if (selectedDate < new Date().getTime()) {
      Notify.warning('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(ms) {
  return String(ms).padStart(2, '0');
}

function updateClockFace({ days, hours, minutes, seconds }) {
  dataDays.textContent = addLeadingZero(`${days}`);
  dataHours.textContent = addLeadingZero(`${hours}`);
  dataMinutes.textContent = addLeadingZero(`${minutes}`);
  dataSeconds.textContent = addLeadingZero(`${seconds}`);
}
