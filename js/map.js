'use strict';

(function () {
  var mapPopup = document.querySelector('section.map');
  var TOP_Y_BORDER = 150;
  var BOTTOM_Y_BORDER = 500;
  var LEFT_X_BORDER = 0;
  var RIGHT_X_BORDER = mapPopup.offsetWidth;
  var mainPinInitialStateTop = 375 + 'px';
  var mainPinInitialStateLeft = 50 + '%';
  var referenceElement = document.querySelector('div.map__filters-container');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFormFieldsets = noticeForm.querySelectorAll('fieldset');
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var mapFiltersForm = document.querySelectorAll('.map__filters>*');
  var escButtonDocumentHandler;

  /**
   * Функция возвращает страницу в её начальное состояние
   * (неактивны поля форм и заблокирована карта)
   */
  var returnsMapInitialState = function () {
    noticeForm.classList.add('notice__form--disabled');

    noticeFormFieldsets.forEach(function (element) {
      element.disabled = true;
    });

    if (document.querySelectorAll('.map .map__card').length > 0) {
      closeOpenedCards();
    }

    mapFiltersForm.forEach(function (element) {
      element.disabled = true;
    });

    map.classList.add('map--faded');
    mainPin.style.top = mainPinInitialStateTop;
    mainPin.style.left = mainPinInitialStateLeft;
    document.querySelector('#address').value = '' + (mainPin.offsetTop + (mainPin.offsetHeight / 2)) + ', ' + (mainPin.offsetLeft + (mainPin.offsetWidth / 2)) + '';
  };

  returnsMapInitialState();

  /**
   * Функция делает страницу активной для заполнения и просмотра
   * (активны поля форм и карта)
   */
  var makePageActive = function () {
    noticeForm.classList.remove('notice__form--disabled');

    noticeFormFieldsets.forEach(function (element) {
      element.disabled = false;
    });

    map.classList.remove('map--faded');
    var flatTypeInput = document.querySelector('#type');
    flatTypeInput.addEventListener('click', window.form.flatTypeSelectClickHandler);
    window.backend.download(onSuccess, window.util.onError);
    window.form.upload();
    window.form.findMainPinAddress();
  };

  /**
   * функция удаляет пины объявлений с карты
   */
  var removeAdvertPins = function () {
    var similarAdvertPins = document.querySelectorAll('.map__pins button:not(.map__pin--main)');

    similarAdvertPins.forEach(function (element) {
      element.remove();
    });
  };

  var mapFilters = {
    'housing-price': {
      'any': [0, 100000000000000000],
      'middle': [10000, 50000],
      'low': [0, 10000],
      'high': [50000, 100000000000000000]
    }
  };

  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('#housing-features input');

  var filter = function (item) {
    var counter = 0;
    if (housingType.value === item.offer.type || housingType.value === 'any') {
      counter++;
    }
    if (mapFilters[housingPrice.id][housingPrice.value][0] <= item.offer.price && mapFilters[housingPrice.id][housingPrice.value][1] >= item.offer.price) {
      counter++;
    }

    if (parseInt(housingRooms.value, 10) === parseInt(item.offer.rooms, 10) || housingRooms.value === 'any') {
      counter++;
    }
    if (parseInt(housingGuests.value, 10) === parseInt(item.offer.guests, 10) || housingGuests.value === 'any') {
      counter++;
    }

    housingFeatures.forEach(function (element) {
      if (element.checked) {
        if (item.offer.features.includes(element.value)) {
          counter++;
        } else {
          counter -= counter;
        }
      } else {
        counter++;
      }
    });
    if (counter === 10) {
      return true;
    } else {
      return false;
    }
  };

  var mapSelectFilterChangeHandler = function () {
    removeAdvertPins();
    var filteredArray = window.data.adverts.filter(filter);
    mapPins.appendChild(window.pin.fragmentFilling(filteredArray, window.pin.renderAdvertLabel));
    var similarAdvertPins = document.querySelectorAll('.map__pins button:not(.map__pin--main)');
    similarAdvertPins.forEach(function (element) {
      addHandlerToAdvertPin(element);
    });
  };

  /**
   * Функция добавляющая пины объявлений на карту, в случае успешной загрузки данных с сервера
   * @param {array} arrayOfAdverts массив с объектами объявлений
   */
  var onSuccess = function (arrayOfAdverts) {
    window.data.adverts = arrayOfAdverts;
    mapPins.appendChild(window.pin.fragmentFilling(arrayOfAdverts, window.pin.renderAdvertLabel));
    var similarAdvertPins = document.querySelectorAll('.map__pins button:not(.map__pin--main)');

    mapFiltersForm.forEach(function (element) {
      element.disabled = false;
      element.addEventListener('change', mapSelectFilterChangeHandler);
    });

    similarAdvertPins.forEach(function (element) {
      addHandlerToAdvertPin(element);
    });
  };

  /**
   * Функция реализует процесс перемещения главной метки по карте
   * и записывает её положение в поле адресс
   * @param {event} evt
   */
  var mainPinMouseDownHandler = function (evt) {
    window.form.roomNumberSelectClickHandler();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mainPinMouseMoveHandler = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // ограничение области куда можно поставить метку
      if ((mainPin.offsetTop - shift.y) < TOP_Y_BORDER) {
        mainPin.style.top = TOP_Y_BORDER + 'px';
      } else if ((mainPin.offsetTop - shift.y) > BOTTOM_Y_BORDER) {
        mainPin.style.top = BOTTOM_Y_BORDER + 'px';
      } else {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      }
      if ((mainPin.offsetLeft - shift.x) < LEFT_X_BORDER) {
        mainPin.style.left = LEFT_X_BORDER + 'px';
      } else if ((mainPin.offsetLeft - shift.x) > RIGHT_X_BORDER) {
        mainPin.style.left = RIGHT_X_BORDER + 'px';
      } else {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
      }
      window.form.findMainPinAddress();
    };

    var mainPinMouseUpHandler = function () {
      if (noticeForm.classList.contains('notice__form--disabled')) {
        makePageActive();
      }

      document.removeEventListener('mousemove', mainPinMouseMoveHandler);
      document.removeEventListener('mouseup', mainPinMouseUpHandler);
    };

    document.addEventListener('mousemove', mainPinMouseMoveHandler);
    document.addEventListener('mouseup', mainPinMouseUpHandler);
  };

  mainPin.addEventListener('mousedown', mainPinMouseDownHandler);

  /**
   * Функция добавляет обработчик события клика к переданному в нее объекту метки
   * @param {object} advertPin  DOM объект метки
   */
  var addHandlerToAdvertPin = function (advertPin) {
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
    document.removeEventListener('keydown', escButtonDocumentHandler);
  };

  /**
   * Функция добавляющая обработчики событий для закрытия карточки объявления
   * (по нажатии кнопки Enter, Escape и клике на кнопку закрытия)
   * @param {object} advertCard обьет карточки объявления, к которой добавляем обрабочик
   */
  var addHandlerToAdvertCard = function (advertCard) {
    var popupClose = advertCard.querySelector('button.popup__close');
    popupClose.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ENTER_KEYCODE) {
        closeOpenedCards();
        document.removeEventListener('keydown', escButtonDocumentHandler);
      }
    });

    escButtonDocumentHandler = function (evt) {
      if (evt.keyCode === window.data.ESCAPE_KEYCODE) {
        closeOpenedCards();
        document.removeEventListener('keydown', escButtonDocumentHandler);
      }
    };

    document.addEventListener('keydown', escButtonDocumentHandler);

    popupClose.addEventListener('click', function () {
      closeOpenedCards();
      document.removeEventListener('keydown', escButtonDocumentHandler);
    });
  };

  window.map = {
    returnsMapInitialState: returnsMapInitialState,
    removeAdvertPins: removeAdvertPins
  };

})();

