'use strict';

(function () {
  var LIMITS = {
    left: 0 - MAIN_PIN_WIDTH / 2,
    top: 130 - (MAIN_PIN_HEIGHT + MAIN_PIN_TAIL),
    right: document.querySelector('body').offsetWidth - MAIN_PIN_WIDTH / 2,
    bottom: 630 - (MAIN_PIN_HEIGHT + MAIN_PIN_TAIL)
  };
  var mapPinMain = document.querySelector('.map__pin--main');

  // функция ограничения передвижения пина
  function getNewCoords(x, y) {
    var newCoords = {
      x: x,
      y: y
    };
    if (newCoords.x < LIMITS.left) {
      newCoords.x = LIMITS.left;
    }
    if (newCoords.y < LIMITS.top) {
      newCoords.y = LIMITS.top;
    }
    if (newCoords.x > LIMITS.right) {
      newCoords.x = LIMITS.right;
    }
    if (newCoords.y > LIMITS.bottom) {
      newCoords.y = LIMITS.bottom;
    }
    return newCoords;
  }

  // функция управления процессом drag'n'drop
  function dragNDropHandler(evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var shift = {};
    // Функция обработки перемещения пина
    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var actualX = mapPinMain.offsetLeft - shift.x;
      var actualY = mapPinMain.offsetTop - shift.y;
      var newCoords = getNewCoords(actualX, actualY);
      window.form.inputAddress();
      window.page.setMapPinMainCoords(newCoords.x, newCoords.y);
    }
    // Функция обработки отпускания пина
    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  // функция запуска разблокировки страницы по нажатию на главный указатель
  function mainPinMouseupHandler() {
    if (window.page.isMapFaded()) {
      window.page.setMapEnabled();
      window.utils.insertIntoDom(mapPinsContainer, window.pins.makePinsFragment(mapOffers));
      window.form.inputAddress();
    }
  }
  mapPinMain.addEventListener('mouseup', mainPinMouseupHandler);
  mapPinMain.addEventListener('mousedown', dragNDropHandler);
})();
