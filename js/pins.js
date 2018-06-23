'use strict';
var mapPinsContainer = document.querySelector('.map__pins');
var mapOffers = window.objects.makeObjectArray();
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var offerContainer = document.querySelector('.map');
  // функция создания указателя
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  function makePin(arrayObject, i) {
    var pin = mapPinTemplate.cloneNode(true);
    pin.style.left = arrayObject.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = arrayObject.location.y - PIN_HEIGHT + 'px';
    pin.dataset.id = i;
    pin.querySelector('img').src = arrayObject.author.avatar;
    pin.querySelector('img').alt = arrayObject.offer.title;
    return pin;
  }

  // функция создания фрагмента с указателями
  function makePinsFragment(array) {
    var pinsFragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      pinsFragment.appendChild(makePin(array[i], i));
    }
    return pinsFragment;
  }

  // функция открытия подробной информации о предложении по нажатию на одну из меток
  function pinClickHandler(evt) {
    var pin = evt.target.closest('.map__pin:not(.map__pin--main)');
    if (pin) {
      var currentIndex = parseInt(pin.dataset.id, 10);
      window.offer.deleteOfferFromDom();
      window.offer.currentOffer = window.offer.makeOffer(mapOffers[currentIndex]);
      window.utils.insertIntoDom(offerContainer, currentOffer);
      window.offer.addOfferCloseEvtListeners();
    }
  }
  mapPinsContainer.addEventListener('click', pinClickHandler);
  window.pins = {
    makePinsFragment: makePinsFragment
  };
})();
