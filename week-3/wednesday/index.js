import Time from './time.js';

// Create a new Time() instance
// Customize the days and months
let halloween = new Time('October 31, 2021', {
  days: [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
  ],
  months: [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ],
});

// Try to override settings
// These should not change anything
try {
  halloween._settings = null;
} catch (error) {
  console.error(error.message);
}
try {
  halloween._settings.months = null;
} catch (error) {
  console.error(error.message);
}

// Get details from the instance
// returns "domingo" and "octubre"
let day = halloween.getDay();
let month = halloween.getMonth();

console.log(JSON.stringify({ day, month }, null, 2));

// Add some time
let allHallowsDay = halloween.addYears(5).addDays(1);

// halloween should still be October 31, 2021
// allHallowsDay should be November 1, 2026
console.log(halloween.date);
console.log(allHallowsDay.date);
