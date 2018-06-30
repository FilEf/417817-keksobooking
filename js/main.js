'use strict';

(function () {
  var offers = [];

  // функция обработчик нажатия на кнопку reset
  function resetPage() {
    window.pins.deleteAll();
    window.offer.closeOffer();
    window.map.setDisabled();
    window.mainPin.setCoords();
    window.mainPin.setMouseUpListener();
  }

  // функция запуска разблокировки страницы по нажатию на главный указатель
  function xhrSuccessHandler(objects) {
    offers = objects;
    window.map.setEnabled();
    window.utils.insertIntoDom(window.map.getPinsContainer(), window.pins.makeFragment(objects));
    window.form.inputAddress(window.mainPin.getCoords());
  }

  function xhrErrorHandler(error) {
    alert(error);
  }

  function tryLoad() {
    window.backend.load(xhrSuccessHandler, xhrErrorHandler);
  }

  // функция открытия подробной информации о предложении по нажатию на одну из меток
  function pinClickHandler(evt) {
    var pin = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (pin) {
      var currentIndex = parseInt(pin.dataset.id, 10);
      window.offer.deleteOfferFromDom();
      var currentOffer = window.offer.makeOffer(offers[currentIndex]);
      window.utils.insertIntoDom(window.map.get(), currentOffer);
      window.offer.addOfferCloseEvtListeners();
    }
  }
  window.mainPin.setMouseUpCallback(tryLoad);
  window.map.setContainerListener(pinClickHandler);
  window.form.setListenerToReset(resetPage);
})();

