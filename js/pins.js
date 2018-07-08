'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pins = [];
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var activePin;

  // функция создания указателя
  function makePin(arrayObject, i) {
    var pin = mapPinTemplate.cloneNode(true);
    var pinImg = pin.querySelector('img');
    pin.style.left = arrayObject.location.x - PIN_WIDTH / 2 + 'px';
    pin.style.top = arrayObject.location.y - PIN_HEIGHT + 'px';
    pin.dataset.id = i;
    pinImg.src = arrayObject.author.avatar;
    pinImg.alt = arrayObject.offer.title;
    return pin;
  }

  // функция создания фрагмента с указателями
  function makePinsFragment(array) {
    var pinsFragment = document.createDocumentFragment();
    array.forEach(function (element, index) {
      var newPin = makePin(element, index);
      pins.push(newPin);
      pinsFragment.appendChild(newPin);
    });
    return pinsFragment;
  }

  // функция удаления указателей
  function deletePins() {
    pins.forEach(function (pin) {
      pin.remove();
    });
    pins = [];
  }

  // функция проставления класса active у нажатого пина
  function setPinActive(element) {
    activePin = element;
    element.classList.add('map__pin--active');
  }

  // функция удаления класса active у всех пинов
  function setPinDisable() {
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
