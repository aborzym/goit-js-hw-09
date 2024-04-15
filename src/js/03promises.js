import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
const form = document.querySelector('form.form');

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const amount = Number(form.elements.amount.value);
  let delay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay} ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay} ms`);
      });
    delay += step;
  }
});
