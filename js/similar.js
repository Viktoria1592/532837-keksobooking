'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelectorAll('#housing-features input');

  var housingPriceFilter = {
    'any': [0, 100000000000000000],
    'middle': [10000, 50000],
    'low': [0, 10000],
    'high': [50000, 100000000000000000]
  };

  /**
   * Функция проверяет соответствует ли переданый объект фильтру карты
   * @param  {object}  item объект объявления
   * @return {boolean} true в случае соответствия фильтру, false в обратном случае
   */
  var checkAccordance = function (item) {
    var state = true;
    if (housingType.value !== item.offer.type && housingType.value !== 'any') {
      return false;
    }
    if (housingPriceFilter[housingPrice.value][0] >= item.offer.price || housingPriceFilter[housingPrice.value][1] < item.offer.price) {
      return false;
    }
    if (parseInt(housingRooms.value, 10) !== parseInt(item.offer.rooms, 10) && housingRooms.value !== 'any') {
      return false;
    }
    if (parseInt(housingGuests.value, 10) !== parseInt(item.offer.guests, 10) && housingGuests.value !== 'any') {
      return false;
    }

    for (var i = 0; i < housingFeatures.length; i++) {
      if (housingFeatures[i].checked && !item.offer.features.includes(housingFeatures[i].value)) {
        state = false;
      }
    }

    return state;
  };

  window.similar = {
    checkAccordance: checkAccordance
  };
})();
