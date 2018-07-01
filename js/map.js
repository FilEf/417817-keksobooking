'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinsContainer = document.querySelector('.map__pins');

  function getPinsContainer() {
    return mapPinsContainer;
  }

  // функция проверки состояния карты
  function isMapFaded() {
    return map.classList.contains('map--faded');
  }

  // функция разблокировки карты
  function setMapEnabled() {
    map.classList.remove('map--faded');
    window.form.setFormEnabled();
  }

  // функция блокировки карты
  function setMapDisabled() {
    map.classList.add('map--faded');
    window.form.setFormDisabled();
  }

  function setContainerListener(callback) {
    mapPinsContainer.addEventListener('click', callback);
  }

  function getMap() {
    return map;
  }
  window.map = {
    getPinsContainer: getPinsContainer,
    get: getMap,
    isFaded: isMapFaded,
    setEnabled: setMapEnabled,
    setDisabled: setMapDisabled,
    setContainerListener: setContainerListener
  };
})();
