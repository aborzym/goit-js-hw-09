import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { convertMs, addLeadingZero } from './02-data';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const clockAudio = document.querySelector('#clock');
const finishCountdownAudio = document.querySelector('#finishCountdown');
let time;
const input = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const resetBtn = document.querySelector('button[data-reset]');
startBtn.setAttribute('disabled', '');
let now = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < now)
      Notify.failure('Please choose a date in the future', {
        timeout: 4000,
        fontSize: '16px',
        position: 'center-center',
        clickToClose: true,
        useIcon: true,
        failure: {
          textColor: '#000',
        },
      });
    else {
      time = 0;
      startBtn.removeAttribute('disabled');
    }
    time = selectedDates[0] - now;
  },
};

flatpickr('#datetime-picker', options);

const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

let interval;

startBtn.addEventListener('click', (ev) => {
  interval = setInterval(() => {
    const timeToCountdown = convertMs(time);
    if (days > 99) days.innerText = timeToCountdown.days;
    else days.innerText = addLeadingZero(timeToCountdown.days);
    hours.innerText = addLeadingZero(timeToCountdown.hours);
    minutes.innerText = addLeadingZero(timeToCountdown.minutes);
    seconds.innerText = addLeadingZero(timeToCountdown.seconds);
    time -= 1000;
    if (time <= 5000 && time > 4000) clockAudio.play();
    if (time <= 0) {
      finishCountdownAudio.play();
      clearInterval(interval);
    }
  }, 1000);
  startBtn.setAttribute('disabled', '');
});

resetBtn.addEventListener('click', () => {
  clearInterval(interval);
  days.innerText = '00';
  hours.innerText = '00';
  minutes.innerText = '00';
  seconds.innerText = '00';
  startBtn.setAttribute('disabled', '');
  input.value = '';
});
