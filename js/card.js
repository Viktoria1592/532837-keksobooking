'use strict';

(function () {
  var FLAT_IMAGES_HEIGHT = 50;
  var FLAT_IMAGES_WIDTH = 50;
  var MAP_PIN_FULL_HEIGHT = 70;
  var MAP_PIN_FULL_WIDTH = 50;
  var cardTemplate = document.querySelector('template').content.querySelector('article.map__card');

  /**
   * Функция заполняющая особенности жилья в карточку обьявления
   * (в случае отсутствия особенностей - удаляет блок .popup__features)
   * @param {object} advertObject  объект с данными объявления
   * @param {node}   сardTemplate  шаблон, DOM-элемент с карточкой обьявления
   */
  var addAdvertFeatures = function (advertObject, сardTemplate) {
    var popupFatures = сardTemplate.querySelector('.popup__features');
    popupFatures.textContent = '';

    if (advertObject.offer.features.length === 0) {
      popupFatures.remove();
    } else {
      for (var m = 0; m < advertObject.offer.features.length; m++) {
        var newFeature = cardTemplate.querySelector('.feature--wifi').cloneNode(true);
        newFeature.classList.remove('feature--wifi');
        newFeature.classList.add('feature--' + advertObject.offer.features[m]);
        popupFatures.appendChild(newFeature);
      }
    }
  };

  /**
   * Функция заполняющая изображения жилья в карточку обьявления
   * (в случае отсутствия изображений - удаляет блок .popup__pictures)
   * @param {object} advertObject  объект с данными объявления
   * @param {node}   сardTemplate  шаблон, DOM-элемент с карточкой обьявления
   */
  var addAdvertImages = function (advertObject, сardTemplate) {
    var popupPictures = сardTemplate.querySelector('ul.popup__pictures');
    popupPictures.textContent = '';

    if (advertObject.offer.photos.length === 0) {
      popupPictures.remove();
    } else {
      for (var n = 0; n < advertObject.offer.photos.length; n++) {
        var newImage = cardTemplate.querySelector('ul.popup__pictures li img').cloneNode(true);
        newImage.src = advertObject.offer.photos[n];
        newImage.height = FLAT_IMAGES_HEIGHT;
        newImage.width = FLAT_IMAGES_WIDTH;
        popupPictures.appendChild(newImage);
      }
    }
  };

  var typeLabels = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };

    /**
     * добавляет готовую карточку объявления в DocumentFragment
     * @param   {array}    advertsArray   массив с объектами объявлений
     * @param   {function} renderFunction функция заполняющая шаблон данными из advertsArray
     * @param   {number}   elementId      ID карточки
     * @return  {Node}                    DOM элемент с карточкой
     */
  var addCardToMap = function (advertsArray, renderFunction, elementId) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(renderFunction(advertsArray[elementId], elementId));
    return fragment;
  };

    /**
     * Функция заполняющая шаблон карточки объявления деталями
     * @param  {object} advert          объект с данными об объявлении
     * @param  {number} uniqueIDNumber  уникальное число объекта, передается в класс
     * @return {Node}                   DOM-элемент объявления
     */
  var renderAdvertCard = function (advert, uniqueIDNumber) {
    var newCard = cardTemplate.cloneNode(true);

    newCard.querySelector('h3').textContent = advert.offer.title;
    newCard.querySelector('p small').textContent = advert.location.x + (MAP_PIN_FULL_WIDTH / 2) + ', ' + (advert.location.y + MAP_PIN_FULL_HEIGHT) + '';
    newCard.querySelector('.popup__price').textContent = advert.offer.price + ' \u20BD/ночь';
    newCard.querySelector('h4').textContent = typeLabels[advert.offer.type];
    newCard.querySelector('h4 + p').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    newCard.querySelector('h4 + p + p').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    newCard.querySelector('p:last-of-type').textContent = advert.offer.description;
    newCard.querySelector('img.popup__avatar').src = advert.author.avatar;
    newCard.querySelector('button.popup__close').tabIndex = 0;

    addAdvertFeatures(advert, newCard);
    addAdvertImages(advert, newCard);
    newCard.dataset.id = uniqueIDNumber;

    return newCard;
  };

  window.card = {
    renderAdvert: renderAdvertCard,
    addToMap: addCardToMap
  };
})();
