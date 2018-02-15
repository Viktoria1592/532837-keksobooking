'use strict';

window.form = (function () {
  var MAIN_MAP_PIN_FULL_HEIGHT = 82;
  var MAIN_MAP_PIN_FULL_WIDTH = 62;

  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var timeInOptions = document.querySelectorAll('#timein option');
  var timeOutOptions = document.querySelectorAll('#timeout option');

  /**
   * Функция синхронизирующая время заезда\выезда
   * (при изменении значения одного поля, во втором выделяется соответствующее ему)
   * @param {array} weSelectOptionsArray              массив DOM-объектов с которым будет синхронизирован следующий
   * @param {array} automaticallyChangedOptionsArray  массив DOM-объектов который будет синхронизирован
   */
  var changeTime = function (weSelectOptionsArray, automaticallyChangedOptionsArray) {
    for (var t = 0; t < weSelectOptionsArray.length; t++) {
      if (weSelectOptionsArray[t].selected) {
        automaticallyChangedOptionsArray[t].selected = true;
      }
    }
  };

  var timeInClickHandler = function () {
    changeTime(timeInOptions, timeOutOptions);
  };

  var timeOutClickHandler = function () {
    changeTime(timeOutOptions, timeInOptions);
  };
  timeIn.addEventListener('click', timeInClickHandler);
  timeOut.addEventListener('click', timeOutClickHandler);

  /**
   * функция делает невозможным выбор в "Количество мест" несовпадающих значений с "Кол-во комнат"
   * @param  {number} activeValue  принимает значение выбраное в "Кол-во комнат"
   * @return {boolean}             в случае если выбрано значение в "Кол-во комнат" совпадающий с "Количество мест" - возвращает true
   */
  var syncRoomsVsGuests = function (activeValue) {
    var roomNumbers = {
      '1': ['1'],
      '2': ['1', '2'],
      '3': ['1', '2', '3'],
      '100': ['0']
    };

    var capacityObjects = document.querySelectorAll('#capacity option');
    var guestCount = roomNumbers[activeValue];
    var capacity = document.querySelector('#capacity');
    var correctValue = false;

    for (var u = 0; u < capacityObjects.length; u++) {
      capacityObjects[u].disabled = !guestCount.includes(capacityObjects[u].value);
      if (capacityObjects[u].value === capacity.value && !capacityObjects[u].disabled) {
        correctValue = true;
      }
    }
    return correctValue;
  };

  var roomNumberObject = document.querySelector('#room_number');

  /**
   * Обработчик события для синхронизации Кол-ва комнат и кол-ва мест
   */
  var roomNumberSelectClickHandler = function () {
    syncRoomsVsGuests(roomNumberObject.value);
  };

  roomNumberObject.addEventListener('click', roomNumberSelectClickHandler);

  var submitButton = document.querySelector('button.form__submit');

  /**
   * Обработчик событий, по нажатии на кнопку Опубликовать - проверяет
   * соответствует ли количество мест комнатам
   */
  submitButton.addEventListener('click', function () {
    var capacity = document.querySelector('#capacity');
    var roomObject = document.querySelector('#room_number');
    if (!syncRoomsVsGuests(roomObject.value)) {
      capacity.setCustomValidity('Количетво гостей не совпадает с количеством комнат');
    } else {
      capacity.setCustomValidity('');
    }
  });

  return {
    /**
     * Функция-обработчик события, меняет минимальную
     * допустимую стоимость жилья в атрибуте 'Цена за ночь, руб.'
     * в зависимости от выбраного типа жилья
     */
    flatTypeSelectClickHandler: function () {
      var flatTypesObjects = document.querySelectorAll('#type option');
      var faltTypes = {
        'flat': '0',
        'bungalo': '1000',
        'house': '5000',
        'palace': '10000'
      };

      var priceForFlat = document.querySelector('#price');
      for (var s = 0; s < flatTypesObjects.length; s++) {
        if (flatTypesObjects[s].selected) {
          priceForFlat.min = faltTypes[flatTypesObjects[s].value];
        }
      }
    },

    /**
     * Функция которая устанавливает значение в поле ввода адреса
     */
    findMainPinAdress: function () {
      var mapPinMain = document.querySelector('button.map__pin--main');
      document.querySelector('#address').value = '' + (mapPinMain.offsetTop + MAIN_MAP_PIN_FULL_HEIGHT) + ', ' + (mapPinMain.offsetLeft + (MAIN_MAP_PIN_FULL_WIDTH / 2)) + '';
    },

    roomNumberSelectClickHandler: roomNumberSelectClickHandler
  };
})();
