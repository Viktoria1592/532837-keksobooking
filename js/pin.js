'use strict';

(function () {
  var pinTemplate = document.querySelector('template').content.querySelector('article + button');
  var quantityOfDisplayedPins = 5;

  /**
   * Функция заполняющая положение метки на карте
   * и изображение аватара пользователя в ней
   * @param   {object} advert            объект с данными об объявлении
   * @param   {number} uniqueIDNumber уникальное число объекта, передается в класс
   * @return  {Node}                     DOM-элемент метки
   */
  var renderAdvertPin = function (advert, uniqueIDNumber) {
    var newAdvert = pinTemplate.cloneNode(true);
    newAdvert.style.left = advert.location.x + 'px';
    newAdvert.style.top = advert.location.y + 'px';
    newAdvert.querySelector('img').src = advert.author.avatar;
    newAdvert.dataset.id = uniqueIDNumber;
    return newAdvert;
  };

  /**
   * Функция добавляет готовые метки объявлений в DocumentFragment
   * (количество меток не больше чем quantityOfDisplayedPins)
   * @param  {array}    advertsArray     массив с объектами объявлений
   * @param  {function} renderFunction   функция заполняющая шаблон данными из advertsArray
   * @return {Node}                      DOM элемент с метками
   */
  var fragmentFilling = function (advertsArray, renderFunction) {
    var fragment = document.createDocumentFragment();
    var showedPins = advertsArray.length >= quantityOfDisplayedPins ? quantityOfDisplayedPins : advertsArray.length;

    for (var i = 0; i < showedPins; i++) {
      fragment.appendChild(renderFunction(advertsArray[i], i));
    }
    return fragment;
  };

  window.pin = {
    fragmentFilling: fragmentFilling,
    renderAdvertPin: renderAdvertPin
  };
})();
