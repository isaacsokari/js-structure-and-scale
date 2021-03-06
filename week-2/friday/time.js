function checkValidNumber(number) {
  if (typeof number !== 'number')
    throw new Error('Please enter a number as an argument');
}
function checkValidDate(dateObject) {
  if (!dateObject instanceof Date)
    throw new Error(`${dateObject} is not a valid Date object`);
}

/**
 * @param {Date} dateObject - date object to modify
 */
function getDay(dateObject) {
  checkValidDate(dateObject);

  const dayIndex = dateObject.getDay();
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return days[dayIndex];
}

/**
 * @param {Date} dateObject - date object to modify
 */
function getMonth(dateObject) {
  checkValidDate(dateObject);

  const monthIndex = dateObject.getMonth();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return months[monthIndex];
}

/**
 * @param {Date} dateObject - date object to modify
 */
function addSeconds(dateObject, seconds) {
  checkValidDate(dateObject);
  checkValidNumber(seconds);

  return dateObject.setSeconds(date.getSeconds() + seconds);
}

/**
 * @param {Date} dateObject - date object to modify
 */
function addMinutes(dateObject, minutes) {
  checkValidDate(dateObject);
  checkValidNumber(minutes);

  return dateObject.setMinutes(dateObject.getMinutes() + minutes);
}

/**
 * @param {Date} dateObject - date object to modify
 */
function addHours(dateObject, hours) {
  checkValidDate(dateObject);
  checkValidNumber(hours);

  return dateObject.setHours(dateObject.getHours() + hours);
}

/**
 * @param {Date} dateObject - date object to modify
 */
function addDays(dateObject, days) {
  checkValidDate(dateObject);
  checkValidNumber(days);

  return dateObject.setDate(dateObject.getDate() + days);
}

/**
 * @param {Date} dateObject - date object to modify
 */
function addMonths(dateObject, months) {
  checkValidDate(dateObject);
  checkValidNumber(months);

  return dateObject.setMonth(dateObject.getMonth() + months);
}

/**
 * @param {Date} dateObject - date object to modify
 */
function addYears(dateObject, years) {
  checkValidDate(dateObject);
  checkValidNumber(years);

  return dateObject.setFullYear(dateObject.getFullYear() + years);
}

export {
  getDay,
  addSeconds,
  addMinutes,
  addHours,
  addDays,
  addMonths,
  addYears,
};
