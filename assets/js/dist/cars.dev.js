"use strict";

// Завантаження даних з JSON
fetch('../data/cars.json').then(function (response) {
  return response.json();
}).then(function (data) {
  createTable(data.cars_in_transit);
})["catch"](function (error) {
  console.error('Помилка завантаження даних:', error);
}); // Функція для створення таблиці автомобілів

function createTable(cars) {
  var tableContainer = document.getElementById('cars-table');
  var table = document.createElement('table');
  table.innerHTML = "\n    <thead>\n      <tr>\n        <th>\u041D\u0430\u0437\u0432\u0430 \u0430\u0432\u0442\u043E\u043C\u043E\u0431\u0456\u043B\u044F</th>\n        <th>\u0411\u0440\u043E\u043D\u044E\u0432\u0430\u043D\u043D\u044F</th>\n      </tr>\n    </thead>\n    <tbody>\n    </tbody>\n  ";
  var tbody = table.querySelector('tbody');
  cars.forEach(function (car) {
    var row = document.createElement('tr'); // Назва автомобіля з посиланням для відкриття модального вікна

    var nameCell = document.createElement('td');
    var carLink = document.createElement('a');
    carLink.href = "#";
    carLink.textContent = car.model;
    carLink.addEventListener('click', function (event) {
      event.preventDefault(); // Предотвращаем переход по ссылке

      openCarModal(car);
    });
    nameCell.appendChild(carLink); // Кнопка для бронювання

    var bookingCell = document.createElement('td');
    var bookingButton = document.createElement('button');
    bookingButton.textContent = "Забронювати";
    bookingButton.addEventListener('click', function (event) {
      event.preventDefault(); // Предотвращаем действие по умолчанию кнопки

      openFeedbackModal();
    });
    bookingCell.appendChild(bookingButton);
    row.appendChild(nameCell);
    row.appendChild(bookingCell);
    tbody.appendChild(row);
  });
  tableContainer.appendChild(table);
}

document.addEventListener('touchstart', function () {}, {
  passive: true
});
document.addEventListener('touchmove', function () {}, {
  passive: true
});

function openCarModal(car) {
  var modal = document.getElementById('car-modal');
  var carDetails = document.getElementById('car-details');
  var imageSlider = document.getElementById('image-slider'); // Очистка предыдущих данных

  carDetails.innerHTML = '';
  imageSlider.innerHTML = '';

  if (modal && carDetails) {
    modal.classList.add('active'); // Активируем модальное окно
    // Добавляем данные об автомобиле

    carDetails.innerHTML = "\n      <h3>\u041C\u043E\u0434\u0435\u043B\u044C: ".concat(car.model, "</h3>\n      <ul>\n        <li><div class=\"cardeteils-item\">\u0420\u0456\u043A \u0432\u0438\u043F\u0443\u0441\u043A\u0443: </div> ").concat(car.year, "</li>\n        <li><div class=\"cardeteils-item\">\u0410\u0443\u043A\u0446\u0456\u043E\u043D:</div> ").concat(car.auction, "</li>\n        <li><div class=\"cardeteils-item\">\u0414\u0430\u0442\u0430 \u043F\u0440\u043E\u0434\u0430\u0436\u0443:</div> ").concat(car.sale_date, "</li>\n        <li><div class=\"cardeteils-item\">VIN:</div> ").concat(car.vin, "</li>\n        <li><div class=\"cardeteils-item\">\u0421\u0442\u0430\u043D:</div> ").concat(car.status, "</li>\n        <li><div class=\"cardeteils-item\">\u0414\u0432\u0438\u0433\u0443\u043D:</div> ").concat(car.engine, "</li>\n        <li><div class=\"cardeteils-item\">\u041F\u0440\u043E\u0431\u0456\u0433:</div> ").concat(car.mileage, "</li>\n        <li><div class=\"cardeteils-item\">\u041F\u0440\u043E\u0434\u0430\u0432\u0435\u0446\u044C:</div> ").concat(car.seller, "</li>\n        <li><div class=\"cardeteils-item\">\u041C\u0456\u0441\u0446\u0435 \u043F\u0440\u043E\u0434\u0430\u0436\u0443:</div> ").concat(car.location, "</li>\n        <li><div class=\"cardeteils-item\">\u041E\u0441\u043D\u043E\u0432\u043D\u0435 \u0443\u0448\u043A\u043E\u0434\u0436\u0435\u043D\u043D\u044F:</div> ").concat(car.primary_damage, "</li>\n        <li><div class=\"cardeteils-item\">\u0414\u0440\u0443\u0433\u043E\u0440\u044F\u0434\u043D\u0435 \u043F\u043E\u0448\u043A\u043E\u0434\u0436\u0435\u043D\u043D\u044F:</div> ").concat(car.secondary_damage, "</li>\n        <li><div class=\"cardeteils-item\">\u041E\u0446\u0456\u043D\u043E\u0447\u043D\u0430 \u0432\u0430\u0440\u0442\u0456\u0441\u0442\u044C:</div> ").concat(car.estimated_value, "</li>\n        <li><div class=\"cardeteils-item\">\u0426\u0456\u043D\u0430 \u0440\u0435\u043C\u043E\u043D\u0442\u0443:</div> ").concat(car.repair_cost, "</li>\n        <li><div class=\"cardeteils-item\">\u041A\u043E\u0440\u043E\u0431\u043A\u0430 \u043F\u0435\u0440\u0435\u0434\u0430\u0447:</div> ").concat(car.transmission, "</li>\n        <li><div class=\"cardeteils-item\">\u041A\u043E\u043B\u0456\u0440 \u043A\u0443\u0437\u043E\u0432\u0430:</div> ").concat(car.color, "</li>\n        <li><div class=\"cardeteils-item\">\u041F\u0440\u0438\u0432\u0456\u0434:</div> ").concat(car.drive, "</li>\n      </ul>"); // Добавляем изображения в основной слайдер

    if (car.images && car.images.length > 0) {
      car.images.forEach(function (imagePath, index) {
        // Правильный относительный путь с учётом вложенности
        var fullPath = "../img/cars/".concat(imagePath.replace('../img/cars/', '')); // Добавление изображения и миниатюры в основной слайдер

        var imageLi = document.createElement('li');
        imageLi.setAttribute('data-thumb', fullPath);
        imageLi.innerHTML = "<img src=\"".concat(fullPath, "\" alt=\"\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 ").concat(car.model, " ").concat(index + 1, "\">");
        imageSlider.appendChild(imageLi);
      }); // Инициализация основного слайдера с миниатюрами

      $('#image-slider').lightSlider({
        gallery: true,
        item: 1,
        vertical: true,
        thumbItem: 4,
        slideMargin: 0,
        enableDrag: true,
        currentPagerPosition: 'left',
        controls: false,
        // adaptiveHeight: true,
        auto: true,
        loop: true,
        verticalHeight: 500,
        onSliderLoad: function onSliderLoad() {
          console.log('Основной слайдер загружен');
        }
      });
    } else {
      console.error("Изображения для автомобиля отсутствуют");
    }

    document.getElementById('image-slider').addEventListener('touchstart', function (event) {// Ваш обработчик touchstart
    }, {
      passive: true
    });
    document.getElementById('image-slider').addEventListener('touchmove', function (event) {// Ваш обработчик touchmove
    }, {
      passive: true
    });
  }
}

function closeModals() {
  var modals = document.querySelectorAll('.modal');
  modals.forEach(function (modal) {
    return modal.classList.remove('active');
  }); // Закрываем все модальные окна
}

document.addEventListener('DOMContentLoaded', function () {
  var closeBtn = document.querySelector('.close');
  var closeFeedbackBtn = document.querySelector('.close-feedback');

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModals);
  }

  if (closeFeedbackBtn) {
    closeFeedbackBtn.addEventListener('click', closeModals);
  } // Убираем логику работы с оверлеем

});

function openFeedbackModal() {
  var feedbackModal = document.getElementById('feedback-modal');

  if (feedbackModal) {
    feedbackModal.classList.add('active'); // Активируем модальное окно
  }
} //header


var header = document.querySelector('header');
window.addEventListener('scroll', function () {
  var scrollDistance = window.scrollY;
  var threshold = 30;

  if (scrollDistance > threshold) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}); //hamburger-menu

document.getElementById('hamb-btn').addEventListener('click', function () {
  document.body.classList.toggle('open-mobile-menu');
});
document.getElementById('hamb-btn-mobile').addEventListener('click', function () {
  document.body.classList.toggle('open-mobile-menu');
});