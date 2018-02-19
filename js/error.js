'use strict';

(function () {
  var drawMessage = function (errorMessage) {
    var errorMessageDiv = document.querySelector('template').content.querySelector('article.error__message');
    errorMessageDiv.querySelector('p').textContent = errorMessage;
    document.querySelector('body').style.position = 'relative';
    document.body.insertAdjacentElement('afterbegin', errorMessageDiv);
    var closeButton = errorMessageDiv.querySelector('button');

    closeButton.addEventListener('click', function () {
      errorMessageDiv.remove();
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
