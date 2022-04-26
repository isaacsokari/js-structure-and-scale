var Time = (function () {
  'use strict';

  const Constructor = (function () {
    function checkValidNumber(number) {
      if (typeof number !== 'number')
        throw new Error('Please enter a number as an argument');
    }

    /**
     * Emit a custom event
     * @param  {String} type   The event type
     * @param  {Object} detail Any details to pass along with the event
     * @param  {Node}   elem   The element to attach the event to
     */
    function emitEvent(type, detail = {}, elem = document) {
      // Make sure there's an event type
      if (!type) return;

      // Create a new event
      let event = new CustomEvent(type, {
        bubbles: true,
        cancelable: true,
        detail: detail,
      });

      // Dispatch the event
      return elem.dispatchEvent(event);
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

      const date = new Date(this.date);
      date.setSeconds(date.getSeconds() + seconds);

      const canceled = !emitEvent('time:update', { time: { date } });

      if (canceled) return new Constructor(this.date, this._settings);
      return time;
    };

    Constructor.prototype.addMinutes = function addMinutes(minutes) {
      checkValidNumber(minutes);

      const date = new Date(this.date);
      date.setMinutes(date.getMinutes() + minutes);

      const time = new Constructor(date, this._settings);

      const canceled = !emitEvent('time:update', { time });

      if (canceled) return new Constructor(this.date, this._settings);
      return time;
    };

    Constructor.prototype.addHours = function addHours(hours) {
      checkValidNumber(hours);

      const date = new Date(this.date);
      date.setHours(date.getHours() + hours);

      const time = new Constructor(date, this._settings);

      const canceled = !emitEvent('time:update', { time });

      if (canceled) return new Constructor(this.date, this._settings);
      return time;
    };

    Constructor.prototype.addDays = function addDays(days) {
      checkValidNumber(days);

      const date = new Date(this.date);
      date.setDate(date.getDate() + days);

      const time = new Constructor(date, this._settings);

      const canceled = !emitEvent('time:update', { time });

      if (canceled) return new Constructor(this.date, this._settings);
      return time;
    };

    Constructor.prototype.addMonths = function addMonths(months) {
      checkValidNumber(months);

      const date = new Date(this.date);
      date.setMonth(date.getMonth() + months);

      const time = new Constructor(date, this._settings);

      const canceled = !emitEvent('time:update', { time });

      if (canceled) return new Constructor(this.date, this._settings);
      return time;
    };

    Constructor.prototype.addYears = function addYears(years) {
      checkValidNumber(years);

      const date = new Date(this.date);
      date.setFullYear(date.getFullYear() + years);

      const time = new Constructor(date, this._settings);

      const canceled = !emitEvent('time:update', { time });

      if (canceled) return new Constructor(this.date, this._settings);
      return time;
    };

    return Constructor;
  })();

  return Constructor;

})();
