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
    var priceLowValue = housingPriceFilter[housingPrice.value][0];
    var priceHighValue = housingPriceFilter[housingPrice.value][1];
    var typeValue = housingType.value;
    var roomsVale = parseInt(housingRooms.value, 10);
    var roomsValue = housingRooms.value;
    var housingValue = housingGuests.value;
    var itemGuests = item.offer.guests;
    var itemType = item.offer.type;
    var itemPrice = item.offer.price;
    var itemRooms = item.offer.rooms;
    var itemFeatures = item.offer.features;
    var state = true;

    if (typeValue !== itemType && typeValue !== 'any') {
      return false;
    }
    if (priceLowValue >= itemPrice || priceHighValue < itemPrice) {
      return false;
    }
    if (roomsVale !== itemRooms && roomsValue !== 'any') {
      return false;
    }
    if (roomsVale !== itemGuests && housingValue !== 'any') {
      return false;
    }

    for (var i = 0; i < housingFeatures.length; i++) {
      if (housingFeatures[i].checked && !itemFeatures.includes(housingFeatures[i].value)) {
        state = false;
      }
    }

    return state;
  };

  window.similar = {
    checkAccordance: checkAccordance
  };
})();
