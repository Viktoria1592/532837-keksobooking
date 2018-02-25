'use strict';

(function () {
  var lastTimeout;

  /**
   * функция предотвращает дребежание у переданной в нее функции
   * @param {function} func
   * @param {number}   debounceInterval
   */
  window.debounce = function (func, debounceInterval) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(func, debounceInterval);
  };
})();
