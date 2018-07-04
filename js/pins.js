'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var PIN_NUMBER = 5;
  var pins = [];
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var mapPinContainer = window.map.getPinsContainer();

  // функция создания указателя
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
    for (var i = 0; i < array.length && i < PIN_NUMBER; i++) {
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

  // функция проставления класса active у нажатого пина
  function setPinActive(element) {
    element.classList.add('map__pin--active');
  }

  // функция удаления класса active у всех пинов
  function setPinDisable() {
    var activePin = mapPinContainer.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  }

  window.pins = {
    makeFragment: makePinsFragment,
    deleteAll: deletePins,
    setActive: setPinActive,
    setDisable: setPinDisable
  };
})();
