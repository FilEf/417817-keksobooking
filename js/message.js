'use strict';

(function () {
  var TIMEOUT = 2000;
  var successMessage = document.querySelector('.success');

  // функция закрытия окна с сообщением об успешной загрузке по клику на произвольной области или esc
  function hideSuccessMessage(evt) {
    evt.preventDefault();
    if (window.utils.isEscKeyCode(evt) || evt.button || evt.which) {
      successMessage.classList.add('hidden');
      document.removeEventListener('click', hideSuccessMessage);
      document.removeEventListener('keydown', hideSuccessMessage);
    }
  }
  // функция показа окна с сообщением об успешной загрузке
  function showSuccessMessage() {
    successMessage.classList.remove('hidden');
    document.addEventListener('click', hideSuccessMessage);
    document.addEventListener('keydown', hideSuccessMessage);
  }

  function showErrorMessage(error) {
    var node = document.createElement('div');
    node.className = 'error-message';
    node.style = 'top: 0; left: 0; z-index: 200; width: 100%; height: 100%; background-color: rgba(255, 0, 0, 0.6); vertical-align: middle;';
    node.style.position = 'fixed';
    node.style.paddingTop = '500px';
    node.style.textAlign = 'center';
    node.style.fontSize = '50px';
    node.textContent = error;
    document.body.insertAdjacentElement('afterbegin', node);
    setTimeout(function () {
      node.remove();
    }, TIMEOUT);
  }

  window.message = {
    showSuccess: showSuccessMessage,
    showError: showErrorMessage
  };
})();
