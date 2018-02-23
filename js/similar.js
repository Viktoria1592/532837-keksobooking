'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('#housing-features input');

  var mapFilters = {
    'housing-price': {
      'any': [0, 100000000000000000],
      'middle': [10000, 50000],
      'low': [0, 10000],
      'high': [50000, 100000000000000000]
    }
  };

  /**
   * Функция проверяет соответствует ли переданый объект фильтру карты
   * @param  {object}  item объект объявления
   * @return {boolean} true в случае соответствия фильтру, false в обратном случае
   */
  var checkAccordance = function (item) {
    var counter = 0;
    if (housingType.value === item.offer.type || housingType.value === 'any') {
      counter++;
    }
    if (mapFilters[housingPrice.id][housingPrice.value][0] <= item.offer.price && mapFilters[housingPrice.id][housingPrice.value][1] >= item.offer.price) {
      counter++;
    }
    if (parseInt(housingRooms.value, 10) === parseInt(item.offer.rooms, 10) || housingRooms.value === 'any') {
      counter++;
    }
    if (parseInt(housingGuests.value, 10) === parseInt(item.offer.guests, 10) || housingGuests.value === 'any') {
      counter++;
    }

    housingFeatures.forEach(function (element) {
      if (element.checked) {
        if (item.offer.features.includes(element.value)) {
          counter++;
        } else {
          counter -= counter;
        }
      } else {
        counter++;
      }
    });
    if (counter === 10) {
      return true;
    } else {
      return false;
    }
  };

  window.similar = {
    checkAccordance: checkAccordance
  };
})();
