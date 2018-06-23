'use strict';

var adForm = document.querySelector('.ad-form');
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
    setMapPinMainCoords(MAIN_PIN_START_X, MAIN_PIN_START_Y);
    window.form.setFormDisabled();
  }

  // функция запуска разблокировки страницы по нажатию на главный указатель
  function mainPinMouseupHandler() {
    if (isMapFaded()) {
      setMapEnabled();
      window.utils.insertIntoDom(mapPinsContainer, window.pins.makePinsFragment(mapOffers));
    }
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
  }
  window.page = {
    isMapFaded: isMapFaded,
    resetClickHandler: resetClickHandler,
    mainPinMouseupHandler: mainPinMouseupHandler
  };
})();

