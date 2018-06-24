'use strict';

(function () {
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

  // указатель
  var MIN_X = 300;
  var MIN_Y = 130;
  var MAX_X = 900;
  var MAX_Y = 630;

  var objectArray = [];

  // функция для заполнения свойств объекта
  function makeObjectArray() {
    var avatar = window.utils.getShuffledArray(PHOTO_NAME_ARRAY);
    var title = window.utils.getShuffledArray(TITLE_ARRAY);
    for (var i = 0; i < PHOTO_QUANTITY; i++) {
      var x = window.utils.getRandNum(MIN_X, MAX_X);
      var y = window.utils.getRandNum(MIN_Y, MAX_Y);
      objectArray[i] =
        {
          author:
            {
              avatar: 'img/avatars/user0' + avatar[i] + '.png'
            },
          offer:
            {
              title: title[i],
              address: x + ', ' + y,
              price: window.utils.getRandNum(MIN_PRICE, MAX_PRICE),
              type: TYPE_RUS[window.utils.getRandElement(TYPE_ARRAY)],
              rooms: window.utils.getRandNum(1, MAX_ROOMS),
              guests: window.utils.getRandNum(1, MAX_GUESTS),
              checkin: window.utils.getRandElement(CHECKIN_ARRAY),
              checkout: window.utils.getRandElement(CHECKOUT_ARRAY),
              features: window.utils.getRandCutArray(FEATURES_ARRAY),
              description: '',
              photos: window.utils.getShuffledArray(PHOTOS_ARRAY)
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
  window.objects = {
    makeObjectArray: makeObjectArray
  };
})();
