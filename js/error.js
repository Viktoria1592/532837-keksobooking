'use strict';

(function () {
  var errorMessageTemplate = document.querySelector('template').content.querySelector('article.error__message');

  /**
   * Функция добавляющая всплывающее сообщение об ошибке поверх страницы
   * @param {string} errorMessage
   */
  var drawMessage = function (errorMessage) {
    errorMessageTemplate.querySelector('p').textContent = errorMessage;
    document.querySelector('body').style.position = 'relative';
    document.body.insertAdjacentElement('afterbegin', errorMessageTemplate);
    var closeButton = document.querySelector('article.error__message div button');
    var errorMessageDiv = document.querySelector('article.error__message');

    closeButton.addEventListener('click', function () {
      if (errorMessageDiv !== null) {
        errorMessageDiv.remove();
      }
    });

    closeButton.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        errorMessageDiv.remove();
      }
    });
  };

  window.error = {
    drawMessage: drawMessage
  };
})();
