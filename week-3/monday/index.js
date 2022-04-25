import Time from './time.js';

// Create a new Time() instance
let halloween = new Time('October 31, 2021');

// This should also work
let halloween2 = new Time(2021, 9, 31);

// Get the date object
let date = halloween.date;

// returns "Sunday"
let day = halloween.getDay();

// returns "October"
let month = halloween.getMonth();

// Add some time
halloween.addDays(3).addMonths(1).addYears(5);

// returns "Thursday"
let newDay = halloween.getDay();

// returns "December"
let newMonth = halloween.getMonth();

console.log(
  JSON.stringify(
    {
      halloween,
      halloween2,
      date,
      day,
      month,
      newDay,
      newMonth,
    },
    null,
    2
  )
);
