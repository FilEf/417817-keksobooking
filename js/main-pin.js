'use strict';
var MAIN_PIN_START_X = 570;
var MAIN_PIN_START_Y = 375;
(function () {
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_TAIL = 22;
  var mainPinCenterX = MAIN_PIN_START_X + MAIN_PIN_WIDTH / 2;
  var mainPinCenterY = MAIN_PIN_START_Y + MAIN_PIN_HEIGHT / 2;
  var LIMITS = {
    left: 0 - MAIN_PIN_WIDTH / 2,
    top: 130 - (MAIN_PIN_HEIGHT + MAIN_PIN_TAIL),
    right: document.querySelector('body').offsetWidth - MAIN_PIN_WIDTH / 2,
    bottom: 630 - (MAIN_PIN_HEIGHT + MAIN_PIN_TAIL)
  };
  var mapPinMain = document.querySelector('.map__pin--main');

  // функция вычисления координат главного указателя
  function getMainPinCoords() {
    if (window.page.isMapFaded()) {
      return {
        x: mainPinCenterX,
        y: mainPinCenterY
      };
    } else {
      return {
        x: mapPinMain.offsetLeft + MAIN_PIN_WIDTH / 2,
        y: mapPinMain.offsetTop + MAIN_PIN_HEIGHT + MAIN_PIN_TAIL
      };
    }
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
  // функция назанчения координат пина
  function setMapPinMainCoords(x, y) {
    mapPinMain.style.left = x + 'px';
    mapPinMain.style.top = y + 'px';
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
      window.form.inputAddress(startCoords.x, startCoords.y);
      setMapPinMainCoords(newCoords.x, newCoords.y);
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
  mapPinMain.addEventListener('mouseup', window.page.mainPinMouseupHandler);
  mapPinMain.addEventListener('mousedown', dragNDropHandler);
  window.mainpin = {
    getMainPinCoords: getMainPinCoords
  };
})();
