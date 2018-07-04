'use strict';

(function () {
  var MAIN_PIN_START_X = 570;
  var MAIN_PIN_START_Y = 375;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_TAIL = 22;
  var LIMITS = {
    left: 0 - MAIN_PIN_WIDTH / 2,
    top: 130 - (MAIN_PIN_HEIGHT + MAIN_PIN_TAIL),
    right: document.querySelector('body').offsetWidth - MAIN_PIN_WIDTH / 2,
    bottom: 630 - (MAIN_PIN_HEIGHT + MAIN_PIN_TAIL)
  };
  var mapPinMain = document.querySelector('.map__pin--main');

  // функция вычисления координат главного указателя
  function getAddress() {
    if (window.map.isFaded()) {
      return {
        x: Math.round(mapPinMain.offsetLeft + MAIN_PIN_WIDTH / 2),
        y: Math.round(mapPinMain.offsetTop + MAIN_PIN_HEIGHT / 2)
      };
    } else {
      return {
        x: Math.round(mapPinMain.offsetLeft + MAIN_PIN_WIDTH / 2),
        y: Math.round(mapPinMain.offsetTop + MAIN_PIN_HEIGHT + MAIN_PIN_TAIL)
      };
    }
  }

  // функция назанчения координат пина
  function setMainPinCoords(x, y) {
    x = typeof x === 'undefined' ? MAIN_PIN_START_X : x;
    y = typeof y === 'undefined' ? MAIN_PIN_START_Y : y;
    mapPinMain.style.left = x + 'px';
    mapPinMain.style.top = y + 'px';
  }

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
      window.form.inputAddress(getAddress());
      setMainPinCoords(newCoords.x, newCoords.y);
    }
    // Функция обработки отпускания пина
    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    window.mapFilters.setHolder();
  }

  var onMouseUpCallback = null;

  function mainPinMouseUpHandler() {
    onMouseUpCallback();
    mapPinMain.removeEventListener('mouseup', mainPinMouseUpHandler);
  }

  function setMouseUpCallback(callback) {
    onMouseUpCallback = callback;
  }

  function setMainPinMouseUpListener() {
    mapPinMain.addEventListener('mouseup', mainPinMouseUpHandler);
  }

  setMainPinMouseUpListener();
  mapPinMain.addEventListener('mousedown', dragNDropHandler);
  window.form.inputAddress(getAddress());

  window.mainPin = {
    getCoords: getAddress,
    setCoords: setMainPinCoords,
    setMouseUpCallback: setMouseUpCallback,
    setMouseUpListener: setMainPinMouseUpListener
  };
})();
