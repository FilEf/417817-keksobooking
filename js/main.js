'use strict';

(function () {
  var offers = [];

  // функция обработчик нажатия на кнопку reset
  function resetPage() {
    window.mapFilters.delete();
    window.pins.deleteAll();
    window.card.closeOffer();
    window.map.setDisabled();
    window.mainPin.setCoords();
    window.mainPin.setMouseUpListener();
    window.form.inputAddress(window.mainPin.getCoords());
  }

  // функция-обработчик успешной загрузки данных
  function xhrSuccessLoadHandler(objects) {
    offers = objects;
    window.map.setEnabled();
    window.mapFilters.startFirstTime(objects, function updateMap(data) {
      window.pins.deleteAll();
      window.utils.insertIntoDom(window.map.getPinsContainer(), window.pins.makeFragment(data));
      offers = data;
    });
    window.form.inputAddress(window.mainPin.getCoords());
  }

  function xhrSuccessUpLoadHandler() {
    resetPage();
    window.message.showSuccess();
  }

  function xhrErrorHandler(error) {
    window.message.showError(error);
  }

  function tryLoad() {
    window.backend.load(xhrSuccessLoadHandler, xhrErrorHandler);
  }

  // функция открытия подробной информации о предложении по нажатию на одну из меток
  function pinClickHandler(evt) {
    var pin = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (pin) {
      var currentIndex = parseInt(pin.dataset.id, 10);
      window.card.deleteOfferFromDom();
      var currentOffer = window.card.makeOffer(offers[currentIndex]);
      window.pins.setDisable();
      window.pins.setActive(pin);
      window.utils.insertIntoDom(window.map.get(), currentOffer);
      window.card.addOfferCloseEvtListeners();
    }
  }

  function formSubmitHandler(evt) {
    window.backend.upload(xhrSuccessUpLoadHandler, xhrErrorHandler, new FormData(evt.target));
  }

  window.mainPin.setMouseUpCallback(tryLoad);
  window.map.setContainerListener(pinClickHandler);
  window.form.setListenerToReset(resetPage);
  window.form.setListenerToSubmit(formSubmitHandler);
})();

