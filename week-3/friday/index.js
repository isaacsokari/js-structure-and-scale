import Time from './time.js';

// Create a new Time() instance
let halloween = new Time('October 31, 2021');

// If the year on the Time() instance is greater than 2021, don't update
document.addEventListener('time:update', function (event) {
  console.log(event.detail);
  if (event.detail.time.date.getFullYear() > 2021) {
    event.preventDefault();
  }
});

console.log(halloween);
// Adjust the date
// the addYears() method won't update the date in this instance
const newHalloween = halloween.addDays(3).addMonths(1).addYears(1);
console.log(newHalloween);
