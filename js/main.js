'use strict';

var MAIN_PIN_START_X = 570;
var MAIN_PIN_START_Y = 375;
var adForm = document.querySelector('.ad-form');
var mapPinMain = document.querySelector('.map__pin--main');

(function () {
  var map = document.querySelector('.map');
  // функция проверки состояния карты
  function isMapFaded() {
    return map.classList.contains('map--faded');
  }

  // функция назанчения координат пина
  function setMapPinMainCoords(x, y) {
    mapPinMain.style.left = x + 'px';
    mapPinMain.style.top = y + 'px';
  }

  // функция разблокировки карты
  function setMapEnabled() {
    map.classList.remove('map--faded');
    window.form.setFormEnabled();
  }

  // функция блокировки карты
  function setMapDisabled() {
    map.classList.add('map--faded');
    setMapPinMainCoords(MAIN_PIN_START_X, MAIN_PIN_START_Y);
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

  // функция возврата страницы в изначальное состояние
  function resetClickHandler() {
    deletePins();
    window.offer.closeOffer();
    adForm.reset();
    setMapDisabled();
    window.form.inputAddress();
  }

  window.page = {
    isMapFaded: isMapFaded,
    resetClickHandler: resetClickHandler,
    setMapEnabled: setMapEnabled,
    setMapPinMainCoords: setMapPinMainCoords
  };
})();

