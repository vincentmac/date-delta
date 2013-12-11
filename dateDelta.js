/*!
 * @license
 * Date-Delta 0.0.1
 * Copyright 2013 Vincent Mac <vincent@simplicity.io>
 *
 */

;(function() {

  var DateDelta;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = DateDelta;

  } else if (typeof define === 'function' && define.amd) {
    define('DateDelta', function() {

      return DateDelta;
    });
  }

  DateDelta = function DateDelta(d) {
    this.initialize(d);
  };

  DateDelta.prototype.initialize = function(d) {
    d = d || new Date();
    // Check if d is a Date object
    if (typeof d === 'object' && d.toDateString()) this.date = d;

    if (typeof d === 'string') this.date = this.parse(d);

    if (!this.date) this.date = d;
  };

  DateDelta.prototype.datetime = function() {
    return this.date;
  };

  /**
   * Parse a datetime string in iso8601 format to a date
   *
   * @param {String} iso8601 - Datetime string in iso8601 format
   * @returns {Date} - returns a date object from the given string.
   */
  DateDelta.prototype.parse = function(iso8601) {
    var timeStr;
    timeStr = iso8601.trim();
    timeStr = timeStr.replace(/\.\d\d\d+/, "");
    timeStr = timeStr.replace(/-/, "/").replace(/-/, "/");
    timeStr = timeStr.replace(/T/, " ").replace(/Z/, " UTC");
    timeStr = timeStr.replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2");
    return new Date(timeStr);
  };


  DateDelta.prototype.fromNow = function() {
    return this.DateDeltaWords(this.date) + ' ago';
  };

  /**
   * Calculate time difference in minutes
   *
   * @param {Date} time
   * @returns {Number} - minutes delta from current time
   */
  DateDelta.prototype.minutesAgo = function(time) {
    var delta; // time delta
    delta = new Date() - time;
    return Math.floor((Math.abs(delta) / 1000) / 60);
  };

  /**
   * Convert a time delta to words
   *
   * @param {Date} time
   * @returns {String} - minutes delta from current time
   */
  DateDelta.prototype.timeDeltaWords = function(time) {
    var delta; // time delta in minutes
    delta = this.minutesAgo(time);

    if (delta === 0) {
      return 'less than a minute';
    } else if (delta === 1) {
      return '1 minute';
    } else if (delta >= 2 && delta <= 44) {
      return delta + ' minutes';
    } else if (delta >= 45 && delta <= 89) {
      return 'about' + ' 1 hour';
    } else if (delta >= 90 && delta <= 1439) {
      return 'about ' + (Math.floor(delta / 60)) + 'hours';
    } else if (delta >= 1440 && delta <= 2519) {
      return '1 day'
    } else if (delta >= 2520 && delta <= 43199) {
      return (Math.floor(delta / 1440)) + ' days';
    } else if (delta >= 43200 && delta <= 86399) {
      return 'about 1 month';
    } else if (delta >= 86400 && delta <= 525599) {
      return (Math.floor(delta / 43200)) + 'months';
    } else if (delta >= 525600 && delta <= 655199) {
      return 'about 1 year';
    } else if (delta >= 655200 && delta <= 914399) {
      return 'over 1 year';
    } else if (delta >= 914400 && delta <= 1051199) {
      return 'almost 2 years';
    } else {
      return 'about ' + (Math.floor(delta / 525600)) + ' years';
    }
  };
})();
