const Constructor = (function () {
  function checkValidNumber(number) {
    if (typeof number !== 'number')
      throw new Error('Please enter a number as an argument');
  }
  function Constructor(date, options = {}) {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

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

    const settings = Object.assign(
      {
        days,
        months,
      },
      options
    );

    Object.freeze(settings);

    Object.defineProperties(this, {
      date: { value: new Date(date) },
      _settings: { value: settings },
    });
  }

  Constructor.prototype.getDay = function getDay() {
    const dayIndex = this.date.getDay();

    return this._settings.days[dayIndex];
  };

  Constructor.prototype.getMonth = function getMonth() {
    const monthIndex = this.date.getMonth();

    return this._settings.months[monthIndex];
  };

  Constructor.prototype.addSeconds = function addSeconds(seconds) {
    checkValidNumber(seconds);

    const newTime = this.date.getSeconds() + seconds;
    return new Constructor(newTime, this._settings);
  };

  Constructor.prototype.addMinutes = function addMinutes(minutes) {
    checkValidNumber(minutes);

    const newTime = this.date.getMinutes() + minutes;
    return new Constructor(newTime, this._settings);
  };

  Constructor.prototype.addHours = function addHours(hours) {
    checkValidNumber(hours);

    const newTime = this.date.getHours() + hours;
    return new Constructor(newTime, this._settings);
  };

  Constructor.prototype.addDays = function addDays(days) {
    checkValidNumber(days);

    const newTime = this.date.getDate() + days;
    return new Constructor(newTime, this._settings);
  };

  Constructor.prototype.addMonths = function addMonths(months) {
    checkValidNumber(months);

    const newTime = this.date.getMonth() + months;
    return new Constructor(newTime, this._settings);
  };

  Constructor.prototype.addYears = function addYears(years) {
    checkValidNumber(years);

    const newTime = this.date.getFullYear() + years;
    return new Constructor(newTime, this._settings);
  };

  return Constructor;
})();

export default Constructor;
