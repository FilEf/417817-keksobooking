'use strict';

(function () {
  var PHOTO_WIDTH = 45;
  var PHOTO_HEIGHT = 40;
  var HumanTypeTitle =
    {
      'palace': 'Дворец',
      'flat': 'Квартира',
      'house': 'Дом',
      'bungalo': 'Бунгало'
    };

  var currentOffer;
  // функция создания фрагмента со списком удобств
  function makeFeaturesFragment(array) {
    var featuresFragment = document.createDocumentFragment();
    array.forEach(function (element) {
      var li = document.createElement('li');
      li.className = 'popup__feature popup__feature--' + element;
      featuresFragment.appendChild(li);
    });
    return featuresFragment;
  }

  // функция создания фрагмента с фотографиями жилья
  function makePhotosFragment(array) {
    var photosFragment = document.createDocumentFragment();
    array.forEach(function (element) {
      var img = document.createElement('img');
      img.src = element;
      img.className = '.popup__photo';
      img.width = PHOTO_WIDTH;
      img.height = PHOTO_HEIGHT;
      img.alt = 'Фотография жилья';
      photosFragment.appendChild(img);
    });
    return photosFragment;
  }

  // функция создания объявления
  var offerTemplate = document.querySelector('template').content.querySelector('.map__card');

  function makeOffer(arrayObject) {
    var offer = offerTemplate.cloneNode(true);
    var ulContainer = offer.querySelector('.popup__features');
    var photoContainer = offer.querySelector('.popup__photos');
    offer.querySelector('.popup__title').textContent = arrayObject.offer.title;
    offer.querySelector('.popup__text--address').textContent = arrayObject.offer.address;
    offer.querySelector('.popup__text--price').textContent = arrayObject.offer.price + ' ₽/ночь';
    offer.querySelector('.popup__type').textContent = HumanTypeTitle[arrayObject.offer.type];
    offer.querySelector('.popup__text--capacity').textContent = arrayObject.offer.rooms + ' комнаты для ' + arrayObject.offer.guests + ' гостей';
    offer.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayObject.offer.checkin + ', выезд до ' + arrayObject.offer.checkout;
    offer.querySelector('.popup__description').textContent = arrayObject.offer.description;
    offer.querySelector('.popup__avatar').src = arrayObject.author.avatar;
    offer.querySelector('.popup__features').innerHTML = '';
    offer.querySelector('.popup__photos').innerHTML = '';
    window.utils.insertIntoDom(ulContainer, makeFeaturesFragment(arrayObject.offer.features));
    window.utils.insertIntoDom(photoContainer, makePhotosFragment(arrayObject.offer.photos));
    currentOffer = offer;
    return offer;
  }

  // функция удаления предложения из DOM
  function deleteOfferFromDom() {
    if (currentOffer) {
      currentOffer.remove();
    }
  }
  // функция запуска обработчиков событий для закрытия текущего предложения
  function addOfferCloseEvtListeners() {
    currentOffer.querySelector('.popup__close').addEventListener('click', closeButtonPressHandler);
    document.addEventListener('keydown', escPressHandler);
  }

  // функция удаления обработчиков событий при закрытии текущего предложения
  function removeOfferCloseEvtListeners() {
    if (currentOffer) {
      currentOffer.querySelector('.popup__close').removeEventListener('click', closeButtonPressHandler);
    }
    document.removeEventListener('keydown', escPressHandler);
  }

  // функция закрытия подробной информации
  function closeOffer() {
    deleteOfferFromDom();
    removeOfferCloseEvtListeners();
    currentOffer = null;
  }

  // функция обработки события нажатия на кнопку закрыть
  function closeButtonPressHandler() {
    closeOffer();
    window.pins.setDisable();
  }

  // функция обработки события нажатия на escape
  function escPressHandler(evt) {
    if (window.utils.isEscKeyCode(evt)) {
      closeOffer();
      window.pins.setDisable();
    }
  }
  window.card = {
    makeOffer: makeOffer,
    closeOffer: closeOffer,
    deleteOfferFromDom: deleteOfferFromDom,
    addOfferCloseEvtListeners: addOfferCloseEvtListeners
  };
})();
