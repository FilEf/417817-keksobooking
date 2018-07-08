'use strict';

(function () {
  var PINS_NUMBER = 5;
  var DEFAULT_FILTER_VALUE = 'any';
  var Price = {
    MIN: 10000,
    MAX: 50000
  };
  var offers = [];
  var filteredOffers = [];
  var filterChangeHandler = null;
  var filterContainer = document.querySelector('.map__filters');
  var Select = {
    type: filterContainer.querySelector('#housing-type'),
    price: filterContainer.querySelector('#housing-price'),
    room: filterContainer.querySelector('#housing-rooms'),
    capacity: filterContainer.querySelector('#housing-guests')
  };
  var featureCheckboxes = Array.from(filterContainer.querySelectorAll('.map__checkbox'));

  var PriceFilter = {
    'middle': function (object) {
      return object.offer.price >= Price.MIN && object.offer.price <= Price.MAX;
    },
    'low': function (object) {
      return object.offer.price <= Price.MIN;
    },
    'high': function (object) {
      return object.offer.price >= Price.MAX;
    }
  };

  function findSameHouseType(object) {
    return object.offer.type === Select.type.value || Select.type.value === DEFAULT_FILTER_VALUE;
  }
  function findSamePrice(object) {
    var filterMethod = PriceFilter[Select.price.value];
    if (filterMethod) {
      return filterMethod(object);
    }
    return true;
  }
  function findSameRoomsNumbers(object) {
    return object.offer.rooms === +Select.room.value || Select.room.value === DEFAULT_FILTER_VALUE;
  }
  function findSameCapacity(object) {
    return object.offer.guests === +Select.capacity.value || Select.capacity.value === DEFAULT_FILTER_VALUE;
  }
  function findSameFeatures(object) {
    return featureCheckboxes.every(function (feature) {
      return ((!feature.checked) || feature.checked && object.offer.features.includes(feature.value));
    });
  }

  function startFilter(object) {
    return (findSameHouseType(object) &&
           findSamePrice(object) &&
           findSameRoomsNumbers(object) &&
           findSameCapacity(object) &&
           findSameFeatures(object));
  }

  function applyFilter(objects) {
    var resultArray = objects.filter(startFilter);
    if (resultArray.length > PINS_NUMBER) {
      return resultArray.slice(0, PINS_NUMBER);
    }
    return resultArray;
  }

  function startFilterFirstTime(objects, callback) {
    offers = objects;
    filterChangeHandler = callback;
    setFilter(offers, filterChangeHandler);
  }

  function setFilter(objects, updateMap) {
    window.card.deleteOfferFromDom();
    filteredOffers = applyFilter(objects);
    updateMap(filteredOffers);
  }

  var filterHolder = window.utils.debounce(function () {
    setFilter(offers, filterChangeHandler);
  });

  function deleteFilter() {
    filterContainer.reset();
    filterContainer.removeEventListener('change', filterHolder);
  }
  function setFilterHolder() {
    filterContainer.addEventListener('change', filterHolder);
  }

  window.mapFilters = {
    startFirstTime: startFilterFirstTime,
    delete: deleteFilter,
    setHolder: setFilterHolder
  };
})();
