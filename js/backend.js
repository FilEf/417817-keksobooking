'use strict';

(function () {
  var urlLoad = 'https://js.dump.academy/keksobooking/data';
  var urlUpload = 'https://js.dump.academy/keksobooking/';

  function getData(onLoad, onError, url) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout / 1000 + 'сек');
    });

    xhr.timeout = 15000;

    xhr.open('GET', url);
    xhr.send();
  }

  window.backend = {
    load: function (onLoad, onError) {
      getData(onLoad, onError, urlLoad);
    }
  };
})();


