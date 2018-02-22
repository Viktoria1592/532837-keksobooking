'use strict';

(function () {
  var adverts;

  var filter = function () {
    console.log(adverts);
  };

  window.data = {
    adverts: adverts,
    filter: filter
  };
})();
