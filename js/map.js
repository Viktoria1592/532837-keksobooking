'use strict';

var ADVERTS_COUNT = 8;
var AVATAR_COUNT = 8;
var headers = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var typesOfFlat = ['flat', 'house', 'bungalo'];
var checkinTimes = ['12:00', '13:00', '14:00'];
var checkoutTimes = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var images = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel1.jpg'];


var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var generateRandomArrayValue = function (array) {
  var randomNumber = generateRandomNumber(0, array.length);
  var randomArrayValue = array[randomNumber];
  return randomArrayValue;
};

var generateRandomNonRepetableArrayValue = function (array) {
  var randomNumber = generateRandomNumber(0, array.length);
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
  return array;
};

var generateArrayWithRandomLenght = function (array) {
  var newArray = [];
  var numberOfArrayItems = generateRandomNumber(1, array.length);
  for (var i = 0; i < numberOfArrayItems; i++) {
    var randomItemNumber = generateRandomNumber(0, numberOfArrayItems);
    newArray[i] = array[randomItemNumber];
  }
  return newArray;
};

var generateAdvertObject = function () {
  var newAdvertObject = {
    'author': {
      'avatar': 'img/avatars/user0' + generateRandomNumber(1, AVATAR_COUNT) + '.png'
    },

    'offer': {
      'title': generateRandomNonRepetableArrayValue(headers),
      'address': '{{location.x}}, {{location.y}}',
      'price': generateRandomNumber(1000, 1000000),
      'type': generateRandomArrayValue(typesOfFlat),
      'rooms': generateRandomNumber(1, 5),
      'guests': generateRandomNumber(2, 10),
      'checkin': generateRandomArrayValue(checkinTimes),
      'checkout': generateRandomArrayValue(checkoutTimes),
      'features': generateArrayWithRandomLenght(shuffleArray(featuresList)),
      'description': '',
      'photos': shuffleArray(images)
    },

    'location': {
      'x': generateRandomNumber(300, 900),
      'y': generateRandomNumber(150, 500)
    }
  };
  return newAdvertObject;
};

var adverts = [];
for (var i = 0; i < ADVERTS_COUNT; i++) {
  adverts[i] = generateAdvertObject();
}

var mapFaded = document.querySelector('.map');
mapFaded.classList.remove('map--faded');

var label = document.querySelector('template').content.querySelectorAll('button')[1];
console.log(label);
var renderAdvert = function (advert) {
  var newAdvert = label.cloneNode(true);
  newAdvert.style.left = advert.location.x;
  newAdvert.style.top = advert.location.y;
  newAdvert.querySelector('img').src = advert.author.avatar;
  return newAdvert;
};

var fragment = document.createDocumentFragment();
for (var k = 0; k < adverts.length; k++) {
  fragment.appendChild(renderAdvert(adverts[k]));
}
var mapPins = document.querySelector('.map__pins');
mapPins.appendChild(fragment);


