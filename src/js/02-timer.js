import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  convertMs,
  addLeadingZero,
  //   playCountdown,
  //   playFinalSound,
} from './02-data';
import Notiflix from 'notiflix';
Notiflix.Notify.init({});

let finishCountdown = new Audio('../assets/win_off.mp3');
let time;
const startBtn = document.querySelector('button[data-start]');
startBtn.setAttribute('disabled', 'disabled');
now = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    playFinalSound();
    if (selectedDates[0] < now)
      Notiflix.Notify.failure('Please choose a date in the future', {
        timeout: 4000,
        fontSize: '16px',
        position: 'center-center',
        clickToClose: true,
        useIcon: false,
        failure: {
          textColor: '#000',
        },
      });
    else {
      startBtn.removeAttribute('disabled');
    }
    time = selectedDates[0] - now;
  },
};
const fp = flatpickr('#datetime-picker', options);

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let interval;

startBtn.addEventListener('click', ev => {
  interval = setInterval(() => {
    timeToCountdown = convertMs(time);
    if (days > 99) days.innerText = timeToCountdown.days;
    else days.innerText = addLeadingZero(timeToCountdown.days);
    hours.innerText = addLeadingZero(timeToCountdown.hours);
    minutes.innerText = addLeadingZero(timeToCountdown.minutes);
    seconds.innerText = addLeadingZero(timeToCountdown.seconds);
    time -= 1000;
    if (time <= 0) {
      clearInterval(interval);
      startBtn.setAttribute('disabled', 'disabled');
    }
  }, 1000);
});
