'use strict';

(function () {
  var TYPE_MINPRICE = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var adForm = document.querySelector('.ad-form');
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
  var adFormInputs = adForm.querySelectorAll('input');

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
    adForm.reset();
  }

  // функция вставки значения в поле адреса
  function inputAddress(coords) {
    addressField.value = coords.x + ', ' + coords.y;
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

  function checkValidity() {
    var valid = true;
    Array.from(adFormInputs).forEach(function (input) {
      if (input.validity.valid) {
        input.style.border = '5px solid #ff0000';
        valid = false;
      }
    });
    return valid;
  }

  function setListenerToReset(callback) {
    resetButton.addEventListener('click', function () {
      callback();
    });
  }

  function setListenerToSubmit(callback) {
    adForm.addEventListener('submit', function (evt) {
      if (checkValidity()) {
        evt.preventDefault();
        callback(evt);
      }
    });
  }

  // функция запуска обработчиков событий на форме
  function addFormListeners() {
    typeInput.addEventListener('change', typeInputChangeHandler);
    timein.addEventListener('change', timeinInputChangeHandler);
    timeout.addEventListener('change', timeoutInputChangeHandler);
    roomNumber.addEventListener('change', roomNumberChangeHandler);
  }

  addFormListeners();
  setFormDisabled();

  window.form = {
    setFormEnabled: setFormEnabled,
    setFormDisabled: setFormDisabled,
    inputAddress: inputAddress,
    setListenerToReset: setListenerToReset,
    setListenerToSubmit: setListenerToSubmit
  };
})();
