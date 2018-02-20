'use strict';

(function () {
  /**
   * Функция загрузки объявлений с сервера
   * @param {function} onSuccess
   * @param {function} onError
   */
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

  /**
   * Функция загрузки данных с заполненной формы на сервер
   * @param {node}     data       данные из формы
   * @param {function} onLoad
   * @param {function} onError
   */
  var uploadFormData = function (data, onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('error', function () {
      window.error.drawMessage('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      window.error.drawMessage('Запрос не успел выполниться за ' + (xhr.timeout / 1000) + 'секунд');
    });
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad();
      } else {
        onError(xhr.status);
      }

    });

    xhr.timeout = 10000;
    xhr.open('POST', URL);
    try {
      xhr.send(data);
    } catch (err) {
      console.log('!!!');
    }
  };

  window.backend = {
    downloadAdverts: downloadAdverts,
    uploadFormData: uploadFormData
  };
})();
