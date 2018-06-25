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

  // функция открытия подробной информации о предложении по нажатию на одну из меток
  function pinClickHandler(evt) {
    var pin = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (pin) {
      var currentIndex = parseInt(pin.dataset.id, 10);
      window.offer.deleteOfferFromDom();
      var currentOffer = window.offer.makeOffer(window.data.mapOffers[currentIndex]);
      window.utils.insertIntoDom(map, currentOffer);
      window.offer.addOfferCloseEvtListeners();
    }
  }
  mapPinsContainer.addEventListener('click', pinClickHandler);

  window.main = {
    getPinsContainer: getPinsContainer,
    isMapFaded: isMapFaded,
    setMapEnabled: setMapEnabled,
    setMapDisabled: setMapDisabled
  };
})();

