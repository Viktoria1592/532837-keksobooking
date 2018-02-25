'use strict';

(function () {
  var lastTimeout;

  /**
   * Функция генерирующая случайное значение
   * в диапазоне от min до max
   * @param  {number} min Минимальное значение
   * @param  {number} max Максимальное значение
   * @return {number}
   */
  var generateRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  /**
   * Функция генерирующая случайное значение из переданного массива
   * @param  {array} array
   * @return {number}     случайное значение из массива
   */
  var generateRandomArrayValue = function (array) {
    var randomNumber = window.util.generateRandomNumber(0, array.length);
    return array[randomNumber];
  };

  /**
   * Функция генерирующая случайное значение из переданного массива
   * (из переданного в функцию массива удаляется возвращаемое значение)
   * @param  {array} array
   * @return {number}      случайное значение из массива
   */
  var generateRandomNonRepeatableArrayValue = function (array) {
    var randomNumber = window.util.generateRandomNumber(0, array.length);
    var randomArrayValue = array[randomNumber];
    array.splice(randomNumber, 1);
    return randomArrayValue;
  };

  /**
   * Функция перемешивания данных внутри массива
   * @param  {array} array
   * @return {array}      перемешанный массив
   */
  var shuffleArray = function (array) {
    for (var i = 0; i < array.length; i++) {
      var randomNumber = window.util.generateRandomNumber(0, array.length);
      var temp = array[i];
      array[i] = array[randomNumber];
      array[randomNumber] = temp;
    }
    return array;
  };

  /**
   * Функция генерации массива случайной длинны, из переданого в функцию
   * (длинна возвращаемого массива не длиннее переданого)
   * @param  {array} array
   * @return {array}        массив случайной длинны (не длиннее чем переданый)
   */
  var generateArrayWithRandomLenght = function (array) {
    var newArray = [];
    var numberOfArrayItems = window.util.generateRandomNumber(1, array.length + 1);
    var randomItemNumber = window.util.generateRandomNumber(0, array.length - numberOfArrayItems);
    for (var i = 0; i < numberOfArrayItems; i++) {
      newArray[i] = array[randomItemNumber + i];
    }
    return newArray;
  };


  /**
   * Функция добавляющая всплывающее сообщение об ошибке поверх страницы
   * @param {string} errorMessage
   */
  var drawMessage = function (errorMessage) {
    var fragment = document.createDocumentFragment();
    var node = document.createElement('div');
    fragment.appendChild(node);
    node.classList.add('error__message');
    var errorMessagePopup = document.createElement('div');
    node.appendChild(errorMessagePopup);
    var closeButton = document.createElement('button');
    errorMessagePopup.appendChild(closeButton);
    closeButton.classList.add('popup__close');
    closeButton.tabIndex = 0;
    var message = document.createElement('p');
    errorMessagePopup.appendChild(message);
    message.textContent = errorMessage;
    node.style = 'z-index: 100; background-color: rgba(192,192,192,0.7); border-radius: 10px; left: 0; right: 0; bottom: 0; top: 0; position: fixed; display: flex; align-items: center; justify-content: center;';
    errorMessagePopup.style = 'z-index: 100; text-align: center; background-color: #FF5635; width: 300px; height: auto; border-radius: 10px; box-shadow: 5px 5px 5px rgb(90,90,90); padding: 10px; position: relative; fontSize: 30px;';
    document.querySelector('body').style.position = 'relative';
    document.body.insertBefore(fragment, document.body.firstChild);
    closeButton.addEventListener('click', function () {
      if (node !== null) {
        node.remove();
      }
    });

    closeButton.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.data.ENTER_KEYCODE) {
        node.remove();
      }
    });
  };

  /**
   * Функция выводящая сообщение об ошибке в зависимости от типа ошибки
   * @param {number} errorCode
   */
  var onError = function (errorCode) {
    switch (errorCode) {
      case 400:
        drawMessage('Неверный запрос');
        break;
      case 401:
        drawMessage('Пользователь не авторизован');
        break;
      case 404:
        drawMessage('Ничего не найдено');
        break;

      default:
        drawMessage('Cтатус ответа: ' + errorCode);
    }
  };

  /**
   * функция предотвращает дребежание у переданной в нее функции
   * @param {function} func
   * @param {number}   debounceInterval
   */
  var debounce = function (func, debounceInterval) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(func, debounceInterval);
  };

  window.util = {
    generateArrayWithRandomLenght: generateArrayWithRandomLenght,
    shuffleArray: shuffleArray,
    generateRandomNonRepeatableArrayValue: generateRandomNonRepeatableArrayValue,
    generateRandomNumber: generateRandomNumber,
    generateRandomArrayValue: generateRandomArrayValue,
    onError: onError,
    drawMessage: drawMessage,
    debounce: debounce
  };
})();
