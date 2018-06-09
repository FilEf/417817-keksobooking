'use strict';

var objectArray = [];
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

// функция-генератор случайных чисел
function getRandNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// функция создания массива координат
function getLocationArray() {
  var locationArray = new Array(2);
  locationArray[0] = getRandNum(MIN_X, MAX_X);
  locationArray[1] = getRandNum(MIN_Y, MAX_Y);
  return locationArray;
}

// функция сравнения элементов
function compareArray(y) {
  return function (x) {
    return y === x;
  };
}

// функция для формирования массива произвольной/непроизвольной длины с элементами в произвольном/непроизвольном порядке
function getRandArray(array, randOrder, randLength) {
  var IterationQuantity = randLength ? getRandNum(1, array.length) : array.length;
  var resultArray = new Array(IterationQuantity);
  for (var i = 0; i < IterationQuantity; i++) {
    if (!randOrder) {
      resultArray[i] = array[i];
    } else {
      var randArrayElement = getRandNum(0, IterationQuantity - 1);
      if (!resultArray.some(compareArray(array[randArrayElement]))) {
        resultArray[i] = array[randArrayElement];
      } else {
        i--;
      }
    }
  }
  return resultArray;
}

// функция для заполнения свойств объекта
function makeObjectArray() {
  for (var i = 0; i < PHOTO_QUANTITY; i++) {
    var x = getLocationArray()[0];
    var y = getLocationArray()[1];
    objectArray[i] =
      {
        author:
          {
            avatar: 'img/avatars/user0' + getRandArray(PHOTO_NAME_ARRAY, 1, 0)[i] + '.png'
          },
        offer:
          {
            title: getRandArray(TITLE_ARRAY, 1, 0)[i],
            address: x + ', ' + y,
            price: getRandNum(MIN_PRICE, MAX_PRICE),
            type: TYPE_RUS[(getRandArray(TYPE_ARRAY, 1, 0)[i])],
            rooms: getRandNum(1, MAX_ROOMS),
            guests: getRandNum(1, MAX_GUESTS),
            checkin: CHECKIN_ARRAY[getRandNum(0, CHECKIN_ARRAY.length - 1)],
            checkout: CHECKOUT_ARRAY[getRandNum(0, CHECKOUT_ARRAY.length - 1)],
            features: getRandArray(FEATURES_ARRAY, 0, 1),
            description: '',
            photos: getRandArray(PHOTOS_ARRAY, 1, 0)
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

// функция создание указателя
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var mapPinsContainer = document.querySelector('.map__pins');
var offerArray = makeObjectArray();

function makePin(arrayObject) {
  var pin = mapPinTemplate.cloneNode(true);
  pin.style.left = (arrayObject.location.x - (PIN_WIDTH / 2)) + 'px';
  pin.style.top = arrayObject.location.y - PIN_HEIGHT + 'px';
  pin.querySelector('img').src = arrayObject.author.avatar;
  pin.querySelector('img').alt = arrayObject.offer.title;
  return pin;
}

// функция создания массива указателей и добавиления их в DOM
function makePins(array) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(makePin(array[i]));
  }
  mapPinsContainer.appendChild(fragment);
}

// функция создания объявления и добавления его в DOM
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
  arrayObject.offer.features.forEach(function (feature) {
    var li = document.createElement('li');
    li.className = 'popup__feature popup__feature--' + feature;
    ulContainer.appendChild(li);
  });
  arrayObject.offer.photos.forEach(function (photo) {
    var img = document.createElement('img');
    img.src = photo;
    img.class = '.popup__photo';
    img.width = PHOTO_WIDTH;
    img.height = PHOTO_HEIGHT;
    img.alt = 'Фотография жилья';
    photoContainer.appendChild(img);
  });
  offerContainer.appendChild(offer);
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

makePins(offerArray);
makeOffer(offerArray[0]);

