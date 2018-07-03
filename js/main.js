'use strict';

(function () {
  var offers = [];

  // функция обработчик нажатия на кнопку reset
  function resetPage() {
    window.pins.deleteAll();
    window.card.closeOffer();
    window.map.setDisabled();
    window.mainPin.setCoords();
    window.mainPin.setMouseUpListener();
  }

  // функция-обработчик успешной загрузки данных
  function xhrSuccessLoadHandler(objects) {
    offers = objects;
    window.map.setEnabled();
    window.utils.insertIntoDom(window.map.getPinsContainer(), window.pins.makeFragment(objects));
    window.form.inputAddress(window.mainPin.getCoords());
    window.mapFilters.getData(objects);
  }

  function xhrSuccessUpLoadHandler() {
    resetPage();
    window.form.showSuccessMessage();
  }

  function xhrErrorHandler(error) {
    var node = document.createElement('div');
    node.className = 'error-message';
    node.style = 'top: 0; left: 0; z-index: 200; width: 100%; height: 100%; background-color: rgba(255, 0, 0, 0.6); vertical-align: middle;';
    node.style.position = 'fixed';
    node.style.paddingTop = '500px';
    node.style.textAlign = 'center';
    node.style.fontSize = '50px';
    node.textContent = error;
    document.body.insertAdjacentElement('afterbegin', node);
    setTimeout(function () {
      node.remove();
    }, 2000);
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
      window.utils.insertIntoDom(window.map.get(), currentOffer);
      window.card.addOfferCloseEvtListeners();
    }
  }
  window.mainPin.setMouseUpCallback(tryLoad);
  window.map.setContainerListener(pinClickHandler);
  window.form.setListenerToReset(resetPage);
  window.form.getSuccessErrorFunctions(xhrSuccessUpLoadHandler, xhrErrorHandler);
})();

