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

function makePin(arrayObject) {
  var pin = mapPinTemplate.cloneNode(true);
  pin.style.left = arrayObject.location.x - PIN_WIDTH / 2 + 'px';
  pin.style.top = arrayObject.location.y - PIN_HEIGHT + 'px';
  pin.querySelector('img').src = arrayObject.author.avatar;
  pin.querySelector('img').alt = arrayObject.offer.title;
  return pin;
}

// функция создания фрагмента с указателями
function makePinsFragment(array) {
  var PinsFragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    PinsFragment.appendChild(makePin(array[i]));
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


var mainPin = document.querySelector('.map__pin--main');
var MAIN_PIN_WIDTH = mainPin.clientWidth;
var MAIN_PIN_HEIGHT = mainPin.clientHeight + 22;
var START_PIN_X = mainPin.offsetLeft + MAIN_PIN_WIDTH / 2;
var START_PIN_Y = mainPin.offsetTop + MAIN_PIN_HEIGHT;


var offerArray = makeObjectArray();
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var adFormFieldset = adForm.querySelectorAll('fieldset');

// функция блокировки формы
function setFormDisabled() {
  for (var i = 0; i < adFormFieldset.length; i++) {
    adFormFieldset[i].setAttribute('disabled', '');
  }
}

// функция вставки значения в поле адреса
function inputAddress(x, y) {
  document.getElementById('address').value = x + ',' + y;
}

// функция разблокировки карты и формы и отображения указателей
function setAllEnabled() {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  inputAddress(START_PIN_X, START_PIN_Y);
  insertIntoDom(mapPinsContainer, makePinsFragment(offerArray));
  insertIntoDom(offerContainer, makeOffer(offerArray[0]));
  for (var i = 0; i < adFormFieldset.length; i++) {
    adFormFieldset[i].removeAttribute('disabled');
  }
}

var mapPin = document.querySelector('.map__pin--main');
mapPin.addEventListener('mouseup', setAllEnabled);



