'use strict';

var ADVERTS_COUNT = 8;
var headers = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var typesOfFlat = ['flat', 'house', 'bungalo'];
var checkinTimes = ['12:00', '13:00', '14:00'];
var checkoutTimes = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var images = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var FLAT_IMAGES_HEIGHT = 70;
var FLAT_IMAGES_WIDTH = 70;
var TOP_Y_BORDER = 150;
var BOTTOM_Y_BORDER = 500;
var LEFT_X_BORDER = 300;
var RIGHT_X_BORDER = 900;
var MIN_FLAT_PRISE = 1000;
var MAX_FLAT_PRISE = 1000000;
var MIN_ROOM_QUANTITY = 1;
var MAX_ROOM_QUANTITY = 5;
var MIN_GUESTS_QUANTITY = 2;
var MAX_GUESTS_QUANTITY = 5;
var MAP_PIN_FULL_HEIGHT = 70;
var MAP_PIN_FULL_WIDTH = 50;
var MAIN_MAP_PIN_FULL_HEIGHT = 82;
var MAIN_MAP_PIN_FULL_WIDTH = 62;
var ENTER_KEYCODE = 13;


/**
 * Функция генерирующая случайное значение
 * в диапазоне от min до max
 * @param  {number} min Минимальное значение
 * @param  {number} max Максимальное значение
 * @return {number}
 */
var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Функция генерирующая случайное значение из переданного массива
 * @param  {array} array
 * @return {number}     случайное значение из массива
 */
var generateRandomArrayValue = function (array) {
  var randomNumber = generateRandomNumber(0, array.length);
  return array[randomNumber];
};

/**
 * Функция генерирующая случайное значение из переданного массива
 * (из переданного в функцию массива удаляется возвращаемое значение)
 * @param  {array} array
 * @return {number}      случайное значение из массива
 */
var generateRandomNonRepeatableArrayValue = function (array) {
  var randomNumber = generateRandomNumber(0, array.length);
  var randomArrayValue = array[randomNumber];
  array.splice(randomNumber, 1);
  return randomArrayValue;
};

/**
 * Функция перемешивания данных внутри массива
 * @param  {array} array
 * @return {array}      перемешанный массив
 */
var shuffleArray = function (array) {
  for (var i = 0; i < array.length; i++) {
    var randomNumber = generateRandomNumber(0, array.length);
    var temp = array[i];
    array[i] = array[randomNumber];
    array[randomNumber] = temp;
  }
  return array;
};

/**
 * Функция генерации массива случайной длинны, из переданого в функцию
 * (длинна возвращаемого массива не длиннее переданого)
 * @param  {array} array
 * @return {array}       массив случайной длинны (не длиннее чем переданый)
 */
var generateArrayWithRandomLenght = function (array) {
  var newArray = [];
  var numberOfArrayItems = generateRandomNumber(1, array.length + 1);
  var randomItemNumber = generateRandomNumber(0, array.length - numberOfArrayItems);
  for (var i = 0; i < numberOfArrayItems; i++) {
    newArray[i] = array[randomItemNumber + i];
  }
  return newArray;
};

/**
 * Функция генерации объекта с данными о объявлении
 * @param  {number} step номер изображения автора
 * @return {object}      объект с данными объявления
 */
var generateAdvertObject = function (step) {
  var location = {
    'x': generateRandomNumber(LEFT_X_BORDER, RIGHT_X_BORDER),
    'y': generateRandomNumber(TOP_Y_BORDER, BOTTOM_Y_BORDER)
  };

  var newAdvertObject = {
    'author': {
      'avatar': 'img/avatars/user0' + (step + 1) + '.png'
    },

    'offer': {
      'title': generateRandomNonRepeatableArrayValue(headers),
      'address': location.x + ', ' + location.y,
      'price': generateRandomNumber(MIN_FLAT_PRISE, MAX_FLAT_PRISE),
      'type': generateRandomArrayValue(typesOfFlat),
      'rooms': generateRandomNumber(MIN_ROOM_QUANTITY, MAX_ROOM_QUANTITY),
      'guests': generateRandomNumber(MIN_GUESTS_QUANTITY, MAX_GUESTS_QUANTITY),
      'checkin': generateRandomArrayValue(checkinTimes),
      'checkout': generateRandomArrayValue(checkoutTimes),
      'features': generateArrayWithRandomLenght(features),
      'description': '',
      'photos': shuffleArray(images)
    },

    'location': {
      'x': location.x,
      'y': location.y
    }
  };
  return newAdvertObject;
};

/**
 * Функция заполняющая особенности жилья в карточку обьявления
 * @param {object} advertObject  объект с данными объявления
 * @param {node}   сardTemplate  шаблон, DOM-элемент с карточкой обьявления
 */
var addingAdvertFeatures = function (advertObject, сardTemplate) {
  var popupFatures = сardTemplate.querySelector('.popup__features');
  popupFatures.textContent = '';

  for (var m = 0; m < advertObject.offer.features.length; m++) {
    var newFeature = cardTemplate.querySelector('.feature--wifi').cloneNode(true);
    newFeature.classList.remove('feature--wifi');
    newFeature.classList.add('feature--' + advertObject.offer.features[m]);
    popupFatures.appendChild(newFeature);
  }
};

/**
 * Функция заполняющая изображения жилья в карточку обьявления
 * @param {object} advertObject  объект с данными объявления
 * @param {node}   сardTemplate  шаблон, DOM-элемент с карточкой обьявления
 */
var addingAdvertImages = function (advertObject, сardTemplate) {
  var popupPictures = сardTemplate.querySelector('ul.popup__pictures');
  popupPictures.textContent = '';

  for (var n = 0; n < advertObject.offer.photos.length; n++) {
    var newImage = cardTemplate.querySelector('ul.popup__pictures li img').cloneNode(true);
    newImage.src = advertObject.offer.photos[n];
    newImage.height = FLAT_IMAGES_HEIGHT;
    newImage.width = FLAT_IMAGES_WIDTH;
    popupPictures.appendChild(newImage);
  }
};

var adverts = [];
for (var i = 0; i < ADVERTS_COUNT; i++) {
  adverts[i] = generateAdvertObject(i);
}

var templateOfLabel = document.querySelector('template').content.querySelector('article + button');

/**
 * Функция заполняющая положение метки на карте
 * и изображение аватара пользователя в ней
 * @param   {object} advert            объект с данными об объявлении
 * @param   {number} uniqueIDNumber уникальное число объекта, передается в класс
 * @return  {Node}                     DOM-элемент метки
 */
var renderAdvertLabel = function (advert, uniqueIDNumber) {
  var newAdvert = templateOfLabel.cloneNode(true);
  newAdvert.style.left = advert.location.x + 'px';
  newAdvert.style.top = advert.location.y + 'px';
  newAdvert.querySelector('img').src = advert.author.avatar;
  // newAdvert.classList.add(uniqueIDNumber);
  newAdvert.dataset.id = uniqueIDNumber;
  return newAdvert;
};

/**
 * Функция добавляет готовые метки объявлений в DocumentFragment
 * @param  {array}    advertsArray     массив с объектами объявлений
 * @param  {function} renderFunction   функция заполняющая шаблон данными из advertsArray
 * @return {Node}                      DOM элемент с метками
 */
var fragmentFilling = function (advertsArray, renderFunction) {
  var fragment = document.createDocumentFragment();
  for (var k = 0; k < advertsArray.length; k++) {
    fragment.appendChild(renderFunction(advertsArray[k], k));
  }
  return fragment;
};

/**
 * добавляет готовую карточку объявления в DocumentFragment
 * @param   {array}    advertsArray   массив с объектами объявлений
 * @param   {function} renderFunction функция заполняющая шаблон данными из advertsArray
 * @param   {number}    elementId     ID карточки
 * @return {Node}                    DOM элемент с карточкой
 */
var addCardToMap = function (advertsArray, renderFunction, elementId) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(renderFunction(advertsArray[elementId], elementId));
  return fragment;
};

var typeLabels = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом'
};

var cardTemplate = document.querySelector('template').content.querySelector('article.map__card');

/**
 * Функция заполняющая шаблон карточки объявления деталями
 * @param  {object} advert            объект с данными об объявлении
 * @param  {number} uniqueIDNumber уникальное число объекта, передается в класс
 * @return {Node}                     DOM-элемент объявления
 */
var renderAdvertCard = function (advert, uniqueIDNumber) {
  var newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('h3').textContent = advert.offer.title;
  newCard.querySelector('p small').textContent = advert.location.x + (MAP_PIN_FULL_WIDTH / 2) + ', ' + (advert.location.y + MAP_PIN_FULL_HEIGHT) + '';
  newCard.querySelector('.popup__price').textContent = advert.offer.price + ' \u20BD/ночь';
  newCard.querySelector('h4').textContent = typeLabels[advert.offer.type];
  newCard.querySelector('h4 + p').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  newCard.querySelector('h4 + p + p').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
  addingAdvertFeatures(advert, newCard);
  newCard.querySelector('ul.popup__features + p').textContent = advert.offer.description;
  addingAdvertImages(advert, newCard);
  newCard.querySelector('img.popup__avatar').src = advert.author.avatar;
  // newCard.classList.add(uniqueIDNumber);
  newCard.dataset.id = uniqueIDNumber;

  newCard.querySelector('button.popup__close').tabIndex = 0;

  return newCard;
};

var mapPopup = document.querySelector('section.map');
var referenceElement = document.querySelector('div.map__filters-container');

/**
 * Функция которая устанавливает значение в поле ввода адреса
 */
var findMainPinAdress = function () {
  var mapPinMain = document.querySelector('button.map__pin--main');
  document.querySelector('#address').value = '' + (mapPinMain.offsetTop + (MAIN_MAP_PIN_FULL_HEIGHT / 2)) + ', ' + (mapPinMain.offsetLeft + (MAIN_MAP_PIN_FULL_WIDTH / 2)) + '';
};

/**
 * Функция возвращает страницу в её начальное состояние
 * (неактивны поля форм и заблокирована карта)
 */
var returnPageToInitialState = function () {
  var noticeForm = document.querySelector('.notice__form');
  noticeForm.classList.add('notice__form--disabled');
  var noticeFormFieldsets = (noticeForm.querySelectorAll('fieldset'));

  for (var n = 0; n < noticeFormFieldsets.length; n++) {
    noticeFormFieldsets[n].disabled = true;
  }

  document.querySelector('.map').classList.add('map--faded');
  var mapPinMain = document.querySelector('button.map__pin--main');
  document.querySelector('#address').value = '' + (mapPinMain.offsetTop + (mapPinMain.offsetHeight / 2)) + ', ' + (mapPinMain.offsetLeft + (mapPinMain.offsetWidth / 2)) + '';
};

/**
 * Функция делает страницу активной для заполнения и просмотра
 * (активны поля форм и карта)
 */
var makePageActive = function () {
  var noticeForm = document.querySelector('.notice__form');
  noticeForm.classList.remove('notice__form--disabled');
  var noticeFormFieldsets = (noticeForm.querySelectorAll('fieldset'));

  for (var n = 0; n < noticeFormFieldsets.length; n++) {
    noticeFormFieldsets[n].disabled = false;
  }

  document.querySelector('.map').classList.remove('map--faded');
  var mapPins = document.querySelector('.map__pins');
  mapPins.appendChild(fragmentFilling(adverts, renderAdvertLabel));
  var flatTypeInput = document.querySelector('#type');
  flatTypeInput.addEventListener('click', flatTypeSelectClickHandler);
};

returnPageToInitialState();

var mapPinMain = document.querySelector('.map__pin--main');

/**
 * Функция-обработчик события, по клику на главную метку делает страницу активной и заполняет адресс
 */
var mainPinClickHandler = function () {
  makePageActive();
  findMainPinAdress();
  roomNumberSelectClickHandler();

  var similarAdvertPins = document.querySelectorAll('.map__pins button:not(.map__pin--main)');
  for (var p = 0; p < similarAdvertPins.length; p++) {
    var advertPin = similarAdvertPins[p];
    addHandlerPin(advertPin);
  }
};

mapPinMain.addEventListener('click', mainPinClickHandler);

/**
 * Функция добавляет обработчик события к переданному в нее объекту метки
 * @param {object} advertPin  DOM объект метки
 */
var addHandlerPin = function (advertPin) {
  advertPin.addEventListener('click', buttonClickHandler);
};

/**
 * Функция-обработчик события, удаляет класс hiden у объекта карточки
 * объявления и добавляет обработчик события для закрытия карточки.
 * Также перед открытием следующих карточек - проверяет есть ли открытые и закрывает их.
 * @param {object} evt объект event
 */
var buttonClickHandler = function (evt) {
  closeOpenedCards();
  var evtImgClick = evt.path[1].dataset.id;
  var evtBorderClick = evt.path[0].dataset.id;
  if (evt.path[0].tagName === 'IMG') {
    mapPopup.insertBefore(addCardToMap(adverts, renderAdvertCard, evtImgClick), referenceElement);
    addHandlerToAdvertCard(document.querySelector('article.map__card'));
  } else {
    mapPopup.insertBefore(addCardToMap(adverts, renderAdvertCard, evtBorderClick), referenceElement);
    addHandlerToAdvertCard(document.querySelector('article.map__card'));
  }
};

/**
 * Функция удаляющая карточку объявления с карты
 */
var closeOpenedCards = function () {
  if (mapPopup.contains(document.querySelector('article.map__card'))) {
    mapPopup.removeChild(document.querySelector('article.map__card'));
  }
};

/**
 * Функция добавляющая два обработчика события на кнопку закрытия карточки объявления
 * (по нажатии кнопки Enter и клике на кнопку закрытия)
 * @param {object} advertCard обьет карточки объявления, к которой добавляем обрабочик
 */
var addHandlerToAdvertCard = function (advertCard) {
  advertCard.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      advertCard.classList.add('hidden');
      advertCard.removeEventListener('keydown', buttonClickHandler);
    }
  });

  advertCard.querySelector('button.popup__close').addEventListener('click', function () {
    advertCard.classList.add('hidden');
    advertCard.removeEventListener('click', buttonClickHandler);
  });
};

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
 * @return {boolean} в случае если выбран пункт в "Кол-во комнат" совпадающий с "Количество мест" - возвращает true
 */
var synchronizeRoomsAndContents = function () {
  var roomNumbers = {
    '1': '1',
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': '0'
  };

  var capacityObjects = document.querySelectorAll('#capacity option');
  var capacity = document.querySelector('#capacity');
  var correctValue = false;
  for (var w = 0; w < capacityObjects.length; w++) {
    capacityObjects[w].disabled = true;
  }

  if (roomNumbers[roomNumberObject.value].length > 1) {
    for (var u = 0; u < capacityObjects.length; u++) {
      for (var v = 0; v < roomNumbers[roomNumberObject.value].length; v++) {
        if (capacityObjects[u].value === roomNumbers[roomNumberObject.value][v]) {
          capacityObjects[u].disabled = false;
          if (capacityObjects[u].value === capacity.value) {
            correctValue = true;
          }
        }
      }
    }
  } else {
    for (var x = 0; x < capacityObjects.length; x++) {
      if (capacityObjects[x].value === roomNumbers[roomNumberObject.value]) {
        capacityObjects[x].disabled = false;
        if (capacityObjects[x].value === capacity.value) {
          correctValue = true;
        }
      }
    }
  }
  return correctValue;
};
var roomNumberObject = document.querySelector('#room_number');

/**
 * Обработчик события для синхронизации Кол-ва комнат и кол-ва мест
 */
var roomNumberSelectClickHandler = function () {
  synchronizeRoomsAndContents();
};

roomNumberObject.addEventListener('click', roomNumberSelectClickHandler);

var submitButton = document.querySelector('button.form__submit');

/**
 * Обработчик событий, по нажатии на кнопку Опубликовать - проверяет
 * соответствует ли количество мест комнатам
 */
submitButton.addEventListener('click', function () {
  var capacity = document.querySelector('#capacity');
  if (!synchronizeRoomsAndContents()) {
    capacity.setCustomValidity('Количетво гостей не совпадает с количеством комнат');
  } else {
    capacity.setCustomValidity('');
  }
});
