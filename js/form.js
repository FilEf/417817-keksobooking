'use strict';

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_TAIL = 22;
var mainPinCenterX = MAIN_PIN_START_X + MAIN_PIN_WIDTH / 2;
var mainPinCenterY = MAIN_PIN_START_Y + MAIN_PIN_HEIGHT / 2;
(function () {
  var TYPE_MINPRICE = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var priceInput = adForm.querySelector('#price');
  var typeInput = adForm.querySelector('#type');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var capacityValues = capacity.querySelectorAll('option');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var addressField = adForm.querySelector('#address');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');

  // функция разблокировки формы
  function setFormEnabled() {
    adForm.classList.remove('ad-form--disabled');
    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].removeAttribute('disabled');
    }
  }

  // функция блокировки формы
  function setFormDisabled() {
    adForm.classList.add('ad-form--disabled');
    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].setAttribute('disabled', '');
    }
  }
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

  // функция вставки значения в поле адреса
  function inputAddress() {
    var mainPinCoords = getMainPinCoords();
    addressField.value = mainPinCoords.x + ', ' + mainPinCoords.y;
  }

  // функция, возвращающая мин. цену в зависимости от типа жилья
  function getMinPriceByType(type) {
    return TYPE_MINPRICE[type];
  }

  // функция обработки события смены типа жилья
  function typeInputChangeHandler(evt) {
    var price = getMinPriceByType(evt.target.value);
    priceInput.setAttribute('placeholder', price);
    priceInput.setAttribute('min', price);
  }

  // функция синхронизации времени выезда по времени заезда
  function timeinInputChangeHandler() {
    timeout.value = timein.value;
  }

  // функция синхронизации времени заезда по времени выезда
  function timeoutInputChangeHandler() {
    timein.value = timeout.value;
  }

  // функция проставления disabled у невалидных значений
  function syncronizeCapacityByRoomNumbers(roomValue) {
    var lastEnabledIndex = null;
    for (var i = 0; i < capacityValues.length; i++) {
      var capacityValue = parseInt(capacityValues[i].value, 10);
      var isDisabled = roomValue !== 100 ? capacityValue === 0 || capacityValue > roomValue : capacityValue !== 0;
      capacityValues[i].disabled = isDisabled;
      lastEnabledIndex = isDisabled ? lastEnabledIndex : i;
    }
    capacity[lastEnabledIndex].selected = true;
  }

  // функция синхронизации кол-ва комнат с кол-вом мест
  function roomNumberChangeHandler(evt) {
    var roomValue = parseInt(evt.target.value, 10);
    syncronizeCapacityByRoomNumbers(roomValue);
  }

  // функция запуска обработчиков событий на форме
  function addFormListeners() {
    typeInput.addEventListener('change', typeInputChangeHandler);
    timein.addEventListener('change', timeinInputChangeHandler);
    timeout.addEventListener('change', timeoutInputChangeHandler);
    roomNumber.addEventListener('change', roomNumberChangeHandler);
    resetButton.addEventListener('click', window.page.resetClickHandler);
  }

  addFormListeners();
  window.form = {
    setFormEnabled: setFormEnabled,
    setFormDisabled: setFormDisabled,
    inputAddress: inputAddress
  };
  setFormDisabled();
  inputAddress(MAIN_PIN_START_X, MAIN_PIN_START_Y);
})();
