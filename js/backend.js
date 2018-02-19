'use strict';

(function () {
  var downloadAdverts = function (onSuccess, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      window.error.drawMessage('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      window.error.drawMessage('Запрос не успел выполниться за ' + (xhr.timeout / 1000) + 'секунд');
    });
    xhr.timeout = 10000;
    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend = {
    downloadAdverts: downloadAdverts
  };
})();
