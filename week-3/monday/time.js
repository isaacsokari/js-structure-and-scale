const Constructor = (function () {
  function checkValidNumber(number) {
    if (typeof number !== 'number')
      throw new Error('Please enter a number as an argument');
  }
  function Constructor(...args) {
    this.date = new Date(...args);
  }

  Constructor.prototype.getDay = function getDay() {
    const dayIndex = this.date.getDay();
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
  };

  Constructor.prototype.getMonth = function getMonth() {
    const monthIndex = this.date.getMonth();
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
  };

  Constructor.prototype.addSeconds = function addSeconds(seconds) {
    checkValidNumber(seconds);

    this.date.setSeconds(this.date.getSeconds() + seconds);
    return this;
  };

  Constructor.prototype.addMinutes = function addMinutes(minutes) {
    checkValidNumber(minutes);

    this.date.setMinutes(this.date.getMinutes() + minutes);
    return this;
  };

  Constructor.prototype.addHours = function addHours(hours) {
    checkValidNumber(hours);

    this.date.setHours(this.date.getHours() + hours);
    return this;
  };

  Constructor.prototype.addDays = function addDays(days) {
    checkValidNumber(days);

    this.date.setDate(this.date.getDate() + days);
    return this;
  };

  Constructor.prototype.addMonths = function addMonths(months) {
    checkValidNumber(months);

    this.date.setMonth(this.date.getMonth() + months);
    return this;
  };

  Constructor.prototype.addYears = function addYears(years) {
    checkValidNumber(years);

    this.date.setFullYear(this.date.getFullYear() + years);
    return this;
  };

  return Constructor;
})();

export default Constructor;
