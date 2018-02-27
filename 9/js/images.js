'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PHOTO_HEIGHT = 70;

  var fileChooserAvatar = document.querySelector('#avatar');
  var fileChooserImages = document.querySelector('#images');
  var preview = document.querySelector('.notice__preview img');
  var photoContainer = document.querySelector('fieldset:nth-last-child(2)');
  var dropZone = document.querySelector('.drop-zone');
  var dropZoneMultiple = document.querySelector('.form__photo-container .upload .drop-zone');
  var draggedImage = null;

  /**
   * Функция загружает файл изображения в переданную в неё область
   * @param {file} file               изображение
   * @param {node} previewImageField  нода в какую нужно загрузить изображение
   */
  var uploadOneFile = function (file, previewImageField) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewImageField.src = reader.result;
      });

      reader.readAsDataURL(file);
    } else {
      window.util.drawMessage('Неверный формат изображения');
    }
  };

  /**
   * Функция загружает файлы изображений в переданную в неё область
   * и добавляет обработчики событий для реализации сортровки изображений
   * @param {files} files               массив изображений
   * @param {node}  previewImageField   нода в какую нужно загрузить изображения
   */
  var uploadMultipleFiles = function (files, previewImageField) {
    var fragment = document.createDocumentFragment();
    var matches = [].every.call(files, function (file) {
      var fileName = file.name.toLowerCase();
      return FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });
    });

    if (matches) {
      [].forEach.call(files, function (item) {
        var reader = new FileReader();
        var formPhoto = document.createElement('div');
        var photo = document.createElement('img');

        formPhoto.classList.add('form__photo');
        formPhoto.style = 'display: inline-block';
        photo.height = PHOTO_HEIGHT;
        photo.draggable = true;
        formPhoto.appendChild(photo);
        fragment.appendChild(formPhoto);

        reader.addEventListener('load', function (evt) {
          photo.src = evt.target.result;
        });

        reader.readAsDataURL(item);

        photo.addEventListener('dragstart', imageDragStartHandler);
        photo.addEventListener('dragover', imageDragOverHandler);
        photo.addEventListener('dragleave', imageDragLeaveHandler);
        photo.addEventListener('drop', imageDropHandler);
      });

      previewImageField.appendChild(fragment);
    } else {
      window.util.drawMessage('Неверный формат изображения');
    }
  };

  /**
   * функция-обработчик события, убирает стандартные дейвствия браузера при dragover событии
   * @param {event} evt
   */
  var dragOverDropZoneHandler = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
  };

  /**
   * Добавляем обработчик изменения на поле выбора аватара
   */
  fileChooserAvatar.addEventListener('change', function () {
    uploadOneFile(fileChooserAvatar.files[0], preview);
  });

  /**
   * Добавляем обработчика изменения на поле выбора изображений объявления
   */
  fileChooserImages.addEventListener('change', function () {
    uploadMultipleFiles(fileChooserImages.files, photoContainer);
  });

  /**
   * Добавляем обработчики на поле dropzone выбора аватарки
   */
  dropZone.addEventListener('dragover', dragOverDropZoneHandler);
  dropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();
    uploadOneFile(evt.dataTransfer.files[0], preview);
  });

  /**
   * Добавляем обработчики на поле dropzone добавления изображений объявления
   */
  dropZoneMultiple.addEventListener('dragover', dragOverDropZoneHandler);
  dropZoneMultiple.addEventListener('drop', function (evt) {
    evt.preventDefault();
    uploadMultipleFiles(evt.dataTransfer.files, photoContainer);
  });

  /**
   * функция-обработчик события, при старте перетаскивания сохраняет перетаскиваемый объект
   * @param {event} evt
   */
  var imageDragStartHandler = function (evt) {
    draggedImage = evt.target;
    evt.dataTransfer.setData('text/plain', evt.target.alt);
  };

  /**
   * функция-обработчик события, увеличивает размер елемента когда над ним перетаскивают другой элемент
   * @param {event} evt
   * @return {boolean}
   */
  var imageDragOverHandler = function (evt) {
    evt.preventDefault();
    evt.target.style = 'transform: scale(1.2)';
    return false;
  };

  /**
   * функция-обработчик события, уменьшает элемент до нормального размера
   * @param {element} evt
   */
  var imageDragLeaveHandler = function (evt) {
    evt.target.style = 'transform: scale(1)';
  };

  /**
   * функция-обработчик события, меняет местами изображения таргета и элемента который перетаскивали
   * @param {element} evt
   */
  var imageDropHandler = function (evt) {
    var currentTarget = evt.target.src;

    evt.target.src = draggedImage.src;
    draggedImage.src = currentTarget;
    evt.target.style = 'transform: scale(1)';
  };

})();
