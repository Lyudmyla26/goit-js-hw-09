import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const btnStart = document.querySelector('button[data-start]');

const input = document.querySelector('#datetime-picker');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');
let timerId = null;
btnStart.setAttribute('disabled', 'true');
const fp = flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      btnStart.removeAttribute('disabled');
      Notiflix.Notify.success('Lets go? 👌');
    }
  },
});
btnStart.addEventListener('click', onclick);
function onclick(event) {
  btnStart.setAttribute('disabled', 'true');
  timerId = setInterval(time, 1000);
}
function time() {
  const targetDay = new Date(input.value);
  const currentDay = new Date();
  const timeToFinish = targetDay - currentDay;
  const { days, hours, minutes, seconds } = convertMs(timeToFinish);
  day.textContent = addLeadingZero(days);
  hour.textContent = addLeadingZero(hours);
  minute.textContent = addLeadingZero(minutes);
  second.textContent = addLeadingZero(seconds);
  if (timeToFinish < 1000) {
    clearInterval(timerId);
    btnStart.removeAttribute('disabled');
    input.classList.toggle('end');
  }
}

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
  return `${value}`.padStart(2, '0');
}
