'use strict';

(function () {
  var map = document.querySelector('.map');
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

  // функция удаления указателей
  function deletePins() {
    var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    var i = 0;
    while (i < pins.length) {
      pins[i].remove();
      i++;
    }
  }

  window.main = {
    isMapFaded: isMapFaded,
    setMapEnabled: setMapEnabled,
    setMapDisabled: setMapDisabled,
    deletePins: deletePins
  };
})();

