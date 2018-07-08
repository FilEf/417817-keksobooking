'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking/';
  var TIMEOUT = 10000;
  var SUCCESS = 200;
  var url;
  var method;

  function createRequest(successLoadHandler, errorLoadHandler, data) {

    url = data ? URL_UPLOAD : URL_LOAD; // выбор ссылки ссылка
    method = data ? 'POST' : 'GET'; // выбор метода

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

    xhr.open(method, url);
    xhr.send(data);
  }

  window.backend = {
    load: function (successLoadHandler, errorLoadHandler) {
      createRequest(successLoadHandler, errorLoadHandler);
    },
    upload: function (successUpLoadHandler, errorLoadHandler, data) {
      createRequest(successUpLoadHandler, errorLoadHandler, data);
    }
  };
})();


