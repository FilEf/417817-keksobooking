'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

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

  // функция добавления элементов в DOM
  function insertIntoDom(container, element) {
    container.appendChild(element);
  }

  // функция дебаунса
  function debounce(fun) {
    var lastTimeout = null;

    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function() {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  }

  window.utils = {
    getRandNum: getRandNum,
    compareArrayObjects: compareArrayObjects,
    getRandElement: getRandElement,
    getShuffledArray: getShuffledArray,
    getRandCutArray: getRandCutArray,
    insertIntoDom: insertIntoDom,
    debounce: debounce
  };
})();
