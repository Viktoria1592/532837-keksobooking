'use strict';

(function () {
  var mapPopup = document.querySelector('section.map');
  var TOP_Y_BORDER = 150;
  var BOTTOM_Y_BORDER = 500;
  var LEFT_X_BORDER = 0;
  var RIGHT_X_BORDER = mapPopup.offsetWidth;
  var referenceElement = document.querySelector('div.map__filters-container');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormFieldsets = noticeForm.querySelectorAll('fieldset');
  var map = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');

  /**
   * Функция возвращает страницу в её начальное состояние
   * (неактивны поля форм и заблокирована карта)
   */
  var blocksThePage = function () {
    noticeForm.classList.add('notice__form--disabled');

    for (var n = 0; n < noticeFormFieldsets.length; n++) {
      noticeFormFieldsets[n].disabled = true;
    }

    map.classList.add('map--faded');
    document.querySelector('#address').value = '' + (mapPinMain.offsetTop + (mapPinMain.offsetHeight / 2)) + ', ' + (mapPinMain.offsetLeft + (mapPinMain.offsetWidth / 2)) + '';
  };

  blocksThePage();

  /**
   * Функция делает страницу активной для заполнения и просмотра
   * (активны поля форм и карта)
   */
  var makePageActive = function () {
    noticeForm.classList.remove('notice__form--disabled');

    for (var n = 0; n < noticeFormFieldsets.length; n++) {
      noticeFormFieldsets[n].disabled = false;
    }

    map.classList.remove('map--faded');
    var flatTypeInput = document.querySelector('#type');
    flatTypeInput.addEventListener('click', window.form.flatTypeSelectClickHandler);
    window.backend.downloadAdverts(onSuccess, window.util.onError);
  };

  /**
   * Функция добавляющая пины объявлений на карту, в случае успешной загрузки данных
   * @param {array} arrayOfAdverts массив с объектами объявлений
   */
  var onSuccess = function (arrayOfAdverts) {
    window.data.adverts = arrayOfAdverts;
    mapPins.appendChild(window.pin.fragmentFilling(arrayOfAdverts, window.pin.renderAdvertLabel));
    var similarAdvertPins = document.querySelectorAll('.map__pins button:not(.map__pin--main)');

    for (var p = 0; p < similarAdvertPins.length; p++) {
      var advertPin = similarAdvertPins[p];
      addHandlerPin(advertPin);
    }
  };

  /**
   * Функция-обработчик события, по клику на главную метку делает страницу активной и заполняет адресс
   * @param {event} evt
   */
  var mainPinMouseDownHandler = function (evt) {
    window.form.roomNumberSelectClickHandler();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mainPinMouseMoveHandler = function (moveEvt) {
      if (noticeForm.classList.contains('notice__form--disabled')) {
        makePageActive();
      }
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if ((mapPinMain.offsetTop - shift.y) < TOP_Y_BORDER) {
        mapPinMain.style.top = TOP_Y_BORDER + 'px';
      } else if ((mapPinMain.offsetTop - shift.y) > BOTTOM_Y_BORDER) {
        mapPinMain.style.top = BOTTOM_Y_BORDER + 'px';
      } else {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }
      if ((mapPinMain.offsetLeft - shift.x) < LEFT_X_BORDER) {
        mapPinMain.style.left = LEFT_X_BORDER + 'px';
      } else if ((mapPinMain.offsetLeft - shift.x) > RIGHT_X_BORDER) {
        mapPinMain.style.left = RIGHT_X_BORDER + 'px';
      } else {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }
      window.form.findMainPinAdress();
    };

    var mainPinMouseUpHandler = function () {
      document.removeEventListener('mousemove', mainPinMouseMoveHandler);
      document.removeEventListener('mouseup', mainPinMouseUpHandler);
    };

    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    document.addEventListener('mouseup', mainPinMouseUpHandler);
  };

  mapPinMain.addEventListener('mousedown', mainPinMouseDownHandler);

  /**
   * Функция добавляет обработчик события к переданному в нее объекту метки
   * @param {object} advertPin  DOM объект метки
   */
  var addHandlerPin = function (advertPin) {
    advertPin.addEventListener('click', buttonClickHandler);
  };

  /**
   * Функция-обработчик события, генерирует соответственный бъект карточки
   * объявления и добавляет обработчик события для закрытия карточки.
   * Также перед открытием следующих карточек - проверяет есть ли открытые и удаляет их.
   * @param {object} evt
   */
  var buttonClickHandler = function (evt) {
    closeOpenedCards();
    var evtImgClick = evt.path[1].dataset.id;
    var evtBorderClick = evt.path[0].dataset.id;
    if (evt.path[0].tagName === 'IMG') {
      mapPopup.insertBefore(window.card.addToMap(window.data.adverts, window.card.renderAdvert, evtImgClick), referenceElement);
      addHandlerToAdvertCard(document.querySelector('article.map__card'));
    } else {
      mapPopup.insertBefore(window.card.addToMap(window.data.adverts, window.card.renderAdvert, evtBorderClick), referenceElement);
      addHandlerToAdvertCard(document.querySelector('article.map__card'));
    }
  };

  /**
   * Функция удаляющая карточку объявления с карты
   */
  var closeOpenedCards = function () {
    var mapCard = document.querySelector('article.map__card');
    if (mapPopup.contains(mapCard)) {
      mapPopup.removeChild(mapCard);
    }
  };

  /**
   * Функция добавляющая два обработчика события на кнопку закрытия карточки объявления
   * (по нажатии кнопки Enter и клике на кнопку закрытия)
   * @param {object} advertCard обьет карточки объявления, к которой добавляем обрабочик
   */
  var addHandlerToAdvertCard = function (advertCard) {
    advertCard.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        advertCard.classList.add('hidden');
        advertCard.removeEventListener('keydown', buttonClickHandler);
      }
    });

    advertCard.querySelector('button.popup__close').addEventListener('click', function () {
      advertCard.classList.add('hidden');
      advertCard.removeEventListener('click', buttonClickHandler);
    });
  };

})();

