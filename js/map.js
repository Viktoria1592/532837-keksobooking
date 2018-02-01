'use strict';

var SIMILAR_ADVERTS_COUNT = 8;
var headers = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var typesOfFlat = ['flat', 'house', 'bungalo'];
var checkinTimes = ['12:00', '13:00', '14:00'];
var checkoutTimes = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
var images = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg'];


var generateRandomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var generateRandomArrayValue = function (array) {
  var randomNumber = generateRandomNumber();
  var randomArrayValue = array[randomNumber];
  array.splice(randomNumber, 1);
  return randomArrayValue;
};

var shuffleArray = function (array) {
  for (var i = 0; i < array.length; i++) {
    var randomNumber = generateRandomNumber(0, array.length);
    var temp = array[i];
    array[i] = array[randomNumber];
    array[randomNumber] = temp;
  }
};

var generateArrayWithRandomLenght = function (array) {
  var newArray;
  var numberOfArrayItems = generateRandomNumber(1, array.length);
  for (var i = 0; i<numberOfArrayItems; i++){
    var randomItemNumber = generateRandomNumber(0, numberOfArrayItems);
    newArray[i] = array[randomItemNumber];
  }
  return newArray;
};

var generateAdvertObject = function () {
  var newAdvertObject = {
    'author': {
      'avatar': 'img/avatars/user{{0' + generateRandomNumber(1, 8) + '}}.png'
    },

    'offer': {
      'title': generateRandomArrayValue(headers),
      'address': '{{' + location.x + '}}, {{' + location.y + '}}',
      'price': generateRandomNumber(1000, 1000000),
      'type': generateRandomArrayValue(typesOfFlat),
      'rooms': generateRandomNumber(1, 5),
      'guests': generateRandomNumber(2, 10),
      'checkin': generateRandomArrayValue(checkinTimes),
      'checkout': generateRandomArrayValue(checkoutTimes),
      'features': generateArrayWithRandomLenght(shuffleArray(featuresList)),
      'description': '',
      'photos': shuffleArray(images),
    },

    'locatin': {
      'x': generateRandomNumber(300, 900),
      'y': generateRandomNumber(150, 500)
    }
  };
};

var mapFaded = document.querySelector('.map');
mapFaded.classList.remove('map--faded');


