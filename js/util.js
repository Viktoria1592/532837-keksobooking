'use strict';

(function () {
  var ENTER_KEYCODE = 13;

  /**
   }
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
   * Функция выводящая сообщение об ошибке в зависимости от типа ошибки
   * @param {number} errorCode
   */
  var onError = function (errorCode) {
    switch (errorCode) {
      case 400:
        window.error.drawMessage('Неверный запрос');
        break;
      case 401:
        window.error.drawMessage('Пользователь не авторизован');
        break;
      case 404:
        window.error.drawMessage('Ничего не найдено');
        break;

      default:
        window.error.drawMessage('Cтатус ответа: : ' + errorCode);
    }
  };

  window.util = {
    generateArrayWithRandomLenght: generateArrayWithRandomLenght,
    shuffleArray: shuffleArray,
    generateRandomNonRepeatableArrayValue: generateRandomNonRepeatableArrayValue,
    generateRandomNumber: generateRandomNumber,
    generateRandomArrayValue: generateRandomArrayValue,
    ENTER_KEYCODE: ENTER_KEYCODE,
    onError: onError
  };
})();
