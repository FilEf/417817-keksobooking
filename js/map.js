var objectArray = [];
var PHOTO_QUANTITY = 8;
var TITLE_ARRAY =
  [
    'Большая уютная квартира'
    ,'Маленькая неуютная квартира'
    ,'Огромный прекрасный дворец'
    ,'Маленький ужасный дворец'
    ,'Красивый гостевой домик'
    ,'Некрасивый негостеприимный домик'
    ,'Уютное бунгало далеко от моря'
    ,'Неуютное бунгало по колено в воде'
  ];
var TYPE_ARRAY = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_ARRAY = ['12:00', '13:00', '14:00'];
var CHECKOUT_ARRAY = ['12:00', '13:00', '14:00'];
var FEATURES_ARRAY = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_ARRAY =
  [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg'
    ,'http://o0.github.io/assets/images/tokyo/hotel2.jpg'
    ,'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

//функция-генератор случайных чисел
function getRandNum(min, max) {
  return Math.round(Math.random() * (max-min) + min);
}
//функция вывода массива в строку в произвольном/непроизвольном порядке (!!!Доработать)
function getString(array, rand) {
  var randIterationQuantity = getRandNum(1, array.length);
  var resultArray = new Array(randIterationQuantity);
  for (var i = 0; i < randIterationQuantity; i++) {
    if (!rand) {
      resultArray[i] = array[i];
    } else {
      var randArrayElement = getRandNum(1, randIterationQuantity);
      for (var j = 0; j < resultArray.length - 1; j++) {
        if (resultArray[j] === array[randArrayElement]) {
        } else {
          resultArray[resultArray.length] = array[randArrayElement];
        }
      }
    }
  }
  return resultArray.toString();
}

//функция, заполняющая свойства объекта (!!!Доработать)
function makeObjectArray(i) {
  objectArray[i] =
    {
      author:
        {
          avatar: 'img/avatars/user0' + i + '.png'
        },
    offer:
      {
        title: TITLE_ARRAY[i],
        address: ,
        price: getRandNum(1000, 1000000),
        type: TYPE_ARRAY[i],
        rooms: getRandNum(1, 5),
        guests: getRandNum(1, 5),
        checkin: CHECKIN_ARRAY[i],
        checkout: CHECKOUT_ARRAY[i],
        features: getFeatureString(),
        description: '',
        photos:
      }
    }
}

var objArray = [
  {
    author:
      {
        avatar: 'img/avatars/user0' i + '.png'
      },
    offer:
      {
        title: ,
        address: ,
        price: ,
        type: ,
        rooms: ,
        guests: ,
        checkin: ,
        checkout: ,
        features: ,
        description: ,
        photos:
      },
    location:
      {
        x: ,
        y:
      }
  }
];
