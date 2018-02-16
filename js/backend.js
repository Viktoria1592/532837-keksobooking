'use strict';

(function () {
  var downloadAdverts = function (onSuccess) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
        console.log(xhr.response);
      } else {
        console.log('Ошибка ' + xhr.status + ': ' + xhr.statusText);
      }
    });
    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend = {
    downloadAdverts: downloadAdverts
  };
})();
