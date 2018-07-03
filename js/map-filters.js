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
  var selects = {
    type: filterContainer.querySelector('#housing-type'),
    price: filterContainer.querySelector('#housing-price'),
    room: filterContainer.querySelector('#housing-rooms'),
    capacity: filterContainer.querySelector('#housing-guests'),
  };
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
    return object.offer.type === selects.type.value || selects.type.value === DEFAULT_FILTER_VALUE;
  }
  function findSamePrice(object) {
    return priceFilters[selects.price.value](object) || selects.price.value === DEFAULT_FILTER_VALUE;
  }
  function findSameRoomsNumbers(object) {
    return object.offer.rooms === +selects.room.value || selects.room.value === DEFAULT_FILTER_VALUE;
  }
  function findSameCapacity(object) {
    return object.offer.guests === +selects.capacity.value || selects.capacity.value === DEFAULT_FILTER_VALUE;
  }
  function findSameFeatures(object) {
    Array.from(featureCheckboxes).some(function (feature) {
      return feature.checked && object.offer.features.includes(feature.value);
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
    console.log(filteredOffers);
    window.pins.deleteAll();
    if (filteredOffers) {
      window.utils.insertIntoDom(window.map.getPinsContainer(), window.pins.makeFragment(filteredOffers));
    }
  }

  filterContainer.addEventListener('change', window.utils.debounce(updateMap));
  window.mapFilters = {
    getData: getData
  };
})();
