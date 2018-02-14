'use strict';

window.util = (function () {
  return {
    /**
     }
     * Функция генерирующая случайное значение
     * в диапазоне от min до max
     * @param  {number} min Минимальное значение
     * @param  {number} max Максимальное значение
     * @return {number}
     */
    generateRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },

    /**
     * Функция генерирующая случайное значение из переданного массива
     * @param  {array} array
     * @return {number}     случайное значение из массива
     */
    generateRandomArrayValue: function (array) {
      var randomNumber = window.util.generateRandomNumber(0, array.length);
      return array[randomNumber];
    },

    /**
     * Функция генерирующая случайное значение из переданного массива
     * (из переданного в функцию массива удаляется возвращаемое значение)
     * @param  {array} array
     * @return {number}      случайное значение из массива
     */
    generateRandomNonRepeatableArrayValue: function (array) {
      var randomNumber = window.util.generateRandomNumber(0, array.length);
      var randomArrayValue = array[randomNumber];
      array.splice(randomNumber, 1);
      return randomArrayValue;
    },

    /**
     * Функция перемешивания данных внутри массива
     * @param  {array} array
     * @return {array}      перемешанный массив
     */
    shuffleArray: function (array) {
      for (var i = 0; i < array.length; i++) {
        var randomNumber = window.util.generateRandomNumber(0, array.length);
        var temp = array[i];
        array[i] = array[randomNumber];
        array[randomNumber] = temp;
      }
      return array;
    },

    /**
     * Функция генерации массива случайной длинны, из переданого в функцию
     * (длинна возвращаемого массива не длиннее переданого)
     * @param  {array} array
     * @return {array}       массив случайной длинны (не длиннее чем переданый)
     */
    generateArrayWithRandomLenght: function (array) {
      var newArray = [];
      var numberOfArrayItems = window.util.generateRandomNumber(1, array.length + 1);
      var randomItemNumber = window.util.generateRandomNumber(0, array.length - numberOfArrayItems);
      for (var i = 0; i < numberOfArrayItems; i++) {
        newArray[i] = array[randomItemNumber + i];
      }
      return newArray;
    }
  };
})();
