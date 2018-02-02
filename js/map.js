'use strict';

var ADVERTS_COUNT = 8;
var AVATAR_COUNT = 8;
var headers = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var typesOfFlat = ['flat', 'house', 'bungalo'];
var checkinTimes = ['12:00', '13:00', '14:00'];
var checkoutTimes = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var images = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var generateRandomArrayValue = function (array) {
  var randomNumber = generateRandomNumber(0, array.length);
  var randomArrayValue = array[randomNumber];
  return randomArrayValue;
};

var generateRandomNonRepeatableArrayValue = function (array) {
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
  var numberOfArrayItems = generateRandomNumber(1, array.length + 1);
  var randomItemNumber = generateRandomNumber(0, array.length - numberOfArrayItems);
  for (var i = 0; i < numberOfArrayItems; i++) {
    newArray[i] = array[randomItemNumber + i];
  }
  return newArray;
};

var avatarImages = [];
for (var l = 0; l < AVATAR_COUNT; l++) {
  avatarImages[l] = l + 1;
}

var generateAdvertObject = function () {
  var newAdvertObject = {
    'author': {
      'avatar': 'img/avatars/user0' + generateRandomNonRepeatableArrayValue(avatarImages) + '.png'
    },

    'offer': {
      'title': generateRandomNonRepeatableArrayValue(headers),
      'address': '{{location.x}}, {{location.y}}',
      'price': generateRandomNumber(1000, 1000000),
      'type': generateRandomArrayValue(typesOfFlat),
      'rooms': generateRandomNumber(1, 5),
      'guests': generateRandomNumber(2, 10),
      'checkin': generateRandomArrayValue(checkinTimes),
      'checkout': generateRandomArrayValue(checkoutTimes),
      'features': generateArrayWithRandomLenght(features),
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

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var templateOfLabel = document.querySelector('template').content.querySelector('article + button');
var renderAdvertLabel = function (advert) {
  var newAdvert = templateOfLabel.cloneNode(true);
  newAdvert.style.left = advert.location.x + 'px';
  newAdvert.style.top = advert.location.y + 'px';
  newAdvert.querySelector('img').src = advert.author.avatar;
  return newAdvert;
};

var fragmentFilling = function (advertsArray, renderFunction) {
  var fragment = document.createDocumentFragment();
  for (var k = 0; k < advertsArray.length; k++) {
    fragment.appendChild(renderFunction(advertsArray[k]));
  }
  return fragment;
};

var mapPins = document.querySelector('.map__pins');
mapPins.appendChild(fragmentFilling(adverts, renderAdvertLabel));

var cardTemplate = document.querySelector('template').content.querySelector('article.map__card');
var renderAdvertCard = function (advert) {
  var newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('h3').textContent = advert.offer.title;
  newCard.querySelector('p small').textContent = advert.location.x + ', ' + advert.location.y;
  newCard.querySelector('.popup__price').textContent = advert.offer.price + ' \u20BD/ночь';

  if (advert.offer.type === 'flat') {
    newCard.querySelector('h4').textContent = 'Квартира';
  } else if (advert.offer.type === 'house') {
    newCard.querySelector('h4').textContent = 'Дом';
  } else {
    newCard.querySelector('h4').textContent = 'Бунгало';
  }

  newCard.querySelector('h4 + p').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  newCard.querySelector('h4 + p + p').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
  var popupFatures = newCard.querySelector('.popup__features');
  popupFatures.textContent = '';

  for (var m = 0; m < advert.offer.features.length; m++) {
    var newFeature = cardTemplate.querySelector('.feature--wifi').cloneNode(true);
    newFeature.classList.remove('feature--wifi');
    newFeature.classList.add('feature--' + advert.offer.features[m]);
    popupFatures.appendChild(newFeature);
  }

  newCard.querySelector('ul.popup__features + p').textContent = advert.offer.description;
  var popupPictures = newCard.querySelector('ul.popup__pictures');
  popupPictures.textContent = '';

  for (var n = 0; n < advert.offer.photos.length; n++) {
    var newImage = cardTemplate.querySelector('ul.popup__pictures li img').cloneNode(true);
    newImage.src = advert.offer.photos[n];
    newImage.height = 90;
    popupPictures.appendChild(newImage);
  }

  newCard.querySelector('img.popup__avatar').src = advert.author.avatar;
  return newCard;
};

var mapPopup = document.querySelector('section.map');
var referenceElement = document.querySelector('div.map__filters-container');
mapPopup.insertBefore(fragmentFilling(adverts, renderAdvertCard), referenceElement);
