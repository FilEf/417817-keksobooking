'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking/';
  var TIMEOUT = 10000;
  var SUCCESS = 200;

  function getData(successLoadHandler, errorLoadHandler, url) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS) {
        successLoadHandler(xhr.response);
      } else {
        errorLoadHandler('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorLoadHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorLoadHandler('Запрос не успел выполниться за ' + xhr.timeout / 1000 + 'сек');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', url);
    xhr.send();
  }

  function uploadData(data, successUpLoadHandler, errorLoadHandler, url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS) {
        successUpLoadHandler(xhr.response);
      } else {
        errorLoadHandler('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorLoadHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorLoadHandler('Запрос не успел выполниться за ' + xhr.timeout / 1000 + 'сек');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('POST', url);
    xhr.send(data);
  }
  window.backend = {
    load: function (successLoadHandler, errorLoadHandler) {
      getData(successLoadHandler, errorLoadHandler, URL_LOAD);
    },
    upload: function (data, successUpLoadHandler, errorLoadHandler) {
      uploadData(data, successUpLoadHandler, errorLoadHandler, URL_UPLOAD);
    }
  };
})();


