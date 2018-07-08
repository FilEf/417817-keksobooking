'use strict';

(function () {
  var TypeMinPrice = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var adForm = document.querySelector('.ad-form');
  var priceInput = adForm.querySelector('#price');
  var typeInput = adForm.querySelector('#type');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var capacityValues = Array.from(capacity.querySelectorAll('option'));
  var resetButton = adForm.querySelector('.ad-form__reset');
  var submitButton = adForm.querySelector('.ad-form__submit');
  var addressField = adForm.querySelector('#address');
  var adFormFieldsets = Array.from(adForm.querySelectorAll('fieldset'));
  var adFormInputs = Array.from(adForm.querySelectorAll('input[required]'));

  // функция разблокировки формы
  function setFormEnabled() {
    adForm.classList.remove('ad-form--disabled');
    adFormFieldsets.forEach(function (fieldset) {
      fieldset.removeAttribute('disabled');
    });
  }

  // функция блокировки формы
  function setFormDisabled() {
    adForm.classList.add('ad-form--disabled');
    adFormFieldsets.forEach(function (fieldset) {
      fieldset.setAttribute('disabled', '');
    });
    removeInputsValidation();
    setDefaultPricePlaceholder();
    setDefaultMinPrice();
    setDefaultCapacity();
    adForm.reset();
  }

  // функция вставки значения в поле адреса
  function inputAddress(coords) {
    addressField.value = coords.x + ', ' + coords.y;
  }

  // функция, возвращающая мин. цену в зависимости от типа жилья
  function getMinPriceByType(type) {
    return TypeMinPrice[type];
  }

  // функция обработки события смены типа жилья
  function typeInputChangeHandler(evt) {
    var price = getMinPriceByType(evt.target.value);
    priceInput.setAttribute('placeholder', price);
    priceInput.setAttribute('min', price);
  }

  // функция синхронизации времени выезда по времени заезда
  function timeInInputChangeHandler() {
    timeOut.value = timeIn.value;
  }

  // функция синхронизации времени заезда по времени выезда
  function timeOutInputChangeHandler() {
    timeIn.value = timeOut.value;
  }

  // функция проставления disabled у невалидных значений
  function synchronizeCapacityByRoomNumbers(roomValue) {
    var lastEnabledIndex = null;
    capacityValues.forEach(function (option, index) {
      var capacityValue = parseInt(option.value, 10);
      var isDisabled = roomValue !== 100 ? capacityValue === 0 || capacityValue > roomValue : capacityValue !== 0;
      option.disabled = isDisabled;
      lastEnabledIndex = isDisabled ? lastEnabledIndex : index;
    });
    capacity[lastEnabledIndex].selected = true;
  }

  // функция синхронизации кол-ва комнат с кол-вом мест
  function roomNumberChangeHandler(evt) {
    var roomValue = parseInt(evt.target.value, 10);
    synchronizeCapacityByRoomNumbers(roomValue);
  }

  function removeInputsValidation() {
    adFormInputs.forEach(function (input) {
      input.style.boxShadow = '';
    });
  }

  function submitButtonClickHandler() {
    removeInputsValidation();
    adFormInputs.forEach(function (input) {
      if (!input.validity.valid) {
        input.style.boxShadow = '0 0 15px #ff0000';
      }
    });
  }

  function setDefaultPricePlaceholder() {
    priceInput.setAttribute('placeholder', TypeMinPrice.flat.toString());
  }

  function setDefaultMinPrice() {
    priceInput.setAttribute('min', TypeMinPrice.flat.toString());
  }

  function setDefaultCapacity() {
    capacityValues.forEach(function (option) {
      var capacityValue = parseInt(option.value, 10);
      option.disabled = capacityValue !== 1;
    });
  }

  function setListenerToReset(callback) {
    resetButton.addEventListener('click', function () {
      callback();
    });
  }
  function setListenerToSubmit(callback) {
    adForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      callback(evt);
    });
  }

  // функция запуска обработчиков событий на форме
  function addFormListeners() {
    submitButton.addEventListener('click', submitButtonClickHandler);
    typeInput.addEventListener('change', typeInputChangeHandler);
    timeIn.addEventListener('change', timeInInputChangeHandler);
    timeOut.addEventListener('change', timeOutInputChangeHandler);
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
