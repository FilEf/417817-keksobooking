'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pins = [];

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
      var newPin = makePin(array[i], i);
      pins.push(newPin);
      pinsFragment.appendChild(newPin);
    }
    return pinsFragment;
  }

  // функция удаления указателей
  function deletePins() {
    var i = 0;
    while (i < pins.length) {
      pins[i].remove();
      i++;
    }
    pins = [];
  }

  window.pins = {
    makePinsFragment: makePinsFragment,
    deletePins: deletePins
  };
})();
