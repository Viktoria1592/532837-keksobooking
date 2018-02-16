'use strict';

(function () {
  var LEFT_X_BORDER = 300;
  var RIGHT_X_BORDER = 900;
  var TOP_Y_BORDER = 150;
  var BOTTOM_Y_BORDER = 500;
  var headers = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var MIN_FLAT_PRISE = 1000;
  var MAX_FLAT_PRISE = 1000000;
  var MIN_ROOM_QUANTITY = 1;
  var MAX_ROOM_QUANTITY = 5;
  var MIN_GUESTS_QUANTITY = 2;
  var MAX_GUESTS_QUANTITY = 5;
  var typesOfFlat = ['flat', 'house', 'bungalo'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var checkInTimes = ['12:00', '13:00', '14:00'];
  var checkOutTimes = ['12:00', '13:00', '14:00'];
  var images = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var ADVERTS_COUNT = 8;

  // /**
  //  * Функция генерации объекта с данными о объявлении
  //  * @param  {number} step номер изображения автора
  //  * @return {object}      объект с данными объявления
  //  */
  // var generateAdvertObject = function (step) {
  //   var location = {
  //     'x': window.util.generateRandomNumber(LEFT_X_BORDER, RIGHT_X_BORDER),
  //     'y': window.util.generateRandomNumber(TOP_Y_BORDER, BOTTOM_Y_BORDER)
  //   };
  //
  //   var newAdvertObject = {
  //     'author': {
  //       'avatar': 'img/avatars/user0' + (step + 1) + '.png'
  //     },
  //
  //     'offer': {
  //       'title': window.util.generateRandomNonRepeatableArrayValue(headers),
  //       'address': location.x + ', ' + location.y,
  //       'price': window.util.generateRandomNumber(MIN_FLAT_PRISE, MAX_FLAT_PRISE),
  //       'type': window.util.generateRandomArrayValue(typesOfFlat),
  //       'rooms': window.util.generateRandomNumber(MIN_ROOM_QUANTITY, MAX_ROOM_QUANTITY),
  //       'guests': window.util.generateRandomNumber(MIN_GUESTS_QUANTITY, MAX_GUESTS_QUANTITY),
  //       'checkin': window.util.generateRandomArrayValue(checkInTimes),
  //       'checkout': window.util.generateRandomArrayValue(checkOutTimes),
  //       'features': window.util.generateArrayWithRandomLenght(features),
  //       'description': '',
  //       'photos': window.util.shuffleArray(images)
  //     },
  //
  //     'location': {
  //       'x': location.x,
  //       'y': location.y
  //     }
  //   };
  //   return newAdvertObject;
  // };
  //
  // var adverts = [];
  // for (var i = 0; i < ADVERTS_COUNT; i++) {
  //   adverts[i] = generateAdvertObject(i);
  // }
  var adverts;
  window.backend.downloadAdverts(function (downloadedAdverts) {
    adverts = downloadedAdverts;
  });
  window.data = {
    adverts: adverts
  };
})();
