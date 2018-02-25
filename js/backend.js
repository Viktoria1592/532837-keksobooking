'use strict';

(function () {
  var GET_URL = 'https://js.dump.academy/keksobooking/data';
  var POST_URL = 'https://js.dump.academy/keksobooking';
  var TIMEOUT = 10000;
  var STATUS_OK = 200;
  /**
   * Функция создания нового запроса
   * @param  {string}   url        адресс сервера
   * @param  {string}   type       тип запроса GET или POST
   * @param  {object}   data       данные если отпарвка или false если загрузка
   * @param  {function} onSuccess
   * @param  {function} onError
   */
  var newRequest = function (url, type, data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        if (!data) {
          onSuccess(xhr.response);
        } else {
          onSuccess();
        }
      } else {
        onError(xhr.status);
      }
    });

    xhr.addEventListener('error', function () {
      window.util.drawMessage('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      window.util.drawMessage('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    xhr.open(type, url);
    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };

  window.backend = {
    download: function (onSuccess, onError) {
      newRequest(GET_URL, 'GET', false, onSuccess, onError);
    },
    upload: function (data, onSuccess, onError) {
      newRequest(POST_URL, 'POST', data, onSuccess, onError);
    }
  };
})();
