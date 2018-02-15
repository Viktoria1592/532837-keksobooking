'use strict';

window.pin = (function () {
  var templateOfLabel = document.querySelector('template').content.querySelector('article + button');

  return {
    /**
     * Функция заполняющая положение метки на карте
     * и изображение аватара пользователя в ней
     * @param   {object} advert            объект с данными об объявлении
     * @param   {number} uniqueIDNumber уникальное число объекта, передается в класс
     * @return  {Node}                     DOM-элемент метки
     */
    renderAdvertLabel: function (advert, uniqueIDNumber) {
      var newAdvert = templateOfLabel.cloneNode(true);
      newAdvert.style.left = advert.location.x + 'px';
      newAdvert.style.top = advert.location.y + 'px';
      newAdvert.querySelector('img').src = advert.author.avatar;
      newAdvert.dataset.id = uniqueIDNumber;
      return newAdvert;
    },

    /**
     * Функция добавляет готовые метки объявлений в DocumentFragment
     * @param  {array}    advertsArray     массив с объектами объявлений
     * @param  {function} renderFunction   функция заполняющая шаблон данными из advertsArray
     * @return {Node}                      DOM элемент с метками
     */
    fragmentFilling: function (advertsArray, renderFunction) {
      var fragment = document.createDocumentFragment();
      for (var k = 0; k < advertsArray.length; k++) {
        fragment.appendChild(renderFunction(advertsArray[k], k));
      }
      return fragment;
    }
  };
})();
