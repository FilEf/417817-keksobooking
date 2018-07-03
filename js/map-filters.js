'use strict';

(function () {
  var DEFAULT_FILTER_VALUE = 'any';
  var Price = {
    MIN: 10000,
    MAX: 50000
  };
  var offers = [];
  var filteredOffers = [];

  var filterContainer = document.querySelector('.map__filters');
  var houseTypeSelect = filterContainer.querySelector('#housing-type');
  var pricesSelect = filterContainer.querySelector('#housing-price');
  var roomsSelect = filterContainer.querySelector('#housing-rooms');
  var capacitySelect = filterContainer.querySelector('#housing-guests');
  var featureCheckboxes = filterContainer.querySelectorAll('.map__checkbox');

  var priceFilters = {
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
    return object.offer.type === houseTypeSelect.value || houseTypeSelect.value === DEFAULT_FILTER_VALUE;
  }
  function findSamePrice(object) {
    return priceFilters[pricesSelect.value](object);
  }
  function findSameRoomsNumbers(object) {
    return object.offer.rooms === roomsSelect.value || roomsSelect.value === DEFAULT_FILTER_VALUE;
  }
  function findSameCapacity(object) {
    return object.offer.guests === capacitySelect.value || capacitySelect.value === DEFAULT_FILTER_VALUE;
  }
  function findSameFeatures(object) {
    featureCheckboxes.forEach(function (feature) {
      return feature.checked && feature.value in object.offer.features;
    });
  }
  function getData(objects) {
    offers = objects;
  }
  function startFilter(object) {
    return (findSameHouseType(object) &&
           findSamePrice(object) &&
           findSameRoomsNumbers(object) &&
           findSameCapacity(object) &&
           findSameFeatures(object));
  }

  function applyFilter(objects) {
    filteredOffers = objects.filter(startFilter);
  }

  function updateMap() {
    applyFilter(offers);
    window.pins.deleteAll();
    window.utils.insertIntoDom(window.map.getPinsContainer(), window.pins.makeFragment(filteredOffers));
  }

  filterContainer.addEventListener('change', window.utils.debounce(updateMap));
  window.mapFilters = {
    getData: getData
  };
})();
