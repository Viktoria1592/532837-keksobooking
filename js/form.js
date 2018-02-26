'use strict';

(function () {
  var MAIN_MAP_PIN_FULL_HEIGHT = 87;
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var timeInOptions = document.querySelectorAll('#timein option');
  var timeOutOptions = document.querySelectorAll('#timeout option');
  var capacity = document.querySelector('#capacity');
  var roomSelector = document.querySelector('#room_number');
  var mapPinMain = document.querySelector('button.map__pin--main');
  var capacitySelectorOptions = document.querySelectorAll('#capacity option');
  var submitButton = document.querySelector('button.form__submit');
  var form = document.querySelector('form.notice__form');
  var mapFiltersForm = document.querySelector('.map__filters');
  var formReset = document.querySelector('.form__reset');


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

  /**
   * Функция-обработчик события, синхронизирет время заезда\выезда
   */
  var timeInClickHandler = function () {
    changeTime(timeInOptions, timeOutOptions);
  };

  /**
   * Функция-обработчик события, синхронизирет время выезда\заезда
   */
  var timeOutClickHandler = function () {
    changeTime(timeOutOptions, timeInOptions);
  };
  timeIn.addEventListener('change', timeInClickHandler);
  timeOut.addEventListener('change', timeOutClickHandler);

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

    var guestCount = roomNumbers[activeValue];
    var correctValue = false;

    for (var u = 0; u < capacitySelectorOptions.length; u++) {
      capacitySelectorOptions[u].disabled = !guestCount.includes(capacitySelectorOptions[u].value);
      if (capacitySelectorOptions[u].value === capacity.value && !capacitySelectorOptions[u].disabled) {
        correctValue = true;
      }
    }
    return correctValue;
  };

  /**
   * Обработчик события для синхронизации Кол-ва комнат и кол-ва мест
   */
  var roomNumberSelectClickHandler = function () {
    syncRoomsVsGuests(roomSelector.value);
  };

  roomSelector.addEventListener('click', roomNumberSelectClickHandler);

  /**
   * Обработчик событий, по нажатии на кнопку Опубликовать - проверяет
   * соответствует ли количество мест комнатам
   */
  submitButton.addEventListener('click', function () {
    if (!syncRoomsVsGuests(roomSelector.value)) {
      capacity.setCustomValidity('Количетво гостей не совпадает с количеством комнат');
    } else {
      capacity.setCustomValidity('');
    }
  });

  /**
   * Функция-обработчик события, меняет минимальную
   * допустимую стоимость жилья в атрибуте 'Цена за ночь, руб.'
   * в зависимости от выбраного типа жилья
   */
  var flatTypeSelectClickHandler = function () {
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
  };

  /**
   * Функция которая устанавливает значение в поле ввода адреса
   */
  var findMainPinAddress = function () {
    document.querySelector('#address').value = '' + (mapPinMain.offsetTop + MAIN_MAP_PIN_FULL_HEIGHT) + ', ' + mapPinMain.offsetLeft + '';
  };

  /**
   * Функция очищающая форму от заполненых значений
   */
  var clearForm = function () {
    form.reset();
    mapFiltersForm.reset();
  };

  /**
   * Функция добавляет обработчики событий к
   * кнопке отправки данных и кнопке очистки страницы
   */
  var addHandlersToFormButtons = function () {
    form.addEventListener('submit', uploadButtonClickHandler);
    formReset.addEventListener('click', resetButtonClickHandler);
  };

  /**
   * Функция-обработчик события, отправляет данные формы
   * @param {event} evt
   */
  var uploadButtonClickHandler = function (evt) {
    window.backend.upload(new FormData(form), onSuccess, window.util.onError);
    evt.preventDefault();
  };

  /**
   * Функция-обработчик события, очищает страницу от заполненных данных
   * @param {event} evt
   */
  var resetButtonClickHandler = function (evt) {
    evt.preventDefault();
    returnsPageToInitialState();
  };

  /**
   * функция возвращает страницу в начальное состояние
   * в случае успешной отправки данных на сервер
   * @param {number} status
   */
  var onSuccess = function () {
    returnsPageToInitialState();
  };

  /**
   * функция возвращает страницу в начальное состояние
   */
  var returnsPageToInitialState = function () {
    window.map.removeAdvertPins();
    clearForm();
    removePreviewImages();
    window.map.returnsMapInitialState();
  };

  /**
   * функция восстанавливает поля загрузки изображений в исходное состояние
   */
  var removePreviewImages = function () {
    document.querySelector('.notice__preview img').src = 'img/muffin.png';
    document.querySelectorAll('div.form__photo').forEach(function (item) {
      item.remove();
    });
  };

  var fileChooserAvatar = document.querySelector('#avatar');
  var fileChooserImages = document.querySelector('#images');
  var preview = document.querySelector('.notice__preview img');
  var photoContainer = document.querySelector('fieldset:nth-last-child(2)');
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var uploadOneFile = function (file, previewImageField) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewImageField.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var druggOverDropZoneHandler = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
  };

  fileChooserAvatar.addEventListener('change', function () {
    uploadOneFile(fileChooserAvatar.files[0], preview);
  });

  var dropZone = document.querySelector('.drop-zone');
  dropZone.addEventListener('dragover', druggOverDropZoneHandler);
  dropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();
    uploadOneFile(evt.dataTransfer.files[0], preview);
  });


  var uploadMultipleFiles = function (files, previewImageField) {
    var matches = [].every.call(files, function (file) {
      var fileName = file.name.toLowerCase();
      return FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });
    });

    if (matches) {
      [].forEach.call(files, function (item) {
        var reader = new FileReader();
        var formPhoto = document.createElement('div');
        formPhoto.classList.add('form__photo');
        formPhoto.style = 'display: inline-block';
        formPhoto.draggable = true;
        var photo = document.createElement('img');
        photo.height = 70;
        photo.title = item.name;
        formPhoto.appendChild(photo);
        previewImageField.appendChild(formPhoto);
        reader.addEventListener('load', function (evt) {
          photo.src = evt.target.result;
        });
        reader.readAsDataURL(item);
      });
    }
  };

  fileChooserImages.addEventListener('change', function () {
    uploadMultipleFiles(fileChooserImages.files, photoContainer);
  });

  window.form = {
    roomNumberSelectClickHandler: roomNumberSelectClickHandler,
    findMainPinAddress: findMainPinAddress,
    flatTypeSelectClickHandler: flatTypeSelectClickHandler,
    upload: addHandlersToFormButtons
  };
})();
