'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var ESC_CODE = 27;

  // функция-генератор случайных чисел
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // функция сравнения элементов массива
  function compareArrayObjects(y) {
    return function (x) {
      return y === x;
    };
  }

  // функция получения рандомного элемента массива
  function getRandomElement(array) {
    return array[getRandomNumber(0, array.length - 1)];
  }

  // функция перемешивания массива
  function getShuffledArray(array) {
    var resultArray = [];
    for (var i = 0; i < array.length; i++) {
      var randArrayElement = getRandomElement(array);
      if (!resultArray.some(compareArrayObjects(randArrayElement))) {
        resultArray[i] = randArrayElement;
      } else {
        i--;
      }
    }
    return resultArray;
  }

  // функция обрезания массива на рандомную длину
  function getRandomCutArray(array) {
    return getShuffledArray(array).slice(0, getRandomNumber(1, array.length - 1));
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
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_INTERVAL);
    };
  }

  // функция обработки нажатия на клавиатуру
  function isEscKeyCode(evt) {
    return evt.keyCode === ESC_CODE;
  }

  window.utils = {
    getRandomNumber: getRandomNumber,
    compareArrayObjects: compareArrayObjects,
    getRandomElement: getRandomElement,
    getShuffledArray: getShuffledArray,
    getRandomCutArray: getRandomCutArray,
    insertIntoDom: insertIntoDom,
    debounce: debounce,
    isEscKeyCode: isEscKeyCode
  };
})();
