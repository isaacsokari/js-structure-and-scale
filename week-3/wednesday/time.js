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

    const newDate = new Date(this.date);
    newDate.setSeconds(newDate.getSeconds() + seconds);
    return new Constructor(newDate, this._settings);
  };

  Constructor.prototype.addMinutes = function addMinutes(minutes) {
    checkValidNumber(minutes);

    const newDate = new Date(this.date);
    newDate.setMinutes(newDate.getMinutes() + minutes);
    return new Constructor(newDate, this._settings);
  };

  Constructor.prototype.addHours = function addHours(hours) {
    checkValidNumber(hours);

    const newDate = new Date(this.date);
    newDate.setHours(newDate.getHours() + hours);
    return new Constructor(newDate, this._settings);
  };

  Constructor.prototype.addDays = function addDays(days) {
    checkValidNumber(days);

    const newDate = new Date(this.date);
    newDate.setDate(newDate.getDate() + days);
    return new Constructor(newDate, this._settings);
  };

  Constructor.prototype.addMonths = function addMonths(months) {
    checkValidNumber(months);

    const newDate = new Date(this.date);
    newDate.setMonth(newDate.getMonth() + months);
    return new Constructor(newDate, this._settings);
  };

  Constructor.prototype.addYears = function addYears(years) {
    checkValidNumber(years);

    const newDate = new Date(this.date);
    newDate.setFullYear(newDate.getFullYear() + years);
    return new Constructor(newDate, this._settings);
  };

  return Constructor;
})();

export default Constructor;
