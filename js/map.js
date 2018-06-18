'use strict';

// аватарка
var PHOTO_QUANTITY = 8;
var PHOTO_NAME_ARRAY = [1, 2, 3, 4, 5, 6, 7, 8];

// квартира
var TITLE_ARRAY =
  [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MAX_ROOMS = 5;
var MAX_GUESTS = 5;
var TYPE_ARRAY = ['palace', 'flat', 'house', 'bungalo'];
var TYPE_RUS =
  {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };
var CHECKIN_ARRAY = ['12:00', '13:00', '14:00'];
var CHECKOUT_ARRAY = ['12:00', '13:00', '14:00'];
var FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_ARRAY =
  [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
var PHOTO_WIDTH = 45;
var PHOTO_HEIGHT = 40;

// указатель
var MIN_X = 300;
var MIN_Y = 130;
var MAX_X = 900;
var MAX_Y = 630;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var objectArray = [];

// функция-генератор случайных чисел
function getRandNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// функция сравнения элементов массива
function compareArrayObjects(y) {
  return function (x) {
    return y === x;
  };
}

// функция получения рандомного элемента массива
function getRandElement(array) {
  return array[getRandNum(0, array.length - 1)];
}

// функция перемешивания массива
function getShuffledArray(array) {
  var resultArray = [];
  for (var i = 0; i < array.length; i++) {
    var randArrayElement = getRandElement(array);
    if (!resultArray.some(compareArrayObjects(randArrayElement))) {
      resultArray[i] = randArrayElement;
    } else {
      i--;
    }
  }
  return resultArray;
}

// функция обрезания массива на рандомную длину
function getRandCutArray(array) {
  return getShuffledArray(array).slice(0, getRandNum(1, array.length - 1));
}

// функция для заполнения свойств объекта
function makeObjectArray() {
  for (var i = 0; i < PHOTO_QUANTITY; i++) {
    var x = getRandNum(MIN_X, MAX_X);
    var y = getRandNum(MIN_Y, MAX_Y);
    objectArray[i] =
      {
        author:
          {
            avatar: 'img/avatars/user0' + getRandElement(PHOTO_NAME_ARRAY) + '.png'
          },
        offer:
          {
            title: getRandElement(TITLE_ARRAY),
            address: x + ', ' + y,
            price: getRandNum(MIN_PRICE, MAX_PRICE),
            type: TYPE_RUS[getRandElement(TYPE_ARRAY)],
            rooms: getRandNum(1, MAX_ROOMS),
            guests: getRandNum(1, MAX_GUESTS),
            checkin: getRandElement(CHECKIN_ARRAY),
            checkout: getRandElement(CHECKOUT_ARRAY),
            features: getRandCutArray(FEATURES_ARRAY),
            description: '',
            photos: getShuffledArray(PHOTOS_ARRAY)
          },
        location:
          {
            x: x,
            y: y
          }
      };
  }
  return objectArray;
}

// функция создания указателя
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var mapPinsContainer = document.querySelector('.map__pins');

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
  var PinsFragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    PinsFragment.appendChild(makePin(array[i], i));
  }
  return PinsFragment;
}

// функция создания фрагмента со списком удобств
function makeFeaturesFragment(array) {
  var featuresFragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    var li = document.createElement('li');
    li.className = 'popup__feature popup__feature--' + array[i];
    featuresFragment.appendChild(li);
  }
  return featuresFragment;
}

// функция создания фрагмента с фотографиями жилья
function makePhotosFragment(array) {
  var photosFragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    var img = document.createElement('img');
    img.src = array[i];
    img.className = '.popup__photo';
    img.width = PHOTO_WIDTH;
    img.height = PHOTO_HEIGHT;
    img.alt = 'Фотография жилья';
    photosFragment.appendChild(img);
  }
  return photosFragment;
}

// функция добавления элементов в DOM
function insertIntoDom(container, element) {
  container.appendChild(element);
}

// функция создания объявления
var offerTemplate = document.querySelector('template').content.querySelector('.map__card');
var offerContainer = document.querySelector('.map');

function makeOffer(arrayObject) {
  var offer = offerTemplate.cloneNode(true);
  var ulContainer = offer.querySelector('.popup__features');
  var photoContainer = offer.querySelector('.popup__photos');
  offer.querySelector('.popup__title').textContent = arrayObject.offer.title;
  offer.querySelector('.popup__text--address').textContent = arrayObject.offer.address;
  offer.querySelector('.popup__text--price').textContent = arrayObject.offer.price + ' ₽/ночь';
  offer.querySelector('.popup__type').textContent = arrayObject.offer.type;
  offer.querySelector('.popup__text--capacity').textContent = arrayObject.offer.rooms + ' комнаты для ' + arrayObject.offer.guests + ' гостей';
  offer.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayObject.offer.checkin + ', выезд до ' + arrayObject.offer.checkout;
  offer.querySelector('.popup__description').textContent = arrayObject.offer.description;
  offer.querySelector('.popup__avatar').src = arrayObject.author.avatar;
  offer.querySelector('.popup__features').innerHTML = '';
  offer.querySelector('.popup__photos').innerHTML = '';
  insertIntoDom(ulContainer, makeFeaturesFragment(arrayObject.offer.features));
  insertIntoDom(photoContainer, makePhotosFragment(arrayObject.offer.photos));
  return offer;
}

/* module4-task1 */

var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65 + 22;
var ESC_CODE = 27;

var mapOffers = makeObjectArray();
var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var addressField = adForm.querySelector('#address');
var currentOffer;
var mainPinStartX = mapPinMain.offsetLeft + MAIN_PIN_WIDTH / 2;
var mainPinStartY = mapPinMain.offsetTop + MAIN_PIN_HEIGHT;

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

// функция проверки состояния карты
function isMapFaded() {
  return map.classList.contains('map--faded');
}

// функция разблокировки карты
function setMapEnabled() {
  map.classList.remove('map--faded');
  setFormEnabled();
}

// функция блокировки карты
function setMapDisabled() {
  map.classList.add('map--faded');
  setFormDisabled();
}

// функция вставки значения в поле адреса
function inputAddress(x, y) {
  addressField.value = x + ', ' + y;
}

// функция запуска разблокировки страницы по нажатию на главный указатель
function mainPinMouseupHandler() {
  if (isMapFaded()) {
    setMapEnabled();
    inputAddress(mainPinStartX, mainPinStartY);
    insertIntoDom(mapPinsContainer, makePinsFragment(mapOffers));
  }
}

// функция удаления предложения из DOM
function deleteOfferFromDom() {
  if (currentOffer) {
    currentOffer.remove();
  }
}

// функция запуска обработчиков событий для закрытия текущего предложения
function addOfferCloseEvtListeners() {
  currentOffer.querySelector('.popup__close').addEventListener('click', closeBtnPressHandler);
  document.addEventListener('keydown', escPressHandler);
}

// функция удаления обработчиков событий при закрытии текущего предложения
function removeOfferCloseEvtListeners() {
  currentOffer.querySelector('.popup__close').removeEventListener('click', closeBtnPressHandler);
  document.removeEventListener('keydown', escPressHandler);
}

// функция закрытия подробной информации
function closeOffer() {
  deleteOfferFromDom();
  removeOfferCloseEvtListeners();
  currentOffer = null;
}

// функция обработки события нажатия на кнопку закрыть
function closeBtnPressHandler() {
  closeOffer();
}

// функция обработки события нажатия на escape
function escPressHandler(evt) {
  if (evt.keyCode === ESC_CODE) {
    closeOffer();
  }
}

// функция открытия подробной информации о предложении по нажатию на одну из меток
function pinClickHandler(evt) {
  var pin = evt.target.closest('.map__pin:not(.map__pin--main)');
  if (pin) {
    var currentIndex = parseInt(pin.dataset.id, 10);
    deleteOfferFromDom();
    currentOffer = makeOffer(mapOffers[currentIndex]);
    insertIntoDom(offerContainer, currentOffer);
    addOfferCloseEvtListeners();
  }
}

mapPinMain.addEventListener('mouseup', mainPinMouseupHandler);
mapPinsContainer.addEventListener('click', pinClickHandler);

setFormDisabled();
inputAddress(mainPinStartX, mainPinStartY);

/* module4-task2 */

var TYPE_MINPRICE = {
  'bungalo': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000
};

var ROOMS_CAPACITY = {
  1: 1,
  2: 2,
  3: 3,
  100: 0
};

var priceInput = adForm.querySelector('#price');
var typeInput = adForm.querySelector('#type');
var timein = adForm.querySelector('#timein');
var timeout = adForm.querySelector('#timeout');
var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');
var timeinValues = timein.querySelectorAll('option');
var timeoutValues = timeout.querySelectorAll('option');
var capacityValues = capacity.querySelectorAll('option');
var resetButton = adForm.querySelector('.ad-form__reset');

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

// функция удаления selected у значений из списка
function removeAttributeSelected(list) {
  for (var i = 0; i < list.length; i++) {
    list[i].removeAttribute('selected');
  }
}

// функция синхронизации времени выезда по времени заезда
function timeinInputChangeHandler(evt) {
  var timeoutIndex = evt.target.options.selectedIndex;
  removeAttributeSelected(timeoutValues);
  timeout[timeoutIndex].selected = true;
}

// функция синхронизации времени заезда по времени выезда
function timeoutInputChangeHandler(evt) {
  var timeinIndex = evt.target.options.selectedIndex;
  removeAttributeSelected(timeinValues);
  timein[timeinIndex].selected = true;
}

// функция поиска индекса первого валидного значения из списка
function findFirstValidValue() {
  var i = 0;
  while (i < capacityValues.length && capacity[i].disabled === true) {
    i++;
  }
  return i;
}

// функция проставления disabled у невалидных значений
function setDisabledCapacityByRoomNumbers(value) {
  if (value !== 0) {
    for (var i = 0; i < capacityValues.length; i++) {
      capacityValues[i].disabled = capacityValues[i].value === '0' || capacityValues[i].value > value ? true : false;
    }
  } else {
    for (var j = 0; j < capacityValues.length; j++) {
      capacityValues[j].disabled = capacityValues[j].value !== value.toString() ? true : false;
    }
  }
}

// функция, возвращающая кол-во мест в зависимости от кол-ва комнат
function getCapacityByRoomNumber(number) {
  return ROOMS_CAPACITY[number];
}


// функция синхронизации кол-ва комнат с кол-вом мест
function roomNumberChangeHandler(evt) {
  var capacityValue = getCapacityByRoomNumber(evt.target.value);
  setDisabledCapacityByRoomNumbers(capacityValue);
  capacity[findFirstValidValue()].selected = true;
}

// функция удаления указателей
function deletePins() {
  var pins = map.querySelectorAll('.map__pin:not(.map__pin--main)');
  var i = 0;
  while (i < pins.length) {
    pins[i].remove();
    i++;
  }
}

// функция возврата страницы в изначальное состояние
function resetClickHandler() {
  deletePins();
  adForm.reset();
  inputAddress(mainPinStartX, mainPinStartY);
  setMapDisabled();
}

// функция запуска обработчиков событий на форме
function addFormListeners() {
  typeInput.addEventListener('change', typeInputChangeHandler);
  timein.addEventListener('change', timeinInputChangeHandler);
  timeout.addEventListener('change', timeoutInputChangeHandler);
  roomNumber.addEventListener('change', roomNumberChangeHandler);
  resetButton.addEventListener('click', resetClickHandler);
}

addFormListeners();

