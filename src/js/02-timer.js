'use strict';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const days = document.querySelector('.value[data-days]');
const hours = document.querySelector('.value[data-hours]');
const minutes = document.querySelector('.value[data-minutes]');
const seconds = document.querySelector('.value[data-seconds]');
const input = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');
let timerId = null;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

startBtn.disabled = true;

const fp = flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //wybranie daty z przyszłości
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
    } else {
      //różnica daty
      const timeRemaining = selectedDates[0].getTime() - new Date().getTime();
      //pokazanie buttona start
      startBtn.disabled = false;

      //listener na button (disable) i wystartowanie timera
      startBtn.addEventListener('click', () => {
        startBtn.disabled = true;
        startTimer(timeRemaining);
      });
    }
  },
});

function startTimer(ms) {
  timerId = setInterval(() => {
    if (ms > 0) {
      displayTime(convertMs(ms));
      ms -= 1000;
    } else {
      Notify.success('Countdown finished');
      clearInterval(timerId);
    }
  }, 1000);
}

function displayTime(time) {
  days.textContent = addLeadingZero(time.days);
  hours.textContent = addLeadingZero(time.hours);
  minutes.textContent = addLeadingZero(time.minutes);
  seconds.textContent = addLeadingZero(time.seconds);
}
