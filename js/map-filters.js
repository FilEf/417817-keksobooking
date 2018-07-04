'use strict';

(function () {
  var DEFAULT_FILTER_VALUE = 'any';
  var Price = {
    MIN: 10000,
    MAX: 50000
  };
  var offers = [];
  var filteredOffers = [];
  var onFilterChange = null;
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
    var priceFilter = priceFilters[selects.price.value];
    if (priceFilter) {
      return priceFilter(object);
    }
    return true;
  }
  function findSameRoomsNumbers(object) {
    return object.offer.rooms === +selects.room.value || selects.room.value === DEFAULT_FILTER_VALUE;
  }
  function findSameCapacity(object) {
    return object.offer.guests === +selects.capacity.value || selects.capacity.value === DEFAULT_FILTER_VALUE;
  }
  function findSameFeatures(object) {
    return Array.from(featureCheckboxes).every(function (feature) {
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
    return objects.filter(startFilter);
  }

  function startFilterFirstTime(objects, callback) {
    offers = objects;
    onFilterChange = callback;
    setFilter(offers, onFilterChange);
  }

  function setFilter(objects, updateMap) {
    window.card.deleteOfferFromDom();
    filteredOffers = applyFilter(objects);
    updateMap(filteredOffers);
  }

  function deleteFilter() {
    filterContainer.reset();
    filterContainer.removeEventListener('change', window.utils.debounce(function () {
      setFilter(offers, onFilterChange);
    }));
  }
  filterContainer.addEventListener('change', window.utils.debounce(function () {
    setFilter(offers, onFilterChange);
  }));
  window.mapFilters = {
    startFirstTime: startFilterFirstTime,
    delete: deleteFilter
  };
})();
