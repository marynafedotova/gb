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

function openCarModal(car) {
  var modal = document.getElementById('car-modal');
  var carDetails = document.getElementById('car-details');

  if (modal && carDetails) {
    modal.classList.add('active'); // Активируем модальное окно

    carDetails.innerHTML = "<h2>".concat(car.model, " (").concat(car.year, ")</h2>");
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